# Feature Specification: Two-Ball Breakout (Static Web Game)

**Feature Branch**: `001-i-am-building`  
**Created**: 2025-10-06  
**Status**: Draft  
**Input**: User description: "I am building a modern browser game. The game is similar to the classic breakout game but there are 2 balls. A black ball and a white ball bouncing in a 2D box. When the game start, half of the box will be filled with black squares and half with white squares. The black ball starts on a white square, can move freely through white squares, bounces off walls and black squares. When the  black ball bounces off a black square, the square turns white. The white ball starts on a black square, can move freely through black squares, bounces off walls and white squares. When the white ball bounces off a white square, the square turns black. The game continues like that forever. Before the game starts, the user can choose the color themes, the width and height of the box (in terms of squares), the angle that each ball starts with, the number of balls for each color, the speed of the balls."

## Execution Flow (main)
```
1. Parse user description from Input
   → If empty: ERROR "No feature description provided"
2. Extract key concepts from description
   → Identify: actors, actions, data, constraints
3. For each unclear aspect:
   → Mark with [NEEDS CLARIFICATION: specific question]
4. Fill User Scenarios & Testing section
   → If no clear user flow: ERROR "Cannot determine user scenarios"
5. Generate Functional Requirements
   → Each requirement must be testable
   → Mark ambiguous requirements
6. Identify Key Entities (if data involved)
7. Run Review Checklist
   → If any [NEEDS CLARIFICATION]: WARN "Spec has uncertainties"
   → If implementation details found: ERROR "Remove tech details"
8. Return: SUCCESS (spec ready for planning)
```

---

## ⚡ Quick Guidelines
- ✅ Focus on WHAT users need and WHY
- ❌ Avoid HOW to implement (no tech stack, APIs, code structure)
- 👥 Written for business stakeholders, not developers

### Section Requirements
- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation
When creating this spec from a user prompt:
1. **Mark all ambiguities**: Use [NEEDS CLARIFICATION: specific question] for any assumption you'd need to make
2. **Don't guess**: If the prompt doesn't specify something (e.g., "login system" without auth method), mark it
3. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
4. **Common underspecified areas**:
   - User types and permissions
   - Data retention/deletion policies  
   - Performance targets and scale
   - Error handling behaviors
   - Integration requirements
   - Security/compliance needs

---

## Clarifications

### Session 2025-10-06
- Q: How should the grid initialize when W×H is odd and how to split colors?
  → A: Off-by-one allowed; use random seeded distribution.

## User Scenarios & Testing *(mandatory)*

### Primary User Story
As a player, I want to configure the grid initialization mode (classic left/right
divide or random distribution), grid size, ball counts, ball starting angles,
ball speed, angle fluctuation, and color theme, start the simulation, and watch
black and white balls bounce within a grid while flipping square colors according
to the rules so that the motion and visual transformation continue indefinitely
with dynamic, unpredictable movement.

### Acceptance Scenarios
1. **Given** a configured grid of W×H squares with exactly half black and half
   white squares, and at least one black ball and one white ball, **When** the
   simulation starts, **Then** each black ball is placed on a white square and
   each white ball on a black square, and balls begin moving at the configured
   speed and starting angles.
2. **Given** a black ball moving through the grid, **When** it crosses a white
   square interior, **Then** it moves freely without bouncing and the square's
   color remains unchanged.
3. **Given** a black ball moving toward a black square boundary, **When** the
   ball's boundary (considering its radius) collides with the black square
   boundary, **Then** it bounces (angle of reflection equals angle of incidence
   per elastic collision with axis-aligned edges) and the impacted black square
   turns white.
4. **Given** a white ball moving toward a white square boundary, **When** the
   ball's boundary (considering its radius) collides, **Then** it bounces and
   the impacted white square turns black.
5. **Given** a ball moving toward a wall (outer boundary), **When** the ball's
   boundary (considering its radius) collides, **Then** it bounces with no
   color change.
6. **Given** pre-game configuration is shown, **When** the player edits grid
   initialization mode, theme (selecting from multiple complementary color
   palettes), grid size, angles, counts, speed, and angle fluctuation, **Then**
   the preview updates values and the Start button initializes a new simulation
   with those settings.
7. **Given** classic initialization mode is selected, **When** the simulation
   starts, **Then** the grid is divided with left half all black and right half
   all white, with balls randomly placed on their respective colored sides.
8. **Given** random initialization mode is selected, **When** the simulation
   starts, **Then** the grid has a seeded random 50/50 distribution of black and
   white squares with balls randomly placed on appropriate colors.
9. **Given** angle fluctuation is set to 0 degrees, **When** a ball collides
   with a wall or square, **Then** it bounces with perfect elastic reflection
   (angle of incidence equals angle of reflection).
10. **Given** angle fluctuation is set to a non-zero value (e.g., 2 degrees),
    **When** a ball collides, **Then** the reflection angle is randomly varied by
    up to ±fluctuation degrees while preserving ball speed, creating less
    predictable motion.
11. **Given** the simulation is running, **When** squares flip colors, **Then**
    a score indicator bar at the bottom of the canvas displays the current
    percentage of black and white squares with a visual bar (left portion black,
    right portion white) and percentage labels on each end.

