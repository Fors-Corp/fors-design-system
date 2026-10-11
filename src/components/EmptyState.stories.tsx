import type { Meta, StoryObj } from "@storybook/react";
import { IconPackage, IconSearch } from "../icons";
import { Button } from "./Button";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Fors/Data Display/EmptyState",
  component: EmptyState,
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: <IconPackage size={24} />,
    title: "No products yet",
    description: "Products you add to the catalogue show up here.",
    action: <Button>Add a product</Button>,
  },
};

export const TitleOnly: Story = {
  args: { title: "Nothing to review" },
};

export const NoResults: Story = {
  args: {
    icon: <IconSearch size={24} />,
    title: "No results for “linen”",
    description: "Check the spelling or try a broader term.",
    action: <Button variant="secondary">Clear filters</Button>,
  },
};

export const InsideACard: Story = {
  render: () => (
    <div className="max-w-sm rounded-lg border border-ink-border bg-ink-surface">
      <EmptyState
        titleAs="h3"
        icon={<IconPackage size={24} />}
        title="No orders this week"
        description="Orders appear here as soon as a customer checks out."
        action={
          <>
            <Button variant="secondary">Share the store</Button>
            <Button variant="ghost">Learn more</Button>
          </>
        }
      />
    </div>
  ),
};
