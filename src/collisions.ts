import { V, Vector } from "./vector";

export namespace Collision {
  export function circleCircle(
    aPos: Vector,
    aRad: number,
    bPos: Vector,
    bRad: number,
  ) {
    return aRad + bRad > V.len(V.add(aPos, V.scale(bPos, -1)));
  }

  export function pointCircle(point: Vector, cPos: Vector, cRad: number) {
    return cRad > V.len(V.add(point, V.scale(cPos, -1)));
  }
}
