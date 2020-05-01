<template>
  <div class="msg" :class="{ me: isMe }">
    <div class="msg-head">
      <img :src="msg.head" alt class="msg-head__img" />
    </div>
    <div class="msg-main">
      <span class="msg-main__name">{{ msg.sender }}</span>
      <div class="msg-main__content">{{ msg.content }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { Message } from "@/scripts/chat/message";
import { User } from "@/scripts/chat/user";

export default Vue.extend({
  props: ["msg"],
  computed: {
    ...mapState({
      me: (state: any) => state.chat.user
    }),
    isMe(): boolean {
      const res = this.me.pubKey === this.msg!.pubKey;
      return res;
    }
  }
});
</script>

<style lang="postcss" scoped>
.msg {
  margin: 10px;
  display: flex;
  &-head {
    &__img {
      width: 30px;
      height: 30px;
    }
  }
  &-main {
    margin: 0 10px;
    display: flex;
    flex-direction: column;

    &__name {
      font-size: 12px;
      color: var(--color-secondary-text);
    }

    &__content {
      max-width: 200px;
      background: var(--color-extra-light-border);
      padding: 5px 10px;
      word-break: break-all;
      white-space: pre-line;
    }
  }
}

.me {
  justify-content: flex-end;
  .msg-head {
    order: 2;
  }
  .msg-main {
    order: 1;
    align-items: flex-end;
    &__content {
      background: #67c23a;
      color: #000;
    }
  }
}
</style>
