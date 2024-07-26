// @ts-nocheck
import p5 from "node-p5";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import BoardTile from "./models/BoardTile";
import Coordinate from "./models/Coordinate";
import { PeiceNames } from "./constants/peices";

const gridTileSize = 75;
const bufferSize = 50;

function sketch(p) {
  p.setup = () => {
    setUpBoard(p);
  };
  p.draw = () => {};
}

function setUpBoard(p) {
  const length = 7;
  p.createCanvas(length * gridTileSize + length * bufferSize, gridTileSize * 1.5);
  p.background(255);
  p.strokeWeight(3);
  p.stroke(0);
  p.textSize(16);
  p.textAlign("center");

  let squaresSet = 0;

  placePeice(p, PeiceNames.WALL, 0, 0);
  placePeice(p, PeiceNames.SMALL_TRAP, 1, 0);
  placePeice(p, PeiceNames.LARGE_TRAP, 2, 0);
  placePeice(p, PeiceNames.SMALL_TREASURE, 3, 0);
  placePeice(p, PeiceNames.LARGE_TREASURE, 4, 0);
  placePeice(p, PeiceNames.SMALL_POWERUP, 5, 0);
  placePeice(p, PeiceNames.LARGE_POWERUP, 6, 0);

  p.strokeWeight(1);
  drawText(p, "Wall", 0);
  drawText(p, "Small Trap", 1);
  drawText(p, "Large Trap", 2);
  drawText(p, "Small Treasure", 3);
  drawText(p, "Large Treasure", 4);
  drawText(p, "Small Powerup", 5);
  drawText(p, "Large Powerup", 6);
}

function placePeice(p, name, x, y) {
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

function drawText(p: any, text: string, x: number) {
  p.text(text, x * gridTileSize + gridTileSize / 2 + bufferSize * x + bufferSize / 2, gridTileSize + gridTileSize / 2.5);
}

function drawWall(p, pos: Coordinate) {
  p.strokeWeight(4);
  p.push();
  p.translate(pos.x * gridTileSize + bufferSize * pos.x + bufferSize / 2, pos.y * gridTileSize);
  p.line(0, 0, gridTileSize, gridTileSize);
  p.line(gridTileSize, 0, 0, gridTileSize);
  p.pop();
}

function drawTrap(p, pos: Coordinate, isLarge: boolean) {
  p.push();
  p.translate(pos.x * gridTileSize + gridTileSize / 2 + bufferSize * pos.x + bufferSize / 2, pos.y * gridTileSize + gridTileSize / 2);
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
  p.translate(pos.x * gridTileSize + gridTileSize / 2 + bufferSize * pos.x + bufferSize / 2, pos.y * gridTileSize + gridTileSize / 2);

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
  p.translate(pos.x * gridTileSize + gridTileSize / 2 + bufferSize * pos.x + bufferSize / 2, pos.y * gridTileSize + gridTileSize / 2);

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

export function imageKeySketch(tiles) {
  const sketchDir = "./public/images";

  let p5Instance = p5.createSketch(sketch);
  const imageName = `imageKeySketch.png`;
  p5Instance.saveCanvas(p5Instance, path.join(sketchDir, imageName));
  return path.join("sketches", imageName);
}
