import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Web Components/Radio',
  component: Radio,
  parameters: {
    componentCanvas: {
      width: 520,
    },
    docs: {
      description: {
        component: `
Radio e RadioGroup permitem selecionar uma unica opcao dentro de um grupo.

Layout reproduzido do Figma Web Components (node 12:2511) com os atomicos RadioButton Unselected/Selected e .Radio Control.

Anatomia:
- Input nativo type="radio" visualmente oculto.
- Controle de 24px com os vetores exatos do Figma: circle (nao selecionado, preto) e radio_button_checked (selecionado, azul color/icons/information/default).
- Ripple de 32px atras do controle nos estados hover (color/neutral-alpha/4%) e pressed (color/neutral-alpha/8%).
- Focus ring duplo (branco 84% + azul #2c84d0) no foco por teclado.
- Label obrigatoria (Label/Medium, Plus Jakarta Sans Medium 14, typography/primary).
- Hint opcional (Regular 10, color/icons/neutral/black) associada por aria-describedby.
- Gap de 6px (Component sizing/6) entre controle e conteudo.
- RadioGroup envolve os itens em fieldset e gerencia estado e navegacao por teclado.

Estados (prop state do Figma):
- Enabled/Hover/Pressed/Focused: controle interativo com ripple e focus ring.
- Disabled: circulo, label e hint em typography/disabled (#737373), sem interacao.
- Read Only: exibe apenas label e hint (hint em typography/disabled), sem o controle visivel, como no Figma.

Use quando a pessoa deve escolher exatamente uma opcao entre duas ou mais alternativas mutuamente exclusivas.

Nao use quando multiplas selecoes forem permitidas (use Checkbox) ou quando houver apenas uma opcao (use Checkbox ou Toggle).

Orientacao:
- vertical (padrao): itens empilhados, recomendado para listas longas ou com hints.
- horizontal: itens lado a lado, recomendado para grupos curtos; quebra linha automaticamente em telas estreitas.

Navegacao por teclado:
- Tab move o foco para o grupo.
- ArrowUp / ArrowDown (vertical) ou ArrowLeft / ArrowRight (horizontal) movem entre opcoes e selecionam.
`,
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

function VerticalExample() {
  const [value, setValue] = useState('option-a');

  return (
    <RadioGroup
      label="Selecione uma opcao"
      name="example-vertical"
      onChange={setValue}
      value={value}
    >
      <Radio label="Radio Label" value="option-a" />
      <Radio label="Radio Label" value="option-b" />
      <Radio label="Radio Label" value="option-c" />
    </RadioGroup>
  );
}

function WithHintExample() {
  const [value, setValue] = useState('option-a');

  return (
    <RadioGroup label="Selecione uma opcao" name="example-hint" onChange={setValue} value={value}>
      <Radio hint="Hint goes here" label="Radio Label" value="option-a" />
      <Radio hint="Hint goes here" label="Radio Label" value="option-b" />
    </RadioGroup>
  );
}

function HorizontalExample() {
  const [value, setValue] = useState('sim');

  return (
    <RadioGroup
      label="Voce confirma?"
      name="example-horizontal"
      onChange={setValue}
      orientation="horizontal"
      value={value}
    >
      <Radio label="Sim" value="sim" />
      <Radio label="Nao" value="nao" />
      <Radio label="Talvez" value="talvez" />
    </RadioGroup>
  );
}

function WithDisabledExample() {
  const [value, setValue] = useState('premium');

  return (
    <RadioGroup label="Plano de acesso" name="example-disabled" onChange={setValue} value={value}>
      <Radio label="Basico" value="basico" />
      <Radio disabled label="Intermediario" value="intermediario" />
      <Radio
        disabled
        hint="Disponivel apenas para contas verificadas."
        label="Premium"
        value="premium"
      />
    </RadioGroup>
  );
}

function ReadOnlyExample() {
  const [value, setValue] = useState('aprovado');

  return (
    <RadioGroup label="Situacao" name="example-readonly" onChange={setValue} value={value}>
      <Radio hint="Hint goes here" label="Radio Label" readOnly value="aprovado" />
    </RadioGroup>
  );
}

export const Vertical: Story = {
  args: { label: 'Radio Label', value: 'option-a' },
  render: () => <VerticalExample />,
};

export const WithHint: Story = {
  args: { label: 'Radio Label', value: 'option-a' },
  render: () => <WithHintExample />,
};

export const Horizontal: Story = {
  args: { label: 'Sim', value: 'sim' },
  parameters: {
    componentCanvas: { width: 520 },
  },
  render: () => <HorizontalExample />,
};

export const WithDisabled: Story = {
  args: { label: 'Basico', value: 'basico' },
  render: () => <WithDisabledExample />,
};

export const ReadOnly: Story = {
  args: { label: 'Radio Label', value: 'aprovado' },
  parameters: {
    docs: {
      description: {
        story:
          'No Figma, o estado Read Only exibe apenas label e hint, sem o controle visivel. O input permanece no DOM para leitores de tela, mas a selecao nao pode ser alterada.',
      },
    },
  },
  render: () => <ReadOnlyExample />,
};

export const Accessibility: Story = {
  args: { label: 'Radio Label', value: 'option-a' },
  parameters: {
    docs: {
      description: {
        story:
          'Tab move o foco para o grupo. ArrowUp/ArrowDown navegam entre opcoes e selecionam automaticamente. Input nativo preserva comportamento com leitores de tela.',
      },
    },
  },
  render: () => <VerticalExample />,
};
