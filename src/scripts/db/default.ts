import { User } from "@/scripts/chat/user";
import { Wallet } from "@/scripts/db/wallet";

export class Default {
  public chatUser: User;
  public wallet: Wallet;

  constructor() {
    this.chatUser = new User();
    this.wallet = new Wallet();
  }
}
