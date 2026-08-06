import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { Fragment } from 'react';

import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { GradeCores } from '@/components/TokensVisuais';
import { listarTokens, RAIZ_DADOS, urlFigma } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Iconografia',
  description:
    'A biblioteca de ícones do Sampa Design System: Material Symbols outlined peso 300, convenção de nome, tamanhos, cor, acessibilidade e as inconsistências catalogadas.',
};

interface IconeFigma {
  name: string;
  nodeId: string;
  assetKey: string;
  weights: string[];
}

interface ResumoIcones {
  total: number;
  materialSymbols: {
    quantidade: number;
    estilo: string;
    peso: string;
    convencaoNome: string;
    porLetraInicial: Record<string, number>;
  };
  iconesAvulsos: {
    quantidade: number;
    observacao: string;
    itens: { nome: string; nodeId: string }[];
  };
  inconsistencias: {
    tipo: string;
    descricao: string;
    quantidade: number | null;
    impacto: string;
    exemplos: string[];
  }[];
  pendencias: string[];
}

function lerJson(arquivo: string): unknown {
  return JSON.parse(readFileSync(join(RAIZ_DADOS, arquivo), 'utf8'));
}

/** Nomes propostos para o catálogo temático. Cada um é conferido contra o
 *  arquivo real de ícones antes de aparecer na página — o que não existir na
 *  biblioteca simplesmente não é renderizado. */
const TEMAS: { id: string; titulo: string; explicacao: string; nomes: string[] }[] = [
  {
    id: 'catalogo-navegacao',
    titulo: 'Navegação',
    explicacao: 'Movimentar-se entre telas, abrir e fechar áreas.',
    nomes: [
      'arrow_back',
      'arrow_forward',
      'chevron_left',
      'chevron_right',
      'expand_more',
      'expand_less',
      'keyboard_arrow_down',
      'menu',
      'close',
      'home',
      'more_vert',
      'open_in_new',
    ],
  },
  {
    id: 'catalogo-estado',
    titulo: 'Estado e feedback',
    explicacao: 'Comunicar o que aconteceu. Sempre acompanhados de texto.',
    nomes: ['check_circle', 'error', 'warning', 'info', 'cancel', 'emergency_home', 'help', 'pending', 'block'],
  },
  {
    id: 'catalogo-acao',
    titulo: 'Ação',
    explicacao: 'O que a pessoa pode fazer com o conteúdo da tela.',
    nomes: [
      'search',
      'add',
      'edit',
      'delete',
      'download',
      'upload_file',
      'print',
      'share',
      'filter_alt',
      'refresh',
      'content_copy',
      'visibility',
      'visibility_off',
    ],
  },
  {
    id: 'catalogo-servico-publico',
    titulo: 'Serviço público',
    explicacao: 'Assuntos recorrentes nos serviços do Estado.',
    nomes: [
      'description',
      'badge',
      'account_balance',
      'calendar_month',
      'schedule',
      'person',
      'lock',
      'logout',
      'translate',
      'accessibility_new',
      'attach_file',
      'call',
      'mail',
      'payments',
      'receipt_long',
      'fact_check',
      'gavel',
      'local_hospital',
      'school',
      'directions_bus',
    ],
  },
];

