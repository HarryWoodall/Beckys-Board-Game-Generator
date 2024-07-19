async function getGame() {
  const raw = await fetch("/game");
  const gameData = await raw.json();

  const mainImage = document.getElementById("main-image");
  mainImage.src = gameData.image;
}

async function downloadBoard() {
  console.log("do something");
  fetch("/currentImage");
}

getGame();
