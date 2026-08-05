import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from './ProgressBar';
import './ProgressBar.stories.css';
import type { ProgressBarVariant } from './ProgressBar.types';

const variants: ProgressBarVariant[] = ['default', 'success', 'error', 'information', 'warning'];

const meta = {
  title: 'Web Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    componentCanvas: {
      width: 560,
    },
    docs: {
      description: {
        component: `
Progress Bar comunica o status de um processo em andamento, seja como valor mensuravel ou como indicacao de que uma tarefa esta acontecendo.

Layout reproduzido do Figma Web Components (nodes 95:23725, 40000030:6873 e 40000030:6888), incluindo os atomos Range e Progress Line.

Anatomia:
- Top content opcional com Label (Title/Small, Plus Jakarta Sans SemiBold 16) e porcentagem (Label/Large, Medium 16).
- Progress Line com track de 8px (color/background/neutral/default-hover) e Range preenchido conforme o valor, ambos com border/radius/radius-full.
- Helper text opcional (Label/Medium, Medium 14).

Variantes (prop style do Figma):
- Default: Range em color/background/neutral/soft-black e textos em typography/primary.
- Success: Range em color/background/sucess/default; label e helper text verdes.
- Error: Range em color/background/danger/default; label e helper text vermelhos.
- Information: Range em color/background/information/default; textos em typography/primary.
- Warning: Range em color/background/warning/default; textos em typography/primary.

Comportamento:
- Determinate usa value, min e max para calcular a largura do Range e expor aria-valuenow.
- Indeterminate reproduz a variante Indeterminate do Progress Line: pilula de 40% da largura em movimento continuo, sem aria-valuenow.
- Top content, porcentagem e helper text sao opcionais, como as props booleanas do componente no Figma.

Tokens:
Track, Range, radius, spacing e typography usam as mesmas variables do Figma (progress/track, progress/indicator, color/background/*, spacing/6, border/radius/radius-full).

Responsividade:
A barra e fluida e ocupa 100% do container; o label quebra linha quando necessario e a porcentagem permanece alinhada a direita.

Acessibilidade:
- Usa role="progressbar" com aria-valuenow/min/max no modo determinate.
- Associa label e helper text por aria-labelledby e aria-describedby.
- Recebe ariaLabel quando nao ha label visual.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel usado quando nao ha label visual.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao container.',
    },
    helperText: {
      control: 'text',
      description: 'Texto auxiliar exibido abaixo da barra.',
    },
    id: {
      control: 'text',
      description: 'Id base usado para associacoes acessiveis.',
    },
    label: {
      control: 'text',
      description: 'Rotulo do progresso exibido no top content.',
    },
    max: {
      control: 'number',
      description: 'Valor maximo do intervalo.',
    },
    min: {
      control: 'number',
      description: 'Valor minimo do intervalo.',
    },
    mode: {
      control: 'select',
      description: 'Modo de progresso.',
      options: ['determinate', 'indeterminate'],
    },
    showValue: {
      control: 'boolean',
      description: 'Exibe ou oculta a porcentagem no top content.',
    },
    value: {
      control: { max: 100, min: 0, step: 1, type: 'range' },
      description: 'Valor atual usado no modo determinate.',
    },
    valueLabel: {
      control: 'text',
      description: 'Texto alternativo para o valor exibido e aria-valuetext.',
    },
    variant: {
      control: 'select',
      description: 'Variante visual e semantica (prop style do Figma).',
      options: variants,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    helperText: 'Helper text',
    label: 'Label',
    value: 25,
    variant: 'default',
  },
  render: (args) => (
    <div className="progress-bar-story-shell">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div className="progress-bar-story-shell">
      <div className="progress-bar-story-grid">
        <ProgressBar helperText="Helper text" label="Label" value={25} variant="default" />
        <ProgressBar helperText="Helper text" label="Label" value={100} variant="success" />
        <ProgressBar helperText="Helper text" label="Label" value={100} variant="error" />
        <ProgressBar helperText="Helper text" label="Label" value={25} variant="information" />
        <ProgressBar helperText="Helper text" label="Label" value={25} variant="warning" />
      </div>
    </div>
  ),
};

export const ProgressLine: Story = {
  render: () => (
    <div className="progress-bar-story-shell">
      <div className="progress-bar-story-grid">
        <ProgressBar ariaLabel="Progresso 0%" showValue={false} value={0} />
        <ProgressBar ariaLabel="Progresso 25%" showValue={false} value={25} />
        <ProgressBar ariaLabel="Progresso 50%" showValue={false} value={50} />
        <ProgressBar ariaLabel="Progresso 75%" showValue={false} value={75} />
        <ProgressBar ariaLabel="Progresso 100%" showValue={false} value={100} />
      </div>
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    helperText: 'Processando arquivos',
    label: 'Upload em andamento',
    mode: 'indeterminate',
  },
  render: (args) => (
    <div className="progress-bar-story-shell">
      <ProgressBar {...args} />
    </div>
  ),
};

export const WithoutTopContent: Story = {
  args: {
    ariaLabel: 'Carregamento do relatorio',
    helperText: 'Helper text',
    showValue: false,
    value: 60,
  },
  render: (args) => (
    <div className="progress-bar-story-shell">
      <ProgressBar {...args} />
    </div>
  ),
};
