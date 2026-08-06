'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { Icone } from '@/components/IconesHome';

interface Resultado {
  url: string;
  meta: { title?: string };
  excerpt: string;
}

interface PagefindResultado {
  data: () => Promise<Resultado>;
}

interface PagefindApi {
  search: (termo: string) => Promise<{ results: PagefindResultado[] }>;
}

/**
 * Busca global via Pagefind: o índice é gerado no build sobre o HTML exportado
 * (`pagefind --site out`), então não há serviço externo nem chamada de rede em
 * runtime além do próprio índice estático.
 */
export function Busca({
  tamanho = 'compacta',
  rotulo = 'Buscar na documentação',
  dica = 'Buscar…',
}: {
  tamanho?: 'compacta' | 'grande';
  rotulo?: string;
  dica?: string;
} = {}) {
  const id = useId();
  const [termo, setTermo] = useState('');
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [indisponivel, setIndisponivel] = useState(false);
  const apiRef = useRef<PagefindApi | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function buscar() {
      const busca = termo.trim();
      if (busca.length < 2) {
        setResultados([]);
        return;
      }

      if (!apiRef.current) {
        try {
          // O índice do Pagefind só passa a existir depois do build, então este
          // módulo não pode ser resolvido em tempo de compilação. Guardar o
          // caminho em uma constante impede o TypeScript de tentar.
          const caminhoDoIndice = '/pagefind/pagefind.js';
          const modulo = (await import(
            /* webpackIgnore: true */ caminhoDoIndice
          )) as unknown as PagefindApi;
          apiRef.current = modulo;
        } catch {
          setIndisponivel(true);
          return;
        }
      }

      const resposta = await apiRef.current.search(busca);
      const dados = await Promise.all(resposta.results.slice(0, 8).map((r) => r.data()));
      if (!cancelado) setResultados(dados);
    }

    const timer = setTimeout(() => void buscar(), 150);
    return () => {
      cancelado = true;
      clearTimeout(timer);
    };
  }, [termo]);

  return (
    <div className={`wiki-busca${tamanho === 'grande' ? ' wiki-busca--grande' : ''}`}>
      <label className="wiki-visualmente-oculto" htmlFor={id}>
        {rotulo}
      </label>
      {tamanho === 'grande' ? (
        <span aria-hidden="true" className="wiki-busca__icone">
          <Icone nome="busca" />
        </span>
      ) : null}
      <input
        autoComplete="off"
        className="wiki-busca__campo"
        id={id}
        onChange={(e) => { setTermo(e.target.value); }}
        placeholder={dica}
        type="search"
        value={termo}
      />

      {termo.trim().length >= 2 ? (
        <div className="wiki-busca__resultados" role="status">
          {indisponivel ? (
            <p className="wiki-busca__vazio">
              O índice de busca é gerado no build. Rode <code>npm run build</code> para usá-lo
              localmente.
            </p>
          ) : resultados.length === 0 ? (
            <p className="wiki-busca__vazio">Nenhum resultado para “{termo}”.</p>
          ) : (
            <ul className="wiki-busca__lista">
              {resultados.map((r) => (
                <li key={r.url}>
                  <a className="wiki-busca__item" href={r.url}>
                    <span className="wiki-busca__item-titulo">{r.meta.title ?? r.url}</span>
                    <span
                      className="wiki-busca__item-trecho"
                      dangerouslySetInnerHTML={{ __html: r.excerpt }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
