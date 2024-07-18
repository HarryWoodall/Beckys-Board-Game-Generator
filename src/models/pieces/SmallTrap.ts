import { PeiceNames } from "../../constants/peices";
import Peice from "./Piece";
import Board from "../Board";
import Coordinate from "../Coordinate";

export default class SmallTrap extends Peice {
  constructor() {
    super(PeiceNames.SMALL_TRAP);
  }

  findTile(board: Board): Coordinate {
    return board.getRandomEmptyTile().location;
  }
}
