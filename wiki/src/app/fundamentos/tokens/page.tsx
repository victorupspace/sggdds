import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { listarTokens, metaTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Design tokens',
  description:
    'O que são tokens no Sampa Design System, como as camadas se relacionam, como nomear e como consumir em Figma e em código.',
};

const CAMADAS: Record<string, { titulo: string; papel: string; regra: string }> = {
  primitivo: {
    titulo: 'Primitivo',
    papel: 'O inventário bruto: cada cor, medida e peso que o sistema conhece.',
    regra: 'Nunca use direto em um componente. Primitivo existe para ser referenciado.',
  },
  marca: {
    titulo: 'Marca',
    papel: 'As cores e a tipografia que identificam o Governo do Estado de São Paulo.',
    regra: 'Use apenas onde a identidade precisa aparecer. Não é paleta de interface.',
  },
  semantico: {
    titulo: 'Semântico',
    papel: 'O significado: fundo neutro, texto primário, borda de erro, superfície de sucesso.',
    regra: 'É esta a camada que você usa ao construir uma tela.',
  },
  componente: {
    titulo: 'Componente',
    papel: 'As decisões já tomadas dentro de cada componente: altura do botão, raio do card.',
    regra: 'Consumida pelo próprio componente. Sobrescreva só para casos excepcionais.',
  },
  extra: {
    titulo: 'Extra (só código)',
    papel: 'Sombras que existem no código e não vieram do Figma.',
    regra: 'Divergência conhecida: precisam virar variables no Figma.',
  },
};

