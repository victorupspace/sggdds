import './Alert.styles.css';

import { useState } from 'react';

import type { ReactNode } from 'react';
import type { AlertProps, AlertVariant } from './Alert.types';

function InformationIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" fill="currentColor" r="9" />
      <path
        d="M10 8.8v5M10 5.9v.2"
        stroke="var(--alert-icon-mark)"
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
        stroke="var(--alert-icon-mark)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.6 3.1a1.6 1.6 0 0 1 2.8 0l7 12.2a1.6 1.6 0 0 1-1.4 2.4H3a1.6 1.6 0 0 1-1.4-2.4l7-12.2Z"
        fill="currentColor"
      />
      <path
        d="M10 7.4v4.1M10 14.4v.1"
        stroke="var(--alert-icon-mark)"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" fill="currentColor" r="9" />
      <path
        d="M10 5.8v5M10 14.1v.1"
        stroke="var(--alert-icon-mark)"
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

const defaultIcons: Record<AlertVariant, ReactNode> = {
  critical: <ErrorIcon />,
  error: <ErrorIcon />,
  information: <InformationIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
};

function getDefaultRole(variant: AlertVariant): AlertProps['role'] {
  if (variant === 'error' || variant === 'critical') {
    return 'alert';
  }

  return 'status';
}

export function Alert({
  actions = [],
  children,
  className,
  defaultVisible = true,
  dismissible = true,
  dismissLabel = 'Dispensar alerta',
  icon,
  isVisible,
  onDismiss,
  onVisibleChange,
  role,
  showIcon = true,
  title,
  variant = 'information',
}: AlertProps) {
  const [uncontrolledVisible, setUncontrolledVisible] = useState(defaultVisible);
  const isControlled = isVisible !== undefined;
  const currentVisible = isVisible ?? uncontrolledVisible;
  const renderedActions = actions.slice(0, 2);
  const rootClassName = [
    'ds-alert',
    `ds-alert--variant-${variant}`,
    !children ? 'ds-alert--without-description' : undefined,
    renderedActions.length === 0 ? 'ds-alert--without-actions' : undefined,
    !showIcon ? 'ds-alert--without-icon' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (!currentVisible) {
    return null;
  }

  return (
    <section className={rootClassName} role={role ?? getDefaultRole(variant)}>
      {showIcon ? (
        <span aria-hidden="true" className="ds-alert__icon">
          {icon ?? defaultIcons[variant]}
        </span>
      ) : null}

      <div className="ds-alert__content">
        <p className="ds-alert__title">{title}</p>
        {children ? <div className="ds-alert__description">{children}</div> : null}
      </div>

      {renderedActions.length > 0 ? (
        <div className="ds-alert__actions">
          {renderedActions.map(({ label, onClick, ...actionProps }, index) => (
            <button
              {...actionProps}
              className="ds-alert__action"
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
          className="ds-alert__dismiss"
          onClick={(event) => {
            if (!isControlled) {
              setUncontrolledVisible(false);
            }

            onVisibleChange?.(false);
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
