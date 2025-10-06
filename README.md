# Two-Ball Breakout

A static browser game where black and white balls bounce in a grid, flipping square colors on collision.

## Features

- **Configurable**: Grid size, ball counts, angles, speed, and color themes
- **Responsive**: Works on desktop and mobile
- **Accessible**: Keyboard navigable with ARIA labels and high-contrast themes
- **Static**: No backend; runs entirely in the browser

## Quick Start

1. Open `index.html` in a modern browser
2. Configure settings in the left panel
3. Click **Start** to begin the simulation
4. Use **Pause/Resume** and **Reset** to control playback

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

## Performance

- Target: 60 FPS
- JS Bundle: < 200KB (gzip)
- First Contentful Paint: < 2s

## License

MIT

