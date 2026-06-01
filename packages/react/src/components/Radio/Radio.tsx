import './Radio.styles.css';

import { useId } from 'react';

import type { RadioProps } from './Radio.types';

export function Radio({
  _checked = false,
  _name,
  _onChange,
  className,
  description,
  disabled = false,
  label,
  value,
}: RadioProps) {
  const generatedId = useId();
  const inputId = `${generatedId}-${value}`;
  const labelId = `${inputId}-label`;
  const descriptionId = description ? `${inputId}-description` : undefined;

  const rootClassName = ['ds-radio', disabled ? 'ds-radio--disabled' : null, className]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rootClassName} htmlFor={inputId}>
      <input
        aria-describedby={descriptionId}
        aria-labelledby={labelId}
        checked={_checked}
        className="ds-radio__input"
        disabled={disabled}
        id={inputId}
        name={_name}
        onChange={() => {
          if (!disabled) {
            _onChange?.(value);
          }
        }}
        type="radio"
        value={value}
      />
      <span aria-hidden="true" className="ds-radio__control">
        <span className="ds-radio__dot" />
      </span>
      <span className="ds-radio__content">
        <span className="ds-radio__label" id={labelId}>
          {label}
        </span>
        {description ? (
          <span className="ds-radio__description" id={descriptionId}>
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
