import './Datepicker.styles.css';

import { forwardRef, useId, useMemo, useState } from 'react';

import { Button } from '../Button';
import type { DatepickerProps, DatepickerRangeValue } from './Datepicker.types';

const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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

  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function formatMonthTitle(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatSelectedTitle(value: string | undefined) {
  const date = parseDate(value);

  if (!date) {
    return 'Select date';
  }

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  }).format(date);
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
  calendarStart.setDate(firstDay.getDate() - firstDay.getDay());

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

function getRangeInputValue(range: DatepickerRangeValue) {
  if (range.start && range.end) {
    return `${formatInputDate(range.start)} - ${formatInputDate(range.end)}`;
  }

  if (range.start) {
    return `${formatInputDate(range.start)} -`;
  }

  return '';
}

function getSelectedDaysLabel(range: DatepickerRangeValue) {
  const startDate = parseDate(range.start);
  const endDate = parseDate(range.end);

  if (!startDate || !endDate) {
    return 'Select a date range';
  }

  const daysSelected = Math.abs((endDate.getTime() - startDate.getTime()) / 86400000) + 1;

  return `${String(daysSelected)} Days Selected`;
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 3v4M17 3v4M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: 'next' | 'previous' }) {
  const path = direction === 'next' ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6';

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d={path}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export const Datepicker = forwardRef<HTMLInputElement, DatepickerProps>(function Datepicker(
  {
    className,
    defaultMonth,
    defaultOpen = false,
    defaultRangeValue,
    defaultTimeValue = '',
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
    onTimeValueChange,
    onValueChange,
    open,
    placeholder = 'MM/DD/YYYY',
    rangeValue,
    readOnly = false,
    required = false,
    showFooter = true,
    showTime = false,
    state = 'default',
    successText,
    timeValue,
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
  const [internalTime, setInternalTime] = useState(defaultTimeValue);
  const currentValue = value ?? internalValue;
  const currentRange = rangeValue ?? internalRange;
  const currentTime = timeValue ?? internalTime;
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
  const inputValue =
    mode === 'range' ? getRangeInputValue(currentRange) : formatInputDate(currentValue);
  const popupTitle =
    mode === 'range' ? formatSelectedTitle(currentRange.start) : formatSelectedTitle(currentValue);
  const days = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);
  const rootClassName = [
    'ds-datepicker',
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
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
              event.preventDefault();
              updateOpen(true);
            }
          }}
          placeholder={placeholder}
          readOnly
          ref={ref}
          required={required}
          role="combobox"
          type="text"
          value={inputValue}
        />
        <button
          aria-label={isOpen ? 'Close calendar' : 'Open calendar'}
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

      {isOpen ? (
        <div
          aria-label={`${label} calendar`}
          aria-modal="false"
          className="ds-datepicker__popover"
          id={popupId}
          role="dialog"
        >
          <div className="ds-datepicker__selected-title">{popupTitle}</div>

          <div className="ds-datepicker__month-header">
            <button
              aria-label="Previous month"
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
              aria-label="Next month"
              className="ds-datepicker__nav-button"
              onClick={() => {
                setVisibleMonth((month) => addMonths(month, 1));
              }}
              type="button"
            >
              <ChevronIcon direction="next" />
            </button>
          </div>

          <div aria-hidden="true" className="ds-datepicker__weekdays">
            {weekdayLabels.map((weekday, index) => (
              <span key={`${weekday}-${String(index)}`}>{weekday}</span>
            ))}
          </div>

          <div className="ds-datepicker__days" role="grid">
            {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
              <div
                className="ds-datepicker__week"
                key={`week-${String(weekIndex)}`}
                role="row"
              >
                {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day) => {
                  const isoValue = formatIsoDate(day);
                  const isOutsideMonth = day.getMonth() !== visibleMonth.getMonth();
                  const isSelected =
                    mode === 'range'
                      ? isoValue === currentRange.start || isoValue === currentRange.end
                      : isoValue === currentValue;
                  const isRangeDay = mode === 'range' && isInRange(isoValue, currentRange);
                  const isToday = isoValue === formatIsoDate(new Date());
                  const dayDisabled = isDateDisabled(isoValue, minDate, maxDate);
                  const dayClassName = [
                    'ds-datepicker__day',
                    isOutsideMonth ? 'ds-datepicker__day--outside' : undefined,
                    isToday ? 'ds-datepicker__day--today' : undefined,
                    isSelected ? 'ds-datepicker__day--selected' : undefined,
                    isRangeDay ? 'ds-datepicker__day--in-range' : undefined,
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <div aria-selected={isSelected} key={isoValue} role="gridcell">
                      <button
                        aria-label={new Intl.DateTimeFormat('en-US', {
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

          {mode === 'range' || showTime ? (
            <div className="ds-datepicker__metadata">
              {mode === 'range' ? (
                <div className="ds-datepicker__metadata-item">
                  <span aria-hidden="true" className="ds-datepicker__metadata-icon">
                    ✓
                  </span>
                  <span>{getSelectedDaysLabel(currentRange)}</span>
                </div>
              ) : null}
              {showTime ? (
                <label className="ds-datepicker__time-field">
                  <span>Cut-off Time</span>
                  <input
                    className="ds-datepicker__time-input"
                    onChange={(event) => {
                      setInternalTime(event.currentTarget.value);
                      onTimeValueChange?.(event.currentTarget.value);
                    }}
                    type="time"
                    value={currentTime}
                  />
                </label>
              ) : null}
            </div>
          ) : null}

          {showFooter ? (
            <div className="ds-datepicker__footer">
              <Button onClick={cancelSelection} size="medium" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  updateOpen(false);
                }}
                size="medium"
              >
                Apply
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}

      {isError && errorText ? (
        <p className="ds-datepicker__message ds-datepicker__message--error" id={errorId}>
          <span aria-hidden="true" className="ds-datepicker__message-icon">
            i
          </span>
          <span>{errorText}</span>
        </p>
      ) : null}

      {isSuccess && successText ? (
        <p className="ds-datepicker__message ds-datepicker__message--success" id={successId}>
          <span aria-hidden="true" className="ds-datepicker__message-icon">
            i
          </span>
          <span>{successText}</span>
        </p>
      ) : null}

      {helperText ? (
        <p className="ds-datepicker__message" id={helperId}>
          {!isError && !isSuccess ? (
            <span aria-hidden="true" className="ds-datepicker__message-icon">
              i
            </span>
          ) : null}
          <span>{helperText}</span>
        </p>
      ) : null}
    </div>
  );
});
