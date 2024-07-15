import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, useToaster } from "./Toaster";

const meta = {
  title: "Components/Toaster",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

const SimpleStory = () => {
  const { addToast } = useToaster();

  return (
    <button
      onClick={() => {
        addToast("This is a toast");
      }}
    >
      Render a toast
    </button>
  );
};
export const Simple = {
  args: {
    children: <SimpleStory />,
  },
};

const ConfiguredStory = () => {
  const { addToast } = useToaster();

  return (
    <button
      onClick={() => {
        addToast({ content: "This is a toast", duration: 5000 });
      }}
    >
      Render a toast
    </button>
  );
};
export const Configured = {
  args: {
    children: <ConfiguredStory />,
  },
};
