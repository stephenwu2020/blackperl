<template>
  <el-dialog
    :visible.sync="visible"
    title="Deposit Token"
    :append-to-body="true"
  >
    <el-form :model="form" ref="form" label-position="top">
      <el-form-item label="Token Address:" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="Deposit Amount:" prop="amount">
        <el-input v-model="form.amount"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="confirm">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      visible: false,
      form: {
        address: "",
        amount: ""
      }
    };
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    confirm() {
      if (!this.form.address) {
        return this.$message({
          message: "Please input token address.",
          type: "warning"
        });
      }

      if (!this.form.amount) {
        return this.$message({
          message: "Please input deposit amount.",
          type: "warning"
        });
      }
    }
  }
});
</script>
