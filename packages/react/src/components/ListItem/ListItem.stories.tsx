import type { Meta, StoryObj } from '@storybook/react-vite';

import { ListItem } from './ListItem';
import './ListItem.stories.css';
import type { ListItemDensity, ListItemLine, ListItemRadius } from './ListItem.types';

const densities: ListItemDensity[] = ['comfortable', 'compact'];
const lines: ListItemLine[] = ['one-line', 'two-line'];
const radii: ListItemRadius[] = ['none', 'sm', 'md'];

function UserIcon() {
  return (
    <span className="list-item-story-icon">
      <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.8 16c.8-2.5 2.6-4 5.2-4s4.4 1.5 5.2 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </svg>
    </span>
  );
}

function StoryTabs({ active = 'one-line' }: { active?: ListItemLine }) {
  return (
    <div className="list-item-story-tabs" aria-label="Exemplos de listas">
      <button
        className={[
          'list-item-story-tab',
          active === 'one-line' ? 'list-item-story-tab--active' : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
        type="button"
      >
        One-line list
      </button>
      <button
        className={[
          'list-item-story-tab',
          active === 'two-line' ? 'list-item-story-tab--active' : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
        type="button"
      >
        Two-line list
      </button>
    </div>
  );
}

const meta = {
  title: 'Web Components/ListItem',
  component: ListItem,
  parameters: {
    componentCanvas: {
      width: 720,
    },
    docs: {
      description: {
        component: `
List Item organiza uma unidade de informacao dentro de listas, menus, resultados, configuracoes e navegacao contextual.

Use para representar uma linha clicavel ou estatica com titulo, descricao opcional, icone lider e conteudo auxiliar no fim da linha.

Variantes:
- One-line: titulo unico para listas simples e escaneaveis.
- Two-line: titulo com supporting text para contexto adicional.
- Interactive: quando href ou onClick sao informados, o item renderiza link ou botao nativo.

Tokens:
Superficie, texto, icone, borda, radius, spacing, sizing, typography, focus ring e estados usam variaveis CSS dos tokens do Figma. A lista deve viver sobre o background oficial grey-100, usando white para a superficie do grupo.

Acessibilidade:
- O componente renderiza um li semantico.
- Links e botoes sao elementos nativos quando o item e interativo.
- Disabled remove foco de links e desabilita botoes.
- Selected expoe aria-selected quando aplicavel.
- Leading e trailing sao decorativos por padrao; use title/description para conteudo essencial.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Rotulo acessivel opcional para o controle interno.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao li.',
    },
    density: {
      control: 'select',
      description: 'Densidade vertical do item.',
      options: densities,
    },
    description: {
      control: 'text',
      description: 'Texto secundario opcional.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita interacao e aplica estado visual.',
    },
    divider: {
      control: 'boolean',
      description: 'Exibe divisor inferior.',
    },
    href: {
      control: 'text',
      description: 'Quando informado, o item renderiza um link.',
    },
    leading: {
      control: false,
      description: 'Slot visual antes do conteudo principal.',
    },
    line: {
      control: 'select',
      description: 'Forca layout one-line ou two-line.',
      options: lines,
    },
    onClick: {
      control: false,
      description: 'Quando informado sem href, o item renderiza um botao.',
    },
    radius: {
      control: 'select',
      description: 'Arredondamento do item usando tokens de border radius.',
      options: radii,
    },
    selected: {
      control: 'boolean',
      description: 'Aplica estado selecionado e aria-selected.',
    },
    title: {
      control: 'text',
      description: 'Titulo principal do item.',
    },
    trailing: {
      control: false,
      description: 'Slot visual depois do conteudo principal.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'List item',
  },
  render: (args) => (
    <div className="list-item-story-shell">
      <div className="list-item-story-panel">
        <div className="list-item-story-surface">
          <ul className="list-item-story-list">
            <ListItem {...args} />
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const OneLineList: Story = {
  args: {
    title: 'List item',
  },
  render: () => (
    <div className="list-item-story-shell">
      <div className="list-item-story-panel">
        <StoryTabs active="one-line" />
        <div className="list-item-story-surface">
          <ul className="list-item-story-list">
            <ListItem divider title="List item" />
            <ListItem divider title="List item" />
            <ListItem title="List item" />
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const TwoLineList: Story = {
  args: {
    title: 'List item title',
  },
  render: () => (
    <div className="list-item-story-shell">
      <div className="list-item-story-panel">
        <StoryTabs active="two-line" />
        <div className="list-item-story-surface">
          <ul className="list-item-story-list">
            <ListItem description="Secondary text" divider title="List item title" />
            <ListItem description="Secondary text" divider title="List item title" />
            <ListItem description="Secondary text" title="List item title" />
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const WithSlots: Story = {
  args: {
    title: 'Pessoa cadastrada',
  },
  render: () => (
    <div className="list-item-story-shell">
      <div className="list-item-story-panel">
        <div className="list-item-story-surface">
          <ul className="list-item-story-list">
            <ListItem
              description="Cadastro atualizado ha pouco"
              divider
              leading={<UserIcon />}
              onClick={() => undefined}
              radius="sm"
              title="Pessoa cadastrada"
              trailing={<span className="list-item-story-meta">Hoje</span>}
            />
            <ListItem
              description="Item selecionado"
              divider
              leading={<UserIcon />}
              radius="sm"
              selected
              title="Selecionado"
            />
            <ListItem
              description="Sem permissao para abrir"
              disabled
              leading={<UserIcon />}
              onClick={() => undefined}
              radius="sm"
              title="Desabilitado"
            />
          </ul>
        </div>
      </div>
    </div>
  ),
};

export const LinkItem: Story = {
  args: {
    description: 'Abre a pagina de detalhes',
    href: '#',
    leading: <UserIcon />,
    radius: 'sm',
    title: 'List item como link',
  },
  render: (args) => (
    <div className="list-item-story-shell">
      <div className="list-item-story-panel">
        <div className="list-item-story-surface">
          <ul className="list-item-story-list">
            <ListItem {...args} />
          </ul>
        </div>
      </div>
    </div>
  ),
};
