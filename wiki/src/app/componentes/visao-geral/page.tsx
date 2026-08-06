import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { figmaDoComponente, listarComponentes, obterConteudoComponente } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Componentes',
  description:
    'Catálogo completo dos componentes do Sampa Design System, com API, estados, tokens e exemplos.',
};

export default function CatalogoComponentes() {
  const componentes = listarComponentes();

  const fichas = componentes.map((c) => {
    const conteudo = obterConteudoComponente(c.slug);
    const par = figmaDoComponente(c.slug);
    return {
      slug: c.slug,
      nome: c.name,
      resumo: conteudo?.resumo ?? c.oneLiner ?? '',
      categoria: conteudo?.categoria ?? 'Sem categoria',
      status: conteudo?.status ?? null,
      temFigma: Boolean(par),
      props: c.props.length,
      stories: c.stories.length,
    };
  });

  const categorias = [...new Set(fichas.map((f) => f.categoria))].sort((a, b) =>
    a.localeCompare(b, 'pt-BR'),
  );

  const semFigma = fichas.filter((f) => !f.temFigma);

  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Componentes' }]} />

      <h1>Componentes</h1>
      <p className="wiki-prosa__resumo">
        Componentes com implementação em React, documentados a partir do código-fonte e da
        biblioteca do Figma. Cada página traz três abas: visão geral de uso, diretrizes de design e
        referência técnica.
      </p>

      {categorias.map((categoria) => (
        <section key={categoria}>
          <h2 id={`categoria-${categoria.toLowerCase().replace(/\s+/g, '-')}`}>{categoria}</h2>
          <div className="wiki-cartoes">
            {fichas
              .filter((f) => f.categoria === categoria)
              .map((f) => (
                <Link className="wiki-cartao" href={`/componentes/${f.slug}`} key={f.slug}>
                  <span className="wiki-cartao__titulo">{f.nome}</span>
                  <span className="wiki-cartao__descricao">{f.resumo}</span>
                  <span className="wiki-cartao__meta">
                    {f.props} props · {f.stories} exemplos
                    {f.temFigma ? '' : ' · sem par no Figma'}
                  </span>
                </Link>
              ))}
          </div>
        </section>
      ))}

      {semFigma.length ? (
        <>
          <h2 id="sem-figma">Componentes sem par publicado no Figma</h2>
          <p>
            Estes {semFigma.length} componentes existem apenas em código. Estão documentados
            normalmente, mas não têm componente correspondente publicado na biblioteca do Figma —
            uma decisão pendente registrada em <code>INCONSISTENCIAS.md</code>.
          </p>
          <ul>
            {semFigma.map((f) => (
              <li key={f.slug}>
                <Link href={`/componentes/${f.slug}`}>{f.nome}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
