'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentElplayer1 = document.querySelector('#current--1');
const currentElplayer0 = document.querySelector('#current--0');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

function setCurscore() {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentscore;
}
function totalscore() {
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
}

function SwtichPlayer() {
  currentscore = 0;
  setCurscore();
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//Starting conditions
let scores, currentscore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentElplayer0.textContent = 0;
  currentElplayer1.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
// rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. dispaly roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //check for rolled 1 : switch to next player
    if (dice !== 1) {
      currentscore += dice;
      setCurscore();
    } else {
      SwtichPlayer();

      //switch player
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentscore;

    totalscore();

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      SwtichPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
