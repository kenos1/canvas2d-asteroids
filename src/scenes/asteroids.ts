import { Player } from "../actors/player";
import { StatusMonitor } from "../actors/statusmonitor";
import { Boundaries } from "../actors/boundaries";
import { Scene } from "../scene";
import { V } from "../vector";
import { Asteroid } from "../actors/asteroid";

export class Asteroids extends Scene {
  asteroidSpawner: number;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    this.addActor(new StatusMonitor(this));

    this.addActor(new Boundaries(this));

    this.asteroidSpawner = setInterval(() => {
      const players = this.getActorsFromType("Player");
      for (const player of players) {
        this.addActor(
          new Asteroid(
            this,
            V.add(
              player.location,
              V.createPolar(
                Math.random() * 200 + 100,
                Math.random() * Math.PI * 2,
              ),
            ),
            Math.random() * 50 + 50,
          ),
        );
      }
    }, 5000);
  }

  startGame() {
    this.addActor(new Player(this, V.create(0, 0)));
  }
}
