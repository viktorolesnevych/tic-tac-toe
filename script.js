const gameArea = document.querySelector(".area");
const cells = document.querySelectorAll(".cell");

for (let i = 0; i < cells.length; i++)
  cells[i].addEventListener("click", () => console.log("You clicked cell"));
