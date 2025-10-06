/**
 * Physics helpers for axis-aligned reflection
 */

function reflectX(velocity) {
  return { x: -velocity.x, y: velocity.y };
}

function reflectY(velocity) {
  return { x: velocity.x, y: -velocity.y };
}

function reflectCorner(velocity) {
  return { x: -velocity.x, y: -velocity.y };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { reflectX, reflectY, reflectCorner };
}

