---
"@fors-corp/fors-design-system": patch
---

Fix oversized client bundles by providing isolated `@fors-corp/fors-design-system/button` and `@fors-corp/fors-design-system/use-fors-tokens` entry points. Both preserve their client boundaries, public types, styling, and behavior without loading unrelated components. Existing root imports remain supported.
