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
    let validTiles = board.getEmptyTiles();
    validTiles = validTiles.filter((tile) => !board.isTileNextToEntrance(tile));
    validTiles = validTiles.filter((tile) => !board.isTileNextToType(tile, [PeiceNames.SMALL_TREASURE, PeiceNames.LARGE_TREASURE]));

    return findRandomEmptyBoardTile(board, validTiles);
  }
}
