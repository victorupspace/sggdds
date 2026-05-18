import type { Meta, StoryObj } from '@storybook/react-vite';

import { CoreTokensTypographyPage } from './core-tokens.docs';

const meta = {
  title: 'Foundations/Typography',
  component: CoreTokensTypographyPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CoreTokensTypographyPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page: Story = {};
