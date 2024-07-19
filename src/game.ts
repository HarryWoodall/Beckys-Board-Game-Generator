import Board from "./models/Board.js";
import LargePowerup from "./models/pieces/LargePowerup.js";
import LargeTrap from "./models/pieces/LargeTrap.js";
import LargeTreasure from "./models/pieces/LargeTreasure.js";
import SmallPowerup from "./models/pieces/SmallPowerup.js";
import SmallTrap from "./models/pieces/SmallTrap.js";
import SmallTreasure from "./models/pieces/SmallTreasure.js";
import Wall from "./models/pieces/Wall.js";
import { createSketch } from "./sketch.js";

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

  const image = createSketch(board.tiles);

  const payload = {
    tiles: board.tiles,
    image: image,
  };

  return payload;
}
