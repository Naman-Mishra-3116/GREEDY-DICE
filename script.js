"use strict";

// * adding all the elements to the script

const newGameBtn = document.querySelector(".new-game");
const rollBtn = document.querySelector(".roll-dice");
const holdBtn = document.querySelector(".hold");
const imgHolder = document.querySelector(".dice-img");
const playerOneTotal = document.querySelector(".score-left");
const playerTwoTotal = document.querySelector(".score-right");
const leftCurrent = document.querySelector(".current-score-left");
const rightCurrent = document.querySelector(".current-score-right");
const leftPlayer = document.querySelector(".left");
const rightPlayer = document.querySelector(".right");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");
var winner = "";
// Todo defining general purpose funtion:--->

const addClass = (el, name) => el.classList.add(name);
const removeClass = (el, name) => el.classList.remove(name);
const changeContent = (el, text) => (el.textContent = text);

//* functon to switch the active player:-->

function switchActive() {
  if (leftPlayer.classList.contains("active")) {
    removeClass(leftPlayer, "active");
    addClass(rightPlayer, "active");
    return;
  } else {
    removeClass(rightPlayer, "active");
    addClass(leftPlayer, "active");
    return;
  }
}

addClass(holdBtn, "disable");
addClass(rollBtn, "disable");

// * function to get random number between 1 to 6 :---->

function getRandomNumber() {
  return Math.floor(Math.random() * 6 + 1);
}

//* function to start new game.

function newGame() {
  if (!imgHolder.classList.contains("hidden")) {
    addClass(imgHolder, "hidden");
  }

  if (!leftPlayer.classList.contains("active")) {
    switchActive();
  }

  changeContent(leftCurrent, "0");
  changeContent(rightCurrent, "0");
  changeContent(playerOneTotal, "0");
  changeContent(playerTwoTotal, "0");
  changeContent(p1, "Player 1");
  changeContent(p2, "Player 2");
  removeClass(rollBtn, "disable");
  removeClass(holdBtn, "disable");
  removeClass(winner, "winner");
}

function rollDice() {
  if (imgHolder.classList.contains("hidden")) {
    removeClass(imgHolder, "hidden");
  }
  const currentActive = leftPlayer.classList.contains("active");
  const num = getRandomNumber();
  const total = currentActive
    ? Number(playerOneTotal.textContent)
    : Number(playerTwoTotal.textContent);

  imgHolder.src = `./dice-${num}.png`;
  imgHolder.alt = `dice with ${num}`;
  if (num === 1) {
    if (currentActive) {
      changeContent(leftCurrent, "0");
    } else {
      changeContent(rightCurrent, "0");
    }
    onClickHold();
  } else {
    if (currentActive) {
      let val = Number(leftCurrent.textContent);
      if (total >= 100) {
        declareWinner(leftPlayer, p1);
      } else {
        changeContent(leftCurrent, String(val + num));
      }
    } else {
      let val = Number(rightCurrent.textContent);
      if (total >= 100) {
        declareWinner(rightPlayer, p2);
      } else {
        changeContent(rightCurrent, String(val + num));
      }
    }
  }
}

function declareWinner(player, para) {
  changeContent(para, "Winner🎉🎉");
  addClass(player, "winner");
  addClass(rollBtn, "disable");
  addClass(holdBtn, "disable");
  addClass(imgHolder, "hidden");
  winner = player;
}

function onClickHold() {
  const currentActive = leftPlayer.classList.contains("active");
  if (currentActive) {
    let currentTotal = Number(playerOneTotal.textContent);
    let currentScore = Number(leftCurrent.textContent);
    changeContent(playerOneTotal, String(currentTotal + currentScore));
    changeContent(leftCurrent, "0");
    if (currentTotal + currentScore >= 100) {
      declareWinner(leftPlayer, p1);
    }
  } else {
    let currentTotal = Number(playerTwoTotal.textContent);
    let currentScore = Number(rightCurrent.textContent);
    changeContent(playerTwoTotal, String(currentTotal + currentScore));
    changeContent(rightCurrent, "0");
    if (currentTotal + currentScore >= 100) {
      declareWinner(rightPlayer, p2);
    }
  }
  switchActive();
}

//* Adding event listeners to the buttons :----->

newGameBtn.addEventListener("click", () => newGame());
rollBtn.addEventListener("click", () => rollDice());
holdBtn.addEventListener("click", () => onClickHold());
