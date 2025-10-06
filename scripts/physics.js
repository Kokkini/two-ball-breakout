/**
 * Physics helpers for axis-aligned reflection with optional angle fluctuation
 */

function reflectX(velocity, fluctuation = 0) {
  let reflected = { x: -velocity.x, y: velocity.y };
  if (fluctuation > 0) {
    reflected = applyFluctuation(reflected, fluctuation);
  }
  return reflected;
}

function reflectY(velocity, fluctuation = 0) {
  let reflected = { x: velocity.x, y: -velocity.y };
  if (fluctuation > 0) {
    reflected = applyFluctuation(reflected, fluctuation);
  }
  return reflected;
}

function reflectCorner(velocity, fluctuation = 0) {
  let reflected = { x: -velocity.x, y: -velocity.y };
  if (fluctuation > 0) {
    reflected = applyFluctuation(reflected, fluctuation);
  }
  return reflected;
}

function applyFluctuation(velocity, maxFluctuationDegrees) {
  // Convert velocity to angle and magnitude
  const magnitude = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);
  const currentAngle = Math.atan2(velocity.y, velocity.x);
  
  // Add random fluctuation in radians
  const fluctuationRadians = (Math.random() - 0.5) * 2 * (maxFluctuationDegrees * Math.PI / 180);
  const newAngle = currentAngle + fluctuationRadians;
  
  // Convert back to velocity components
  return {
    x: Math.cos(newAngle) * magnitude,
    y: Math.sin(newAngle) * magnitude
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { reflectX, reflectY, reflectCorner };
}

