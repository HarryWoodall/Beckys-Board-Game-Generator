// @ts-nocheck
import p5 from "node-p5";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import BoardTile from "./models/BoardTile";
import Coordinate from "./models/Coordinate";

let game: BoardTile[][] = undefined;
const gridTileSize = 75;

function sketch(p) {
  p.setup = () => {};
  p.draw = () => {
    if (game.length > 0) {
      setUpBoard(p);
      p.noLoop();
    }
  };
}

function setUpBoard(p) {
  p.createCanvas(game[0].length * gridTileSize, game.length * gridTileSize);

  let squaresSet = 0;

  for (let y = 0; y < game.length; y++) {
    for (let x = 0; x < game.length; x++) {
      p.fill(255);
      p.strokeWeight(3);
      p.square(x * gridTileSize, y * gridTileSize, gridTileSize);

      if (game[y][x].content.length > 0) {
        for (const item of game[y][x].content) {
          p.fill(100, 100, 100);
          placePeice(p, item.name, x, y);
        }
      }
      squaresSet++;
    }
  }
}

function placePeice(p, name, x, y) {
  console.log(`${name} at ${x}, ${y}`);
  switch (name) {
    case "WALL":
      p.strokeWeight(2);
      drawWall(p, { x: x, y: y });
      break;
    case "SMALL_TRAP":
      drawTrap(p, { x: x, y: y }, false);
      break;
    case "LARGE_TRAP":
      drawTrap(p, { x: x, y: y }, true);
      break;
    case "SMALL_TREASURE":
      drawTreasure(p, { x: x, y: y }, false);
      break;
    case "LARGE_TREASURE":
      drawTreasure(p, { x: x, y: y }, true);
      break;
    case "SMALL_POWERUP":
      drawPowerup(p, { x: x, y: y }, false);
      break;
    case "LARGE_POWERUP":
      drawPowerup(p, { x: x, y: y }, true);
      break;
  }
}

function drawWall(p, pos: Coordinate) {
  p.strokeWeight(4);
  p.line(pos.x * gridTileSize, pos.y * gridTileSize, pos.x * gridTileSize + gridTileSize, pos.y * gridTileSize + gridTileSize);
  p.line(pos.x * gridTileSize + gridTileSize, pos.y * gridTileSize, pos.x * gridTileSize, pos.y * gridTileSize + gridTileSize);
}

function drawTrap(p, pos: Coordinate, isLarge: boolean) {
  p.push();
  p.translate(pos.x * gridTileSize + gridTileSize / 2, pos.y * gridTileSize + gridTileSize / 2);
  p.strokeWeight(4);
  p.noFill();

  const [point1, point2, point3] = getTrianglePoints();

  p.triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);

  if (isLarge) {
    p.scale(0.7);
    p.translate(0, gridTileSize / 12);
    p.strokeWeight(3);
    p.triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
  }

  p.pop();
}

function drawTreasure(p, pos: Coordinate, isLarge: boolean) {
  p.push();
  p.translate(pos.x * gridTileSize + gridTileSize / 2, pos.y * gridTileSize + gridTileSize / 2);

  p.noFill();
  p.scale(0.6);
  p.strokeWeight(6);
  p.rotate(Math.PI / 4);
  p.rectMode("center");

  p.rect(0, 0, gridTileSize, gridTileSize);

  if (isLarge) {
    p.scale(0.8);
    p.rect(0, 0, gridTileSize, gridTileSize);
  }

  p.pop();
}

function drawPowerup(p, pos: Coordinate, isLarge: boolean) {
  p.push();
  p.translate(pos.x * gridTileSize + gridTileSize / 2, pos.y * gridTileSize + gridTileSize / 2);

  p.strokeWeight(4);
  p.noFill();
  p.circle(0, 0, gridTileSize / 1.25);

  if (isLarge) {
    p.scale(0.6);
    p.noStroke();
    p.fill(50, 200, 220);

    const [point1, point2, point3] = getTrianglePoints();
    p.translate(0, -gridTileSize / 8);
    p.triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
    p.rotate(Math.PI);
    p.translate(0, -gridTileSize / 4);
    p.triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
  }

  p.pop();
}

function getTrianglePoints() {
  const margin = 10;
  const sqMargin = Math.sqrt(Math.pow(margin, 2) / 2);

  const point1: Coordinate = {
    x: 0,
    y: -gridTileSize / 2 + margin,
  };
  const point2: Coordinate = {
    x: gridTileSize / 2 - sqMargin,
    y: gridTileSize / 2 - sqMargin,
  };
  const point3: Coordinate = {
    x: -gridTileSize / 2 + sqMargin,
    y: gridTileSize / 2 - sqMargin,
  };

  return [point1, point2, point3];
}

export function createSketch(tiles) {
  console.log("\ncreating sketch");
  game = tiles;

  const sketchDir = "./public/sketches";

  const images = fs.readdirSync(sketchDir);

  for (let image of images) {
    fs.unlinkSync(path.join(sketchDir, image));
  }

  let p5Instance = p5.createSketch(sketch);
  const imageName = `currentSketch-${crypto.randomUUID()}.png`;
  p5Instance.saveCanvas(p5Instance, path.join(sketchDir, imageName));
  return path.join("sketches", imageName);
}
