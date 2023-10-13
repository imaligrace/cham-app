// The DOMsss
const computerMoveElement = document.querySelector("#computer-move");
const playerMoveButtons = document.querySelectorAll(".player-move");

const startButton = document.querySelector(".start-button");
const endButton = document.querySelector("#end-button");
const playAgainButton = document.querySelector("#play-again-button");

const scoreBox = document.querySelector("#score-box");
const timeBox = document.querySelector("#time-box");

// Globalsss
let score = 0;
let time = 0;
let intervalId = null; // study this
let roundTimerId = null;
let gameEnded = false;
let previousMove = null;

// START BUTTON
startButton.addEventListener("click", startGame);

// GAME START
function startGame() {
  score = 0;
  scoreBox.textContent = score;
  time = 0;
  timeBox.textContent = time;
  gameEnded = false;

  backgroundMusic.play();
  displayComputerMove();

  intervalId = setInterval(() => {
    time++;
    timeBox.textContent = time;
  }, 1000);

  playerMoveButtons.forEach((button) => {
    button.addEventListener("click", playerMove);
  });

  roundTimerId = setInterval(() => {
    clearInterval(roundTimerId);
  }, 2500);
}

// SELECT COMPUTER MOVE
function selectComputerMove() {
  const moves = ["UP", "RIGHT", "LEFT", "DOWN"];
  let randomIndex = Math.floor(Math.random() * moves.length);

  while (moves[randomIndex] === previousMove) {
    randomIndex = Math.floor(Math.random() * moves.length);
  }

  previousMove = moves[randomIndex];
  return previousMove;
}

// DISPLAY COMPUTER MOVE
function displayComputerMove() {
  const computerMove = selectComputerMove();
  computerMoveElement.textContent = computerMove;
}

// PLAYER MOVE
function playerMove(event) {
  if (gameEnded) return;

  const playerMove = event.target.className;

  // Validating move....
  if (
    (playerMove === "up-move" && computerMoveElement.textContent === "DOWN") ||
    (playerMove === "right-move" &&
      computerMoveElement.textContent === "LEFT") ||
    (playerMove === "left-move" &&
      computerMoveElement.textContent === "RIGHT") ||
    (playerMove === "down-move" && computerMoveElement.textContent === "UP")
  ) {
    // Updating score...
    updateScore();
  } else {
    // If wrong move 
    alert("Oops! Wrong move. Game over!");
    endGame();
    return;


  }

  // // Trigger endGame() if player doesn't make a move within 2 seconds
  // setTimeout(() => {
  //   if (!gameEnded) {
  //     alert("Choosing moves should be faster. Time's up. Game over!");
  //     endGame();
  //   }
  // }, 5000); 

  // Stopping round timer...
  clearInterval(roundTimerId);

  // Looping...
  if (!gameEnded) {
    setTimeout(function () {
      displayComputerMove();
      roundTimerId = setInterval(function () {
        clearInterval(roundTimerId);
      }, 1000);
    }, 1000);
  }
}

// UPDATING SCORE DISPLAY
function updateScore() {
  score += 10;
  scoreBox.textContent = score;
}

// GAME END
function endGame() {
  clearInterval(intervalId);
  clearInterval(roundTimerId);
  gameEnded = true;
  alert(
    "Game over! Final score: " +
      score +
      ", Total time played: " +
      time +
      " seconds"
  );

  // Reset score and time to zero
  score = 0;
  time = 0;
  scoreBox.textContent = score;
  timeBox.textContent = time;

  // Reset computer move display to CHAM logo
  computerMoveElement.textContent = "CHAM";

  // Pause background music
  backgroundMusic.pause();
}

// STOP GAME
function terminateGame() {
  clearInterval(intervalId);
  clearInterval(roundTimerId);
  gameEnded = true;

  // Reset score and time to zero
  score = 0;
  time = 0;
  scoreBox.textContent = score;
  timeBox.textContent = time;

  // Reset computer move display to CHAM logo
  computerMoveElement.textContent = "CHAM";

  // Pause background music
  backgroundMusic.pause();
}

// END BUTTON
endButton.addEventListener("click", endGame);

// RESTART THE GAME
function restartGame() {
  clearInterval(intervalId);
  clearInterval(roundTimerId);
  gameEnded = false;
  backgroundMusic.play();
  displayComputerMove();
  score = 0;
  time = 0;
  scoreBox.textContent = score;
  timeBox.textContent = time;
  playerMoveButtons.forEach((button) => {
    button.addEventListener("click", playerMove);
  });

  roundTimerId = setInterval(() => {
    clearInterval(roundTimerId);
  }, 2500);

  startGame();
}

// PLAY AGAIN BUTTON SYNC
playAgainButton.addEventListener("click", restartGame);

// AUDIO
const backgroundMusic = document.querySelector("#background-music");
backgroundMusic.play();
