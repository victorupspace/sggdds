import './Tabs.styles.css';

import { useId, useMemo, useRef, useState } from 'react';

import type { KeyboardEvent } from 'react';
import type { ReactNode } from 'react';
import type { TabsItem, TabsProps } from './Tabs.types';

function normalizeItems(items: TabsItem[]) {
  return items.filter((item) => item.id.trim() !== '');
}

function getFirstEnabledItem(items: TabsItem[]) {
  return items.find((item) => !item.disabled);
}

function getSelectedItem(items: TabsItem[], value: string | undefined) {
  const selectedItem = items.find((item) => item.id === value && !item.disabled);

  return selectedItem ?? getFirstEnabledItem(items);
}

function getNextEnabledIndex(items: TabsItem[], currentIndex: number, direction: 1 | -1) {
  if (items.length === 0) {
    return -1;
  }

  for (let step = 1; step <= items.length; step += 1) {
    const nextIndex = (currentIndex + step * direction + items.length) % items.length;

    if (!items[nextIndex]?.disabled) {
      return nextIndex;
    }
  }

  return -1;
}

function TabIcon({ children }: { children: ReactNode }) {
  return (
    <span className="ds-tabs__tab-icon" aria-hidden="true">
      {children}
    </span>
  );
}

function TabBadge({ children }: { children: ReactNode }) {
  return <span className="ds-tabs__tab-badge">{children}</span>;
}

export function Tabs({
  activationMode = 'automatic',
  ariaLabel = 'Tabs',
  className,
  defaultValue,
  items,
  onKeyDown,
  onValueChange,
  panelClassName,
  value,
  variant = 'standard',
}: TabsProps) {
  const generatedId = useId();
  const tabListRef = useRef<HTMLDivElement>(null);
  const normalizedItems = useMemo(() => normalizeItems(items), [items]);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedItem = getSelectedItem(normalizedItems, value ?? internalValue);
  const selectedValue = selectedItem?.id;
  const selectedIndex = selectedItem ? normalizedItems.indexOf(selectedItem) : -1;
  const rootClassName = ['ds-tabs', `ds-tabs--variant-${variant}`, className]
    .filter(Boolean)
    .join(' ');
  const panelId = selectedValue ? `${generatedId}-panel-${selectedValue}` : undefined;

  const selectItem = (item: TabsItem | undefined, shouldFocus = false) => {
    if (!item || item.disabled) {
      return;
    }

    if (value == null) {
      setInternalValue(item.id);
    }

    onValueChange?.(item.id);

    if (shouldFocus) {
      window.requestAnimationFrame(() => {
        const tab = tabListRef.current?.querySelector<HTMLButtonElement>(
          `[data-tabs-tab-id="${CSS.escape(item.id)}"]`,
        );

        tab?.focus();
      });
    }
  };

  const focusItem = (item: TabsItem | undefined) => {
    if (!item || item.disabled) {
      return;
    }

    const tab = tabListRef.current?.querySelector<HTMLButtonElement>(
      `[data-tabs-tab-id="${CSS.escape(item.id)}"]`,
    );

    tab?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);

    if (event.defaultPrevented || selectedIndex < 0) {
      return;
    }

    let targetItem: TabsItem | undefined;

    if (event.key === 'ArrowLeft') {
      targetItem = normalizedItems[getNextEnabledIndex(normalizedItems, selectedIndex, -1)];
    } else if (event.key === 'ArrowRight') {
      targetItem = normalizedItems[getNextEnabledIndex(normalizedItems, selectedIndex, 1)];
    } else if (event.key === 'End') {
      targetItem = [...normalizedItems].reverse().find((item) => !item.disabled);
    } else if (event.key === 'Home') {
      targetItem = getFirstEnabledItem(normalizedItems);
    } else {
      return;
    }

    event.preventDefault();

    if (activationMode === 'manual') {
      focusItem(targetItem);
      return;
    }

    selectItem(targetItem, true);
  };

  return (
    <div className={rootClassName}>
      <div
        aria-label={ariaLabel}
        className="ds-tabs__list"
        onKeyDown={handleKeyDown}
        ref={tabListRef}
        role="tablist"
      >
        {normalizedItems.map((item) => {
          const isSelected = item.id === selectedValue;
          const tabId = `${generatedId}-tab-${item.id}`;
          const contentId = `${generatedId}-panel-${item.id}`;

          return (
            <button
              aria-controls={contentId}
              aria-label={item.ariaLabel}
              aria-selected={isSelected}
              className="ds-tabs__tab"
              data-tabs-tab-id={item.id}
              disabled={item.disabled}
              id={tabId}
              key={item.id}
              onClick={() => {
                selectItem(item);
              }}
              role="tab"
              tabIndex={isSelected ? 0 : -1}
              type="button"
            >
              {item.icon ? <TabIcon>{item.icon}</TabIcon> : null}
              <span className="ds-tabs__tab-label">{item.label}</span>
              {item.badge ? <TabBadge>{item.badge}</TabBadge> : null}
            </button>
          );
        })}
      </div>

      {selectedItem ? (
        <div
          aria-labelledby={`${generatedId}-tab-${selectedItem.id}`}
          className={['ds-tabs__panel', panelClassName].filter(Boolean).join(' ')}
          id={panelId}
          role="tabpanel"
          tabIndex={0}
        >
          {selectedItem.content}
        </div>
      ) : null}
    </div>
  );
}
