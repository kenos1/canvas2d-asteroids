import { V, Vector } from "./vector";

export const Colors: Record<string, string> = {
  background: "#002b36",
  foreground: "#fdf6e3",
  red: "#dc322f",
  orange: "#cb4b16",
  yellow: "#b58900",
};

export type Sprite = {
  lines: Array<{
    from: Vector;
    to: Vector;
    color: string;
  }>;
};

export const Sprites: Record<string, Sprite> = {
  ship: {
    lines: [
      {
        from: V.create(-10, 10),
        to: V.create(15, 0),
        color: Colors.foreground,
      },
      {
        from: V.create(-10, -10),
        to: V.create(15, 0),
        color: Colors.foreground,
      },
      {
        from: V.create(-10, -10),
        to: V.create(-10, 10),
        color: Colors.foreground,
      },
    ],
  },
  "ship-particle-0": generateRegularPolygon(3, 5, Colors.red),
  "ship-particle-1": generateRegularPolygon(3, 5, Colors.orange),
  "ship-particle-2": generateRegularPolygon(3, 5, Colors.yellow),
  bullet: joinPoints(
    [V.create(0, 0), V.create(-2, -2), V.create(-20, 0), V.create(-2, 2)],
    Colors.orange,
  ),
  spark: joinPoints([V.create(0, 0), V.create(10, 0)], Colors.orange),
};

export function generateRegularPolygonPoints(
  sides: number,
  radius: number,
): Array<Vector> {
  return [...Array(sides).keys()].map((p) =>
    V.createPolar(radius, ((Math.PI * 2) / sides) * p),
  );
}

export function joinPoints(points: Array<Vector>, color: string): Sprite {
  return {
    lines: points.map((point, i, arr) => ({
      color: color,
      from: point,
      to: i + 1 === arr.length ? arr[0] : arr[i + 1],
    })),
  };
}

export function generateRegularPolygon(
  sides: number,
  radius: number,
  color: string,
): Sprite {
  return joinPoints(generateRegularPolygonPoints(sides, radius), color);
}
