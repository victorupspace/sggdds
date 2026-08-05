import type { Meta, StoryObj } from '@storybook/react-vite';

import { Spinner } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Spinner',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={`DSSpinner(size: .sm)
  DSSpinner(size: .md)
  DSSpinner(size: .lg, label: "Carregando")`}
    >
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" label="Carregando" showLabel />
      </div>
    </Showcase>
  ),
};
