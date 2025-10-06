/**
 * Integration test for simulation controls (pause/resume/reset)
 * Tests MUST FAIL until ui.js and sketch.js are implemented
 */

describe('Simulation controls', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="startBtn"></button>
      <button id="pauseBtn" disabled></button>
      <button id="resumeBtn" disabled></button>
      <button id="resetBtn"></button>
    `;
    window.gameState = { running: false, paused: false };
  });

  test('Pause button disables when simulation not started', () => {
    const pauseBtn = document.getElementById('pauseBtn');
    expect(pauseBtn.disabled).toBe(true);
  });

  test('Start enables pause button', () => {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    startBtn.click();
    expect(pauseBtn.disabled).toBe(false);
  });

  test('Pause sets paused state to true', () => {
    window.gameState.running = true;
    const pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.disabled = false;
    pauseBtn.click();
    expect(window.gameState.paused).toBe(true);
  });

  test('Resume unpauses the simulation', () => {
    window.gameState.running = true;
    window.gameState.paused = true;
    const resumeBtn = document.getElementById('resumeBtn');
    resumeBtn.disabled = false;
    resumeBtn.click();
    expect(window.gameState.paused).toBe(false);
  });

  test('Reset clears grid and balls', () => {
    window.gameState.running = true;
    window.gameState.grid = { width: 10, height: 8, cells: [] };
    window.gameState.balls = [{ color: 'black' }];
    const resetBtn = document.getElementById('resetBtn');
    resetBtn.click();
    expect(window.gameState.running).toBe(false);
    expect(window.gameState.grid).toBeNull();
    expect(window.gameState.balls).toEqual([]);
  });
});

