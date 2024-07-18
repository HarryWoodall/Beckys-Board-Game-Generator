async function getGame() {
  const raw = await fetch("/game");
  const gameBoard = await raw.json();

  // console.log(gameBoard);
}

getGame();
