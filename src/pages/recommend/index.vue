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
      padding-left: 40px;
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
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        flex: 2;
        width: 80%;
        max-width: 80%;
        min-height: 200px;
        box-shadow: 0 0 1px 2px #ddd;
      }
    }
  }
}
</style>
