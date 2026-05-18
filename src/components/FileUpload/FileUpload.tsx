import './FileUpload.styles.css';

import { forwardRef, useId, useRef, useState } from 'react';

import type { DragEvent, ReactNode, Ref } from 'react';
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

function UploadIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 20V5m0 0-6 6m6-6 6 6M5 4h14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m5 12 4.2 4.2L19 6.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 7h16m-2 0-.8 12.1A2 2 0 0 1 15.2 21H8.8a2 2 0 0 1-2-1.9L6 7m3 0V4.8A1.8 1.8 0 0 1 10.8 3h2.4A1.8 1.8 0 0 1 15 4.8V7m-5 4v6m4-6v6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ActionIcon({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="ds-file-upload__action-icon">
      {children}
    </span>
  );
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  {
    accept,
    className,
    clearLabel = 'Clear Files',
    defaultFiles = [],
    disabled = false,
    dropzoneActionText = 'click to upload',
    dropzoneHint = 'SVG, PNG, JPG or GIF (max. 800x400px)',
    dropzoneText = 'Drag and drop files here or',
    errorText,
    files,
    fullWidth = true,
    helperText,
    id,
    inputClassName,
    label,
    mode = 'button',
    multiple = false,
    onChange,
    onClear,
    onFilesChange,
    onValidate,
    required = false,
    showClear = true,
    showFileList = true,
    showValidate = false,
    state = 'default',
    uploadLabel = 'Upload Files',
    validateLabel = 'Validate',
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
          <span className="ds-file-upload__dropzone-icon" aria-hidden="true">
            <UploadIcon />
          </span>
          <span className="ds-file-upload__dropzone-text">
            <span>{dropzoneText}</span>
            <span className="ds-file-upload__dropzone-action">{dropzoneActionText}</span>
          </span>
          <span className="ds-file-upload__dropzone-hint">{dropzoneHint}</span>
        </label>
      ) : (
        <>
          {renderInput()}
          <div className="ds-file-upload__actions">
            <button
              className="ds-file-upload__action ds-file-upload__action--primary"
              disabled={disabled}
              onClick={openFileDialog}
              type="button"
            >
              <ActionIcon>
                <UploadIcon />
              </ActionIcon>
              <span>{uploadLabel}</span>
            </button>

            {showValidate ? (
              <button
                className="ds-file-upload__action ds-file-upload__action--secondary"
                disabled={disabled || !hasFiles}
                onClick={(event) => onValidate?.(selectedFiles, event)}
                type="button"
              >
                <ActionIcon>
                  <CheckIcon />
                </ActionIcon>
                <span>{validateLabel}</span>
              </button>
            ) : null}

            {showClear ? (
              <button
                className="ds-file-upload__action ds-file-upload__action--tertiary"
                disabled={disabled || !hasFiles}
                onClick={(event) => {
                  if (inputRef.current) {
                    inputRef.current.value = '';
                  }

                  commitFiles([], event);
                  onClear?.(event);
                }}
                type="button"
              >
                <ActionIcon>
                  <TrashIcon />
                </ActionIcon>
                <span>{clearLabel}</span>
              </button>
            ) : null}
          </div>
        </>
      )}

      {isError && errorText ? (
        <p className="ds-file-upload__message ds-file-upload__message--error" id={errorId}>
          <span>{errorText}</span>
        </p>
      ) : null}

      {helperText ? (
        <p className="ds-file-upload__message" id={helperId}>
          <span>{helperText}</span>
        </p>
      ) : null}

      {showFileList && hasFiles ? (
        <ul aria-live="polite" className="ds-file-upload__file-list" id={fileListId}>
          {selectedFiles.map((file, index) => (
            <li
              className="ds-file-upload__file-item"
              key={`${file.name}-${String(file.size)}-${String(index)}`}
            >
              <span className="ds-file-upload__file-name">{file.name}</span>
              <span className="ds-file-upload__file-size">{Math.ceil(file.size / 1024)} KB</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
});
