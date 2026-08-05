import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileUpload } from './FileUpload';
import './FileUpload.stories.css';

function createFile(name: string, sizeKb: number) {
  return new File(['a'.repeat(sizeKb * 1024)], name, { type: 'application/octet-stream' });
}

const sampleFiles = [createFile('Documento.csv', 100), createFile('Comprovante.pdf', 100)];

const meta = {
  title: 'Web Components/File Upload',
  component: FileUpload,
  parameters: {
    componentCanvas: {
      width: 420,
    },
    docs: {
      description: {
        component: `
O File Upload reproduz o layout do Figma (Web Components / File Upload): label Label/Medium, dois tipos de acionamento e a lista de Upload Items.

Tipos (propriedade type no Figma):
- button ("Clique para selecionar arquivos"): botao "Anexar arquivos" compondo o Button secondary do DS com o icone upload exportado.
- dropzone ("Arrastar arquivos"): area com fundo neutral/default, borda neutral/subtle, radius-md, padding Component sizing 72x10, instrucao Body/Small e texto de apoio Disclaimer/Medium (10px).

Upload Items: fundo neutral/default com radius 8, icone cards_stack de 24px, nome Body/Small com extensao preservada e truncamento, linha de status (tamanho • status) em Body/Extra Small com typography/placeholder, check_circle verde (icons/sucess/default) e botao de remover close_small.

Estado Error: no dropzone o container vira danger/subtle com borda danger/default e o feedback em typography/danger; no modo button o erro aparece como o Upload Item de falha do Figma (danger/subtle + cards_stack vermelho).

Responsividade: o componente e fluido (100% do container), nomes de arquivo truncam preservando a extensao e o padding lateral de 72px do dropzone reduz para 16px abaixo de 640px.

Acessibilidade: input file nativo conectado por aria-labelledby/aria-describedby, dropzone como label com foco visivel via focus-within, lista com aria-live e botoes de remover com rotulo especifico por arquivo.
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
    dropzoneHint: {
      control: 'text',
      description: 'Texto de apoio do dropzone (formatos e limite).',
    },
    dropzoneText: {
      control: 'text',
      description: 'Instrucao do dropzone.',
    },
    errorText: {
      control: 'text',
      description: 'Mensagem de erro (Upload Item de falha no modo button).',
    },
    files: {
      control: false,
      description: 'Arquivos controlados.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Faz o componente ocupar 100% da largura do container.',
    },
    helperText: {
      control: 'text',
      description: 'Texto de apoio abaixo do acionador.',
    },
    itemStatusLabel: {
      control: 'text',
      description: 'Status exibido nos itens carregados.',
    },
    label: {
      control: 'text',
      description: 'Rotulo visivel e acessivel do campo.',
    },
    mode: {
      control: 'inline-radio',
      description: 'Tipo do Figma: button ou dropzone.',
      options: ['button', 'dropzone'],
    },
    multiple: {
      control: 'boolean',
      description: 'Permite selecionar mais de um arquivo.',
    },
    onFileRemove: {
      control: false,
      description: 'Callback chamado ao remover um arquivo.',
    },
    onFilesChange: {
      control: false,
      description: 'Callback chamado quando a selecao muda.',
    },
    showFileList: {
      control: 'boolean',
      description: 'Exibe a lista de Upload Items.',
    },
    state: {
      control: 'select',
      description: 'Estado visual controlado.',
      options: ['default', 'error'],
    },
    uploadLabel: {
      control: 'text',
      description: 'Rotulo do botao (Anexar arquivos no Figma).',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultFiles: sampleFiles,
    helperText: 'Helper text',
    label: 'Label',
    multiple: true,
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-panel">
        <FileUpload {...args} />
      </div>
    </div>
  ),
};

export const Dropzone: Story = {
  args: {
    defaultFiles: sampleFiles,
    helperText: 'Helper text',
    label: 'Label',
    mode: 'dropzone',
    multiple: true,
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-panel">
        <FileUpload {...args} />
      </div>
    </div>
  ),
};

export const ButtonError: Story = {
  args: {
    errorText: 'O upload falhou. O arquivo é muito grande.',
    helperText: 'Helper text',
    label: 'Label',
    state: 'error',
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-panel">
        <FileUpload {...args} />
      </div>
    </div>
  ),
};

export const DropzoneError: Story = {
  args: {
    errorText: 'Arquivo não suportado',
    helperText: 'Helper text',
    label: 'Label',
    mode: 'dropzone',
    state: 'error',
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-panel">
        <FileUpload {...args} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: 'Envio indisponivel no momento.',
    label: 'Label',
    mode: 'dropzone',
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-panel">
        <FileUpload {...args} />
      </div>
    </div>
  ),
};

export const LongFileNames: Story = {
  args: {
    defaultFiles: [
      createFile('Relatorio-consolidado-de-indicadores-de-atendimento-digital-2026.xlsx', 512),
    ],
    label: 'Label',
  },
  parameters: {
    docs: {
      description: {
        story: 'Nomes longos truncam com reticencias preservando a extensao, como no Figma.',
      },
    },
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-panel">
        <FileUpload {...args} />
      </div>
    </div>
  ),
};
