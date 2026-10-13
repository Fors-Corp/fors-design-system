import * as React from "react";
import { cn } from "../lib/cn";

type PageHeaderHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  /** The page title. */
  title: React.ReactNode;
  /** Semantic level of `title`. Defaults to `h1` — use a lower level for a section header. */
  titleAs?: PageHeaderHeadingLevel;
  /** One line of context under the title. */
  description?: React.ReactNode;
  /** Page-level actions (buttons, a menu), aligned to the end. Wraps under the title on narrow widths. */
  actions?: React.ReactNode;
  /** Trail rendered above the title — pass a `Breadcrumb`. */
  breadcrumb?: React.ReactNode;
}

/**
 * Title row at the top of an admin page: an optional `breadcrumb`, then the
 * `title` (an `h1` by default) with an optional `description`, and `actions`
 * aligned to the end of the row. On narrow screens the actions wrap beneath the
 * title instead of squeezing it. No fixed heights, so long titles and
 * translations grow the header rather than clipping.
 *
 * It renders a `<header>`; inside a page `<main>` that is a plain grouping
 * element, not a banner landmark.
 */
export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  (
    { className, title, titleAs: Title = "h1", description, actions, breadcrumb, ...props },
    ref
  ) => (
    <header ref={ref} className={cn("flex flex-col gap-3 font-sans", className)} {...props}>
      {breadcrumb}
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="min-w-0 flex-1 basis-64">
          <Title className="font-heading text-2xl font-semibold text-fg">{title}</Title>
          {description && <p className="mt-1 text-sm text-fg-muted">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  )
);
PageHeader.displayName = "PageHeader";
