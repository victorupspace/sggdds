import './FileUpload.styles.css';

import { forwardRef, useId, useRef, useState } from 'react';

import { Button } from '../Button';
import type { DragEvent, MouseEvent, Ref } from 'react';
import type { FileUploadInteractionEvent, FileUploadProps } from './FileUpload.types';

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  (ref as { current: T | null }).current = value;
}

/*
 * Vetores exportados do Figma (Web Components / File Upload, node 219:7828);
 * a cor vem do CSS via currentColor.
 */
function UploadIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {/* upload [Material Symbols], desenhado com inset de 18.75% na caixa de 24px */}
      <path
        d="M6.75 11.2885V2.8885L4.28475 5.35375L3.23075 4.26925L7.5 0L11.7693 4.26925L10.7153 5.35375L8.25 2.8885V11.2885H6.75ZM1.80775 15C1.30258 15 0.875 14.825 0.525 14.475C0.175 14.125 0 13.6974 0 13.1923V10.4808H1.5V13.1923C1.5 13.2693 1.53208 13.3398 1.59625 13.4038C1.66025 13.4679 1.73075 13.5 1.80775 13.5H13.1923C13.2693 13.5 13.3398 13.4679 13.4038 13.4038C13.4679 13.3398 13.5 13.2693 13.5 13.1923V10.4808H15V13.1923C15 13.6974 14.825 14.125 14.475 14.475C14.125 14.825 13.6974 15 13.1923 15H1.80775Z"
        fill="currentColor"
        transform="translate(4.5 4.5)"
      />
    </svg>
  );
}

function CardsStackIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.654 18.9288L2.448 10.2635C2.384 9.85833 2.48275 9.49042 2.74425 9.15975C3.00575 8.82892 3.33908 8.63142 3.74425 8.56725L5.14425 18.7212C5.15708 18.8046 5.19717 18.8735 5.2645 18.928C5.33183 18.9823 5.40717 19.0032 5.4905 18.9905L14.556 17.7788H18.9905C18.8955 18.0648 18.7362 18.3061 18.5125 18.5027C18.2888 18.6996 18.0187 18.8198 17.702 18.8635L5.64225 20.4652C5.14992 20.5357 4.71467 20.4204 4.3365 20.1193C3.95833 19.8179 3.73083 19.4211 3.654 18.9288ZM8.1155 15.648C7.61033 15.648 7.18275 15.473 6.83275 15.123C6.48275 14.773 6.30775 14.3454 6.30775 13.8402V5.30775C6.30775 4.80258 6.48275 4.375 6.83275 4.025C7.18275 3.675 7.61033 3.5 8.1155 3.5H19.6923C20.1974 3.5 20.625 3.675 20.975 4.025C21.325 4.375 21.5 4.80258 21.5 5.30775V13.8402C21.5 14.3454 21.325 14.773 20.975 15.123C20.625 15.473 20.1974 15.648 19.6923 15.648H8.1155ZM8.1155 14.148H19.6923C19.7821 14.148 19.8558 14.1192 19.9135 14.0615C19.9712 14.0038 20 13.9301 20 13.8402V5.30775C20 5.21792 19.9712 5.14417 19.9135 5.0865C19.8558 5.02883 19.7821 5 19.6923 5H8.1155C8.02567 5 7.95192 5.02883 7.89425 5.0865C7.83658 5.14417 7.80775 5.21792 7.80775 5.30775V13.8402C7.80775 13.9301 7.83658 14.0038 7.89425 14.0615C7.95192 14.1192 8.02567 14.148 8.1155 14.148ZM10.1537 8.75H17.6538V7.25H10.1537V8.75ZM10.1537 11.827H14.6538V10.327H10.1537V11.827Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.5808 16.2538L17.3038 9.53075L16.25 8.477L10.5808 14.1463L7.73075 11.2963L6.677 12.35L10.5808 16.2538ZM12.0017 21.5C10.6877 21.5 9.45267 21.2507 8.2965 20.752C7.14033 20.2533 6.13467 19.5766 5.2795 18.7218C4.42433 17.8669 3.74725 16.8617 3.24825 15.706C2.74942 14.5503 2.5 13.3156 2.5 12.0017C2.5 10.6877 2.74933 9.45267 3.248 8.2965C3.74667 7.14033 4.42342 6.13467 5.27825 5.2795C6.13308 4.42433 7.13833 3.74725 8.294 3.24825C9.44967 2.74942 10.6844 2.5 11.9982 2.5C13.3122 2.5 14.5473 2.74933 15.7035 3.248C16.8597 3.74667 17.8653 4.42342 18.7205 5.27825C19.5757 6.13308 20.2528 7.13833 20.7518 8.294C21.2506 9.44967 21.5 10.6844 21.5 11.9982C21.5 13.3122 21.2507 14.5473 20.752 15.7035C20.2533 16.8597 19.5766 17.8653 18.7218 18.7205C17.8669 19.5757 16.8617 20.2528 15.706 20.7518C14.5503 21.2506 13.3156 21.5 12.0017 21.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CloseSmallIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.227 16.8365L7.1635 15.773L10.9365 12L7.1635 8.252L8.227 7.1885L12 10.9615L15.748 7.1885L16.8115 8.252L13.0385 12L16.8115 15.773L15.748 16.8365L12 13.0635L8.227 16.8365Z"
        fill="currentColor"
      />
    </svg>
  );
}

