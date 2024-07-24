import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxStory } from "./CheckboxStory";
import { themeWrapper } from "@/utils/storybook/themeWrapper";

const meta = {
  title: 'Components/Base/Checkbox',
  component: themeWrapper(CheckboxStory),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CheckboxStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {};
