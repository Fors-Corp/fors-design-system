import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { axe } from "../test-utils/axe";
import { CopyButton } from "./CopyButton";

const baseProps = { value: "sk_live_123", label: "Copy API key", copiedLabel: "Copied" };

describe("CopyButton", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  function setup() {
    return userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  }

  it("is an icon-only button named by `label`", () => {
    render(<CopyButton {...baseProps} />);
    const button = screen.getByRole("button", { name: "Copy API key" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-label", "Copy API key");
    expect(button).toHaveTextContent("");
    expect(button.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("shows `label` as visible text with showLabel", () => {
    render(<CopyButton {...baseProps} showLabel />);
    const button = screen.getByRole("button", { name: "Copy API key" });
    expect(button).toHaveTextContent("Copy API key");
    expect(button).not.toHaveAttribute("aria-label");
  });

  it("passes variant and size through to Button", () => {
    render(<CopyButton {...baseProps} variant="secondary" size="sm" />);
    const button = screen.getByRole("button", { name: "Copy API key" });
    expect(button).toHaveClass("bg-ink-surface-2", "h-8");
  });

  it("defaults to the ghost variant", () => {
    render(<CopyButton {...baseProps} />);
    expect(screen.getByRole("button")).toHaveClass("bg-transparent");
  });

  it("writes `value` to the clipboard, swaps to the check and announces `copiedLabel`", async () => {
    const user = setup();
    render(<CopyButton {...baseProps} />);
    const button = screen.getByRole("button", { name: "Copy API key" });
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    expect(button).not.toHaveAttribute("data-copied");

    await user.click(button);

    expect(await navigator.clipboard.readText()).toBe("sk_live_123");
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
    expect(button).toHaveAttribute("data-copied", "true");
    expect(button.querySelector('path[d="M20 6 9 17l-5-5"]')).not.toBeNull();
    // The name does not change while confirming.
    expect(screen.getByRole("button", { name: "Copy API key" })).toBe(button);
  });

  it("reverts to the copy glyph and clears the announcement after ~2 s", async () => {
    const user = setup();
    render(<CopyButton {...baseProps} />);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(button).toHaveAttribute("data-copied", "true");

    act(() => {
      vi.advanceTimersByTime(1900);
    });
    expect(button).toHaveAttribute("data-copied", "true");

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(button).not.toHaveAttribute("data-copied");
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    expect(button.querySelector("rect")).not.toBeNull();
  });

  it("restarts the 2 s window when copied again", async () => {
    const user = setup();
    render(<CopyButton {...baseProps} />);
    const button = screen.getByRole("button");
    await user.click(button);
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    await user.click(button);
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(button).toHaveAttribute("data-copied", "true");
    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(button).not.toHaveAttribute("data-copied");
  });

  it("copies from the keyboard (Enter and Space)", async () => {
    const user = setup();
    render(<CopyButton {...baseProps} />);
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(await navigator.clipboard.readText()).toBe("sk_live_123");

    await navigator.clipboard.writeText("overwritten");
    await user.keyboard(" ");
    expect(await navigator.clipboard.readText()).toBe("sk_live_123");
  });

  it("calls the consumer's onClick first, and honours preventDefault", async () => {
    const user = setup();
    const onClick = vi.fn((event: React.MouseEvent) => event.preventDefault());
    render(<CopyButton {...baseProps} onClick={onClick} />);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("calls onError and stays usable when the clipboard write rejects", async () => {
    const user = setup();
    const onError = vi.fn();
    const failure = new Error("denied");
    const spy = vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(failure);
    render(<CopyButton {...baseProps} onError={onError} />);
    const button = screen.getByRole("button");

    await user.click(button);
    expect(onError).toHaveBeenCalledWith(failure);
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    expect(button).not.toHaveAttribute("data-copied");
    expect(button).toBeEnabled();

    spy.mockRestore();
    await user.click(button);
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
  });

  it("does not throw when the failure is unhandled (no onError)", async () => {
    const user = setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error("denied"));
    render(<CopyButton {...baseProps} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("reports onError when the Clipboard API is unavailable", async () => {
    const user = setup();
    const onError = vi.fn();
    render(<CopyButton {...baseProps} onError={onError} />);
    const original = Object.getOwnPropertyDescriptor(navigator, "clipboard");
    Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true });
    try {
      await user.click(screen.getByRole("button"));
    } finally {
      if (original) Object.defineProperty(navigator, "clipboard", original);
      else delete (navigator as { clipboard?: unknown }).clipboard;
    }
    expect(onError).toHaveBeenCalledOnce();
    expect(onError.mock.calls[0]![0]).toBeInstanceOf(Error);
  });

  it("does not update after unmount while the write is pending", async () => {
    const user = setup();
    let resolve!: () => void;
    vi.spyOn(navigator.clipboard, "writeText").mockReturnValueOnce(
      new Promise<void>((r) => {
        resolve = r;
      })
    );
    const { unmount } = render(<CopyButton {...baseProps} />);
    await user.click(screen.getByRole("button"));
    unmount();
    await act(async () => {
      resolve();
    });
    expect(vi.getTimerCount()).toBe(0);
  });

  it("clears its timer on unmount", async () => {
    const user = setup();
    const { unmount } = render(<CopyButton {...baseProps} />);
    await user.click(screen.getByRole("button"));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("forwards its ref to the button and merges className", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<CopyButton {...baseProps} ref={ref} className="custom" />);
    expect(ref.current).toBe(screen.getByRole("button"));
    expect(ref.current).toHaveClass("custom");
  });

  it("stays disabled when disabled", async () => {
    const user = setup();
    render(<CopyButton {...baseProps} disabled />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("has no accessibility violations (icon-only, labelled, and after copying)", async () => {
    const user = setup();
    const { container } = render(
      <>
        <CopyButton {...baseProps} />
        <CopyButton {...baseProps} showLabel label="Copy ID" />
      </>
    );
    expect(await axe(container)).toHaveNoViolations();
    await user.click(screen.getByRole("button", { name: "Copy API key" }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
