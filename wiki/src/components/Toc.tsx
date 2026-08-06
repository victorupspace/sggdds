'use client';

import { useCallback, useEffect, useState } from 'react';

interface Titulo {
  id: string;
  texto: string;
  nivel: number;
}

/**
 * `Node.textContent` só é `null` para nós `Document`/`DocumentType` — nunca
 * para um elemento de título. O parâmetro fica explicitamente nulo porque
 * versões diferentes do TypeScript tipam `HTMLElement.textContent` de forma
 * diferente (algumas o marcam sempre `string`, outras herdam o `string | null`
 * de `Node`); declarar aqui evita depender de qual delas está em uso.
 */
function textoDoTitulo(valor: string | null): string {
  return valor ?? '';
}

/**
 * "Nesta página" — lê os títulos h2/h3 renderizados dentro de #conteudo.
 *
 * Fica no cliente porque o conteúdo vem tanto de MDX quanto de componentes
 * gerados a partir de dados. Em páginas com abas, só entram os títulos do
 * painel visível: um MutationObserver reage à troca de aba.
 */
export function Toc() {
  const [titulos, setTitulos] = useState<Titulo[]>([]);
  const [ativo, setAtivo] = useState<string | null>(null);

  const varrer = useCallback(() => {
    const alvo = document.getElementById('conteudo');
    if (!alvo) return [];

    const encontrados = Array.from(alvo.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]'))
      .filter((h) => !h.closest('[hidden]'))
      .map((h) => ({ id: h.id, texto: textoDoTitulo(h.textContent), nivel: h.tagName === 'H2' ? 2 : 3 }));

    setTitulos(encontrados);
    return encontrados;
  }, []);

  useEffect(() => {
    const alvo = document.getElementById('conteudo');
    if (!alvo) return;

    let observadorSecoes: IntersectionObserver | null = null;

    function reconstruir() {
      const encontrados = varrer();
      observadorSecoes?.disconnect();
      if (encontrados.length === 0) return;

      observadorSecoes = new IntersectionObserver(
        (entradas) => {
          const visivel = entradas.find((e) => e.isIntersecting);
          if (visivel) setAtivo(visivel.target.id);
        },
        { rootMargin: '-80px 0px -70% 0px' },
      );

      for (const t of encontrados) {
        const el = document.getElementById(t.id);
        if (el) observadorSecoes.observe(el);
      }
    }

    reconstruir();

    // Troca de aba altera o atributo hidden dos painéis.
    const observadorAbas = new MutationObserver(reconstruir);
    observadorAbas.observe(alvo, {
      attributes: true,
      attributeFilter: ['hidden'],
      subtree: true,
    });

    return () => {
      observadorAbas.disconnect();
      observadorSecoes?.disconnect();
    };
  }, [varrer]);

  if (titulos.length < 2) return <aside className="wiki-toc" data-pagefind-ignore="all" />;

  return (
    <aside aria-labelledby="toc-titulo" className="wiki-toc" data-pagefind-ignore="all">
      <h2 className="wiki-toc__titulo" id="toc-titulo">
        Nesta página
      </h2>
      <ul className="wiki-toc__lista">
        {titulos.map((t) => (
          <li key={t.id}>
            <a
              aria-current={ativo === t.id ? 'location' : undefined}
              className={`wiki-toc__link${t.nivel === 3 ? ' wiki-toc__link--nivel-3' : ''}`}
              href={`#${t.id}`}
              style={ativo === t.id ? { color: 'var(--wiki-text)', fontWeight: 600 } : undefined}
            >
              {t.texto}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
