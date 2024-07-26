async function getGame() {
  const widthValue = document.getElementById("width-input").value;
  const heightValue = document.getElementById("height-input").value;
  const wallsValue = document.getElementById("walls-input").value;
  const smallTrapsValue = document.getElementById("small-traps-input").value;
  const largeTrapsValue = document.getElementById("large-traps-input").value;
  const smallTreasureValue = document.getElementById("small-treasure-input").value;
  const largeTreasureValue = document.getElementById("large-treasure-input").value;
  const smallPowerupsValue = document.getElementById("small-powerups-input").value;
  const largePowerupsValue = document.getElementById("large-powerups-input").value;
  const smallTrapMultiplier = document.getElementById("small-trap-treasure-proximity-multiplier-input").value;
  const largeTrapMultiplier = document.getElementById("large-trap-treasure-proximity-multiplier-input").value;
  const maxSearchIterations = document.getElementById("max-search-iterations-input").value;

  let requestUrl = "/game";

  requestUrl = gameRequestBuilder(requestUrl, "width", widthValue, true);
  requestUrl = gameRequestBuilder(requestUrl, "height", heightValue);
  requestUrl = gameRequestBuilder(requestUrl, "walls", wallsValue);
  requestUrl = gameRequestBuilder(requestUrl, "smallTraps", smallTrapsValue);
  requestUrl = gameRequestBuilder(requestUrl, "largeTraps", largeTrapsValue);
  requestUrl = gameRequestBuilder(requestUrl, "smallTreasure", smallTreasureValue);
  requestUrl = gameRequestBuilder(requestUrl, "largeTreasure", largeTreasureValue);
  requestUrl = gameRequestBuilder(requestUrl, "smallPowerups", smallPowerupsValue);
  requestUrl = gameRequestBuilder(requestUrl, "largePowerups", largePowerupsValue);
  requestUrl = gameRequestBuilder(requestUrl, "smallTrapMultiplier", smallTrapMultiplier);
  requestUrl = gameRequestBuilder(requestUrl, "largeTrapMultiplier", largeTrapMultiplier);
  requestUrl = gameRequestBuilder(requestUrl, "maxSearchIterations", maxSearchIterations);

  console.log(requestUrl);
  fetchGameData(requestUrl);

  return false;
}

async function getGameWithString() {
  let requestUrl = "/gameString";
  const gameString = document.getElementById("board-string-input").value;

  if (!gameString) return;

  console.log(`getting game with string ${gameString}`);

  requestUrl = gameRequestBuilder(requestUrl, "gameString", gameString, true);
  fetchGameData(requestUrl);

  return false;
}

async function fetchGameData(requestUrl) {
  document.getElementById("error-message").hidden = true;
  document.getElementById("main-image").hidden = false;

  document.getElementById("sketch-container").hidden = true;
  document.getElementById("spinner-container").hidden = false;
  document.getElementById("board-string-text").hidden = true;

  const raw = await fetch(requestUrl);

  if (!raw.ok) {
    const error = await raw.text();
    console.log("error", error);
    const errorMessage = document.getElementById("error-message");

    errorMessage.hidden = false;
    errorMessage.innerText = `Server returned ${raw.status} -- ${raw.statusText}`;
    document.getElementById("main-image").hidden = true;
    return;
  }

  const gameData = await raw.json();

  document.getElementById("sketch-container").hidden = false;
  document.getElementById("spinner-container").hidden = true;

  if (gameData.error) {
    const errorMessage = document.getElementById("error-message");

    errorMessage.hidden = false;
    errorMessage.innerText = gameData.error;
    document.getElementById("main-image").hidden = true;
    return false;
  }

  document.getElementById("board-string-text").hidden = false;

  const mainImage = document.getElementById("main-image");
  mainImage.src = gameData.image;

  console.log(gameData);
  document.getElementById("board-string-text-item").value = gameData.boardString;
}

async function downloadBoard() {
  console.log("do something");
  fetch("/currentImage");
}

function gameRequestBuilder(url, key, value, isFirst = false) {
  url += `${isFirst ? "?" : "&"}${key}=${value}`;
  return url;
}

function copyBoardStringToClipboard() {
  // Get the text field
  var copyText = document.getElementById("board-string-text-item");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
}

getGame();