function splitFileName(name: string) {
  const dotIndex = name.lastIndexOf('.');

  if (dotIndex <= 0) {
    return { baseName: name, extension: '' };
  }

  return { baseName: name.slice(0, dotIndex), extension: name.slice(dotIndex) };
}

function formatFileSize(size: number) {
  return `${String(Math.max(1, Math.ceil(size / 1024)))}kb`;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  {
    accept,
    className,
    defaultFiles = [],
    disabled = false,
    dropzoneHint = 'PDF, CSV ou XLSX até 10mb',
    dropzoneText = 'Arraste arquivos aqui ou clique para selecionar',
    errorText,
    files,
    fullWidth = true,
    helperText,
    id,
    inputClassName,
    itemStatusLabel = 'Carregado',
    label,
    mode = 'button',
    multiple = false,
    onChange,
    onFileRemove,
    onFilesChange,
    required = false,
    showFileList = true,
    state = 'default',
    uploadLabel = 'Anexar arquivos',
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = `${inputId}-label`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = errorText ? `${inputId}-error` : undefined;
  const fileListId = showFileList ? `${inputId}-files` : undefined;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uncontrolledFiles, setUncontrolledFiles] = useState<File[]>(defaultFiles);
  const [isDragging, setIsDragging] = useState(false);
  const selectedFiles = files ?? uncontrolledFiles;
  const isControlled = files !== undefined;
  const hasFiles = selectedFiles.length > 0;
  const isError = state === 'error' || Boolean(errorText);
  const describedBy =
    [isError ? errorId : undefined, helperId, hasFiles ? fileListId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;
  const rootClassName = [
    'ds-file-upload',
    `ds-file-upload--mode-${mode}`,
    isError ? 'ds-file-upload--error' : undefined,
    disabled ? 'ds-file-upload--disabled' : undefined,
    fullWidth ? 'ds-file-upload--full-width' : undefined,
    isDragging ? 'ds-file-upload--dragging' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const inputClassNames = ['ds-file-upload__input', inputClassName].filter(Boolean).join(' ');

  function setInputNode(node: HTMLInputElement | null) {
    inputRef.current = node;
    assignRef(ref, node);
  }

  function normalizeFiles(fileList: FileList | null) {
    const nextFiles = Array.from(fileList ?? []);
    return multiple ? nextFiles : nextFiles.slice(0, 1);
  }

  function commitFiles(nextFiles: File[], event: FileUploadInteractionEvent) {
    if (!isControlled) {
      setUncontrolledFiles(nextFiles);
    }

    onFilesChange?.(nextFiles, event);
  }

  function openFileDialog() {
    if (!disabled) {
      inputRef.current?.click();
    }
  }

  function removeFile(index: number, event: MouseEvent<HTMLButtonElement>) {
    const file = selectedFiles[index];
    const nextFiles = selectedFiles.filter((_, fileIndex) => fileIndex !== index);

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    commitFiles(nextFiles, event);
    onFileRemove?.(file, index, event);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    const nextFiles = normalizeFiles(event.dataTransfer.files);

    if (nextFiles.length > 0) {
      commitFiles(nextFiles, event);
    }
  }

  function renderInput() {
    return (
      <input
        {...inputProps}
        accept={accept}
        aria-describedby={describedBy}
        aria-invalid={isError ? 'true' : undefined}
        aria-labelledby={labelId}
        className={inputClassNames}
        disabled={disabled}
        id={inputId}
        multiple={multiple}
        onChange={(event) => {
          const nextFiles = normalizeFiles(event.currentTarget.files);

          commitFiles(nextFiles, event);
          onChange?.(event);
        }}
        ref={setInputNode}
        required={required}
        tabIndex={mode === 'button' ? -1 : undefined}
        type="file"
      />
    );
  }

  return (
    <div className={rootClassName}>
      <span className="ds-file-upload__label" id={labelId}>
        <span>{label}</span>
        {required ? (
          <span aria-hidden="true" className="ds-file-upload__required">
            *
          </span>
        ) : null}
      </span>

      {mode === 'dropzone' ? (
        <label
          className="ds-file-upload__dropzone"
          htmlFor={inputId}
          onDragEnter={(event) => {
            event.preventDefault();
            if (!disabled) {
              setIsDragging(true);
            }
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragging(false);
          }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={handleDrop}
        >
          {renderInput()}
          <span className="ds-file-upload__dropzone-text">{dropzoneText}</span>
          {isError && errorText ? (
            <span className="ds-file-upload__dropzone-feedback" id={errorId}>
              {errorText}
            </span>
          ) : (
            <span className="ds-file-upload__dropzone-hint">{dropzoneHint}</span>
          )}
        </label>
      ) : (
        <>
          {renderInput()}
          <Button
            disabled={disabled}
            iconStart={<UploadIcon />}
            onClick={openFileDialog}
            variant="secondary"
          >
            {uploadLabel}
          </Button>
        </>
      )}

      {helperText ? (
        <p className="ds-file-upload__helper" id={helperId}>
          {helperText}
        </p>
      ) : null}

      {mode === 'button' && isError && errorText ? (
        <div className="ds-file-upload__item ds-file-upload__item--error" id={errorId}>
          <span aria-hidden="true" className="ds-file-upload__item-icon">
            <CardsStackIcon />
          </span>
          <span className="ds-file-upload__item-info">
            <span className="ds-file-upload__item-name">{errorText}</span>
          </span>
        </div>
      ) : null}

      {showFileList && hasFiles ? (
        <ul aria-live="polite" className="ds-file-upload__items" id={fileListId}>
          {selectedFiles.map((file, index) => {
            const { baseName, extension } = splitFileName(file.name);

            return (
              <li
                className="ds-file-upload__item"
                key={`${file.name}-${String(file.size)}-${String(index)}`}
              >
                <span aria-hidden="true" className="ds-file-upload__item-icon">
                  <CardsStackIcon />
                </span>
                <span className="ds-file-upload__item-info">
                  <span className="ds-file-upload__item-name">
                    <span className="ds-file-upload__item-basename">{baseName}</span>
                    {extension ? (
                      <span className="ds-file-upload__item-extension">{extension}</span>
                    ) : null}
                  </span>
                  <span className="ds-file-upload__item-status">
                    <span>{formatFileSize(file.size)}</span>
                    <span aria-hidden="true" className="ds-file-upload__item-bullet" />
                    <span>{itemStatusLabel}</span>
                  </span>
                </span>
                <span aria-hidden="true" className="ds-file-upload__item-check">
                  <CheckCircleIcon />
                </span>
                <button
                  aria-label={`Remover ${file.name}`}
                  className="ds-file-upload__item-remove"
                  disabled={disabled}
                  onClick={(event) => {
                    removeFile(index, event);
                  }}
                  type="button"
                >
                  <CloseSmallIcon />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
});
