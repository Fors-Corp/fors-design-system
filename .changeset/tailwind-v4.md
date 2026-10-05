---
"@fors-corp/fors-design-system": major
---

Move to Tailwind CSS v4 and drop the Tailwind v3 integration.

**Breaking:**

- The `@fors-corp/fors-design-system/tailwind-preset` export (the Tailwind v3 preset) is removed. Tailwind apps use the v4 integration instead, in their global stylesheet: `@import "tailwindcss"; @import "@fors-corp/fors-design-system/tailwind.css";`. It provides the same token utilities.
- The optional `tailwindcss` peer range is now `>=4` (was `>=3.4`).
- `tailwindcss-animate` is no longer a dependency. The overlay motion is compiled into `styles.css`, using `tw-animate-css` at build time.
- `styles.css` is now compiled by Tailwind v4. Its utilities sit in the `utilities` cascade layer, the one a Tailwind v4 app's own utilities use, instead of being unlayered. As a result, unlayered app CSS now overrides component styles. It also defines none of Tailwind's own theme variables on `:root`, so the app's Tailwind theme is left untouched.
- Focus styles use `outline-hidden` (Tailwind v4's name for v3's `outline-none`). The outline stays hidden, except in forced-colors mode where it is still shown.

**Added:** `tailwind.css` now also provides the `duration-fast` / `duration-base` motion utilities and the `animate-accordion-{down,up}` / `animate-collapsible-{down,up}` animations.

Removing Tailwind v3 also removes `braces` from the dependency tree (GHSA-vfj7-8cjw-p6xm, which has no patched release).
