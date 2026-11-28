import { describe, expect, it } from "vitest";
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { axe } from "../test-utils/axe";
import { FORS_INK, FORS_SIGNAL_BLUE, ForsLockup, ForsMonogram } from "./index";

const ASSETS = path.resolve(__dirname, "../../assets/brand");

describe.each([
  ["ForsMonogram", ForsMonogram, "0 0 150 144"],
  ["ForsLockup", ForsLockup, "0 0 385 100"],
] as const)("%s", (_name, Mark, viewBox) => {
  it("is an image named Fors Corp by default", async () => {
    const { container } = render(<Mark />);
    const svg = screen.getByRole("img", { name: "Fors Corp" });
    expect(svg).toHaveAttribute("viewBox", viewBox);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("takes a custom accessible name", () => {
    render(<Mark title="Fors Corp home" />);
    expect(screen.getByRole("img", { name: "Fors Corp home" })).toBeInTheDocument();
  });

  it("hides itself from assistive tech when decorative", async () => {
    const { container } = render(<Mark decorative />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role");
    expect(svg).not.toHaveAttribute("aria-label");
    expect(await axe(container)).toHaveNoViolations();
  });

  it("keeps the slash Signal Blue in color and follows currentColor in mono", () => {
    const { container, rerender } = render(<Mark />);
    const fills = () =>
      [...container.querySelectorAll("[fill]")].map((el) => el.getAttribute("fill"));
    expect(fills()).toContain(FORS_SIGNAL_BLUE);
    rerender(<Mark variant="mono" />);
    expect(fills()).not.toContain(FORS_SIGNAL_BLUE);
    expect(new Set(fills())).toEqual(new Set(["currentColor"]));
  });

  it("defaults to its native width, but lets height alone size it", () => {
    const { container, rerender } = render(<Mark />);
    const svg = () => container.querySelector("svg")!;
    expect(svg().getAttribute("width")).toBe(viewBox.split(" ")[2]);
    rerender(<Mark height={32} />);
    expect(svg()).not.toHaveAttribute("width");
    expect(svg()).toHaveAttribute("height", "32");
  });

  it("forwards its ref and extra props to the svg", () => {
    const ref = createRef<SVGSVGElement>();
    render(<Mark ref={ref} className="h-8 w-auto" data-testid="mark" />);
    expect(ref.current).toBe(screen.getByTestId("mark"));
    expect(ref.current).toHaveClass("h-8", "w-auto");
  });
});

describe("brand assets", () => {
  it("ships the brand SVGs in the current palette, not the previous brand", () => {
    const svgs = readdirSync(path.join(ASSETS, "svg")).filter((f) => f.endsWith(".svg"));
    expect(svgs).toEqual(expect.arrayContaining(["fors_monogram.svg", "fors_lockup.svg"]));
    for (const file of svgs) {
      const src = readFileSync(path.join(ASSETS, "svg", file), "utf8").toUpperCase();
      const fills = new Set(src.match(/FILL="#[0-9A-F]{6}"/g)?.map((f) => f.slice(6, 13)));
      // Only the Nov 2026 palette; the previous brand's ink was #0B0B0C.
      expect(
        [...fills].every((c) => [FORS_SIGNAL_BLUE, FORS_INK, "#FFFFFF"].includes(c)),
        file
      ).toBe(true);
      expect(fills.size, file).toBeGreaterThan(0);
    }
  });

  it("draws the same monogram as the shipped SVG", () => {
    const src = readFileSync(path.join(ASSETS, "svg/fors_monogram.svg"), "utf8");
    const { container } = render(<ForsMonogram />);
    for (const polygon of container.querySelectorAll("polygon")) {
      expect(src).toContain(`points="${polygon.getAttribute("points")}"`);
    }
  });

  it("ships the favicon set", () => {
    expect(readdirSync(path.join(ASSETS, "favicons")).sort()).toEqual(
      [
        "favicon-16.png",
        "favicon-180.png",
        "favicon-192.png",
        "favicon-32.png",
        "favicon-48.png",
        "favicon-512.png",
        "favicon.ico",
        "favicon.svg",
      ].sort()
    );
  });
});
