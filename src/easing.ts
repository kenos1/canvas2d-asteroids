export namespace Easing {
  export function linear(min: number, max: number, t: number) {
    return min + (max - min) * t;
  }
}