### Edge Cases
- Grid initialization modes: Classic (left/right divide) or Random (seeded distribution)
- Classic mode with odd width: Left side gets extra column if width is odd
- Random mode with odd W×H: Off-by-one allowed; use random seeded distribution
- Multiple balls simultaneous collision with the same square: Apply toggles per collision order within a tick
- Ball-ball collisions: No collisions between balls, they just pass through
- Corner collisions (wall + square corner): Resolve as double bounce with angle fluctuation applied
- Starting positions: Randomly place black balls in white squares and white balls in black squares. The ball radius is 0.3 grid squares (60% of square diameter), ensuring balls are smaller than squares.
- Speed/angle units: Use degrees and squares-per-sec
- Angle fluctuation: Random variation applied to reflection angle ±maxFluctuation; ball speed preserved
- Maximum angle fluctuation: Configurable 0-45 degrees; higher values create chaotic motion
- Large grids and high ball counts: Ensure performance remains smooth within
  target devices.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST provide a pre-game configuration UI to select grid
  initialization mode (Classic or Random), color theme (from at least 7 options
  including Classic, Ocean, Sunset, Forest, Candy, Holiday, and Luxury), grid
  width (squares), grid height (squares), starting angle for each ball color,
  number of balls per color, ball speed, and angle fluctuation (0-45 degrees,
  default 2 degrees).
- **FR-002**: On Start, the system MUST initialize a W×H grid according to the
  selected mode. Classic mode MUST create a left/right divide (left half black,
  right half white) using floor(width/2) as the midpoint. Random mode MUST
  create a seeded random 50/50 distribution; when W×H is odd, allow off-by-one.
- **FR-003**: The system MUST place each black ball initially on a white square
  and each white ball on a black square, using random placement within available
  squares of the appropriate color. Placement MUST avoid overlaps. If the number
  of balls is greater than the number of starting squares, remove the excess balls.
- **FR-004**: Black ball motion: moves freely through white squares; bounces
  when the ball's boundary (radius 0.3 grid squares) contacts walls and black
  square boundaries; upon bouncing off a black square, that square MUST flip to
  white.
- **FR-005**: White ball motion: moves freely through black squares; bounces
  when the ball's boundary (radius 0.3 grid squares) contacts walls and white
  square boundaries; upon bouncing off a white square, that square MUST flip to
  black.
- **FR-006**: The simulation MUST run continuously until paused or reset by the
  user; there is no win/lose state.
- **FR-007**: The system MUST allow pause/resume and reset to reconfigure
  settings.
- **FR-008**: The system MUST render the grid and balls using the selected
  theme, ensuring sufficient contrast between squares and balls. All themes MUST
  use complementary colors that are visually appealing and not harsh on the eyes.
  The Classic theme MUST use softened black/white (#2C2C2C/#E8E8E8) rather than
  pure black/white for reduced eye strain. Grid squares MUST be rendered without
  border lines, and balls MUST be rendered without strokes for a clean, seamless
  appearance.
- **FR-009**: Wall collisions MUST preserve speed and reflect angle according
  to axis-aligned elastic reflection, with optional random angle fluctuation
  applied as configured by the user.
- **FR-010**: Behavior for ball-ball collisions MUST be defined. [NEEDS
  CLARIFICATION: collide/elastically reflect vs pass-through]
- **FR-011**: If two or more balls attempt to flip the same square within the
  same tick, the final color resolution should be a random coin flip.
- **FR-012**: Starting positions MUST be reproducible for a given seed if randomness is used.
- **FR-013**: The system MUST apply angle fluctuation on every collision (wall
  or square boundary) when configured to a non-zero value. The fluctuation MUST
  add a random angle variation of ±angleFluctuation degrees to the reflection
  angle while preserving the ball's speed (magnitude of velocity vector).
- **FR-014**: Angle fluctuation of 0 degrees MUST result in perfectly predictable
  elastic reflections; higher values (up to 45 degrees) MUST create increasingly
  chaotic and unpredictable ball trajectories.
- **FR-015**: The system MUST display a score indicator bar positioned at the
  bottom of the canvas showing the real-time distribution of black and white
  squares. The bar MUST be visually divided with the left portion colored to
  represent black squares and the right portion for white squares, with the
  width of each portion proportional to the percentage of that color in the grid.
  Percentage labels MUST be displayed at each end of the bar.

*Example of marking unclear requirements:*
- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Key Entities *(include if feature involves data)*
- **GameSettings**: initMode (classic|random), gridWidth, gridHeight, theme
  (classic|ocean|sunset|forest|candy|holiday|luxury), blackBallCount,
  whiteBallCount, blackStartAngle, whiteStartAngle, ballSpeed, angleFluctuation
  (0-45 degrees, default 2), seed? (optional)
- **Grid**: width, height, cells (color: black|white)
- **Cell**: x, y, color
- **Ball**: color (black|white), position (x,y), velocity (angle, speed), radius (0.3 grid squares)

---

## Review & Acceptance Checklist
*GATE: Automated checks run during main() execution*

### Content Quality
- [ ] No implementation details (languages, frameworks, APIs)
- [ ] Focused on user value and business needs
- [ ] Written for non-technical stakeholders
- [ ] All mandatory sections completed

### Requirement Completeness
- [ ] No [NEEDS CLARIFICATION] markers remain
- [ ] Requirements are testable and unambiguous  
- [ ] Success criteria are measurable
- [ ] Scope is clearly bounded
- [ ] Dependencies and assumptions identified

---

## Execution Status
*Updated by main() during processing*

- [ ] User description parsed
- [ ] Key concepts extracted
- [ ] Ambiguities marked
- [ ] User scenarios defined
- [ ] Requirements generated
- [ ] Entities identified
- [ ] Review checklist passed

---
