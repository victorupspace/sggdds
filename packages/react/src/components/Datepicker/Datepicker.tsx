import './Datepicker.styles.css';

import { forwardRef, useId, useMemo, useState } from 'react';

import { Button } from '../Button';
import type { DatepickerProps, DatepickerRangeValue } from './Datepicker.types';

/* Dias da semana do Figma (S T Q Q S S D), começando na segunda-feira */
const weekdayLabels = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

function parseDate(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const [year, month, day] = value.split('-').map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(year, month - 1, day, 12);
}

function formatIsoDate(date: Date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatInputDate(value: string | undefined) {
  const date = parseDate(value);

  if (!date) {
    return '';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/* "Maio 2026", como no Figma */
function formatMonthTitle(date: Date) {
  const month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(date);

  return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${String(date.getFullYear())}`;
}

function formatSelectedTitle(value: string | undefined, fallback: string) {
  const date = parseDate(value);

  if (!date) {
    return fallback;
  }

  const formatted = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    weekday: 'short',
  }).format(date);

  return `${formatted.charAt(0).toUpperCase()}${formatted.slice(1)}`;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 12);
}

function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1, 12);
}

function getInitialMonth(value: string | undefined, fallback: string | undefined) {
  return startOfMonth(parseDate(value) ?? parseDate(fallback) ?? new Date());
}

function getCalendarDays(month: Date) {
  const firstDay = startOfMonth(month);
  const calendarStart = new Date(firstDay);
  /* Semana começa na segunda-feira, como no Figma */
  calendarStart.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7));

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);
    return date;
  });
}

function isDateDisabled(value: string, minDate: string | undefined, maxDate: string | undefined) {
  return (minDate !== undefined && value < minDate) || (maxDate !== undefined && value > maxDate);
}

function isInRange(value: string, range: DatepickerRangeValue) {
  if (!range.start || !range.end) {
    return false;
  }

  return value > range.start && value < range.end;
}

/*
 * Vetores exportados do Figma (Web Components / Datepicker, node
 * 40000266:9165); a cor vem do CSS via currentColor.
 */
function CalendarIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {/* calendar_month [Material Symbols] */}
      <path
        d="M5.30775 21.5C4.80258 21.5 4.375 21.325 4.025 20.975C3.675 20.625 3.5 20.1974 3.5 19.6923V6.30775C3.5 5.80258 3.675 5.375 4.025 5.025C4.375 4.675 4.80258 4.5 5.30775 4.5H6.69225V2.38475H8.23075V4.5H15.8077V2.38475H17.3077V4.5H18.6923C19.1974 4.5 19.625 4.675 19.975 5.025C20.325 5.375 20.5 5.80258 20.5 6.30775V19.6923C20.5 20.1974 20.325 20.625 19.975 20.975C19.625 21.325 19.1974 21.5 18.6923 21.5H5.30775ZM5.30775 20H18.6923C18.7693 20 18.8398 19.9679 18.9038 19.9038C18.9679 19.8398 19 19.7693 19 19.6923V10.3077H5V19.6923C5 19.7693 5.03208 19.8398 5.09625 19.9038C5.16025 19.9679 5.23075 20 5.30775 20ZM5 8.80775H19V6.30775C19 6.23075 18.9679 6.16025 18.9038 6.09625C18.8398 6.03208 18.7693 6 18.6923 6H5.30775C5.23075 6 5.16025 6.03208 5.09625 6.09625C5.03208 6.16025 5 6.23075 5 6.30775V8.80775ZM12 14.077C11.7552 14.077 11.5465 13.9908 11.374 13.8183C11.2017 13.6459 11.1155 13.4373 11.1155 13.1923C11.1155 12.9474 11.2017 12.7387 11.374 12.5662C11.5465 12.3939 11.7552 12.3077 12 12.3077C12.2448 12.3077 12.4535 12.3939 12.626 12.5662C12.7983 12.7387 12.8845 12.9474 12.8845 13.1923C12.8845 13.4373 12.7983 13.6459 12.626 13.8183C12.4535 13.9908 12.2448 14.077 12 14.077ZM7.374 13.8183C7.20167 13.6459 7.1155 13.4373 7.1155 13.1923C7.1155 12.9474 7.20167 12.7387 7.374 12.5662C7.5465 12.3939 7.75517 12.3077 8 12.3077C8.24483 12.3077 8.4535 12.3939 8.626 12.5662C8.79833 12.7387 8.8845 12.9474 8.8845 13.1923C8.8845 13.4373 8.79833 13.6459 8.626 13.8183C8.4535 13.9908 8.24483 14.077 8 14.077C7.75517 14.077 7.5465 13.9908 7.374 13.8183ZM16 14.077C15.7552 14.077 15.5465 13.9908 15.374 13.8183C15.2017 13.6459 15.1155 13.4373 15.1155 13.1923C15.1155 12.9474 15.2017 12.7387 15.374 12.5662C15.5465 12.3939 15.7552 12.3077 16 12.3077C16.2448 12.3077 16.4535 12.3939 16.626 12.5662C16.7983 12.7387 16.8845 12.9474 16.8845 13.1923C16.8845 13.4373 16.7983 13.6459 16.626 13.8183C16.4535 13.9908 16.2448 14.077 16 14.077ZM12 18C11.7552 18 11.5465 17.9138 11.374 17.7413C11.2017 17.5689 11.1155 17.3603 11.1155 17.1155C11.1155 16.8705 11.2017 16.6618 11.374 16.4895C11.5465 16.317 11.7552 16.2307 12 16.2307C12.2448 16.2307 12.4535 16.317 12.626 16.4895C12.7983 16.6618 12.8845 16.8705 12.8845 17.1155C12.8845 17.3603 12.7983 17.5689 12.626 17.7413C12.4535 17.9138 12.2448 18 12 18ZM7.374 17.7413C7.20167 17.5689 7.1155 17.3603 7.1155 17.1155C7.1155 16.8705 7.20167 16.6618 7.374 16.4895C7.5465 16.317 7.75517 16.2307 8 16.2307C8.24483 16.2307 8.4535 16.317 8.626 16.4895C8.79833 16.6618 8.8845 16.8705 8.8845 17.1155C8.8845 17.3603 8.79833 17.5689 8.626 17.7413C8.4535 17.9138 8.24483 18 8 18C7.75517 18 7.5465 17.9138 7.374 17.7413ZM16 18C15.7552 18 15.5465 17.9138 15.374 17.7413C15.2017 17.5689 15.1155 17.3603 15.1155 17.1155C15.1155 16.8705 15.2017 16.6618 15.374 16.4895C15.5465 16.317 15.7552 16.2307 16 16.2307C16.2448 16.2307 16.4535 16.317 16.626 16.4895C16.7983 16.6618 16.8845 16.8705 16.8845 17.1155C16.8845 17.3603 16.7983 17.5689 16.626 17.7413C16.4535 17.9138 16.2448 18 16 18Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: 'next' | 'previous' }) {
  if (direction === 'previous') {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        {/* chevron_left [outlined] */}
        <path
          d="M11.6875 14.7083L6.95833 9.97917L11.6875 5.25L12.3542 5.9375L8.3125 9.97917L12.3542 14.0417L11.6875 14.7083Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      {/* chevron_right (weight 300) */}
      <path
        d="M18.75 35.3L17.15 33.7L26.85 23.95L17.15 14.25L18.75 12.6L30.1 23.95L18.75 35.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const Datepicker = forwardRef<HTMLInputElement, DatepickerProps>(function Datepicker(
  {
    background = 'white',
    className,
    defaultMonth,
    defaultOpen = false,
    defaultRangeValue,
    defaultValue,
    disabled = false,
    errorText,
    fullWidth = true,
    helperText,
    id,
    inputClassName,
    label,
    maxDate,
    minDate,
    mode = 'single',
    onOpenChange,
    onRangeValueChange,
    onValueChange,
    open,
    placeholder = 'DD/MM/AAAA',
    rangeValue,
    readOnly = false,
    required = false,
    showFooter = true,
    state = 'default',
    successText,
    value,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = errorText ? `${inputId}-error` : undefined;
  const successId = successText ? `${inputId}-success` : undefined;
  const popupId = `${inputId}-popup`;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [internalRange, setInternalRange] = useState<DatepickerRangeValue>(defaultRangeValue ?? {});
  const currentValue = value ?? internalValue;
  const currentRange = rangeValue ?? internalRange;
  const selectionAnchor =
    mode === 'range' ? (currentRange.start ?? currentRange.end) : currentValue;
  const [visibleMonth, setVisibleMonth] = useState(getInitialMonth(selectionAnchor, defaultMonth));
  const isError = state === 'error' || Boolean(errorText);
  const isSuccess = !isError && (state === 'success' || Boolean(successText));
  const describedBy =
    [
      isError ? errorId : undefined,
      isSuccess ? successId : undefined,
      helperId,
      isOpen ? popupId : undefined,
    ]
      .filter(Boolean)
      .join(' ') || undefined;
  const popupTitle =
    mode === 'range'
      ? formatSelectedTitle(currentRange.start, 'Selecione um período')
      : formatSelectedTitle(currentValue, 'Selecione uma data');
  const days = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);
  const rootClassName = [
    'ds-datepicker',
    background === 'inverse' ? 'ds-datepicker--inverse' : undefined,
    isOpen ? 'ds-datepicker--open' : undefined,
    isError ? 'ds-datepicker--error' : undefined,
    isSuccess ? 'ds-datepicker--success' : undefined,
    disabled ? 'ds-datepicker--disabled' : undefined,
    readOnly ? 'ds-datepicker--read-only' : undefined,
    fullWidth ? 'ds-datepicker--full-width' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');
  const inputClassNames = ['ds-datepicker__field', inputClassName].filter(Boolean).join(' ');

  function updateOpen(nextOpen: boolean) {
    if (disabled || readOnly) {
      return;
    }

    setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  function selectDate(nextValue: string) {
    if (isDateDisabled(nextValue, minDate, maxDate)) {
      return;
    }

    if (mode === 'range') {
      const nextRange =
        !currentRange.start || currentRange.end || nextValue < currentRange.start
          ? { start: nextValue, end: undefined }
          : { start: currentRange.start, end: nextValue };

      setInternalRange(nextRange);
      onRangeValueChange?.(nextRange);
      return;
    }

    setInternalValue(nextValue);
    onValueChange?.(nextValue);

    if (!showFooter) {
      updateOpen(false);
    }
  }

  function cancelSelection() {
    setInternalValue(defaultValue ?? '');
    setInternalRange(defaultRangeValue ?? {});
    updateOpen(false);
  }

  const openOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      updateOpen(true);
    }
  };

  return (
    <div
      className={rootClassName}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          updateOpen(false);
        }
      }}
    >
      <label className="ds-datepicker__label" htmlFor={inputId}>
        <span>{label}</span>
        {required ? (
          <span aria-hidden="true" className="ds-datepicker__required">
            *
          </span>
        ) : null}
      </label>

      {mode === 'range' ? (
        <div className="ds-datepicker__period">
          <div className="ds-datepicker__control">
            <input
              {...inputProps}
              aria-controls={isOpen ? popupId : undefined}
              aria-describedby={describedBy}
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              aria-invalid={isError ? 'true' : undefined}
              className={inputClassNames}
              disabled={disabled}
              id={inputId}
              onClick={() => {
                updateOpen(true);
              }}
              onKeyDown={openOnKeyDown}
              placeholder={placeholder}
              readOnly
              ref={ref}
              required={required}
              role="combobox"
              type="text"
              value={formatInputDate(currentRange.start)}
            />
          </div>
          <span aria-hidden="true" className="ds-datepicker__period-separator">
            até
          </span>
          <div className="ds-datepicker__control">
            <input
              aria-controls={isOpen ? popupId : undefined}
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              aria-invalid={isError ? 'true' : undefined}
              aria-label={`${label} (fim)`}
              className={inputClassNames}
              disabled={disabled}
              onClick={() => {
                updateOpen(true);
              }}
              onKeyDown={openOnKeyDown}
              placeholder={placeholder}
              readOnly
              role="combobox"
              type="text"
              value={formatInputDate(currentRange.end)}
            />
          </div>
        </div>
      ) : (
        <div className="ds-datepicker__control ds-datepicker__control--single">
          <input
            {...inputProps}
            aria-controls={isOpen ? popupId : undefined}
            aria-describedby={describedBy}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-invalid={isError ? 'true' : undefined}
            className={inputClassNames}
            disabled={disabled}
            id={inputId}
            onClick={() => {
              updateOpen(true);
            }}
            onKeyDown={openOnKeyDown}
            placeholder={placeholder}
            readOnly
            ref={ref}
            required={required}
            role="combobox"
            type="text"
            value={formatInputDate(currentValue)}
          />
          <button
            aria-label={isOpen ? 'Fechar calendário' : 'Abrir calendário'}
            className="ds-datepicker__icon-button"
            disabled={disabled || readOnly}
            onClick={() => {
              updateOpen(!isOpen);
            }}
            type="button"
          >
            <CalendarIcon />
          </button>
        </div>
      )}

      {isOpen ? (
        <div
          aria-label={`Calendário de ${label}`}
          aria-modal="false"
          className="ds-datepicker__popover"
          id={popupId}
          role="dialog"
        >
          <div className="ds-datepicker__title">{popupTitle}</div>

          <div className="ds-datepicker__month-header">
            <button
              aria-label="Mês anterior"
              className="ds-datepicker__nav-button"
              onClick={() => {
                setVisibleMonth((month) => addMonths(month, -1));
              }}
              type="button"
            >
              <ChevronIcon direction="previous" />
            </button>
            <div aria-live="polite" className="ds-datepicker__month-title">
              {formatMonthTitle(visibleMonth)}
            </div>
            <button
              aria-label="Próximo mês"
              className="ds-datepicker__nav-button"
              onClick={() => {
                setVisibleMonth((month) => addMonths(month, 1));
              }}
              type="button"
            >
              <ChevronIcon direction="next" />
            </button>
          </div>

          <div className="ds-datepicker__calendar">
            <div aria-hidden="true" className="ds-datepicker__weekdays">
              {weekdayLabels.map((weekday, index) => (
                <span key={`${weekday}-${String(index)}`}>{weekday}</span>
              ))}
            </div>

            <div className="ds-datepicker__days" role="grid">
              {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
                <div className="ds-datepicker__week" key={`week-${String(weekIndex)}`} role="row">
                  {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day) => {
                    const isoValue = formatIsoDate(day);
                    const isOutsideMonth = day.getMonth() !== visibleMonth.getMonth();
                    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
                    const isSelected =
                      mode === 'range'
                        ? isoValue === currentRange.start || isoValue === currentRange.end
                        : isoValue === currentValue;
                    const isRangeDay = mode === 'range' && isInRange(isoValue, currentRange);
                    const dayDisabled = isDateDisabled(isoValue, minDate, maxDate);
                    const dayClassName = [
                      'ds-datepicker__day',
                      isOutsideMonth ? 'ds-datepicker__day--outside' : undefined,
                      isWeekend ? 'ds-datepicker__day--weekend' : undefined,
                      isSelected ? 'ds-datepicker__day--selected' : undefined,
                      isRangeDay ? 'ds-datepicker__day--in-range' : undefined,
                    ]
                      .filter(Boolean)
                      .join(' ');

                    return (
                      <div aria-selected={isSelected} key={isoValue} role="gridcell">
                        <button
                          aria-label={new Intl.DateTimeFormat('pt-BR', {
                            dateStyle: 'full',
                          }).format(day)}
                          className={dayClassName}
                          disabled={dayDisabled}
                          onClick={() => {
                            selectDate(isoValue);
                          }}
                          type="button"
                        >
                          <span>{day.getDate()}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {showFooter ? (
            <div className="ds-datepicker__footer">
              <Button onClick={cancelSelection} size="medium" variant="tertiary">
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  updateOpen(false);
                }}
                size="medium"
                variant="secondary"
              >
                Confirmar
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}

      {isError && errorText ? (
        <p className="ds-datepicker__message ds-datepicker__message--error" id={errorId}>
          {errorText}
        </p>
      ) : null}

      {isSuccess && successText ? (
        <p className="ds-datepicker__message ds-datepicker__message--success" id={successId}>
          {successText}
        </p>
      ) : null}

      {helperText ? (
        <p className="ds-datepicker__message" id={helperId}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
