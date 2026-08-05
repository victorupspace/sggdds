import './Dropdown.styles.css';

import { forwardRef, useEffect, useId, useRef, useState } from 'react';

import type { KeyboardEvent } from 'react';
import type { DropdownOption, DropdownProps } from './Dropdown.types';

/*
 * Chevron do Figma (Web Components / Dropdown, node 108:26342): glifo
 * arrow_back_ios_new exportado, rotacionado -90° via CSS para apontar para
 * baixo; a cor vem via currentColor.
 */
function ChevronIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.3348 18.0496L5.28999 10.0048L13.3348 1.96L14.5175 3.14271L7.6552 10.0048L14.5175 16.8669L13.3348 18.0496Z"
        fill="currentColor"
      />
    </svg>
  );
}

function findEnabledIndex(options: DropdownOption[], start: number, step: number) {
  for (let index = start; index >= 0 && index < options.length; index += step) {
    if (!options[index].disabled) {
      return index;
    }
  }

  return -1;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(function Dropdown(
  {
    className,
    defaultOpen = false,
    defaultValue,
    disabled = false,
    errorText,
    fullWidth = true,
    helperText,
    id,
    label,
    onValueChange,
    options,
    placeholder = 'Selecione',
    required = false,
    state = 'default',
    value,
  },
  ref,
) {
  const generatedId = useId();
  const buttonId = id ?? generatedId;
  const labelId = `${buttonId}-label`;
  const listboxId = `${buttonId}-listbox`;
  const helperId = helperText ? `${buttonId}-helper` : undefined;
  const errorId = errorText ? `${buttonId}-error` : undefined;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '');
  const [activeIndex, setActiveIndex] = useState(-1);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const currentValue = value ?? uncontrolledValue;
  const selectedOption = options.find((option) => option.value === currentValue);
  const isError = state === 'error' || Boolean(errorText);
  const describedBy =
    [isError ? errorId : undefined, helperId].filter(Boolean).join(' ') || undefined;
  const rootClassName = [
    'ds-dropdown',
    isOpen ? 'ds-dropdown--open' : undefined,
    isError ? 'ds-dropdown--error' : undefined,
    disabled ? 'ds-dropdown--disabled' : undefined,
    fullWidth ? 'ds-dropdown--full-width' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    if (isOpen) {
      listboxRef.current?.focus();
    }
  }, [isOpen]);

  function setButtonRef(node: HTMLButtonElement | null) {
    buttonRef.current = node;

    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  }

  function openList() {
    if (disabled) {
      return;
    }

    const selectedIndex = options.findIndex(
      (option) => option.value === currentValue && !option.disabled,
    );

    setActiveIndex(selectedIndex >= 0 ? selectedIndex : findEnabledIndex(options, 0, 1));
    setIsOpen(true);
  }

  function closeList(refocus = true) {
    setIsOpen(false);

    if (refocus) {
      buttonRef.current?.focus();
    }
  }

  function selectOption(option: DropdownOption) {
    if (option.disabled) {
      return;
    }

    if (value === undefined) {
      setUncontrolledValue(option.value);
    }

    onValueChange?.(option.value);
    closeList();
  }

  function handleListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => {
        const nextIndex = findEnabledIndex(options, index + 1, 1);
        return nextIndex >= 0 ? nextIndex : index;
      });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => {
        const nextIndex = findEnabledIndex(options, index - 1, -1);
        return nextIndex >= 0 ? nextIndex : index;
      });
    } else if (event.key === 'Home') {
      event.preventDefault();
      setActiveIndex(findEnabledIndex(options, 0, 1));
    } else if (event.key === 'End') {
      event.preventDefault();
      setActiveIndex(findEnabledIndex(options, options.length - 1, -1));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const option = options[activeIndex] as DropdownOption | undefined;

      if (option) {
        selectOption(option);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeList();
    } else if (event.key === 'Tab') {
      setIsOpen(false);
    }
  }

  return (
    <div className={rootClassName}>
      <label className="ds-dropdown__label" htmlFor={buttonId} id={labelId}>
        <span>{label}</span>
        {required ? (
          <span aria-hidden="true" className="ds-dropdown__required">
            *
          </span>
        ) : null}
      </label>

      <div className="ds-dropdown__control">
        <button
          aria-controls={isOpen ? listboxId : undefined}
          aria-describedby={describedBy}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-invalid={isError ? 'true' : undefined}
          aria-required={required ? 'true' : undefined}
          className="ds-dropdown__field"
          disabled={disabled}
          id={buttonId}
          onClick={() => {
            if (isOpen) {
              closeList();
            } else {
              openList();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              openList();
            }
          }}
          ref={setButtonRef}
          type="button"
        >
          <span className="ds-dropdown__value">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span aria-hidden="true" className="ds-dropdown__icon">
            <ChevronIcon />
          </span>
        </button>

        {isOpen ? (
          <ul
            aria-activedescendant={
              activeIndex >= 0 ? `${buttonId}-option-${String(activeIndex)}` : undefined
            }
            aria-labelledby={labelId}
            className="ds-dropdown__menu"
            id={listboxId}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsOpen(false);
              }
            }}
            onKeyDown={handleListKeyDown}
            ref={listboxRef}
            role="listbox"
            tabIndex={-1}
          >
            {options.map((option, index) => {
              const optionClassName = [
                'ds-dropdown__option',
                index === activeIndex ? 'ds-dropdown__option--active' : undefined,
                option.disabled ? 'ds-dropdown__option--disabled' : undefined,
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <li
                  aria-disabled={option.disabled ? 'true' : undefined}
                  aria-selected={option.value === currentValue}
                  className={optionClassName}
                  id={`${buttonId}-option-${String(index)}`}
                  key={option.value}
                  onClick={() => {
                    selectOption(option);
                  }}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onMouseEnter={() => {
                    if (!option.disabled) {
                      setActiveIndex(index);
                    }
                  }}
                  role="option"
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      {isError && errorText ? (
        <p className="ds-dropdown__message ds-dropdown__message--error" id={errorId}>
          {errorText}
        </p>
      ) : null}

      {helperText ? (
        <p className="ds-dropdown__message" id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
