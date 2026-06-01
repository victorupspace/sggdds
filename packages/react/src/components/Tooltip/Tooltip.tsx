import './Tooltip.styles.css';

import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import type { FocusEvent, KeyboardEvent, MouseEvent } from 'react';
import type { TooltipProps } from './Tooltip.types';

type TooltipEvent = FocusEvent<HTMLElement> | KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>;

function callHandler(handler: unknown, event: TooltipEvent) {
  if (typeof handler === 'function') {
    (handler as (event: TooltipEvent) => void)(event);
  }
}

export function Tooltip({
  children,
  className,
  closeDelay = 80,
  content,
  defaultOpen = false,
  delayDuration = 160,
  disabled = false,
  id,
  isOpen,
  onOpenChange,
  placement = 'top',
  tone = 'dark',
  tooltipClassName,
}: TooltipProps) {
  const generatedId = useId();
  const tooltipId = id ?? generatedId;
  const openTimerRef = useRef<number | undefined>(undefined);
  const closeTimerRef = useRef<number | undefined>(undefined);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = isOpen !== undefined;
  const currentOpen = !disabled && (isOpen ?? uncontrolledOpen);
  const rootClassName = [
    'ds-tooltip',
    `ds-tooltip--placement-${placement}`,
    `ds-tooltip--tone-${tone}`,
    currentOpen ? 'ds-tooltip--open' : undefined,
    disabled ? 'ds-tooltip--disabled' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const bubbleClassName = ['ds-tooltip__bubble', tooltipClassName].filter(Boolean).join(' ');

  function clearTimers() {
    if (openTimerRef.current !== undefined) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = undefined;
    }

    if (closeTimerRef.current !== undefined) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = undefined;
    }
  }

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  function requestOpen() {
    if (disabled) {
      return;
    }

    clearTimers();
    openTimerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, delayDuration);
  }

  function requestClose() {
    clearTimers();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, closeDelay);
  }

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  const trigger = children;
  const triggerProps = trigger.props;
  const describedBy =
    currentOpen && content
      ? [triggerProps['aria-describedby'], tooltipId].filter(Boolean).join(' ')
      : triggerProps['aria-describedby'];
  // cloneElement is used here to attach aria-describedby and preserve the trigger as the focus target.
  // eslint-disable-next-line react-hooks/refs
  const triggerElement = cloneElement(trigger, {
    'aria-describedby': describedBy ?? undefined,
    onBlur: (event: FocusEvent<HTMLElement>) => {
      callHandler(triggerProps.onBlur, event);
      requestClose();
    },
    onFocus: (event: FocusEvent<HTMLElement>) => {
      callHandler(triggerProps.onFocus, event);
      requestOpen();
    },
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      callHandler(triggerProps.onKeyDown, event);

      if (event.key === 'Escape') {
        requestClose();
      }
    },
    onMouseEnter: (event: MouseEvent<HTMLElement>) => {
      callHandler(triggerProps.onMouseEnter, event);
      requestOpen();
    },
    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      callHandler(triggerProps.onMouseLeave, event);
      requestClose();
    },
  });

  return (
    <span className={rootClassName}>
      {triggerElement}
      <span
        aria-hidden={!currentOpen}
        className={bubbleClassName}
        id={tooltipId}
        role="tooltip"
      >
        <span className="ds-tooltip__content">{content}</span>
      </span>
    </span>
  );
}
