import { Sprite } from "./sprites";
import { V, Vector } from "./vector";

export const drawSprite = (
  sprite: Sprite,
  location: Vector,
  scale: number,
  rotation: number,
  cameraLocation: Vector,
  ctx: CanvasRenderingContext2D,
) => {
  sprite.lines.forEach((line) => {
    ctx.strokeStyle = line.color;
    const transformedFrom = V.add(
      V.scale(V.add(V.rotate(line.from, rotation), location), scale),
      cameraLocation,
    );
    const transformedTo = V.add(
      V.scale(V.add(V.rotate(line.to, rotation), location), scale),
      cameraLocation,
    );

    ctx.beginPath();
    ctx.moveTo(transformedFrom.x, transformedFrom.y);
    ctx.lineTo(transformedTo.x, transformedTo.y);
    ctx.stroke();
  });
};
