import PeiceFactory from "./factories/PeiceFactory.js";
import { imageKeySketch } from "./imageKey.js";
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
  maxIterations: number;
  smallTrapMultiplier: number;
  largeTrapMultiplier: number;
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
  maxIterations: 100,
  smallTrapMultiplier: 3,
  largeTrapMultiplier: 3,
};

export default function game(settings: GameSettings = defaultSettings, boardString?: string) {
  const board = new Board(settings.dimentions.width, settings.dimentions.height);

  let currentIteration = 0;
  const ignoreInvalidBoard = false;

  if (boardString) {
    setupFromString(board, boardString);
  } else {
    do {
      addPeicesToBoard(board, settings);
      currentIteration++;
    } while (!board.validate(settings) && currentIteration < settings.maxIterations);

    if (board.validate(settings) || ignoreInvalidBoard) {
      console.log(`valid board after ${currentIteration} iterations`);
    } else {
      console.log(`failed to find a valid board: exiting...`);
      return {
        error: "No valid board states found",
      };
    }
  }

  imageKeySketch(board.tiles);
  const image = createSketch(board.tiles);

  const payload = {
    tiles: board.tiles,
    boardString: board.convertToString(),
    image: image,
    iteration: currentIteration,
  };

  return payload;
}

function addPeicesToBoard(board: Board, settings: GameSettings) {
  board.resetTiles();

  for (let i = 0; i < settings.pieceCounts.smallTreasure; i++) {
    board.addPeice(new SmallTreasure());
  }

  for (let i = 0; i < settings.pieceCounts.largeTreasure; i++) {
    board.addPeice(new LargeTreasure());
  }

  for (let i = 0; i < settings.pieceCounts.smallTrap; i++) {
    board.addPeice(new SmallTrap(settings.smallTrapMultiplier));
  }

  for (let i = 0; i < settings.pieceCounts.largeTrap; i++) {
    board.addPeice(new LargeTrap(settings.largeTrapMultiplier));
  }

  for (let i = 0; i < settings.pieceCounts.wall; i++) {
    board.addPeice(new Wall());
  }

  for (let i = 0; i < settings.pieceCounts.smallPowerup; i++) {
    board.addPeice(new SmallPowerup());
  }

  for (let i = 0; i < settings.pieceCounts.largePowerup; i++) {
    board.addPeice(new LargePowerup());
  }
}

function setupFromString(board: Board, gameString: string) {
  const width = parseInt(gameString[0]);
  const height = parseInt(gameString[1]);
  const boardPiecesString = gameString.substring(2);

  const peiceFactory = new PeiceFactory();
  let currentPeiceIndex = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      board.addPeice(peiceFactory.createPeice(boardPiecesString[currentPeiceIndex]), { x: x, y: y });
      currentPeiceIndex++;
    }
  }
}
