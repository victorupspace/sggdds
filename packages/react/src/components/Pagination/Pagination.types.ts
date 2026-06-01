import type { ChangeEvent } from 'react';

export interface PaginationLabels {
  ariaLabel?: string;
  firstPage?: string;
  previousPage?: string;
  nextPage?: string;
  lastPage?: string;
  page?: (page: number) => string;
  currentPage?: (page: number) => string;
  resultsPerPage?: string;
  pageSelect?: string;
  mobilePageSelect?: string;
  pageStatus?: (page: number, totalPages: number) => string;
  range?: (start: number, end: number, total: number) => string;
}

export interface PaginationProps {
  page: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  siblingCount?: number;
  boundaryCount?: number;
  disabled?: boolean;
  showFirstLast?: boolean;
  showPageSize?: boolean;
  showPageSelect?: boolean;
  showRange?: boolean;
  className?: string;
  labels?: PaginationLabels;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number, event: ChangeEvent<HTMLSelectElement>) => void;
}
