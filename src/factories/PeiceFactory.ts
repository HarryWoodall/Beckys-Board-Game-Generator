import Wall from "../models/pieces/Wall";
import { PieceStringSymbols } from "../constants/peices";
import SmallTrap from "../models/pieces/SmallTrap";
import LargeTrap from "../models/pieces/LargeTrap";
import SmallTreasure from "../models/pieces/SmallTreasure";
import LargeTreasure from "../models/pieces/LargeTreasure";
import SmallPowerup from "../models/pieces/SmallPowerup";
import LargePowerup from "../models/pieces/LargePowerup";

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
