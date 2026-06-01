import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from './ProgressBar';
import './ProgressBar.stories.css';
import type { ProgressBarVariant } from './ProgressBar.types';

const variants: ProgressBarVariant[] = ['brand', 'neutral', 'success', 'error'];

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

Use para progresso de upload, etapas de processamento, carregamentos com duracao estimada e feedback de sucesso ou erro associado a uma acao.

Nao use Progress Bar para mensagens independentes, estados que exigem acao imediata ou feedback temporario sem progresso. Nesses casos, use Alert, Toast ou Modal conforme o contexto.

Variantes:
- Brand: progresso padrao usando o token de identidade disponivel.
- Neutral: progresso sem enfase semantica.
- Success: conclusao ou estado positivo.
- Error: falha ou estado negativo.

Comportamento:
- Determinate usa value, min e max para calcular a largura da barra e expor aria-valuenow.
- Indeterminate remove aria-valuenow e exibe movimento continuo para processos sem duracao estimada.
- Label, helper text, value label e icone sao opcionais.

Tokens:
Cores, track, foreground, icon, radius, spacing, sizing e typography usam variaveis CSS dos tokens importados do Figma. O destaque brand utiliza o token de identidade publicado no projeto para evitar valores hardcoded.

Acessibilidade:
- Usa role="progressbar".
- Associa label e helper text por aria-labelledby e aria-describedby.
- Recebe ariaLabel quando nao ha label visual.
- Icones sao decorativos e nao substituem o texto do estado.
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
    barClassName: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao track.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao container.',
    },
    helperText: {
      control: 'text',
      description: 'Texto auxiliar ou mensagem de status exibida abaixo da barra.',
    },
    icon: {
      control: false,
      description: 'Icone customizado opcional exibido no canto direito.',
    },
    id: {
      control: 'text',
      description: 'Id base usado para associacoes acessiveis.',
    },
    label: {
      control: 'text',
      description: 'Rotulo do progresso.',
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
    showIcon: {
      control: 'boolean',
      description: 'Exibe o icone de estado padrao ou o icone customizado.',
    },
    showValue: {
      control: 'boolean',
      description: 'Exibe ou oculta o valor textual.',
    },
    size: {
      control: 'select',
      description: 'Tamanho visual da barra.',
      options: ['sm', 'md'],
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
      description: 'Variante visual e semantica.',
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
    variant: 'brand',
  },
  render: (args) => (
    <div className="progress-bar-story-shell">
      <ProgressBar {...args} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="progress-bar-story-shell">
      <div className="progress-bar-story-grid">
        <ProgressBar helperText="Helper text" label="Label" value={25} variant="brand" />
        <ProgressBar
          helperText="Success message"
          label="Label"
          showIcon
          showValue={false}
          value={100}
          variant="success"
        />
        <ProgressBar
          helperText="Error message"
          label="Label"
          showIcon
          showValue={false}
          value={100}
          variant="error"
        />
      </div>
    </div>
  ),
};

export const Indeterminate: Story = {
  args: {
    helperText: 'Processando arquivos',
    label: 'Upload em andamento',
    mode: 'indeterminate',
    showValue: false,
    variant: 'brand',
  },
  render: (args) => (
    <div className="progress-bar-story-shell">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="progress-bar-story-shell">
      <div className="progress-bar-story-compact">
        <ProgressBar helperText="Helper text" label="Label" size="sm" value={25} />
        <ProgressBar helperText="Success message" label="Label" showIcon size="sm" value={100} variant="success" />
        <ProgressBar helperText="Error message" label="Label" showIcon size="sm" value={100} variant="error" />
      </div>
    </div>
  ),
};

export const WithoutText: Story = {
  args: {
    ariaLabel: 'Carregamento do relatorio',
    showValue: false,
    value: 60,
  },
  render: (args) => (
    <div className="progress-bar-story-shell">
      <ProgressBar {...args} />
    </div>
  ),
};
