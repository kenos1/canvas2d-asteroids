import { Scene } from "./scene";
import { Vector } from "./vector";
import { Sprite } from "./sprites";
import { V } from "./vector";
import { drawSprite } from "./rendering";

export default class Actor {
  scene: Scene;
  type: string;
  location: Vector;
  sprite: Sprite;
  rotation: number = 0;
  scale: number = 1;

  constructor(type: string, scene: Scene, sprite: Sprite, location: Vector) {
    this.type = type;
    this.scene = scene;
    this.location = location;
    this.sprite = sprite;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.scale === 1) {
      drawSprite(
        this.sprite,
        this.location,
        this.scene.camera.zoom * this.scene.scale,
        this.rotation,
        V.add(this.scene.camera.location, this.scene.initialCameraLocation),
        ctx,
      );
      return;
    }
    const scaledSprite = { ...this.sprite };

    scaledSprite.lines = scaledSprite.lines.map((line) => ({
      color: line.color,
      from: V.scale(line.from, this.scale),
      to: V.scale(line.to, this.scale),
    }));

    drawSprite(
      scaledSprite,
      this.location,
      this.scene.camera.zoom * this.scene.scale,
      this.rotation,
      V.add(this.scene.camera.location, this.scene.initialCameraLocation),
      ctx,
    );
  }

  public getLocation() {
    return this.location;
  }

  act(delta: number): void {}
}
