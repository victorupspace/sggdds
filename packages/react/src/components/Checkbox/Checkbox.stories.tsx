import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Checkbox } from './Checkbox';

const defaultLabel = 'Checkbox Label';
const defaultHint = 'Hint goes here';

function CheckboxGroup({ narrow = false }: { narrow?: boolean }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        maxWidth: narrow ? 320 : 520,
        width: '100%',
      }}
    >
      <Checkbox label="Opção disponível" hint="Selecione para confirmar esta preferência." />
      <Checkbox
        defaultChecked
        label="Opção selecionada"
        hint="Esta opção já está marcada neste exemplo."
      />
      <Checkbox
        indeterminate
        label="Seleção parcial"
        hint="Alguns itens vinculados estão selecionados."
      />
    </div>
  );
}

function ControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      hint={checked ? 'A opção está selecionada.' : 'A opção ainda não está selecionada.'}
      label="Receber notificações"
      onCheckedChange={setChecked}
    />
  );
}

const meta = {
  title: 'Web Components/Checkbox',
  component: Checkbox,
  parameters: {
    componentCanvas: {
      width: 520,
    },
    docs: {
      description: {
        component: `
O Checkbox reproduz o layout do Figma (Web Components / Checkbox): controle de 24px com os glifos exportados (Unselected, Selected e Intermediate), ripple de 32px nos estados hover/pressed, label Label/Medium (Plus Jakarta Sans Medium 14) e hint de 10px.

Anatomia:
- Input nativo type="checkbox" com controle visual customizado usando os vetores exatos do Figma; o check do estado selecionado e vazado no box preenchido.
- Label em typography/secondary com gap de Component sizing/6 para o controle; hint em color/pure-black com gap de Component sizing/4.

Selecoes do component set: Unchecked, Checked, Indeterminate e Ready Only (prop readOnly, com label em typography/primary e sem estados de interacao).

Estados: hover e pressed escurecem o glifo para color/icons/neutral/default-hover e exibem o ripple com color/neutral-alpha 4% e 8%; o foco por teclado usa o anel duplo do Figma (branco 84% + azul #2c84d0); disabled usa os tons neutros desabilitados (glifo #a3a3a3, label typography/disabled).

Responsividade:
- A label inteira e clicavel e o controle e fixo (24px).
- Label e hint quebram linha naturalmente em containers estreitos.

Acessibilidade:
- Usa input nativo para preservar teclado, formularios e leitores de tela.
- Tab move foco para o input e Space altera o estado quando habilitado.
- Indeterminate usa aria-checked="mixed" e readOnly usa aria-readonly.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Estado selecionado para uso controlado.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao elemento raiz.',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Estado inicial para uso nao controlado.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita o input nativo.',
    },
    hint: {
      control: 'text',
      description: 'Texto auxiliar associado por aria-describedby.',
    },
    id: {
      control: 'text',
      description: 'ID opcional. Quando ausente, useId gera um ID seguro.',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Ativa o estado intermediario do checkbox.',
    },
    label: {
      control: 'text',
      description: 'Texto principal do Checkbox.',
    },
    name: {
      control: 'text',
      description: 'Nome para integracao com formularios.',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback chamado ao alterar a selecao.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Estado somente leitura (Ready Only no Figma).',
    },
    required: {
      control: 'boolean',
      description: 'Marca o input como obrigatorio.',
    },
    value: {
      control: 'text',
      description: 'Valor enviado em formularios.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hint: defaultHint,
    label: defaultLabel,
  },
};

export const Selected: Story = {
  args: {
    defaultChecked: true,
    hint: defaultHint,
    label: defaultLabel,
  },
};

export const Indeterminate: Story = {
  args: {
    hint: defaultHint,
    indeterminate: true,
    label: defaultLabel,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    disabled: true,
    hint: defaultHint,
    label: defaultLabel,
  },
};

export const DisabledSelected: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
    hint: defaultHint,
    label: defaultLabel,
  },
};

export const DisabledIndeterminate: Story = {
  args: {
    disabled: true,
    hint: defaultHint,
    indeterminate: true,
    label: defaultLabel,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultChecked: true,
    hint: defaultHint,
    label: defaultLabel,
    readOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ready Only no Figma: exibe o valor com label em typography/primary, sem estados de hover/pressed e sem permitir alteracao.',
      },
    },
  },
};

export const WithoutHint: Story = {
  args: {
    label: 'Aceito os termos de uso',
  },
};

export const LongLabel: Story = {
  args: {
    hint: 'Este texto auxiliar tambem pode ocupar mais de uma linha e deve continuar associado ao input por aria-describedby.',
    label:
      'Label longa para validar quebra de linha em containers estreitos sem causar overflow horizontal',
  },
  parameters: {
    componentCanvas: {
      width: 320,
    },
  },
};

export const Required: Story = {
  args: {
    hint: 'Campo obrigatorio para prosseguir no fluxo.',
    label: 'Confirmo que li as informacoes',
    required: true,
  },
};

export const Controlled: Story = {
  args: {
    label: 'Receber notificações',
  },
  render: () => <ControlledExample />,
};

export const GroupedStates: Story = {
  args: {
    label: defaultLabel,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Exibe estados comuns em uma composicao vertical para validar espacamento, quebra de texto e alinhamento em grupos.',
      },
    },
  },
  render: () => <CheckboxGroup />,
};

export const GroupedStatesMobile: Story = {
  args: {
    label: defaultLabel,
  },
  parameters: {
    componentCanvas: {
      width: 320,
    },
  },
  render: () => <CheckboxGroup narrow />,
};

export const Accessibility: Story = {
  args: {
    hint: 'Alguns itens da lista ja foram selecionados. Use Espaço para alterar a selecao.',
    indeterminate: true,
    label: 'Selecionar todos',
  },
  parameters: {
    docs: {
      description: {
        story:
          'O input nativo permanece acessivel, o hint e associado por aria-describedby e o estado intermediario usa aria-checked="mixed".',
      },
    },
  },
};
