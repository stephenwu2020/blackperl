import Vue from "vue";
import { Gamma } from "@/scripts/dex/gamma";

export const gamma = new Gamma();
Vue.prototype.$gamma = gamma;
