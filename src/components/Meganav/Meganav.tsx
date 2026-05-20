import './Meganav.styles.css';

import { useCallback, useEffect, useId, useRef, useState } from 'react';

import type { MouseEvent } from 'react';
import type {
  MeganavFeatured,
  MeganavFeaturedAction,
  MeganavIcon,
  MeganavItem,
  MeganavProps,
} from './Meganav.types';

const defaultItems: MeganavItem[] = [
  {
    description: 'Noticias, comunicados e atualizacoes de servicos.',
    href: '#noticias',
    icon: 'article',
    label: 'Noticias',
  },
  {
    description: 'Guias para solicitar, acompanhar e concluir atendimentos.',
    href: '#servicos',
    icon: 'bolt',
    label: 'Servicos digitais',
  },
  {
    description: 'Videos curtos sobre jornadas e recursos do portal.',
    href: '#tutoriais',
    icon: 'play_circle',
    label: 'Tutoriais',
  },
];

function MaterialSymbol({ children }: { children: string }) {
  return (
    <span className="ds-meganav__material-symbol" aria-hidden="true">
      {children}
    </span>
  );
}

function MeganavIconSlot({ icon }: { icon?: MeganavIcon }) {
  if (!icon) {
    return null;
  }

  return (
    <span className="ds-meganav__icon" aria-hidden="true">
      {typeof icon === 'string' ? <MaterialSymbol>{icon}</MaterialSymbol> : icon}
    </span>
  );
}

function getActionRel(target: string | undefined, rel: string | undefined) {
  return target === '_blank' && rel == null ? 'noopener noreferrer' : rel;
}

function renderActionContent(label: string) {
  return (
    <>
      <span>{label}</span>
      <span className="ds-meganav__action-icon" aria-hidden="true">
        <MaterialSymbol>chevron_right</MaterialSymbol>
      </span>
    </>
  );
}

