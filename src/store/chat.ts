import { Group } from "@/scripts/chat/group";
import { Private } from "@/scripts/chat/private";
import { Message } from "@/scripts/chat/message";
import { User } from "@/scripts/chat/user";

class ChatState {
  public user: User | null = null;

  public chatting: Group | Private | null = null;

  public groups: Group[] = [];

  public privates: Private[] = [];

  public chatLogs: Map<string, Message[]> = new Map<string, Message[]>();
}

export default {
  namespaced: true,
  state: new ChatState(),
  mutations: {
    setUser: (state: ChatState, payload: User) => {
      state.user = payload;
    },
    setGroups: (state: ChatState, payload: Group[]) => {
      state.groups = payload;
    },
    setPrivates: (state: ChatState, payload: Private[]) => {
      state.privates = payload;
    },
    addGroup: (state: ChatState, payload: Group) => {
      state.groups.push(payload);
    },
    addPrivate: (state: ChatState, payload: Private) => {
      const targe = state.privates.find(
        (priv: Private) => priv.pubKey === payload.pubKey
      );
      if (targe) {
        return;
      }
      state.privates.push(payload);
    },
    setChatting: (state: ChatState, payload: Group | Private) => {
      state.chatting = payload;
    },
    pushMessage: (state: ChatState, payload: Message) => {
      let logs = state.chatLogs.get(payload.chatID);
      logs ? logs.push(payload) : (logs = [payload]);
      state.chatLogs.set(payload.chatID, logs);

      const newMap = new Map<string, Message[]>();
      state.chatLogs.forEach((value, key) => {
        newMap.set(key, value);
      });
      state.chatLogs = newMap;
    }
  }
};
