---
"@fors-corp/fors-design-system": patch
---

Bulk dependency update, and Calendar day buttons now pass WCAG 2.5.3 Label in Name.

- `lucide-react`: 1.57.0 -> 1.83.0 (production dependency)
- `tailwind-merge`: 3.7.0 -> 3.7.1 (production dependency)
- Calendar / DatePicker day buttons are now labelled with `Intl`'s full date style ("Tuesday, September 1, 2026") instead of react-day-picker's default ordinal form ("Tuesday, September 1st, 2026"), so the visible day number is part of the accessible name. The label follows the calendar's `locale`, keeps the "Today, " prefix and ", selected" suffix, and a consumer's own `labels.labelDayButton` still wins. axe-core 4.14 flags the old label as `label-content-name-mismatch`.
