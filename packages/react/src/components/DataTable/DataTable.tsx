import './DataTable.styles.css';

import { Fragment, useMemo, useState } from 'react';

import type { CSSProperties } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Pagination } from '../Pagination';
import type {
  DataTableColumn,
  DataTableKey,
  DataTableLabels,
  DataTableProps,
  DataTableSortDirection,
  DataTableSortValue,
} from './DataTable.types';

const defaultLabels: Required<DataTableLabels> = {
  collapseRow: (rowIndex) => `Recolher linha ${String(rowIndex + 1)}`,
  expandRow: (rowIndex) => `Expandir linha ${String(rowIndex + 1)}`,
  loading: 'Carregando dados',
  noData: 'Nenhum dado encontrado',
  paginationRange: (start, end, total) => `${String(start)}-${String(end)} de ${String(total)}`,
  rowsPerPage: 'Linhas por pagina',
  selectAllRows: 'Selecionar linhas visiveis',
  selectRow: (rowIndex) => `Selecionar linha ${String(rowIndex + 1)}`,
  sortColumn: (columnName, direction) =>
    `Ordenar ${columnName} em ordem ${direction === 'asc' ? 'crescente' : 'decrescente'}`,
  table: 'Tabela de dados',
};

function normalizeKey(key: DataTableKey) {
  return String(key);
}

function getColumnId<TData>(column: DataTableColumn<TData>, index: number) {
  return column.id ?? (typeof column.name === 'string' ? column.name : `column-${String(index)}`);
}

function getColumnLabel<TData>(column: DataTableColumn<TData>) {
  if (typeof column.name === 'string') {
    return column.name;
  }

  return column.ariaLabel ?? 'coluna';
}

function getRowKey<TData>(
  row: TData,
  rowIndex: number,
  keyField: DataTableProps<TData>['keyField'],
): DataTableKey {
  if (typeof keyField === 'function') {
    return keyField(row, rowIndex);
  }

  if (keyField && row && typeof row === 'object' && keyField in row) {
    return (row as Record<PropertyKey, unknown>)[keyField] as DataTableKey;
  }

  if (row && typeof row === 'object' && 'id' in row) {
    return (row as Record<PropertyKey, unknown>).id as DataTableKey;
  }

  return rowIndex;
}

function compareSortValues(aValue: DataTableSortValue, bValue: DataTableSortValue) {
  if (aValue == null && bValue == null) {
    return 0;
  }

  if (aValue == null) {
    return -1;
  }

  if (bValue == null) {
    return 1;
  }

  const normalizedA = aValue instanceof Date ? aValue.getTime() : aValue;
  const normalizedB = bValue instanceof Date ? bValue.getTime() : bValue;

  if (typeof normalizedA === 'number' && typeof normalizedB === 'number') {
    return normalizedA - normalizedB;
  }

  if (typeof normalizedA === 'boolean' && typeof normalizedB === 'boolean') {
    return Number(normalizedA) - Number(normalizedB);
  }

  return String(normalizedA).localeCompare(String(normalizedB), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

function getSelectorSortValue<TData>(column: DataTableColumn<TData>, row: TData, rowIndex: number) {
  const value = column.selector?.(row, rowIndex);

  if (
    value == null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value;
  }

  return undefined;
}

function getColumnStyle<TData>(column: DataTableColumn<TData>) {
  return {
    maxWidth: column.maxWidth,
    minWidth: column.minWidth ?? 'var(--data-table-column-min-width)',
    width: column.width,
  } as CSSProperties;
}

function getColumnGroupStyle<TData>(column: DataTableColumn<TData>) {
  return {
    width: column.width ?? column.minWidth ?? 'var(--data-table-column-min-width)',
  } as CSSProperties;
}

function getRowStyle(rowIndex: number) {
  return {
    '--data-table-row-index': rowIndex,
  } as CSSProperties & Record<'--data-table-row-index', number>;
}

function getDomSafeId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, '-') || 'row';
}

