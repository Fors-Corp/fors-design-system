import type { Meta, StoryObj } from "@storybook/react";
import { IconPlus } from "../icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./Breadcrumb";
import { Button } from "./Button";
import { PageHeader } from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "Fors/Navigation/PageHeader",
  component: PageHeader,
  decorators: [
    (Story) => (
      <div className="p-4 sm:p-8">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

export const TitleOnly: Story = {
  args: { title: "Products" },
};

export const WithDescriptionAndActions: Story = {
  args: {
    title: "Products",
    description: "Everything in the catalogue, across all channels.",
    actions: (
      <>
        <Button variant="secondary">Import</Button>
        <Button leadingIcon={<IconPlus />}>New product</Button>
      </>
    ),
  },
};

export const WithBreadcrumb: Story = {
  args: {
    title: "Linen shirt",
    description: "SKU LS-204 · Last edited yesterday",
    breadcrumb: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Linen shirt</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
    actions: <Button variant="danger">Archive</Button>,
  },
};

export const LongTitleWrapsActions: Story = {
  args: {
    title: "Autumn collection 2026 — wholesale price list for the Nordic and Baltic markets",
    description: "Titles and translations grow the header; they never clip.",
    actions: (
      <>
        <Button variant="secondary">Duplicate</Button>
        <Button>Publish</Button>
      </>
    ),
  },
};
