import './Breadcrumb.styles.css';

import type { BreadcrumbItem, BreadcrumbProps } from './Breadcrumb.types';

/*
 * home [Material Symbols] — vetor exportado do Figma (Web Components /
 * Breadcrumbs, node 87:553). O path é idêntico ao asset (15 x 16.89 dentro da
 * caixa de 24px); a cor vem do CSS via currentColor.
 */
function HomeIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 15.3943H4.84625V9.452H10.1538V15.3943H13.5V6.39425L7.5 1.875L1.5 6.39425V15.3943ZM0 16.8943V5.64425L7.5 0L15 5.64425V16.8943H8.65375V10.952H6.34625V16.8943H0Z"
        fill="currentColor"
        transform="translate(4.5 3.6057)"
      />
    </svg>
  );
}

function BreadcrumbSeparator() {
  return (
    <span aria-hidden="true" className="ds-breadcrumb__separator">
      /
    </span>
  );
}

function getItemKey(item: BreadcrumbItem, index: number) {
  return item.id ?? item.href ?? `item-${String(index)}`;
}

export function Breadcrumb({
  ariaLabel = 'Breadcrumb',
  className,
  homeHref = '/',
  homeLabel = 'Inicio',
  items,
  showHome = true,
}: BreadcrumbProps) {
  const rootClassName = ['ds-breadcrumb', className].filter(Boolean).join(' ');
  const currentIndex = items.findIndex((item) => item.current);
  const resolvedItems = items.map((item, index) => ({
    ...item,
    current: currentIndex >= 0 ? index === currentIndex : index === items.length - 1,
  }));

  return (
    <nav aria-label={ariaLabel} className={rootClassName}>
      <ol className="ds-breadcrumb__list">
        {showHome ? (
          <li className="ds-breadcrumb__item">
            <a aria-label={homeLabel} className="ds-breadcrumb__home" href={homeHref}>
              <span aria-hidden="true" className="ds-breadcrumb__home-icon">
                <HomeIcon />
              </span>
            </a>
          </li>
        ) : null}

        {resolvedItems.map((item, index) => {
          const crumbClassName = [
            'ds-breadcrumb__crumb',
            item.current ? 'ds-breadcrumb__crumb--current' : undefined,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <li className="ds-breadcrumb__item" key={getItemKey(item, index)}>
              {showHome || index > 0 ? <BreadcrumbSeparator /> : null}

              {item.href && !item.current ? (
                <a aria-label={item.ariaLabel} className={crumbClassName} href={item.href}>
                  <span className="ds-breadcrumb__label">{item.label}</span>
                </a>
              ) : (
                <span
                  aria-current={item.current ? 'page' : undefined}
                  aria-label={item.ariaLabel}
                  className={crumbClassName}
                >
                  <span className="ds-breadcrumb__label">{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