export default function PaginaIconografia() {
  const resumo = lerJson('icones-resumo.json') as ResumoIcones;
  const catalogo = lerJson('figma-icons.json') as { icons: IconeFigma[] };

  const nomesPublicados = new Set(catalogo.icons.map((i) => i.name));
  const semSufixo = catalogo.icons.filter((i) => !i.name.includes('[outlined]'));
  const pesoGravadoErrado = catalogo.icons.filter((i) => i.weights.includes('300.svg'));

  const temas = TEMAS.map((tema) => ({
    ...tema,
    // Só entra na página o que realmente existe na biblioteca publicada.
    nomes: tema.nomes.filter((n) => nomesPublicados.has(`${n} [outlined]`)),
  })).filter((tema) => tema.nomes.length > 0);

  const tokens = listarTokens();
  const coresIcone = tokens.filter((t) => t.cssVar.startsWith('--ds-semantic-color-icons-'));
  const tamanhos = tokens.filter((t) => t.cssVar.includes('icon-size'));

  const porTamanho = new Map<string, string[]>();
  for (const t of tamanhos) {
    const lista = porTamanho.get(t.valorResolvido) ?? [];
    lista.push(t.cssVar);
    porTamanho.set(t.valorResolvido, lista);
  }
  const tamanhosOrdenados = [...porTamanho.entries()].sort(
    (a, b) => Number.parseFloat(a[0]) - Number.parseFloat(b[0]),
  );

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Fundamentos', href: '/fundamentos/visao-geral' }, { titulo: 'Iconografia' }]}
      />

      <h1>Iconografia</h1>
      <p className="wiki-prosa__resumo">
        O Sampa Design System publica {resumo.total.toLocaleString('pt-BR')} ícones. Quase todos vêm
        de uma única biblioteca — <strong>Material Symbols</strong>, estilo{' '}
        <strong>{resumo.materialSymbols.estilo}</strong>, peso{' '}
        <strong>{resumo.materialSymbols.peso}</strong>. Ícone no serviço público é apoio à leitura,
        nunca substituto do texto.
      </p>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Um ícone só funciona quando a pessoa já sabe o que ele significa. Lupa e seta são
        reconhecidas em qualquer lugar; um símbolo de protocolo, não. Em serviço público essa
        diferença é decisiva: quem chega ao site está resolvendo uma obrigação, com pressa, muitas
        vezes pela primeira vez. Ícone ambíguo faz a pessoa parar, e parar significa abandonar o
        serviço.
      </p>
      <p>
        Por isso a regra do sistema é conservadora: uma biblioteca só, um estilo só, um peso só, e
        rótulo em texto sempre que o ícone carregar significado.
      </p>

      <h2 id="numeros">O inventário</h2>
      <div className="wiki-numeros">
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{resumo.total.toLocaleString('pt-BR')}</span>
          <span className="wiki-numero__rotulo">ícones publicados no Figma</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">
            {resumo.materialSymbols.quantidade.toLocaleString('pt-BR')}
          </span>
          <span className="wiki-numero__rotulo">Material Symbols na convenção</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{semSufixo.length}</span>
          <span className="wiki-numero__rotulo">avulsos fora da convenção</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{pesoGravadoErrado.length}</span>
          <span className="wiki-numero__rotulo">com o peso gravado errado</span>
        </div>
      </div>
      <p>
        Números apurados sobre a extração da página Iconography da biblioteca{' '}
        <strong>Web Components</strong> no Figma.
      </p>

      <h2 id="biblioteca">A biblioteca</h2>
      <p>
        A base é <strong>Material Symbols</strong>, do Google. O sistema adota{' '}
        <strong>um único estilo</strong> ({resumo.materialSymbols.estilo}) e{' '}
        <strong>um único peso</strong> ({resumo.materialSymbols.peso}). Os vetores em uso estão
        desenhados sobre a caixa de <strong>24 × 24</strong>, com preenchimento em{' '}
        <code>currentColor</code> para herdar a cor do contexto.
      </p>
      <ul>
        <li>
          <strong>Estilo:</strong> outlined. Não misture com filled, rounded ou sharp.
        </li>
        <li>
          <strong>Peso:</strong> 300. É o peso que combina com Plus Jakarta Sans nos corpos de texto
          do sistema.
        </li>
        <li>
          <strong>Fill:</strong> 0. Nenhum ícone do catálogo é preenchido.
        </li>
        <li>
          <strong>Cor:</strong> nunca embutida no vetor. Vem do CSS.
        </li>
      </ul>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">
          Três componentes usam Material Symbols <em>Rounded</em>, não outlined
        </p>
        <p>
          <code>BackToTop</code>, <code>CookieConsentBanner</code> e <code>Meganav</code> declaram{' '}
          <code>font-family: &apos;Material Symbols Rounded&apos;</code> e carregam a fonte por{' '}
          <code>@import</code> de <code>fonts.googleapis.com</code>. São duas divergências em uma: o
          estilo não é o do catálogo, e o ícone passa a depender de rede e de um domínio externo —
          sem alternativa local caso a requisição falhe. Os demais componentes trazem o vetor inline
          no JSX e não dependem de rede.
        </p>
      </div>

      <h2 id="convencao">Convenção de nome</h2>
      <p>{resumo.materialSymbols.convencaoNome}.</p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Como o mesmo ícone é nomeado em cada lugar
          </caption>
          <thead>
            <tr>
              <th scope="col">Onde</th>
              <th scope="col">Como o ícone aparece</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No Material Symbols (origem)</td>
              <td>
                <code>search</code>
              </td>
            </tr>
            <tr>
              <td>No Figma (Web Components)</td>
              <td>
                <code>search [outlined]</code>
              </td>
            </tr>
            <tr>
              <td>No código</td>
              <td>
                <code>{'<svg>'}</code> inline, com o comentário{' '}
                <code>{'/* search [Material Symbols] */'}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Ao pedir um ícone novo, use sempre o nome de origem em <code>snake_case</code>. É esse nome
        que localiza o símbolo tanto na biblioteca do Google quanto na página do Figma.
      </p>

      <h2 id="catalogo">O que existe no catálogo</h2>
      <p>
        Os {resumo.materialSymbols.quantidade.toLocaleString('pt-BR')} símbolos cobrem muito mais do
        que o sistema precisa. A amostra abaixo lista nomes reais da biblioteca, agrupados pelo uso
        mais frequente em serviços do Estado. Não é uma lista fechada: é um ponto de partida para
        evitar que cada produto escolha um símbolo diferente para a mesma ideia.
      </p>
      {temas.map((tema) => (
        <Fragment key={tema.id}>
          <h3 id={tema.id}>{tema.titulo}</h3>
          <p>{tema.explicacao}</p>
          <ul className="wiki-lista-tokens">
            {tema.nomes.map((nome) => (
              <li key={nome}>
                <code>{nome}</code>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}

      <h2 id="avulsos">Os {semSufixo.length} ícones fora da convenção</h2>
      <p>{resumo.iconesAvulsos.observacao}</p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Ícones publicados sem seguir a nomenclatura Material Symbols
          </caption>
          <thead>
            <tr>
              <th scope="col">Nome publicado</th>
              <th scope="col">Node no Figma</th>
              <th scope="col">Abrir</th>
            </tr>
          </thead>
          <tbody>
            {semSufixo.map((icone) => (
              <tr key={icone.nodeId}>
                <td>
                  <code>{icone.name}</code>
                </td>
                <td>
                  <code>{icone.nodeId}</code>
                </td>
                <td>
                  <a href={urlFigma(icone.nodeId)} rel="noreferrer" target="_blank">
                    ver no Figma
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Eles aparecem no mesmo catálogo, mas sem o sufixo de estilo. Quem busca por{' '}
        <code>arrow_forward [outlined]</code> não encontra <code>arrow right</code>, e quem busca por{' '}
        <code>home</code> encontra dois resultados diferentes. Enquanto a duplicidade existir,
        confira o nome antes de reutilizar.
      </p>

      <h2 id="peso-errado">
        {pesoGravadoErrado.length} ícones com o peso gravado como texto errado
      </h2>
      <p>
        Em {pesoGravadoErrado.length} componentes do Figma, a propriedade de peso guarda o valor{' '}
        <code>300.svg</code> em vez de <code>300</code> — provável resíduo do nome do arquivo na
        importação. O desenho está correto; o metadado, não.
      </p>
      <p>
        O efeito prático: filtrar ou trocar o peso pelo painel de propriedades deixa de funcionar
        para esses itens, e o painel passa a mostrar dois valores para a mesma coisa.
      </p>
      <p>Exemplos afetados:</p>
      <ul className="wiki-lista-tokens">
        {pesoGravadoErrado.slice(0, 12).map((icone) => (
          <li key={icone.nodeId}>
            <code>{icone.name}</code>
          </li>
        ))}
      </ul>

      <h2 id="tamanhos">Tamanhos</h2>
      <p>
        Não existe uma escala de tamanho de ícone na camada semântica. Cada componente publica o seu
        próprio token, e todos apontam para a escala de espaçamento. Os{' '}
        {tamanhos.length} tokens em uso se resolvem em {tamanhosOrdenados.length} tamanhos:
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Tamanhos de ícone publicados</caption>
          <thead>
            <tr>
              <th scope="col">Tamanho</th>
              <th scope="col">Tokens</th>
              <th scope="col">Onde aparece</th>
            </tr>
          </thead>
          <tbody>
            {tamanhosOrdenados.map(([valor, lista]) => (
              <tr key={valor}>
                <td>
                  <strong>{valor}</strong>
                </td>
                <td>{lista.length}</td>
                <td>
                  {[
                    ...new Set(
                      lista.map((v) =>
                        v.replace('--ds-component-', '').replace(/-(size-icon|icon-size).*$/, ''),
                      ),
                    ),
                  ]
                    .sort()
                    .join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Regra prática: <strong>16px</strong> junto de texto de apoio, <strong>20px</strong> junto de
        texto corrido de 16px, <strong>24px</strong> em alvos de toque e navegação. Abaixo de 16px o
        traço de peso 300 começa a sumir em tela comum — use apenas dentro de controles pequenos,
        como o check do checkbox.
      </p>
      <p>
        Ícone dentro de botão ou link precisa de área de toque de no mínimo 44 × 44 px, mesmo que o
        desenho tenha 20px. O que cresce é a área clicável, não o ícone.
      </p>

      <h2 id="cor">Cor</h2>
      <p>
        A cor do ícone vem de {coresIcone.length} tokens semânticos dedicados. Nenhum vetor traz cor
        embutida: todos usam <code>fill=&quot;currentColor&quot;</code> e herdam a cor do elemento
        que os contém.
      </p>
      <GradeCores tokens={coresIcone} />
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Erro de digitação na origem</p>
        <p>
          Os quatro tokens de sucesso estão gravados no Figma como{' '}
          <code>color/icons/sucess/…</code>, com um &quot;c&quot; a menos. O nome errado já vazou
          para o CSS publicado, então corrigir agora quebra quem já consome. A correção precisa vir
          acompanhada de um alias de transição.
        </p>
      </div>

      <h2 id="como-escolher">Como escolher um ícone</h2>
      <ol>
        <li>
          <strong>Verifique se o ícone é necessário.</strong> Na dúvida, não use. Uma lista de
          serviços com rótulos claros não fica melhor com um símbolo em cada linha.
        </li>
        <li>
          <strong>Procure pelo nome de origem</strong> em <code>snake_case</code> na página
          Iconography do Figma. Se não achar, procure pelo sinônimo em inglês.
        </li>
        <li>
          <strong>Prefira o símbolo mais literal.</strong> Metáfora exige repertório; desenho
          literal, não. <code>calendar_month</code> comunica melhor que <code>event</code>.
        </li>
        <li>
          <strong>Confira se o mesmo símbolo já é usado em outro sentido</strong> no produto. Um
          ícone, um significado — em toda a interface.
        </li>
        <li>
          <strong>Teste com o rótulo ao lado.</strong> Se o rótulo precisa explicar o ícone, o
          ícone não está ajudando.
        </li>
      </ol>

      <h2 id="quando-nao-usar">Quando não usar ícone sozinho</h2>
      <p>
        Ícone sem rótulo só é aceitável quando o símbolo é universal e o alvo é repetitivo — fechar,
        buscar, voltar, menu. Fora desses casos, o rótulo em texto é obrigatório.
      </p>
      <ul>
        <li>
          <strong>Ações destrutivas ou irreversíveis.</strong> Excluir, cancelar solicitação e
          encerrar sessão precisam de palavra escrita.
        </li>
        <li>
          <strong>Ações específicas do domínio.</strong> Não existe símbolo universal para
          &quot;emitir segunda via&quot; ou &quot;consultar protocolo&quot;.
        </li>
        <li>
          <strong>Estados.</strong> Cor e ícone não podem ser os únicos portadores de significado.
          Sucesso, erro e alerta sempre vêm com texto.
        </li>
        <li>
          <strong>Barras de ação com muitos itens.</strong> Cinco ícones lado a lado sem rótulo
          viram um enigma.
        </li>
      </ul>
      <p>
        Quando o ícone aparece sozinho por decisão de layout, ele continua precisando de nome
        acessível — veja a seção seguinte.
      </p>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <p>A regra tem duas metades, e o sistema já aplica as duas:</p>
      <ul>
        <li>
          <strong>Ícone decorativo</strong> — existe texto ao lado dizendo a mesma coisa. O vetor
          recebe <code>aria-hidden=&quot;true&quot;</code> e some para leitores de tela. Repetir a
          informação só atrapalha.
        </li>
        <li>
          <strong>Ícone informativo</strong> — é a única informação disponível, normalmente dentro
          de um botão ou link sem rótulo visível. O nome acessível vai no{' '}
          <strong>elemento interativo</strong>, com <code>aria-label</code>, e o vetor continua{' '}
          <code>aria-hidden</code>.
        </li>
      </ul>
      <p>
        Colocar o rótulo no <code>&lt;svg&gt;</code> em vez do botão é o erro mais comum: o leitor
        de tela anuncia o controle sem nome e a pessoa não sabe o que vai acontecer ao acionar.
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`/* Decorativo — o texto do Alert já diz que é um erro */
<span aria-hidden="true" className="ds-alert__icon">
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    {/* error [Material Symbols] */}
    <path d="…" fill="currentColor" />
  </svg>
</span>

/* Informativo — o botão só tem o ícone, então o nome vai no botão */
<button aria-label={dismissLabel} className="ds-alert__dismiss" type="button">
  <CloseIcon />   {/* o <svg> interno permanece aria-hidden="true" */}
</button>`}</code>
      </pre>
      <p>
        Os dois trechos acima refletem o código real de <code>Alert</code>. O mesmo padrão aparece
        em <code>Breadcrumb</code> (link de início com <code>aria-label</code> e ícone{' '}
        <code>aria-hidden</code>), <code>Header</code>, <code>Carousel</code> e{' '}
        <code>BackToTop</code>.
      </p>
      <p>
        Escreva o <code>aria-label</code> como a ação, não como o desenho: &quot;Fechar aviso&quot;,
        não &quot;X&quot;; &quot;Buscar serviços&quot;, não &quot;Lupa&quot;.
      </p>

      <h2 id="uso-figma">Como usar no Figma</h2>
      <p>
        Os ícones estão na página <strong>Iconography</strong> da biblioteca{' '}
        <strong>Web Components</strong>. Insira a instância do componente — nunca cole o vetor
        solto, porque a cópia perde a ligação com a biblioteca e deixa de receber correções.
      </p>
      <p>
        A cor deve ser aplicada por variable da collection <code>T2: Semantics</code>, no grupo{' '}
        <code>color/icons/*</code>. O tamanho segue o token do componente que recebe o ícone.
      </p>

      <h2 id="uso-codigo">Como usar em código</h2>
      <p>
        Hoje não existe pacote de ícones nem export de SVG no repositório. Os ícones em uso estão
        escritos inline no JSX de cada componente, com o nome de origem no comentário e o node do
        Figma quando ele é conhecido. É assim que se escreve um ícone novo:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`/* search [Material Symbols] — Web Components / Header, node 94:14266 */
function SearchIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="…" fill="currentColor" />
    </svg>
  );
}

.ds-header__icone {
  inline-size: var(--ds-component-button-size-icon-size-md);   /* 20px */
  block-size: var(--ds-component-button-size-icon-size-md);
  color: var(--ds-semantic-color-icons-neutral-default);
}`}</code>
      </pre>
      <ul>
        <li>
          Mantenha <code>viewBox=&quot;0 0 24 24&quot;</code> — é a grade da biblioteca.
        </li>
        <li>
          Use <code>fill=&quot;currentColor&quot;</code>, nunca um hexadecimal.
        </li>
        <li>
          Deixe <code>aria-hidden=&quot;true&quot;</code> no <code>&lt;svg&gt;</code> por padrão.
        </li>
        <li>
          Escreva no comentário o nome de origem e o node do Figma. É o que permite auditar depois.
        </li>
      </ul>

      <h2 id="pendencias">Pendências</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a licença dos ícones não está declarada em lugar nenhum — nem
        no Figma, nem no repositório, nem no <code>LICENSE</code> do projeto (que cobre apenas o
        código, sob MIT). {resumo.materialSymbols.quantidade.toLocaleString('pt-BR')} dos{' '}
        {resumo.total.toLocaleString('pt-BR')} ícones são Material Symbols, distribuídos pelo Google
        sob Apache 2.0, mas essa informação precisa de confirmação formal e de um aviso publicado
        aqui e na página de <Link href="/recursos/downloads">Downloads</Link> — fonte: time.
        Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe export de SVG no repositório nem pacote de ícones
        no monorepo — os vetores estão inline no JSX de 21 componentes, sem fonte única. Qualquer
        download de ícones desta Wiki dependerá de extração do Figma — fonte: repo. Registrado em{' '}
        <code>LACUNAS.md</code>, item 363.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> falta decidir se os {semSufixo.length} ícones fora da convenção
        entram no catálogo oficial com nome corrigido ou são substituídos por equivalentes Material
        Symbols — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> os {pesoGravadoErrado.length} ícones com peso gravado como{' '}
        <code>300.svg</code> precisam de correção na biblioteca do Figma — fonte: Figma. Registrado
        em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> falta decidir se <code>BackToTop</code>,{' '}
        <code>CookieConsentBanner</code> e <code>Meganav</code> migram de Material Symbols Rounded
        (carregado do Google Fonts) para o estilo outlined inline, como o restante do sistema —
        fonte: repo. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="relacionados">Relacionados</h2>
      <ul>
        <li>
          <Link href="/fundamentos/cor">Cor</Link> — a paleta de onde vêm os tokens{' '}
          <code>color/icons/*</code>.
        </li>
        <li>
          <Link href="/fundamentos/tokens">Design tokens</Link> — como a cadeia de aliases funciona.
        </li>
        <li>
          <Link href="/fundamentos/acessibilidade">Acessibilidade</Link> — critérios completos.
        </li>
      </ul>
    </div>
  );
}
