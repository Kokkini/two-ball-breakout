# Tasks: Two-Ball Breakout (Static Web Game)

**Input**: Design documents from `/specs/001-i-am-building/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md → extract tech stack (p5.js), static app structure
2. Load data-model.md → entities
3. Load contracts/ → none (static app)
4. Load research.md → decisions/open items
5. Load quickstart.md → scenarios
6. Generate tasks with TDD-first ordering and [P] markers
```

## Phase 3.1: Setup
- [x] T001 Create static app structure at repo root: `index.html`, `assets/`, `scripts/`, `styles/`
- [x] T002 Initialize project tooling: `package.json` with scripts (dev, test, lint)
- [x] T003 [P] Add p5.js via CDN or local `assets/vendor/p5.min.js`
- [x] T004 [P] Configure linting/formatting (ESLint + Prettier)

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
- [x] T005 [P] Unit test physics reflection logic in `tests/unit/physics.reflection.test.js`
- [x] T006 [P] Unit test color-flip rules in `tests/unit/color.flip.test.js`
- [x] T007 [P] Integration test start flow per quickstart in `tests/integration/start.flow.test.js`
- [x] T008 [P] Integration test continuous simulation (pause/resume/reset) in `tests/integration/sim.controls.test.js`
- [x] T009 [P] Integration test odd grid off-by-one seeded distribution in `tests/integration/grid.init.test.js`

## Phase 3.3: Core Implementation (ONLY after tests are failing)
- [x] T010 [P] Implement grid model in `scripts/grid.js` (width, height, cells)
- [x] T011 [P] Implement ball model in `scripts/ball.js` (position, velocity)
- [x] T012 [P] Implement physics helpers in `scripts/physics.js` (axis-aligned reflection)
- [x] T013 Implement color flip logic in `scripts/colorRules.js` (per ball color)
- [x] T014 Implement seeded grid initialization in `scripts/gridInit.js`
- [x] T015 Implement p5.js sketch in `scripts/sketch.js` (draw, update loop)
- [x] T016 Implement configuration UI wiring in `scripts/ui.js` (theme, sizes, counts, angles, speed)
- [x] T017 Implement controls (Start, Pause/Resume, Reset) in `scripts/ui.js`

## Phase 3.4: Integration
- [x] T018 Wire models to p5.js render loop (read-only draw from state)
- [x] T019 Ensure responsive canvas sizing in `styles/styles.css` and sketch resize handler
- [x] T020 Add accessibility: keyboard focus, high-contrast theme, aria labels in `index.html`
- [x] T021 Add lightweight performance budget check (bundle size, FPS log) in CI script

## Phase 3.5: Polish
- [x] T022 [P] Unit tests for seeded RNG determinism in `tests/unit/seed.test.js`
- [x] T023 [P] Performance test at target device profile in `tests/perf/fps.test.js`
- [x] T024 [P] Update `specs/001-i-am-building/quickstart.md` with screenshots/steps
- [x] T025 Remove duplication and dead code

## Dependencies
- Tests (T005–T009) before implementation (T010–T017)
- T010 blocks T018; T012 blocks T015; T014 blocks T009 pass
- Implementation before integration (T018–T021) and polish (T022–T025)

## Parallel Example
```
# Launch failing tests together (in different files):
Task: "Unit test physics reflection logic in tests/unit/physics.reflection.test.js"
Task: "Unit test color-flip rules in tests/unit/color.flip.test.js"
Task: "Integration test start flow in tests/integration/start.flow.test.js"
Task: "Integration test sim controls in tests/integration/sim.controls.test.js"
Task: "Integration test grid init in tests/integration/grid.init.test.js"
```

## Notes
- [P] tasks = different files, no dependencies
- Verify tests fail before implementing
- Commit after each task
- Avoid: vague tasks, same-file conflicts
