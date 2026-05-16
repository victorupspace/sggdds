import './Pagination.styles.css';

import type { ChangeEvent } from 'react';

import type { PaginationLabels, PaginationProps } from './Pagination.types';

type PaginationRangeItem = number | 'ellipsis-start' | 'ellipsis-end';

const defaultLabels: Required<PaginationLabels> = {
  ariaLabel: 'Paginacao',
  currentPage: (page) => `Pagina ${String(page)}, atual`,
  firstPage: 'Primeira pagina',
  lastPage: 'Ultima pagina',
  mobilePageSelect: 'Selecionar pagina',
  nextPage: 'Proxima pagina',
  page: (page) => `Ir para pagina ${String(page)}`,
  pageSelect: 'Pagina',
  pageStatus: (page, totalPages) => `Pagina ${String(page)} de ${String(totalPages)}`,
  previousPage: 'Pagina anterior',
  range: (start, end, total) => `${String(start)} - ${String(end)} de ${String(total)}`,
  resultsPerPage: 'Resultados por pagina',
};

function range(start: number, end: number) {
  const length = Math.max(end - start + 1, 0);

  return Array.from({ length }, (_, index) => start + index);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPageCount(
  totalPages: number | undefined,
  totalItems: number | undefined,
  pageSize: number,
) {
  if (typeof totalPages === 'number' && Number.isFinite(totalPages)) {
    return Math.max(Math.trunc(totalPages), 1);
  }

  if (typeof totalItems === 'number' && Number.isFinite(totalItems) && totalItems > 0) {
    return Math.max(Math.ceil(totalItems / pageSize), 1);
  }

  return 1;
}

function getPaginationItems({
  boundaryCount,
  page,
  siblingCount,
  totalPages,
}: {
  boundaryCount: number;
  page: number;
  siblingCount: number;
  totalPages: number;
}): PaginationRangeItem[] {
  const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 3;

  if (totalPages <= totalNumbers) {
    return range(1, totalPages);
  }

  const startPages = range(1, boundaryCount);
  const endPages = range(totalPages - boundaryCount + 1, totalPages);
  const siblingsStart = Math.max(
    Math.min(page - siblingCount, totalPages - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages[0] - 2,
  );
  const items: PaginationRangeItem[] = [...startPages];

  if (siblingsStart > boundaryCount + 2) {
    items.push('ellipsis-start');
  } else {
    items.push(...range(boundaryCount + 1, siblingsStart - 1));
  }

  items.push(...range(siblingsStart, siblingsEnd));

  if (siblingsEnd < totalPages - boundaryCount - 1) {
    items.push('ellipsis-end');
  } else {
    items.push(...range(siblingsEnd + 1, totalPages - boundaryCount));
  }

  items.push(...endPages);

  return items;
}

function FirstPageIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 5v14m11-2-5-5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function PreviousPageIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m15 6-6 6 6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function NextPageIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m9 6 6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function LastPageIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 5v14M7 7l5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m5 7 5 6 5-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PaginationSelect({
  ariaLabel,
  disabled,
  onChange,
  options,
  value,
}: {
  ariaLabel: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: number[];
  value: number;
}) {
  return (
    <span className="ds-pagination__select-control">
      <select
        aria-label={ariaLabel}
        className="ds-pagination__select"
        disabled={disabled}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="ds-pagination__select-icon">
        <ChevronDownIcon />
      </span>
    </span>
  );
}

export function Pagination({
  boundaryCount = 3,
  className,
  disabled = false,
  labels,
  onPageChange,
  onPageSizeChange,
  page,
  pageSize = 20,
  pageSizeOptions = [10, 20, 50, 100],
  showFirstLast = true,
  showPageSelect = false,
  showPageSize = false,
  showRange = false,
  siblingCount = 0,
  totalItems,
  totalPages,
}: PaginationProps) {
  const mergedLabels = { ...defaultLabels, ...labels };
  const safePageSize = Math.max(Math.trunc(pageSize), 1);
  const safeTotalPages = getPageCount(totalPages, totalItems, safePageSize);
  const currentPage = clamp(Math.trunc(page), 1, safeTotalPages);
  const safeBoundaryCount = clamp(Math.trunc(boundaryCount), 1, 3);
  const safeSiblingCount = clamp(Math.trunc(siblingCount), 0, 2);
  const paginationItems = getPaginationItems({
    boundaryCount: safeBoundaryCount,
    page: currentPage,
    siblingCount: safeSiblingCount,
    totalPages: safeTotalPages,
  });
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= safeTotalPages;
  const firstItem = totalItems && totalItems > 0 ? (currentPage - 1) * safePageSize + 1 : 0;
  const lastItem =
    totalItems && totalItems > 0 ? Math.min(currentPage * safePageSize, totalItems) : 0;
  const rootClassName = [
    'ds-pagination',
    showPageSize || showRange || showPageSelect ? 'ds-pagination--with-meta' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const goToPage = (nextPage: number) => {
    const safeNextPage = clamp(Math.trunc(nextPage), 1, safeTotalPages);

    if (disabled || safeNextPage === currentPage) {
      return;
    }

    onPageChange?.(safeNextPage);
  };

  return (
    <nav aria-label={mergedLabels.ariaLabel} className={rootClassName}>
      {showPageSize || showRange || showPageSelect ? (
        <div className="ds-pagination__meta">
          {showPageSize ? (
            <label className="ds-pagination__meta-item ds-pagination__meta-item--page-size">
              <span>{mergedLabels.resultsPerPage}:</span>
              <PaginationSelect
                ariaLabel={mergedLabels.resultsPerPage}
                disabled={disabled}
                onChange={(event) => {
                  onPageSizeChange?.(Number(event.currentTarget.value), event);
                }}
                options={pageSizeOptions}
                value={safePageSize}
              />
            </label>
          ) : null}

          {showRange && totalItems ? (
            <p className="ds-pagination__range">
              {mergedLabels.range(firstItem, lastItem, totalItems)}
            </p>
          ) : null}

          {showPageSelect ? (
            <label className="ds-pagination__meta-item ds-pagination__meta-item--page-select">
              <span>{mergedLabels.pageSelect}:</span>
              <PaginationSelect
                ariaLabel={mergedLabels.pageSelect}
                disabled={disabled}
                onChange={(event) => {
                  goToPage(Number(event.currentTarget.value));
                }}
                options={range(1, safeTotalPages)}
                value={currentPage}
              />
            </label>
          ) : null}
        </div>
      ) : null}

      <div className="ds-pagination__mobile-summary">
        <span className="ds-pagination__mobile-status">
          {mergedLabels.pageStatus(currentPage, safeTotalPages)}
        </span>
        <PaginationSelect
          ariaLabel={mergedLabels.mobilePageSelect}
          disabled={disabled}
          onChange={(event) => {
            goToPage(Number(event.currentTarget.value));
          }}
          options={range(1, safeTotalPages)}
          value={currentPage}
        />
      </div>

      <ol className="ds-pagination__list">
        {showFirstLast ? (
          <li className="ds-pagination__item ds-pagination__item--edge-control">
            <button
              aria-label={mergedLabels.firstPage}
              className="ds-pagination__control"
              disabled={disabled || isFirstPage}
              onClick={() => {
                goToPage(1);
              }}
              type="button"
            >
              <FirstPageIcon />
            </button>
          </li>
        ) : null}

        <li className="ds-pagination__item ds-pagination__item--previous-control">
          <button
            aria-label={mergedLabels.previousPage}
            className="ds-pagination__control"
            disabled={disabled || isFirstPage}
            onClick={() => {
              goToPage(currentPage - 1);
            }}
            type="button"
          >
            <PreviousPageIcon />
          </button>
        </li>

        {paginationItems.map((item) => {
          if (typeof item !== 'number') {
            return (
              <li className="ds-pagination__item ds-pagination__item--ellipsis" key={item}>
                <span className="ds-pagination__ellipsis" aria-hidden="true">
                  ...
                </span>
              </li>
            );
          }

          const isCurrent = item === currentPage;

          return (
            <li
              className={[
                'ds-pagination__item',
                'ds-pagination__item--page',
                isCurrent ? 'ds-pagination__item--current' : undefined,
              ]
                .filter(Boolean)
                .join(' ')}
              key={item}
            >
              <button
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={isCurrent ? mergedLabels.currentPage(item) : mergedLabels.page(item)}
                className="ds-pagination__page"
                disabled={disabled}
                onClick={() => {
                  goToPage(item);
                }}
                type="button"
              >
                {item}
              </button>
            </li>
          );
        })}

        <li className="ds-pagination__item ds-pagination__item--next-control">
          <button
            aria-label={mergedLabels.nextPage}
            className="ds-pagination__control"
            disabled={disabled || isLastPage}
            onClick={() => {
              goToPage(currentPage + 1);
            }}
            type="button"
          >
            <NextPageIcon />
          </button>
        </li>

        {showFirstLast ? (
          <li className="ds-pagination__item ds-pagination__item--edge-control">
            <button
              aria-label={mergedLabels.lastPage}
              className="ds-pagination__control"
              disabled={disabled || isLastPage}
              onClick={() => {
                goToPage(safeTotalPages);
              }}
              type="button"
            >
              <LastPageIcon />
            </button>
          </li>
        ) : null}
      </ol>
    </nav>
  );
}
