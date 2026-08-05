import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Tooltip',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={`DSTooltip("Texto de ajuda", tone: .dark) {
      Image(systemName: "questionmark.circle")
  }`}
    >
      <div style={{ padding: 40 }}>
        <Tooltip content="Texto de ajuda" defaultOpen>
          <button
            type="button"
            style={{
              border: '1px solid var(--ds-semantic-color-border-neutral-default)',
              background: 'var(--ds-semantic-color-background-neutral-default)',
              borderRadius: 8,
              padding: '8px 12px',
              cursor: 'pointer',
            }}
          >
            Ajuda
          </button>
        </Tooltip>
      </div>
    </Showcase>
  ),
};
