const gameArea = document.querySelector(".area");
const cells = document.querySelectorAll(".cell");

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

function clickCell() {
  let gameData = [];
  if (!this.textContent) this.textContent = player;
  else {
    alert("Cell not available");
    return;
  }

  console.log("CELLS:", cells);
  cells.forEach((cell) => {
    console.log("Cell: ", cell);
    if (cell.textContent == player)
      gameData.push(parseInt(cell.getAttribute("pos")));
  });
  player = player == "X" ? "O" : "X";
}

for (let i = 0; i < cells.length; i++)
  cells[i].addEventListener("click", clickCell);
