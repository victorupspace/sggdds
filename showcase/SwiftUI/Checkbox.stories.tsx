import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Checkbox',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={`DSCheckbox("Aceito os termos", isChecked: $accepted)
  DSCheckbox("Receber novidades", isChecked: $news,
             hint: "Você pode cancelar a qualquer momento")
  DSCheckbox("Indeterminado", isChecked: $partial, isIndeterminate: true)`}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Checkbox label="Aceito os termos" defaultChecked />
        <Checkbox label="Receber novidades" hint="Você pode cancelar a qualquer momento" />
        <Checkbox label="Indeterminado" indeterminate />
        <Checkbox label="Desabilitado" disabled />
      </div>
    </Showcase>
  ),
};
