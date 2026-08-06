import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { Sidebar } from '@/components/Sidebar';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { Toc } from '@/components/Toc';
import { navegacaoCompleta } from '@/lib/nav';

import './globals.css';

/**
 * Plus Jakarta Sans é a única família tipográfica do Design System.
 * next/font baixa e auto-hospeda no build: sem requisição a CDN em runtime.
 */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--fonte-plus-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wiki-sampads.vercel.app'),
  title: {
    default: 'Sampa Design System',
    template: '%s · Sampa Design System',
  },
  description:
    'Documentação oficial do Sampa Design System — Governo do Estado de São Paulo, Prodesp. Fundamentos, componentes, padrões e recursos para designers e pessoas desenvolvedoras.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Sampa Design System',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const grupos = navegacaoCompleta();

  return (
    <html lang="pt-BR" className={plusJakarta.variable}>
      <body>
        <a className="wiki-skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>

        <SiteHeader />

        <div className="wiki-shell">
          <Sidebar grupos={grupos} />

          <div className="wiki-main">
            <main className="wiki-conteudo" id="conteudo">
              {children}
            </main>
            <Toc />
          </div>
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
