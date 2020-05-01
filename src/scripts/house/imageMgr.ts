import { IImageSrc } from "@/scripts/house/interfaces";
import { HouseType } from "@/scripts/house/macro";

const houseConfig = [
  {
    id: 1,
    type: HouseType.House,
    name: "House A",
    img: "house1.png",
    priceRatio: 1
  },
  {
    id: 2,
    type: HouseType.House,
    name: "House B",
    img: "house2.png",
    priceRatio: 1.5
  },
  {
    id: 3,
    type: HouseType.House,
    name: "House C",
    img: "house3.png",
    priceRatio: 2
  },
  {
    id: 4,
    type: HouseType.House,
    name: "House D",
    img: "house4.png",
    priceRatio: 2.5
  },
  {
    id: 5,
    type: HouseType.House,
    name: "House E",
    img: "house5.png",
    priceRatio: 3.0
  },

  {
    id: 100,
    type: HouseType.Env,
    name: "Lake",
    img: "env1.png",
    priceRatio: 10
  },
  {
    id: 101,
    type: HouseType.Env,
    name: "Mall",
    img: "env2.png",
    priceRatio: 10
  },
  {
    id: 102,
    type: HouseType.Env,
    name: "Hospital",
    img: "env3.png",
    priceRatio: 10
  }
];

export class ImageMgr {
  private container: any;

  constructor() {
    this.container = {};
  }

  getDrawings() {
    const drawingList = ["cloud.png"];

    for (let i = 0; i < houseConfig.length; i++) {
      const conf = houseConfig[i];
      drawingList.push(conf.img);
    }

    return drawingList;
  }

  getImage(name: string): IImageSrc {
    return this.container[name];
  }

  async loadImages() {
    return new Promise((resolve, reject) => {
      let loadedCount = 0;
      const drawingList = this.getDrawings();
      for (let i = 0; i < drawingList.length; i++) {
        const imageName = drawingList[i];
        const image = new Image();
        image.onload = () => {
          this.container[imageName] = { name: imageName, obj: image };
          loadedCount++;
          if (loadedCount >= drawingList.length) {
            resolve();
          }
        };
        image.src = `/house/${imageName}`;
      }
    });
  }
}
