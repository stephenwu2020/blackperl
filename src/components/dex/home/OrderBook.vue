<template>
  <div class="ob">
    <span class="ob-title">{{ $t("orderBook.orderBook") }}</span>
    <div class="ob-pair">
      <span>{{ curPair.coin }}</span>
      <span>{{ curPair.coin }}/{{ curPair.base }}</span>
      <span>{{ curPair.base }}</span>
    </div>
    <div class="ob-book">
      <div class="ob-sell">
        <div
          class="ob-item"
          v-for="(item, index) in sellList"
          :key="index"
          @click="onTrade(item.transactionHash)"
        >
          <span>{{ item.amount | unit }}</span>
          <span>{{ item.price }}</span>
          <span>{{ item.total | unit }}</span>
        </div>
      </div>
      <div class="ob-buy">
        <div
          class="ob-item"
          v-for="(item, index) in buyList"
          :key="index"
          @click="onTrade(item.transactionHash)"
        >
          <span>{{ item.amount | unit }}</span>
          <span>{{ item.price }}</span>
          <span>{{ item.total | unit }}</span>
        </div>
      </div>
    </div>
    <Trade ref="trade" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import storage from "@/scripts/dex/storage";
import BigNumber from "bignumber.js";
import Trade from "@/components/dex/popup/Trade.vue";

interface IData {
  orders: any[];
}

export default Vue.extend({
  components: { Trade },
  data(): IData {
    return {
      orders: []
    };
  },
  computed: {
    ...mapState({
      curPair: (state: any) => state.dex.curPair
    }),
    buyList() {
      const list: any[] = [];
      this.orders.forEach((e: any) => {
        if (e.returnValues[0] !== this.$gamma.ethAddr()) {
          const data = {
            transactionHash: e.transactionHash,
            amount: e.returnValues[1],
            price: new BigNumber(e.returnValues[3])
              .dividedBy(new BigNumber(e.returnValues[1]))
              .toFixed(),
            total: e.returnValues[3]
          };
          list.push(data);
        }
      });
      return list;
    },
    sellList() {
      const list: any[] = [];
      this.orders.forEach((e: any) => {
        if (e.returnValues[0] === this.$gamma.ethAddr()) {
          const data = {
            transactionHash: e.transactionHash,
            amount: e.returnValues[3],
            price: new BigNumber(e.returnValues[1])
              .dividedBy(new BigNumber(e.returnValues[3]))
              .toFixed(),
            total: e.returnValues[1]
          };
          list.push(data);
        }
      });
      return list;
    }
  },
  created() {
    this.$eventBus.$on("addOrder", this.onAddOrder);
    this.onAddOrder();
  },
  destroyed() {
    this.$eventBus.$off("addOrder");
  },
  methods: {
    onAddOrder() {
      this.orders = storage.getOrders();
    },

    onTrade(transactionHash: string) {
      const target = this.orders.find((e: any) => {
        return e.transactionHash === transactionHash;
      });
      if (target) {
        const comp: any = this.$refs.trade;
        comp.show({ order: target });
      }
    }
  }
});
</script>

<style lang="postcss" scoped>
.ob {
  background: var(--container-bg);
  color: var(--page-text);
  width: 100%;
  height: 100%;
  font-size: 12px;
  position: relative;
}

.ob-title {
  background-color: var(--container-top);
  color: var(--page-text-highlight);
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: inline-block;
  font-size: 16px;
  position: absolute;
}

.ob-pair {
  position: absolute;
  top: 38px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid var(--page-text);
  border-bottom: 1px solid var(--page-text);
  padding: 10px;
  box-sizing: border-box;
}

.ob-pair span {
  display: inline-block;
}

.ob-book {
  position: absolute;
  top: 72px;
  bottom: 0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.ob-sell {
  max-height: 50%;
  overflow-y: auto;
}

.ob-buy {
  overflow-y: auto;
  flex: 1;
  border-top: 3px solid var(--page-text);
  box-sizing: border-box;
}

.ob-item {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 3px 0;
  cursor: pointer;
}

.ob-item:hover {
  background-color: var(--page-bg);
}

.ob-buy .ob-item {
  color: var(--color-rise);
}

.ob-sell .ob-item {
  color: var(--color-fall);
}
</style>
