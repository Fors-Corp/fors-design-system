---
"@marcfs31/fors-design-system": patch
---

`DatePicker` now opens its calendar on the selected date's month instead of the
current month. A picker holding a value outside today's month previously showed
a grid that its own selection wasn't in, forcing the user to page back to find
it. With nothing selected the calendar still opens on today.
