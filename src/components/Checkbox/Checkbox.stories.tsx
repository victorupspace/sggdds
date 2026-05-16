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
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    componentCanvas: {
      width: 520,
    },
    docs: {
      description: {
        component: `
O Checkbox permite selecionar, desmarcar ou representar estado intermediario de uma opcao independente.

Anatomia:
- Input nativo type="checkbox".
- Controle visual customizado.
- Label obrigatorio.
- Hint opcional associado por aria-describedby.

Use quando a pessoa puder selecionar uma ou mais opcoes independentes, ativar uma preferencia, escolher itens em lista ou representar selecao parcial de um grupo.

Nao use quando a pessoa deve escolher apenas uma opcao entre varias; nesse caso considere Radio. Nao use como navegacao, alerta, botao, switch de acao imediata ou bloco meramente informativo.

Estados:
- Unchecked: caixa vazia com borda.
- Checked: caixa preenchida com check.
- Indeterminate: caixa preenchida com traco horizontal e aria-checked="mixed".
- Disabled: input nativo disabled, cursor desabilitado e contraste reduzido com tokens neutros.

Responsividade:
- A label inteira e clicavel.
- Label e hint quebram linha naturalmente em containers estreitos.
- Stories Desktop, Tablet e Mobile demonstram o comportamento em diferentes larguras.

Acessibilidade:
- Usa input nativo para preservar teclado, formularios e leitores de tela.
- Tab move foco para o input e Space altera o estado quando habilitado.
- O foco visivel aparece no controle customizado.
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
