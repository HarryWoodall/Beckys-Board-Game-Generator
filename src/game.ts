import Board from "./models/Board";
import LargePowerup from "./models/pieces/LargePowerup";
import LargeTrap from "./models/pieces/LargeTrap";
import LargeTreasure from "./models/pieces/LargeTreasure";
import SmallPowerup from "./models/pieces/SmallPowerup";
import SmallTrap from "./models/pieces/SmallTrap";
import SmallTreasure from "./models/pieces/SmallTreasure";
import Wall from "./models/pieces/Wall";

export default function game() {
  const board = new Board(7, 7);

  // board.addPeice(new Wall());
  // board.addPeice(new Wall());
  // board.addPeice(new Wall());
  // board.addPeice(new Wall());
  board.addPeice(new Wall());

  // board.addPeice(new SmallTrap());
  // board.addPeice(new SmallTrap());
  // board.addPeice(new SmallTrap());
  board.addPeice(new SmallTrap());

  board.addPeice(new LargeTrap());

  board.addPeice(new SmallTreasure());

  board.addPeice(new LargeTreasure());

  board.addPeice(new SmallPowerup());

  board.addPeice(new LargePowerup());

  return board.tiles;
}
