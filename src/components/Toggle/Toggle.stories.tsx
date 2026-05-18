import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Toggle } from './Toggle';

const defaultLabel = 'Toggle Label';
const defaultHint = 'Hint goes here';

function ToggleGroup({ narrow = false }: { narrow?: boolean }) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        maxWidth: narrow ? 320 : 520,
        width: '100%',
      }}
    >
      <Toggle label="Notificações por e-mail" hint="Receba atualizações na sua caixa de entrada." />
      <Toggle
        defaultChecked
        label="Modo silencioso"
        hint="Alertas sonoros estão desativados."
      />
      <Toggle
        disabled
        label="Sincronização automática"
        hint="Indisponível no plano atual."
      />
    </div>
  );
}

function ControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle
      checked={checked}
      hint={checked ? 'Recurso ativado.' : 'Recurso desativado.'}
      label="Ativar recurso"
      onCheckedChange={setChecked}
    />
  );
}

const meta = {
  title: 'Web Components/Toggle',
  component: Toggle,
  parameters: {
    componentCanvas: {
      width: 520,
    },
    docs: {
      description: {
        component: `
O Toggle ativa ou desativa uma configuracao com efeito imediato.

Anatomia:
- Input nativo type="checkbox" com role="switch".
- Trilho com thumb deslizante.
- Label obrigatoria.
- Hint opcional associado por aria-describedby.

Use quando a acao tiver efeito imediato, como ativar notificacoes, habilitar um modo ou ligar um recurso.

Nao use quando a selecao precisar de confirmacao antes de ser aplicada; nesse caso prefira Checkbox com botao de submit.

Estados:
- Off: trilho cinza, thumb a esquerda.
- On: trilho preto, thumb a direita.
- Disabled: trilho e thumb em tons neutros, cursor desabilitado.

Acessibilidade:
- Usa input nativo com role="switch" para leitores de tela.
- Tab move foco para o input e Space alterna o estado.
- Foco visivel aparece no trilho.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Estado ativado para uso controlado.',
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
    label: {
      control: 'text',
      description: 'Texto principal do Toggle.',
    },
    name: {
      control: 'text',
      description: 'Nome para integracao com formularios.',
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback chamado ao alternar o estado.',
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
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hint: defaultHint,
    label: defaultLabel,
  },
};

export const On: Story = {
  args: {
    defaultChecked: true,
    hint: defaultHint,
    label: defaultLabel,
  },
};

export const DisabledOff: Story = {
  args: {
    disabled: true,
    hint: defaultHint,
    label: defaultLabel,
  },
};

export const DisabledOn: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
    hint: defaultHint,
    label: defaultLabel,
  },
};

export const WithoutHint: Story = {
  args: {
    label: 'Aceitar cookies',
  },
};

export const Required: Story = {
  args: {
    hint: 'Campo obrigatorio para prosseguir.',
    label: 'Concordo com os termos',
    required: true,
  },
};

export const LongLabel: Story = {
  args: {
    hint: 'Este texto auxiliar tambem pode ocupar mais de uma linha.',
    label: 'Label longa para validar quebra de linha em containers estreitos sem causar overflow',
  },
  parameters: {
    componentCanvas: {
      width: 320,
    },
  },
};

export const Controlled: Story = {
  args: {
    label: 'Ativar recurso',
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
          'Exibe estados comuns em uma composicao vertical para validar espacamento, quebra de texto e area de toque.',
      },
    },
  },
  render: () => <ToggleGroup />,
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
  render: () => <ToggleGroup narrow />,
};

export const Accessibility: Story = {
  args: {
    hint: 'Use Espaco para alternar o estado do recurso.',
    label: 'Ativar modo escuro',
  },
  parameters: {
    docs: {
      description: {
        story:
          'O input nativo usa role="switch", o hint e associado por aria-describedby e o foco visivel aparece no trilho.',
      },
    },
  },
};
