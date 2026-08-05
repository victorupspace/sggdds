import './Checkbox.styles.css';

import { useEffect, useId, useRef } from 'react';

import type { CheckboxProps } from './Checkbox.types';

/*
 * Glifos exportados do Figma (Web Components / Checkbox, node 4:4209):
 * Check Box Unselected-24, Check Box Selected-24 e Check Box Intermediate-24.
 * Os paths são idênticos aos assets; a cor vem do CSS via currentColor e o
 * check do estado selecionado é vazado no box preenchido, como no Figma.
 */
function UncheckedIcon() {
  return (
    <svg
      className="ds-checkbox__icon ds-checkbox__icon--unchecked"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 0C17.8807 0 19 1.11929 19 2.5V16.5C19 17.8807 17.8807 19 16.5 19H2.5C1.11929 19 0 17.8807 0 16.5V2.5C0 1.11929 1.11929 0 2.5 0H16.5ZM2.5 1C1.67157 1 1 1.67157 1 2.5V16.5C1 17.3284 1.67157 18 2.5 18H16.5C17.3284 18 18 17.3284 18 16.5V2.5C18 1.67157 17.3284 1 16.5 1H2.5Z"
        fill="currentColor"
        transform="translate(2.5 2.5)"
      />
    </svg>
  );
}

function CheckedIcon() {
  return (
    <svg
      className="ds-checkbox__icon ds-checkbox__icon--checked"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 0C17.8807 0 19 1.11929 19 2.5V16.5C19 17.8807 17.8807 19 16.5 19H2.5C1.11929 19 0 17.8807 0 16.5V2.5C0 1.11929 1.11929 0 2.5 0H16.5ZM14.8506 5.14355C14.6537 4.95014 14.3371 4.95266 14.1436 5.14941L7.62402 11.7861L4.85645 8.96777C4.66294 8.77093 4.34637 8.76847 4.14941 8.96191C3.95274 9.15544 3.95017 9.47205 4.14355 9.66895L7.26855 12.8506C7.36255 12.9461 7.49095 13 7.625 13C7.75905 13 7.88745 12.9461 7.98145 12.8506L14.8564 5.85059C15.0499 5.65366 15.0473 5.33707 14.8506 5.14355Z"
        fill="currentColor"
        transform="translate(2.5 2.5)"
      />
    </svg>
  );
}

function IndeterminateIcon() {
  return (
    <svg
      className="ds-checkbox__icon ds-checkbox__icon--indeterminate"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 2.5C20.3807 2.5 21.5 3.61929 21.5 5V19C21.5 20.3807 20.3807 21.5 19 21.5H5C3.61929 21.5 2.5 20.3807 2.5 19V5C2.5 3.61929 3.61929 2.5 5 2.5H19ZM8 11.5C7.72386 11.5 7.5 11.7239 7.5 12C7.5 12.2761 7.72386 12.5 8 12.5H16C16.2761 12.5 16.5 12.2761 16.5 12C16.5 11.7239 16.2761 11.5 16 11.5H8Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
  readOnly = false,
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
    readOnly ? 'ds-checkbox--readonly' : null,
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
        aria-readonly={readOnly ? 'true' : undefined}
        checked={checked}
        className="ds-checkbox__input"
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={inputId}
        name={name}
        onChange={(event) => {
          if (disabled || readOnly) {
            return;
          }

          onCheckedChange?.(event.currentTarget.checked);
        }}
        onClick={(event) => {
          if (readOnly) {
            event.preventDefault();
          }
        }}
        ref={inputRef}
        required={required}
        type="checkbox"
        value={value}
      />
      <span className="ds-checkbox__control" aria-hidden="true">
        <UncheckedIcon />
        <CheckedIcon />
        <IndeterminateIcon />
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
