const gameArea = document.querySelector(".area");
const cells = document.querySelectorAll(".cell");
const currentPlayerInfo = document.querySelector(".currentPlayer span");
const winningMessageText = document.querySelector("[data-winning-message-text");
const winningMessageScreen = document.querySelector(".winning-message");
const restartButton = document.querySelector("#restartButton");

let player = "X";

const winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const showFinalScreen = (message) => {
  winningMessageText.innerHTML = message;
  winningMessageScreen.classList.add("show");
};

const restart = () => {
  winningMessageScreen.classList.remove("show");
  player = "X";
  cells.forEach((cell) => (cell.textContent = ""));
};

const checkWinCombinations = (data) => {
  let winFlag = false;
  for (let win of winCombinations) {
    for (let position of win) {
      winFlag = false;
      for (let dataPosition of data) {
        if (dataPosition == position) {
          winFlag = true;
          break;
        }
      }
      if (!winFlag) break;
    }
    if (winFlag) break;
  }
  return winFlag;
};

const clickCell = (e) => {
  let currentCell = e.target;
  let gameData = [];
  console.log(currentCell);
  if (!currentCell.textContent) {
    currentCell.textContent = player;
  } else {
    alert("Cell not available");
    return;
  }

  cells.forEach((cell) => {
    if (cell.textContent == player)
      gameData.push(parseInt(cell.getAttribute("data-pos")));
  });

  if (checkWinCombinations(gameData)) {
    showFinalScreen(`Winner is ${player}`);
  } else {
    let draw = true;
    for (let i of cells) {
      if (i.textContent == "") {
        draw = false;
        break;
      }
    }
    if (draw) showFinalScreen("It's a draw!");
  }

  player = player == "X" ? "O" : "X";
  currentPlayerInfo.textContent = `It's Player's ${player} turn`;
  console.log("GameData:", gameData);
};

cells.forEach((cell) => cell.addEventListener("click", clickCell));
restartButton.addEventListener("click", restart);
