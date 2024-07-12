import type { Meta, StoryObj } from '@storybook/react';
import { themeWrapper } from "@/utils/storybook/themeWrapper";
import { CaptionCardStory } from "@/stories/components/base/card/CaptionCardStory";

const meta = {
  title: 'Components/Base/Card',
  component: themeWrapper(CaptionCardStory),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof CaptionCardStory>;

export default meta;
type StoryType = StoryObj<typeof meta>;

export const Card: StoryType = {};
