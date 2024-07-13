import type { Meta, StoryObj } from '@storybook/react';
import { themeWrapper } from "@/utils/storybook/themeWrapper";
import { HeaderStory } from "@/stories/components/composite/header/HeaderStory";

const meta = {
  title: 'Components/Composite/Header',
  component: themeWrapper(HeaderStory),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HeaderStory>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Header: StoryType = {};
