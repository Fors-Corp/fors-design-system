---
"@fors-corp/fors-design-system": patch
---

Named imports now tree-shake: the build annotates `forwardRef`/`memo`/`cva` calls as pure and strips the `displayName` writes that kept every component alive, so importing `Button`, `Dialog` and `Card` no longer ships Radix Select, cmdk, Toast or Slider (232 kB to 78 kB minified in a consumer probe). Same plugin forsight already uses.
