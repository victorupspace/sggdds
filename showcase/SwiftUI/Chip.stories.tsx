import type { Meta, StoryObj } from '@storybook/react-vite';

import { Chip } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Chip',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={`DSChip("Neutral")
  DSChip("Selecionado", variant: .brand, isSelected: true)
  DSChip("Removível", onRemove: { })`}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Chip>Neutral</Chip>
        <Chip variant="brand" selected>
          Selecionado
        </Chip>
        <Chip size="small">Pequeno</Chip>
        <Chip onRemove={() => undefined}>Removível</Chip>
        <Chip disabled>Desabilitado</Chip>
      </div>
    </Showcase>
  ),
};