export default function PaginaTokens() {
  const tokens = listarTokens();
  const meta = metaTokens() as {
    colecoes: { arquivo: string; colecaoFigma: string | null; camada: string; tokenCount: number }[];
    tokensDeComponenteSemAlias?: string[];
  };

  const porCamada = new Map<string, number>();
  for (const t of tokens) porCamada.set(t.camada, (porCamada.get(t.camada) ?? 0) + 1);

  const gruposComponente = [
    ...new Set(
      tokens
        .filter((t) => t.camada === 'componente')
        .map((t) => t.cssVar.replace('--ds-component-', '').split('-')[0]),
    ),
  ].sort();

  const semAlias = meta.tokensDeComponenteSemAlias ?? [];

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Fundamentos', href: '/fundamentos/visao-geral' }, { titulo: 'Design tokens' }]}
      />

      <h1>Design tokens</h1>
      <p className="wiki-prosa__resumo">
        Token é uma decisão de design guardada como valor nomeado. Em vez de escrever{' '}
        <code>#f5f5f5</code> em cinquenta lugares, o sistema guarda{' '}
        <code>color/background/neutral/default</code> e todos apontam para lá. Mudar a decisão passa
        a ser mudar um valor, não caçar cinquenta.
      </p>

      <h2 id="numeros">O inventário</h2>
      <div className="wiki-numeros">
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{tokens.length.toLocaleString('pt-BR')}</span>
          <span className="wiki-numero__rotulo">tokens publicados</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{meta.colecoes.length}</span>
          <span className="wiki-numero__rotulo">coleções de origem</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{gruposComponente.length}</span>
          <span className="wiki-numero__rotulo">grupos de componente</span>
        </div>
      </div>

      <h2 id="camadas">As camadas</h2>
      <p>
        Um token de componente aponta para um semântico, que aponta para um primitivo. Essa cadeia
        é o que permite trocar a identidade visual sem reescrever componente nenhum.
      </p>

      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Camadas de token</caption>
          <thead>
            <tr>
              <th scope="col">Camada</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Papel</th>
              <th scope="col">Regra de uso</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(CAMADAS).map(([chave, info]) => (
              <tr key={chave}>
                <td>
                  <strong>{info.titulo}</strong>
                </td>
                <td>{(porCamada.get(chave) ?? 0).toLocaleString('pt-BR')}</td>
                <td>{info.papel}</td>
                <td>{info.regra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="cadeia">Como a cadeia funciona na prática</h2>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`--ds-component-button-color-background-primary   (componente)
  └─ --ds-semantic-color-background-brand-primary-default   (semântico)
       └─ --ds-brand-color-brand-red-primary                (marca)
            └─ #c50007                                      (valor final)`}</code>
      </pre>
      <p>
        Quem constrói uma tela usa a camada semântica. Quem constrói um componente do sistema usa a
        camada de componente. Ninguém usa primitivo direto.
      </p>

      <h2 id="nomenclatura">Nomenclatura</h2>
      <p>
        No Figma o nome é separado por barras; em CSS vira um prefixo com hífens. A conversão é
        automática e determinística:
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Conversão de nomes</caption>
          <thead>
            <tr>
              <th scope="col">No Figma</th>
              <th scope="col">Em CSS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>color/background/brand/primary/default</code>
              </td>
              <td>
                <code>--ds-semantic-color-background-brand-primary-default</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>button/color/background/primary</code>
              </td>
              <td>
                <code>--ds-component-button-color-background-primary</code>
              </td>
            </tr>
            <tr>
              <td>
                <code>spacing/16</code>
              </td>
              <td>
                <code>--ds-primitive-spacing-16</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="colecoes">Coleções de origem</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Coleções</caption>
          <thead>
            <tr>
              <th scope="col">Arquivo</th>
              <th scope="col">Collection no Figma</th>
              <th scope="col">Camada</th>
              <th scope="col">Tokens</th>
            </tr>
          </thead>
          <tbody>
            {meta.colecoes.map((c) => (
              <tr key={c.arquivo}>
                <td>
                  <code>{c.arquivo}</code>
                </td>
                <td>{c.colecaoFigma ? <code>{c.colecaoFigma}</code> : <em>só no código</em>}</td>
                <td>{CAMADAS[c.camada]?.titulo ?? c.camada}</td>
                <td>{c.tokenCount.toLocaleString('pt-BR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="grupos-componente">Grupos de componente</h2>
      <p>
        A camada de componente cobre {gruposComponente.length} grupos. Cada um é um prefixo{' '}
        <code>--ds-component-&lt;grupo&gt;-*</code>.
      </p>
      <ul className="wiki-lista-tokens">
        {gruposComponente.map((g) => (
          <li key={g}>
            <code>{g}</code>
          </li>
        ))}
      </ul>

      {semAlias.length ? (
        <>
          <h2 id="defeitos">Defeito conhecido na origem</h2>
          <div className="wiki-aviso">
            <p className="wiki-aviso__titulo">
              {semAlias.length} tokens saem sem unidade e sem alias
            </p>
            <p>
              São durações de movimento e opacidades de backdrop que, no Figma, apontam para
              variables de <strong>espaçamento</strong> em vez de para variables de tempo. O
              resultado é um número solto: <code>--ds-component-tooltip-motion-duration-enter: 6</code>.
              Enquanto os aliases não forem corrigidos na origem, a página de{' '}
              <Link href="/fundamentos/motion">Motion</Link> não tem durações reais para documentar.
            </p>
          </div>
          <ul className="wiki-lista-tokens">
            {semAlias.map((t) => (
              <li key={t}>
                <code>{t}</code>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2 id="uso-figma">Como usar no Figma</h2>
      <p>
        As collections estão publicadas na biblioteca <strong>Foundations</strong>. Ao estilizar uma
        camada, aplique a variable — nunca digite o valor. Se a variable que você precisa não
        existe, isso é um sinal de que falta uma decisão de sistema, não de que você deve inventar
        um valor.
      </p>

      <h2 id="uso-codigo">Como usar em código</h2>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`import '@government/design-system/tokens.css';

.painel {
  padding: var(--ds-primitive-spacing-24);
  border-radius: var(--ds-primitive-border-radius-radius-lg);
  background: var(--ds-semantic-color-background-neutral-default);
  color: var(--ds-semantic-text-style-content-color-typography-primary);
}`}</code>
      </pre>

      <h2 id="downloads">Downloads</h2>
      <ul>
        <li>
          <Link href="/recursos/downloads">Tokens em JSON e CSS</Link>
        </li>
        <li>
          <Link href="/fundamentos/cor">Paleta com matriz de contraste</Link>
        </li>
      </ul>
    </div>
  );
}
