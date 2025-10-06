/**
 * Unit tests for color flip rules
 * These tests MUST FAIL until colorRules.js is implemented
 */

describe('Color flip rules', () => {
  test('shouldFlip returns true when black ball hits black square', () => {
    expect(shouldFlip('black', 'black')).toBe(true);
  });

  test('shouldFlip returns false when black ball hits white square', () => {
    expect(shouldFlip('black', 'white')).toBe(false);
  });

  test('shouldFlip returns true when white ball hits white square', () => {
    expect(shouldFlip('white', 'white')).toBe(true);
  });

  test('shouldFlip returns false when white ball hits black square', () => {
    expect(shouldFlip('white', 'black')).toBe(false);
  });

  test('flipColor toggles black to white', () => {
    expect(flipColor('black')).toBe('white');
  });

  test('flipColor toggles white to black', () => {
    expect(flipColor('white')).toBe('black');
  });

  test('flipColor throws on invalid color', () => {
    expect(() => flipColor('red')).toThrow();
  });
});

