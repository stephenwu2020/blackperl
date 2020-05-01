import BigNumber from "bignumber.js";

export class UserOrder {
  public order: any;
  public tokenGet: number | string;
  public amountGet: number | string;
  public tokenGive: number | string;
  public amountGive: number | string;
  public expires: number | string;
  public clientNonce: number | string;
  public seller: number | string;

  constructor(order: any) {
    this.order = order;
    this.tokenGet = this.order.returnValues[0];
    this.amountGet = this.order.returnValues[1];
    this.tokenGive = this.order.returnValues[2];
    this.amountGive = this.order.returnValues[3];
    this.expires = this.order.returnValues[4];
    this.clientNonce = this.order.returnValues[5];
    this.seller = this.order.returnValues[6];
  }

  isBuy() {
    const ethAddr = "0x0000000000000000000000000000000000000000";
    return this.tokenGet !== ethAddr;
  }

  price() {
    let price = this.isBuy()
      ? new BigNumber(this.amountGive).dividedBy(this.amountGet)
      : new BigNumber(this.amountGet).dividedBy(this.amountGive);
    return price;
  }

  amount() {
    let amount = this.isBuy()
      ? new BigNumber(this.amountGet)
      : new BigNumber(this.amountGive);
    return amount;
  }
}
