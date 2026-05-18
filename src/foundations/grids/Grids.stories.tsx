import type { Meta, StoryObj } from '@storybook/react-vite';

import { GridsPage } from './grids.docs';

const meta = {
  title: 'Foundations/Grids',
  component: GridsPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GridsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Page: Story = {};
