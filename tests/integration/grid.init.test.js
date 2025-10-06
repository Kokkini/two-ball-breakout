/**
 * Integration test for odd grid off-by-one seeded distribution
 * Tests MUST FAIL until gridInit.js is implemented
 */

describe('Grid initialization edge cases', () => {
  test('Odd grid (W*H=odd) allows off-by-one distribution', () => {
    const grid = initializeGrid(5, 5, '42'); // 25 cells, odd
    const blackCount = grid.cells.filter((c) => c.color === 'black').length;
    const whiteCount = grid.cells.filter((c) => c.color === 'white').length;
    expect(blackCount + whiteCount).toBe(25);
    expect(Math.abs(blackCount - whiteCount)).toBe(1);
  });

  test('Even grid (W*H=even) produces exact 50/50', () => {
    const grid = initializeGrid(6, 4, '42'); // 24 cells, even
    const blackCount = grid.cells.filter((c) => c.color === 'black').length;
    const whiteCount = grid.cells.filter((c) => c.color === 'white').length;
    expect(blackCount).toBe(12);
    expect(whiteCount).toBe(12);
  });

  test('Same seed produces deterministic distribution', () => {
    const grid1 = initializeGrid(7, 7, 'fixed-seed');
    const grid2 = initializeGrid(7, 7, 'fixed-seed');
    expect(grid1.cells.map((c) => c.color)).toEqual(grid2.cells.map((c) => c.color));
  });

  test('Different seeds produce different distributions', () => {
    const grid1 = initializeGrid(7, 7, 'seed-A');
    const grid2 = initializeGrid(7, 7, 'seed-B');
    const colors1 = grid1.cells.map((c) => c.color).join('');
    const colors2 = grid2.cells.map((c) => c.color).join('');
    expect(colors1).not.toEqual(colors2);
  });
});

