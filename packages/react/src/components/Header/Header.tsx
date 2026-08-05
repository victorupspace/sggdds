import './Header.styles.css';

import { useId, useState } from 'react';

import type { ReactNode } from 'react';
import { Avatar } from '../Avatar';
import { ButtonGov } from '../ButtonGov';
import { Meganav } from '../Meganav';
import portalLogo from './assets/logo-portal-de-servicos.png';
import spGovBrLogo from './assets/logo-spgov-default.png';
import type {
  HeaderAction,
  HeaderNavigationItem,
  HeaderProps,
  HeaderUtilityItem,
} from './Header.types';

const defaultNavigationItems: HeaderNavigationItem[] = [
  { href: '#option-1', label: 'Option' },
  { href: '#option-2', label: 'Option' },
  { href: '#option-3', label: 'Option' },
  { href: '#option-4', label: 'Option' },
];

/*
 * Vetores exportados do Figma (Web Components / Header, node 94:14266);
 * a cor vem do CSS via currentColor.
 */
function SearchIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {/* search [Material Symbols] */}
      <path
        d="M16.1383 17.1923L9.8575 10.9113C9.3575 11.3241 8.7825 11.6472 8.1325 11.8805C7.4825 12.1138 6.81008 12.2305 6.11525 12.2305C4.40608 12.2305 2.95958 11.6388 1.77575 10.4553C0.591917 9.27175 0 7.82558 0 6.11675C0 4.40808 0.59175 2.96142 1.77525 1.77675C2.95875 0.59225 4.40492 0 6.11375 0C7.82242 0 9.26908 0.591916 10.4537 1.77575C11.6382 2.95958 12.2305 4.40608 12.2305 6.11525C12.2305 6.82942 12.1107 7.5115 11.871 8.1615C11.6312 8.8115 11.3113 9.37683 10.9113 9.8575L17.192 16.1383L16.1383 17.1923ZM6.11525 10.7308C7.40375 10.7308 8.49508 10.2836 9.38925 9.38925C10.2836 8.49508 10.7308 7.40375 10.7308 6.11525C10.7308 4.82675 10.2836 3.73542 9.38925 2.84125C8.49508 1.94692 7.40375 1.49975 6.11525 1.49975C4.82675 1.49975 3.73542 1.94692 2.84125 2.84125C1.94692 3.73542 1.49975 4.82675 1.49975 6.11525C1.49975 7.40375 1.94692 8.49508 2.84125 9.38925C3.73542 10.2836 4.82675 10.7308 6.11525 10.7308Z"
        fill="currentColor"
        transform="translate(3.404 3.385)"
      />
    </svg>
  );
}

function TranslateIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {/* translate [Material Symbols] */}
      <path
        d="M10.2078 18.6152L14.6615 7.11525H16.223L20.677 18.6152H19.0865L17.954 15.5652H12.9307L11.798 18.6152H10.2078ZM2.31725 15.673L1.2635 14.619L6.2365 9.6365C5.65967 9.05317 5.11133 8.36083 4.5915 7.5595C4.0715 6.75817 3.64358 5.94342 3.30775 5.11525H4.898C5.1865 5.72042 5.5375 6.32558 5.951 6.93075C6.3645 7.53575 6.811 8.08633 7.2905 8.5825C8.00067 7.86583 8.67242 6.99567 9.30575 5.972C9.93908 4.94833 10.3866 3.99608 10.6482 3.11525H0V1.61525H6.55775V0H8.05775V1.61525H14.6155V3.11525H12.1673C11.8429 4.23825 11.326 5.41225 10.6165 6.63725C9.90683 7.86225 9.14942 8.87225 8.34425 9.66725L10.8115 12.194L10.2443 13.7345L7.2905 10.7055L2.31725 15.673ZM13.4115 14.2383H17.473L15.4423 8.7825L13.4115 14.2383Z"
        fill="currentColor"
        transform="translate(1.692 2.885)"
      />
    </svg>
  );
}

function AccessibilityIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      {/* accessibility_new [Material Symbols] */}
      <path
        d="M8.5 3.69225C7.9885 3.69225 7.55292 3.5125 7.19325 3.153C6.83358 2.79333 6.65375 2.35775 6.65375 1.84625C6.65375 1.33475 6.83358 0.899166 7.19325 0.539499C7.55292 0.179832 7.9885 0 8.5 0C9.0115 0 9.44708 0.179832 9.80675 0.539499C10.1664 0.899166 10.3462 1.33475 10.3462 1.84625C10.3462 2.35775 10.1664 2.79333 9.80675 3.153C9.44708 3.5125 9.0115 3.69225 8.5 3.69225ZM5.904 19.5385V6.5C4.88467 6.41667 3.87117 6.2965 2.8635 6.1395C1.85583 5.98233 0.901333 5.78842 0 5.55775L0.3655 4.05775C1.64617 4.38858 2.97342 4.62833 4.34725 4.777C5.72092 4.92567 7.10517 5 8.5 5C9.89483 5 11.2791 4.92567 12.6528 4.777C14.0266 4.62833 15.3538 4.38858 16.6345 4.05775L17 5.55775C16.0987 5.78842 15.1442 5.98233 14.1365 6.1395C13.1288 6.2965 12.1153 6.41667 11.096 6.5V19.5385H9.59625V13.423H7.40375V19.5385H5.904Z"
        fill="currentColor"
        transform="translate(3.5 2.212)"
      />
    </svg>
  );
}

function NavChevronIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      {/* keyboard_arrow_down [outlined] */}
      <path
        d="M9 11.2875L4.7625 7.05L5.3625 6.43125L9 10.0687L12.6375 6.43125L13.2375 7.05L9 11.2875Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UserArrowIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 20.5333L8 12.5333L9.43333 11.1L16 17.6667L22.5667 11.1L24 12.5333L16 20.5333Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 11V9.5H24.5V11H7.5ZM7.5 22.5V21H24.5V22.5H7.5ZM7.5 16.75V15.25H24.5V16.75H7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DefaultPrimaryLogo() {
  return (
    <span aria-hidden="true" className="ds-header__logo-spgov">
      <img alt="" className="ds-header__logo-image" height="20" src={spGovBrLogo} width="140" />
    </span>
  );
}

