import Vue from "vue";
import Vuex from "vuex";
import chat from "@/store/chat";
import wallet from "@/store/wallet";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    chat,
    wallet,
  }
});
