/**
 * Unit tests for seeded RNG determinism
 */

const { seededRandom } = require('../../scripts/gridInit.js');

describe('Seeded RNG determinism', () => {
  test('Same seed produces identical sequence', () => {
    const rng1 = seededRandom('test-seed');
    const rng2 = seededRandom('test-seed');
    
    const seq1 = Array.from({ length: 10 }, () => rng1());
    const seq2 = Array.from({ length: 10 }, () => rng2());
    
    expect(seq1).toEqual(seq2);
  });

  test('Different seeds produce different sequences', () => {
    const rng1 = seededRandom('seed-A');
    const rng2 = seededRandom('seed-B');
    
    const seq1 = Array.from({ length: 10 }, () => rng1());
    const seq2 = Array.from({ length: 10 }, () => rng2());
    
    expect(seq1).not.toEqual(seq2);
  });

  test('RNG produces values in [0,1) range', () => {
    const rng = seededRandom('range-test');
    for (let i = 0; i < 100; i++) {
      const val = rng();
      expect(val).toBeGreaterThanOrEqual(0);
      expect(val).toBeLessThan(1);
    }
  });
});

