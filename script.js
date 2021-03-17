//Main selectors
const gameArea = document.querySelector(".area");
const cells = document.querySelectorAll(".cell");
const currentPlayerInfo = document.querySelector(".currentPlayer span");
const winningMessageText = document.querySelector("[data-winning-message-text");
const winningMessageScreen = document.querySelector(".winning-message");
const restartButton = document.querySelector("#restartButton");
const beepSound = new Audio();
const failureSound = new Audio();
const victorySound = new Audio();
beepSound.src = "assets/beep.mp3";
failureSound.src = "assets/fail.mp3";
victorySound.src = "assets/victory.mp3";

//beginning player value
let player = "X";

//winning conditions
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

//final splash screen after end
const showFinalScreen = (message) => {
  winningMessageText.innerHTML = message;
  winningMessageScreen.classList.add("show");
};

const highlightCombination = (array) => {
  array.forEach((position) => cells[position - 1].classList.add("winning"));
};

//start new game
const restart = () => {
  winningMessageScreen.classList.remove("show");
  player = "X";
  currentPlayerInfo.textContent = `It's Player's ${player} turn`;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("selected");
    cell.classList.remove("winning");
  });
};

//winning logic
const checkWinCombinations = (data) => {
  let winArrayCombination;
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
    if (winFlag) {
      winArrayCombination = win;
      break;
    }
  }
  //Doing like this as I need winning combination to higlight it (I know its not the best practice)
  return { combination: winArrayCombination, flag: winFlag };
};

//main event
const clickCell = (e) => {
  let currentCell = e.target;
  let gameData = [];
  if (!currentCell.textContent) {
    beepSound.play();
    currentCell.textContent = player;
    currentCell.classList.add("selected");
    cells.forEach((cell) => {
      if (cell.textContent == player)
        gameData.push(parseInt(cell.getAttribute("data-pos")));
    });

    let winReponse = checkWinCombinations(gameData);
    if (winReponse.flag) {
      victorySound.play();
      highlightCombination(winReponse.combination);
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
  } else failureSound.play();
};

cells.forEach((cell) => cell.addEventListener("click", clickCell));
restartButton.addEventListener("click", restart);
