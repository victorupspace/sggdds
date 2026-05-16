import './Checkbox.styles.css';

import { useEffect, useId, useRef } from 'react';

import type { CheckboxProps } from './Checkbox.types';

export function Checkbox({
  checked,
  className,
  defaultChecked,
  disabled = false,
  hint,
  id,
  indeterminate = false,
  label,
  name,
  onCheckedChange,
  required = false,
  value,
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = `${inputId}-label`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const rootClassName = [
    'ds-checkbox',
    indeterminate ? 'ds-checkbox--indeterminate' : null,
    disabled ? 'ds-checkbox--disabled' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rootClassName} htmlFor={inputId}>
      <input
        aria-checked={indeterminate ? 'mixed' : undefined}
        aria-describedby={hintId}
        aria-labelledby={labelId}
        checked={checked}
        className="ds-checkbox__input"
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={inputId}
        name={name}
        onChange={(event) => {
          if (disabled) {
            return;
          }

          onCheckedChange?.(event.currentTarget.checked);
        }}
        ref={inputRef}
        required={required}
        type="checkbox"
        value={value}
      />
      <span className="ds-checkbox__control" aria-hidden="true">
        <svg className="ds-checkbox__check" fill="none" viewBox="0 0 16 16">
          <path
            d="M3.5 8.25 6.6 11.2 12.75 4.8"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
          />
        </svg>
        <span className="ds-checkbox__mixed" />
      </span>
      <span className="ds-checkbox__content">
        <span className="ds-checkbox__label">
          <span id={labelId}>{label}</span>
          {required ? (
            <span className="ds-checkbox__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </span>
        {hint ? (
          <span className="ds-checkbox__hint" id={hintId}>
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  );
}
