import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    componentCanvas: {
      width: 520,
    },
    docs: {
      description: {
        component: `
Radio e RadioGroup permitem selecionar uma unica opcao dentro de um grupo.

Anatomia:
- Input nativo type="radio" visualmente oculto.
- Controle visual: circulo externo com ponto interno animado quando selecionado.
- Label obrigatoria.
- Description opcional associada por aria-describedby.
- RadioGroup envolve os itens em fieldset e gerencia estado e navegacao por teclado.

Use quando a pessoa deve escolher exatamente uma opcao entre duas ou mais alternativas mutuamente exclusivas.

Nao use quando multiplas selecoes forem permitidas (use Checkbox) ou quando houver apenas uma opcao (use Checkbox ou Toggle).

Orientacao:
- vertical (padrao): itens empilhados, recomendado para listas longas ou com descriptions.
- horizontal: itens lado a lado, recomendado para grupos curtos (2 a 3 opcoes). Em mobile volta automaticamente para vertical.

Navegacao por teclado:
- Tab move o foco para o grupo.
- ArrowUp / ArrowDown (vertical) ou ArrowLeft / ArrowRight (horizontal) movem entre opcoes e selecionam.

Estados:
- Unselected: circulo vazio com borda.
- Selected: circulo com ponto interno animado.
- Disabled: borda e fundo em tons neutros.
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
    <RadioGroup label="Selecione uma opcao" name="example-vertical" onChange={setValue} value={value}>
      <Radio description="Descricao complementar da opcao A." label="Opcao A" value="option-a" />
      <Radio description="Descricao complementar da opcao B." label="Opcao B" value="option-b" />
      <Radio description="Descricao complementar da opcao C." label="Opcao C" value="option-c" />
    </RadioGroup>
  );
}

function HorizontalExample() {
  const [value, setValue] = useState('sim');

  return (
    <RadioGroup label="Voce confirma?" name="example-horizontal" onChange={setValue} orientation="horizontal" value={value}>
      <Radio label="Sim" value="sim" />
      <Radio label="Nao" value="nao" />
      <Radio label="Talvez" value="talvez" />
    </RadioGroup>
  );
}

function WithDisabledExample() {
  const [value, setValue] = useState('basico');

  return (
    <RadioGroup label="Plano de acesso" name="example-disabled" onChange={setValue} value={value}>
      <Radio label="Basico" value="basico" />
      <Radio label="Intermediario" value="intermediario" />
      <Radio description="Disponivel apenas para contas verificadas." disabled label="Premium" value="premium" />
    </RadioGroup>
  );
}

function WithoutDescriptionExample() {
  const [value, setValue] = useState('masculino');

  return (
    <RadioGroup label="Genero" name="example-no-desc" onChange={setValue} value={value}>
      <Radio label="Masculino" value="masculino" />
      <Radio label="Feminino" value="feminino" />
      <Radio label="Nao binario" value="nao-binario" />
      <Radio label="Prefiro nao informar" value="nao-informar" />
    </RadioGroup>
  );
}

export const Vertical: Story = {
  args: { label: 'Opcao A', value: 'option-a' },
  render: () => <VerticalExample />,
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

export const WithoutDescription: Story = {
  args: { label: 'Masculino', value: 'masculino' },
  render: () => <WithoutDescriptionExample />,
};

export const Accessibility: Story = {
  args: { label: 'Opcao A', value: 'option-a' },
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
