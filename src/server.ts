import express, { Request } from "express";
import path from "path";
import fs from "fs";
import game, { defaultSettings, GameSettings } from "./game.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.get("/currentImage", (req, res) => {
  const dirFiles = fs.readdirSync(path.join(__dirname, "../public/sketches"));
  if (dirFiles.length > 0) {
    res.download(path.join(__dirname, "../public/sketches", dirFiles[0]));
  }
});

app.get("/currentImageFileName", (req, res) => {
  const dirFiles = fs.readdirSync(path.join(__dirname, "../public/sketches"));
  if (dirFiles.length > 0) {
    res.send(path.join(`sketches`, dirFiles[0]));
  }
});

interface GameRequestQuery {
  width: number;
  height: number;
  walls: number;
  smallTraps: number;
  largeTraps: number;
  smallTreasure: number;
  largeTreasure: number;
  smallPowerups: number;
  largePowerups: number;
  maxSearchIterations: number;
  smallTrapMultiplier: number;
  largeTrapMultiplier: number;
}

app.get("/game", (req: Request<{}, {}, {}, GameRequestQuery>, res) => {
  const settings: GameSettings = {
    dimentions: {
      width: req.query.width,
      height: req.query.height,
    },
    pieceCounts: {
      wall: req.query.walls,
      smallTrap: req.query.smallTraps,
      largeTrap: req.query.largeTraps,
      smallTreasure: req.query.smallTreasure,
      largeTreasure: req.query.largeTreasure,
      smallPowerup: req.query.smallPowerups,
      largePowerup: req.query.largePowerups,
    },
    maxIterations: req.query.maxSearchIterations,
    smallTrapMultiplier: req.query.smallTrapMultiplier,
    largeTrapMultiplier: req.query.largeTrapMultiplier,
  };

  try {
    const result = game(settings);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

interface GameStringRequestQuery {
  gameString: string;
}

app.get("/gameString", (req: Request<{}, {}, {}, GameStringRequestQuery>, res) => {
  try {
    const gameSettings = defaultSettings;
    gameSettings.dimentions.width = parseInt(req.query.gameString[0]);
    gameSettings.dimentions.height = parseInt(req.query.gameString[1]);

    const result = game(gameSettings, req.query.gameString);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
