import './TextArea.styles.css';

import { forwardRef, useId, useState } from 'react';

import type { TextAreaProps } from './TextArea.types';

function getValueLength(value: string | number | readonly string[] | undefined) {
  if (value === undefined) {
    return 0;
  }

  if (Array.isArray(value)) {
    return value.join('').length;
  }

  return String(value).length;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    className,
    defaultValue,
    disabled = false,
    errorText,
    fullWidth = true,
    helperText,
    id,
    maxLength,
    onChange,
    onValueChange,
    required = false,
    resize = 'vertical',
    rows = 4,
    showCounter = true,
    state = 'default',
    textareaClassName,
    value,
    label,
    ...textareaProps
  },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const helperId = helperText ? `${textareaId}-helper` : undefined;
  const errorId = errorText ? `${textareaId}-error` : undefined;
  const counterId = showCounter ? `${textareaId}-counter` : undefined;
  const [uncontrolledCount, setUncontrolledCount] = useState(getValueLength(defaultValue));
  const characterCount = value !== undefined ? getValueLength(value) : uncontrolledCount;
  const hasLimit = typeof maxLength === 'number';
  const isOverLimit = hasLimit && characterCount > maxLength;
  const isError = state === 'error' || Boolean(errorText) || isOverLimit;
  const describedBy =
    [isError ? errorId : undefined, helperId, counterId].filter(Boolean).join(' ') || undefined;
  const rootClassName = [
    'ds-text-area',
    `ds-text-area--resize-${resize}`,
    isError ? 'ds-text-area--error' : undefined,
    disabled ? 'ds-text-area--disabled' : undefined,
    fullWidth ? 'ds-text-area--full-width' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const textareaClassNames = ['ds-text-area__field', textareaClassName].filter(Boolean).join(' ');
  const counterText = hasLimit
    ? `${String(characterCount)}/${String(maxLength)}`
    : String(characterCount);

  return (
    <div className={rootClassName}>
      <label className="ds-text-area__label" htmlFor={textareaId}>
        <span>{label}</span>
        {required ? (
          <span aria-hidden="true" className="ds-text-area__required">
            *
          </span>
        ) : null}
      </label>

      <textarea
        {...textareaProps}
        aria-describedby={describedBy}
        aria-invalid={isError ? 'true' : undefined}
        className={textareaClassNames}
        defaultValue={defaultValue}
        disabled={disabled}
        id={textareaId}
        maxLength={maxLength}
        onChange={(event) => {
          setUncontrolledCount(event.currentTarget.value.length);
          onChange?.(event);
          onValueChange?.(event.currentTarget.value, event);
        }}
        ref={ref}
        required={required}
        rows={rows}
        value={value}
      />

      <div className="ds-text-area__support">
        <div className="ds-text-area__messages">
          {isError && errorText ? (
            <p className="ds-text-area__message ds-text-area__message--error" id={errorId}>
              <span>{errorText}</span>
            </p>
          ) : null}

          {helperText ? (
            <p className="ds-text-area__message" id={helperId}>
              <span>{helperText}</span>
            </p>
          ) : null}
        </div>

        {showCounter ? (
          <p aria-live="polite" className="ds-text-area__counter" id={counterId}>
            {counterText}
          </p>
        ) : null}
      </div>
    </div>
  );
});
