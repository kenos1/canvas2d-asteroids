import Actor from "../actor";
import { Easing } from "../easing";
import { Scene } from "../scene";
import { Sprite } from "../sprites";
import { Vector } from "../vector";

type ParticleKF = {
  location: Vector;
  rotation: number;
  scale: number;
};

export type ParticleOptions = {
  from: ParticleKF;
  to: ParticleKF;
  duration: number;
};

export class Particle extends Actor {
  options: ParticleOptions;
  progress: number = 0;

  constructor(scene: Scene, sprite: Sprite, options: ParticleOptions) {
    super("Particle", scene, sprite, options.from.location);
    this.options = options;
  }

  act(delta: number): void {
    if (this.progress > this.options.duration) this.scene.removeActor(this);
    this.progress = this.progress + delta;
    this.location = {
      x: Easing.linear(
        this.options.from.location.x,
        this.options.to.location.x,
        this.progress,
      ),
      y: Easing.linear(
        this.options.from.location.y,
        this.options.to.location.y,
        this.progress,
      ),
    };
    this.rotation = Easing.linear(
      this.options.from.rotation,
      this.options.to.rotation,
      this.progress,
    );
    this.scale = Easing.linear(
      this.options.from.scale,
      this.options.to.scale,
      this.progress,
    );
  }
}
