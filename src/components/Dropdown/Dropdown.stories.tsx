import type { Meta, StoryObj } from '@storybook/react-vite';

import { Dropdown } from './Dropdown';
import './Dropdown.stories.css';

const defaultOptions = [
  { value: 'financeiro', label: 'Financeiro' },
  { value: 'atendimento', label: 'Atendimento' },
  { value: 'documentos', label: 'Documentos' },
  { value: 'suporte', label: 'Suporte' },
];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    componentCanvas: {
      width: 420,
    },
    docs: {
      description: {
        component: `
O Dropdown e um Select compacto para escolha unica entre multiplas opcoes. Ele e indicado quando o espaco e limitado ou quando a lista de alternativas e extensa demais para radio buttons.

Use para escolhas previsiveis de uma unica opcao, como categoria, estado, unidade, preferencia ou filtros simples.

Nao use para selecionar multiplos itens, buscar em listas muito grandes, executar acoes ou navegar entre paginas. Para listas muito longas com busca, use um componente dedicado quando existir.

Estados:
- Default: borda neutra, placeholder opcional e helper text.
- Focus: foco nativo com anel visivel usando tokens do DS.
- Error: borda, foco e mensagem de erro usando tokens de feedback.
- Disabled: comunica indisponibilidade e bloqueia selecao.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, adaptando largura, espacamento, quebra de rotulo/helper e area de toque para diferentes tamanhos de tela. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook.

Tokens:
Cores, bordas, radius, espacamentos, tipografia, icone e foco usam variaveis CSS geradas pelos tokens do Figma. Como a camada semantica ainda nao cobre todos os casos no projeto, o componente cria aliases internos semanticos apontando para tokens disponiveis.

Acessibilidade:
- Usa select nativo para preservar teclado, touch, leitores de tela e comportamento mobile do sistema operacional.
- Label e associado ao select por htmlFor/id.
- Helper e erro sao conectados por aria-describedby.
- Erro usa aria-invalid.
- Required e disabled usam atributos nativos.
- O icone de seta e decorativo.
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
    disabled: {
      control: 'boolean',
      description: 'Desabilita o select usando atributo nativo.',
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
    onChange: {
      control: false,
      description: 'Callback nativo de alteracao do select.',
    },
    onValueChange: {
      control: false,
      description: 'Callback simplificado que recebe value e event.',
    },
    options: {
      control: 'object',
      description: 'Lista de opcoes renderizadas como option nativo.',
    },
    placeholder: {
      control: 'text',
      description: 'Opcao temporaria desabilitada exibida quando nenhum valor foi selecionado.',
    },
    required: {
      control: 'boolean',
      description: 'Marca o campo como obrigatorio usando atributo nativo.',
    },
    selectClassName: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao select nativo.',
    },
    size: {
      control: 'select',
      description: 'Densidade visual do campo.',
      options: ['medium', 'large'],
    },
    state: {
      control: 'select',
      description: 'Estado visual controlado.',
      options: ['default', 'error'],
    },
    value: {
      control: 'text',
      description: 'Valor controlado do select.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    helperText: 'Helper Text',
    label: 'Label',
    options: defaultOptions,
    placeholder: 'Selecione uma opcao',
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

export const Selected: Story = {
  args: {
    helperText: 'Categoria selecionada',
    label: 'Label',
    options: defaultOptions,
    placeholder: 'Selecione uma opcao',
    value: 'documentos',
  },
  render: (args) => (
    <div className="dropdown-story-shell">
      <div className="dropdown-story-panel">
        <Dropdown {...args} />
      </div>
    </div>
  ),
};

export const Focus: Story = {
  args: {
    autoFocus: true,
    helperText: 'Campo em foco',
    label: 'Label',
    options: defaultOptions,
    placeholder: 'Selecione uma opcao',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'O estado de foco usa o select nativo com outline tokenizado e mantem o comportamento esperado de teclado e mobile.',
      },
    },
  },
  render: (args) => (
    <div className="dropdown-story-shell">
      <div className="dropdown-story-panel">
        <Dropdown {...args} />
      </div>
    </div>
  ),
};

export const Error: Story = {
  args: {
    errorText: 'Selecione uma opcao valida',
    label: 'Label',
    options: defaultOptions,
    placeholder: 'Selecione uma opcao',
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

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: 'Campo indisponivel no momento',
    label: 'Label',
    options: defaultOptions,
    placeholder: 'Selecione uma opcao',
    value: 'financeiro',
  },
  render: (args) => (
    <div className="dropdown-story-shell">
      <div className="dropdown-story-panel">
        <Dropdown {...args} />
      </div>
    </div>
  ),
};

export const ResponsiveContent: Story = {
  args: {
    helperText:
      'Texto de apoio longo para validar quebra, legibilidade e ausencia de overflow horizontal em telas pequenas.',
    label: 'Label com conteudo longo para demonstrar responsividade nativa',
    options: [
      { value: 'a', label: 'Opcao com texto curto' },
      { value: 'b', label: 'Opcao com conteudo mais longo para validar selecao' },
      { value: 'c', label: 'Opcao indisponivel', disabled: true },
    ],
    placeholder: 'Placeholder com conteudo maior',
  },
  render: (args) => (
    <div className="dropdown-story-shell">
      <div className="dropdown-story-long">
        <Dropdown {...args} />
      </div>
    </div>
  ),
};

export const States: Story = {
  args: {
    label: 'Label',
    options: defaultOptions,
    placeholder: 'Selecione uma opcao',
  },
  render: () => (
    <div className="dropdown-story-shell">
      <div className="dropdown-story-stack">
        <Dropdown
          helperText="Helper Text"
          label="Default"
          options={defaultOptions}
          placeholder="Selecione uma opcao"
        />
        <Dropdown
          helperText="Selecionado"
          label="Selected"
          options={defaultOptions}
          placeholder="Selecione uma opcao"
          value="atendimento"
        />
        <Dropdown
          errorText="Selecione uma opcao valida"
          label="Error"
          options={defaultOptions}
          placeholder="Selecione uma opcao"
        />
      </div>
    </div>
  ),
};
