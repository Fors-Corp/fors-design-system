import * as React from "react";

/** Signal Blue, the brand accent in the Fors Corp mark (fixed, not themed). */
export const FORS_SIGNAL_BLUE = "#2D5BFF";
/** Fors ink, the mark's dark colour on light backgrounds. */
export const FORS_INK = "#10131C";

export interface BrandMarkProps extends Omit<React.SVGProps<SVGSVGElement>, "ref" | "children"> {
  /**
   * `color` (default): the letterforms take `currentColor`, so they follow the
   * surrounding text colour and flip with the theme (ink on light, white on
   * dark), and the slash stays Signal Blue. `mono`: the whole mark takes
   * `currentColor`, for single-colour contexts (print, overlays on photos).
   */
  variant?: "color" | "mono";
  /**
   * Accessible name. Defaults to "Fors Corp". Ignored when `decorative`.
   */
  title?: string;
  /**
   * Set when the logo sits next to visible text that already says "Fors Corp"
   * (e.g. inside a link that also has the name), so screen readers don't hear
   * it twice. Renders with `aria-hidden` and no accessible name.
   */
  decorative?: boolean;
}

// Monogram geometry, shared by both marks (from the brand SVGs in
// assets/brand/svg). The F is drawn upright and sheared by skewX(-12).
function MonogramShapes({ accent }: { accent: string }) {
  return (
    <>
      <g fill="currentColor">
        <polygon points="0,0 74,0 74,24 24,24 24,108 0,124" />
        <polygon points="24,48 80,48 72,72 24,72" />
      </g>
      <polygon fill={accent} points="82,0 104,0 96,24 82,24" />
    </>
  );
}

function a11yProps(title: string, decorative: boolean) {
  return decorative
    ? ({ "aria-hidden": true, focusable: "false" } as const)
    : ({ role: "img", "aria-label": title } as const);
}

/**
 * The Fors Corp "F" monogram. Use it where space is tight or the name is
 * already visible: app bars, avatars, favicons, loading states. Size it with
 * `width`/`height` or a `className` (e.g. `h-8 w-auto`); the aspect ratio is
 * fixed by its viewBox.
 */
export const ForsMonogram = React.forwardRef<SVGSVGElement, BrandMarkProps>(
  ({ variant = "color", title = "Fors Corp", decorative = false, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 150 144"
      width={props.width ?? (props.height === undefined ? 150 : undefined)}
      data-fors="brand-monogram"
      {...a11yProps(title, decorative)}
      {...props}
    >
      <g transform="translate(36,10) skewX(-12)">
        <MonogramShapes accent={variant === "mono" ? "currentColor" : FORS_SIGNAL_BLUE} />
      </g>
    </svg>
  )
);
ForsMonogram.displayName = "ForsMonogram";

/**
 * The full Fors Corp lockup: monogram plus the "FORS corp" wordmark. Use it
 * as the primary logo wherever it fits: site headers, sign-in screens,
 * footers, documents. Prefer `ForsMonogram` below roughly 120px wide.
 */
export const ForsLockup = React.forwardRef<SVGSVGElement, BrandMarkProps>(
  ({ variant = "color", title = "Fors Corp", decorative = false, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 385 100"
      width={props.width ?? (props.height === undefined ? 385 : undefined)}
      data-fors="brand-lockup"
      {...a11yProps(title, decorative)}
      {...props}
    >
      <g fillRule="evenodd" fill="currentColor" transform="translate(-200,-312)">
        <g transform="translate(231.2,325.5) scale(1.15) skewX(-12)">
          <g transform="scale(0.484)">
            <MonogramShapes accent={variant === "mono" ? "currentColor" : FORS_SIGNAL_BLUE} />
          </g>
          <path d="M74,0 L108,0 L108,48 L96,60 L62,60 L62,12 Z M74,12 L96,12 L96,48 L74,48 Z" />
          <polygon points="120,0 132,0 132,52 120,60" />
          <path d="M132,0 L152,0 L164,12 L164,28 L152,40 L132,40 Z M132,12 L152,12 L152,28 L132,28 Z" />
          <polygon points="142,40 155,40 166,60 153,60" />
          <polygon points="188,0 220,0 220,12 188,12 188,24 208,24 220,36 220,48 208,60 176,60 176,48 208,48 208,36 188,36 176,24 176,12" />
        </g>
        <g transform="translate(503,377.5) scale(0.55) skewX(-12)">
          <polygon points="6,0 22,0 22,6 6,6 6,24 22,24 22,30 0,30 0,6" />
          <path d="M40,0 L56,0 L56,24 L50,30 L34,30 L34,6 Z M40,6 L50,6 L50,24 L40,24 Z" />
          <polygon points="68,0 80,0 86,6 86,12 80,12 80,6 74,6 74,30 68,30" />
          <polygon points="96,0 102,0 102,38 96,44" />
          <path d="M102,0 L112,0 L118,6 L118,24 L112,30 L102,30 Z M102,6 L112,6 L112,24 L102,24 Z" />
        </g>
      </g>
    </svg>
  )
);
ForsLockup.displayName = "ForsLockup";
