export class Group {
  public id: string;

  public name: string;

  public password: string;

  public topic: string;

  constructor(id: string, name: string, password: string, topic: string) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.topic = topic;
  }
}
