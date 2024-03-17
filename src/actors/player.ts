import Actor from "../actor";
import { Collision } from "../collisions";
import { clamp } from "../math";
import { Scene } from "../scene";
import { Colors, Sprites, joinPoints } from "../sprites";
import { V, Vector } from "../vector";
import { Asteroid } from "./asteroid";
import { Bullet } from "./bullet";
import { Particle } from "./particle";
import { Howl } from "howler";

export class Player extends Actor {
  velocity: Vector = V.create(0, 0);
  boosting = false;
  turningLeft = false;
  turningRight = false;
  firing = false;
  fireDelayProgress = 100000000000000;

  readonly rotationSpeed = 3;
  readonly accleration = 10;
  readonly fireDelay = 0.25;

  readonly fireSound = new Howl({
    src: "/assets/laser_blast.wav",
    loop: false,
  });

  readonly deathSound = new Howl({
    src: "/assets/player_explosion.flac",
  });

  constructor(scene: Scene, location: Vector) {
    super("Player", scene, Sprites.ship, location);
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.turningLeft = true;
      }
      if (e.key === "ArrowRight") {
        this.turningRight = true;
      }
      if (e.key === "ArrowUp") {
        this.boosting = true;
      }
      if (e.key === " ") {
        this.firing = true;
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") {
        this.turningLeft = false;
      }
      if (e.key === "ArrowRight") {
        this.turningRight = false;
      }
      if (e.key === "ArrowUp") {
        this.boosting = false;
      }
      if (e.key === " ") {
        this.firing = false;
      }
    });
  }

  act(delta: number) {
    // @ts-ignore
    const asteroids: Asteroid[] = this.scene.getActorsFromType("Asteroid");
    for (const asteroid of asteroids) {
      if (
        Collision.circleCircle(
          this.location,
          5,
          asteroid.location,
          asteroid.size,
        )
      ) {
        this.destroy();
        return;
      }
    }
    this.rotation +=
      ((this.turningRight ? 1 : 0) - (this.turningLeft ? 1 : 0)) *
      delta *
      this.rotationSpeed;

    this.velocity = V.add(
      this.velocity,
      V.createPolar(this.boosting ? 1 : 0, this.rotation),
    );

    this.location = V.add(
      this.location,
      V.scale(this.velocity, delta * this.accleration),
    );

    this.velocity = V.scale(this.velocity, 0.99);

    this.location = {
      x: clamp(this.location.x, -400, 400),
      y: clamp(this.location.y, -400, 400),
    };

    if (this.boosting) {
      const particle = new Particle(
        this.scene,
        Sprites[`ship-particle-${Math.floor(Math.random() * 3)}`],
        {
          duration: 1,
          from: {
            location: V.add(this.location, V.createPolar(-15, this.rotation)),
            rotation: Math.random() * Math.PI * 10,
            scale: Math.random() * 2,
          },
          to: {
            location: V.add(
              this.location,
              V.createPolar(
                Math.random() * 50 + 50,
                this.rotation + Math.PI + Math.random() * 2 - 1,
              ),
            ),
            rotation: Math.random() * Math.PI * 10,
            scale: 0,
          },
        },
      );
      this.scene.addActor(particle);
    }

    this.fireDelayProgress += delta;

    if (this.fireDelayProgress > this.fireDelay && this.firing) {
      this.scene.addActor(
        new Bullet(
          this.scene,
          V.add(this.location, V.createPolar(20, this.rotation)),
          this.rotation,
          V.add(this.velocity, V.createPolar(500, this.rotation)),
        ),
      );
      this.fireDelayProgress = 0;

      this.fireSound.play();
    }
  }

  destroy() {
    [...Array(20)].forEach((_) => {
      const rotation = Math.random() * Math.PI * 2;
      const particle = new Particle(
        this.scene,
        joinPoints([V.create(0, 0), V.create(50, 0)], Colors.foreground),
        {
          duration: 1,
          from: {
            location: this.location,
            rotation: rotation,
            scale: 0,
          },
          to: {
            location: V.add(this.location, V.createPolar(1500, rotation)),
            rotation: rotation,
            scale: 20,
          },
        },
      );
      this.scene.addActor(particle);
    });

    this.deathSound.play();

    this.scene.removeActor(this);
  }
}
