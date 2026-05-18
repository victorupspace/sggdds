import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { BackToTop } from './BackToTop';
import type { BackToTopProps } from './BackToTop.types';
import './BackToTop.stories.css';

const noop = () => undefined;

function ScrollContainerDemo(args: BackToTopProps) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  return (
    <div className="back-to-top-story-surface">
      <div className="back-to-top-story-panel back-to-top-story-scroll" ref={setTarget}>
        <div className="back-to-top-story-content">
          Role este painel para ver o botao aparecer dentro do container.
        </div>
        {target ? <BackToTop {...args} target={target} /> : null}
      </div>
    </div>
  );
}

const meta = {
  title: 'Components/BackToTop',
  component: BackToTop,
  parameters: {
    componentCanvas: {
      width: 640,
    },
    docs: {
      description: {
        component: `
BackToTop permite retornar rapidamente ao topo de uma pagina longa sem perder o contexto de navegacao.

Use em paginas extensas, documentacao, listas longas e fluxos com rolagem vertical significativa. Nao use em telas curtas, modais pequenos ou como substituto de navegacao estrutural.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo. O botao fica fixo no canto inferior, ajusta tamanho/inset em mobile, aparece apenas apos o threshold configurado e evita foco/tab quando oculto.

Tokens:
Background usa soft black dos tokens, com foreground branco, foco em identity blue, radius full e spacing tokens. A seta usa Material Symbols Rounded com weight 300, conforme solicitado.

Acessibilidade e melhores praticas:
- Usa button nativo com aria-label claro.
- Quando oculto, sai da ordem de tab e recebe aria-hidden.
- Respeita prefers-reduced-motion, usando scroll automatico quando a pessoa reduziu movimento.
- Mantem area de toque ampla em desktop e mobile.
- onClick pode cancelar o scroll chamando event.preventDefault().
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'Nome acessivel do botao.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao componente.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita a acao.',
    },
    onClick: {
      control: false,
      description: 'Callback de click. Pode chamar preventDefault para cancelar o scroll.',
    },
    position: {
      control: 'select',
      description: 'Canto horizontal em que o botao fica posicionado.',
      options: ['right', 'left'],
    },
    scrollBehavior: {
      control: 'select',
      description: 'Comportamento de scroll quando prefers-reduced-motion nao esta ativo.',
      options: ['auto', 'smooth'],
    },
    target: {
      control: false,
      description: 'Elemento ou Window que sera observado e rolado para o topo.',
    },
    threshold: {
      control: 'number',
      description: 'Quantidade de scroll em px antes do botao aparecer.',
    },
    visible: {
      control: 'boolean',
      description: 'Controle manual de visibilidade para exemplos ou casos controlados.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BackToTop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: noop,
    visible: true,
  },
  render: (args) => (
    <div className="back-to-top-story-surface">
      <div className="back-to-top-story-panel">
        <BackToTop {...args} />
      </div>
    </div>
  ),
};

export const LeftPosition: Story = {
  args: {
    position: 'left',
    visible: true,
  },
  render: (args) => (
    <div className="back-to-top-story-surface">
      <div className="back-to-top-story-panel">
        <BackToTop {...args} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    visible: true,
  },
  render: (args) => (
    <div className="back-to-top-story-surface">
      <div className="back-to-top-story-panel">
        <BackToTop {...args} />
      </div>
    </div>
  ),
};

export const ScrollContainer: Story = {
  args: {
    threshold: 160,
  },
  render: (args) => <ScrollContainerDemo {...args} />,
};

export const MobileResponsive: Story = {
  args: {
    visible: true,
  },
  parameters: {
    componentCanvas: {
      width: 320,
    },
  },
  render: (args) => (
    <div className="back-to-top-story-surface">
      <div className="back-to-top-story-panel">
        <BackToTop {...args} />
      </div>
    </div>
  ),
};
