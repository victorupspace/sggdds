import type { HTMLAttributes, ReactNode } from 'react';

export type DataTableSortDirection = 'asc' | 'desc';

export type DataTableTheme = 'default' | 'material' | 'rounded' | 'catppuccin' | 'crisp';

export type DataTableKey = string | number;

export type DataTableSortValue = string | number | boolean | Date | null | undefined;

export interface DataTableColumn<TData> {
  id?: string;
  name: ReactNode;
  selector?: (row: TData, rowIndex: number) => ReactNode;
  cell?: (row: TData, rowIndex: number) => ReactNode;
  sortAccessor?: (row: TData, rowIndex: number) => DataTableSortValue;
  sortFunction?: (a: TData, b: TData) => number;
  sortable?: boolean;
  omit?: boolean;
  right?: boolean;
  center?: boolean;
  wrap?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  grow?: number;
  hideBelow?: 'sm' | 'md' | 'lg';
  className?: string;
  headerClassName?: string;
  ariaLabel?: string;
}

export interface DataTableSelectionChange<TData> {
  allSelected: boolean;
  selectedCount: number;
  selectedRows: TData[];
  selectedRowKeys: DataTableKey[];
}

export interface DataTableLabels {
  table?: string;
  selectAllRows?: string;
  selectRow?: (rowIndex: number) => string;
  expandRow?: (rowIndex: number) => string;
  collapseRow?: (rowIndex: number) => string;
  sortColumn?: (columnName: string, direction: DataTableSortDirection) => string;
  rowsPerPage?: string;
  paginationRange?: (start: number, end: number, total: number) => string;
  noData?: string;
  loading?: string;
}

export interface DataTableProps<TData>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onSelect' | 'title'> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  keyField?: keyof TData | ((row: TData, rowIndex: number) => DataTableKey);
  title?: ReactNode;
  actions?: ReactNode;
  subHeader?: ReactNode;
  theme?: DataTableTheme;
  dense?: boolean;
  striped?: boolean;
  highlightOnHover?: boolean;
  animateRows?: boolean;
  persistTableHead?: boolean;
  progressPending?: boolean;
  progressComponent?: ReactNode;
  noDataComponent?: ReactNode;
  labels?: DataTableLabels;
  sortServer?: boolean;
  sortColumnId?: string;
  sortDirection?: DataTableSortDirection;
  defaultSortColumnId?: string;
  defaultSortDirection?: DataTableSortDirection;
  onSort?: (column: DataTableColumn<TData>, direction: DataTableSortDirection) => void;
  pagination?: boolean;
  paginationServer?: boolean;
  paginationPage?: number;
  paginationPerPage?: number;
  paginationRowsPerPageOptions?: number[];
  paginationTotalRows?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rowsPerPage: number, page: number) => void;
  selectableRows?: boolean;
  selectableRowDisabled?: (row: TData, rowIndex: number) => boolean;
  selectedRowKeys?: DataTableKey[];
  defaultSelectedRowKeys?: DataTableKey[];
  clearSelectedRows?: boolean;
  onSelectedRowsChange?: (state: DataTableSelectionChange<TData>) => void;
  expandableRows?: boolean;
  expandableRowsComponent?: (row: TData, rowIndex: number) => ReactNode;
  expandableRowDisabled?: (row: TData, rowIndex: number) => boolean;
  expandedRowKeys?: DataTableKey[];
  defaultExpandedRowKeys?: DataTableKey[];
  onRowExpandToggled?: (expanded: boolean, row: TData) => void;
  onRowClicked?: (row: TData, rowIndex: number) => void;
}
