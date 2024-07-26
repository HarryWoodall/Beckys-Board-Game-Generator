export default interface Coordinate {
  x: number;
  y: number;
}

export function isCoordinateEqual(ord1: Coordinate, ord2: Coordinate) {
  return ord1.x === ord2.x && ord1.y == ord2.y;
}
