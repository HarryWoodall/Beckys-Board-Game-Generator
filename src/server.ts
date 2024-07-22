import express, { Request } from "express";
import path from "path";
import fs from "fs";
import game, { GameSettings } from "./game.js";
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
  };

  try {
    const result = game(settings);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
