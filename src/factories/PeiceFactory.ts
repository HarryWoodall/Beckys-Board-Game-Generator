import Wall from "../models/pieces/Wall.js";
import { PieceStringSymbols } from "../constants/peices.js";
import SmallTrap from "../models/pieces/SmallTrap.js";
import LargeTrap from "../models/pieces/LargeTrap.js";
import SmallTreasure from "../models/pieces/SmallTreasure.js";
import LargeTreasure from "../models/pieces/LargeTreasure.js";
import SmallPowerup from "../models/pieces/SmallPowerup.js";
import LargePowerup from "../models/pieces/LargePowerup.js";

export default class PeiceFactory {
  createPeice(peice: string) {
    switch (peice) {
      case PieceStringSymbols.EMPTY:
        return null;
      case PieceStringSymbols.WALL:
        return new Wall();
      case PieceStringSymbols.SMALL_TRAP:
        return new SmallTrap();
      case PieceStringSymbols.LARGE_TRAP:
        return new LargeTrap();
      case PieceStringSymbols.SMALL_TREASURE:
        return new SmallTreasure();
      case PieceStringSymbols.LARGE_TREASURE:
        return new LargeTreasure();
      case PieceStringSymbols.SMALL_POWERUP:
        return new SmallPowerup();
      case PieceStringSymbols.LARGE_POWERUP:
        return new LargePowerup();
    }
  }
}
