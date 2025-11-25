/* --- Game --- */
const holes = document.querySelectorAll('.holes img');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
let lastIndex = -1; // keep track of previous hole
let gameInterval = null; // store interval ID here
let countdownTime = 10;
let countdownInterval = null;
const countdownDiv = document.getElementById('countdown');
let hits = 0;
let misses = 0;
let score = 0;

// Reset all holes to the default image
function resetHoles() {
  holes.forEach((img) => {
    img.src = './img/hole.png';
  });
}

function showMole() {
  resetHoles();

  let randomIndex;

  // Keep picking a new index until it's different from the last one
  do {
    randomIndex = Math.floor(Math.random() * holes.length);
  } while (randomIndex === lastIndex);

  lastIndex = randomIndex; // update the last index

  holes[randomIndex].src = './img/mole.png';
}

function startGame() {
  if (gameInterval !== null || countdownInterval !== null) {
    return; // Prevent multiple intervals
  }

  countdownTime = 10;
  countdownDiv.innerHTML = countdownTime;

  gameInterval = setInterval(showMole, 800);

  countdownInterval = setInterval(() => {
    countdownTime--;
    countdownDiv.innerHTML = countdownTime;

    if (countdownTime <= 0) {
      stopGame();
    }
  }, 1000);
}

function stopGame() {
  clearInterval(gameInterval);
  clearInterval(countdownInterval);

  gameInterval = null; // Reset so you can start again
  countdownInterval = null;

  resetHoles();
}

// Attach button events
startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
