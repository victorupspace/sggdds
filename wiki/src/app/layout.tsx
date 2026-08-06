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

/**
 * Endereço público da Wiki, usado como base para canonical e Open Graph.
 *
 * A Vercel expõe VERCEL_PROJECT_PRODUCTION_URL no build — sempre o domínio de
 * produção, mesmo em deploy de preview, que é o que canonical e OG pedem.
 * Assim o nome do projeto na Vercel pode mudar sem exigir alteração de código.
 * O valor fixo no fim é só para build local.
 */
const URL_PUBLICA =
  process.env.NEXT_PUBLIC_URL_WIKI ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://wiki-sampads.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(URL_PUBLICA),
  title: {
    default: 'Sampa Design System',
    template: '%s · Sampa Design System',
  },
  description:
    'Documentação oficial do Sampa Design System — Governo do Estado de São Paulo, Prodesp. Fundamentos, componentes, padrões e recursos para designers e pessoas desenvolvedoras.',
  // Relativo de propósito: o Next resolve por rota contra metadataBase, então
  // cada página ganha o próprio canonical sem repetir a URL em lugar nenhum.
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Sampa Design System',
    url: './',
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
            {/* O Pagefind indexa o <body> inteiro por padrão, então cabeçalho,
                navegação, sumário e rodapé entravam no índice: todo resultado
                começava com "Design System Figma Storybook…" em vez do conteúdo
                da página. Marcar aqui o corpo indexável, e ignorar o cromo na
                raiz de cada componente, resolve o trecho e ainda tira do índice
                palavras que se repetem nas 86 páginas. */}
            <main className="wiki-conteudo" data-pagefind-body id="conteudo">
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
