/**
 * p5.js sketch: draw and update loop
 */

window.gameState = {
  grid: null,
  balls: [],
  running: false,
  paused: false,
  angleFluctuation: 2,
};

let squareSize = 20;
let lastFrameTime = 0;

const themes = {
  classic: { black: '#2C2C2C', white: '#E8E8E8', ball: '#D32F2F' },
  ocean: { black: '#1B4965', white: '#BEE9E8', ball: '#FF6B35' },
  sunset: { black: '#5C2E7E', white: '#FFBA49', ball: '#FF5E5B' },
  forest: { black: '#2D4538', white: '#A8DADC', ball: '#E63946' },
  candy: { black: '#D81159', white: '#FFBC42', ball: '#8F2D56' },
  holiday: { black: '#C41E3A', white: '#2D5F3F', ball: '#FFD700' },
  luxury: { black: '#1A1A1D', white: '#D4AF37', ball: '#C0C0C0' },
};

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent('p5-canvas');
  setupUI();
  frameRate(60);
  resizeCanvasToGrid();
}

function draw() {
  background(240);

  if (!window.gameState.grid) {
    fill(100);
    textAlign(CENTER, CENTER);
    textSize(20);
    text('Configure settings and click Start', width / 2, height / 2);
    return;
  }

  const theme = themes[document.getElementById('theme').value] || themes.classic;
  const grid = window.gameState.grid;

  // Calculate square size to fit canvas (use floor to avoid subpixel gaps)
  squareSize = Math.floor(Math.min(width / grid.width, height / grid.height));

  // Draw grid
  for (let cell of grid.cells) {
    fill(cell.color === 'black' ? theme.black : theme.white);
    noStroke();
    // Add 1 pixel overlap to prevent gaps from subpixel rendering
    rect(
      Math.floor(cell.x * squareSize),
      Math.floor(cell.y * squareSize),
      squareSize + 1,
      squareSize + 1
    );
  }

  // Update and draw balls
  if (window.gameState.running && !window.gameState.paused) {
    const currentTime = millis();
    const deltaTime = lastFrameTime === 0 ? 0 : (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;

    const fluctuation = window.gameState.angleFluctuation || 0;

    for (let ball of window.gameState.balls) {
      ball.update(deltaTime);

      const radius = ball.radius || 0.3;

      // Check wall collisions (ball boundary, not center)
      if (ball.position.x - radius <= 0) {
        ball.velocity = reflectX(ball.velocity, fluctuation);
        ball.position.x = radius;
      }
      if (ball.position.x + radius >= grid.width) {
        ball.velocity = reflectX(ball.velocity, fluctuation);
        ball.position.x = grid.width - radius;
      }
      if (ball.position.y - radius <= 0) {
        ball.velocity = reflectY(ball.velocity, fluctuation);
        ball.position.y = radius;
      }
      if (ball.position.y + radius >= grid.height) {
        ball.velocity = reflectY(ball.velocity, fluctuation);
        ball.position.y = grid.height - radius;
      }

      // Check square boundary collisions and flip color
      // Get all cells the ball overlaps with (considering radius)
      const minCellX = Math.max(0, Math.floor(ball.position.x - radius));
      const maxCellX = Math.min(grid.width - 1, Math.floor(ball.position.x + radius));
      const minCellY = Math.max(0, Math.floor(ball.position.y - radius));
      const maxCellY = Math.min(grid.height - 1, Math.floor(ball.position.y + radius));

      for (let cy = minCellY; cy <= maxCellY; cy++) {
        for (let cx = minCellX; cx <= maxCellX; cx++) {
          const cell = grid.getCellAt(cx, cy);
          if (!cell || !shouldFlip(ball.color, cell.color)) continue;

          // Check if ball boundary overlaps with cell boundaries
          const cellLeft = cx;
          const cellRight = cx + 1;
          const cellTop = cy;
          const cellBottom = cy + 1;

          let collided = false;
          let reflectXAxis = false;
          let reflectYAxis = false;

          // Check horizontal edges (left and right)
          if (ball.velocity.x > 0 && ball.position.x + radius >= cellLeft && ball.position.x - radius < cellLeft) {
            // Approaching from left
            if (ball.position.y >= cellTop && ball.position.y <= cellBottom) {
              reflectXAxis = true;
              collided = true;
              ball.position.x = cellLeft - radius;
            }
          } else if (ball.velocity.x < 0 && ball.position.x - radius <= cellRight && ball.position.x + radius > cellRight) {
            // Approaching from right
            if (ball.position.y >= cellTop && ball.position.y <= cellBottom) {
              reflectXAxis = true;
              collided = true;
              ball.position.x = cellRight + radius;
            }
          }

          // Check vertical edges (top and bottom)
          if (ball.velocity.y > 0 && ball.position.y + radius >= cellTop && ball.position.y - radius < cellTop) {
            // Approaching from top
            if (ball.position.x >= cellLeft && ball.position.x <= cellRight) {
              reflectYAxis = true;
              collided = true;
              ball.position.y = cellTop - radius;
            }
          } else if (ball.velocity.y < 0 && ball.position.y - radius <= cellBottom && ball.position.y + radius > cellBottom) {
            // Approaching from bottom
            if (ball.position.x >= cellLeft && ball.position.x <= cellRight) {
              reflectYAxis = true;
              collided = true;
              ball.position.y = cellBottom + radius;
            }
          }

          if (collided) {
            if (reflectXAxis) ball.velocity = reflectX(ball.velocity, fluctuation);
            if (reflectYAxis) ball.velocity = reflectY(ball.velocity, fluctuation);
            cell.color = flipColor(cell.color);
          }
        }
      }
    }
  }

  // Draw balls
  for (let ball of window.gameState.balls) {
    const radius = ball.radius || 0.3;
    fill(ball.color === 'black' ? theme.black : theme.white);
    noStroke();
    ellipse(
      ball.position.x * squareSize,
      ball.position.y * squareSize,
      radius * 2 * squareSize // diameter = 2 * radius
    );
  }

  // Update score bar
  updateScoreBar(grid);
}

function updateScoreBar(grid) {
  if (!grid) return;
  
  const blackCount = grid.cells.filter((c) => c.color === 'black').length;
  const totalCount = grid.cells.length;
  const blackPercent = Math.round((blackCount / totalCount) * 100);
  const whitePercent = 100 - blackPercent;
  
  const blackPortion = document.getElementById('black-portion');
  const blackScore = document.getElementById('blackScore');
  const whiteScore = document.getElementById('whiteScore');
  
  if (blackPortion) blackPortion.style.width = `${blackPercent}%`;
  if (blackScore) blackScore.textContent = `${blackPercent}%`;
  if (whiteScore) whiteScore.textContent = `${whitePercent}%`;
}

function resizeCanvasToGrid() {
  if (!window.gameState.grid) return;
  
  const grid = window.gameState.grid;
  const container = document.getElementById('canvas-container');
  const maxWidth = container.clientWidth - 40;
  const maxHeight = Math.max(400, windowHeight * 0.7);
  
  // Calculate the ideal square size to fit within container
  const maxSquareSize = Math.floor(Math.min(maxWidth / grid.width, maxHeight / grid.height));
  
  // Calculate exact canvas size to fit the grid perfectly
  const newWidth = maxSquareSize * grid.width;
  const newHeight = maxSquareSize * grid.height;
  
  resizeCanvas(newWidth, newHeight);
}

function windowResized() {
  resizeCanvasToGrid();
}

