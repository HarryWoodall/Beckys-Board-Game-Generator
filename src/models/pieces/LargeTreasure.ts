import { PeiceNames } from "../../constants/peices";
import Board from "../Board";
import Coordinate from "../Coordinate";
import Peice from "./Piece";

export default class LargeTreasure extends Peice {
  constructor() {
    super(PeiceNames.LARGE_TREASURE);
  }

  findTile(board: Board): Coordinate {
    return board.getRandomEmptyTile().location;
  }
}
