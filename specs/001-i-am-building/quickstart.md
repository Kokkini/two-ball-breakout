# Quickstart

## Running the Game

1. Open `index.html` in a modern browser (mobile or desktop).
2. Configure settings in the left panel:
   - **Color Theme**: Choose from Classic, Ocean, or Sunset
   - **Grid Width/Height**: Set grid dimensions (5-50 squares)
   - **Ball Counts**: Number of black and white balls (0-10 each)
   - **Starting Angles**: Initial direction in degrees (0-359)
   - **Ball Speed**: Movement speed in squares/sec (1-20)
   - **Random Seed**: Optional seed for reproducible grids
3. Click **Start** to begin the simulation.
4. Use **Pause/Resume** to control playback.
5. Click **Reset** to reconfigure and start over.

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm test

# Lint
npm run lint
```

## Expected Behavior

- Black balls bounce off walls and black squares, flipping black to white
- White balls bounce off walls and white squares, flipping white to black
- Balls pass through each other without collision
- Grid initializes with ~50/50 color split (off-by-one allowed for odd grids)
- Same seed produces identical starting configurations

