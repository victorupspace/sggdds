'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { GrupoNav } from '@/lib/nav';

const LARGURA_DESKTOP = '(min-width: 900px)';

export function Sidebar({ grupos }: { grupos: GrupoNav[] }) {
  const caminho = usePathname();
  const atual = caminho.replace(/\/$/, '') || '/';

  const grupoAtivo = grupos.find((g) => g.itens.some((i) => i.href === atual))?.titulo;

  // null enquanto ninguém mexeu: nesse estado só a categoria da página atual
  // fica aberta. Depois do primeiro clique passamos a respeitar a escolha.
  const [abertos, setAbertos] = useState<Set<string> | null>(null);

  // Ao navegar, a categoria de destino abre — mesmo que a pessoa já tenha
  // fechado outras. É um ajuste de estado durante a renderização, e não um
  // efeito: o React reexecuta o componente antes de pintar, sem render extra.
  const [grupoAnterior, setGrupoAnterior] = useState(grupoAtivo);
  if (grupoAtivo !== grupoAnterior) {
    setGrupoAnterior(grupoAtivo);
    if (grupoAtivo) {
      setAbertos((atuais) =>
        atuais && !atuais.has(grupoAtivo) ? new Set(atuais).add(grupoAtivo) : atuais,
      );
    }
  }

  const estaAberto = (titulo: string) => (abertos ? abertos.has(titulo) : titulo === grupoAtivo);

  function alternar(titulo: string, aberto: boolean) {
    setAbertos((atuais) => {
      const proximo = new Set(atuais ?? (grupoAtivo ? [grupoAtivo] : []));
      if (aberto) proximo.add(titulo);
      else proximo.delete(titulo);
      return proximo;
    });
  }

  // ---- navegação inteira recolhível no celular ----
  const [navAberta, setNavAberta] = useState<boolean | null>(null);

  useEffect(() => {
    const consulta = window.matchMedia(LARGURA_DESKTOP);
    const aplicar = () => { setNavAberta(consulta.matches); };
    aplicar();
    consulta.addEventListener('change', aplicar);
    return () => { consulta.removeEventListener('change', aplicar); };
  }, []);

  // Recolher a navegação depois de escolher uma página é consequência do
  // clique, então pertence ao manipulador do evento — não a um efeito que
  // observa a rota.
  function aoEscolherPagina() {
    if (!window.matchMedia(LARGURA_DESKTOP).matches) setNavAberta(false);
  }

  const listaVisivel = navAberta !== false;
  const totalPaginas = grupos.reduce((total, g) => total + g.itens.length, 0);

  return (
    <nav aria-label="Navegação principal" className="wiki-sidebar">
      <button
        aria-controls="wiki-sidebar-lista"
        aria-expanded={listaVisivel}
        className="wiki-sidebar__gatilho"
        onClick={() => { setNavAberta((v) => v === false); }}
        type="button"
      >
        <span>Navegação</span>
        <span className="wiki-sidebar__gatilho-meta">{totalPaginas} páginas</span>
      </button>

      <div
        className={`wiki-sidebar__conteudo${listaVisivel ? '' : ' wiki-sidebar__conteudo--oculto'}`}
        id="wiki-sidebar-lista"
      >
        {grupos.map((grupo) => {
          const aberto = estaAberto(grupo.titulo);
          const temPaginaAtual = grupo.titulo === grupoAtivo;

          return (
            <details
              className="wiki-sidebar__grupo"
              key={grupo.titulo}
              onToggle={(e) => { alternar(grupo.titulo, e.currentTarget.open); }}
              open={aberto}
            >
              <summary className="wiki-sidebar__titulo">
                <span className="wiki-sidebar__seta" aria-hidden="true" />
                <span className="wiki-sidebar__titulo-texto">{grupo.titulo}</span>
                {/* A contagem por categoria revelava quantos componentes o
                    sistema tem. Sobra só a marca da categoria que contém a
                    página atual, quando ela está recolhida. */}
                <span className="wiki-sidebar__contagem">
                  {temPaginaAtual && !aberto ? '•' : ''}
                </span>
              </summary>

              <ul className="wiki-sidebar__lista">
                {grupo.itens.map((item) => (
                  <li key={item.href}>
                    <Link
                      aria-current={atual === item.href ? 'page' : undefined}
                      className="wiki-sidebar__link"
                      href={item.href}
                      onClick={aoEscolherPagina}
                    >
                      {item.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      </div>
    </nav>
  );
}
