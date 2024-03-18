import Actor from "./actor";
import { V, Vector } from "./vector";

export class Scene {
  objects: Array<Actor>;
  background: string;
  ctx: CanvasRenderingContext2D;
  initialCameraLocation = V.create(0, 0);
  scale: number = 1;
  camera: {
    location: Vector;
    zoom: number;
  } = {
    location: V.create(0, 0),
    zoom: 1,
  };

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.objects = [];
  }

  addActor(actor: Actor) {
    this.objects.push(actor);
  }

  removeActor(actor: Actor) {
    this.objects = this.objects.filter((a) => a != actor);
  }

  getActorsFromType(type: string) {
    return [...this.objects].filter((a) => a.type === type);
  }

  render() {
    this.objects.sort((a, b) => a.zIndex - b.zIndex);

    const ctx = this.ctx;

    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, 10000, 10000);

    this.objects.forEach((object) => {
      object.render(this.ctx);
    });
  }

  act(delta: number) {
    this.objects.forEach((object) => {
      object.act(delta);
    });
  }
}
