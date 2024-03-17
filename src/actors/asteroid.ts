import Actor from "../actor";
import { clamp } from "../math";
import { Scene } from "../scene";
import {
  Colors,
  generateRegularPolygon,
  generateRegularPolygonPoints,
  joinPoints,
} from "../sprites";
import { V, Vector } from "../vector";
import { Particle } from "./particle";

export class Asteroid extends Actor {
  rotationSpeed: number;
  velocity: Vector;
  size: number;
  health: number;

  readonly explodeSound = new Howl({
    src: "/assets/explosion.wav",
  });

  constructor(scene: Scene, location: Vector, size: number) {
    super(
      "Asteroid",
      scene,
      joinPoints(
        generateRegularPolygonPoints(16, size).map((v) =>
          V.add(v, { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 }),
        ),
        Colors.foreground,
      ),
      location,
    );

    this.size = size;
    this.health = size;

    this.rotationSpeed = Math.random() * 0.5;
    this.rotationSpeed *= Math.random() > 0.5 ? 1 : -1;

    this.velocity = V.createPolar(
      Math.random() * 2,
      Math.random() * Math.PI * 2,
    );
  }

  act(delta: number): void {
    if (this.health <= 0) {
      this.destroy();
      return;
    }
    if (Math.abs(this.location.x) > 400) {
      this.location.x = clamp(this.location.x, -399, 399);
      this.velocity.x *= -1;
    }
    if (Math.abs(this.location.y) > 400) {
      this.location.y = clamp(this.location.y, -399, 399);
      this.velocity.y *= -1;
    }
    this.rotation += this.rotationSpeed * delta;
    this.location = V.add(this.location, this.velocity);
  }

  damage(amount: number) {
    this.health = this.health - amount;
  }

  destroy() {
    if (this.size >= 30) {
      [...Array(3).keys()].forEach((i) => {
        const particle = new Particle(
          this.scene,
          generateRegularPolygon(
            12,
            ((i + 1) * this.size) / 3,
            i === 0 ? Colors.yellow : i === 1 ? Colors.orange : Colors.red,
          ),
          {
            duration: 100,
            from: {
              location: this.location,
              rotation: 0,
              scale: 1,
            },
            to: {
              location: this.location,
              rotation: 0,
              scale: this.size / 3,
            },
          },
        );
        this.scene.addActor(particle);
      });
    }
    if (this.size >= 10) {
      this.explodeSound.play();

      [...Array(3).keys()].forEach((i) => {
        const asteroid = new Asteroid(this.scene, this.location, this.size / 3);
        asteroid.velocity = V.createPolar(
          V.len(this.velocity),
          (Math.PI * 2 * i) / 3 + this.rotation,
        );
        this.scene.addActor(asteroid);
      });
    }

    this.scene.removeActor(this);
  }
}
