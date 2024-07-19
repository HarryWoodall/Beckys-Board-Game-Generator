let game;
const gridTileSize = 75;

function preload() {
  fetch("/game")
    .then((data) => data.json())
    .then((json) => (game = json));
}

function setup() {}

function draw() {
  if (game) {
    console.log(game);
    setUpBoard();
    noLoop();
  }
}

function setUpBoard() {
  createCanvas(game[0].length * gridTileSize, game.length * gridTileSize);

  let squaresSet = 0;

  for (let y = 0; y < game.length; y++) {
    for (let x = 0; x < game.length; x++) {
      noFill();
      strokeWeight(3);
      square(x * gridTileSize, y * gridTileSize, gridTileSize);

      if (game[y][x].content.length > 0) {
        for (const item of game[y][x].content) {
          fill(100, 100, 100);
          placePeice(item.name, x, y);
        }
      }
      squaresSet++;
    }
  }
}

function placePeice(name, x, y) {
  switch (name) {
    case "WALL":
      strokeWeight(2);
      noFill();
      // fill(100, 100, 100);
      square(x * gridTileSize + gridTileSize / 4, y * gridTileSize + gridTileSize / 4, gridTileSize / 2);
      break;
    case "SMALL_TRAP":
      fill(200, 100, 100);
      square(x * gridTileSize + gridTileSize / 4, y * gridTileSize + gridTileSize / 4, gridTileSize / 3);
      break;
    case "LARGE_TRAP":
      fill(200, 100, 100);
      square(x * gridTileSize + gridTileSize / 4, y * gridTileSize + gridTileSize / 4, gridTileSize / 2);
      break;
    case "SMALL_TREASURE":
      fill(200, 50, 200);
      circle(x * gridTileSize + gridTileSize / 2, y * gridTileSize + gridTileSize / 2, gridTileSize / 3);
      break;
    case "LARGE_TREASURE":
      fill(200, 50, 200);
      circle(x * gridTileSize + gridTileSize / 2, y * gridTileSize + gridTileSize / 2, gridTileSize / 2);
      break;
    case "SMALL_POWERUP":
      strokeWeight(1);
      const smallPowerupTextSize = 15;
      textSize(smallPowerupTextSize);
      text("p", x * gridTileSize + (gridTileSize / 2 - smallPowerupTextSize / 2), y * gridTileSize + (gridTileSize / 2 + smallPowerupTextSize / 2));
      break;
    case "LARGE_POWERUP":
      const largePowerupTextSize = 30;
      textSize(largePowerupTextSize);
      text("P", x * gridTileSize + (gridTileSize / 2 - largePowerupTextSize / 2), y * gridTileSize + (gridTileSize / 2 + largePowerupTextSize / 2));
      break;
  }
}
