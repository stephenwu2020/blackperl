import { PluginApp } from "@/scripts/app/pluginApp";
import { Group } from "@/scripts/chat/group";

export class Chat extends PluginApp {
  async init() {
    if (this.hasInit) {
      return;
    }

    await this.$shh.init();

    const user = this.$db.getChatUser();
    if (!user) {
      this.$router.push({ path: "/chat/signup" });
      return;
    }
    this.$store.commit("chat/setUser", user);

    // init contact
    const groups: Group[] = [
      new Group("word", "工作", "work", "0xaabbccdd"),
      new Group("living", "生活", "living", "0x11223344"),
      new Group("entainment", "娱乐", "entertainment", "0xaa22bb44")
    ];
    this.$store.commit("chat/setChatting", groups[0]);
    this.$store.commit("chat/setGroups", groups);

    // start subscribe
    this.$shh.startPrivSubscribe(user.keyPair);
    const topics: string[] = groups.map((e: Group) => e.topic);
    this.$shh.startSubscribe(topics);
    this.hasInit = true;
  }
}
