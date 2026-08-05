import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dropdown } from './Dropdown';
import './Dropdown.stories.css';

const cityOptions = [
  { value: 'sao-paulo', label: 'São Paulo' },
  { value: 'rio-de-janeiro', label: 'Rio de Janeiro' },
  { value: 'belo-horizonte', label: 'Belo Horizonte' },
  { value: 'curitiba', label: 'Curitiba' },
  { value: 'porto-alegre', label: 'Porto Alegre' },
];

const meta = {
  title: 'Web Components/Dropdown',
  component: Dropdown,
  parameters: {
    componentCanvas: {
      width: 480,
    },
    docs: {
      description: {
        component: `
O Dropdown reproduz o layout do Figma (Web Components / Dropdown): label SemiBold 14, campo de 40px com borda color/border/neutral/prominent e radius-sm, chevron de 20px e menu sobreposto com as opções.

Estados do component set:
- Default: campo com placeholder "Selecione" em typography/primary.
- Focused: borda de 2px em color/border/focus (por teclado, via focus-visible).
- Open: menu com fundo neutral/white, borda color/border/default, radius de 8px, elevação level-2 e opções com padding 12x10; a opção ativa usa color/state/hover.
- Selected: campo exibindo o valor escolhido.
- Disabled: fundo neutral/default-hover com textos e chevron em typography/disabled.

Tokens: as variables novas do Figma ainda ausentes nas collections exportadas (color/border/focus, border/width/focus, color/state/hover, elevation/level-2) usam literais documentados no CSS.

Responsividade: o componente e fluido (100% do container, min-width 160), o valor trunca com reticencias e o menu abre sobreposto com rolagem interna quando a lista e longa.

Acessibilidade: o campo e um botao com aria-haspopup="listbox", aria-expanded e aria-controls; o menu usa role="listbox" com aria-activedescendant e opcoes role="option" com aria-selected; navegacao completa por teclado (setas, Home/End, Enter, Escape) e foco devolvido ao campo ao fechar.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao wrapper.',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Abre o menu inicialmente (estado Open do Figma).',
    },
    defaultValue: {
      control: 'text',
      description: 'Valor inicial no modo nao controlado.',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado Disabled do Figma.',
    },
    errorText: {
      control: 'text',
      description: 'Mensagem de erro conectada por aria-describedby.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Faz o componente ocupar 100% da largura do container.',
    },
    helperText: {
      control: 'text',
      description: 'Texto de apoio abaixo do campo.',
    },
    label: {
      control: 'text',
      description: 'Rotulo visivel e acessivel do campo.',
    },
    onValueChange: {
      control: false,
      description: 'Callback chamado ao selecionar uma opcao.',
    },
    options: {
      control: false,
      description: 'Lista de opcoes exibidas no menu.',
    },
    placeholder: {
      control: 'text',
      description: 'Texto exibido sem selecao ("Selecione" no Figma).',
    },
    required: {
      control: 'boolean',
      description: 'Marca o campo como obrigatorio (aria-required).',
    },
    state: {
      control: 'select',
      description: 'Estado visual controlado.',
      options: ['default', 'error'],
    },
    value: {
      control: 'text',
      description: 'Valor controlado.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    options: cityOptions,
  },
  render: (args) => (
    <div className="dropdown-story-shell">
      <div className="dropdown-story-panel">
        <Dropdown {...args} />
      </div>
    </div>
  ),
};

export const Open: Story = {
  args: {
    defaultOpen: true,
    label: 'Label',
    options: cityOptions,
  },
  render: (args) => (
    <div className="dropdown-story-shell dropdown-story-shell--tall">
      <div className="dropdown-story-panel">
        <Dropdown {...args} />
      </div>
    </div>
  ),
};

export const Selected: Story = {
  args: {
    defaultValue: 'sao-paulo',
    label: 'Label',
    options: cityOptions,
  },
  render: (args) => (
    <div className="dropdown-story-shell">
      <div className="dropdown-story-panel">
        <Dropdown {...args} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Label',
    options: cityOptions,
  },
  render: (args) => (
    <div className="dropdown-story-shell">
      <div className="dropdown-story-panel">
        <Dropdown {...args} />
      </div>
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    errorText: 'Selecione uma opcao.',
    label: 'Label',
    options: cityOptions,
    required: true,
  },
  render: (args) => (
    <div className="dropdown-story-shell">
      <div className="dropdown-story-panel">
        <Dropdown {...args} />
      </div>
    </div>
  ),
};

export const LongList: Story = {
  args: {
    defaultOpen: true,
    label: 'Label',
    options: [
      ...cityOptions,
      { value: 'recife', label: 'Recife' },
      { value: 'salvador', label: 'Salvador' },
      { value: 'fortaleza', label: 'Fortaleza' },
      { value: 'manaus', label: 'Manaus' },
      { value: 'brasilia', label: 'Brasília' },
      { value: 'goiania', label: 'Goiânia' },
      { value: 'belem', label: 'Belém' },
      {
        value: 'indisponivel',
        label: 'Opção indisponível',
        disabled: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Listas longas rolam dentro do menu, sem estourar a página.',
      },
    },
  },
  render: (args) => (
    <div className="dropdown-story-shell dropdown-story-shell--tall">
      <div className="dropdown-story-panel">
        <Dropdown {...args} />
      </div>
    </div>
  ),
};
