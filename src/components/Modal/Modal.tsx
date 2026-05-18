import './Modal.styles.css';

import { useEffect, useId, useRef } from 'react';

import type { ModalProps } from './Modal.types';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [];
  }

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
  );
}

export function Modal({
  actions = [],
  children,
  className,
  closeLabel = 'Fechar modal',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  footer,
  isOpen,
  onClose,
  size = 'md',
  subtitle,
  title,
}: ModalProps) {
  const titleId = useId();
  const subtitleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const mouseDownStartedOnOverlayRef = useRef(false);
  const renderedActions = actions.slice(0, 3);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') {
      return;
    }

    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const focusFrame = window.requestAnimationFrame(() => {
      const focusableElements = getFocusableElements(dialogRef.current);

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
        return;
      }

      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = bodyOverflow;
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEsc) {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements(dialogRef.current);

      if (focusableElements.length === 0) {
        event.preventDefault();
        closeButtonRef.current?.focus();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOnEsc, isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const rootClassName = [
    'ds-modal',
    `ds-modal--size-${size}`,
    subtitle ? 'ds-modal--with-subtitle' : undefined,
    !children ? 'ds-modal--without-body' : undefined,
    !footer && renderedActions.length === 0 ? 'ds-modal--without-footer' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const footerContent =
    footer ??
    (renderedActions.length > 0 ? (
      <>
        {renderedActions.map(({ label, onClick, variant = 'primary', ...actionProps }, index) => (
          <button
            {...actionProps}
            className={`ds-modal__action ds-modal__action--${variant}`}
            key={`${label}-${String(index)}`}
            onClick={onClick}
            type="button"
          >
            {label}
          </button>
        ))}
      </>
    ) : null);

  return (
    <div
      className={rootClassName}
      onClick={(event) => {
        if (
          closeOnOverlayClick &&
          mouseDownStartedOnOverlayRef.current &&
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
      onMouseDown={(event) => {
        mouseDownStartedOnOverlayRef.current = event.target === event.currentTarget;
      }}
    >
      <div
        aria-describedby={subtitle ? subtitleId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className="ds-modal__dialog"
        ref={dialogRef}
        role="dialog"
      >
        <header className="ds-modal__header">
          <div className="ds-modal__heading">
            <h2 className="ds-modal__title" id={titleId}>
              {title}
            </h2>
            {subtitle ? (
              <p className="ds-modal__subtitle" id={subtitleId}>
                {subtitle}
              </p>
            ) : null}
          </div>
          <button
            aria-label={closeLabel}
            className="ds-modal__close"
            onClick={onClose}
            ref={closeButtonRef}
            type="button"
          >
            <svg aria-hidden="true" className="ds-modal__close-icon" fill="none" viewBox="0 0 20 20">
              <path
                d="m5 5 10 10M15 5 5 15"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </header>

        <div className="ds-modal__body">{children}</div>

        {footerContent ? <footer className="ds-modal__footer">{footerContent}</footer> : null}
      </div>
    </div>
  );
}
