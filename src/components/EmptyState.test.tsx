import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "../test-utils/axe";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders the title as an h2 by default", () => {
    render(<EmptyState title="No products yet" />);
    expect(screen.getByRole("heading", { level: 2, name: "No products yet" })).toBeInTheDocument();
  });

  it("renders the title at the requested level", () => {
    render(<EmptyState title="No products yet" titleAs="h4" />);
    expect(screen.getByRole("heading", { level: 4, name: "No products yet" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
  });

  it("renders only the title when nothing else is given", () => {
    const { container } = render(<EmptyState title="Nothing here" />);
    expect(container.querySelector("p")).toBeNull();
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders the description, icon and action", () => {
    render(
      <EmptyState
        title="No products yet"
        description="Add your first one."
        icon={<svg data-testid="glyph" />}
        action={<button type="button">Add a product</button>}
      />
    );
    expect(screen.getByText("Add your first one.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add a product" })).toBeInTheDocument();
    expect(screen.getByTestId("glyph").closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it("hides the decorative icon from assistive tech", () => {
    render(<EmptyState title="Empty" icon={<span>decor</span>} />);
    expect(screen.getByText("decor").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps the action reachable from the keyboard", async () => {
    const user = userEvent.setup();
    render(<EmptyState title="Empty" action={<button type="button">Add</button>} />);
    await user.tab();
    expect(screen.getByRole("button", { name: "Add" })).toHaveFocus();
  });

  it("forwards ref and merges className and other props", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<EmptyState ref={ref} title="Empty" className="custom" data-testid="es" />);
    expect(ref.current).toBe(screen.getByTestId("es"));
    expect(ref.current).toHaveClass("custom", "text-center");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <EmptyState
        icon={<svg />}
        title="No products yet"
        description="Add your first one."
        action={<button type="button">Add a product</button>}
      />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
