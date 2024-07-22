import BoardTile from "./BoardTile.js";
import Coordinate from "./Coordinate.js";
import Peice from "./pieces/Piece.js";

export default class Board {
  width: number;
  height: number;
  tiles: BoardTile[][] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    for (let y = 0; y < height; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < width; x++) {
        this.tiles[y][x] = new BoardTile({ x: x, y: y });
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
        if (tile.content.length == 0) {
          emptyTiles.push(tile);
        }
      }
    }

    return emptyTiles;
  }

  getRandomEmptyTile(): BoardTile | null {
    const emptyTiles = this.getEmptyTiles();

    if (emptyTiles.length == 0) return null;

    return emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  }

  addPeice(peice: Peice) {
    const location = peice.findTile(this);
    if (location) this.getTile(location).content.push(peice);
  }
}
