<template>
  <div class="house">
    <canvas
      ref="canvas"
      class="house-canvas"
      :width="width"
      :height="height"
    ></canvas>
    <template v-if="ok">
      <scene :canvasElem="canvasElem" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ICanvasElem } from "@/scripts/house/interfaces";
import { MacroScene } from "@/scripts/house/macro";
import Scene from "@/components/house/Scene.vue";

interface IData {
  ok: boolean;
  width: number;
  height: number;
  canvasElem: ICanvasElem | null;
}

export default Vue.extend({
  components: { Scene },
  data(): IData {
    return {
      ok: false,
      width: MacroScene.CanvasWidth,
      height: MacroScene.CanvasHeight,
      canvasElem: null
    };
  },

  async created() {
    await this.$app.house.init();
    this.checkOK();
  },

  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const context = canvas.getContext("2d");
    if (!context) return;

    this.canvasElem = {
      width: MacroScene.CanvasWidth,
      height: MacroScene.CanvasHeight,
      canvas,
      context
    };
    this.checkOK();
  },

  methods: {
    checkOK() {
      this.ok = this.$app.house.hasInit && this.canvasElem !== null;
    }
  }
});
</script>

<style lang="postcss" scoped>
.house {
  display: flex;
  justify-content: center;
  cursor: pointer;
  &-canvas {
    margin: 20px 0;
    background-image: url("/house/grassland.png");
  }
}
</style>
