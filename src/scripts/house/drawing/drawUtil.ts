import { MacroScene } from "@/scripts/house/macro";
import { IPos } from "@/scripts/house/interfaces";

export const drawWrapper = (
  ctx: CanvasRenderingContext2D,
  pos: IPos,
  callback: Function
) => {
  ctx.save();
  ctx.translate(pos.x, pos.y);
  ctx.beginPath();
  callback(ctx, pos);
  ctx.closePath();
  ctx.restore();
};

export const rectInCanvas = (
  ctx: CanvasRenderingContext2D,
  objPos: IPos,
  pos: IPos,
  objSize: number
) => {
  const fixedX = objPos.x + pos.x;
  const fixedY = objPos.y + pos.y;
  const inView =
    fixedX >= -objSize &&
    fixedX <= ctx.canvas.width &&
    fixedY >= -objSize &&
    fixedY <= ctx.canvas.height;
  return inView;
};

export const drawImageMid = (
  ctx: CanvasRenderingContext2D,
  midPos: IPos,
  image: CanvasImageSource,
  imageSize: number
) => {
  ctx.drawImage(
    image,
    midPos.x - imageSize / 2,
    midPos.y - imageSize / 2,
    imageSize,
    imageSize
  );
};

export const surround = (r: number, c: number, distance: number) => {
  const rows = [];
  const cols = [];
  for (let ri = r - distance; ri <= r + distance; ri++) {
    if (ri < 0 || ri >= MacroScene.RowNum) continue;
    for (let ci = c - distance; ci <= c + distance; ci++) {
      if (ci < 0 || ci >= MacroScene.ColNum) continue;
      rows.push(ri);
      cols.push(ci);
    }
  }
  return { rows, cols };
};
