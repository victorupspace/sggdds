import './Accordion.styles.css';

import { createContext, useContext, useId, useMemo, useState } from 'react';

import type { AccordionItemProps, AccordionProps } from './Accordion.types';

interface AccordionContextValue {
  allowMultiple: boolean;
  expandedIds: string[];
  toggleItem: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function normalizeExpandedIds(ids: string[], allowMultiple: boolean) {
  const uniqueIds = Array.from(new Set(ids));

  return allowMultiple ? uniqueIds : uniqueIds.slice(0, 1);
}

export function Accordion({
  allowMultiple = false,
  children,
  className,
  defaultExpanded = [],
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState(() =>
    normalizeExpandedIds(defaultExpanded, allowMultiple),
  );

  const normalizedExpandedIds = normalizeExpandedIds(expandedIds, allowMultiple);

  const value = useMemo<AccordionContextValue>(
    () => ({
      allowMultiple,
      expandedIds: normalizedExpandedIds,
      toggleItem: (id) => {
        setExpandedIds((currentIds) => {
          const normalizedCurrentIds = normalizeExpandedIds(currentIds, allowMultiple);
          const isExpanded = normalizedCurrentIds.includes(id);

          if (isExpanded) {
            return normalizedCurrentIds.filter((currentId) => currentId !== id);
          }

          return allowMultiple ? [...normalizedCurrentIds, id] : [id];
        });
      },
    }),
    [allowMultiple, normalizedExpandedIds],
  );

  const rootClassName = ['ds-accordion', className].filter(Boolean).join(' ');

  return (
    <div className={rootClassName} data-allow-multiple={allowMultiple}>
      <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>
    </div>
  );
}

export function AccordionItem({
  children,
  className,
  disabled = false,
  id,
  title,
}: AccordionItemProps) {
  const context = useContext(AccordionContext);
  const generatedId = useId();

  if (!context) {
    throw new Error('AccordionItem must be used inside an Accordion.');
  }

  const isExpanded = context.expandedIds.includes(id);
  const buttonId = `${generatedId}-button`;
  const panelId = `${generatedId}-panel`;
  const rootClassName = [
    'ds-accordion__item',
    isExpanded ? 'ds-accordion__item--expanded' : undefined,
    disabled ? 'ds-accordion__item--disabled' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName} data-accordion-item-id={id}>
      <h3 className="ds-accordion__heading">
        <button
          aria-controls={panelId}
          aria-expanded={isExpanded}
          className="ds-accordion__trigger"
          disabled={disabled}
          id={buttonId}
          onClick={() => {
            if (!disabled) {
              context.toggleItem(id);
            }
          }}
          type="button"
        >
          <span className="ds-accordion__title">{title}</span>
          <span className="ds-accordion__chevron" aria-hidden="true">
            <svg className="ds-accordion__chevron-icon" fill="none" viewBox="0 0 20 20">
              <path
                d="m5 7.5 5 5 5-5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </span>
        </button>
      </h3>

      <div
        aria-hidden={!isExpanded}
        aria-labelledby={buttonId}
        className="ds-accordion__panel"
        id={panelId}
        role="region"
      >
        <div className="ds-accordion__panel-inner">{children}</div>
      </div>
    </div>
  );
}
