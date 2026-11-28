import type { Meta, StoryObj } from "@storybook/react";
import { ForsLockup, ForsMonogram } from "./index";

const meta: Meta<typeof ForsLockup> = {
  title: "Fors/Foundations/Brand",
  component: ForsLockup,
  parameters: {
    docs: {
      description: {
        component:
          'The Fors Corp logos, exported from `@fors-corp/fors-design-system/brand`. `ForsLockup` is the primary logo; `ForsMonogram` is for tight spaces. Both inherit `currentColor` for the letterforms, so they flip with the theme, and keep the slash in Signal Blue (`#2D5BFF`) unless `variant="mono"`. They are images named "Fors Corp" by default; pass `decorative` when the name is already visible next to them. The original SVG, PNG favicon and app-icon files ship under `@fors-corp/fors-design-system/assets/brand/`.',
      },
    },
  },
  args: { variant: "color" },
  argTypes: { variant: { control: "inline-radio", options: ["color", "mono"] } },
};
export default meta;
type Story = StoryObj<typeof ForsLockup>;

export const Lockup: Story = {
  render: (args) => <ForsLockup {...args} className="h-16 w-auto max-w-full text-fg" />,
};

export const Monogram: Story = {
  render: (args) => <ForsMonogram {...args} className="h-16 w-auto text-fg" />,
};

export const OnInkAndOnLight: Story = {
  name: "On ink and on light",
  render: (args) => (
    <div className="grid gap-4 sm:grid-cols-2">
      <div
        className="flex items-center justify-center rounded-md p-6"
        style={{ background: "#10131C", color: "#FFFFFF" }}
      >
        <ForsLockup {...args} className="h-12 w-auto max-w-full" />
      </div>
      <div
        className="flex items-center justify-center rounded-md border border-ink-border p-6"
        style={{ background: "#FFFFFF", color: "#10131C" }}
      >
        <ForsLockup {...args} className="h-12 w-auto max-w-full" />
      </div>
    </div>
  ),
};

export const InAHeader: Story = {
  name: "In a header",
  render: (args) => (
    <header className="flex items-center justify-between gap-3 rounded-md border border-ink-border bg-ink-surface px-4 py-3">
      <a
        href="#home"
        className="flex items-center gap-2 rounded-sm text-fg focus-visible:outline-hidden focus-visible:shadow-focus-ring"
      >
        <ForsMonogram {...args} decorative className="h-7 w-auto" />
        <span className="font-heading text-sm font-semibold">Fors Corp</span>
      </a>
      <span className="text-sm text-fg-muted">Dashboard</span>
    </header>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-end gap-6 text-fg">
      {[16, 24, 32, 48].map((h) => (
        <ForsMonogram key={h} {...args} height={h} />
      ))}
      <ForsLockup {...args} height={32} />
    </div>
  ),
};