function DefaultSecondaryLogo() {
  return (
    <span aria-hidden="true" className="ds-header__logo-portal">
      <img alt="" className="ds-header__logo-image" height="38" src={portalLogo} width="160" />
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
  const icon = (
    <span aria-hidden="true" className="ds-header__utility-icon">
      {item.icon}
    </span>
  );

  if (item.href) {
    return (
      <a
        aria-label={item.label}
        className="ds-header__utility-action"
        href={item.href}
        onClick={item.onClick}
        title={item.label}
      >
        {icon}
      </a>
    );
  }

  return (
    <button
      aria-label={item.label}
      className="ds-header__utility-action"
      onClick={item.onClick}
      title={item.label}
      type="button"
    >
      {icon}
    </button>
  );
}

function HeaderNavigationLink({ item }: { item: HeaderNavigationItem }) {
  const hasChildren = Boolean(item.children?.length);

  if (hasChildren) {
    return (
      <Meganav
        align="start"
        ariaLabel={`Navegação de ${item.label}`}
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
      <span aria-hidden="true" className="ds-header__nav-icon">
        <NavChevronIcon />
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
  navAriaLabel = 'Navegação principal',
  navigationItems = defaultNavigationItems,
  onMenuOpenChange,
  primaryLogo,
  primaryLogoAriaLabel = 'SP.GOV.BR',
  primaryLogoHref,
  secondaryLogo,
  secondaryLogoAriaLabel = 'Portal de Serviços ao Cidadão',
  secondaryLogoHref,
  user = null,
  utilityItems = defaultUtilityItems,
}: HeaderProps) {
  const generatedId = useId();
  const navigationId = `${generatedId}-navigation`;
  const userMenuId = `${generatedId}-user-menu`;
  const [internalMenuOpen, setInternalMenuOpen] = useState(defaultMenuOpen);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isMenuOpen = menuOpen ?? internalMenuOpen;
  const resolvedPrimaryLogo = primaryLogo === undefined ? <DefaultPrimaryLogo /> : primaryLogo;
  const resolvedSecondaryLogo =
    secondaryLogo === undefined ? <DefaultSecondaryLogo /> : secondaryLogo;
  const resolvedAvatar = user?.avatar ?? (user ? <Avatar name={user.name} size="small" /> : null);
  const userMenuItems = user?.menuItems ?? [];
  const rootClassName = [
    'ds-header',
    isMenuOpen ? 'ds-header--menu-open' : undefined,
    isUserMenuOpen ? 'ds-header--user-menu-open' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  function updateMenuOpen(nextOpen: boolean) {
    setInternalMenuOpen(nextOpen);
    onMenuOpenChange?.(nextOpen);
  }

  return (
    <header className={rootClassName}>
      <div className="ds-header__top">
        {resolvedPrimaryLogo ? (
          <HeaderSlot
            ariaLabel={primaryLogoAriaLabel}
            className="ds-header__brand ds-header__brand--primary"
            href={primaryLogoHref}
          >
            {resolvedPrimaryLogo}
          </HeaderSlot>
        ) : null}

        {resolvedSecondaryLogo ? (
          <HeaderSlot
            ariaLabel={secondaryLogoAriaLabel}
            className="ds-header__brand ds-header__brand--secondary"
            href={secondaryLogoHref}
          >
            {resolvedSecondaryLogo}
          </HeaderSlot>
        ) : null}

        <div className="ds-header__mobile-actions">
          {utilityItems.map((item) => (
            <HeaderUtilityAction item={item} key={item.label} />
          ))}

          {user ? (
            <span aria-hidden="true" className="ds-header__mobile-avatar">
              {resolvedAvatar}
            </span>
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
            <MenuIcon />
          </button>
        </div>
      </div>

      <div className="ds-header__bottom" id={navigationId}>
        <nav aria-label={navAriaLabel} className="ds-header__nav">
          <ul className="ds-header__nav-list">
            {navigationItems.map((item, index) => (
              <li className="ds-header__nav-item" key={`${item.label}-${String(index)}`}>
                <HeaderNavigationLink item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="ds-header__actions">
          <div className="ds-header__utility-list">
            {utilityItems.map((item) => (
              <HeaderUtilityAction item={item} key={item.label} />
            ))}
          </div>

          {user ? (
            <button
              aria-controls={isUserMenuOpen ? userMenuId : undefined}
              aria-expanded={isUserMenuOpen}
              aria-haspopup="menu"
              className="ds-header__user-menu"
              onClick={() => {
                setIsUserMenuOpen((open) => !open);
              }}
              type="button"
            >
              <span aria-hidden="true" className="ds-header__user-avatar">
                {resolvedAvatar}
              </span>
              <span className="ds-header__user-name">{user.name}</span>
              <span aria-hidden="true" className="ds-header__user-arrow">
                <UserArrowIcon />
              </span>
            </button>
          ) : accountAction ? (
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

      {user && isUserMenuOpen ? (
        <div className="ds-header__user-panel" id={userMenuId} role="menu">
          {userMenuItems.map((item, index) =>
            item.href ? (
              <a
                className="ds-header__user-panel-item"
                href={item.href}
                key={`${item.label}-${String(index)}`}
                onClick={item.onClick}
                role="menuitem"
              >
                {item.label}
              </a>
            ) : (
              <button
                className="ds-header__user-panel-item"
                key={`${item.label}-${String(index)}`}
                onClick={item.onClick}
                role="menuitem"
                type="button"
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      ) : null}
    </header>
  );
}
