import './Radio.styles.css';

import { useId } from 'react';

import type { RadioProps } from './Radio.types';

/*
 * Glifos exportados do Figma (Web Components / Radio Button, node 12:2511):
 * circle (RadioButton Unselected) e radio_button_checked (RadioButton
 * Selected). Os paths são idênticos aos assets (19x19 com inset de 2.5px no
 * box de 24); a cor vem do CSS via currentColor.
 */
function UnselectedIcon() {
  return (
    <svg
      className="ds-radio__icon ds-radio__icon--unselected"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.50175 19C8.18775 19 6.95267 18.7507 5.7965 18.252C4.64033 17.7533 3.63467 17.0766 2.7795 16.2218C1.92433 15.3669 1.24725 14.3617 0.74825 13.206C0.249417 12.0503 0 10.8156 0 9.50175C0 8.18775 0.249333 6.95267 0.748 5.7965C1.24667 4.64033 1.92342 3.63467 2.77825 2.7795C3.63308 1.92433 4.63833 1.24725 5.794 0.74825C6.94967 0.249417 8.18442 0 9.49825 0C10.8123 0 12.0473 0.249333 13.2035 0.748C14.3597 1.24667 15.3653 1.92342 16.2205 2.77825C17.0757 3.63308 17.7528 4.63833 18.2518 5.794C18.7506 6.94967 19 8.18442 19 9.49825C19 10.8123 18.7507 12.0473 18.252 13.2035C17.7533 14.3597 17.0766 15.3653 16.2218 16.2205C15.3669 17.0757 14.3617 17.7528 13.206 18.2518C12.0503 18.7506 10.8156 19 9.50175 19ZM9.5 17.5C11.7333 17.5 13.625 16.725 15.175 15.175C16.725 13.625 17.5 11.7333 17.5 9.5C17.5 7.26667 16.725 5.375 15.175 3.825C13.625 2.275 11.7333 1.5 9.5 1.5C7.26667 1.5 5.375 2.275 3.825 3.825C2.275 5.375 1.5 7.26667 1.5 9.5C1.5 11.7333 2.275 13.625 3.825 15.175C5.375 16.725 7.26667 17.5 9.5 17.5Z"
        fill="currentColor"
        transform="translate(2.5 2.5)"
      />
    </svg>
  );
}

function SelectedIcon() {
  return (
    <svg
      className="ds-radio__icon ds-radio__icon--selected"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6865 12.6865C13.5622 11.8108 14 10.7487 14 9.5C14 8.25133 13.5622 7.18917 12.6865 6.3135C11.8108 5.43783 10.7487 5 9.5 5C8.25133 5 7.18917 5.43783 6.3135 6.3135C5.43783 7.18917 5 8.25133 5 9.5C5 10.7487 5.43783 11.8108 6.3135 12.6865C7.18917 13.5622 8.25133 14 9.5 14C10.7487 14 11.8108 13.5622 12.6865 12.6865ZM9.50175 19C8.18775 19 6.95267 18.7507 5.7965 18.252C4.64033 17.7533 3.63467 17.0766 2.7795 16.2218C1.92433 15.3669 1.24725 14.3617 0.74825 13.206C0.249417 12.0503 0 10.8156 0 9.50175C0 8.18775 0.249333 6.95267 0.748 5.7965C1.24667 4.64033 1.92342 3.63467 2.77825 2.7795C3.63308 1.92433 4.63833 1.24725 5.794 0.74825C6.94967 0.249417 8.18442 0 9.49825 0C10.8123 0 12.0473 0.249333 13.2035 0.748C14.3597 1.24667 15.3653 1.92342 16.2205 2.77825C17.0757 3.63308 17.7528 4.63833 18.2518 5.794C18.7506 6.94967 19 8.18442 19 9.49825C19 10.8123 18.7507 12.0473 18.252 13.2035C17.7533 14.3597 17.0766 15.3653 16.2218 16.2205C15.3669 17.0757 14.3617 17.7528 13.206 18.2518C12.0503 18.7506 10.8156 19 9.50175 19ZM9.5 17.5C11.7333 17.5 13.625 16.725 15.175 15.175C16.725 13.625 17.5 11.7333 17.5 9.5C17.5 7.26667 16.725 5.375 15.175 3.825C13.625 2.275 11.7333 1.5 9.5 1.5C7.26667 1.5 5.375 2.275 3.825 3.825C2.275 5.375 1.5 7.26667 1.5 9.5C1.5 11.7333 2.275 13.625 3.825 15.175C5.375 16.725 7.26667 17.5 9.5 17.5Z"
        fill="currentColor"
        transform="translate(2.5 2.5)"
      />
    </svg>
  );
}

export function Radio({
  _checked = false,
  _name,
  _onChange,
  className,
  disabled = false,
  hint,
  label,
  readOnly = false,
  value,
}: RadioProps) {
  const generatedId = useId();
  const inputId = `${generatedId}-${value}`;
  const labelId = `${inputId}-label`;
  const hintId = hint ? `${inputId}-hint` : undefined;

  const rootClassName = [
    'ds-radio',
    disabled ? 'ds-radio--disabled' : null,
    readOnly ? 'ds-radio--readonly' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rootClassName} htmlFor={inputId}>
      <input
        aria-describedby={hintId}
        aria-labelledby={labelId}
        checked={_checked}
        className="ds-radio__input"
        disabled={disabled}
        id={inputId}
        name={_name}
        onChange={() => {
          if (!disabled && !readOnly) {
            _onChange?.(value);
          }
        }}
        onClick={(event) => {
          if (readOnly) {
            event.preventDefault();
          }
        }}
        type="radio"
        value={value}
      />
      <span aria-hidden="true" className="ds-radio__control">
        <UnselectedIcon />
        <SelectedIcon />
      </span>
      <span className="ds-radio__content">
        <span className="ds-radio__label" id={labelId}>
          {label}
        </span>
        {hint ? (
          <span className="ds-radio__hint" id={hintId}>
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  );
}
