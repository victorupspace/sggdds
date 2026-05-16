import './Toggle.styles.css';

import { useId } from 'react';

import type { ToggleProps } from './Toggle.types';

export function Toggle({
  checked,
  className,
  defaultChecked,
  disabled = false,
  hint,
  id,
  label,
  name,
  onCheckedChange,
  required = false,
  value,
}: ToggleProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = `${inputId}-label`;
  const hintId = hint ? `${inputId}-hint` : undefined;

  const rootClassName = [
    'ds-toggle',
    disabled ? 'ds-toggle--disabled' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rootClassName} htmlFor={inputId}>
      <input
        aria-describedby={hintId}
        aria-labelledby={labelId}
        checked={checked}
        className="ds-toggle__input"
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
        required={required}
        role="switch"
        type="checkbox"
        value={value}
      />
      <span aria-hidden="true" className="ds-toggle__track">
        <span className="ds-toggle__thumb" />
      </span>
      <span className="ds-toggle__content">
        <span className="ds-toggle__label">
          <span id={labelId}>{label}</span>
          {required ? (
            <span aria-hidden="true" className="ds-toggle__required">
              *
            </span>
          ) : null}
        </span>
        {hint ? (
          <span className="ds-toggle__hint" id={hintId}>
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  );
}
