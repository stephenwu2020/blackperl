import { IPair } from "@/scripts/dex/interfaces";

const pairs: IPair[] = [{ id: 1, coin: "GTM", base: "ETH" }];

class DexState {
  public pairs: IPair[];
  public curPair: IPair;
  public account: string;
  constructor() {
    this.pairs = pairs;
    this.curPair = this.pairs[0];
    this.account = "";
  }
}

export default {
  namespaced: true,
  state: new DexState(),
  mutations: {
    changeCurPair: (state: DexState, payload: IPair) => {
      state.curPair = payload;
    },
    setAccount: (state: DexState, payload: string) => {
      state.account = payload;
    }
  },
  actions: {}
};