function SortIcon({ direction }: { direction?: DataTableSortDirection }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 7h10M7 10h6M9 13h2"
        opacity={direction ? 0 : 1}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <path
        d={direction === 'desc' ? 'M10 4v11m0 0 4-4m-4 4-4-4' : 'M10 16V5m0 0 4 4m-4-4-4 4'}
        opacity={direction ? 1 : 0}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d={expanded ? 'm5 12 5-5 5 5' : 'm5 8 5 5 5-5'}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function DataTableCheckbox({
  checked,
  disabled,
  indeterminate,
  label,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <span
      className="ds-data-table__checkbox-shell"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Checkbox
        checked={checked}
        className="ds-data-table__checkbox"
        disabled={disabled}
        indeterminate={indeterminate}
        label={label}
        onCheckedChange={onChange}
      />
    </span>
  );
}

export function DataTable<TData>({
  actions,
  animateRows = false,
  className,
  clearSelectedRows = false,
  columns,
  data,
  defaultExpandedRowKeys,
  defaultSelectedRowKeys,
  defaultSortColumnId,
  defaultSortDirection = 'asc',
  dense = false,
  expandableRowDisabled,
  expandableRows = false,
  expandableRowsComponent,
  expandedRowKeys,
  highlightOnHover = true,
  keyField,
  labels,
  noDataComponent,
  onChangePage,
  onChangeRowsPerPage,
  onRowClicked,
  onRowExpandToggled,
  onSelectedRowsChange,
  onSort,
  pagination = false,
  paginationPage,
  paginationPerPage,
  paginationRowsPerPageOptions = [5, 10, 20, 50],
  paginationServer = false,
  paginationTotalRows,
  persistTableHead = true,
  progressComponent,
  progressPending = false,
  selectableRowDisabled,
  selectableRows = false,
  selectedRowKeys,
  sortColumnId,
  sortDirection,
  sortServer = false,
  striped = false,
  style,
  subHeader,
  theme = 'default',
  title,
  ...rest
}: DataTableProps<TData>) {
  const mergedLabels = { ...defaultLabels, ...labels };
  const visibleColumns = useMemo(() => columns.filter((column) => !column.omit), [columns]);
  const [internalSort, setInternalSort] = useState<{
    columnId?: string;
    direction: DataTableSortDirection;
  }>({
    columnId: defaultSortColumnId,
    direction: defaultSortDirection,
  });
  const [internalPage, setInternalPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(paginationPerPage ?? 10);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<string>>(
    () => new Set(defaultSelectedRowKeys?.map(normalizeKey)),
  );
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<Set<string>>(
    () => new Set(defaultExpandedRowKeys?.map(normalizeKey)),
  );

  const activeSortColumnId = sortColumnId ?? internalSort.columnId;
  const activeSortDirection = sortDirection ?? internalSort.direction;
  const currentPage = paginationPage ?? internalPage;
  const pageSize = paginationPerPage ?? internalPageSize;
  const selectedKeys = useMemo(() => {
    if (selectedRowKeys) {
      return new Set(selectedRowKeys.map(normalizeKey));
    }

    return clearSelectedRows ? new Set<string>() : new Set(internalSelectedKeys);
  }, [clearSelectedRows, internalSelectedKeys, selectedRowKeys]);
  const expandedKeys = useMemo(
    () => new Set(expandedRowKeys ? expandedRowKeys.map(normalizeKey) : internalExpandedKeys),
    [expandedRowKeys, internalExpandedKeys],
  );

  const rowsWithKeys = useMemo(
    () =>
      data.map((row, index) => ({
        disabled: selectableRowDisabled?.(row, index) ?? false,
        expansionDisabled: expandableRowDisabled?.(row, index) ?? false,
        index,
        key: normalizeKey(getRowKey(row, index, keyField)),
        row,
      })),
    [data, expandableRowDisabled, keyField, selectableRowDisabled],
  );

  const sortedRows = useMemo(() => {
    if (sortServer || !activeSortColumnId) {
      return rowsWithKeys;
    }

    const column = visibleColumns.find((item, index) => getColumnId(item, index) === activeSortColumnId);

    if (!column?.sortable) {
      return rowsWithKeys;
    }

    return [...rowsWithKeys].sort((a, b) => {
      const result = column.sortFunction
        ? column.sortFunction(a.row, b.row)
        : compareSortValues(
            column.sortAccessor?.(a.row, a.index) ?? getSelectorSortValue(column, a.row, a.index),
            column.sortAccessor?.(b.row, b.index) ?? getSelectorSortValue(column, b.row, b.index),
          );

      return activeSortDirection === 'asc' ? result : result * -1;
    });
  }, [activeSortColumnId, activeSortDirection, rowsWithKeys, sortServer, visibleColumns]);

  const totalRows = paginationTotalRows ?? sortedRows.length;
  const firstPageRow = (currentPage - 1) * pageSize;
  const paginatedRows =
    pagination && !paginationServer ? sortedRows.slice(firstPageRow, firstPageRow + pageSize) : sortedRows;
  const selectableVisibleRows = paginatedRows.filter((item) => !item.disabled);
  const selectedVisibleCount = selectableVisibleRows.filter((item) => selectedKeys.has(item.key)).length;
  const allVisibleSelected =
    selectableVisibleRows.length > 0 && selectedVisibleCount === selectableVisibleRows.length;
  const someVisibleSelected = selectedVisibleCount > 0 && !allVisibleSelected;
  const controlColumnCount = (selectableRows ? 1 : 0) + (expandableRows ? 1 : 0);
  const rootClassName = [
    'ds-data-table',
    `ds-data-table--theme-${theme}`,
    dense ? 'ds-data-table--dense' : undefined,
    striped ? 'ds-data-table--striped' : undefined,
    highlightOnHover ? 'ds-data-table--highlight' : undefined,
    animateRows ? 'ds-data-table--animated' : undefined,
    progressPending ? 'ds-data-table--loading' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const tableColumnCount = visibleColumns.length + controlColumnCount;

  const emitSelectionChange = (nextKeys: Set<string>) => {
    const selectedRowsState = rowsWithKeys.filter((item) => nextKeys.has(item.key)).map((item) => item.row);
    const selectedRowKeysState = rowsWithKeys
      .filter((item) => nextKeys.has(item.key))
      .map((item) => getRowKey(item.row, item.index, keyField));

    onSelectedRowsChange?.({
      allSelected: selectedRowsState.length > 0 && selectedRowsState.length === rowsWithKeys.length,
      selectedCount: selectedRowsState.length,
      selectedRowKeys: selectedRowKeysState,
      selectedRows: selectedRowsState,
    });
  };

  const updateSelectedKeys = (nextKeys: Set<string>) => {
    if (selectedRowKeys == null) {
      setInternalSelectedKeys(nextKeys);
    }

    emitSelectionChange(nextKeys);
  };

  const toggleVisibleSelection = (checked: boolean) => {
    const nextKeys = new Set(selectedKeys);

    selectableVisibleRows.forEach((item) => {
      if (checked) {
        nextKeys.add(item.key);
      } else {
        nextKeys.delete(item.key);
      }
    });

    updateSelectedKeys(nextKeys);
  };

  const toggleRowSelection = (rowKey: string, checked: boolean) => {
    const nextKeys = new Set(selectedKeys);

    if (checked) {
      nextKeys.add(rowKey);
    } else {
      nextKeys.delete(rowKey);
    }

    updateSelectedKeys(nextKeys);
  };

  const toggleRowExpansion = (rowKey: string, row: TData) => {
    const nextKeys = new Set(expandedKeys);
    const nextExpanded = !nextKeys.has(rowKey);

    if (nextExpanded) {
      nextKeys.add(rowKey);
    } else {
      nextKeys.delete(rowKey);
    }

    if (expandedRowKeys == null) {
      setInternalExpandedKeys(nextKeys);
    }

    onRowExpandToggled?.(nextExpanded, row);
  };

  const handleSort = (column: DataTableColumn<TData>, columnId: string) => {
    if (!column.sortable) {
      return;
    }

    const nextDirection =
      activeSortColumnId === columnId && activeSortDirection === 'asc' ? 'desc' : 'asc';

    if (sortColumnId == null || sortDirection == null) {
      setInternalSort({ columnId, direction: nextDirection });
    }

    if (paginationPage == null) {
      setInternalPage(1);
    }

    onSort?.(column, nextDirection);
  };

  const handlePageChange = (page: number) => {
    if (paginationPage == null) {
      setInternalPage(page);
    }

    onChangePage?.(page);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    if (paginationPerPage == null) {
      setInternalPageSize(nextPageSize);
    }

    if (paginationPage == null) {
      setInternalPage(1);
    }

    onChangeRowsPerPage?.(nextPageSize, 1);
  };

  return (
    <div {...rest} className={rootClassName} style={style}>
      {title || actions || subHeader ? (
        <div className="ds-data-table__toolbar">
          {title ? <div className="ds-data-table__title">{title}</div> : null}
          {actions ? <div className="ds-data-table__actions">{actions}</div> : null}
          {subHeader ? <div className="ds-data-table__subheader">{subHeader}</div> : null}
        </div>
      ) : null}

      <div className="ds-data-table__viewport">
        <table aria-label={mergedLabels.table} className="ds-data-table__table">
          <colgroup>
            {expandableRows ? <col className="ds-data-table__col ds-data-table__col--control" /> : null}
            {selectableRows ? <col className="ds-data-table__col ds-data-table__col--control" /> : null}
            {visibleColumns.map((column, index) => {
              const columnId = getColumnId(column, index);
              const columnClassName = [
                'ds-data-table__col',
                column.hideBelow ? `ds-data-table__col--hide-${column.hideBelow}` : undefined,
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <col
                  className={columnClassName}
                  key={columnId}
                  style={getColumnGroupStyle(column)}
                />
              );
            })}
          </colgroup>
          {persistTableHead || paginatedRows.length > 0 ? (
            <thead className="ds-data-table__head">
              <tr className="ds-data-table__row ds-data-table__row--head">
                {expandableRows ? <th aria-label="Expandir" className="ds-data-table__control-cell" /> : null}
                {selectableRows ? (
                  <th className="ds-data-table__control-cell" scope="col">
                    <DataTableCheckbox
                      checked={allVisibleSelected}
                      disabled={selectableVisibleRows.length === 0}
                      indeterminate={someVisibleSelected}
                      label={mergedLabels.selectAllRows}
                      onChange={toggleVisibleSelection}
                    />
                  </th>
                ) : null}
                {visibleColumns.map((column, index) => {
                  const columnId = getColumnId(column, index);
                  const isSorted = activeSortColumnId === columnId;
                  const columnClassName = [
                    'ds-data-table__cell',
                    'ds-data-table__cell--head',
                    column.right ? 'ds-data-table__cell--right' : undefined,
                    column.center ? 'ds-data-table__cell--center' : undefined,
                    column.hideBelow ? `ds-data-table__cell--hide-${column.hideBelow}` : undefined,
                    column.headerClassName,
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <th
                      aria-sort={
                        column.sortable && isSorted
                          ? activeSortDirection === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : undefined
                      }
                      className={columnClassName}
                      key={columnId}
                      scope="col"
                      style={getColumnStyle(column)}
                    >
                      {column.sortable ? (
                        <Button
                          ariaLabel={mergedLabels.sortColumn(getColumnLabel(column), isSorted ? activeSortDirection : 'asc')}
                          className="ds-data-table__sort-button"
                          iconEnd={
                            <span className="ds-data-table__sort-icon">
                              <SortIcon direction={isSorted ? activeSortDirection : undefined} />
                            </span>
                          }
                          onClick={() => {
                            handleSort(column, columnId);
                          }}
                          size="small"
                          variant="tertiary"
                        >
                          {column.name}
                        </Button>
                      ) : (
                        <span className="ds-data-table__cell-label">{column.name}</span>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
          ) : null}
          <tbody className="ds-data-table__body">
            {progressPending ? (
              <tr>
                <td className="ds-data-table__empty" colSpan={tableColumnCount}>
                  {progressComponent ?? mergedLabels.loading}
                </td>
              </tr>
            ) : paginatedRows.length === 0 ? (
              <tr>
                <td className="ds-data-table__empty" colSpan={tableColumnCount}>
                  {noDataComponent ?? mergedLabels.noData}
                </td>
              </tr>
            ) : (
              paginatedRows.map((item, visibleIndex) => {
                const isSelected = selectedKeys.has(item.key);
                const isExpanded = expandedKeys.has(item.key);
                const rowIndex = item.index;
                const expandedRowId = `ds-data-table-expanded-${getDomSafeId(item.key)}`;

                return (
                  <Fragment key={item.key}>
                    <tr
                      aria-selected={selectableRows ? isSelected : undefined}
                      className="ds-data-table__row"
                      key={item.key}
                      onClick={() => {
                        onRowClicked?.(item.row, rowIndex);
                      }}
                      style={getRowStyle(visibleIndex)}
                    >
                      {expandableRows ? (
                        <td className="ds-data-table__control-cell">
                          <Button
                            ariaControls={expandedRowId}
                            ariaExpanded={isExpanded}
                            ariaLabel={
                              isExpanded
                                ? mergedLabels.collapseRow(rowIndex)
                                : mergedLabels.expandRow(rowIndex)
                            }
                            className="ds-data-table__expand-button"
                            disabled={item.expansionDisabled}
                            iconStart={<ChevronIcon expanded={isExpanded} />}
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleRowExpansion(item.key, item.row);
                            }}
                            size="small"
                            variant="tertiary"
                          />
                        </td>
                      ) : null}
                      {selectableRows ? (
                        <td className="ds-data-table__control-cell">
                          <DataTableCheckbox
                            checked={isSelected}
                            disabled={item.disabled}
                            label={mergedLabels.selectRow(rowIndex)}
                            onChange={(checked) => {
                              toggleRowSelection(item.key, checked);
                            }}
                          />
                        </td>
                      ) : null}
                      {visibleColumns.map((column, columnIndex) => {
                        const columnId = getColumnId(column, columnIndex);
                        const cellClassName = [
                          'ds-data-table__cell',
                          column.right ? 'ds-data-table__cell--right' : undefined,
                          column.center ? 'ds-data-table__cell--center' : undefined,
                          column.wrap ? 'ds-data-table__cell--wrap' : undefined,
                          column.hideBelow ? `ds-data-table__cell--hide-${column.hideBelow}` : undefined,
                          column.className,
                        ]
                          .filter(Boolean)
                          .join(' ');

                        return (
                          <td
                            className={cellClassName}
                            data-label={getColumnLabel(column)}
                            key={columnId}
                            style={getColumnStyle(column)}
                          >
                            {column.cell
                              ? column.cell(item.row, rowIndex)
                              : column.selector?.(item.row, rowIndex)}
                          </td>
                        );
                      })}
                    </tr>
                    {expandableRows && isExpanded ? (
                      <tr className="ds-data-table__expanded-row" key={`${item.key}-expanded`}>
                        <td
                          className="ds-data-table__expanded-cell"
                          colSpan={tableColumnCount}
                          id={expandedRowId}
                        >
                          {expandableRowsComponent?.(item.row, rowIndex)}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pagination ? (
        <div className="ds-data-table__pagination">
          <Pagination
            labels={{
              range: mergedLabels.paginationRange,
              resultsPerPage: mergedLabels.rowsPerPage,
            }}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            page={currentPage}
            pageSize={pageSize}
            pageSizeOptions={paginationRowsPerPageOptions}
            showFirstLast
            showPageSize
            showRange
            siblingCount={0}
            totalItems={totalRows}
          />
        </div>
      ) : null}
    </div>
  );
}
