/**
 * Ball model
 * Represents position, velocity, color, radius
 */

class Ball {
  constructor(color, position, velocity, radius = 0.3) {
    this.color = color; // 'black' or 'white'
    this.position = position; // { x, y } in grid coordinates
    this.velocity = velocity; // { x, y } in grid squares/sec
    this.radius = radius; // radius in grid squares (default 0.3 = 60% of square)
  }

  update(deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Ball };
}

