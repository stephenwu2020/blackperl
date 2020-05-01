<template>
  <div class="dp">
    <div class="db-part">
      <div class="dp-balance">
        <span>{{ $t("balance.token") }}</span>
        <span>{{ $t("balance.wallet") }}</span>
        <span>{{ $t("balance.gamma") }}</span>
      </div>
      <div class="dp-balance">
        <span>{{ curPair.coin }}</span>
        <span>{{ balance.token | unit }}</span>
        <span>{{ balance.tokenInDex | unit }}</span>
      </div>
      <span class="dp-part__title"
        >{{ $t("balance.deposit") }} {{ curPair.coin }}</span
      >
      <div class="dp-inline">
        <el-input
          v-model="amountToken"
          :placeholder="$t('balance.amount')"
        ></el-input>
        <el-button @click="depositToken">{{ $t("balance.deposit") }}</el-button>
      </div>
    </div>
    <div class="dp-part">
      <div class="dp-balance">
        <span>{{ $t("balance.token") }}</span>
        <span>{{ $t("balance.wallet") }}</span>
        <span>{{ $t("balance.gamma") }}</span>
      </div>
      <div class="dp-balance">
        <span>{{ curPair.base }}</span>
        <span>{{ balance.eth | unit }}</span>
        <span>{{ balance.ethInDex | unit }}</span>
      </div>
      <span class="dp-part__title"
        >{{ $t("balance.deposit") }} {{ curPair.base }}</span
      >
      <div class="dp-inline">
        <el-input
          v-model="amountEth"
          :placeholder="$t('balance.amount')"
        ></el-input>
        <el-button @click="depositEth">{{ $t("balance.deposit") }}</el-button>
      </div>
    </div>
    <p class="dp-note">
      {{ $t("balance.desc1") }} {{ curPair.coin }} {{ $t("balance.desc2") }}
    </p>
    <NotifyHash ref="notifyHash" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import BigNumber from "bignumber.js";
import NotifyHash from "@/components/dex/popup/NotifyHash.vue";

interface IData {
  amountToken: string;
  amountEth: string;
}

export default Vue.extend({
  props: ["balance"],
  components: { NotifyHash },
  data(): IData {
    return {
      amountToken: "",
      amountEth: ""
    };
  },
  computed: {
    ...mapState({
      account: (state: any) => state.dex.account,
      curPair: (state: any) => state.dex.curPair
    })
  },
  methods: {
    depositToken() {
      if (!this.amountToken || isNaN(this.amountToken as any)) {
        return this.$message({ message: "Illegal amount", type: "warning" });
      }
      const amount = new BigNumber(this.amountToken as any).multipliedBy(
        10 ** 18
      );
      const total = new BigNumber(this.balance.token as any);
      if (amount.isGreaterThan(total)) {
        return this.$message({ message: "Not enough", type: "warning" });
      }

      const hashes: string[] = [];
      this.$gamma.token.methods
        .approve(this.$gamma.dexAddr(), amount.toFixed())
        .send({ from: this.account })
        .on("transactionHash", (hash: string) => {
          hashes.push(hash);
          this.$gamma.dex.methods
            .depositToken(this.$gamma.tokenAddr(), amount.toFixed())
            .send({ from: this.account })
            .on("transactionHash", (hash: string) => {
              hashes.push(hash);
              const comp: any = this.$refs.notifyHash;
              comp.show({ hashes });
            });
        });
    },
    depositEth() {
      if (!this.amountEth || isNaN(this.amountEth as any)) {
        return this.$message({ message: "Illegal amount", type: "warning" });
      }

      const amount = new BigNumber(this.amountEth).multipliedBy(10 ** 18);
      const total = new BigNumber(this.balance.eth);
      if (amount.isGreaterThan(total)) {
        return this.$message({ message: "Not enough", type: "warning" });
      }

      this.$gamma.dex.methods
        .deposit()
        .send({ from: this.account, value: amount })
        .on("transactionHash", (hash: any) => {
          const comp: any = this.$refs.notifyHash;
          comp.show({ hashes: [hash] });
        });
    }
  }
});
</script>

<style lang="postcss" scoped>
.dp {
  padding: 0 10px;
  overflow-y: auto;
}

.dp-part:nth-child(2) {
  margin-top: 50px;
}

.dp-part__title {
  margin: 10px 0;
  display: inline-block;
}

.dp-balance {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.dp-balance:nth-child(2) {
  border-top: 1px solid var(--page-text);
  color: var(--page-text-highlight);
}

.dp-inline {
  display: flex;
}

.dp-note {
  word-break: keep-all;
  font-size: 16px;
  margin: 30px 0;
}

.dp >>> .el-button {
  background: var(--button-bg);
  border-color: var(--button-bg);
  color: var(--page-text);
}

.dp >>> .el-input__inner {
  background: var(--page-bg);
  color: var(--page-text);
  border: none;
}
</style>
