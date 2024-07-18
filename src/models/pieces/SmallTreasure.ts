import { PeiceNames } from "../../constants/peices";
import Board from "../Board";
import Coordinate from "../Coordinate";
import Peice from "./Piece";

export default class SmallTreasure extends Peice {
  constructor() {
    super(PeiceNames.SMALL_TREASURE);
  }

  findTile(board: Board): Coordinate {
    return board.getRandomEmptyTile().location;
  }
}
