import { describe, expect, it } from "vitest";
import { FOCUS_RINGS, FORS_PALETTES, type ForsPalette } from "../palettes";

const AA_NORMAL_TEXT = 4.5;
// WCAG 1.4.11 Non-text Contrast: a focus indicator needs 3:1 against the
// colors it sits next to.
const AA_NON_TEXT = 3;

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return [r, g, b];
}

function channelToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map(channelToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatioRgb(a: [number, number, number], b: [number, number, number]): number {
  const lA = relativeLuminance(a);
  const lB = relativeLuminance(b);
  const lighter = Math.max(lA, lB);
  const darker = Math.min(lA, lB);
  return (lighter + 0.05) / (darker + 0.05);
}

function contrastRatio(hexA: string, hexB: string): number {
  return contrastRatioRgb(hexToRgb(hexA), hexToRgb(hexB));
}

/** Source-over composite of an `rgba(r, g, b, a)` token onto an opaque hex,
 * rounded to 8-bit channels the way the browser paints it. */
function compositeOver(rgba: string, bgHex: string): [number, number, number] {
  const m = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/.exec(rgba);
  if (!m) throw new Error(`not an rgba() token: ${rgba}`);
  const [r, g, b, a] = m.slice(1).map(Number);
  const bg = hexToRgb(bgHex);
  return [r, g, b].map((c, i) => Math.round(c * a + bg[i] * (1 - a))) as [number, number, number];
}

/** Every fg/bg pairing an existing component actually renders. */
function pairsFor(p: ForsPalette): Array<[string, string, string]> {
  return [
    ["fg on bg", p.fg, p.bg],
    ["fg on surface", p.fg, p.surface],
    ["fg-secondary on bg", p.fgSecondary, p.bg],
    ["fg-secondary on surface", p.fgSecondary, p.surface],
    ["fg-secondary on surface-2", p.fgSecondary, p.surface2],
    // fg-muted is used on every ink surface (Table header on surface-2,
    // captions on surface), not just bg — check all three.
    ["fg-muted on bg", p.fgMuted, p.bg],
    ["fg-muted on surface", p.fgMuted, p.surface],
    ["fg-muted on surface-2", p.fgMuted, p.surface2],

    ["accent-fg on accent", p.accentFg, p.accent],
    ["accent-fg on accent-hover", p.accentFg, p.accentHover],
    ["accent-fg on accent-active", p.accentFg, p.accentActive],
    ["accent (as text) on surface", p.accent, p.surface],
    ["accent (as text) on accent-subtle", p.accent, p.accentSubtle],
    ["accent (as text) on surface-2", p.accent, p.surface2],

    ["spark-fg on spark", p.sparkFg, p.spark],
    ["spark-fg on spark-hover", p.sparkFg, p.sparkHover],
    ["spark (as text) on spark-subtle", p.spark, p.sparkSubtle],

    ["danger-fg on danger", p.dangerFg, p.danger],
    ["danger (as text) on danger-subtle", p.danger, p.dangerSubtle],

    ["success-fg on success", p.successFg, p.success],
    ["success (as text) on success-subtle", p.success, p.successSubtle],

    ["warning-fg on warning", p.warningFg, p.warning],
    ["warning (as text) on warning-subtle", p.warning, p.warningSubtle],
  ];
}

describe("Fors token contrast (WCAG AA, 4.5:1)", () => {
  for (const [themeName, palette] of Object.entries(FORS_PALETTES)) {
    describe(`${themeName} theme`, () => {
      for (const [label, fg, bg] of pairsFor(palette)) {
        it(`${label} passes AA`, () => {
          const ratio = contrastRatio(fg, bg);
          expect(ratio).toBeGreaterThanOrEqual(AA_NORMAL_TEXT);
        });
      }
    });
  }
});

describe("Fors focus ring contrast (WCAG 1.4.11, 3:1)", () => {
  for (const [themeName, palette] of Object.entries(FORS_PALETTES)) {
    const ring = FOCUS_RINGS[themeName as keyof typeof FOCUS_RINGS];
    describe(`${themeName} theme`, () => {
      // shadow-focus-ring is a 3px ring outside the control, so what it sits
      // next to is whichever ink surface the control is placed on.
      for (const [label, surface] of [
        ["bg", palette.bg],
        ["surface", palette.surface],
        ["surface-2", palette.surface2],
      ] as const) {
        it(`focus ring on ${label} reaches 3:1`, () => {
          const ratio = contrastRatioRgb(compositeOver(ring, surface), hexToRgb(surface));
          expect(ratio).toBeGreaterThanOrEqual(AA_NON_TEXT);
        });
      }
    });
  }
});
