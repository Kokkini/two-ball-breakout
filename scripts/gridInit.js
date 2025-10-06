/**
 * Grid initialization with seeded random distribution
 */

// Simple seeded random generator (mulberry32)
function seededRandom(seed) {
  let state = 0;
  for (let i = 0; i < seed.length; i++) {
    state = (state + seed.charCodeAt(i)) | 0;
  }
  return function () {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function initializeGrid(width, height, seed = '') {
  const totalCells = width * height;
  const targetBlack = Math.floor(totalCells / 2);
  const targetWhite = totalCells - targetBlack;

  const cells = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells.push({ x, y, color: null });
    }
  }

  // Assign colors randomly using seed
  const rng = seed ? seededRandom(seed) : Math.random;
  const shuffled = cells.slice().sort(() => rng() - 0.5);

  for (let i = 0; i < targetBlack; i++) {
    shuffled[i].color = 'black';
  }
  for (let i = targetBlack; i < totalCells; i++) {
    shuffled[i].color = 'white';
  }

  return new Grid(width, height, cells);
}

function initializeBalls(
  grid,
  blackCount,
  whiteCount,
  blackAngle,
  whiteAngle,
  speed,
  seed = ''
) {
  const balls = [];
  const rng = seed ? seededRandom(seed + '_balls') : Math.random;

  // Get available starting squares
  const whiteSquares = grid.cells.filter((c) => c.color === 'white');
  const blackSquares = grid.cells.filter((c) => c.color === 'black');

  // Place black balls on white squares
  const shuffledWhite = whiteSquares.slice().sort(() => rng() - 0.5);
  for (let i = 0; i < Math.min(blackCount, shuffledWhite.length); i++) {
    const cell = shuffledWhite[i];
    const rad = (blackAngle * Math.PI) / 180;
    const velocity = { x: Math.cos(rad) * speed, y: Math.sin(rad) * speed };
    balls.push(new Ball('black', { x: cell.x + 0.5, y: cell.y + 0.5 }, velocity));
  }

  // Place white balls on black squares
  const shuffledBlack = blackSquares.slice().sort(() => rng() - 0.5);
  for (let i = 0; i < Math.min(whiteCount, shuffledBlack.length); i++) {
    const cell = shuffledBlack[i];
    const rad = (whiteAngle * Math.PI) / 180;
    const velocity = { x: Math.cos(rad) * speed, y: Math.sin(rad) * speed };
    balls.push(new Ball('white', { x: cell.x + 0.5, y: cell.y + 0.5 }, velocity));
  }

  return balls;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initializeGrid, initializeBalls, seededRandom };
}

