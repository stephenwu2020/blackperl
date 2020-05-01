import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import { Default } from "@/scripts/db/default";
import { User } from "@/scripts/chat/user";
import { Wallet, Child } from "@/scripts/db/wallet";

export class DB {
  private db: low.LowdbSync<any>;

  constructor() {
    const adapter = new LocalStorage("blackpearl_db");
    this.db = low(adapter);

    const dbDefault: Default = new Default();
    this.db.defaults(dbDefault);
  }

  public setChatUser(user: User) {
    this.db.set("chatUser", user).write();
  }

  public getChatUser(): User | null {
    const data = this.db.get("chatUser").value();
    if (!data) {
      return null;
    }

    const user: User = new User();
    user.name = data.name;
    user.head = data.head;
    user.keyPair = data.keyPair;
    user.pubKey = data.pubKey;
    return user;
  }

  public setWallet(wallet: Wallet) {
    this.db.set("wallet", wallet).write();
  }

  public getWallet(): Wallet | null {
    const data = this.db.get("wallet").value();
    if (!data) {
      return null;
    }
    const wallet: Wallet = new Wallet();
    wallet.mnemonic = data.mnemonic;
    wallet.children = data.children;
    return wallet;
  }

  public addWalletChild(child: Child) {
    const children = this.db.get("wallet.children").value();
    children.push(child);
    this.db.set("wallet.children", children).write();
  }
}
