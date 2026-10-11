import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { CopyButton } from "./CopyButton";

const meta: Meta<typeof CopyButton> = {
  title: "Fors/Forms/CopyButton",
  component: CopyButton,
  args: {
    value: "sk_live_51Hx9d2Fors",
    label: "Copy API key",
    copiedLabel: "Copied",
  },
};
export default meta;
type Story = StoryObj<typeof CopyButton>;

export const IconOnly: Story = {};

export const WithLabel: Story = {
  args: { showLabel: true, variant: "secondary", label: "Copy API key" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <CopyButton {...args} size="sm" />
      <CopyButton {...args} size="md" />
      <CopyButton {...args} size="lg" />
    </div>
  ),
};

export const BesideAValue: Story = {
  render: (args) => (
    <div className="flex max-w-full items-center gap-2 rounded-md border border-ink-border bg-ink-surface p-2">
      <code className="min-w-0 flex-1 break-all font-mono text-sm text-fg">{args.value}</code>
      <CopyButton {...args} size="sm" />
    </div>
  ),
};

export const ConfirmsAfterCopy: Story = {
  args: { showLabel: true, variant: "secondary" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // `setup()` installs a clipboard stub; headless Chromium would otherwise deny the write.
    const user = userEvent.setup();
    await user.click(canvas.getByRole("button", { name: "Copy API key" }));
    await expect(await canvas.findByRole("status")).toHaveTextContent("Copied");
  },
};
