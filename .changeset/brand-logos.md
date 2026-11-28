---
"@fors-corp/fors-design-system": minor
---

Add the Fors Corp brand logos (Nov 2026 rebrand: Signal Blue `#2D5BFF`, ink `#10131C`).

- New `@fors-corp/fors-design-system/brand` entry with `ForsLockup` and `ForsMonogram` React components. The letterforms take `currentColor` so they follow the theme, and the slash stays Signal Blue unless `variant="mono"`. Each is an image named "Fors Corp" by default (`title` to rename, `decorative` to hide it when the name is already visible). Also exports `FORS_SIGNAL_BLUE` and `FORS_INK`. Server-safe: no hooks, no client directive.
- The original brand files ship under `@fors-corp/fors-design-system/assets/brand/`: `svg/` (lockup, monogram, app icon and social icon in colour, black, white and white-mono) and `favicons/` (`favicon.svg`, `favicon.ico`, PNGs from 16 to 512 px).
