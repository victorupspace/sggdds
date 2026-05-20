import './Header.styles.css';

import { useId, useState } from 'react';

import type { ReactNode } from 'react';
import { ButtonGov } from '../ButtonGov';
import { Meganav } from '../Meganav';
import spGovBrLogo from './assets/logo-spgov-default.png';
import type {
  HeaderAction,
  HeaderNavigationItem,
  HeaderProps,
  HeaderUtilityItem,
} from './Header.types';

const defaultNavigationItems: HeaderNavigationItem[] = [
  { href: '#servicos', label: 'Servicos' },
  { href: '#informacoes', label: 'Informacoes' },
  { href: '#dados', label: 'Dados' },
  { href: '#regulacao', label: 'Regulacao' },
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m20 20-4.6-4.6m2.6-5.4a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function TranslateIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 6h9M9 4v2m2.5 0c-.7 3.8-2.9 6.8-6.5 9m2-6c1.4 2 3.1 3.6 5 4.8M14 20l4-9 4 9m-1.2-2.8h-5.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function AccessibilityIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5.5a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Zm-7 3 7-1 7 1m-7-1v5m0 0-3 8m3-8 3 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {open ? (
        <path
          d="m6 6 12 12M18 6 6 18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}

function DefaultPrimaryLogo() {
  return (
    <span className="ds-header-logo ds-header-logo--primary" aria-hidden="true">
      <img className="ds-header-logo__image" src={spGovBrLogo} alt="" width="140" height="20" />
    </span>
  );
}

function DefaultSecondaryLogo() {
  return (
    <span className="ds-header-portal-brand">
      <span>Portal de</span>
      <strong>Servicos ao Cidadao</strong>
    </span>
  );
}

const defaultUtilityItems: HeaderUtilityItem[] = [
  { icon: <SearchIcon />, label: 'Buscar' },
  { icon: <TranslateIcon />, label: 'Traduzir' },
  { icon: <AccessibilityIcon />, label: 'Acessibilidade' },
];

const defaultAccountAction: HeaderAction = {
  label: 'Entrar com o gov.br',
};

function HeaderSlot({
  ariaLabel,
  children,
  className,
  href,
}: {
  ariaLabel: string;
  children: ReactNode;
  className: string;
  href?: string;
}) {
  if (href) {
    return (
      <a aria-label={ariaLabel} className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <div aria-label={ariaLabel} className={className}>
      {children}
    </div>
  );
}

function HeaderUtilityAction({ item }: { item: HeaderUtilityItem }) {
  const content = (
    <>
      <span className="ds-header__utility-icon" aria-hidden="true">
        {item.icon}
      </span>
      <span className="ds-header__utility-label">{item.label}</span>
    </>
  );

  if (item.href) {
    return (
      <a
        aria-label={item.label}
        className="ds-header__utility-action"
        href={item.href}
        onClick={item.onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      aria-label={item.label}
      className="ds-header__utility-action"
      onClick={item.onClick}
      type="button"
    >
      {content}
    </button>
  );
}

function HeaderNavigationLink({ item }: { item: HeaderNavigationItem }) {
  const hasChildren = Boolean(item.children?.length);

  if (hasChildren) {
    return (
      <Meganav
        align="start"
        ariaLabel={`Navegacao de ${item.label}`}
        className="ds-header__meganav"
        drawerClassName="ds-header__meganav-drawer"
        items={item.children ?? []}
        mobileTitle={item.label}
        triggerLabel={item.label}
        triggerVariant="navigation"
      />
    );
  }

  return (
    <a
      aria-current={item.current ? 'page' : undefined}
      className="ds-header__nav-link"
      href={item.href ?? '#'}
    >
      <span>{item.label}</span>
      <span className="ds-header__nav-icon">
        <ChevronDownIcon />
      </span>
    </a>
  );
}

export function Header({
  accountAction = defaultAccountAction,
  className,
  defaultMenuOpen = false,
  menuButtonLabel = 'Abrir menu principal',
  menuOpen,
  navAriaLabel = 'Navegacao principal',
  navigationItems = defaultNavigationItems,
  onMenuOpenChange,
  primaryLogo,
  primaryLogoAriaLabel = 'SP.GOV.BR',
  primaryLogoHref,
  secondaryLogo,
  secondaryLogoAriaLabel = 'Portal de Servicos ao Cidadao',
  secondaryLogoHref,
  utilityItems = defaultUtilityItems,
}: HeaderProps) {
  const generatedId = useId();
  const navigationId = `${generatedId}-navigation`;
  const [internalMenuOpen, setInternalMenuOpen] = useState(defaultMenuOpen);
  const isMenuOpen = menuOpen ?? internalMenuOpen;
  const resolvedPrimaryLogo = primaryLogo === undefined ? <DefaultPrimaryLogo /> : primaryLogo;
  const resolvedSecondaryLogo =
    secondaryLogo === undefined ? <DefaultSecondaryLogo /> : secondaryLogo;
  const rootClassName = ['ds-header', isMenuOpen ? 'ds-header--menu-open' : undefined, className]
    .filter(Boolean)
    .join(' ');

  function updateMenuOpen(nextOpen: boolean) {
    setInternalMenuOpen(nextOpen);
    onMenuOpenChange?.(nextOpen);
  }

  return (
    <header className={rootClassName}>
      <div className="ds-header__container">
        <div className="ds-header__brand-row">
          {resolvedPrimaryLogo ? (
            <HeaderSlot
              ariaLabel={primaryLogoAriaLabel}
              className="ds-header__brand-slot ds-header__brand-slot--primary"
              href={primaryLogoHref}
            >
              {resolvedPrimaryLogo}
            </HeaderSlot>
          ) : null}

          {resolvedSecondaryLogo ? (
            <HeaderSlot
              ariaLabel={secondaryLogoAriaLabel}
              className="ds-header__brand-slot ds-header__brand-slot--secondary"
              href={secondaryLogoHref}
            >
              {resolvedSecondaryLogo}
            </HeaderSlot>
          ) : null}

          <button
            aria-controls={navigationId}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fechar menu principal' : menuButtonLabel}
            className="ds-header__menu-button"
            onClick={() => {
              updateMenuOpen(!isMenuOpen);
            }}
            type="button"
          >
            <MenuIcon open={isMenuOpen} />
          </button>
        </div>

        <div className="ds-header__navigation-row" id={navigationId}>
          <nav aria-label={navAriaLabel} className="ds-header__nav">
            <ul className="ds-header__nav-list">
              {navigationItems.map((item) => (
                <li className="ds-header__nav-item" key={item.label}>
                  <HeaderNavigationLink item={item} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="ds-header__actions" aria-label="Acoes globais">
            <div className="ds-header__utility-list">
              {utilityItems.map((item) => (
                <HeaderUtilityAction item={item} key={item.label} />
              ))}
            </div>

            {accountAction ? (
              <ButtonGov
                ariaLabel={accountAction.label}
                className="ds-header__account-action"
                href={accountAction.href}
                icon={accountAction.icon}
                onClick={accountAction.onClick}
              >
                {accountAction.label}
              </ButtonGov>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
