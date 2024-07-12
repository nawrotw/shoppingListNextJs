import type { Meta, StoryObj } from '@storybook/react';
import { LinkButtonsStory } from "./LinkButtonsStory";
import { themeWrapper } from "@/utils/storybook/themeWrapper";

const meta = {
  title: 'Components/Base/LinkButton',
  component: themeWrapper(LinkButtonsStory),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LinkButtonsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinkButton: Story = {};
