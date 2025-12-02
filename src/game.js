const usernameInput = document.getElementById('username');

function startGame() {
  if (gameInterval || countdownInterval) return;

  // Require a username before starting
  const username = usernameInput.value.trim();
  if (!username) {
    alert("Please enter your name before starting!");
    return;
  }

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

  // Save score with username
  const username = usernameInput.value.trim();
  if (username) {
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({ name: username, score: hits });
    highscores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    showHighscores();
  }
}

