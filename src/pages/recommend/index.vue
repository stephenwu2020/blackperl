<template>
  <div class="rcm">
    <div class="rcm-part">
      <div class="rcm-part-desc">
        <h2>Whisper 聊天</h2>
        <p>
          搭建在 Ethereum Whisper 之上，匿名、加密的通讯软件
        </p>
        <span @click="jump">安装、使用，点击前往</span>
      </div>
      <div class="rcm-part-show">
        <img src="@/assets/recommends/whisper_chat.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    jump() {
      const url = "https://github.com/stephenwu2020/whisper-chat";
      window.open(url, "_blank");
    }
  }
});
</script>

<style lang="postcss" scoped>
.rcm {
  &-part {
    background: #f4f0e7;
    display: flex;
    padding: 50px 20px;
    margin: auto;
    width: 100%;
    &-desc {
      flex: 1;
      p {
        margin-top: 10px;
        max-width: 70%;
      }
      span {
        margin-top: 80px;
        cursor: pointer;
        display: inline-block;
        border-bottom: 1px solid #aaa;
        padding-bottom: 2px;
      }
    }
    &-show {
      flex: 2;
      img {
        flex: 2;
        margin: auto;
        max-width: 100%;
        box-shadow: 0 0 1px 2px #ddd;
      }
    }
  }
}
</style>
