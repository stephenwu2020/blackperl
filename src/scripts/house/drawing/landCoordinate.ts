import { MacroScene } from "@/scripts/house/macro";
import { IPos, IGridPos } from "@/scripts/house/interfaces";

/**
 * land 坐标系
 * canvas坐标，指相对于canvas原点的坐标，所有显示的点都是canvas的点
 * land坐标，指相对于全部土地原点的坐标，land在canvas上移动
 * grid坐标，指land上某一块土地，(1,2)表示1行2列的土地的启起点
 */
export class LandCoordinate {
  private x: number;
  private y: number;
  private dragFromX: number;
  private dragFromY: number;
  private dragToX: number;
  private dragToY: number;
  private dragMoveX: number;
  private dragMoveY: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.dragFromX = 0;
    this.dragFromY = 0;

    this.dragToX = 0;
    this.dragToY = 0;

    this.dragMoveX = 0;
    this.dragMoveY = 0;
  }

  getPos(): IPos {
    return { x: this.x, y: this.y };
  }

  // dragStart, dragEnd, dragMove 配合使用，实现拖拽效果
  // 鼠标点击时，dragStart设置起点
  // 鼠标移动，dragEnd设置目标，调用dragMove移动land
  dragStart(x: number, y: number) {
    this.dragFromX = x;
    this.dragFromY = y;
  }

  dragEnd(x: number, y: number) {
    this.dragToX = x;
    this.dragToY = y;
  }

  dragMove() {
    this.dragMoveX = this.dragToX - this.dragFromX;
    this.dragMoveY = this.dragToY - this.dragFromY;
    this.x += this.dragMoveX;
    this.y += this.dragMoveY;
  }

  getMoved(): IPos {
    return { x: this.dragMoveX, y: this.dragMoveY };
  }

  // directMove 直接移动land
  directMove(offset: IPos) {
    this.x += offset.x;
    this.y += offset.y;
  }

  getCanvasMidPos(ctx: CanvasRenderingContext2D): IPos {
    return {
      x: ctx.canvas.width / 2 - this.x,
      y: ctx.canvas.height / 2 - this.y
    };
  }

  canvasPos2LandPos(pos: IPos): IPos {
    return {
      x: pos.x - this.x,
      y: pos.y - this.y
    };
  }

  setOriginPos(pos: IPos) {
    this.x = pos.x;
    this.y = pos.y;
  }

  static landPos2GridPos(pos: IPos): IGridPos {
    const r = Math.floor(pos.y / MacroScene.HouseSize);
    const c = Math.floor(pos.x / MacroScene.HouseSize);
    return { r, c };
  }

  static gridPos2LandPos(r: number, c: number): IPos {
    const x = c * MacroScene.HouseSize;
    const y = r * MacroScene.HouseSize;
    return { x, y };
  }

  static gridMiddle2LandPos(r: number, c: number): IPos {
    const x = c * MacroScene.HouseSize + MacroScene.HouseSize / 2;
    const y = r * MacroScene.HouseSize + MacroScene.HouseSize / 2;
    return { x, y };
  }
}
