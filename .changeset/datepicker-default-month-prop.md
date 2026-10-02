---
"@fors-corp/fors-design-system": minor
---

`DatePicker` accepts an optional `defaultMonth` — the month its grid opens on
when nothing is selected. With a `value` the grid still opens on that date's
month, so this only affects the empty state; it is mainly useful for keeping
stories and screenshots independent of the current date. This brings the
component to parity with the same prop in `@fors-corp/forsight`.
