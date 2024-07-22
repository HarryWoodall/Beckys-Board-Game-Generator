import { PeiceNames } from "../../constants/peices.js";
import Board from "../Board.js";
import Coordinate from "../Coordinate.js";
import Peice from "./Piece.js";
import { findRandomEmptyBoardTile } from "../../helpers/tileLocator.js";

export default class SmallPowerup extends Peice {
  constructor() {
    super(PeiceNames.SMALL_POWERUP);
  }

  findTile(board: Board): Coordinate {
    return findRandomEmptyBoardTile(board);
  }
}
