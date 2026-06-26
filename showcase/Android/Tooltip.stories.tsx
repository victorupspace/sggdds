import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'Android/Tooltip',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
      <Showcase platform="Android" language="Kotlin" code={`DSTooltip(anchor, "Texto de ajuda", DSTooltip.Tone.DARK).show()`}>
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
