import type { Meta, StoryObj } from '@storybook/react-vite';

import { Chip } from './Chip';
import './Chip.stories.css';

function FilterIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 3v10M3 8h10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

const noop = () => undefined;

const meta = {
  title: 'Web Components/Chip',
  component: Chip,
  parameters: {
    componentCanvas: {
      width: 640,
    },
    docs: {
      description: {
        component: `
Chip representa uma informacao discreta adicionada a um campo, como filtro, busca, entidade ou tag selecionada.

Use quando a pessoa precisa ver os filtros aplicados e remover cada entrada rapidamente. Nao use Chip como badge de status passivo, CTA primario ou item de navegacao; nesses casos use Badge, Button ou Link.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, adaptando espacamentos, largura, quebra de conteudo e area de toque para diferentes tamanhos de tela. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook. Em telas pequenas, o chip medium aumenta a area de toque do botao de remocao e mantem o label truncado para evitar overflow horizontal.

Tokens:
Cores, superficie, borda, radius, espacamento, tipografia, foco e estados usam variaveis CSS geradas pelos tokens do Figma. O estado selecionado usa tokens de informacao/identidade disponiveis na base atual.

Acessibilidade:
- O botao de remocao esta sempre presente.
- O removeLabel permite nome acessivel especifico por item.
- Estado disabled usa disabled nativo no botao e aria-disabled no container.
- O foco visivel fica no controle de remocao, que e a acao interativa real.
- O componente nao depende apenas de cor; a acao de remover tem icone e nome acessivel.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Conteudo textual do chip.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao chip.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita a remocao e aplica estado visual desabilitado.',
    },
    icon: {
      control: false,
      description: 'Icone opcional antes do label.',
    },
    onRemove: {
      control: false,
      description: 'Callback chamado ao acionar o botao de remocao.',
    },
    removeLabel: {
      control: 'text',
      description: 'Nome acessivel do botao de remocao.',
    },
    selected: {
      control: 'boolean',
      description: 'Aplica destaque visual para filtro ativo/selecionado.',
    },
    size: {
      control: 'select',
      description: 'Densidade do chip.',
      options: ['small', 'medium'],
    },
    variant: {
      control: 'select',
      description: 'Tom visual do chip.',
      options: ['neutral', 'brand'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
    icon: <FilterIcon />,
    onRemove: noop,
    size: 'small',
  },
  render: (args) => (
    <div className="chip-story-surface">
      <div className="chip-story-panel">
        <Chip {...args} />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Label',
    onRemove: noop,
  },
  render: () => (
    <div className="chip-story-surface">
      <div className="chip-story-panel">
        <Chip icon={<FilterIcon />} onRemove={noop} size="small">
          Label
        </Chip>
        <Chip icon={<FilterIcon />} onRemove={noop} size="medium">
          Label
        </Chip>
      </div>
    </div>
  ),
};

export const States: Story = {
  args: {
    children: 'Label',
  },
  render: () => (
    <div className="chip-story-surface">
      <div className="chip-story-panel chip-story-stack">
        <Chip icon={<FilterIcon />} onRemove={noop}>
          Default
        </Chip>
        <Chip icon={<FilterIcon />} onRemove={noop} selected>
          Selected
        </Chip>
        <Chip disabled icon={<FilterIcon />} onRemove={noop}>
          Disabled
        </Chip>
      </div>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    children: 'Filtro aplicado com um nome muito longo para validar truncamento',
    icon: <FilterIcon />,
    onRemove: noop,
    removeLabel: 'Remover filtro aplicado com nome longo',
  },
  render: (args) => (
    <div className="chip-story-surface">
      <div className="chip-story-panel">
        <Chip {...args} />
      </div>
    </div>
  ),
};

export const MobileResponsive: Story = {
  args: {
    children: 'Filtro aplicado',
    icon: <FilterIcon />,
    onRemove: noop,
    size: 'medium',
  },
  parameters: {
    componentCanvas: {
      width: 320,
    },
  },
  render: (args) => (
    <div className="chip-story-surface">
      <div className="chip-story-panel">
        <Chip {...args} />
      </div>
    </div>
  ),
};
