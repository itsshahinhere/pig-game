'use strict';

const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// selecting the elements
const scorePlayer0 = document.getElementById('score--0');
const scorePlayer1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
let currentScore0 = document.getElementById('current--0');
let currentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//starting conditions

let totScore, currentScore, activePlayer, playing;

const init = function () {
  totScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;

  dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player0.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

//webpage reload
init();

const switchPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//roll button function
roll.addEventListener('click', function () {
  if (playing) {
    const randoNum = Number(Math.trunc(Math.random() * 6 + 1));
    dice.classList.remove('hidden');
    dice.src = `dice-${randoNum}.png`;
    if (randoNum !== 1) {
      currentScore += randoNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});

//hold button function
hold.addEventListener('click', function () {
  if (playing) {
    totScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totScore[activePlayer];

    if (totScore[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      dice.classList.add('hidden');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
    } else {
      switchPlayers();
    }
  }
});

//new game button function
btnNew.addEventListener('click', init);
