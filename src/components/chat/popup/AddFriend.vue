<template>
  <el-dialog
    class="af"
    :append-to-body="true"
    :visible.sync="visible"
    width="400px"
  >
    <div class="af-title" slot="title">添加联系人</div>
    <el-form :model="userInput" ref="form">
      <el-form-item prop="name" label="昵称" placeholder="请输入昵称">
        <el-input v-model="userInput.name"></el-input>
      </el-form-item>
      <el-form-item
        prop="pubKey"
        label="Public Key"
        placeholder="请输入联系人的 publick key"
      >
        <el-input v-model="userInput.pubKey"></el-input>
      </el-form-item>
    </el-form>
    <div class="af-footer" slot="footer">
      <el-button @click="hide">取消</el-button>
      <el-button @click="sure" type="primary" :disabled="!pass">确定</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Group } from "@/scripts/chat/group";
import { Private } from "@/scripts/chat/private";
import { Form } from "element-ui";

export default Vue.extend({
  data() {
    return {
      userInput: {
        name: "",
        pubKey: ""
      },
      visible: false
    };
  },
  computed: {
    pass(): boolean {
      return this.userInput.name !== "" && this.userInput.pubKey !== "";
    }
  },
  methods: {
    show() {
      this.visible = true;
    },

    hide() {
      this.reset();
      this.visible = false;
    },
    reset() {
      const form = this.$refs.form as Form;
      form.resetFields();
    },
    sure() {
      if (this.userInput.name.length > 6) {
        this.$message({ message: "名字太长了啊(6个字符)!", type: "warning" });
        return;
      }

      const priv = new Private(
        this.userInput.pubKey,
        this.userInput.name,
        this.userInput.pubKey
      );

      this.$store.commit("chat/addPrivate", priv);
      this.hide();
    }
  }
});
</script>
