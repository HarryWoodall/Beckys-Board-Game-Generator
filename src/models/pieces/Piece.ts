import Board from "../Board";
import Coordinate from "../Coordinate";

export default abstract class Peice {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract findTile(board: Board): Coordinate;
}
