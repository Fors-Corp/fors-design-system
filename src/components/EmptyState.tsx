import * as React from "react";
import { cn } from "../lib/cn";

type EmptyStateHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Short heading saying what is empty ("No products yet"). */
  title: React.ReactNode;
  /** Semantic level of `title`. Defaults to `h2` — set it to keep the document outline correct. */
  titleAs?: EmptyStateHeadingLevel;
  /** One or two sentences on why it is empty or what to do next. */
  description?: React.ReactNode;
  /** Decorative glyph above the title, e.g. `<IconPackage size={32} />`. Hidden from assistive tech. */
  icon?: React.ReactNode;
  /** The next step, usually a `Button` or a link-styled `Button asChild`. */
  action?: React.ReactNode;
}

/**
 * Placeholder for a list, table or section that has nothing to show yet — a new
 * workspace, a search with no results, a cleared inbox. Centres an optional
 * `icon`, a `title`, an optional `description` and an optional `action` (the
 * primary next step) in a single column that wraps at any width down to 320 px.
 *
 * `title` renders as a real heading, `h2` by default; set `titleAs` to match the
 * surrounding outline. The `icon` is decorative and is hidden from assistive
 * tech, so the title must carry the meaning on its own.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, titleAs: Title = "h2", description, icon, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-4 py-10 text-center font-sans text-fg-muted",
        className
      )}
      {...props}
    >
      {icon && (
        <div
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink-surface-2 text-fg-muted"
        >
          {icon}
        </div>
      )}
      <Title className="font-heading text-lg font-semibold text-fg">{title}</Title>
      {description && <p className="max-w-prose text-sm text-fg-muted">{description}</p>}
      {action && (
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">{action}</div>
      )}
    </div>
  )
);
EmptyState.displayName = "EmptyState";
