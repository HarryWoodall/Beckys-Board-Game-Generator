import Coordinate from "./Coordinate.js";
import Peice from "./pieces/Piece.js";

export default class BoardTile {
  location: Coordinate;
  content: Peice[] = [];
  isEntry: boolean;
  debug: boolean;
  highlight1: boolean;
  highlight2: boolean;

  constructor(ord: Coordinate, isEntry: boolean, debug = false, highlight1 = false, highlight2 = false) {
    this.location = ord;
    this.isEntry = isEntry;
    this.debug = debug;
    this.highlight1 = highlight1;
    this.highlight2 = highlight2;
  }
}
