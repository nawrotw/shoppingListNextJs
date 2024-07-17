import type { Meta, StoryObj } from '@storybook/react';
import { IconsStory } from "./IconsStory";
import { themeWrapper } from "@/utils/storybook/themeWrapper";

const meta = {
  title: 'Components/Base/Icons',
  component: themeWrapper(IconsStory),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof IconsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Icons: Story = {};
