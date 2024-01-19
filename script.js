'use strict';

// Select elements
const score0P = document.querySelector('#score--0');
const score1P = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnRestart = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const switchPlayer = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

score0P.textContent = 0;
score1P.textContent = 0;
let scorePlayer = [0, 0];
let activePlayer = 0;
let win = 0;
const scores = [0, 0];
dice.classList.add('hidden');

//Roll dice functionality
btnRoll.addEventListener('click', function () {
  //Generating a random dice roll
  const number = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${number}.png`;

  //Show dice
  dice.classList.remove('hidden');

  if (win === 1) {
    scores[`${activePlayer}`] = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      scores[`${activePlayer}`];
    // Remove winner class when clicked on roll dice if any player has won the round
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    win = 0;
    switchPlayer();
    activePlayer = activePlayer === 0 ? 1 : 0;
    return;
  }

  //Check for rolled dice number if the number is 1 switch to player 2 otherwise add to score
  if (number === 1) {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    scores[`${activePlayer}`] = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    //Switch Player
    switchPlayer();
  } else {
    scores[`${activePlayer}`] += number;
    document.getElementById(`current--${activePlayer}`).textContent =
      scores[`${activePlayer}`];
    if (scores[`${activePlayer}`] >= 10) {
      scorePlayer[`${activePlayer}`] += 1;
      document.querySelector(`#score--${activePlayer}`).textContent = 1;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      win = 1;
    }
  }
});

btnHold.addEventListener('click', function () {
  // Add current player scores and store the value in array
  activePlayer = activePlayer === 0 ? 1 : 0;
  switchPlayer();
});
