import { MacroScene } from "@/scripts/house/macro";
import { IPos } from "@/scripts/house/interfaces";

export class LandRender {
  private lineColor: string;
  private lineWidth: number;

  constructor() {
    this.lineColor = "black";
    this.lineWidth = 0.1;
  }

  draw(ctx: CanvasRenderingContext2D, pos: IPos) {
    this.drawRows(ctx, pos);
    this.drawCols(ctx, pos);
  }

  drawRows(ctx: CanvasRenderingContext2D, pos: IPos) {
    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = this.lineWidth;
    let lineY = 0;
    let fixedY = 0;
    ctx.lineWidth = this.lineWidth;
    for (let i = 0; i <= MacroScene.ColNum; i++) {
      lineY = i * MacroScene.HouseSize;
      fixedY = lineY + pos.y;
      if (fixedY >= 0 && fixedY <= ctx.canvas.height) {
        ctx.moveTo(0, lineY);
        ctx.lineTo(MacroScene.RowNum * MacroScene.HouseSize, lineY);
      }
    }
    ctx.stroke();
  }

  drawCols(ctx: CanvasRenderingContext2D, pos: IPos) {
    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = this.lineWidth;
    let lineX = 0;
    let fixedX = 0;
    for (let i = 0; i <= MacroScene.RowNum; i++) {
      lineX = i * MacroScene.HouseSize;
      fixedX = lineX + pos.x;
      if (fixedX >= 0 && fixedX <= ctx.canvas.width) {
        ctx.moveTo(lineX, 0);
        ctx.lineTo(lineX, MacroScene.ColNum * MacroScene.HouseSize);
      }
    }
    ctx.stroke();
  }
}
