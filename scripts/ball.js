/**
 * Ball model
 * Represents position, velocity, color
 */

class Ball {
  constructor(color, position, velocity) {
    this.color = color; // 'black' or 'white'
    this.position = position; // { x, y }
    this.velocity = velocity; // { x, y }
  }

  update(deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Ball };
}

