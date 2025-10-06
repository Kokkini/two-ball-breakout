/**
 * p5.js sketch: draw and update loop
 */

window.gameState = {
  grid: null,
  balls: [],
  running: false,
  paused: false,
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
  const canvas = createCanvas(800, 600);
  canvas.parent('p5-canvas');
  setupUI();
  frameRate(60);
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

  // Calculate square size to fit canvas
  squareSize = Math.min(width / grid.width, height / grid.height);

  // Draw grid
  for (let cell of grid.cells) {
    fill(cell.color === 'black' ? theme.black : theme.white);
    noStroke();
    rect(cell.x * squareSize, cell.y * squareSize, squareSize, squareSize);
  }

  // Update and draw balls
  if (window.gameState.running && !window.gameState.paused) {
    const currentTime = millis();
    const deltaTime = lastFrameTime === 0 ? 0 : (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;

    for (let ball of window.gameState.balls) {
      ball.update(deltaTime);

      const radius = ball.radius || 0.3;

      // Check wall collisions (ball boundary, not center)
      if (ball.position.x - radius <= 0) {
        ball.velocity = reflectX(ball.velocity);
        ball.position.x = radius;
      }
      if (ball.position.x + radius >= grid.width) {
        ball.velocity = reflectX(ball.velocity);
        ball.position.x = grid.width - radius;
      }
      if (ball.position.y - radius <= 0) {
        ball.velocity = reflectY(ball.velocity);
        ball.position.y = radius;
      }
      if (ball.position.y + radius >= grid.height) {
        ball.velocity = reflectY(ball.velocity);
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
            if (reflectXAxis) ball.velocity = reflectX(ball.velocity);
            if (reflectYAxis) ball.velocity = reflectY(ball.velocity);
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
}

function windowResized() {
  const container = document.getElementById('canvas-container');
  const newWidth = container.clientWidth - 40;
  const newHeight = Math.max(400, windowHeight * 0.7);
  resizeCanvas(newWidth, newHeight);
}

