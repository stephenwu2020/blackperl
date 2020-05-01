<template>
  <div class="article">
    <vue-markdown :source="source"></vue-markdown>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueMarkdown from "vue-markdown";

export default Vue.extend({
  props: ["source"],
  components: {
    "vue-markdown": VueMarkdown
  }
});
</script>

<style lang="postcss" scoped>
.article {
  padding: 10px;
  margin-bottom: 20px;

  h1 {
    margin: 30px 0;
  }

  h2 {
    margin: 20px 0 10px 0;
  }

  h3 {
    margin: 20px 0 10px 0;
  }

  p {
    line-height: 25px;
    margin: 20px 0;
  }

  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  img {
    max-width: 80%;
    margin: 30px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }

  ul {
    line-height: 25px;
    background-color: rgb(250, 250, 250);
    color: gray;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  blockquote {
    margin-left: 20px;
  }
}
</style>
