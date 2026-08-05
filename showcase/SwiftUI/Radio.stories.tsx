import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Radio, RadioGroup } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'SwiftUI/Radio',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

function Demo() {
  const [value, setValue] = useState('a');
  return (
    <Showcase
      platform="SwiftUI"
      language="Swift"
      code={`DSRadioGroup(selection: $value, options: [
      .init(value: "a", label: "Opção A"),
      .init(value: "b", label: "Opção B", description: "Com descrição"),
      .init(value: "c", label: "Opção C", isDisabled: true),
  ], label: "Escolha uma opção")`}
    >
      <RadioGroup name="demo" value={value} onChange={setValue} label="Escolha uma opção">
        <Radio value="a" label="Opção A" />
        <Radio value="b" label="Opção B" description="Com descrição" />
        <Radio value="c" label="Opção C" disabled />
      </RadioGroup>
    </Showcase>
  );
}

export const Overview: Story = {
  render: () => <Demo />,
};
