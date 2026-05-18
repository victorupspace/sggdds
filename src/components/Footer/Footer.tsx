import './Footer.styles.css';

import { useId, useState } from 'react';

import type { ReactNode } from 'react';
import type { FooterLink, FooterProps, FooterSection, FooterSocialItem } from './Footer.types';

const defaultSections: FooterSection[] = [
  {
    defaultOpen: true,
    links: [
      { href: '#servicos-digitais', label: 'Servicos digitais' },
      { href: '#agendamentos', label: 'Agendamentos' },
      { href: '#documentos', label: 'Documentos' },
      { href: '#protocolos', label: 'Protocolos' },
    ],
    title: 'Servicos',
  },
  {
    links: [
      { href: '#noticias', label: 'Noticias' },
      { href: '#perguntas', label: 'Perguntas frequentes' },
      { href: '#orientacoes', label: 'Orientacoes' },
    ],
    title: 'Informacoes',
  },
  {
    links: [
      { href: '#transparencia', label: 'Transparencia' },
      { href: '#dados-abertos', label: 'Dados abertos' },
      { href: '#ouvidoria', label: 'Ouvidoria' },
      { href: '#acessibilidade', label: 'Acessibilidade' },
      { href: '#privacidade', label: 'Privacidade' },
    ],
    title: 'Governo',
  },
  {
    links: [
      { href: '#atendimento', label: 'Atendimento' },
      { href: '#contato', label: 'Contato' },
      { href: '#mapa-do-site', label: 'Mapa do site' },
      { href: '#ajuda', label: 'Ajuda' },
    ],
    title: 'Suporte',
  },
];

function FacebookIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 8h3V4h-3c-3.1 0-5 1.9-5 5v3H6v4h3v4h4v-4h3.2l.8-4h-4V9c0-.7.3-1 1-1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect height="15" rx="4" stroke="currentColor" strokeWidth="2" width="15" x="4.5" y="4.5" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.7" cy="7.3" fill="currentColor" r="1.1" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m5 4 14 16M19 4 5 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect height="12" rx="3" fill="currentColor" width="18" x="3" y="6" />
      <path d="m11 9 5 3-5 3V9Z" fill="var(--footer-surface)" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.5 4v10.2a4.3 4.3 0 1 1-3.7-4.3v3.2a1.2 1.2 0 1 0 .9 1.1V4h2.8Zm0 0c.5 2.3 2 3.7 4.5 4.1v3.1c-1.7-.1-3.2-.7-4.5-1.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.8 10.7c-.5-3-2.3-4.7-5-4.7-3.6 0-5.8 2.7-5.8 6s2.2 6 5.9 6c3 0 5.1-1.7 5.1-4.1 0-2-1.5-3.2-4.2-3.2-1.9 0-3.1.9-3.1 2.1 0 1.1.9 1.9 2.2 1.9 1.7 0 2.7-1.1 2.7-2.8 0-3.8-2.4-6.2-6-6.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 9h4v11H5V9Zm2-5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm6 5h4v1.5c.7-1 1.8-1.8 3.3-1.8 2.4 0 3.7 1.6 3.7 4.5V20h-4v-6c0-1.3-.5-2-1.6-2-1 0-1.4.7-1.4 2v6h-4V9Z" fill="currentColor" />
    </svg>
  );
}

