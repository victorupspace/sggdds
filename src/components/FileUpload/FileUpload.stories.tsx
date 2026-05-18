import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileUpload } from './FileUpload';
import './FileUpload.stories.css';
import type { FileUploadProps } from './FileUpload.types';

function ControlledFileUpload(args: FileUploadProps) {
  const [files, setFiles] = useState<File[]>(args.defaultFiles ?? []);

  return (
    <FileUpload
      {...args}
      files={files}
      onClear={(event) => {
        args.onClear?.(event);
      }}
      onFilesChange={(nextFiles, event) => {
        setFiles(nextFiles);
        args.onFilesChange?.(nextFiles, event);
      }}
    />
  );
}

const meta = {
  title: 'Web Components/FileUpload',
  component: FileUpload,
  parameters: {
    componentCanvas: {
      width: 760,
    },
    docs: {
      description: {
        component: `
FileUpload permite selecionar arquivos por botao ou por uma area de drag and drop, mantendo o input file nativo como fonte semantica da interacao.

Use para anexos, documentos, comprovantes, imagens e fluxos em que a pessoa precisa enviar um ou mais arquivos.

Nao use para botoes genericos, campos de texto, links de download ou upload com processamento especifico que exija uma experiencia dedicada.

Modos:
- Button: exibe controles de upload, validacao opcional e limpeza.
- Dropzone: exibe uma area ampla para arrastar arquivos ou clicar para abrir o seletor nativo.

Estados:
- Default: superficie neutra, borda pontilhada no dropzone e acoes disponiveis conforme selecao.
- Dragging: realca a area de drop enquanto arquivos estao sobre o componente.
- Error: borda e mensagem de erro usando tokens de feedback.
- Disabled: bloqueia selecao, drop, validacao e limpeza.

Responsividade:
As acoes quebram linha em larguras menores e passam a ocupar a largura total no mobile. O dropzone reduz tipografia e espacamento para preservar legibilidade sem overflow horizontal.

Tokens:
Cores, superficies, bordas, radius, espacamentos, tipografia, foco e estados usam variaveis CSS geradas pelos tokens do Figma. Como a camada semantica ainda nao cobre todos os casos no projeto, o componente cria aliases internos semanticos apontando para tokens disponiveis.

Acessibilidade:
- Usa input nativo type="file".
- Rotulo visivel e conectado por aria-labelledby.
- Helper, erro e lista de arquivos sao conectados por aria-describedby.
- Botoes usam button nativo e foco visivel.
- Dropzone aceita clique, teclado pelo input nativo e drag and drop.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    accept: {
      control: 'text',
      description: 'Lista de tipos aceitos pelo input nativo.',
    },
    className: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao wrapper.',
    },
    clearLabel: {
      control: 'text',
      description: 'Texto do botao de limpar arquivos.',
    },
    disabled: {
      control: 'boolean',
      description: 'Desabilita selecao, drop e acoes.',
    },
    dropzoneActionText: {
      control: 'text',
      description: 'Trecho acionavel do texto do dropzone.',
    },
    dropzoneHint: {
      control: 'text',
      description: 'Texto de apoio dentro do dropzone.',
    },
    dropzoneText: {
      control: 'text',
      description: 'Texto principal do dropzone.',
    },
    errorText: {
      control: 'text',
      description: 'Mensagem de erro conectada por aria-describedby.',
    },
    files: {
      control: false,
      description: 'Lista controlada de arquivos selecionados.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Faz o componente ocupar toda a largura disponivel.',
    },
    helperText: {
      control: 'text',
      description: 'Texto de apoio abaixo dos controles.',
    },
    inputClassName: {
      control: 'text',
      description: 'Classe CSS opcional aplicada ao input nativo.',
    },
    label: {
      control: 'text',
      description: 'Rotulo visivel do componente.',
    },
    mode: {
      control: 'select',
      description: 'Modo visual do upload.',
      options: ['button', 'dropzone'],
    },
    multiple: {
      control: 'boolean',
      description: 'Permite selecionar multiplos arquivos.',
    },
    onChange: {
      control: false,
      description: 'Callback nativo de alteracao do input file.',
    },
    onClear: {
      control: false,
      description: 'Callback chamado ao limpar arquivos.',
    },
    onFilesChange: {
      control: false,
      description: 'Callback simplificado com a lista de arquivos.',
    },
    onValidate: {
      control: false,
      description: 'Callback chamado pelo botao de validacao.',
    },
    required: {
      control: 'boolean',
      description: 'Marca o input nativo como obrigatorio.',
    },
    showClear: {
      control: 'boolean',
      description: 'Exibe o botao de limpar no modo button.',
    },
    showFileList: {
      control: 'boolean',
      description: 'Exibe a lista de arquivos selecionados.',
    },
    showValidate: {
      control: 'boolean',
      description: 'Exibe o botao de validacao no modo button.',
    },
    state: {
      control: 'select',
      description: 'Estado visual controlado.',
      options: ['default', 'error'],
    },
    uploadLabel: {
      control: 'text',
      description: 'Texto da acao principal de upload.',
    },
    validateLabel: {
      control: 'text',
      description: 'Texto do botao de validacao.',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonType: Story = {
  args: {
    accept: '.svg,.png,.jpg,.jpeg,.gif',
    helperText: 'Helper text',
    label: 'Label',
    mode: 'button',
    multiple: true,
    required: true,
    showValidate: true,
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-compact">
        <ControlledFileUpload {...args} />
      </div>
    </div>
  ),
};

export const DragAndDropType: Story = {
  args: {
    accept: '.svg,.png,.jpg,.jpeg,.gif',
    label: 'Label',
    mode: 'dropzone',
    multiple: true,
    required: true,
    showClear: false,
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-panel">
        <ControlledFileUpload {...args} />
      </div>
    </div>
  ),
};

export const WithSelectedFiles: Story = {
  args: {
    accept: '.pdf,.png,.jpg',
    defaultFiles: [
      new File(['documento'], 'comprovante.pdf', { type: 'application/pdf' }),
      new File(['imagem'], 'foto-documento.jpg', { type: 'image/jpeg' }),
    ],
    helperText: 'Revise os arquivos antes de validar.',
    label: 'Documentos',
    mode: 'button',
    multiple: true,
    showValidate: true,
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-compact">
        <ControlledFileUpload {...args} />
      </div>
    </div>
  ),
};

export const Error: Story = {
  args: {
    errorText: 'Formato de arquivo nao permitido.',
    label: 'Documento obrigatorio',
    mode: 'dropzone',
    required: true,
    state: 'error',
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-panel">
        <ControlledFileUpload {...args} />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: 'Upload indisponivel no momento.',
    label: 'Label',
    mode: 'button',
    showValidate: true,
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-compact">
        <ControlledFileUpload {...args} />
      </div>
    </div>
  ),
};

export const ResponsiveContent: Story = {
  args: {
    dropzoneHint:
      'Arquivos em SVG, PNG, JPG, GIF ou PDF com ate 10 MB por arquivo e nomes legiveis.',
    label: 'Label com conteudo longo para validar responsividade do componente',
    mode: 'dropzone',
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstra quebra de texto no label, no corpo do dropzone e na mensagem de apoio sem gerar overflow horizontal.',
      },
    },
  },
  render: (args) => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-panel">
        <ControlledFileUpload {...args} />
      </div>
    </div>
  ),
};

export const States: Story = {
  args: {
    label: 'Label',
  },
  render: () => (
    <div className="file-upload-story-shell">
      <div className="file-upload-story-stack">
        <ControlledFileUpload
          helperText="Helper text"
          label="Button type"
          mode="button"
          showValidate
        />
        <ControlledFileUpload label="Drag and drop type" mode="dropzone" />
        <ControlledFileUpload
          errorText="Selecione um arquivo valido."
          label="Error"
          mode="dropzone"
          state="error"
        />
        <ControlledFileUpload disabled helperText="Upload indisponivel." label="Disabled" />
      </div>
    </div>
  ),
};
