/**
 * Grid model
 * Represents width, height, cells array
 */

class Grid {
  constructor(width, height, cells) {
    this.width = width;
    this.height = height;
    this.cells = cells;
  }

  getCellAt(x, y) {
    return this.cells.find((c) => c.x === x && c.y === y);
  }

  setCellColor(x, y, color) {
    const cell = this.getCellAt(x, y);
    if (cell) {
      cell.color = color;
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Grid };
}

