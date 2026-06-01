import './Toast.styles.css';

import { useCallback, useEffect, useState } from 'react';

import type { ReactNode } from 'react';
import type { ToastProps, ToastRole, ToastVariant } from './Toast.types';

function BellIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.4 13.4H4.6c.8-.9 1.2-2.1 1.2-3.4V8a4.2 4.2 0 1 1 8.4 0v2c0 1.3.4 2.5 1.2 3.4ZM8.4 15.5a1.8 1.8 0 0 0 3.2 0"
        fill="currentColor"
      />
    </svg>
  );
}

function InformationIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" fill="currentColor" r="9" />
      <path
        d="M10 8.8v5M10 5.9v.2"
        stroke="var(--toast-icon-mark)"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" fill="currentColor" r="9" />
      <path
        d="m6.2 10 2.4 2.5 5.3-5.4"
        stroke="var(--toast-icon-mark)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function NoticeIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.6 3.1a1.6 1.6 0 0 1 2.8 0l7 12.2a1.6 1.6 0 0 1-1.4 2.4H3a1.6 1.6 0 0 1-1.4-2.4l7-12.2Z"
        fill="currentColor"
      />
      <path
        d="M10 7.4v4.1M10 14.4v.1"
        stroke="var(--toast-icon-mark)"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function NegativeIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" fill="currentColor" r="9" />
      <path
        d="M10 5.8v5M10 14.1v.1"
        stroke="var(--toast-icon-mark)"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m5 5 10 10M15 5 5 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const defaultIcons: Record<ToastVariant, ReactNode> = {
  brand: <BellIcon />,
  information: <InformationIcon />,
  negative: <NegativeIcon />,
  neutral: <BellIcon />,
  notice: <NoticeIcon />,
  positive: <SuccessIcon />,
};

function getDefaultRole(variant: ToastVariant): ToastRole {
  return variant === 'negative' ? 'alert' : 'status';
}

export function Toast({
  actions = [],
  autoDismiss = true,
  children,
  className,
  defaultOpen = true,
  dismissible = true,
  dismissLabel = 'Dispensar notificacao',
  duration = 5000,
  icon,
  isOpen,
  onDismiss,
  onOpenChange,
  pauseOnFocus = true,
  pauseOnHover = true,
  role,
  showIcon = true,
  title,
  variant = 'brand',
}: ToastProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [isPaused, setIsPaused] = useState(false);
  const isControlled = isOpen !== undefined;
  const currentOpen = isOpen ?? uncontrolledOpen;
  const renderedActions = actions.slice(0, 2);
  const rootClassName = [
    'ds-toast',
    `ds-toast--variant-${variant}`,
    !children ? 'ds-toast--without-description' : undefined,
    renderedActions.length === 0 ? 'ds-toast--without-actions' : undefined,
    !showIcon ? 'ds-toast--without-icon' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const requestClose = useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(false);
    }

    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);

  useEffect(() => {
    if (!currentOpen || !autoDismiss || isPaused || duration <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      requestClose();
    }, duration);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [autoDismiss, currentOpen, duration, isPaused, requestClose]);

  if (!currentOpen) {
    return null;
  }

  return (
    <section
      aria-live={role === 'alert' || variant === 'negative' ? 'assertive' : 'polite'}
      className={rootClassName}
      onBlur={() => {
        if (pauseOnFocus) {
          setIsPaused(false);
        }
      }}
      onFocus={() => {
        if (pauseOnFocus) {
          setIsPaused(true);
        }
      }}
      onMouseEnter={() => {
        if (pauseOnHover) {
          setIsPaused(true);
        }
      }}
      onMouseLeave={() => {
        if (pauseOnHover) {
          setIsPaused(false);
        }
      }}
      role={role ?? getDefaultRole(variant)}
    >
      {showIcon ? (
        <span aria-hidden="true" className="ds-toast__icon">
          {icon ?? defaultIcons[variant]}
        </span>
      ) : null}

      <div className="ds-toast__content">
        <p className="ds-toast__title">{title}</p>
        {children ? <div className="ds-toast__description">{children}</div> : null}
      </div>

      {renderedActions.length > 0 ? (
        <div className="ds-toast__actions">
          {renderedActions.map(({ label, onClick, ...actionProps }, index) => (
            <button
              {...actionProps}
              className={[
                'ds-toast__action',
                index === 1 ? 'ds-toast__action--secondary' : 'ds-toast__action--primary',
              ]
                .filter(Boolean)
                .join(' ')}
              key={`${label}-${String(index)}`}
              onClick={onClick}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}

      {dismissible ? (
        <button
          aria-label={dismissLabel}
          className="ds-toast__dismiss"
          onClick={(event) => {
            requestClose();
            onDismiss?.(event);
          }}
          type="button"
        >
          <CloseIcon />
        </button>
      ) : null}
    </section>
  );
}
