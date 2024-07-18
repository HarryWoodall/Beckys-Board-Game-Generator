import { PeiceNames } from "../../constants/peices.js";
import Board from "../Board.js";
import Coordinate from "../Coordinate.js";
import Peice from "./Piece.js";

export default class LargePowerup extends Peice {
  constructor() {
    super(PeiceNames.LARGE_POWERUP);
  }

  findTile(board: Board): Coordinate {
    return board.getRandomEmptyTile().location;
  }
}
