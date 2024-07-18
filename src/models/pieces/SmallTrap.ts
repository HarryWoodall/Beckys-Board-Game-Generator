import { PeiceNames } from "../../constants/peices.js";
import Peice from "./Piece.js";
import Board from "../Board.js";
import Coordinate from "../Coordinate.js";

export default class SmallTrap extends Peice {
  constructor() {
    super(PeiceNames.SMALL_TRAP);
  }

  findTile(board: Board): Coordinate {
    return board.getRandomEmptyTile().location;
  }
}
