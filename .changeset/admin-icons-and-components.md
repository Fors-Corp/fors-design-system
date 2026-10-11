---
"@fors-corp/fors-design-system": minor
---

Add the admin icon batch and three small components.

**Icons** (`@fors-corp/fors-design-system/icons`): `IconImage`, `IconFile`, `IconFileText`, `IconFolder`, `IconKey`, `IconCopy`, `IconCheck`, `IconChevronUp`, `IconChevronDown`, `IconChevronLeft`, `IconChevronRight`, `IconBold`, `IconItalic`, `IconUnderline`, `IconStrikethrough`, `IconHeading1`, `IconHeading2`, `IconHeading3`, `IconList`, `IconListOrdered`, `IconQuote`, `IconLink`, `IconCode`, `IconUndo`, `IconRedo`, `IconEye`, `IconEyeOff`, `IconSearch`, `IconGlobe`, `IconLayoutDashboard`, `IconLayers`.

**Components:**

- `CopyButton` copies a `value` to the clipboard. It is icon-only or labelled (`showLabel`), swaps to a check for about two seconds after a successful copy, and announces the required `copiedLabel` through a polite `role="status"` region. `label` is required too, since the design system carries no copy. A failed copy never throws: it calls the optional `onError` and the button stays usable. `variant` and `size` pass through to `Button`.
- `EmptyState` is a centred placeholder with an optional `icon`, a required `title` (a heading, `h2` by default, level set by `titleAs`), an optional `description` and an optional `action`.
- `PageHeader` is a page title row: a required `title` (an `h1` by default, level set by `titleAs`), an optional `description`, `actions` aligned to the end (they wrap under the title on narrow widths) and a `breadcrumb` slot above.
