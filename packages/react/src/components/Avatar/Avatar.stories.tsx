import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from './Avatar';
import './Avatar.stories.css';

const imageSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Crect width="96" height="96" fill="%23292929"/%3E%3Ccircle cx="48" cy="37" r="18" fill="%23ffffff"/%3E%3Cpath d="M18 88c4-20 17-31 30-31s26 11 30 31" fill="%23ffffff"/%3E%3C/svg%3E';

const meta = {
  title: 'Web Components/Avatar',
  component: Avatar,
  parameters: {
    componentCanvas: {
      width: 640,
    },
    docs: {
      description: {
        component: `
Avatar oferece uma representacao visual consistente para pessoas, usuarios ou entidades em navegacao, conta, listas e composicoes sociais.

Use para identificacao rapida quando existe uma pessoa ou entidade associada ao conteudo. Nao use Avatar como status, badge, botao independente ou decoracao sem nome acessivel.

Responsividade:
Este componente foi desenvolvido com comportamento responsivo nativo, mantendo proporcao circular, evitando overflow e ajustando o tamanho xlarge em telas pequenas. A responsividade e aplicada na implementacao do componente e nao depende de variacoes manuais no Storybook.

Tokens:
Cores, borda, radius, tamanho, tipografia e estados usam variaveis CSS geradas pelos tokens do Figma. O fallback textual usa soft black como superficie neutra, alinhado aos padroes atuais de identificacao e contraste do Design System.

Acessibilidade:
- name e usado para nomear o fallback de iniciais.
- Quando src e informado, a imagem usa alt; se alt nao for informado, name e usado.
- Caso a imagem falhe, o componente volta para iniciais sem quebrar a interface.
- O estado disabled comunica indisponibilidade com aria-disabled e tratamento visual.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    alt: {
      control: 'text',
      description: 'Texto alternativo da imagem quando src for usado.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao avatar.',
    },
    disabled: {
      control: 'boolean',
      description: 'Aplica tratamento visual e aria-disabled.',
    },
    initials: {
      control: 'text',
      description: 'Iniciais opcionais. Quando ausente, sao derivadas de name.',
    },
    name: {
      control: 'text',
      description: 'Nome da pessoa ou entidade representada.',
    },
    size: {
      control: 'select',
      description: 'Tamanho do avatar.',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    src: {
      control: 'text',
      description: 'URL da imagem do usuario ou entidade.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Ana Zanon',
    size: 'medium',
  },
  render: (args) => (
    <div className="avatar-story-surface">
      <div className="avatar-story-panel">
        <Avatar {...args} />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    name: 'Ana Zanon',
  },
  render: () => (
    <div className="avatar-story-surface">
      <div className="avatar-story-panel avatar-story-stack">
        <Avatar name="Ana Zanon" size="xsmall" />
        <Avatar name="Ana Zanon" size="small" />
        <Avatar name="Ana Zanon" size="medium" />
        <Avatar name="Ana Zanon" size="large" />
        <Avatar name="Ana Zanon" size="xlarge" />
      </div>
    </div>
  ),
};

export const Image: Story = {
  args: {
    alt: 'Perfil de Ana Zanon',
    name: 'Ana Zanon',
    size: 'large',
    src: imageSrc,
  },
  render: (args) => (
    <div className="avatar-story-surface">
      <div className="avatar-story-panel">
        <Avatar {...args} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    name: 'Ana Zanon',
    size: 'large',
  },
  render: (args) => (
    <div className="avatar-story-surface">
      <div className="avatar-story-panel">
        <Avatar {...args} />
      </div>
    </div>
  ),
};

export const MobileResponsive: Story = {
  args: {
    name: 'Ana Zanon',
    size: 'xlarge',
  },
  parameters: {
    componentCanvas: {
      width: 320,
    },
  },
  render: (args) => (
    <div className="avatar-story-surface">
      <div className="avatar-story-panel">
        <Avatar {...args} />
        <span className="avatar-story-label">Responsive</span>
      </div>
    </div>
  ),
};
