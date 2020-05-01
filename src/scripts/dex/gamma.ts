import Vue from "vue";
import Web3 from "web3";
import * as deploy from "@/scripts/dex/deploy";
import storage from "@/scripts/dex/storage";
import store from "@/store/index";

export class Gamma {
  public dex: any;
  public token: any;
  public web3: Web3;

  constructor() {
    if (!(window.ethereum && window.ethereum.isMetaMask)) {
      const msg = "Need MetaMask Support!";
      alert(msg);
      throw new Error(msg);
    }

    const web3 = new Web3(window.ethereum);
    this.dex = new web3.eth.Contract(deploy.DexABI as any, deploy.DexAddr);
    this.token = new web3.eth.Contract(
      deploy.Erc20ABI as any,
      deploy.Erc20Addr
    );
    this.web3 = web3;

    this.initMetaMask();
    this.handleEvent();
  }

  initMetaMask() {
    window.ethereum.autoRefreshOnNetworkChange = false;
    window.ethereum.on("accountsChanged", (accounts: string) => {
      const account = accounts[0];
      store.commit("dex/setAccount", account);
    });
  }

  subscribe() {
    if (!Vue.prototype.$eventBus) return;
    const infura = new Web3(
      "wss://ropsten.infura.io/ws/v3/9f28b75fa35c4dc2ae401196993494f5"
    );
    infura.eth.subscribe("pendingTransactions", (error, result) => {
      Vue.prototype.$eventBus.$emit("pendingTransactions", { error, result });
    });
  }

  handleEvent() {
    this.dex.events.OnSell().on("data", (event: any) => {
      storage.addOrder(event);
      Vue.prototype.$eventBus.$emit("addOrder");
    });

    this.dex.events.OnBuy().on("data", (event: any) => {
      console.log("OnBuy", event);
    });
  }

  metamaskEnable() {
    return window.ethereum.enable();
  }

  dexAddr() {
    return deploy.DexAddr;
  }

  tokenAddr() {
    return deploy.Erc20Addr;
  }

  ethAddr() {
    return "0x0000000000000000000000000000000000000000";
  }
}
