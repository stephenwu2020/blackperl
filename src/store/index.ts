import Vue from "vue";
import Vuex from "vuex";
import chat from "@/store/chat";
import wallet from "@/store/wallet";
import dex from "@/store/dex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    chat,
    wallet,
    dex
  }
});
