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

  console.log(requestUrl);

  document.getElementById("error-message").hidden = true;
  document.getElementById("main-image").hidden = false;

  const raw = await fetch(requestUrl);

  if (!raw.ok) {
    const error = await raw.text();
    console.log("error", error);
    document.getElementById("error-message").hidden = false;
    document.getElementById("main-image").hidden = true;
    return;
  }

  const gameData = await raw.json();

  const mainImage = document.getElementById("main-image");
  mainImage.src = gameData.image;

  return false;
}

function gameRequestBuilder(url, key, value, isFirst = false) {
  url += `${isFirst ? "?" : "&"}${key}=${value}`;
  return url;
}

async function downloadBoard() {
  console.log("do something");
  fetch("/currentImage");
}

getGame();
