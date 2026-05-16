import type { Meta, StoryObj } from '@storybook/react-vite';

import { Datepicker } from './Datepicker';
import './Datepicker.stories.css';

const meta = {
  title: 'Components/Datepicker',
  component: Datepicker,
  parameters: {
    componentCanvas: {
      width: 640,
    },
    docs: {
      description: {
        component: `
O Datepicker permite selecionar uma data especifica, um intervalo de datas ou um horario associado a partir de um calendario em popover.

Use para agendamento de entregas, data de nascimento, filtros por periodo, reserva, disponibilidade e fluxos em que escolher datas visualmente reduz erro de digitacao.

Nao use quando a pessoa precisa informar texto livre, data aproximada, recorrencia complexa ou uma lista muito extensa de periodos predefinidos. Nesses casos, escolha componentes mais especificos.

Estados:
- Default: input com placeholder, helper e calendario fechado.
- Focus: foco visivel no input, icone e dias do calendario.
- Open: popover com navegacao mensal, dias de outros meses, hoje, selecao e acoes.
- Error: label, borda, foco e mensagem com tokens de feedback.
- Success: confirmacao visual para datas validas quando necessario.
- Disabled e readOnly: bloqueiam abertura e edicao.

Responsividade:
Este componente foi refinado para web desktop e web mobile. Em desktop, o popover ancora abaixo do campo e respeita largura ampla para leitura do calendario. Em telas pequenas, o popover vira uma superficie fixa centralizada, com grid compacto, rolagem vertical segura e botoes de footer adaptados para toque.

Tokens:
Cores, bordas, radius, espacamentos, sombras, tipografia, icones, estados e foco usam variaveis CSS geradas pelos tokens do Figma. Como a camada semantica ainda nao cobre todos os casos no projeto, o componente cria aliases internos semanticos apontando para tokens disponiveis.

Acessibilidade:
- O campo usa input readonly com aria-haspopup="dialog", aria-expanded e aria-controls.
- O popover usa role="dialog" e o calendario usa role="grid".
- Cada dia e um button com aria-label completo e aria-selected.
- Escape fecha o calendario.
- Required, disabled e readOnly preservam semantica nativa.
- O componente funciona por teclado, mouse e touch.
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
    defaultMonth: {
      control: 'text',
      description: 'Mes inicial no formato YYYY-MM-DD.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o campo e bloqueia abertura do calendario.',
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
    maxDate: {
      control: 'text',
      description: 'Data maxima selecionavel em YYYY-MM-DD.',
    },
    minDate: {
      control: 'text',
      description: 'Data minima selecionavel em YYYY-MM-DD.',
    },
    mode: {
      control: 'select',
      description: 'Modo de selecao.',
      options: ['single', 'range'],
    },
    onOpenChange: {
      control: false,
      description: 'Callback chamado ao abrir ou fechar o calendario.',
    },
    onRangeValueChange: {
      control: false,
      description: 'Callback chamado ao selecionar intervalo.',
    },
    onTimeValueChange: {
      control: false,
      description: 'Callback chamado ao alterar horario.',
    },
    onValueChange: {
      control: false,
      description: 'Callback chamado ao selecionar uma data unica.',
    },
    open: {
      control: 'boolean',
      description: 'Controla a abertura do popover.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder exibido quando nao ha data selecionada.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Mantem o valor visivel, mas bloqueia abertura e edicao.',
    },
    required: {
      control: 'boolean',
      description: 'Marca o campo como obrigatorio usando atributo nativo.',
    },
    showFooter: {
      control: 'boolean',
      description: 'Exibe acoes Cancel e Apply no popover.',
    },
    showTime: {
      control: 'boolean',
      description: 'Exibe campo de horario dentro do popover.',
    },
    state: {
      control: 'select',
      description: 'Estado visual controlado.',
      options: ['default', 'error', 'success'],
    },
    successText: {
      control: 'text',
      description: 'Mensagem de sucesso conectada por aria-describedby.',
    },
    value: {
      control: 'text',
      description: 'Valor controlado em YYYY-MM-DD para modo single.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Datepicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultMonth: '2026-12-01',
    helperText: 'Helper Text',
    label: 'Label',
    placeholder: 'MM/DD/YYYY',
    required: true,
  },
  render: (args) => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-panel">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};

export const Open: Story = {
  args: {
    defaultMonth: '2026-12-01',
    helperText: 'Helper Text',
    label: 'Label',
    open: true,
    placeholder: 'MM/DD/YYYY',
    required: true,
    value: '2026-12-15',
  },
  render: (args) => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-panel">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};

export const Range: Story = {
  args: {
    defaultMonth: '2026-12-01',
    defaultRangeValue: {
      end: '2026-12-26',
      start: '2026-12-17',
    },
    helperText: 'Selecione inicio e fim do periodo.',
    label: 'Periodo de entrega',
    mode: 'range',
    open: true,
    showTime: true,
  },
  render: (args) => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-range">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};

export const Success: Story = {
  args: {
    defaultMonth: '2026-12-01',
    label: 'Label',
    state: 'success',
    successText: 'Success message',
    value: '2026-12-31',
  },
  render: (args) => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-panel">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};

export const Error: Story = {
  args: {
    defaultMonth: '2026-12-01',
    errorText: 'Error message',
    label: 'Label',
    placeholder: 'MM/DD/YYYY',
    required: true,
  },
  render: (args) => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-panel">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    defaultMonth: '2026-12-01',
    disabled: true,
    helperText: 'Campo indisponivel no momento',
    label: 'Label',
    value: '2026-12-31',
  },
  render: (args) => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-panel">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};

export const ResponsiveContent: Story = {
  args: {
    defaultMonth: '2026-12-01',
    helperText:
      'Texto de apoio longo para validar quebra, legibilidade, popover e ausencia de overflow horizontal em telas pequenas.',
    label: 'Label com conteudo longo para demonstrar responsividade nativa',
    open: true,
    placeholder: 'MM/DD/YYYY',
  },
  render: (args) => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-panel">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};

export const States: Story = {
  args: {
    defaultMonth: '2026-12-01',
    label: 'Label',
  },
  render: () => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-stack">
        <Datepicker defaultMonth="2026-12-01" helperText="Helper Text" label="Default" />
        <Datepicker
          defaultMonth="2026-12-01"
          helperText="Helper Text"
          label="Selected"
          value="2026-12-31"
        />
        <Datepicker
          defaultMonth="2026-12-01"
          errorText="Error message"
          label="Error"
          state="error"
        />
        <Datepicker
          defaultMonth="2026-12-01"
          label="Success"
          state="success"
          successText="Success message"
          value="2026-12-31"
        />
      </div>
    </div>
  ),
};