function MeganavFeaturedActionLink({ action }: { action: MeganavFeaturedAction }) {
  const className = 'ds-meganav__featured-action';
  const content = renderActionContent(action.label);

  if (action.href) {
    return (
      <a
        className={className}
        href={action.href}
        onClick={action.onClick}
        rel={getActionRel(action.target, action.rel)}
        target={action.target}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={className} onClick={action.onClick} type="button">
      {content}
    </button>
  );
}

function MeganavItemLink({ item }: { item: MeganavItem }) {
  const nestedItems = item.items ?? item.children;
  const hasNestedItems = Boolean(nestedItems?.length);
  const content = (
    <>
      <MeganavIconSlot icon={item.icon ?? (hasNestedItems ? 'folder_open' : 'chevron_right')} />
      <span className="ds-meganav__item-copy">
        <span className="ds-meganav__item-label">{item.label}</span>
        {item.description ? (
          <span className="ds-meganav__item-description">{item.description}</span>
        ) : null}
      </span>
    </>
  );

  if (item.href) {
    return (
      <a
        aria-current={item.current ? 'page' : undefined}
        className="ds-meganav__item-link"
        href={item.href}
        onClick={item.onClick}
        rel={getActionRel(item.target, item.rel)}
        target={item.target}
      >
        {content}
      </a>
    );
  }

  if (item.onClick) {
    return (
      <button className="ds-meganav__item-link" onClick={item.onClick} type="button">
        {content}
      </button>
    );
  }

  return <div className="ds-meganav__item-link ds-meganav__item-link--static">{content}</div>;
}

function MeganavItemGroup({ item }: { item: MeganavItem }) {
  const nestedItems = item.items ?? item.children;

  return (
    <li className="ds-meganav__item">
      <MeganavItemLink item={item} />

      {nestedItems?.length ? (
        <ul className="ds-meganav__nested-list">
          {nestedItems.map((nestedItem) => (
            <li className="ds-meganav__nested-item" key={`${item.label}-${nestedItem.label}`}>
              <MeganavItemLink item={nestedItem} />
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function MeganavFeaturedPanel({ featured }: { featured: MeganavFeatured }) {
  const media = featured.imageSrc ? (
    <img
      alt={featured.imageAlt ?? ''}
      className="ds-meganav__featured-image"
      src={featured.imageSrc}
    />
  ) : (
    <span className="ds-meganav__featured-media-placeholder" aria-hidden="true">
      <MeganavIconSlot icon={featured.mediaIcon ?? 'play_circle'} />
    </span>
  );
  const content = (
    <>
      <span className="ds-meganav__featured-media">{media}</span>
      <span className="ds-meganav__featured-copy">
        {featured.eyebrow ? (
          <span className="ds-meganav__featured-eyebrow">{featured.eyebrow}</span>
        ) : null}
        <span className="ds-meganav__featured-title">{featured.title}</span>
        {featured.description ? (
          <span className="ds-meganav__featured-description">{featured.description}</span>
        ) : null}
      </span>
    </>
  );

  return (
    <aside className="ds-meganav__featured" aria-label={featured.title}>
      {featured.href ? (
        <a className="ds-meganav__featured-link" href={featured.href}>
          {content}
        </a>
      ) : (
        <div className="ds-meganav__featured-link">{content}</div>
      )}

      {featured.actions?.length ? (
        <div className="ds-meganav__featured-actions">
          {featured.actions.map((action) => (
            <MeganavFeaturedActionLink action={action} key={action.label} />
          ))}
        </div>
      ) : null}
    </aside>
  );
}

function TriggerIcon({ open, triggerIcon }: { open: boolean; triggerIcon?: MeganavIcon }) {
  if (triggerIcon) {
    return <MeganavIconSlot icon={triggerIcon} />;
  }

  return (
    <span className="ds-meganav__trigger-symbol" aria-hidden="true">
      <MaterialSymbol>{open ? 'close' : 'apps'}</MaterialSymbol>
    </span>
  );
}

export function Meganav({
  align = 'start',
  ariaLabel = 'Navegacao principal',
  className,
  closeLabel = 'Fechar navegacao',
  defaultOpen = false,
  drawerClassName,
  featured,
  items = defaultItems,
  mobileTitle,
  onOpenChange,
  open,
  triggerAriaLabel,
  triggerIcon,
  triggerLabel = 'Menu',
  triggerVariant = 'button',
}: MeganavProps) {
  const generatedId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const drawerId = `${generatedId}-drawer`;
  const resolvedTriggerLabel = triggerAriaLabel ?? triggerLabel;
  const drawerBodyClassName = [
    'ds-meganav__drawer-body',
    featured ? 'ds-meganav__drawer-body--with-featured' : undefined,
  ]
    .filter(Boolean)
    .join(' ');
  const rootClassName = [
    'ds-meganav',
    `ds-meganav--align-${align}`,
    `ds-meganav--trigger-${triggerVariant}`,
    isOpen ? 'ds-meganav--open' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const drawerClassNames = ['ds-meganav__drawer', drawerClassName].filter(Boolean).join(' ');

  const updateOpen = useCallback(
    (nextOpen: boolean) => {
      if (open == null) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [onOpenChange, open],
  );

  function handleActionClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (target.closest('a, button')) {
      updateOpen(false);
    }
  }

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') {
      return undefined;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && !rootRef.current?.contains(target)) {
        updateOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        updateOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, updateOpen]);

  return (
    <div className={rootClassName} ref={rootRef}>
      <button
        aria-controls={drawerId}
        aria-expanded={isOpen}
        aria-label={resolvedTriggerLabel}
        className="ds-meganav__trigger"
        onClick={() => {
          updateOpen(!isOpen);
        }}
        type="button"
      >
        <TriggerIcon open={isOpen} triggerIcon={triggerIcon} />
        <span className="ds-meganav__trigger-label">{triggerLabel}</span>
        <span className="ds-meganav__trigger-caret" aria-hidden="true">
          <MaterialSymbol>keyboard_arrow_down</MaterialSymbol>
        </span>
      </button>

      {isOpen ? (
        <>
          <div className="ds-meganav__scrim" aria-hidden="true" />

          <div className={drawerClassNames} id={drawerId} onClick={handleActionClick}>
            <div className="ds-meganav__drawer-header">
              <span className="ds-meganav__drawer-title">{mobileTitle ?? triggerLabel}</span>
              <button
                aria-label={closeLabel}
                className="ds-meganav__close"
                onClick={() => {
                  updateOpen(false);
                }}
                type="button"
              >
                <MaterialSymbol>close</MaterialSymbol>
              </button>
            </div>

            <div className={drawerBodyClassName}>
              <nav aria-label={ariaLabel} className="ds-meganav__nav">
                <ul className="ds-meganav__list">
                  {items.map((item) => (
                    <MeganavItemGroup item={item} key={item.label} />
                  ))}
                </ul>
              </nav>

              {featured ? <MeganavFeaturedPanel featured={featured} /> : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
