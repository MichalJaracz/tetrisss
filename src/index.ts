"use strict";
import { Game } from "./Game";
import { KEY_CODE } from "./const";

const game = new Game();
const startBtn = document.querySelector(".start");
const restartBtn = document.querySelector(".restart");
let timer: ReturnType<typeof setInterval>;

document.addEventListener("keyup", (event) => {
  if (event.keyCode === KEY_CODE.LEFT) {
    game.moveLeft();
  }
  if (event.keyCode === KEY_CODE.RIGHT) {
    game.moveRight();
  }
  if (event.keyCode === KEY_CODE.DOWN) {
    game.moveDown();
  }
  if (event.keyCode === KEY_CODE.ROTATE) {
    game.rotateBlock();
  }
});

if (startBtn && restartBtn) {
  startBtn.addEventListener("click", (event) => {
    game.reset();
    timer = setInterval(() => {
      if (game.gameOver) {
        clearInterval(timer);
        alert("Przegrałeś");
      } else {
        game.moveDown();
      }
    }, 1000);
  });
  restartBtn.addEventListener("click", (event) => {
    clearInterval(timer);
    game.reset();
  });
}
