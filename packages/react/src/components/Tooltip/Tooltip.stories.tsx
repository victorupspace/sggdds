import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from './Tooltip';
import './Tooltip.stories.css';

function InfoIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9v5M10 6v.1" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

const meta = {
  title: 'Web Components/Tooltip',
  component: Tooltip,
  parameters: {
    componentCanvas: {
      width: 560,
    },
    docs: {
      description: {
        component: `
Tooltip exibe microcopy nao essencial que rotula ou descreve brevemente um elemento interativo. Ele abre apenas por hover com dispositivo apontador ou foco via teclado.

Use para complementar botoes iconicos, controles compactos e comandos cujo label visual precisa de apoio breve.

Nao use Tooltip para conteudo essencial, mensagens de erro, confirmacoes, instrucoes longas, conteudo interativo ou informacao que precisa estar sempre visivel. Em mobile/touch, prefira texto persistente quando a informacao for necessaria para concluir a tarefa.

Comportamento:
- Injeta aria-describedby no elemento filho enquanto aberto.
- Abre por hover e foco.
- Fecha por mouseleave, blur ou Escape.
- Suporta delay de abertura e fechamento.
- Suporta posicionamentos top, right, bottom e left.

Tokens:
Surface, foreground, radius, spacing, typography, seta e sombra usam variaveis CSS dos tokens disponiveis. Como ainda nao ha token dedicado de shadow publicado, a sombra usa cores alpha e dimensoes tokenizadas.

Acessibilidade:
- O elemento flutuante usa role="tooltip".
- O trigger precisa ser focavel/interativo.
- Tooltip nao recebe foco e nao contem acoes.
- O texto deve ser curto, idealmente uma frase pequena.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: false,
      description: 'Elemento interativo que aciona o tooltip.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao wrapper.',
    },
    closeDelay: {
      control: 'number',
      description: 'Delay em ms antes de fechar.',
    },
    content: {
      control: 'text',
      description: 'Microcopy exibida no tooltip.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Estado inicial no modo nao controlado, util para documentacao.',
    },
    delayDuration: {
      control: 'number',
      description: 'Delay em ms antes de abrir.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita abertura e aria-describedby.',
    },
    id: {
      control: 'text',
      description: 'ID opcional do tooltip.',
    },
    isOpen: {
      control: false,
      description: 'Controla abertura externamente.',
    },
    onOpenChange: {
      control: false,
      description: 'Callback chamado quando o componente solicita mudanca de abertura.',
    },
    placement: {
      control: 'select',
      description: 'Posicao do tooltip em relacao ao trigger.',
      options: ['top', 'right', 'bottom', 'left'],
    },
    tone: {
      control: 'select',
      description: 'Tom visual do tooltip.',
      options: ['dark', 'light'],
    },
    tooltipClassName: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao bubble.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <button className="tooltip-story-button" type="button">
        Hover or focus
      </button>
    ),
    content: 'Label',
    defaultOpen: true,
    delayDuration: 0,
    placement: 'top',
    tone: 'dark',
  },
  render: (args) => (
    <div className="tooltip-story-shell">
      <div className="tooltip-story-panel">
        <Tooltip {...args} />
      </div>
    </div>
  ),
};

export const Light: Story = {
  args: {
    children: (
      <button className="tooltip-story-button" type="button">
        Hover or focus
      </button>
    ),
    content: 'Label',
    defaultOpen: true,
    delayDuration: 0,
    placement: 'top',
    tone: 'light',
  },
  render: (args) => (
    <div className="tooltip-story-shell">
      <div className="tooltip-story-panel">
        <Tooltip {...args} />
      </div>
    </div>
  ),
};

export const Placements: Story = {
  args: {
    children: (
      <button className="tooltip-story-button" type="button">
        Hover or focus
      </button>
    ),
    content: 'Label',
    defaultOpen: true,
    delayDuration: 0,
  },
  render: () => (
    <div className="tooltip-story-shell">
      <div className="tooltip-story-grid">
        {(['top', 'right', 'bottom', 'left'] as const).map((placement) => (
          <Tooltip
            content={placement}
            defaultOpen
            delayDuration={0}
            key={placement}
            placement={placement}
          >
            <button className="tooltip-story-button" type="button">
              {placement}
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  ),
};

export const IconButton: Story = {
  args: {
    children: (
      <button aria-label="Mais informacoes" className="tooltip-story-icon-button" type="button">
        <InfoIcon />
      </button>
    ),
    content: 'Mais informacoes',
    defaultOpen: true,
    delayDuration: 0,
    placement: 'top',
  },
  render: (args) => (
    <div className="tooltip-story-shell">
      <div className="tooltip-story-panel">
        <Tooltip {...args} />
      </div>
    </div>
  ),
};

export const LongLabel: Story = {
  args: {
    children: (
      <button className="tooltip-story-button" type="button">
        Controle
      </button>
    ),
    content: 'Descricao curta para complementar o controle sem substituir o texto visivel.',
    defaultOpen: true,
    delayDuration: 0,
    placement: 'bottom',
  },
  render: (args) => (
    <div className="tooltip-story-shell">
      <div className="tooltip-story-panel">
        <Tooltip {...args} />
      </div>
    </div>
  ),
};
