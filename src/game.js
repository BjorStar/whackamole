/* --- Game --- */
const holes = document.querySelectorAll('.holes img');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const countdownDiv = document.getElementById('countdown');
const hitsDisplay = document.getElementById('hits');
const missesDisplay = document.getElementById('misses');
const scoreList = document.getElementById('scoreList');

let lastIndex = -1;
let gameInterval = null;
let countdownInterval = null;
let countdownTime = 10;
let hits = 0;
let misses = 0;

/* --- Utility --- */
function resetHoles() {
  holes.forEach(img => img.src = './img/hole.png');
}

function updateScoreboard() {
  hitsDisplay.textContent = hits;
  missesDisplay.textContent = misses;
}

/* --- Mole Logic --- */
function showMole() {
  resetHoles();
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * holes.length);
  } while (randomIndex === lastIndex);
  lastIndex = randomIndex;
  holes[randomIndex].src = './img/mole.png';
}

/* --- Game Flow --- */
function startGame() {
  if (gameInterval || countdownInterval) return;

  // Reset state
  hits = 0;
  misses = 0;
  countdownTime = 10;
  updateScoreboard();
  countdownDiv.textContent = countdownTime;

  // Start mole popping
  gameInterval = setInterval(showMole, 800);

  // Countdown
  countdownInterval = setInterval(() => {
    countdownTime--;
    countdownDiv.textContent = countdownTime;
    if (countdownTime <= 0) stopGame();
  }, 1000);
}

function stopGame() {
  clearInterval(gameInterval);
  clearInterval(countdownInterval);
  gameInterval = null;
  countdownInterval = null;
  resetHoles();
  saveHighscore();
}

/* --- Player Interaction --- */
holes.forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole.src.includes('mole.png')) {
      hits++;
    } else {
      misses++;
    }
    updateScoreboard();
  });
});

/* --- Highscore --- */
function saveHighscore() {
  const username = prompt("Enter your username:");
  if (!username) return;

  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({ name: username, score: hits });
  highscores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  showHighscores();
}

function showHighscores() {
  scoreList.innerHTML = "";
  let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.slice(0, 10).forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.score}`;
    scoreList.appendChild(li);
  });
  document.getElementById("game").classList.add("hidden");
  document.getElementById("high-score").classList.remove("hidden");
}

/* --- Buttons --- */
startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
