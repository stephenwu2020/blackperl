import Web3 from "web3";
import store from "@/store";
import { Message } from "@/scripts/chat/message";
import { Private } from "@/scripts/chat/private";

export class SHH {
  public powTime: number;

  public powTarget: number;

  public ttl: number;

  public web3: Web3;

  public nodeUrl: string;

  public hasInit: boolean;

  private symPasswd: string;

  private symKeyID: string;

  constructor() {
    this.hasInit = false;
    this.powTime = 3;
    this.powTarget = 0.5;
    this.ttl = 100;
    this.symKeyID = "";
    this.symPasswd = "apple&banana";
    this.web3 = new Web3();
    // this.nodeUrl = "ws://localhost:8546";
    this.nodeUrl = "ws://192.168.0.111:8546";
  }

  public async init() {
    if (this.hasInit) {
      return;
    }
    this.web3.setProvider(new Web3.providers.WebsocketProvider(this.nodeUrl));
    const res: boolean = await this.web3.eth.net.isListening();
    this.hasInit = res;
  }

  public async newKeyPair(): Promise<string> {
    return this.web3.shh.newKeyPair();
  }

  public async getPubFromKeyPair(keyPair: string): Promise<string> {
    return this.web3.shh.getPublicKey(keyPair);
  }

  public async isKeyPairValid(keyPair: string): Promise<boolean> {
    try {
      const res = await this.web3.shh.hasKeyPair(keyPair);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.resolve(false);
    }
  }

  public async startSubscribe(topics: string[]) {
    this.symKeyID = await this.web3.shh.generateSymKeyFromPassword(
      this.symPasswd
    );

    for (const topic of topics) {
      const options: any = {
        symKeyID: this.symKeyID,
        topics: [topic]
      };
      this.web3.shh.subscribe(
        "messages",
        options,
        (error: Error, message: any, subscription: any) => {
          this.rece(error, message, subscription);
        }
      );
    }
  }

  public startPrivSubscribe(keyPair: string) {
    const options = {
      privateKeyID: keyPair
    };
    this.web3.shh.subscribe(
      "messages",
      options,
      (error: Error, message: any, subscription: any) => {
        this.recePriv(error, message, subscription);
      }
    );
  }

  public async send(topic: string, message: Message) {
    const hash = await this.web3.shh.post({
      symKeyID: this.symKeyID,
      topic,
      powTime: this.powTime,
      powTarget: this.powTime,
      payload: this.web3.utils.utf8ToHex(JSON.stringify(message)),
      ttl: this.ttl
    });
  }

  public async sendPriv(pubKey: string, message: Message) {
    const hash = await this.web3.shh.post({
      pubKey,
      payload: this.web3.utils.utf8ToHex(JSON.stringify(message)),
      powTime: this.powTime,
      powTarget: this.powTime,
      topic: "0x00000000",
      ttl: this.ttl
    });
  }

  public rece(error: Error, message: any, subscription: any) {
    if (!message) {
      return;
    }
    const msgHex: string = message.payload;
    const msgStr: string = this.web3.utils.hexToUtf8(msgHex);
    const msg: Message = JSON.parse(msgStr);
    store.commit("chat/pushMessage", msg);
  }

  public recePriv(error: Error, message: any, subscription: any) {
    if (!message) {
      return;
    }
    const msgHex: string = message.payload;
    const msgStr: string = this.web3.utils.hexToUtf8(msgHex);
    const msg: Message = JSON.parse(msgStr);
    msg.chatID = msg.pubKey;
    store.commit("chat/pushMessage", msg);
    this.addPriv(msg);
  }

  private addPriv(msg: Message) {
    const priv: Private = new Private(msg.pubKey, msg.sender, msg.pubKey);
    store.commit("chat/addPrivate", priv);
  }
}
