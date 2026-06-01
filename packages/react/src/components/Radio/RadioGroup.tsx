import { Children, isValidElement, useCallback, useId, useRef } from 'react';

import type { RadioGroupProps, RadioProps } from './Radio.types';
import { Radio } from './Radio';

export function RadioGroup({
  children,
  className,
  label,
  name,
  onChange,
  orientation = 'vertical',
  value,
}: RadioGroupProps) {
  const generatedId = useId();
  const groupId = `rg-${generatedId}`;
  const groupRef = useRef<HTMLFieldSetElement>(null);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLFieldSetElement>) => {
      const inputs = Array.from(
        groupRef.current?.querySelectorAll<HTMLInputElement>(
          'input[type="radio"]:not(:disabled)',
        ) ?? [],
      );

      if (!inputs.length) return;

      const focused = inputs.findIndex((el) => el === document.activeElement);
      if (focused === -1) return;

      const isVertical = orientation === 'vertical';
      const prev = isVertical ? 'ArrowUp' : 'ArrowLeft';
      const next = isVertical ? 'ArrowDown' : 'ArrowRight';

      let target: HTMLInputElement | undefined;

      if (event.key === prev) {
        target = inputs[(focused - 1 + inputs.length) % inputs.length];
      } else if (event.key === next) {
        target = inputs[(focused + 1) % inputs.length];
      } else {
        return;
      }

      event.preventDefault();
      target.focus();
      onChange(target.value);
    },
    [onChange, orientation],
  );

  const rootClassName = [
    'ds-radio-group',
    orientation === 'horizontal' ? 'ds-radio-group--horizontal' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const enrichedChildren = Children.map(children, (child) => {
    if (!isValidElement(child) || child.type !== Radio) return child;

    const childProps = child.props as RadioProps;

    return (
      <Radio
        {...childProps}
        _checked={childProps.value === value}
        _name={name}
        _onChange={onChange}
      />
    );
  });

  return (
    <fieldset
      aria-labelledby={label ? `${groupId}-legend` : undefined}
      className={rootClassName}
      id={groupId}
      onKeyDown={handleKeyDown}
      ref={groupRef}
      style={{ border: 0, margin: 0, padding: 0 }}
    >
      {label ? (
        <legend className="ds-radio-group__legend" id={`${groupId}-legend`}>
          {label}
        </legend>
      ) : null}
      <div className="ds-radio-group__options" role="radiogroup">
        {enrichedChildren}
      </div>
    </fieldset>
  );
}
