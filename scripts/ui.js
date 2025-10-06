/**
 * UI controls wiring (Start, Pause/Resume, Reset)
 */

function setupUI() {
  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resumeBtn = document.getElementById('resumeBtn');
  const resetBtn = document.getElementById('resetBtn');

  startBtn.addEventListener('click', () => {
    const gridWidth = parseInt(document.getElementById('gridWidth').value, 10);
    const gridHeight = parseInt(document.getElementById('gridHeight').value, 10);
    const blackBallCount = parseInt(document.getElementById('blackBallCount').value, 10);
    const whiteBallCount = parseInt(document.getElementById('whiteBallCount').value, 10);
    const blackStartAngle = parseInt(document.getElementById('blackStartAngle').value, 10);
    const whiteStartAngle = parseInt(document.getElementById('whiteStartAngle').value, 10);
    const ballSpeed = parseFloat(document.getElementById('ballSpeed').value);
    const angleFluctuation = parseFloat(document.getElementById('angleFluctuation').value);
    const initMode = document.getElementById('initMode').value;
    const seed = document.getElementById('seed').value.trim() || Date.now().toString();

    window.gameState.grid = initializeGrid(gridWidth, gridHeight, seed, initMode);
    window.gameState.balls = initializeBalls(
      window.gameState.grid,
      blackBallCount,
      whiteBallCount,
      blackStartAngle,
      whiteStartAngle,
      ballSpeed,
      seed,
      initMode
    );
    window.gameState.angleFluctuation = angleFluctuation;
    window.gameState.running = true;
    window.gameState.paused = false;

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
  });

  pauseBtn.addEventListener('click', () => {
    window.gameState.paused = true;
    pauseBtn.disabled = true;
    resumeBtn.disabled = false;
  });

  resumeBtn.addEventListener('click', () => {
    window.gameState.paused = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
  });

  resetBtn.addEventListener('click', () => {
    window.gameState.running = false;
    window.gameState.paused = false;
    window.gameState.grid = null;
    window.gameState.balls = [];

    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { setupUI };
}

