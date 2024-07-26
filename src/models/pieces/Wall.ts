import { findRandomEmptyBoardTile } from "../../helpers/tileLocator.js";
import { PeiceNames } from "../../constants/peices.js";
import Board from "../Board.js";
import Coordinate from "../Coordinate.js";
import Peice from "./Piece.js";

export default class Wall extends Peice {
  constructor() {
    super(PeiceNames.WALL);
  }

  findTile(board: Board): Coordinate {
    const ord = findRandomEmptyBoardTile(board);
    return ord;
  }
}
