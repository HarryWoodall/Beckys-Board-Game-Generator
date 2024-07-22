import { findRandomEmptyBoardTile } from "../../helpers/tileLocator.js";
import { PeiceNames } from "../../constants/peices.js";
import Board from "../Board.js";
import Coordinate from "../Coordinate.js";
import Peice from "./Piece.js";

export default class SmallTreasure extends Peice {
  constructor() {
    super(PeiceNames.SMALL_TREASURE);
  }

  findTile(board: Board): Coordinate {
    return findRandomEmptyBoardTile(board);
  }
}
