<template>
  <el-dialog class="nh" :visible.sync="visible" :append-to-body="true">
    <div class="nh-title" slot="title">
      <i class="nh-icon el-icon-info"></i>
    </div>
    <div class="nh-main">
      <p>You just created Ethereum transactions. Track their progress:</p>
      <p
        class="nh-hash"
        v-for="item in hashes"
        :key="item"
        @click="jumpEtherScan(item)"
      >
        {{ item }}
      </p>
    </div>
    <div slot="footer">
      <el-button type="primary" @click="hide">OK</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      visible: false,
      hashes: ["0x12", "02sdf"]
    };
  },
  methods: {
    show(options: any) {
      this.hashes = options.hashes || [];
      this.visible = true;
    },
    hide() {
      this.visible = false;
      this.hashes = [];
    },
    jumpEtherScan(hash: string) {
      const url = `https://ropsten.etherscan.io/tx/${hash}`;
      window.open(url, "_blank");
    }
  }
});
</script>

<style scoped>
.nh-hash {
  color: #409eff;
  text-decoration: underline;
  cursor: pointer;
}

.nh-icon {
  font-size: 30px;
  color: #e6a23c;
}

.nh >>> .el-dialog__body {
  padding: 0 40px;
}
</style>
