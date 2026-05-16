import './TextInput.styles.css';

import { forwardRef, useId } from 'react';

import type { ReactNode } from 'react';
import type { TextInputProps } from './TextInput.types';

function FieldIcon({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="ds-text-input__icon">
      {children}
    </span>
  );
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    className,
    disabled = false,
    errorText,
    fullWidth = true,
    helperText,
    iconEnd,
    iconStart,
    id,
    inputClassName,
    label,
    onChange,
    onValueChange,
    required = false,
    size = 'medium',
    state = 'default',
    type = 'text',
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = errorText ? `${inputId}-error` : undefined;
  const isError = state === 'error' || Boolean(errorText);
  const describedBy =
    [isError ? errorId : undefined, helperId].filter(Boolean).join(' ') || undefined;
  const rootClassName = [
    'ds-text-input',
    `ds-text-input--size-${size}`,
    isError ? 'ds-text-input--error' : undefined,
    disabled ? 'ds-text-input--disabled' : undefined,
    fullWidth ? 'ds-text-input--full-width' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const inputClassNames = ['ds-text-input__field', inputClassName].filter(Boolean).join(' ');

  return (
    <div className={rootClassName}>
      <label className="ds-text-input__label" htmlFor={inputId}>
        <span>{label}</span>
        {required ? (
          <span aria-hidden="true" className="ds-text-input__required">
            *
          </span>
        ) : null}
      </label>

      <div className="ds-text-input__control">
        {iconStart ? <FieldIcon>{iconStart}</FieldIcon> : null}
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={isError ? 'true' : undefined}
          className={inputClassNames}
          disabled={disabled}
          id={inputId}
          onChange={(event) => {
            onChange?.(event);
            onValueChange?.(event.currentTarget.value, event);
          }}
          ref={ref}
          required={required}
          type={type}
        />
        {iconEnd ? <FieldIcon>{iconEnd}</FieldIcon> : null}
      </div>

      {isError && errorText ? (
        <p className="ds-text-input__message ds-text-input__message--error" id={errorId}>
          <span aria-hidden="true" className="ds-text-input__message-icon">
            i
          </span>
          <span>{errorText}</span>
        </p>
      ) : null}

      {helperText ? (
        <p className="ds-text-input__message" id={helperId}>
          {!isError ? (
            <span aria-hidden="true" className="ds-text-input__message-icon">
              i
            </span>
          ) : null}
          <span>{helperText}</span>
        </p>
      ) : null}
    </div>
  );
});