const defaultSocialItems: FooterSocialItem[] = [
  { href: '#facebook', icon: <FacebookIcon />, label: 'Facebook' },
  { href: '#instagram', icon: <InstagramIcon />, label: 'Instagram' },
  { href: '#x', icon: <XIcon />, label: 'X' },
  { href: '#youtube', icon: <YoutubeIcon />, label: 'YouTube' },
  { href: '#tiktok', icon: <TiktokIcon />, label: 'TikTok' },
  { href: '#threads', icon: <ThreadsIcon />, label: 'Threads' },
  { href: '#linkedin', icon: <LinkedinIcon />, label: 'LinkedIn' },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d={open ? 'm6 15 6-6 6 6' : 'm6 9 6 6 6-6'}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function DefaultBrand() {
  return (
    <span className="ds-footer-logo" aria-hidden="true">
      <span className="ds-footer-logo__mark">
        <span />
        <span />
      </span>
      <span className="ds-footer-logo__text">.GOV.BR</span>
    </span>
  );
}

function FooterActionLink({
  className,
  item,
  children,
}: {
  className: string;
  item: FooterLink | FooterSocialItem;
  children: ReactNode;
}) {
  const ariaLabel = item.ariaLabel ?? item.label;
  const rel = item.external ? 'noopener noreferrer' : undefined;
  const target = item.external ? '_blank' : undefined;

  if (item.href && !('disabled' in item && item.disabled)) {
    return (
      <a
        aria-current={'current' in item && item.current ? 'page' : undefined}
        aria-label={ariaLabel}
        className={className}
        href={item.href}
        onClick={item.onClick}
        rel={rel}
        target={target}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      aria-current={'current' in item && item.current ? 'page' : undefined}
      aria-disabled={'disabled' in item && item.disabled ? 'true' : undefined}
      aria-label={ariaLabel}
      className={className}
      disabled={'disabled' in item && item.disabled ? item.disabled : undefined}
      onClick={item.onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function FooterSectionGroup({ section }: { section: FooterSection }) {
  const sectionId = useId();
  const [open, setOpen] = useState(section.defaultOpen ?? false);
  const className = [
    'ds-footer__section',
    open ? 'ds-footer__section--open' : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={className} aria-labelledby={`${sectionId}-title`}>
      <div className="ds-footer__section-heading">
        <h2 className="ds-footer__section-title" id={`${sectionId}-title`}>
          {section.title}
        </h2>
        <button
          aria-controls={`${sectionId}-links`}
          aria-expanded={open}
          aria-label={`${open ? 'Recolher' : 'Expandir'} ${section.title}`}
          className="ds-footer__section-toggle"
          onClick={() => {
            setOpen((current) => !current);
          }}
          type="button"
        >
          <ChevronIcon open={open} />
        </button>
      </div>
      <ul className="ds-footer__section-list" id={`${sectionId}-links`}>
        {section.links.map((link) => (
          <li className="ds-footer__section-item" key={`${section.title}-${link.label}`}>
            <FooterActionLink className="ds-footer__link" item={link}>
              <span>{link.label}</span>
            </FooterActionLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

function FooterBrandSlot({
  ariaLabel,
  brand,
  href,
}: {
  ariaLabel: string;
  brand: ReactNode;
  href?: string;
}) {
  if (href) {
    return (
      <a aria-label={ariaLabel} className="ds-footer__brand" href={href}>
        {brand}
      </a>
    );
  }

  return (
    <div aria-label={ariaLabel} className="ds-footer__brand">
      {brand}
    </div>
  );
}

export function Footer({
  brand,
  brandAriaLabel = 'SP.GOV.BR',
  brandHref,
  className,
  copyright = 'Governo do Estado de Sao Paulo - Copyright 2026 - Todos os direitos reservados',
  legalLinks = [],
  navAriaLabel = 'Navegacao de rodape',
  sections = defaultSections,
  socialAriaLabel = 'Redes sociais',
  socialItems = defaultSocialItems,
}: FooterProps) {
  const resolvedBrand = brand === undefined ? <DefaultBrand /> : brand;
  const classNames = ['ds-footer', className].filter(Boolean).join(' ');

  return (
    <footer className={classNames}>
      <div className="ds-footer__container">
        {sections.length > 0 ? (
          <nav aria-label={navAriaLabel} className="ds-footer__nav">
            <div className="ds-footer__sections">
              {sections.map((section) => (
                <FooterSectionGroup key={section.title} section={section} />
              ))}
            </div>
          </nav>
        ) : null}

        <div className="ds-footer__divider" aria-hidden="true" />

        <div className="ds-footer__identity-row">
          {resolvedBrand ? (
            <FooterBrandSlot ariaLabel={brandAriaLabel} brand={resolvedBrand} href={brandHref} />
          ) : null}

          {socialItems.length > 0 ? (
            <nav aria-label={socialAriaLabel} className="ds-footer__social-nav">
              <ul className="ds-footer__social-list">
                {socialItems.map((item) => (
                  <li className="ds-footer__social-item" key={item.label}>
                    <FooterActionLink className="ds-footer__social-link" item={item}>
                      <span className="ds-footer__social-icon" aria-hidden="true">
                        {item.icon ?? item.label.slice(0, 2)}
                      </span>
                      <span className="ds-footer__social-label">{item.label}</span>
                    </FooterActionLink>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <div className="ds-footer__legal-row">
          <p className="ds-footer__copyright">{copyright}</p>
          {legalLinks.length > 0 ? (
            <ul className="ds-footer__legal-list">
              {legalLinks.map((link) => (
                <li className="ds-footer__legal-item" key={link.label}>
                  <FooterActionLink className="ds-footer__legal-link" item={link}>
                    <span>{link.label}</span>
                  </FooterActionLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
