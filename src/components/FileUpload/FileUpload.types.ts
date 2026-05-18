import type {
  ChangeEvent,
  ChangeEventHandler,
  DragEvent,
  InputHTMLAttributes,
  MouseEvent,
} from 'react';

export type FileUploadMode = 'button' | 'dropzone';

export type FileUploadState = 'default' | 'error';

export type FileUploadInteractionEvent =
  | ChangeEvent<HTMLInputElement>
  | DragEvent<HTMLElement>
  | MouseEvent<HTMLButtonElement>;

export interface FileUploadProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'children' | 'className' | 'onChange' | 'type' | 'value'
  > {
  label: string;
  helperText?: string;
  errorText?: string;
  state?: FileUploadState;
  mode?: FileUploadMode;
  className?: string;
  inputClassName?: string;
  fullWidth?: boolean;
  files?: File[];
  defaultFiles?: File[];
  showFileList?: boolean;
  uploadLabel?: string;
  validateLabel?: string;
  clearLabel?: string;
  showValidate?: boolean;
  showClear?: boolean;
  dropzoneText?: string;
  dropzoneActionText?: string;
  dropzoneHint?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFilesChange?: (files: File[], event: FileUploadInteractionEvent) => void;
  onValidate?: (files: File[], event: MouseEvent<HTMLButtonElement>) => void;
  onClear?: (event: MouseEvent<HTMLButtonElement>) => void;
}
