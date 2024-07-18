import Coordinate from "./Coordinate";
import Peice from "./pieces/Piece";

export default class BoardTile {
  location: Coordinate;
  content: Peice[] = [];

  constructor(ord: Coordinate) {
    this.location = ord;
  }
}
