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
      code={`DSChip("Support")
  DSChip("Selecionado", variant: .information, isSelected: true)
  DSChip("Success", variant: .success)`}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Chip showLeadingIcon>Support</Chip>
        <Chip selected showLeadingIcon variant="information">
          Selecionado
        </Chip>
        <Chip showLeadingIcon variant="success">
          Success
        </Chip>
        <Chip showLeadingIcon variant="danger">
          Danger
        </Chip>
        <Chip disabled showLeadingIcon>
          Desabilitado
        </Chip>
      </div>
    </Showcase>
  ),
};
