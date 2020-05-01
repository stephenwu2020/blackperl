import Vue from "vue";
import { SHH } from "@/scripts/chat/shh";

const shh = new SHH();

const plugin = {
  install() {
    Object.defineProperties(Vue.prototype, {
      $shh: {
        get() {
          return shh;
        }
      }
    });
  }
};

Vue.use(plugin);

export default shh;
