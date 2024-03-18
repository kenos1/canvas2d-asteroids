import Actor from "../actor";
import { Scene } from "../scene";
import { Colors } from "../sprites";
import { V } from "../vector";

export class StatusMonitor extends Actor {
  fps: number;
  delayProgress: number = 1000000000000000;
  readonly delay = 1;
  zIndex = 99999;

  constructor(scene: Scene) {
    super("StatusMonitor", scene, { lines: [] }, V.create(20, 20));
  }

  render(ctx: CanvasRenderingContext2D): void {
    const location = this.location;
    ctx.strokeStyle = Colors.foreground;
    ctx.strokeText(`${this.fps} fps`, location.x, location.y);
    ctx.strokeText(`delta: ${1 / this.fps}`, location.x, location.y + 20);
    ctx.strokeText(
      `zoom: ${this.scene.camera.zoom}`,
      location.x,
      location.y + 40,
    );
    ctx.strokeText(`scale: ${this.scene.scale}`, location.x, location.y + 60);
    ctx.strokeText(
      `camera: ${this.scene.camera.location.x}, ${this.scene.camera.location.y}`,
      location.x,
      location.y + 80,
    );
  }

  act(delta: number): void {
    this.delayProgress += delta;
    if (this.delayProgress < this.delay) {
      return;
    }
    this.fps = Math.ceil(1 / delta);
    this.delayProgress = 0;
  }
}
