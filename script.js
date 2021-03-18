//Main selectors
const gameArea = document.querySelector(".area");
const cells = document.querySelectorAll(".cell");
const currentPlayerInfo = document.querySelector(".currentPlayer span");
const winningMessageText = document.querySelector("[data-winning-message-text");
const winningMessageScreen = document.querySelector(".winning-message");
const restartButton = document.querySelector("#restartButton");
const localDataBt = document.querySelector("#localData");
const changeColor = document.querySelector("#colorBt");
const beepSound = new Audio();
const failureSound = new Audio();
const victorySound = new Audio();
beepSound.src = "assets/beep.mp3";
failureSound.src = "assets/fail.mp3";
victorySound.src = "assets/victory.mp3";

//beginning player value
let player = "X";

let statistics = {
  X: 0,
  O: 0,
  Draw: 0,
};

let colorScheme = false;

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

const changeCurrentPlayerInfo = (player) =>
  (currentPlayerInfo.textContent = `It's Player's ${player} turn`);

const checkIfDraw = () => {
  let draw = true;
  for (let i of cells) {
    if (i.textContent == "") {
      draw = false;
      break;
    }
  }
  return draw;
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

const updateStatisticsTable = (id) => {
  document.querySelector(`#s${id}`).textContent = JSON.parse(
    localStorage.getItem("Statistics")
  )[id];
};

const setFromLocalStorage = (e) => {
  if (localStorage.length > 1) {
    let values = ["X", "O"];
    let positions = [];
    restart();
    statistics = JSON.parse(localStorage.getItem("Statistics"));
    values.forEach((value, index) => {
      if (localStorage.getItem(value)) {
        positions.push(localStorage.getItem(value).split(","));
        positions[index].forEach(
          (position) => (cells[position - 1].textContent = value)
        );
      }
    });
    console.log(localStorage);
    //checking here if its X or O turn after connection was lost
    if (positions.length == 1) {
      player = "O";
      changeCurrentPlayerInfo(player);
    } else if (positions[0].length > positions[1].length) {
      player = "O";
      changeCurrentPlayerInfo(player);
    }
  }
  updateStatisticsTable("X");
  updateStatisticsTable("O");
  updateStatisticsTable("Draw");
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
  return { combination: winArrayCombination, result: winFlag };
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
    localStorage.setItem(player, gameData);

    let winReponse = checkWinCombinations(gameData);
    if (winReponse.result) {
      victorySound.play();
      localStorage.clear();
      statistics[player]++;
      localStorage.setItem("Statistics", JSON.stringify(statistics));
      updateStatisticsTable(player);
      highlightCombination(winReponse.combination);
      showFinalScreen(`Winner is ${player}`);
    } else {
      if (checkIfDraw()) {
        localStorage.clear();
        statistics.Draw++;
        localStorage.setItem("Statistics", JSON.stringify(statistics));
        updateStatisticsTable("Draw");
        showFinalScreen("It's a draw!");
      }
    }

    player = player == "X" ? "O" : "X";
    changeCurrentPlayerInfo(player);
  } else failureSound.play();
};

const computerTurn = (gamedata) => {};

cells.forEach((cell) => cell.addEventListener("click", clickCell));
restartButton.addEventListener("click", restart);
localDataBt.addEventListener("click", setFromLocalStorage);
localDataBt.addEventListener("mouseover", (e) => {
  localStorage.length > 0
    ? e.target.classList.remove("not-allowed")
    : e.target.classList.add("not-allowed");
});

changeColor.addEventListener("click", () => {
  let elementList = document.getElementsByTagName("*");
  if (!colorScheme) {
    colorScheme = !colorScheme;
    for (let i = 0; i < elementList.length; i++)
      elementList[i].classList.add("black");
  } else {
    colorScheme = !colorScheme;
    for (let i = 0; i < elementList.length; i++)
      elementList[i].classList.remove("black");
  }
});
