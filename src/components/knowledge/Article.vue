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

<style lang="postcss">
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
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.2);
  }

  ul,
  ol {
    line-height: 25px;
    color: gray;
    box-sizing: border-box;
    padding: 10px 30px;
  }

  blockquote {
    margin-left: 20px;
  }

  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 6px;
  }
}
</style>
