import { PeiceNames } from "../../constants/peices.js";
import Board from "../Board.js";
import Coordinate from "../Coordinate.js";
import Peice from "./Piece.js";
import { findRandomEmptyBoardTile } from "../../helpers/tileLocator.js";

export default class LargeTreasure extends Peice {
  constructor() {
    super(PeiceNames.LARGE_TREASURE);
  }

  findTile(board: Board): Coordinate {
    let validTiles = board.getEmptyTiles();
    validTiles = validTiles.filter((tile) => !board.isTileNextToEntrance(tile));
    validTiles = validTiles.filter((tile) => !board.isTileNextToType(tile, [PeiceNames.SMALL_TREASURE, PeiceNames.LARGE_TREASURE]));

    return findRandomEmptyBoardTile(board, validTiles);
  }
}
