<template>
  <div class="home">
    <div class="home-colA">
      <Balance />
      <div class="home-split-hori"></div>
      <BuySell />
    </div>
    <div class="home-split-vert"></div>
    <div class="home-colB">
      <OrderBook />
    </div>
    <div class="home-split-vert"></div>
    <div class="home-colC">
      <PriceChart />
      <div class="home-split-hori"></div>
      <Transactions />
    </div>
    <div class="home-split-vert"></div>
    <div class="home-colD">
      <TradesVolumn />
      <div class="home-split-hori"></div>
      <Updates />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Balance from "@/components/dex/home/Balance.vue";
import BuySell from "@/components/dex/home/BuySell.vue";
import OrderBook from "@/components/dex/home/OrderBook.vue";
import PriceChart from "@/components/dex/home/PriceChart.vue";
import Transactions from "@/components/dex/home/Transactions.vue";
import TradesVolumn from "@/components/dex/home/TradesVolumn.vue";
import Updates from "@/components/dex/home/Updates.vue";
import { IPair } from "@/scripts/dex/interfaces";
import { mapState } from "vuex";
export default Vue.extend({
  components: {
    Balance,
    BuySell,
    OrderBook,
    PriceChart,
    Transactions,
    TradesVolumn,
    Updates
  },
  layout: "dex",
  computed: {
    ...mapState({
      pairs: (state: any) => state.dex.pairs
    })
  },
  watch: {
    $route: {
      deep: true,
      handler: function() {
        this.matchPair();
      }
    }
  },
  created() {
    this.matchPair();
  },
  methods: {
    matchPair() {
      const pairStr = this.$route.params.pair;
      if (!pairStr) return;

      const coin = pairStr.split("_")[0];
      const target = this.pairs.find((e: IPair) => {
        return e.coin === coin;
      });
      if (!target) return;
      this.$store.commit("dex/changeCurPair", target);
    }
  }
});
</script>

<style lang="postcss" scoped>
.home {
  background: var(--page-bg);
  color: var(--page-text);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 10px 0;
}

.home-colA,
.home-colD {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.home-colB {
  flex: 1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.home-colC {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.home-split-hori {
  height: 10px;
  width: 100%;
}

.home-split-vert {
  width: 10px;
  height: 100%;
}
</style>
