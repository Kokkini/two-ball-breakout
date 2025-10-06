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
  classic: { black: '#000000', white: '#FFFFFF', ball: '#FF0000' },
  ocean: { black: '#003366', white: '#66CCCC', ball: '#FF6600' },
  sunset: { black: '#663399', white: '#FF9933', ball: '#FFFF00' },
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
    stroke(200);
    rect(cell.x * squareSize, cell.y * squareSize, squareSize, squareSize);
  }

  // Update and draw balls
  if (window.gameState.running && !window.gameState.paused) {
    const currentTime = millis();
    const deltaTime = lastFrameTime === 0 ? 0 : (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;

    for (let ball of window.gameState.balls) {
      ball.update(deltaTime);

      // Check wall collisions
      if (ball.position.x <= 0 || ball.position.x >= grid.width) {
        ball.velocity = reflectX(ball.velocity);
        ball.position.x = Math.max(0, Math.min(grid.width, ball.position.x));
      }
      if (ball.position.y <= 0 || ball.position.y >= grid.height) {
        ball.velocity = reflectY(ball.velocity);
        ball.position.y = Math.max(0, Math.min(grid.height, ball.position.y));
      }

      // Check square boundary collisions and flip color
      const cellX = Math.floor(ball.position.x);
      const cellY = Math.floor(ball.position.y);
      const cell = grid.getCellAt(cellX, cellY);

      if (cell && shouldFlip(ball.color, cell.color)) {
        // Determine collision edge (simplified: check velocity direction)
        const relX = ball.position.x - cellX;
        const relY = ball.position.y - cellY;
        if (relX < 0.1 || relX > 0.9) {
          ball.velocity = reflectX(ball.velocity);
        }
        if (relY < 0.1 || relY > 0.9) {
          ball.velocity = reflectY(ball.velocity);
        }
        cell.color = flipColor(cell.color);
      }
    }
  }

  // Draw balls
  for (let ball of window.gameState.balls) {
    fill(ball.color === 'black' ? theme.black : theme.white);
    stroke(theme.ball);
    strokeWeight(2);
    ellipse(
      ball.position.x * squareSize,
      ball.position.y * squareSize,
      squareSize * 0.6
    );
  }
}

function windowResized() {
  const container = document.getElementById('canvas-container');
  const newWidth = container.clientWidth - 40;
  const newHeight = Math.max(400, windowHeight * 0.7);
  resizeCanvas(newWidth, newHeight);
}

