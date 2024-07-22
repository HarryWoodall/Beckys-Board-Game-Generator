import Board from "./models/Board.js";
import LargePowerup from "./models/pieces/LargePowerup.js";
import LargeTrap from "./models/pieces/LargeTrap.js";
import LargeTreasure from "./models/pieces/LargeTreasure.js";
import SmallPowerup from "./models/pieces/SmallPowerup.js";
import SmallTrap from "./models/pieces/SmallTrap.js";
import SmallTreasure from "./models/pieces/SmallTreasure.js";
import Wall from "./models/pieces/Wall.js";
import { createSketch } from "./sketch.js";

export type GameSettings = {
  dimentions: {
    width: number;
    height: number;
  };
  pieceCounts: {
    wall: number;
    smallTrap: number;
    largeTrap: number;
    smallTreasure: number;
    largeTreasure: number;
    smallPowerup: number;
    largePowerup: number;
  };
};

export const defaultSettings: GameSettings = {
  dimentions: {
    width: 7,
    height: 7,
  },
  pieceCounts: {
    wall: 1,
    smallTrap: 1,
    largeTrap: 1,
    smallTreasure: 1,
    largeTreasure: 1,
    smallPowerup: 1,
    largePowerup: 1,
  },
};

export default function game(settings: GameSettings = defaultSettings) {
  const board = new Board(settings.dimentions.width, settings.dimentions.height);

  for (let i = 0; i < settings.pieceCounts.wall; i++) {
    board.addPeice(new Wall());
  }

  for (let i = 0; i < settings.pieceCounts.smallTrap; i++) {
    board.addPeice(new SmallTrap());
  }

  for (let i = 0; i < settings.pieceCounts.largeTrap; i++) {
    board.addPeice(new LargeTrap());
  }

  for (let i = 0; i < settings.pieceCounts.smallTreasure; i++) {
    board.addPeice(new SmallTreasure());
  }

  for (let i = 0; i < settings.pieceCounts.largeTreasure; i++) {
    board.addPeice(new LargeTreasure());
  }

  for (let i = 0; i < settings.pieceCounts.smallPowerup; i++) {
    board.addPeice(new SmallPowerup());
  }

  for (let i = 0; i < settings.pieceCounts.largePowerup; i++) {
    board.addPeice(new LargePowerup());
  }

  const image = createSketch(board.tiles);

  const payload = {
    tiles: board.tiles,
    image: image,
  };

  return payload;
}
