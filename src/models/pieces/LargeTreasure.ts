import { PeiceNames } from "../../constants/peices.js";
import Board from "../Board.js";
import Coordinate from "../Coordinate.js";
import Peice from "./Piece.js";

export default class LargeTreasure extends Peice {
  constructor() {
    super(PeiceNames.LARGE_TREASURE);
  }

  findTile(board: Board): Coordinate {
    return board.getRandomEmptyTile().location;
  }
}
