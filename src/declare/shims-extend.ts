import { AxiosInstance } from "axios";
import { DB } from "@/scripts/db/db";
import { SHH } from "@/scripts/chat/shh";
import { App } from "@/scripts/app/app";
import { Gamma } from "@/scripts/dex/gamma";

declare module "vue/types/vue" {
  interface Vue {
    $app: App;
    $db: DB;
    $shh: SHH;
    $axios: AxiosInstance;
    $gamma: Gamma;
    $eventBus: any;
  }
}
