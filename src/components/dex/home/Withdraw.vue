<template>
  <div class="wd">
    <div class="db-part">
      <div class="wd-balance">
        <span>{{ $t("balance.token") }}</span>
        <span>{{ $t("balance.wallet") }}</span>
        <span>{{ $t("balance.gamma") }}</span>
      </div>
      <div class="wd-balance">
        <span>{{ curPair.coin }}</span>
        <span>{{ balance.token | unit }}</span>
        <span>{{ balance.tokenInDex | unit }}</span>
      </div>
      <span class="wd-part__title"
        >{{ $t("balance.withdraw") }} {{ curPair.coin }}</span
      >
      <div class="wd-inline">
        <el-input
          v-model="amountToken"
          :placeholder="$t('balance.amount')"
        ></el-input>
        <el-button @click="withdrawToken">{{
          $t("balance.withdraw")
        }}</el-button>
      </div>
    </div>
    <div class="wd-part">
      <div class="wd-balance">
        <span>{{ $t("balance.token") }}</span>
        <span>{{ $t("balance.wallet") }}</span>
        <span>{{ $t("balance.gamma") }}</span>
      </div>
      <div class="wd-balance">
        <span>{{ curPair.base }}</span>
        <span>{{ balance.eth | unit }}</span>
        <span>{{ balance.ethInDex | unit }}</span>
      </div>
      <span class="wd-part__title"
        >{{ $t("balance.withdraw") }} {{ curPair.base }}</span
      >
      <div class="wd-inline">
        <el-input
          v-model="amountEth"
          :placeholder="$t('balance.amount')"
        ></el-input>
        <el-button @click="withdrawEth">{{ $t("balance.withdraw") }}</el-button>
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
    withdrawToken() {
      if (!this.amountToken || isNaN(this.amountToken as any)) {
        this.$message({ message: "Illegal amount", type: "warning" });
        return;
      }
      const amount = new BigNumber(this.amountToken).multipliedBy(10 ** 18);
      const total = new BigNumber(this.balance.tokenInDex);
      if (amount.isGreaterThan(total)) {
        this.$message({ message: "Not enough", type: "warning" });
        return;
      }

      const hashes: string[] = [];
      this.$gamma.dex.methods
        .withdrawToken(this.$gamma.tokenAddr(), amount.toFixed())
        .send({ from: this.account })
        .on("transactionHash", (hash: string) => {
          hashes.push(hash);
          const comp: any = this.$refs.notifyHash;
          comp.show({ hashes });
        })
        .on("receipt", (receipt: any) => {
          console.log("receipt", receipt);
        });
    },
    withdrawEth() {
      if (!this.amountEth || isNaN(this.amountEth as any)) {
        return this.$message({ message: "Illegal amount", type: "warning" });
      }

      const amount = new BigNumber(this.amountEth).multipliedBy(10 ** 18);
      const total = new BigNumber(this.balance.ethInDex);
      if (amount.isGreaterThan(total)) {
        return this.$message({ message: "Not enough", type: "warning" });
      }

      this.$gamma.dex.methods
        .withdraw(amount.toFixed())
        .send({ from: this.account })
        .on("transactionHash", (hash: string) => {
          const comp: any = this.$refs.notifyHash;
          comp.show({ hashes: [hash] });
        })
        .on("receipt", (receipt: any) => {
          console.log("receipt", receipt);
        });
    }
  }
});
</script>

<style lang="postcss" scoped>
.wd {
  padding: 0 10px;
  overflow-y: auto;
}

.wd-part:nth-child(2) {
  margin-top: 50px;
}

.wd-part__title {
  margin: 10px 0;
  display: inline-block;
}

.wd-balance {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.wd-balance:nth-child(2) {
  border-top: 1px solid var(--page-text);
  color: var(--page-text-highlight);
}

.wd-inline {
  display: flex;
}

.wd-note {
  word-break: keep-all;
  font-size: 16px;
  margin: 30px 0;
}

.wd >>> .el-button {
  background: var(--button-bg);
  border-color: var(--button-bg);
  color: var(--page-text);
  padding: 7px 6px;
}

.wd >>> .el-input__inner {
  background: var(--page-bg);
  color: var(--page-text);
  border: none;
}
</style>
