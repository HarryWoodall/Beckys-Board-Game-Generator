import Board from "../Board.js";
import Coordinate from "../Coordinate.js";

export default abstract class Peice {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract findTile(board: Board): Coordinate;
}
