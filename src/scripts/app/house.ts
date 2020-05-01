import { PluginApp } from "@/scripts/app/pluginApp";
import { ImageMgr } from "@/scripts/house/imageMgr";

export class House extends PluginApp {
  public imageMgr: ImageMgr;

  constructor() {
    super();
    this.imageMgr = new ImageMgr();
  }

  async init() {
    if (this.hasInit) {
      return;
    }

    await this.imageMgr.loadImages();
    this.hasInit = true;
  }
}
