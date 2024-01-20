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
const infoButton = document.querySelector('.info');
const infoModal = document.querySelector('.info-modal');
const closeInfo = document.querySelector('.close-info-modal');

const switchPlayer = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

score0P.textContent = 0;
score1P.textContent = 0;
let scorePlayer = [0, 0];
let activePlayer = 0;
let win = 0;
let holdTheGame = 1;
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeM = document.querySelector('.close-modal');
const scores = [0, 0];
function myGreeting() {
  closeModal();
}
function openAModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  holdTheGame = 1;
  btnHold.classList.remove('hidden');
}

function closeInfoModal() {
  infoModal.classList.add('hidden');
  overlay.classList.add('hidden');
}

dice.classList.add('hidden');

//Roll dice functionality
btnRoll.addEventListener('click', function () {
  if (scorePlayer[`${activePlayer}`] === 3) {
    openAModal();
    holdTheGame === 0;
    scorePlayer[0] = scorePlayer[1] = 0;
    document.querySelector(`#score--0`).textContent = 0;
    document.querySelector(`#score--1`).textContent = 0;
    document.getElementById(
      'modal-restart'
    ).textContent = `Wohooho Congrats !!  Player ${
      activePlayer + 1
    } wins the Game ... 🤠🤠`;
  }
  //Generating a random dice roll
  const number = Math.trunc(Math.random() * 6) + 1;
  if (holdTheGame === 1) {
    dice.src = `dice-${number}.png`;
  }

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
    holdTheGame = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    setTimeout(myGreeting, 3000);
    openAModal();
    return;
  }

  //Check for rolled dice number if the number is 1 switch to player 2 otherwise add to score
  if (holdTheGame === 1) {
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
        document.querySelector(`#score--${activePlayer}`).textContent =
          scorePlayer[`${activePlayer}`];
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        win = 1;
        btnHold.classList.add('hidden');
        document.getElementById(
          'modal-restart'
        ).textContent = `Congratulations !!  Player ${
          activePlayer + 1
        } wins the round ... 😶‍🌫️`;
      }
    }
  }
});

btnHold.addEventListener('click', function () {
  // Add current player scores and store the value in array
  activePlayer = activePlayer === 0 ? 1 : 0;
  switchPlayer();
});

//Close modal popup when cliked on close icon
closeM.addEventListener('click', closeModal);

btnRestart.addEventListener('click', function () {
  document.getElementById('modal-restart').textContent =
    'New Game started ... Be the best one win 😃';
  holdTheGame === 0;
  openAModal();
  scorePlayer[0] = scorePlayer[1] = 0;
  scores[0] = scores[1] = 0;
  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  win = 0;
  dice.classList.add('hidden');
});

//Game info button on click feature
infoButton.addEventListener('click', function () {
  infoModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

//Make image larger on hover
infoButton.onmouseover = function () {
  infoButton.src = 'info-color.png';
};

//Make image smaller on onmouseout
infoButton.onmouseout = function () {
  infoButton.src = 'info.png';
};

closeInfo.addEventListener('click', closeInfoModal);
