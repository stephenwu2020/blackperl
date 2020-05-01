export interface ICanvasElem {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}

export interface IPos {
  x: number;
  y: number;
}

export interface IGridPos {
  r: number; // 行
  c: number; // 列
}

export interface IImageSrc {
  name: string;
  obj: HTMLImageElement;
}
