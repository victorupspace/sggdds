import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { TabelaTokens } from '@/components/TokensVisuais';
import { listarComponentes, listarTokens } from '@/lib/dados';

import reflow from '@dados/reflow.json';

export const metadata: Metadata = {
  title: 'Grid e layout',
  description:
    'Breakpoints, grid e largura de página no Sampa Design System. Três conjuntos de breakpoints convivem hoje — tokens, Storybook e CSS dos componentes. Esta página mostra os três lado a lado.',
};

/**
 * Especificação de grid publicada na página Foundations/Grids do Storybook.
 * Os valores são literais no array gridSpecs de grids.docs.tsx — nenhum deles
 * vem de token. Reproduzidos aqui como estão na origem.
 */
const GRIDS_STORYBOOK = [
  { faixa: 'Mobile', colunas: '4', gutter: '10px', margem: '20px', tipo: 'Stretch' },
  { faixa: 'Tablet', colunas: '6', gutter: '24px', margem: '24px', tipo: 'Stretch' },
  { faixa: 'Desktop', colunas: '12', gutter: '24px', margem: '40px', tipo: 'Stretch' },
];

/** As três respostas, alinhadas por faixa de dispositivo. */
const CONFRONTO = [
  {
    faixa: 'Celular estreito',
    tokens: 'Não existe ponto — bp-xs é 0',
    storybook: '360px',
    css: '420px (14 componentes) e 480px (1)',
  },
  {
    faixa: 'Celular',
    tokens: 'bp-sm — 640px',
    storybook: '—',
    css: '640px (15 componentes)',
  },
  {
    faixa: 'Tablet',
    tokens: 'Não existe ponto entre 640 e 900',
    storybook: '768px a 1024px',
    css: '720px (4) e 768px (3)',
  },
  {
    faixa: 'Desktop pequeno',
    tokens: 'bp-md — 900px',
    storybook: '—',
    css: '900px (3) e 920px (1)',
  },
  {
    faixa: 'Desktop',
    tokens: 'bp-lg — 1200px',
    storybook: '1280px a 1440px',
    css: '1200px (1 componente)',
  },
];

