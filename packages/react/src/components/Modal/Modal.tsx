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
    (element) =>
      !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true',
  );
}

/* close [outlined] — vetor exportado do Figma (Web Components / Modal, node 40000490:59311) */
function CloseIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.275 18.525L5.475 17.725L11.2 12L5.475 6.275L6.275 5.475L12 11.2L17.725 5.475L18.525 6.275L12.8 12L18.525 17.725L17.725 18.525L12 12.8L6.275 18.525Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Modal({
  children,
  className,
  closeLabel = 'Fechar modal',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  footer,
  isOpen,
  onClose,
  size = 'small',
  subheader,
  title,
}: ModalProps) {
  const titleId = useId();
  const subheaderId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const mouseDownStartedOnOverlayRef = useRef(false);

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

  const rootClassName = ['ds-modal', `ds-modal--size-${size}`, className].filter(Boolean).join(' ');

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
        aria-describedby={subheader ? subheaderId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className="ds-modal__dialog"
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label={closeLabel}
          className="ds-modal__close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <CloseIcon />
        </button>

        <header className="ds-modal__header">
          <h2 className="ds-modal__title" id={titleId}>
            {title}
          </h2>
          {subheader ? (
            <div className="ds-modal__subheader" id={subheaderId}>
              {subheader}
            </div>
          ) : null}
        </header>

        {children ? <div className="ds-modal__body">{children}</div> : null}

        {footer ? <footer className="ds-modal__footer">{footer}</footer> : null}
      </div>
    </div>
  );
}
