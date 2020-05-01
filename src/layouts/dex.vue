<template>
  <div class="dex" id="dex">
    <Nav />
    <div class="dex-page">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/dex/Nav";
export default {
  components: { Nav }
};
</script>

<style lang="postcss" scoped>
.dex {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.dex-page {
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  overflow-y: auto;
}
</style>

<style lang="postcss">
#dex {
  --page-bg: #252a44;
  --container-bg: #171b2b;
  --container-top: #131625;
  --page-text: #aeb9d8;
  --page-text-highlight: #fff;
  --color-rise: #41b37d;
  --color-fall: #d74e5a;
  --button-bg: #5f6594;
}
</style>
