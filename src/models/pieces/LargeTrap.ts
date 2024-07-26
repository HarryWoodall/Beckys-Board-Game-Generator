import { PeiceNames } from "../../constants/peices.js";
import Peice from "./Piece.js";
import Board from "../Board.js";
import Coordinate from "../Coordinate.js";
import { findRandomEmptyBoardTile } from "../../helpers/tileLocator.js";

export default class LargeTrap extends Peice {
  proximityMultiplier;

  constructor(proximityMultiplier: number = 1) {
    super(PeiceNames.LARGE_TRAP);
    this.proximityMultiplier = proximityMultiplier;
  }

  findTile(board: Board): Coordinate {
    let validTiles = board.getEmptyTiles();
    validTiles = validTiles.filter((tile) => !board.isTileNextToType(tile, [PeiceNames.SMALL_TRAP, PeiceNames.LARGE_TRAP]));

    const largeTreasureTiles = board.getTilesWithPieces(PeiceNames.LARGE_TREASURE);

    for (const treasureTile of largeTreasureTiles) {
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
