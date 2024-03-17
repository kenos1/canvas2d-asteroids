export type Vector = {
  x: number;
  y: number;
};

export namespace V {
  /**
   * Creates a Vector
   */
  export function create(x: number, y: number): Vector {
    return { x: x, y: y };
  }

  export function createPolar(len: number, radians: number): Vector {
    return rotate(create(len, 0), radians);
  }

  /**
   * Adds two vectors together
   */
  export function add(a: Vector, b: Vector): Vector {
    return { x: a.x + b.x, y: a.y + b.y };
  }

  /**
   * Rotates a Vector
   */
  export function rotate(v: Vector, radians: number): Vector {
    const length = len(v);
    const rotation = angle(v);
    return {
      x: Math.cos(rotation + radians) * length,
      y: Math.sin(rotation + radians) * length,
    };
  }

  export function setLength(v: Vector, len: number): Vector {
    return rotate(create(len, 0), angle(v));
  }

  export function scale(v: Vector, scale: number): Vector {
    return createPolar(len(v) * scale, angle(v));
  }

  export function len(v: Vector): number {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  export function angle(v: Vector): number {
    return Math.atan2(v.y, v.x);
  }
}
