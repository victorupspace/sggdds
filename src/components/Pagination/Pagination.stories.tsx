import type { Meta, StoryObj } from '@storybook/react-vite';

import { Pagination } from './Pagination';
import './Pagination.stories.css';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    componentCanvas: {
      width: 900,
    },
    docs: {
      description: {
        component: `
Pagination organiza listas longas ou datasets em paginas numeradas e oferece controles para navegar sequencialmente ou saltar diretamente para uma pagina.

Use quando a quantidade de resultados excede o espaco util da tela e a pessoa precisa manter contexto de posicao, quantidade e navegacao. Nao use para fluxos lineares de progresso; nesse caso use Stepper.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, adaptando espacamentos, alinhamento, largura, quebra de conteudo e areas de toque para diferentes tamanhos de tela. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook. Em telas pequenas, os metadados reorganizam em coluna e a navegacao numerica vira uma experiencia compacta com pagina atual, anterior, proxima e select nativo para salto direto, sem gerar overflow horizontal.

Tokens:
Cores, foco, espacamento, bordas, radius, iconografia e tipografia usam variaveis CSS geradas pelos tokens do Figma. O estado selecionado usa soft black, seguindo o padrao atual de acoes primarias do DS.

Acessibilidade:
- Renderiza nav com aria-label.
- A pagina atual usa aria-current="page".
- Controles indisponiveis usam disabled nativo.
- Controles de primeira, anterior, proxima e ultima pagina possuem aria-label.
- Selects nativos sao usados para resultados por pagina e salto direto de pagina quando habilitados.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    boundaryCount: {
      control: 'number',
      description: 'Quantidade de paginas fixas no inicio e no fim da faixa.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita navegacao e selects.',
    },
    labels: {
      control: 'object',
      description: 'Rotulos acessiveis e textos exibidos.',
    },
    onPageChange: {
      control: false,
      description: 'Callback chamado ao solicitar mudanca de pagina.',
    },
    onPageSizeChange: {
      control: false,
      description: 'Callback chamado ao mudar resultados por pagina.',
    },
    page: {
      control: 'number',
      description: 'Pagina atual.',
    },
    pageSize: {
      control: 'number',
      description: 'Quantidade de itens por pagina.',
    },
    pageSizeOptions: {
      control: 'object',
      description: 'Opcoes do seletor de resultados por pagina.',
    },
    showFirstLast: {
      control: 'boolean',
      description: 'Exibe controles de primeira e ultima pagina.',
    },
    showPageSelect: {
      control: 'boolean',
      description: 'Exibe seletor para salto direto de pagina.',
    },
    showPageSize: {
      control: 'boolean',
      description: 'Exibe seletor de resultados por pagina.',
    },
    showRange: {
      control: 'boolean',
      description: 'Exibe faixa atual de resultados.',
    },
    siblingCount: {
      control: 'number',
      description: 'Quantidade de paginas ao redor da pagina atual.',
    },
    totalItems: {
      control: 'number',
      description: 'Total de itens usado para range e calculo de paginas.',
    },
    totalPages: {
      control: 'number',
      description: 'Total de paginas quando ja calculado pelo consumidor.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: 1,
    totalPages: 10,
  },
  render: (args) => (
    <div className="pagination-story-surface">
      <div className="pagination-story-panel">
        <Pagination {...args} />
      </div>
    </div>
  ),
};

export const WithMetadata: Story = {
  args: {
    page: 1,
    pageSize: 20,
    showPageSelect: true,
    showPageSize: true,
    showRange: true,
    totalItems: 100,
  },
  render: (args) => (
    <div className="pagination-story-surface">
      <div className="pagination-story-panel">
        <Pagination {...args} />
      </div>
    </div>
  ),
};

export const MiddlePage: Story = {
  args: {
    page: 6,
    siblingCount: 1,
    totalPages: 24,
  },
  render: (args) => (
    <div className="pagination-story-surface">
      <div className="pagination-story-panel">
        <Pagination {...args} />
      </div>
    </div>
  ),
};

export const States: Story = {
  args: {
    page: 1,
    totalPages: 10,
  },
  render: () => (
    <div className="pagination-story-surface">
      <div className="pagination-story-panel pagination-story-stack">
        <Pagination page={1} totalPages={10} />
        <Pagination page={5} totalPages={10} />
        <Pagination disabled page={5} totalPages={10} />
      </div>
    </div>
  ),
};

export const MobileResponsive: Story = {
  args: {
    page: 6,
    pageSize: 20,
    showPageSelect: true,
    showPageSize: true,
    showRange: true,
    totalItems: 240,
  },
  parameters: {
    componentCanvas: {
      width: 320,
    },
  },
  render: (args) => (
    <div className="pagination-story-surface">
      <div className="pagination-story-panel">
        <Pagination {...args} />
      </div>
    </div>
  ),
};
