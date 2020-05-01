<template>
  <div class="cont">
    <el-collapse v-model="collapse">
      <el-collapse-item title name="group">
        <div class="cont-title" slot="title">
          <i class="fas fa-users"></i>
          <span>群聊</span>
        </div>
        <div
          class="cont-item"
          :class="{ select: chatting.id === item.id }"
          v-for="(item, index) in groups"
          :key="index"
          @click="select(item)"
        >
          {{ item.name }}
        </div>
      </el-collapse-item>
      <el-collapse-item title="私聊" name="private">
        <div class="cont-title" slot="title">
          <i class="fas fa-user"></i>
          <span>私聊</span>
        </div>
        <i class="cont-add fas fa-plus" @click="addPriv"></i>
        <div
          class="cont-item"
          :class="{ select: chatting.id === item.id }"
          v-for="(item, index) in privates"
          :key="index"
          @click="select(item)"
        >
          {{ item.name }}
        </div>
      </el-collapse-item>
    </el-collapse>
    <AddFriend ref="addFriend" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import AddFriend from "@/components/chat/popup/AddFriend.vue";
import { Group } from "@/scripts/chat/group";
import { Private } from "@/scripts/chat/private";
import { Message } from "@/scripts/chat/message";

export default Vue.extend({
  components: { AddFriend },
  data() {
    return {
      collapse: ""
    };
  },
  computed: {
    ...mapState({
      chatting: (state: any) => state.chat.chatting,
      groups: (state: any) => state.chat.groups,
      privates: (state: any) => state.chat.privates
    })
  },

  mounted() {
    this.chatting instanceof Private
      ? (this.collapse = "private")
      : (this.collapse = "group");
  },
  methods: {
    select(item: Group | Private) {
      this.$store.commit("chat/setChatting", item);
    },
    addPriv() {
      const addFriendComp: any = this.$refs.addFriend;
      addFriendComp.show();
    }
  }
});
</script>

<style lang="postcss" scoped>
.cont {
  &-title {
    color: var(--color-primary-text);
    margin-left: 10px;
    font-weight: 600;
    span {
      margin-left: 10px;
    }
  }

  &-item {
    background: var(--color-extra-light-border);
    color: var(--color-regular-text);
    cursor: pointer;
    padding: 5px 40px;
    &:hover {
      background: var(--color-lighter-border);
    }
  }

  &-add {
    width: 100px;
    margin-left: 40px;
    cursor: pointer;
  }

  & >>> .el-collapse-item__wrap,
  & >>> .el-collapse-item__header {
    background: var(--color-extra-light-border);
  }
}

.select {
  position: relative;
  background: #fff;
  &::before {
    position: absolute;
    top: 45%;
    left: 25px;
    content: "";
    width: 5px;
    height: 5px;
    background: var(--color-success);
    border-radius: 50%;
  }
  &:hover {
    background: #fff;
  }
}
</style>
