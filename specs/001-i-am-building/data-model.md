# Data Model

## Entities
- GameSettings: gridWidth, gridHeight, theme, blackBallCount, whiteBallCount,
  blackStartAngle, whiteStartAngle, ballSpeed, seed?
- Grid: width, height, cells
- Cell: x, y, color (black|white)
- Ball: color (black|white), position (x,y), velocity (angle, speed)

## Validation Rules
- gridWidth, gridHeight ≥ 1
- ball counts ≥ 0; total starting positions must fit available squares per color

## State Transitions
- On collision flip: cell.color toggles per impacting ball rule

