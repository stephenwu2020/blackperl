import { Chat } from "@/scripts/app/chat";
import { Wallet } from "@/scripts/app/wallet";
import { House } from "@/scripts/app/house";

export class App {
  public chat: Chat;
  public wallet: Wallet;
  public house: House;

  constructor() {
    this.chat = new Chat();
    this.wallet = new Wallet();
    this.house = new House();
  }
}
