import type {
  ChangeEvent,
  ChangeEventHandler,
  DragEvent,
  InputHTMLAttributes,
  MouseEvent,
} from 'react';

/** `type` no Figma: button ("Clique para selecionar arquivos") ou dropzone ("Arrastar arquivos"). */
export type FileUploadMode = 'button' | 'dropzone';

export type FileUploadState = 'default' | 'error';

export type FileUploadInteractionEvent =
  | ChangeEvent<HTMLInputElement>
  | DragEvent<HTMLElement>
  | MouseEvent<HTMLButtonElement>;

export interface FileUploadProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'className' | 'onChange' | 'type' | 'value'
> {
  label: string;
  helperText?: string;
  /** Mensagem de erro; no modo button vira o Upload Item de falha do Figma. */
  errorText?: string;
  state?: FileUploadState;
  mode?: FileUploadMode;
  className?: string;
  inputClassName?: string;
  fullWidth?: boolean;
  files?: File[];
  defaultFiles?: File[];
  showFileList?: boolean;
  /** Rótulo do botão ("Anexar arquivos" no Figma). */
  uploadLabel?: string;
  /** Instrução do dropzone. */
  dropzoneText?: string;
  /** Texto de apoio do dropzone (formatos e limite). */
  dropzoneHint?: string;
  /** Status exibido nos itens carregados. */
  itemStatusLabel?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFilesChange?: (files: File[], event: FileUploadInteractionEvent) => void;
  onFileRemove?: (file: File, index: number, event: MouseEvent<HTMLButtonElement>) => void;
}
