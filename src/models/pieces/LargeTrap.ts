import { PeiceNames } from "../../constants/peices";
import Peice from "./Piece";
import Board from "../Board";
import Coordinate from "../Coordinate";

export default class LargeTrap extends Peice {
  constructor() {
    super(PeiceNames.LARGE_TRAP);
  }

  findTile(board: Board): Coordinate {
    return board.getRandomEmptyTile().location;
  }
}
