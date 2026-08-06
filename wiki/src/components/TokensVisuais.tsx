import {
  classificar,
  formatarRazao,
  formatarRazaoCurta,
  razaoDeContraste,
  type NivelWcag,
} from '@/lib/contraste';
import type { TokenInventariado } from '@/lib/dados';

const CLASSE_NIVEL: Record<NivelWcag, string> = {
  AAA: 'wiki-nivel--aaa',
  AA: 'wiki-nivel--aa',
  'AA-grande': 'wiki-nivel--aa-grande',
  reprova: 'wiki-nivel--reprova',
};

const ROTULO_NIVEL: Record<NivelWcag, string> = {
  AAA: 'AAA',
  AA: 'AA',
  'AA-grande': 'AA grande',
  reprova: 'reprova',
};

/* ── Rampas ────────────────────────────────────────────────────────────────
 * Cores com escala numérica viram rampa: a progressão de tom é a informação
 * principal, e ela só aparece quando os degraus estão encostados. Número e
 * valor ficam FORA do bloco de cor, para não depender do contraste do tom.
 */

export interface DegrauRampa {
  degrau: string;
  token: TokenInventariado;
}

export function Rampa({
  nome,
  degraus,
  descricao,
}: {
  nome: string;
  degraus: DegrauRampa[];
  descricao?: string;
}) {
  const rotulo = nome.split('/').pop() ?? nome;
  const familia = nome.split('/').slice(0, -1).join('/');

  return (
    <section className="wiki-rampa">
      <header className="wiki-rampa__cabecalho">
        <h3 className="wiki-rampa__nome">{rotulo}</h3>
        <code className="wiki-rampa__caminho">{familia}</code>
      </header>
      {descricao ? <p className="wiki-rampa__descricao">{descricao}</p> : null}

      <ol className="wiki-rampa__degraus">
        {degraus.map(({ degrau, token }) => {
          const contraste = razaoDeContraste(token.valorResolvido, '#ffffff');
          return (
            <li className="wiki-rampa__degrau" key={token.cssVar}>
              <span
                aria-hidden="true"
                className="wiki-rampa__cor"
                style={{ background: token.valorResolvido }}
                title={
                  contraste
                    ? `${token.figmaPath} · contraste com branco ${formatarRazao(contraste)}`
                    : token.figmaPath
                }
              />
              <span className="wiki-rampa__degrau-numero">{degrau}</span>
              <code className="wiki-rampa__degrau-valor">{token.valorResolvido}</code>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ── Paleta ────────────────────────────────────────────────────────────────
 * Cores sem escala viram cartões onde a própria cor é o cartão: nenhuma
 * borda, nenhuma moldura, nenhum ornamento competindo com ela. O texto vive
 * abaixo, no fundo da página.
 */

export function ListaCores({ tokens }: { tokens: TokenInventariado[] }) {
  return (
    <ul className="wiki-paleta">
      {tokens.map((t) => {
        const valor = t.valorResolvido;
        const folha = t.figmaPath.split('/').pop() ?? t.figmaPath;

        // Contraste é simétrico, então a linha responde uma coisa só: qual
        // tinta pode ser usada sobre esta cor (ou ela sobre branco).
        const escuro = razaoDeContraste(valor, '#000000') ?? 1;
        const claro = razaoDeContraste(valor, '#ffffff') ?? 1;
        const melhor = escuro >= claro ? 'escuro' : 'claro';
        const razao = Math.max(escuro, claro);
        const atinge = razao >= 4.5;

        return (
          <li className="wiki-paleta__item" key={t.cssVar}>
            {/* Cores quase brancas precisam de um limite mais forte, senão
                desaparecem no fundo da página. */}
            <span
              aria-hidden="true"
              className={`wiki-paleta__cor${claro < 1.6 ? ' wiki-paleta__cor--clara' : ''}`}
              style={{ background: valor }}
            />
            <span className="wiki-paleta__nome">{folha}</span>
            <code className="wiki-paleta__valor">{valor}</code>
            <span className={`wiki-paleta__tinta${atinge ? '' : ' wiki-paleta__tinta--alerta'}`}>
              {atinge
                ? `Texto ${melhor} · ${formatarRazaoCurta(razao)}`
                : `Nenhuma tinta atinge AA · ${formatarRazaoCurta(razao)}`}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** Mantido para as páginas que já chamavam GradeCores. */
export function GradeCores({ tokens }: { tokens: TokenInventariado[] }) {
  return <ListaCores tokens={tokens} />;
}

export function AmostraCor({ token }: { token: TokenInventariado }) {
  return <ListaCores tokens={[token]} />;
}

/* ── Matriz de contraste ───────────────────────────────────────────────── */

export interface ParContraste {
  rotuloTexto: string;
  corTexto: string;
  rotuloFundo: string;
  corFundo: string;
  contexto: string;
}

export function MatrizContraste({ pares }: { pares: ParContraste[] }) {
  const linhas = pares.map((par) => {
    const razao = razaoDeContraste(par.corTexto, par.corFundo);
    const nivel = razao ? classificar(razao) : null;
    return { ...par, razao, nivel };
  });

  const reprovando = linhas.filter((l) => l.nivel === 'reprova' || l.nivel === 'AA-grande');

  return (
    <>
      <ul className="wiki-contraste">
        {linhas.map((l) => (
          <li
            className={`wiki-contraste__linha${
              l.nivel === 'reprova' || l.nivel === 'AA-grande'
                ? ' wiki-contraste__linha--alerta'
                : ''
            }`}
            key={`${l.corTexto}-${l.corFundo}-${l.rotuloTexto}`}
          >
            {/* Amostra sem texto: exibir texto real aqui criaria a própria
                violação que esta tabela existe para denunciar. */}
            <span
              aria-hidden="true"
              className="wiki-contraste__amostra"
              style={{ background: l.corFundo }}
            >
              <span className="wiki-contraste__barra" style={{ background: l.corTexto }} />
              <span
                className="wiki-contraste__barra wiki-contraste__barra--curta"
                style={{ background: l.corTexto }}
              />
            </span>

            <span className="wiki-contraste__par">
              <span className="wiki-contraste__tokens">
                <code>{l.rotuloTexto}</code>
                <span className="wiki-contraste__sobre">sobre</span>
                <code>{l.rotuloFundo}</code>
              </span>
              <span className="wiki-contraste__contexto">{l.contexto}</span>
            </span>

            <span className="wiki-contraste__resultado">
              <span className="wiki-contraste__razao">
                {l.razao ? formatarRazao(l.razao) : '—'}
              </span>
              {l.nivel ? (
                <span className={`wiki-nivel ${CLASSE_NIVEL[l.nivel]}`}>
                  {ROTULO_NIVEL[l.nivel]}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      {reprovando.length ? (
        <div className="wiki-aviso" style={{ marginBlockStart: 'var(--ds-primitive-spacing-16)' }}>
          <p className="wiki-aviso__titulo">
            {reprovando.length}{' '}
            {reprovando.length === 1 ? 'par não atinge' : 'pares não atingem'} AA para texto normal
          </p>
          <p>
            Calculado nesta página a partir dos valores reais dos tokens. Cada caso está registrado
            em <code>INCONSISTENCIAS.md</code> com a decisão pendente.
          </p>
        </div>
      ) : null}
    </>
  );
}

/* ── Tabelas e escalas ─────────────────────────────────────────────────── */

export function TabelaTokens({
  tokens,
  mostrarOrigem,
}: {
  tokens: TokenInventariado[];
  mostrarOrigem?: boolean;
}) {
  // A coluna de referência só existe quando carrega informação: numa lista de
  // primitivos ela diria "valor direto" em todas as linhas.
  const temAlias = tokens.some((t) => t.aliasDe);
  const exibirOrigem = mostrarOrigem ?? temAlias;

  return (
    <div className="wiki-tabela-rolagem" tabIndex={0}>
      <table className="wiki-tabela wiki-tabela--tokens">
        <caption className="wiki-visualmente-oculto">Tokens e seus valores</caption>
        <thead>
          <tr>
            <th scope="col">Nome no Figma</th>
            <th scope="col">Valor</th>
            <th scope="col">Variável CSS</th>
            {exibirOrigem ? <th scope="col">Referência</th> : null}
          </tr>
        </thead>
        <tbody>
          {tokens.map((t) => (
            <tr key={t.cssVar}>
              <td>
                <code className="wiki-tabela__destaque">{t.figmaPath}</code>
              </td>
              <td>
                <code className="wiki-tabela__valor">{t.valorResolvido}</code>
              </td>
              <td>
                <code className="wiki-tabela__discreto">{t.cssVar}</code>
              </td>
              {exibirOrigem ? (
                <td>
                  {t.aliasDe ? (
                    <code className="wiki-tabela__discreto">{t.aliasDe}</code>
                  ) : (
                    <span className="wiki-tabela__discreto">valor direto</span>
                  )}
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EscalaEspacamento({ tokens }: { tokens: TokenInventariado[] }) {
  const ordenados = [...tokens].sort(
    (a, b) => Number.parseFloat(a.valorResolvido) - Number.parseFloat(b.valorResolvido),
  );
  const maior = Number.parseFloat(ordenados[ordenados.length - 1]?.valorResolvido ?? '1');

  return (
    <ul className="wiki-escala">
      {ordenados.map((t) => {
        const valor = Number.parseFloat(t.valorResolvido);
        return (
          <li className="wiki-escala__linha" key={t.cssVar}>
            <code className="wiki-escala__nome">{t.figmaPath}</code>
            <span className="wiki-escala__trilho">
              <span
                aria-hidden="true"
                className="wiki-escala__barra"
                style={{ inlineSize: `${Math.max((valor / maior) * 100, 0.6)}%` }}
              />
            </span>
            <code className="wiki-escala__valor">{t.valorResolvido}</code>
          </li>
        );
      })}
    </ul>
  );
}

export function EspecimeTipografico({
  amostras,
}: {
  amostras: { rotulo: string; tamanho: string; peso: string; exemplo: string }[];
}) {
  return (
    <ul className="wiki-especime">
      {amostras.map((a) => (
        <li className="wiki-especime__linha" key={a.rotulo}>
          <span className="wiki-especime__meta">
            <span className="wiki-especime__rotulo">{a.rotulo}</span>
            <code className="wiki-especime__medidas">
              {a.tamanho} · {a.peso}
            </code>
          </span>
          <p
            className="wiki-especime__amostra"
            style={{ fontSize: a.tamanho, fontWeight: Number(a.peso) }}
          >
            {a.exemplo}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ── Lista de nomes de token ───────────────────────────────────────────────
 * Substitui a "parede de pílulas": nomes longos em coluna leem melhor que
 * chips embaralhados em linha.
 */

export function ListaNomesToken({ nomes }: { nomes: string[] }) {
  return (
    <ul className="wiki-nomes-token">
      {nomes.map((n) => (
        <li key={n}>
          <code>{n}</code>
        </li>
      ))}
    </ul>
  );
}
