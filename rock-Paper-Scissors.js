let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElem();

let isAutoPlaying = false;
let intervalId;

function autoPlaying() {
  if(!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove1 = pickComputerMove();
      playGame(playerMove1);
    },2000);
    isAutoPlaying = true;
    document.querySelector('.auto-play-b').innerHTML = 'Stop playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.auto-play-b').innerHTML = 'Auto playing';
  };
}



document.querySelector('.auto-play-b')
  .addEventListener('click', () => {
    autoPlaying();
  });


document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
  } );

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r') {
    playGame('Rock');
  } else if(event.key === 'p') {
    playGame('Paper');
  } else if(event.key === 's') {
    playGame('Scissors');
  } else if(event.key === 'a') {
    autoPlaying();
  } else if(event.key === 'Backspace') {
    resetScore();
  }
})


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'Scissors') {

      if(computerMove === 'Rock') {
        result = 'You lose.';
      } else if (computerMove === 'Paper') {
        result = 'You win.';
      } else if (computerMove === 'Scissors') {
        result = 'Tie.';
      }

  } else if(playerMove === 'Paper') {
    if(computerMove === 'Rock') {
      result = 'You win.';
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
    } else if (computerMove === 'Scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'Rock') {
    if(computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You lose.';
    } else if (computerMove === 'Scissors') {
      result = 'You win.';
    }
  }

  if(result === 'You win.') {
    score.wins += 1;
  } else if( result === 'You lose.') {
    score.losses += 1;
  } else if( result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

 updateScoreElem();

 document.querySelector('.js-result').innerHTML = result;
 document.querySelector('.js-moves').innerHTML = ` You 
<img src="${playerMove}-emoji.png" class="move-icon2">
<img src="${computerMove}-emoji.png" class="move-icon2">
Computer`

//         alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result} 
// Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function updateScoreElem() {
  document.querySelector('.js-score')
  .innerHTML =`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

document.querySelector('.reset-score-button')
  .addEventListener('click', () => {
   showResetConfirmation();
  } );

  function resetScore () {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElem();
  }

  function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
    .innerHTML = `
    Are you sure you want to reset the score?
    <button class="js-reset-confirm-yes reset-confirm-button">Yes</button>
    <button class="js-reset-confirm-no reset-confirm-button"> No </button>`;

    document.querySelector('.js-reset-confirm-yes')
      .addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
      });

    document.querySelector('.js-reset-confirm-no')
      .addEventListener('click', () => {
        hideResetConfirmation();
      });
  }

  function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = '';
  }



function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1 / 3 ) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove ='Paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove ='Scissors';
  }

  return computerMove;
}
