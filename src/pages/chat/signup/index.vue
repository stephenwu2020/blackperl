<template>
  <div class="sign">
    <el-form class="sign-form" label-position="top">
      <el-form-item label="输入昵称:">
        <el-input v-model="nick"></el-input>
      </el-form-item>
      <el-form-item label="选择头像:">
        <div class="sign-heads">
          <div
            class="sign-head"
            :class="{ select: head === item }"
            v-for="(item, index) in heads"
            :key="index"
            @click="selectHead(item)"
          >
            <img :src="item" alt class="sign-head__img" />
          </div>
        </div>
      </el-form-item>
      <el-button type="primary" :disabled="!ready" @click="sure"
        >选好了</el-button
      >
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "@/scripts/chat/user";

export default Vue.extend({
  data() {
    return {
      nick: "",
      head: ""
    };
  },
  computed: {
    heads(): string[] {
      return [
        "/images/head01.jpeg",
        "/images/head02.jpeg",
        "/images/head03.jpeg",
        "/images/head04.jpeg",
        "/images/head05.jpeg",
        "/images/head06.jpeg",
        "/images/head07.jpeg",
        "/images/head08.jpeg",
        "/images/head09.jpeg",
        "/images/head10.jpeg"
      ];
    },
    ready(): boolean {
      return this.nick !== "" && this.head !== "";
    }
  },
  methods: {
    selectHead(head: string) {
      this.head = head;
    },

    async sure() {
      const keyPair = await this.$shh.newKeyPair();
      const pubKey = await this.$shh.getPubFromKeyPair(keyPair);

      const user: User = new User();
      user.name = this.nick;
      user.head = this.head;
      user.keyPair = keyPair;
      user.pubKey = pubKey;

      this.$db.setChatUser(user);
      this.$router.push({ path: "/chat" });
    }
  }
});
</script>

<style lang="postcss" scoped>
.sign {
  &-form {
    margin: 20px auto;
    width: 300px;
  }
  &-heads {
    display: flex;
    width: 300px;
    flex-wrap: wrap;
  }
  &-head {
    cursor: pointer;
    margin-right: 5px;
    margin-bottom: 5px;
    &__img {
      width: 60px;
      height: 60px;
      border: 1px solid #e4e7ed;
    }
  }
}

.select {
  transform: translateY(-3px) scale(1.2);
  margin-left: 10px;
  box-sizing: border-box;
  img {
    border: 2px solid #67c23a;
  }
}
</style>
