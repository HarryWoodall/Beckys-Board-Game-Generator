import { PeiceNames } from "../../constants/peices.js";
import Peice from "./Piece.js";
import Board from "../Board.js";
import Coordinate from "../Coordinate.js";
import { findRandomEmptyBoardTile } from "../../helpers/tileLocator.js";

export default class LargeTrap extends Peice {
  constructor() {
    super(PeiceNames.LARGE_TRAP);
  }

  findTile(board: Board): Coordinate {
    return findRandomEmptyBoardTile(board);
  }
}
