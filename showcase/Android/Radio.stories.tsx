import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import { Radio, RadioGroup } from '@government/design-system';

import { Showcase } from '../native-showcase';

const meta: Meta = {
  title: 'Android/Radio',
  parameters: { layout: 'fullscreen', componentCanvas: { width: 820 } },
};
export default meta;
type Story = StoryObj;

function Demo() {
  const [value, setValue] = useState('a');
  return (
      <Showcase platform="Android" language="Kotlin" code={`val a = DSRadioButton(context).apply { value = "a"; label = "Opção A" }
  val b = DSRadioButton(context).apply { value = "b"; label = "Opção B" }
  listOf(a, b).forEach { it.onSelected = { selected -> select(selected) } }`}>
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
