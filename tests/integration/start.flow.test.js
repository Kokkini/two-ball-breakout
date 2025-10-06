/**
 * Integration test for start flow per quickstart
 * Tests MUST FAIL until sketch.js, ui.js, gridInit.js are implemented
 */

describe('Start flow integration', () => {
  let gridInstance, ballsInstance, uiInstance;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="gridWidth" value="10" />
      <input id="gridHeight" value="8" />
      <input id="blackBallCount" value="1" />
      <input id="whiteBallCount" value="1" />
      <input id="blackStartAngle" value="45" />
      <input id="whiteStartAngle" value="135" />
      <input id="ballSpeed" value="5" />
      <input id="seed" value="12345" />
      <button id="startBtn"></button>
    `;
  });

  test('initializeGrid creates grid with correct dimensions', () => {
    gridInstance = initializeGrid(10, 8, '12345');
    expect(gridInstance.width).toBe(10);
    expect(gridInstance.height).toBe(8);
    expect(gridInstance.cells.length).toBe(80);
  });

  test('initializeGrid creates 50/50 split (or off-by-one)', () => {
    gridInstance = initializeGrid(10, 8, '12345');
    const blackCount = gridInstance.cells.filter((c) => c.color === 'black').length;
    const whiteCount = gridInstance.cells.filter((c) => c.color === 'white').length;
    expect(blackCount + whiteCount).toBe(80);
    expect(Math.abs(blackCount - whiteCount)).toBeLessThanOrEqual(1);
  });

  test('initializeBalls places black balls on white squares', () => {
    gridInstance = initializeGrid(10, 8, '12345');
    ballsInstance = initializeBalls(gridInstance, 1, 1, 45, 135, 5, '12345');
    const blackBalls = ballsInstance.filter((b) => b.color === 'black');
    blackBalls.forEach((ball) => {
      const cell = gridInstance.cells.find(
        (c) => c.x === Math.floor(ball.position.x) && c.y === Math.floor(ball.position.y)
      );
      expect(cell.color).toBe('white');
    });
  });

  test('initializeBalls places white balls on black squares', () => {
    gridInstance = initializeGrid(10, 8, '12345');
    ballsInstance = initializeBalls(gridInstance, 1, 1, 45, 135, 5, '12345');
    const whiteBalls = ballsInstance.filter((b) => b.color === 'white');
    whiteBalls.forEach((ball) => {
      const cell = gridInstance.cells.find(
        (c) => c.x === Math.floor(ball.position.x) && c.y === Math.floor(ball.position.y)
      );
      expect(cell.color).toBe('black');
    });
  });

  test('Start button triggers grid and ball initialization', () => {
    const startBtn = document.getElementById('startBtn');
    startBtn.click();
    // Expect internal state to reflect grid and balls initialized
    expect(typeof window.gameState).toBe('object');
    expect(window.gameState.grid).toBeDefined();
    expect(window.gameState.balls).toBeDefined();
  });
});

