import { GameSettings } from "../game.js";
import BoardTile from "./BoardTile.js";
import Coordinate, { isCoordinateEqual } from "./Coordinate.js";
import Peice from "./pieces/Piece.js";
import { PeiceNames, PieceStringSymbols } from "../constants/peices.js";

export default class Board {
  width: number;
  height: number;
  tiles: BoardTile[][] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    const entryTiles: Coordinate[] = [
      {
        x: Math.floor(width / 2),
        y: 0,
      },
      {
        x: Math.floor(width / 2),
        y: height - 1,
      },
      {
        x: 0,
        y: Math.floor(height / 2),
      },
      {
        x: width - 1,
        y: Math.floor(height / 2),
      },
    ];
    for (let y = 0; y < height; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < width; x++) {
        this.tiles[y][x] = new BoardTile(
          { x: x, y: y },
          entryTiles.some((t) => isCoordinateEqual(t, { x: x, y: y }))
        );
      }
    }
  }

  getTile(ord: Coordinate) {
    return this.tiles[ord.y][ord.x];
  }

  getTilesWithPieces(name: string): BoardTile[] {
    const foundTiles = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.getTile({ x: x, y: y });
        if (tile.content.find((c) => c.name == name)) {
          foundTiles.push(tile);
        }
      }
    }

    return foundTiles;
  }

  getEmptyTiles() {
    const emptyTiles = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = this.getTile({ x: x, y: y });
        if (!tile.isEntry && tile.content.length == 0) {
          emptyTiles.push(tile);
        }
      }
    }

    return emptyTiles;
  }

  getAjacentTiles(tile: BoardTile, corners: boolean) {
    const ajacentCoordinates = [
      {
        x: tile.location.x + 1,
        y: tile.location.y,
      },
      {
        x: tile.location.x,
        y: tile.location.y + 1,
      },
      {
        x: tile.location.x - 1,
        y: tile.location.y,
      },
      {
        x: tile.location.x,
        y: tile.location.y - 1,
      },
    ];

    if (corners) {
      const cornerCoordinates = [
        {
          x: tile.location.x + 1,
          y: tile.location.y + 1,
        },
        {
          x: tile.location.x - 1,
          y: tile.location.y + 1,
        },
        {
          x: tile.location.x + 1,
          y: tile.location.y - 1,
        },
        {
          x: tile.location.x - 1,
          y: tile.location.y - 1,
        },
      ];

      ajacentCoordinates.push(...cornerCoordinates);
    }

    const ajacentTiles: BoardTile[] = [];

    for (const ord of ajacentCoordinates) {
      const foundTile = this.tiles.flat().find((tile) => isCoordinateEqual(tile.location, ord));

      if (foundTile) {
        ajacentTiles.push(foundTile);
      }
    }
    return ajacentTiles;
  }

  getRandomEmptyTile(set?: BoardTile[]): BoardTile | null {
    const emptyTiles = set || this.getEmptyTiles();

    if (emptyTiles.length == 0) return null;

    return emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  }

  isTileNextToEntrance(tile: BoardTile) {
    const ajacentTiles = this.getAjacentTiles(tile, true);
    return ajacentTiles.some((tile) => tile.isEntry);
  }

  isTileNextToType(tile: BoardTile, type: string[]) {
    const ajacentTiles = this.getAjacentTiles(tile, true);
    return ajacentTiles.some((tile) => tile.content.some((c) => type.includes(c.name)));
  }

  addPeice(peice: Peice, coordinate?: Coordinate) {
    if (coordinate) {
      if (peice) {
        this.getTile(coordinate).content.push(peice);
      }
    } else {
      const location = peice.findTile(this);
      if (location) this.getTile(location).content.push(peice);
    }
  }

  resetTiles() {
    this.tiles.flat().forEach((tile) => (tile.content = []));
  }

  validate(settings: GameSettings) {
    let isValid = true;

    const wallPieces = this.getTilesWithPieces(PeiceNames.WALL);
    if (wallPieces.length != settings.pieceCounts.wall) {
      console.log(`Should be ${settings.pieceCounts.wall} walls, found ${wallPieces.length}`);
      isValid = false;
    }

    const smallTrapPieces = this.getTilesWithPieces(PeiceNames.SMALL_TRAP);
    if (smallTrapPieces.length != settings.pieceCounts.smallTrap) {
      console.log(`Should be ${settings.pieceCounts.smallTrap} small traps, found ${smallTrapPieces.length}`);
      isValid = false;
    }

    const largeTrapPieces = this.getTilesWithPieces(PeiceNames.LARGE_TRAP);
    if (largeTrapPieces.length != settings.pieceCounts.largeTrap) {
      console.log(`Should be ${settings.pieceCounts.largeTrap} large traps, found ${largeTrapPieces.length}`);
      isValid = false;
    }

    const smallTreasurePieces = this.getTilesWithPieces(PeiceNames.SMALL_TREASURE);
    if (smallTreasurePieces.length != settings.pieceCounts.smallTreasure) {
      console.log(`Should be ${settings.pieceCounts.smallTreasure} small treasures, found ${smallTrapPieces.length}`);
      isValid = false;
    }

    const largeTreasurePieces = this.getTilesWithPieces(PeiceNames.LARGE_TREASURE);
    if (largeTreasurePieces.length != settings.pieceCounts.largeTreasure) {
      console.log(`Should be ${settings.pieceCounts.largeTreasure} large treasures, found ${largeTreasurePieces.length}`);
      isValid = false;
    }

    const smallPowerupPieces = this.getTilesWithPieces(PeiceNames.SMALL_POWERUP);
    if (smallPowerupPieces.length != settings.pieceCounts.smallPowerup) {
      console.log(`Should be ${settings.pieceCounts.smallPowerup} small powerups, found ${smallPowerupPieces.length}`);
      isValid = false;
    }

    const largePowerupPieces = this.getTilesWithPieces(PeiceNames.LARGE_POWERUP);
    if (largePowerupPieces.length != settings.pieceCounts.largePowerup) {
      console.log(`Should be ${settings.pieceCounts.largePowerup} large powerups, found ${largePowerupPieces.length}`);
      isValid = false;
    }

    return isValid;
  }

  convertToString() {
    let boardString = `${this.width}${this.height}`;
    this.tiles.flat().forEach((tile) => {
      if (tile.content.length == 0) {
        boardString += PieceStringSymbols.EMPTY;
      } else {
        boardString += PieceStringSymbols[tile.content[0].name as keyof typeof PieceStringSymbols];
      }
    });

    return boardString;
  }
}
