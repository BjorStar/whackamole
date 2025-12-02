const holes = document.querySelectorAll('.holes img');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const countdownDiv = document.getElementById('countdown');
const hitsDisplay = document.getElementById('hits');
const missesDisplay = document.getElementById('misses');

let lastIndex = -1;
let gameInterval = null;
let countdownInterval = null;
let countdownTime = 10;
let hits = 0;
let misses = 0;

function resetHoles() {
  holes.forEach(img => img.src = './img/hole.png');
}

function showMole() {
  resetHoles();
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * holes.length);
  } while (randomIndex === lastIndex);
  lastIndex = randomIndex;
  holes[randomIndex].src = './img/mole.png';
}

function startGame() {
  if (gameInterval || countdownInterval) return;

  hits = 0;
  misses = 0;
  countdownTime = 10;
  hitsDisplay.textContent = hits;
  missesDisplay.textContent = misses;
  countdownDiv.textContent = countdownTime;

  gameInterval = setInterval(showMole, 800);

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
}

holes.forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole.src.includes('mole.png')) {
      hits++;
    } else {
      misses++;
    }
    hitsDisplay.textContent = hits;
    missesDisplay.textContent = misses;
  });
});

startBtn.addEventListener('click', startGame);
stopBtn.addEventListener('click', stopGame);

