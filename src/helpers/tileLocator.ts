import Board from "../models/Board";
import Coordinate from "../models/Coordinate";

export function findRandomEmptyBoardTile(board: Board): Coordinate | null {
  const tile = board.getRandomEmptyTile();
  if (!tile) return null;

  return tile.location;
}
