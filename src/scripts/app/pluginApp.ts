import Router from "vue-router";
import { DB } from "@/scripts/db/db";
import { SHH } from "@/scripts/chat/shh";
import db from "@/plugins/db";
import router from "@/router/index";
import store from "@/store/index";
import shh from "@/plugins/shh";

export interface IPluginApp {
  hasInit: boolean;
  init: () => Promise<any>;
}

export class PluginApp implements IPluginApp {
  public hasInit: boolean;

  protected $db: DB;

  protected $router: Router;

  protected $store: any;

  protected $shh: SHH;

  constructor() {
    this.hasInit = false;
    this.$db = db;
    this.$router = router;
    this.$store = store;
    this.$shh = shh;
  }

  async init() {}
}
