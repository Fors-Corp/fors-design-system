import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "../test-utils/axe";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("renders the title as an h1 by default", () => {
    render(<PageHeader title="Products" />);
    expect(screen.getByRole("heading", { level: 1, name: "Products" })).toBeInTheDocument();
  });

  it("renders the title at the requested level", () => {
    render(<PageHeader title="Products" titleAs="h2" />);
    expect(screen.getByRole("heading", { level: 2, name: "Products" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });

  it("renders only the title when nothing else is given", () => {
    const { container } = render(<PageHeader title="Products" />);
    expect(container.querySelector("p")).toBeNull();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders the description, actions and breadcrumb", () => {
    render(
      <PageHeader
        title="Linen shirt"
        description="SKU LS-204"
        actions={<button type="button">Archive</button>}
        breadcrumb={<nav aria-label="Breadcrumb">Products / Linen shirt</nav>}
      />
    );
    expect(screen.getByText("SKU LS-204")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Archive" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("puts the breadcrumb before the title in reading order, and the actions after it", () => {
    render(
      <PageHeader
        title="Linen shirt"
        actions={<button type="button">Archive</button>}
        breadcrumb={<nav aria-label="Breadcrumb">Trail</nav>}
      />
    );
    const nav = screen.getByRole("navigation");
    const heading = screen.getByRole("heading");
    const button = screen.getByRole("button");
    expect(nav.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(heading.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("wraps the action row and sets no fixed height", () => {
    const { container } = render(
      <PageHeader title="Products" actions={<button type="button">New</button>} />
    );
    expect(screen.getByRole("button").parentElement).toHaveClass("flex-wrap");
    expect(container.innerHTML).not.toMatch(/\bh-\d/);
  });

  it("makes the actions reachable from the keyboard", async () => {
    const user = userEvent.setup();
    render(<PageHeader title="Products" actions={<button type="button">New</button>} />);
    await user.tab();
    expect(screen.getByRole("button", { name: "New" })).toHaveFocus();
  });

  it("forwards ref to the header and merges className", () => {
    const ref = React.createRef<HTMLElement>();
    render(<PageHeader ref={ref} title="Products" className="custom" data-testid="ph" />);
    expect(ref.current).toBe(screen.getByTestId("ph"));
    expect(ref.current?.tagName).toBe("HEADER");
    expect(ref.current).toHaveClass("custom");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <main>
        <PageHeader
          title="Linen shirt"
          description="SKU LS-204"
          actions={<button type="button">Archive</button>}
          breadcrumb={<nav aria-label="Breadcrumb">Products</nav>}
        />
      </main>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
