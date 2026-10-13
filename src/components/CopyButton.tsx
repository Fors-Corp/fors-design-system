import * as React from "react";
import { cn } from "../lib/cn";
import { Button, type ButtonProps } from "./Button";

/** How long the confirmation glyph stays before the button reverts to "copy". */
const COPIED_RESET_MS = 2000;

export interface CopyButtonProps extends Omit<
  ButtonProps,
  "value" | "children" | "asChild" | "leadingIcon" | "loading"
> {
  /** The text written to the clipboard on activation. */
  value: string;
  /**
   * Accessible name of the button ("Copy API key"). Shown as visible text when
   * `showLabel` is set, otherwise used as the `aria-label`. Required: the design
   * system carries no copy of its own, so the app supplies (and translates) it.
   */
  label: string;
  /**
   * Announced through a polite live region after a successful copy ("Copied").
   * Required for the same reason as `label`.
   */
  copiedLabel: string;
  /** Render `label` as visible text next to the icon. Defaults to an icon-only button. */
  showLabel?: boolean;
  /**
   * Called with the rejection reason when the clipboard write fails or the
   * Clipboard API is unavailable (insecure context, denied permission). The
   * button stays enabled so the user can retry; surface the failure here
   * (a toast, a "select and copy manually" hint).
   */
  onError?: (error: unknown) => void;
}

// Inline glyphs, so the component bundle stays free of the icons entry's
// Lucide dependency — same approach as Alert, Dialog and Toast. They match
// IconCopy / IconCheck from the icons entry.
function Glyph({ size, children }: { size: number; children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/**
 * Button that copies a string to the clipboard — API keys, IDs, URLs, slugs.
 * Built on `Button`, so `variant` and `size` work as there; the default is a
 * `ghost`, icon-only control that sits next to the value it copies. Pass
 * `showLabel` for a labelled button instead.
 *
 * After a successful copy the icon turns into a check for about two seconds and
 * `copiedLabel` is announced through a polite `role="status"` region, so the
 * confirmation is not colour- or icon-only. The button keeps its accessible name
 * while confirming. A failed copy never throws: `onError` is called and the
 * button stays usable. Needs a secure context (HTTPS or localhost) for the
 * Clipboard API.
 */
export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      label,
      copiedLabel,
      showLabel = false,
      onError,
      onClick,
      variant = "ghost",
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = React.useState(false);
    const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const mounted = React.useRef(true);

    React.useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
        clearTimeout(timer.current);
      };
    }, []);

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      try {
        if (!navigator.clipboard?.writeText) {
          throw new Error("The Clipboard API is not available in this context.");
        }
        await navigator.clipboard.writeText(value);
      } catch (error) {
        onError?.(error);
        return;
      }
      if (!mounted.current) return;
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
    };

    const glyphSize = size === "sm" ? 16 : 20;
    return (
      <>
        <Button
          ref={ref}
          type="button"
          variant={variant}
          size={size}
          aria-label={showLabel ? undefined : label}
          leadingIcon={
            copied ? (
              <Glyph size={glyphSize}>
                <path d="M20 6 9 17l-5-5" />
              </Glyph>
            ) : (
              <Glyph size={glyphSize}>
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </Glyph>
            )
          }
          className={cn(!showLabel && "aspect-square px-0", className)}
          data-copied={copied || undefined}
          {...props}
          onClick={handleClick}
        >
          {showLabel ? label : null}
        </Button>
        {/* Always mounted: a live region only announces text that changes inside it. */}
        <span role="status" className="sr-only">
          {copied ? copiedLabel : ""}
        </span>
      </>
    );
  }
);
CopyButton.displayName = "CopyButton";
