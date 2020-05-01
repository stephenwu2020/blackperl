<template>
  <div class="empty" v-if="!chatting"></div>
  <div class="chat" v-else>
    <div class="chat-top">{{ chatting.name }}</div>
    <div class="chat-main" ref="main">
      <div class="chat-main-item" v-for="(item, index) in chats" :key="index">
        <MessageComp :msg="item" />
        <span id="chat-main__tail" ref="tail"></span>
      </div>
    </div>
    <div class="chat-input">
      <el-input
        class="chat-input__area"
        v-model="msg"
        type="textarea"
        @keydown.enter.exact.native="handleEnter"
      ></el-input>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import MessageComp from "@/components/chat/Message.vue";
import { Group } from "@/scripts/chat/group";
import { Private } from "@/scripts/chat/private";
import { Message } from "@/scripts/chat/message";
import { User } from "@/scripts/chat/user";

export default Vue.extend({
  components: { MessageComp },
  data() {
    return {
      msg: ""
    };
  },
  computed: {
    ...mapState({
      chatting: (state: any) => state.chat.chatting,
      me: (state: any) => state.chat.user
    }),
    chats(): Message[] {
      if (!this.chatting) {
        return [];
      }
      const chats = this.$store.state.chat.chatLogs.get(this.chatting.id);
      return chats;
    }
  },
  watch: {
    chats() {
      this.$nextTick(() => {
        this.scrollBottom();
      });
    }
  },
  methods: {
    async handleEnter() {
      if (!this.msg) {
        return;
      }
      const msgFix = this.msg.trim();
      if (!msgFix) {
        return;
      }

      if (this.chatting instanceof Group) {
        const msg: Message = new Message(
          this.chatting.id,
          this.me.name,
          this.me.pubKey,
          msgFix,
          Date.now(),
          this.me.head
        );
        await this.$shh.send(this.chatting.topic, msg);
      } else if (this.chatting instanceof Private) {
        const msg: Message = new Message(
          "",
          this.me.name,
          this.me.pubKey,
          msgFix,
          Date.now(),
          this.me.head
        );
        await this.$shh.sendPriv(this.chatting.pubKey, msg);
        msg.chatID = this.chatting.pubKey;
        this.$store.commit("chat/pushMessage", msg);
      }

      setTimeout(() => {
        this.msg = "";
      }, 100);
    },

    scrollBottom() {
      const comp: any = this.$refs.main;
      comp.scrollTop = comp.scrollHeight;
    }
  }
});
</script>

<style lang="postcss" scoped>
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-top {
    height: 40px;
    display: flex;
    font-weight: 600;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--color-light-border);
  }
  &-main {
    flex: 1;
    overflow-y: auto;
  }
  &-input {
    height: 100px;
    border-top: 1px solid var(--color-light-border);
    &__area {
      height: 100%;
      & >>> .el-textarea__inner {
        border: none;
        height: 100%;
        resize: none;
      }
    }
  }
}
</style>
