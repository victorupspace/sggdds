import type { Meta, StoryObj } from '@storybook/react-vite';

import { Datepicker } from './Datepicker';
import './Datepicker.stories.css';

const meta = {
  title: 'Web Components/Datepicker',
  component: Datepicker,
  parameters: {
    componentCanvas: {
      width: 640,
    },
    docs: {
      description: {
        component: `
O Datepicker reproduz o layout do Figma (Web Components / Datepicker): label SemiBold 14, campo de 40px com borda color/border/neutral/prominent e radius-sm, e calendario em card com radius-md, padding 16x20 e elevacao level-2.

Selecoes (propriedade selection no Figma):
- Single: um campo com o icone calendar_month de 24px.
- Period (mode="range"): dois campos DD/MM/AAAA separados por "até".

Superficies (propriedade background no Figma): white (padrao) e inverse (campos e calendario em color/background/neutral/default).

Calendario:
- Titulo SemiBold 20 e seletor de mes centralizado com os chevrons exportados do Figma.
- Semana comeca na segunda-feira (S T Q Q S S D) e os fins de semana usam input/error-text/color/text, como no Figma.
- Dias fora do mes usam typography/disabled; o dia selecionado usa color/background/neutral/black com texto inverse; o periodo usa color/background/neutral/default-hover.
- Area de botoes com Cancelar (ghost) e Confirmar (secondary) compondo o Button do DS.

Tokens: espacamentos usam Component sizing (8/16/20/24), radius border/radius/radius-sm|md e a elevacao level-2 (variables novas ausentes nas collections exportadas) fica como literal documentado no CSS.

Responsividade: o componente e fluido (100% do container), os campos do periodo dividem o espaco com flex e o grid do calendario usa space-between, adaptando-se a qualquer largura sem overflow.

Acessibilidade: input readonly com role combobox, aria-haspopup/expanded/controls, popover role dialog, grid de dias com aria-label completo em pt-BR e aria-selected, Escape fecha o calendario e o foco visivel usa o focus ring do DS.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    background: {
      control: 'inline-radio',
      description: 'Superficie do componente (background no Figma).',
      options: ['white', 'inverse'],
    },
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
      description: 'Selecao Single ou Period (range) do Figma.',
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
    onValueChange: {
      control: false,
      description: 'Callback chamado ao selecionar uma data unica.',
    },
    open: {
      control: 'boolean',
      description: 'Controla a abertura do calendario.',
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
      description: 'Exibe a area de botoes Cancelar/Confirmar (showButtonArea no Figma).',
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
    defaultMonth: '2026-05-01',
    label: 'Label',
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
    defaultMonth: '2026-05-01',
    label: 'Label',
    open: true,
    value: '2026-05-11',
  },
  render: (args) => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-panel">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};

export const Period: Story = {
  args: {
    defaultMonth: '2026-05-01',
    defaultRangeValue: {
      end: '2026-05-12',
      start: '2026-05-10',
    },
    label: 'Label',
    mode: 'range',
    open: true,
  },
  render: (args) => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-panel">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};

export const Inverse: Story = {
  args: {
    background: 'inverse',
    defaultMonth: '2026-05-01',
    label: 'Label',
    open: true,
    value: '2026-05-11',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Superficie inverse do Figma: campos e calendario usam color/background/neutral/default.',
      },
    },
  },
  render: (args) => (
    <div className="datepicker-story-shell datepicker-story-shell--white">
      <div className="datepicker-story-panel">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};

export const Error: Story = {
  args: {
    defaultMonth: '2026-05-01',
    errorText: 'Data obrigatoria.',
    label: 'Label',
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
    defaultMonth: '2026-05-01',
    disabled: true,
    helperText: 'Campo indisponivel no momento.',
    label: 'Label',
    value: '2026-05-11',
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
    defaultMonth: '2026-05-01',
    helperText:
      'Texto de apoio longo para validar quebra, legibilidade e ausencia de overflow horizontal em telas pequenas.',
    label: 'Label com conteudo longo para demonstrar responsividade nativa',
    open: true,
  },
  render: (args) => (
    <div className="datepicker-story-shell">
      <div className="datepicker-story-panel">
        <Datepicker {...args} />
      </div>
    </div>
  ),
};
