import './Accordion.styles.css';

import { createContext, useContext, useId, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';

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
  background = 'white',
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

  const rootClassName = [
    'ds-accordion',
    background === 'inverse' ? 'ds-accordion--inverse' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName} data-allow-multiple={allowMultiple}>
      <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>
    </div>
  );
}

export function AccordionItem({
  action,
  badge,
  children,
  className,
  disabled = false,
  id,
  leading,
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

  const handleHeaderClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return;
    }

    // O trigger acessível é o botão do título; badge e ação são interativos
    // próprios. Cliques no restante do header (chevron, área vazia) também
    // alternam o item, sem duplicar o clique do trigger.
    const target = event.target as HTMLElement;
    if (target.closest('.ds-accordion__trigger, .ds-accordion__actions')) {
      return;
    }

    context.toggleItem(id);
  };

  return (
    <div className={rootClassName} data-accordion-item-id={id}>
      <div className="ds-accordion__header" onClick={handleHeaderClick}>
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
            {leading ? <span className="ds-accordion__leading">{leading}</span> : null}
            <span className="ds-accordion__title">{title}</span>
          </button>
        </h3>

        {badge || action ? (
          <div className="ds-accordion__actions">
            {badge}
            {action}
          </div>
        ) : null}

        <span className="ds-accordion__chevron" aria-hidden="true">
          {/* expand_more [outlined] — vetor exportado do Figma (node 40000056:4343) */}
          <svg className="ds-accordion__chevron-icon" fill="none" viewBox="0 0 32 32">
            <path
              d="M16 20.0667L8.46667 12.5L9.53333 11.4333L16 17.9L22.4667 11.4333L23.5333 12.5333L16 20.0667Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>

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
