export class Message {
  public chatID: string;

  public sender: string;

  public pubKey: string;

  public content: string;

  public timestamp: number;

  public head: string;

  constructor(
    chatID: string,
    sender: string,
    pubKey: string,
    content: string,
    timestamp: number,
    head: string
  ) {
    this.chatID = chatID;
    this.sender = sender;
    this.pubKey = pubKey;
    this.content = content;
    this.timestamp = timestamp;
    this.head = head;
  }
}
