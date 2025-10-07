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
    let ballSpeed = parseFloat(document.getElementById('ballSpeed').value);
    const angleFluctuation = parseFloat(document.getElementById('angleFluctuation').value);
    const initMode = document.getElementById('initMode').value;
    const seed = document.getElementById('seed').value.trim() || Date.now().toString();
    
    // Enforce minimum ball speed
    if (ballSpeed < 1 || isNaN(ballSpeed)) {
      ballSpeed = 1;
      document.getElementById('ballSpeed').value = 1;
    }

    window.gameState.grid = initializeGrid(gridWidth, gridHeight, seed, initMode);
    window.gameState.balls = initializeBalls(
      window.gameState.grid,
      blackBallCount,
      whiteBallCount,
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

  // Auto-start the game with default settings on page load
  startBtn.click();

  // Live update ball speed when changed
  const ballSpeedInput = document.getElementById('ballSpeed');
  ballSpeedInput.addEventListener('input', (e) => {
    let newSpeed = parseFloat(e.target.value);
    // Enforce minimum speed of 1
    if (newSpeed < 1 || isNaN(newSpeed)) {
      newSpeed = 1;
      e.target.value = 1;
    }
    
    if (window.gameState.running && window.gameState.balls.length > 0) {
      window.gameState.balls.forEach(ball => {
        // Calculate current speed (magnitude of velocity vector)
        const currentSpeed = Math.sqrt(ball.velocity.x ** 2 + ball.velocity.y ** 2);
        if (currentSpeed > 0) {
          // Preserve direction, update magnitude
          const scale = newSpeed / currentSpeed;
          ball.velocity.x *= scale;
          ball.velocity.y *= scale;
        }
      });
    }
  });

  // Live update angle fluctuation when changed
  document.getElementById('angleFluctuation').addEventListener('input', (e) => {
    if (window.gameState.running) {
      window.gameState.angleFluctuation = parseFloat(e.target.value);
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { setupUI };
}

