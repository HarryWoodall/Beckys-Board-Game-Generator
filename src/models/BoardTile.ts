import Coordinate from "./Coordinate.js";
import Peice from "./pieces/Piece.js";

export default class BoardTile {
  location: Coordinate;
  content: Peice[] = [];

  constructor(ord: Coordinate) {
    this.location = ord;
  }
}
