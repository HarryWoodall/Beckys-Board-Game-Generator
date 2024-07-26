import { PeiceNames } from "../../constants/peices.js";
import Peice from "./Piece.js";
import Board from "../Board.js";
import Coordinate from "../Coordinate.js";
import { findRandomEmptyBoardTile } from "../../helpers/tileLocator.js";
import BoardTile from "../BoardTile.js";

export default class SmallTrap extends Peice {
  proximityMultiplier;

  constructor(proximityMultiplier: number = 1) {
    super(PeiceNames.SMALL_TRAP);
    this.proximityMultiplier = proximityMultiplier;
  }

  findTile(board: Board): Coordinate {
    let validTiles = board.getEmptyTiles();
    validTiles = validTiles.filter((tile) => !board.isTileNextToType(tile, [PeiceNames.SMALL_TRAP, PeiceNames.LARGE_TRAP]));

    const smallTreasureTiles = board.getTilesWithPieces(PeiceNames.SMALL_TREASURE);

    for (const treasureTile of smallTreasureTiles) {
      let proximityTiles = board.getAjacentTiles(treasureTile, true);
      proximityTiles = proximityTiles.filter((tile) => !board.isTileNextToType(tile, [PeiceNames.SMALL_TRAP, PeiceNames.LARGE_TRAP]));
      // proximityTiles.forEach((p) => (p.highlight2 = true));
      for (let i = 1; i < this.proximityMultiplier; i++) {
        validTiles.push(...JSON.parse(JSON.stringify(proximityTiles)));
      }
    }

    const foundCoordinate = findRandomEmptyBoardTile(board, validTiles);

    // validTiles.forEach((x) => (x.debug = true));
    // board.getTile(foundCoordinate).highlight1 = true;
    return foundCoordinate;
  }
}
