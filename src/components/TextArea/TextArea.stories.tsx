import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextArea } from './TextArea';
import './TextArea.stories.css';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    componentCanvas: {
      width: 560,
    },
    docs: {
      description: {
        component: `
O TextArea agrupa entrada multilinha, label, helper text e contador de caracteres para formularios que precisam de contexto estrutural completo.

Use para mensagens, descricoes, observacoes, justificativas e conteudos longos que precisam de varias linhas editaveis.

Nao use para respostas curtas de uma linha, valores numericos, selecoes, upload de arquivo ou acoes. Para entrada curta, use TextInput.

Estados:
- Default: superficie clara, borda neutra, helper e contador opcionais.
- Focus: anel de foco visivel usando tokens do DS.
- Error: borda, foco, helper e mensagem de erro com tokens de feedback.
- Disabled: comunica indisponibilidade e bloqueia edicao.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, adaptando largura, altura minima, espacamentos, quebra de helper e posicionamento do contador para diferentes tamanhos de tela. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook.

Tokens:
Cores, bordas, radius, espacamentos, tipografia e foco usam variaveis CSS geradas pelos tokens do Figma. Como a camada semantica ainda nao cobre todos os casos no projeto, o componente cria aliases internos semanticos apontando para tokens disponiveis.

Acessibilidade:
- Usa textarea nativo com label associado por htmlFor/id.
- Helper, erro e contador entram em aria-describedby.
- Erro usa aria-invalid.
- Contador usa aria-live="polite" para atualizar leitores de tela sem interromper a digitacao.
- Required, disabled, rows e maxLength usam atributos nativos.
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
      description: 'Desabilita o textarea usando atributo nativo.',
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
    maxLength: {
      control: 'number',
      description: 'Limite nativo de caracteres e base do contador.',
    },
    onChange: {
      control: false,
      description: 'Callback nativo de alteracao do textarea.',
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
    resize: {
      control: 'select',
      description: 'Controla se a pessoa usuaria pode redimensionar verticalmente.',
      options: ['none', 'vertical'],
    },
    rows: {
      control: 'number',
      description: 'Quantidade inicial de linhas do textarea nativo.',
    },
    showCounter: {
      control: 'boolean',
      description: 'Exibe contador de caracteres.',
    },
    state: {
      control: 'select',
      description: 'Estado visual controlado.',
      options: ['default', 'error'],
    },
    textareaClassName: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao textarea nativo.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    helperText: 'Helper text',
    label: 'Label',
    maxLength: 100,
    placeholder: 'Placeholder',
    required: true,
  },
  render: (args) => (
    <div className="text-area-story-shell">
      <div className="text-area-story-panel">
        <TextArea {...args} />
      </div>
    </div>
  ),
};

export const Focus: Story = {
  args: {
    autoFocus: true,
    helperText: 'Campo em foco',
    label: 'Label',
    maxLength: 100,
    placeholder: 'Placeholder',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'O estado de foco usa o foco nativo do textarea com outline tokenizado e area de toque preservada.',
      },
    },
  },
  render: (args) => (
    <div className="text-area-story-shell">
      <div className="text-area-story-panel">
        <TextArea {...args} />
      </div>
    </div>
  ),
};

export const Error: Story = {
  args: {
    errorText: 'Helper text',
    label: 'Label',
    maxLength: 100,
    placeholder: 'Placeholder',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'O estado de erro pode ser ativado por state="error", pela presenca de errorText ou por valor controlado acima de maxLength.',
      },
    },
  },
  render: (args) => (
    <div className="text-area-story-shell">
      <div className="text-area-story-panel">
        <TextArea {...args} />
      </div>
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    helperText: 'Descreva o contexto principal.',
    label: 'Observacao',
    maxLength: 100,
    placeholder: 'Placeholder',
    value: 'Conteudo preenchido para demonstrar o contador.',
  },
  render: (args) => (
    <div className="text-area-story-shell">
      <div className="text-area-story-panel">
        <TextArea {...args} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: 'Campo indisponivel no momento',
    label: 'Label',
    maxLength: 100,
    placeholder: 'Placeholder',
    value: 'Valor bloqueado',
  },
  render: (args) => (
    <div className="text-area-story-shell">
      <div className="text-area-story-panel">
        <TextArea {...args} />
      </div>
    </div>
  ),
};

export const ResponsiveContent: Story = {
  args: {
    helperText:
      'Texto de apoio longo para validar quebra, legibilidade, contador e ausencia de overflow horizontal em telas pequenas.',
    label: 'Label com conteudo longo para demonstrar responsividade nativa',
    maxLength: 280,
    placeholder: 'Placeholder com conteudo maior',
  },
  parameters: {
    docs: {
      description: {
        story:
          'O componente quebra rotulo/helper e reposiciona o contador sem estourar a largura do container em mobile.',
      },
    },
  },
  render: (args) => (
    <div className="text-area-story-shell">
      <div className="text-area-story-long">
        <TextArea {...args} />
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
    <div className="text-area-story-shell">
      <div className="text-area-story-stack">
        <TextArea helperText="Helper text" label="Default" maxLength={100} />
        <TextArea autoFocus helperText="Campo em foco" label="Focus" maxLength={100} />
        <TextArea errorText="Helper text" label="Error" maxLength={100} />
      </div>
    </div>
  ),
};
