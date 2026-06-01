import './Dropdown.styles.css';

import { forwardRef, useId, useState } from 'react';

import type { DropdownProps } from './Dropdown.types';

function getSelectValue(value: string | undefined) {
  return value ?? '';
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(function Dropdown(
  {
    className,
    defaultValue,
    disabled = false,
    errorText,
    fullWidth = true,
    helperText,
    id,
    label,
    onChange,
    onValueChange,
    options,
    placeholder,
    required = false,
    selectClassName,
    size = 'medium',
    state = 'default',
    value,
    ...selectProps
  },
  ref,
) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const errorId = errorText ? `${selectId}-error` : undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(getSelectValue(defaultValue));
  const currentValue = value !== undefined ? getSelectValue(value) : uncontrolledValue;
  const isPlaceholderSelected = Boolean(placeholder) && currentValue === '';
  const isError = state === 'error' || Boolean(errorText);
  const describedBy =
    [isError ? errorId : undefined, helperId].filter(Boolean).join(' ') || undefined;
  const rootClassName = [
    'ds-dropdown',
    `ds-dropdown--size-${size}`,
    isError ? 'ds-dropdown--error' : undefined,
    disabled ? 'ds-dropdown--disabled' : undefined,
    fullWidth ? 'ds-dropdown--full-width' : undefined,
    isPlaceholderSelected ? 'ds-dropdown--placeholder' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const selectClassNames = ['ds-dropdown__field', selectClassName].filter(Boolean).join(' ');

  return (
    <div className={rootClassName}>
      <label className="ds-dropdown__label" htmlFor={selectId}>
        <span>{label}</span>
        {required ? (
          <span aria-hidden="true" className="ds-dropdown__required">
            *
          </span>
        ) : null}
      </label>

      <div className="ds-dropdown__control">
        <select
          {...selectProps}
          aria-describedby={describedBy}
          aria-invalid={isError ? 'true' : undefined}
          className={selectClassNames}
          defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
          disabled={disabled}
          id={selectId}
          onChange={(event) => {
            setUncontrolledValue(event.currentTarget.value);
            onChange?.(event);
            onValueChange?.(event.currentTarget.value, event);
          }}
          ref={ref}
          required={required}
          value={value}
        >
          {placeholder ? (
            <option disabled hidden value="">
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option disabled={option.disabled} key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden="true" className="ds-dropdown__icon">
          <ChevronDownIcon />
        </span>
      </div>

      {isError && errorText ? (
        <p className="ds-dropdown__message ds-dropdown__message--error" id={errorId}>
          <span aria-hidden="true" className="ds-dropdown__message-icon">
            i
          </span>
          <span>{errorText}</span>
        </p>
      ) : null}

      {helperText ? (
        <p className="ds-dropdown__message" id={helperId}>
          {!isError ? (
            <span aria-hidden="true" className="ds-dropdown__message-icon">
              i
            </span>
          ) : null}
          <span>{helperText}</span>
        </p>
      ) : null}
    </div>
  );
});
