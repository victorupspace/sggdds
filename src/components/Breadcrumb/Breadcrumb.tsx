import './Breadcrumb.styles.css';

import type { ReactNode } from 'react';

import type {
  BreadcrumbItem,
  BreadcrumbMaxVisibleItems,
  BreadcrumbProps,
} from './Breadcrumb.types';

interface InternalBreadcrumbItem extends BreadcrumbItem {
  kind?: 'home' | 'item';
}

function HomeIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 10.8 12 4l8 6.8V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SeparatorIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m6 4 4 4-4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function BreadcrumbSeparator() {
  return (
    <span className="ds-breadcrumb__separator" aria-hidden="true">
      <SeparatorIcon />
    </span>
  );
}

function getItemKey(item: InternalBreadcrumbItem, index: number) {
  if (item.id) {
    return item.id;
  }

  if (item.href) {
    return item.href;
  }

  return `${item.kind ?? 'item'}-${String(index)}`;
}

function getVisibleParts(
  items: InternalBreadcrumbItem[],
  maxVisibleItems: BreadcrumbMaxVisibleItems,
) {
  if (items.length <= maxVisibleItems) {
    return {
      collapsedItems: [],
      visibleItems: items,
    };
  }

  const trailingCount = Math.max(1, maxVisibleItems - 2);
  const trailingStartIndex = items.length - trailingCount;

  return {
    collapsedItems: items.slice(1, trailingStartIndex),
    visibleItems: [items[0], ...items.slice(trailingStartIndex)],
  };
}

function BreadcrumbContent({ children, isHome }: { children: ReactNode; isHome: boolean }) {
  if (isHome) {
    return (
      <span className="ds-breadcrumb__home-icon">
        <HomeIcon />
      </span>
    );
  }

  return <span className="ds-breadcrumb__label">{children}</span>;
}

function BreadcrumbCrumb({
  item,
  isCurrent,
  isMenuItem = false,
}: {
  item: InternalBreadcrumbItem;
  isCurrent: boolean;
  isMenuItem?: boolean;
}) {
  const isHome = item.kind === 'home';
  const className = [
    'ds-breadcrumb__crumb',
    isHome ? 'ds-breadcrumb__crumb--home' : undefined,
    isCurrent ? 'ds-breadcrumb__crumb--current' : undefined,
    item.disabled ? 'ds-breadcrumb__crumb--disabled' : undefined,
    isMenuItem ? 'ds-breadcrumb__crumb--menu-item' : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  if (item.href && !isCurrent && !item.disabled) {
    return (
      <a aria-label={item.ariaLabel} className={className} href={item.href}>
        <BreadcrumbContent isHome={isHome}>{item.label}</BreadcrumbContent>
      </a>
    );
  }

  return (
    <span
      aria-current={isCurrent ? 'page' : undefined}
      aria-disabled={item.disabled ? 'true' : undefined}
      aria-label={item.ariaLabel}
      className={className}
    >
      <BreadcrumbContent isHome={isHome}>{item.label}</BreadcrumbContent>
    </span>
  );
}

function BreadcrumbOverflow({ items, label }: { items: InternalBreadcrumbItem[]; label: string }) {
  return (
    <details className="ds-breadcrumb__overflow">
      <summary className="ds-breadcrumb__overflow-trigger" aria-label={label}>
        <span aria-hidden="true">...</span>
      </summary>
      <div className="ds-breadcrumb__overflow-menu">
        {items.map((item, index) => (
          <BreadcrumbCrumb isMenuItem item={item} isCurrent={false} key={getItemKey(item, index)} />
        ))}
      </div>
    </details>
  );
}

export function Breadcrumb({
  ariaLabel = 'Breadcrumb',
  className,
  collapseLabel = 'Mostrar niveis intermediarios',
  homeHref = '/',
  homeLabel = 'Inicio',
  items,
  maxVisibleItems = 8,
  showHome = true,
}: BreadcrumbProps) {
  const rootClassName = ['ds-breadcrumb', className].filter(Boolean).join(' ');
  const currentIndex = items.findIndex((item) => item.current);
  const resolvedItems = items.map((item, index) => ({
    ...item,
    current: currentIndex >= 0 ? index === currentIndex : index === items.length - 1,
    kind: 'item' as const,
  }));
  const allItems: InternalBreadcrumbItem[] = showHome
    ? [{ ariaLabel: homeLabel, href: homeHref, label: homeLabel, kind: 'home' }, ...resolvedItems]
    : resolvedItems;
  const { collapsedItems, visibleItems } = getVisibleParts(allItems, maxVisibleItems);
  const currentItem = allItems.find((item) => item.current) ?? allItems[allItems.length - 1];

  return (
    <nav aria-label={ariaLabel} className={rootClassName}>
      <ol className="ds-breadcrumb__list">
        {visibleItems.map((item, index) => {
          const isCurrent = item === currentItem;
          const shouldRenderOverflow = index === 1 && collapsedItems.length > 0;

          return (
            <li className="ds-breadcrumb__item" key={getItemKey(item, index)}>
              {index > 0 ? <BreadcrumbSeparator /> : null}
              {shouldRenderOverflow ? (
                <>
                  <BreadcrumbOverflow items={collapsedItems} label={collapseLabel} />
                  <BreadcrumbSeparator />
                </>
              ) : null}
              <BreadcrumbCrumb item={item} isCurrent={isCurrent} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
