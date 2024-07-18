import { PeiceNames } from "../../constants/peices";
import Board from "../Board";
import Coordinate from "../Coordinate";
import Peice from "./Piece";

export default class Wall extends Peice {
  constructor() {
    super(PeiceNames.WALL);
  }

  findTile(board: Board): Coordinate {
    return board.getRandomEmptyTile().location;
  }
}
