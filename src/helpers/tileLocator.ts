import BoardTile from "../../src/models/BoardTile";
import Board from "../models/Board";
import Coordinate from "../models/Coordinate";

export function findRandomEmptyBoardTile(board: Board, tileSet?: BoardTile[]): Coordinate | null {
  const tile = board.getRandomEmptyTile(tileSet);
  if (!tile) return null;

  return tile.location;
}
