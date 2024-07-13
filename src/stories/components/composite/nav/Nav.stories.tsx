import type { Meta, StoryObj } from '@storybook/react';
import { themeWrapper } from "@/utils/storybook/themeWrapper";
import { NavStory } from "@/stories/components/composite/nav/NavStory";

const meta = {
  title: 'Components/Composite/Navigation',
  component: themeWrapper(NavStory),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NavStory>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Navigation: StoryType = {};
