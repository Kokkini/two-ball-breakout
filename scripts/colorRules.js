/**
 * Color flip logic per ball color
 */

function shouldFlip(ballColor, squareColor) {
  // Black ball flips black squares; white ball flips white squares
  return ballColor === squareColor;
}

function flipColor(color) {
  if (color === 'black') return 'white';
  if (color === 'white') return 'black';
  throw new Error(`Invalid color: ${color}`);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { shouldFlip, flipColor };
}

