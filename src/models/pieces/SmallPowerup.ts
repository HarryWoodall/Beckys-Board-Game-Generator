import { PeiceNames } from "../../constants/peices";
import Board from "../Board";
import Coordinate from "../Coordinate";
import Peice from "./Piece";

export default class SmallPowerup extends Peice {
  constructor() {
    super(PeiceNames.SMALL_POWERUP);
  }

  findTile(board: Board): Coordinate {
    return board.getRandomEmptyTile().location;
  }
}
