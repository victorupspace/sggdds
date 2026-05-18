import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput } from './TextInput';
import './TextInput.stories.css';

function SearchIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m20 20-4.6-4.6m2.6-5.4a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

const meta = {
  title: 'Web Components/TextInput',
  component: TextInput,
  parameters: {
    componentCanvas: {
      width: 420,
    },
    docs: {
      description: {
        component: `
O TextInput e o campo atomico para entrada de dados alfanumericos em uma unica linha. Ele fornece rotulo, placeholder, suporte a icones decorativos, texto de apoio e estados de validacao sem separar a experiencia visual da semantica HTML nativa.

Use para campos curtos como nome, email, busca, telefone, URL, codigos e informacoes de formulario que cabem em uma linha.

Nao use para textos longos, selecoes complexas, upload de arquivo ou acoes. Para conteudo multilinha, use um textarea dedicado quando ele existir no Design System.

Estados:
- Default: borda neutra e helper opcional.
- Focus: foco nativo com anel visivel usando tokens do DS.
- Error: borda, foco e mensagem de erro usando tokens de feedback.
- Disabled: comunica indisponibilidade e bloqueia edicao.

Variacoes:
- Search Field: entrada de busca de linha unica com icone decorativo e type="search".
- Form Label: demonstracao da anatomia de label, obrigatoriedade e texto de apoio para formularios.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, adaptando largura, espacamento, quebra de rotulo/helper e area de toque para diferentes tamanhos de tela. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook.

Tokens:
Cores, bordas, radius, espacamentos, tipografia e foco usam variaveis CSS geradas pelos tokens do Figma. Como a camada semantica ainda nao cobre todos os casos no projeto, o componente cria aliases internos semanticos apontando para tokens disponiveis.

Acessibilidade:
- Usa label nativo associado ao input por htmlFor/id.
- Mensagens de apoio e erro sao conectadas por aria-describedby.
- Erro usa aria-invalid.
- Icones sao decorativos por padrao.
- Required e disabled usam atributos nativos.
- O foco permanece visivel para teclado, mouse e touch.
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
      description: 'Desabilita o campo usando atributo nativo.',
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
    iconEnd: {
      control: false,
      description: 'Icone decorativo ao final do campo.',
    },
    iconStart: {
      control: false,
      description: 'Icone decorativo no inicio do campo.',
    },
    inputClassName: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao input nativo.',
    },
    label: {
      control: 'text',
      description: 'Rotulo visivel e acessivel do campo.',
    },
    onChange: {
      control: false,
      description: 'Callback nativo de alteracao do input.',
    },
    onValueChange: {
      control: false,
      description: 'Callback simplificado que recebe value e event.',
    },
    placeholder: {
      control: 'text',
      description: 'Texto temporario exibido quando o campo esta vazio.',
    },
    required: {
      control: 'boolean',
      description: 'Marca o campo como obrigatorio usando atributo nativo.',
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
    type: {
      control: 'select',
      description: 'Tipo nativo permitido para entrada de linha unica.',
      options: ['email', 'password', 'search', 'tel', 'text', 'url'],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    helperText: 'Helper Text',
    iconEnd: <SearchIcon />,
    label: 'Label',
    placeholder: 'Placeholder',
    required: true,
    type: 'text',
  },
  render: (args) => (
    <div className="text-input-story-shell">
      <div className="text-input-story-panel">
        <TextInput {...args} />
      </div>
    </div>
  ),
};

export const SearchField: Story = {
  args: {
    helperText: 'Use termos curtos para encontrar resultados mais rapidamente.',
    iconEnd: <SearchIcon />,
    label: 'Search',
    placeholder: 'Search',
    type: 'search',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Variação para busca. Usa input nativo type="search", label acessivel, icone decorativo no final e a mesma responsividade do TextInput base.',
      },
    },
  },
  render: (args) => (
    <div className="text-input-story-shell">
      <div className="text-input-story-panel">
        <TextInput {...args} />
      </div>
    </div>
  ),
};

export const FormLabel: Story = {
  args: {
    helperText: 'Texto de apoio claro e curto para orientar o preenchimento.',
    label: 'Form Label',
    placeholder: 'Placeholder',
    required: true,
    type: 'text',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Variação focada na anatomia de formulario: label visivel associado por htmlFor/id, marcador obrigatorio apenas visual e helper conectado por aria-describedby.',
      },
    },
  },
  render: (args) => (
    <div className="text-input-story-shell">
      <div className="text-input-story-panel">
        <TextInput {...args} />
      </div>
    </div>
  ),
};

export const Focus: Story = {
  args: {
    autoFocus: true,
    helperText: 'Campo em foco',
    iconEnd: <SearchIcon />,
    label: 'Label',
    placeholder: 'Placeholder',
    required: true,
    type: 'search',
  },
  parameters: {
    docs: {
      description: {
        story:
          'O estado de foco usa focus-within no controle para preservar o anel visual mesmo com icones dentro do campo.',
      },
    },
  },
  render: (args) => (
    <div className="text-input-story-shell">
      <div className="text-input-story-panel">
        <TextInput {...args} />
      </div>
    </div>
  ),
};

export const Error: Story = {
  args: {
    errorText: 'Helper Text',
    iconEnd: <SearchIcon />,
    label: 'Label',
    placeholder: 'Placeholder',
    required: true,
    type: 'text',
  },
  parameters: {
    docs: {
      description: {
        story: 'O estado de erro pode ser ativado por state="error" ou pela presenca de errorText.',
      },
    },
  },
  render: (args) => (
    <div className="text-input-story-shell">
      <div className="text-input-story-panel">
        <TextInput {...args} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: 'Campo indisponivel no momento',
    iconEnd: <SearchIcon />,
    label: 'Label',
    placeholder: 'Placeholder',
    value: 'Valor bloqueado',
  },
  render: (args) => (
    <div className="text-input-story-shell">
      <div className="text-input-story-panel">
        <TextInput {...args} />
      </div>
    </div>
  ),
};

export const ResponsiveContent: Story = {
  args: {
    helperText:
      'Texto de apoio longo para validar quebra, legibilidade e ausencia de overflow horizontal em telas pequenas.',
    label: 'Label com conteudo longo para demonstrar responsividade nativa',
    placeholder: 'Placeholder com conteudo maior',
  },
  parameters: {
    docs: {
      description: {
        story:
          'O componente quebra rotulo, helper e conteudo interno sem estourar a largura do container em mobile.',
      },
    },
  },
  render: (args) => (
    <div className="text-input-story-shell">
      <div className="text-input-story-long">
        <TextInput {...args} />
      </div>
    </div>
  ),
};

export const States: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
  render: () => (
    <div className="text-input-story-shell">
      <div className="text-input-story-stack">
        <TextInput helperText="Helper Text" iconEnd={<SearchIcon />} label="Default" />
        <TextInput
          autoFocus
          helperText="Campo em foco"
          iconEnd={<SearchIcon />}
          label="Focus"
          placeholder="Placeholder"
        />
        <TextInput
          errorText="Helper Text"
          iconEnd={<SearchIcon />}
          label="Error"
          placeholder="Placeholder"
        />
      </div>
    </div>
  ),
};
