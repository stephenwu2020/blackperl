import { Chat } from "@/scripts/app/chat";
import { Wallet } from "@/scripts/app/wallet";

export class App {
  public chat: Chat;
  public wallet: Wallet;

  constructor() {
    this.chat = new Chat();
    this.wallet = new Wallet();
  }
}
