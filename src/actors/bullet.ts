import Actor from "../actor";
import { V, Vector } from "../vector";
import { Scene } from "../scene";
import { Sprites } from "../sprites";
import { Particle } from "./particle";
import { Asteroid } from "./asteroid";
import { Collision } from "../collisions";

export class Bullet extends Actor {
  velocity: Vector;
  life = 0;
  readonly lifeTime = 5;
  readonly damage = 5;

  constructor(
    scene: Scene,
    location: Vector,
    rotation: number,
    velocity: Vector,
  ) {
    super("Bullet", scene, Sprites.bullet, location);
    this.rotation = rotation;
    this.velocity = velocity;
  }

  act(delta: number): void {
    // @ts-expect-error they are asteroids
    const asteroids: Asteroid[] = this.scene.getActorsFromType("Asteroid");
    for (const asteroid of asteroids) {
      if (
        Collision.pointCircle(this.location, asteroid.location, asteroid.size)
      ) {
        asteroid.damage(this.damage);
        this.destroy();
        return;
      }
    }

    if (
      Math.abs(this.location.x) > 400 ||
      Math.abs(this.location.y) > 400 ||
      this.life > this.lifeTime
    ) {
      this.destroy();
      return;
    }
    this.life = this.life + delta;
    this.location = V.add(this.location, V.scale(this.velocity, delta));
    this.velocity = V.scale(this.velocity, 0.999);
  }

  destroy() {
    [...Array(Math.ceil(Math.random() * 10) + 10).keys()].forEach((_) => {
      const rotation = Math.random() * Math.PI * 2;
      this.scene.addActor(
        new Particle(this.scene, Sprites.spark, {
          duration: 1,
          from: {
            location: this.location,
            rotation: rotation,
            scale: 1,
          },
          to: {
            location: V.add(
              this.location,
              V.createPolar(Math.random() * 10 + 10, rotation),
            ),
            rotation: rotation,
            scale: 0,
          },
        }),
      );
    });
    this.scene.removeActor(this);
  }
}
