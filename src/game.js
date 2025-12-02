/* --- Game Setup --- */
const holes = document.querySelectorAll('.holes img');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const backBtn = document.getElementById('back-btn');

const countdownDiv = document.getElementById('countdown');
const hitsDisplay = document.getElementById('hits');
const missesDisplay = document.getElementById('misses');
const scoreDisplay = document.getElementById('score');
const scoreList = document.getElementById('scoreList');
const usernameInput = document.getElementById('username');

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
  scoreDisplay.textContent = hits; // score = hits
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

  const username = usernameInput.value.trim();
  if (!username) {
    alert("Please enter your name before starting!");
    return;
  }

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
  const username = usernameInput.value.trim();
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

/* --- Navigation --- */
backBtn.addEventListener('click', () => {
  document.getElementById("high-score").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  resetHoles();
  hits = 0;
  misses = 0;
  updateScoreboard();
  countdownDiv.textContent = 10;
});

/* --- Buttons --- */
startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);