export default function PaginaGridELayout() {
  const tokens = listarTokens();
  const componentes = listarComponentes();

  const breakpoints = tokens
    .filter((t) => t.cssVar.startsWith('--ds-primitive-breakpoints-values-'))
    .sort((a, b) => Number.parseFloat(a.valorResolvido) - Number.parseFloat(b.valorResolvido));

  const gapsDeGrid = tokens
    .filter((t) => t.cssVar.startsWith('--ds-component-grid-'))
    .sort((a, b) => a.cssVar.localeCompare(b.cssVar));

  // Largura real usada em @media pelos componentes publicados, lida dos dados.
  const porLargura = new Map<number, Set<string>>();
  for (const c of componentes) {
    for (const r of c.responsive) {
      const achado = /max-width:\s*(\d+)px/.exec(r.query);
      if (!achado) continue;
      const px = Number(achado[1]);
      if (!porLargura.has(px)) porLargura.set(px, new Set());
      porLargura.get(px)?.add(c.name);
    }
  }
  const largurasReais = [...porLargura.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([px, nomes]) => ({
      px,
      nomes: [...nomes].sort((a, b) => a.localeCompare(b, 'pt-BR')),
    }));

  const comMedia = new Set(largurasReais.flatMap((l) => l.nomes)).size;
  const coincidem = largurasReais.filter((l) =>
    breakpoints.some((b) => Number.parseFloat(b.valorResolvido) === l.px),
  ).length;

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Fundamentos', href: '/fundamentos/visao-geral' }, { titulo: 'Grid e layout' }]}
      />

      <h1>Grid e layout</h1>
      <p className="wiki-prosa__resumo">
        Grid e breakpoints definem onde o conteúdo cabe e quando a tela se reorganiza. No Sampa
        Design System esses valores ainda não têm resposta única:{' '}
        <strong>três conjuntos de breakpoints circulam em paralelo</strong> e nenhum é declarado
        como canônico. Esta página mostra os três lado a lado, em vez de escolher um por conta
        própria.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Leia isto antes de usar qualquer número desta página</p>
        <p>
          Os {breakpoints.length} tokens de breakpoint são a única fonte que passa pelo pipeline de
          tokens. Os outros dois conjuntos são valores literais escritos direto em arquivos{' '}
          <code>.tsx</code> e <code>.css</code>. Enquanto o time não decidir qual conjunto vale,{' '}
          <strong>use os tokens</strong> — é o único conjunto que pode ser corrigido em um lugar só.
        </p>
      </div>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Serviço público é acessado majoritariamente por celular, muitas vezes em conexão ruim e com
        a tela ampliada. Se cada componente decide sozinho onde quebrar o layout, a mesma jornada
        muda de forma em larguras diferentes e sem motivo aparente: um card empilha em 640px, a
        tabela ao lado empilha em 720px, o cabeçalho em 768px. Quem usa não vê três decisões de
        engenharia — vê uma página que se desmonta aos pedaços.
      </p>
      <p>
        Breakpoint também é acessibilidade. O critério <strong>WCAG 2.1 — 1.4.10 Reflow</strong>{' '}
        exige que o conteúdo funcione em uma largura equivalente a 320px CSS sem rolagem
        horizontal, que é o que acontece quando alguém aplica zoom de 400% em uma tela de 1280px.
        Sem um piso declarado, ninguém sabe em que largura o sistema precisa continuar legível.
      </p>

      <h2 id="tokens">Os tokens de breakpoint</h2>
      <p>
        Estão na collection <code>Global: Core</code> da biblioteca <strong>Foundations</strong> e
        saem no CSS com o prefixo <code>--ds-primitive-breakpoints-values-</code>. São{' '}
        {breakpoints.length} valores.
      </p>
      <TabelaTokens mostrarOrigem={false} tokens={breakpoints} />
      <p>
        <code>bp-xs</code> vale <code>0</code>: não é um ponto de quebra, é o começo da escala. Na
        prática o sistema publica <strong>três</strong> pontos de quebra — 640px, 900px e 1200px.
      </p>

      <h2 id="tres-conjuntos">Os três conjuntos em circulação</h2>
      <p>
        A tabela abaixo é a fotografia honesta do que existe hoje. Nenhuma das três fontes cita as
        outras duas.
      </p>

      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Os três conjuntos de breakpoints em circulação no Sampa Design System
          </caption>
          <thead>
            <tr>
              <th scope="col">Conjunto</th>
              <th scope="col">Onde vive</th>
              <th scope="col">Valores</th>
              <th scope="col">Vem de token?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>1. Tokens de breakpoint</strong>
              </td>
              <td>
                <code>global-core.tokens.json</code> → collection <code>Global: Core</code> →{' '}
                <code>--ds-primitive-breakpoints-values-*</code>
              </td>
              <td>0 · 640px · 900px · 1200px</td>
              <td>
                <span className="wiki-selo wiki-selo--estavel">sim</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>2. Página Foundations/Grids</strong>
              </td>
              <td>
                <code>grids.docs.tsx</code> no Storybook — faixa &quot;Breakpoints comuns no
                Brasil&quot;
              </td>
              <td>360px · 768–1024px · 1280–1440px</td>
              <td>
                <span className="wiki-selo wiki-selo--neutro">não — literais no .tsx</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>3. CSS real dos componentes</strong>
              </td>
              <td>
                As regras <code>@media</code> dentro de cada <code>*.styles.css</code>
              </td>
              <td>
                {largurasReais.map((l) => `${l.px}px`).join(' · ')}
              </td>
              <td>
                <span className="wiki-selo wiki-selo--neutro">não — literais no CSS</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="alinhamento">Alinhados por faixa de dispositivo</h3>
      <p>
        Onde há uma célula vazia, aquele conjunto simplesmente não tem resposta para aquela faixa.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Comparação dos três conjuntos por faixa de dispositivo
          </caption>
          <thead>
            <tr>
              <th scope="col">Faixa</th>
              <th scope="col">1. Tokens</th>
              <th scope="col">2. Foundations/Grids</th>
              <th scope="col">3. CSS dos componentes</th>
            </tr>
          </thead>
          <tbody>
            {CONFRONTO.map((linha) => (
              <tr key={linha.faixa}>
                <td>
                  <strong>{linha.faixa}</strong>
                </td>
                <td>{linha.tokens}</td>
                <td>{linha.storybook}</td>
                <td>{linha.css}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Das {largurasReais.length} larguras usadas no CSS, apenas <strong>{coincidem}</strong>{' '}
        coincidem com um token de breakpoint. As outras existem só na implementação.
      </p>

      <h2 id="consequencia">A consequência prática</h2>
      <p>
        Sem conjunto canônico, o mesmo nome significa medidas diferentes dependendo de onde você
        está. O caso mais claro é a <Link href="/componentes/data-table">DataTable</Link>: a prop{' '}
        <code>hideBelow</code> aceita <code>sm</code>, <code>md</code> e <code>lg</code>, mas os
        pontos em que essas colunas somem não são os dos tokens de mesmo nome.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Mesmo nome, valor diferente: hideBelow da DataTable × tokens de breakpoint
          </caption>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Token de breakpoint</th>
              <th scope="col">
                <code>hideBelow</code> da DataTable
              </th>
              <th scope="col">Diferença</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>sm</code>
              </td>
              <td>640px</td>
              <td>640px</td>
              <td>—</td>
            </tr>
            <tr>
              <td>
                <code>md</code>
              </td>
              <td>900px</td>
              <td>720px</td>
              <td>180px</td>
            </tr>
            <tr>
              <td>
                <code>lg</code>
              </td>
              <td>1200px</td>
              <td>920px</td>
              <td>280px</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Quem lê a documentação de tokens e escreve <code>hideBelow=&quot;lg&quot;</code> esperando
        que a coluna suma abaixo de 1200px vai ver a coluna sumir só abaixo de 920px. Não é bug de
        implementação: é o efeito de dois vocabulários com os mesmos nomes e valores distintos.
      </p>
      <p>Os outros efeitos práticos são estes:</p>
      <ul>
        <li>
          <strong>Não dá para revisar layout com uma régua só.</strong> Testar em 640, 900 e 1200
          não cobre o sistema: {porLargura.get(420)?.size ?? 0} componentes só mudam em 420px e
          nenhum token descreve esse ponto.
        </li>
        <li>
          <strong>O Figma e o código não conferem.</strong> Um frame desenhado em 768px (a faixa de
          tablet da página Grids) cai entre <code>bp-sm</code> e <code>bp-md</code>, então não
          existe uma decisão de token para aquela largura.
        </li>
        <li>
          <strong>Fornecedor contratado não tem o que seguir.</strong> Uma equipe externa que
          consulta o Storybook recebe 360/768/1280; a que consulta os tokens recebe 640/900/1200. As
          duas estão &quot;seguindo o Design System&quot;.
        </li>
        <li>
          <strong>Correção não se propaga.</strong> Mudar <code>bp-md</code> de 900 para 1024 não
          altera nenhum componente, porque nenhum componente lê o token — todos têm o número escrito
          no CSS.
        </li>
      </ul>

      <p>
        Enquanto os três conjuntos convivem, vale a regra da seção{' '}
        <Link href="#uso-codigo">Como usar em código</Link>: escolha um dos três valores que estão
        em token — 640, 900 ou 1200 — e cite o nome do token em comentário ao lado do número.
      </p>

      <h2 id="uso-real">Onde cada largura é usada hoje</h2>
      <p>
        Levantado dos componentes publicados. {comMedia} deles têm pelo menos uma regra{' '}
        <code>@media</code> de largura; os demais são responsivos por fluxo, sem ponto de quebra.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Larguras de media query usadas pelos componentes
          </caption>
          <thead>
            <tr>
              <th scope="col">Largura</th>
              <th scope="col">Token equivalente</th>
              <th scope="col">Componentes</th>
              <th scope="col">Quais</th>
            </tr>
          </thead>
          <tbody>
            {largurasReais.map((l) => {
              const token = breakpoints.find(
                (b) => Number.parseFloat(b.valorResolvido) === l.px,
              );
              return (
                <tr key={l.px}>
                  <td>
                    <code>max-width: {l.px}px</code>
                  </td>
                  <td>
                    {token ? (
                      <code>{token.figmaPath}</code>
                    ) : (
                      <em>nenhum</em>
                    )}
                  </td>
                  <td>{l.nomes.length}</td>
                  <td>{l.nomes.join(', ')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id="grid">O grid</h2>
      <p>
        A especificação de grid publicada hoje está na página <code>Foundations/Grids</code> do
        Storybook. São três configurações, todas do tipo <em>Stretch</em> — o grid ocupa a largura
        disponível e não para em nenhum limite.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Grids publicados no Storybook</caption>
          <thead>
            <tr>
              <th scope="col">Faixa</th>
              <th scope="col">Colunas</th>
              <th scope="col">Gutter</th>
              <th scope="col">Margem</th>
              <th scope="col">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {GRIDS_STORYBOOK.map((g) => (
              <tr key={g.faixa}>
                <td>
                  <strong>{g.faixa}</strong>
                </td>
                <td>{g.colunas}</td>
                <td>
                  <code>{g.gutter}</code>
                </td>
                <td>
                  <code>{g.margem}</code>
                </td>
                <td>{g.tipo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Os quatro valores de gutter e margem (10px, 20px, 24px e 40px) existem na{' '}
        <Link href="/fundamentos/espacamento">escala de espaçamento</Link>, mas estão escritos como
        literais no arquivo da página, não como referência a token. Trocar a escala de espaçamento
        não muda o grid documentado.
      </p>

      <h3 id="tokens-de-grid">Os tokens de grid que existem</h3>
      <p>
        A camada de componente publica {gapsDeGrid.length} tokens no grupo <code>grid</code>. Eles
        cobrem o espaço entre colunas e entre linhas, em três tamanhos:
      </p>
      <TabelaTokens tokens={gapsDeGrid} />
      <p>
        Repare no descompasso: os tamanhos se chamam <code>sm</code>, <code>md</code> e{' '}
        <code>lg</code> — os mesmos nomes dos breakpoints — mas <strong>nada no export liga</strong>{' '}
        um ao outro. Não está declarado que <code>gap-x-sm</code> é o gutter abaixo de{' '}
        <code>bp-sm</code>. Também não há token de número de colunas nem de margem lateral: o grid
        de 4/6/12 colunas e as margens de 20/24/40px não têm contrapartida no pipeline.
      </p>

      <h2 id="container">Largura máxima de página</h2>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Não existe token de container</p>
        <p>
          Não há nenhum token de largura máxima de página, nem regra de centralização de conteúdo.
          Os três grids publicados são <em>Stretch</em>, ou seja, o conteúdo acompanha a largura da
          janela sem limite. Em um monitor de 2560px, uma linha de texto corrido pode atravessar a
          tela inteira — o que contraria a regra de 45 a 75 caracteres por linha descrita em{' '}
          <Link href="/fundamentos/tipografia">Tipografia</Link>.
        </p>
      </div>
      <p>
        Os únicos tokens de largura máxima que existem hoje são de componentes específicos —{' '}
        <code>tooltip/size/max-width</code>, <code>modal/container/size/width/*</code> e{' '}
        <code>drawer/container/size/width/*</code> — e todos resolvem para{' '}
        <code>128px</code> porque apontam para <code>primitive/spacing/128</code>. Nenhum deles é
        largura de página.
      </p>
      <p>
        Até existir um token de container, limite a largura no próprio produto e mantenha a linha de
        texto corrido entre 45 e 75 caracteres, como descrito em{' '}
        <Link href="/fundamentos/tipografia">Tipografia</Link>. Sobre o fundo da página, a
        referência disponível é a página <code>Foundations/Elevation</code> do Storybook, que usa{' '}
        <code>grey-100</code> (<code>#F5F5F5</code>) como fundo padrão.
      </p>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <ul>
        <li>
          <strong>Reflow (WCAG 2.1 — 1.4.10).</strong> O conteúdo precisa funcionar em 320px CSS de
          largura sem rolagem horizontal. O ponto de quebra mais estreito implementado no sistema é
          420px, e <code>bp-xs</code> vale <code>0</code>: nenhuma fonte declara 320px como piso de
          teste.
        </li>
        <li>
          <strong>Zoom de 200%.</strong> Ampliar o texto não pode cortar conteúdo nem sobrepor
          controles. Como o zoom reduz a largura CSS efetiva, ele passa pelos mesmos breakpoints —
          testar zoom é testar breakpoint.
        </li>
        <li>
          <strong>Orientação (WCAG 2.1 — 1.3.4).</strong> Nenhuma tela pode exigir retrato ou
          paisagem. Não use altura de viewport para decidir layout.
        </li>
        <li>
          <strong>Ordem de leitura.</strong> Ao reorganizar colunas, a ordem visual precisa
          continuar batendo com a ordem do DOM. Não use <code>order</code> do flexbox nem
          posicionamento explícito de grid para trocar a sequência do conteúdo.
        </li>
      </ul>
      <h3 id="reflow-medido">Reflow medido nos componentes</h3>
      <p>
        O critério 1.4.10 foi medido, não presumido: cada componente foi carregado no Storybook
        publicado, em navegador real, com a janela em {reflow.larguraCss}px CSS de largura — a mesma
        largura equivalente a 1280px com zoom de 400%. A medida é o excedente horizontal da página
        (<code>scrollWidth</code> maior que <code>clientWidth</code>).
      </p>
      <div className="wiki-numeros">
        <div className="wiki-numero">
          <span className="wiki-numero__valor">
            {reflow.passam}/{reflow.totalMedidos}
          </span>
          <span className="wiki-numero__rotulo">
            componentes sem rolagem horizontal em {reflow.larguraCss}px
          </span>
        </div>
      </div>
      <p>
        {reflow.falham === 0
          ? `Nenhum componente exigiu rolagem horizontal na largura mínima. `
          : `${reflow.falham} componentes exigiram rolagem horizontal. `}
        A medição é do componente isolado dentro da story: ela mostra que nenhum deles carrega uma
        largura fixa que quebre a tela estreita, e não substitui o teste da página montada, onde o
        estouro costuma vir da composição.
      </p>
      <p>
        Para repetir a medição a qualquer momento:{' '}
        <code>node scripts/auditar-reflow.mjs</code>. Última execução em{' '}
        {new Date(`${reflow.data}T12:00:00Z`).toLocaleDateString('pt-BR')}.
      </p>

      <h2 id="uso-codigo">Como usar em código</h2>
      <p>
        Custom property de CSS <strong>não funciona dentro de uma media query</strong>. Esta é a
        razão técnica pela qual o CSS dos componentes acabou com números escritos à mão:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`/* NÃO funciona — a media query não resolve var() */
@media (max-width: var(--ds-primitive-breakpoints-values-bp-sm)) { … }

/* Funciona: o número é escrito, e o token fica citado ao lado */
/* bp-sm — --ds-primitive-breakpoints-values-bp-sm */
@media (max-width: 640px) {
  .ds-meu-componente {
    flex-direction: column;
    gap: var(--ds-component-grid-spacing-gap-y-sm);
  }
}`}</code>
      </pre>
      <p>
        Enquanto não houver um pré-processador ou um conjunto de media queries nomeadas no pacote,
        a regra mínima é: <strong>use um dos três valores dos tokens</strong> (640, 900 ou 1200) e{' '}
        <strong>cite o token em comentário</strong>, para que a busca por{' '}
        <code>bp-sm</code> encontre a ocorrência no dia da correção.
      </p>
      <p>Para o grid em si, use CSS Grid com os tokens de gap:</p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`.ds-minha-secao {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  column-gap: var(--ds-component-grid-spacing-gap-x-md);
  row-gap: var(--ds-component-grid-spacing-gap-y-md);
  padding-inline: var(--ds-primitive-spacing-24);
}`}</code>
      </pre>

      <h2 id="uso-figma">Como usar no Figma</h2>
      <p>
        Os {breakpoints.length} valores estão como variables na collection <code>Global: Core</code>{' '}
        da biblioteca <strong>Foundations</strong>. O grid em si não está publicado como layout grid
        nomeado — as três configurações da página <code>Foundations/Grids</code> existem apenas como
        desenho estático no Storybook.
      </p>
      <p>
        Para desenhar com o grid até que ele exista como layout grid nomeado, configure o grid do
        frame à mão com os números da tabela acima — 4, 6 ou 12 colunas, com o gutter e a margem da
        faixa correspondente — e use as larguras de frame de 360, 768 e 1280px, que são as três
        faixas da página <code>Foundations/Grids</code>.
      </p>

      <h2 id="regras">Regras de uso</h2>
      <ul>
        <li>
          <strong>Comece pelo estreito.</strong> Escreva o layout base para a menor largura e use{' '}
          <code>@media</code> apenas para adicionar complexidade. É mais fácil acrescentar coluna do
          que desmontar layout.
        </li>
        <li>
          <strong>Quebre por conteúdo, não por dispositivo.</strong> Se um card fica ilegível com
          menos de 280px, o ponto de quebra é onde o card chega a 280px — não &quot;no tablet&quot;.
        </li>
        <li>
          <strong>Densidade muda, conteúdo não.</strong> Entre breakpoints é legítimo mudar
          espaçamento, número de colunas e forma de um controle. Não é legítimo esconder informação
          só porque a tela é pequena.
        </li>
        <li>
          <strong>Um breakpoint novo é uma decisão de sistema.</strong> Antes de escrever uma
          largura que não está na lista acima, verifique se um dos pontos existentes resolve.
        </li>
        <li>
          <strong>Nunca use altura de viewport para layout de conteúdo.</strong> Barras de navegador
          em celular mudam a altura durante a rolagem.
        </li>
      </ul>

    </div>
  );
}
