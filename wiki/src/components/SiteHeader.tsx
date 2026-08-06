import Link from 'next/link';

import { Busca } from './Busca';

const FIGMA_UI_KIT =
  'https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components';
const STORYBOOK = 'https://sggdds.vercel.app';

function IconeExterno() {
  return (
    <svg aria-hidden="true" fill="none" height="12" viewBox="0 0 12 12" width="12">
      <path
        d="M4.5 2h5.5v5.5M10 2 4 8M8 7.5V10H2V4h2.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="wiki-header">
      <Link className="wiki-header__marca" href="/">
        {/* Logo oficial, vetor exportado de Foundations (node 40000172:79) */}
        <img
          alt="Governo do Estado de São Paulo - Prodesp"
          className="wiki-header__logo"
          height={26}
          src="/logo-spgov.svg"
          width={195}
        />
        <span className="wiki-header__nome">Sampa Design System</span>
      </Link>

      <div className="wiki-header__acoes">
        <Busca />
        <a
          className="wiki-header__link-externo"
          href={FIGMA_UI_KIT}
          rel="noreferrer noopener"
          target="_blank"
        >
          Figma <IconeExterno />
        </a>
        <a
          className="wiki-header__link-externo"
          href={STORYBOOK}
          rel="noreferrer noopener"
          target="_blank"
        >
          Storybook <IconeExterno />
        </a>
      </div>
    </header>
  );
}
