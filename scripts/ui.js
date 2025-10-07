/**
 * UI controls wiring (Start, Pause/Resume, Reset)
 */

function setupUI() {
  const startNewBtn = document.getElementById('startNewBtn');

  const startNewGame = () => {
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
    
    // Resize canvas to match grid dimensions
    if (typeof resizeCanvasToGrid === 'function') {
      resizeCanvasToGrid();
    }
  };

  startNewBtn.addEventListener('click', startNewGame);

  // Auto-start the game with default settings on page load
  startNewGame();

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

