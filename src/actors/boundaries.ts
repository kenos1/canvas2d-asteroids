import Actor from "../actor";
import { Scene } from "../scene";
import { Colors, generateRegularPolygon } from "../sprites";
import { V } from "../vector";

export class Boundaries extends Actor {
  constructor(scene: Scene) {
    super(
      "Boundaries",
      scene,
      generateRegularPolygon(4, 400 * Math.sqrt(2), Colors.foreground),
      V.create(0, 0),
    );
    this.rotation = Math.PI / 4;
  }
}
