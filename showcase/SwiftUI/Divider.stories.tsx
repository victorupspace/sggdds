import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Divider',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
      <Showcase platform="SwiftUI" language="Swift" code={`DSDivider(thickness: .sm, tone: .subtle)
  DSDivider(thickness: .md, tone: .default)
  DSDivider(thickness: .lg, tone: .strong)`}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Divider thickness="sm" tone="subtle" />
            <Divider thickness="md" tone="default" />
            <Divider thickness="lg" tone="strong" />
          </div>
      </Showcase>
  ),
};
