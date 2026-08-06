import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { TabelaTokens } from '@/components/TokensVisuais';
import { listarComponentes, listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Motion',
  description:
    'O que existe de movimento no Sampa Design System: 22 tokens de tempo quebrados na origem, nenhum token de easing, e os princípios que valem enquanto a escala oficial não existe.',
};

/** Durações e curvas realmente escritas no CSS dos componentes
 *  (packages/react/src/components/*​/*.styles.css). Não são tokens: são
 *  literais. A tabela descreve o código de hoje, não uma decisão publicada. */
const DURACOES_NO_CODIGO: {
  valor: string;
  curva: string;
  uso: string;
  onde: string;
  reduzido: string;
}[] = [
  {
    valor: '120ms',
    curva: 'ease',
    uso: 'Mudança de estado de um controle',
    onde: 'Checkbox, Radio, Header, Modal (botão de fechar), Stepper (reiniciar)',
    reduzido: 'transition: none',
  },
  {
    valor: '160ms',
    curva: 'ease',
    uso: 'Mudança de cor em hover e foco',
    onde: 'Breadcrumb, Meganav, Link, Chip, Tabs, Toast, Toggle, ListItem, Pagination, TextInput, TextArea',
    reduzido: 'depende do componente — ver a lista abaixo',
  },
  {
    valor: '180ms',
    curva: 'ease',
    uso: 'Rotação de chevron e preenchimento de progresso',
    onde: 'Accordion (chevron), ProgressBar (barra), Stepper (barra)',
    reduzido: 'transition: none',
  },
  {
    valor: '220ms',
    curva: 'ease',
    uso: 'Abrir, fechar e deslizar um bloco inteiro',
    onde: 'Accordion (painel), Carousel (trilho), DataTable (entrada de linha)',
    reduzido: 'transition: none',
  },
  {
    valor: '800ms',
    curva: 'linear',
    uso: 'Rotação contínua de espera',
    onde: 'Spinner, Button e ButtonGov em carregamento',
    reduzido: 'Spinner passa a 1600ms; os botões param (animation: none)',
  },
  {
    valor: '1200ms',
    curva: 'ease-in-out',
    uso: 'Progresso indeterminado',
    onde: 'ProgressBar em modo indeterminado',
    reduzido: '2400ms',
  },
  {
    valor: '1400ms e 1600ms',
    curva: 'ease-in-out',
    uso: 'Espera de carregamento de conteúdo',
    onde: 'Skeleton (pulse 1400ms, wave 1600ms)',
    reduzido: '2800ms nos dois',
  },
];

/** Componentes que animam apenas cor (160ms) e não declaram a regra de
 *  movimento reduzido. Levantado no CSS de packages/react. */
const SEM_GUARDA = [
  'Link',
  'ListItem',
  'Pagination',
  'Tabs',
  'TextArea',
  'TextInput',
  'Toast',
  'Toggle',
];

/** Componentes sem nenhuma transição ou animação no CSS. */
const SEM_MOVIMENTO = ['Avatar', 'Badge', 'CookieConsentBanner', 'Divider', 'Footer', 'Hero'];

export default function PaginaMotion() {
  const tokens = listarTokens();
  const motion = tokens.filter((t) => t.cssVar.includes('-motion-'));
  const duracoes = motion.filter((t) => t.cssVar.includes('-motion-duration'));
  const delays = motion.filter((t) => t.cssVar.includes('-motion-delay'));
  const easing = tokens.filter((t) => /eas|timing|bezier|curve/i.test(t.cssVar));
  const opacidadesQuebradas = tokens.filter((t) => t.cssVar.includes('effect-opacity'));

  const componentes = listarComponentes();
  const comGuarda = componentes
    .map((c) => ({
      nome: c.name,
      efeito: c.responsive.find((r) => r.query.includes('prefers-reduced-motion'))?.effect ?? null,
    }))
    .filter((c): c is { nome: string; efeito: string } => c.efeito !== null);
  const percentualGuarda = Math.round((comGuarda.length / componentes.length) * 100);

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Fundamentos', href: '/fundamentos/visao-geral' }, { titulo: 'Motion' }]}
      />

      <h1>Motion</h1>
      <p className="wiki-prosa__resumo">
        Movimento existe no Sampa Design System, mas ainda não existe como sistema. Há{' '}
        <strong>{motion.length} tokens de tempo</strong> publicados — e todos os{' '}
        {motion.length} estão quebrados na origem. Não há <strong>nenhum token de easing</strong>.
        Esta página documenta o que existe de verdade, mostra o defeito e registra os princípios que
        continuam valendo enquanto a escala oficial não é corrigida.
      </p>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Movimento bem usado responde a uma pergunta silenciosa: &quot;o que acabou de acontecer?&quot;.
        O painel que cresce a partir do cabeçalho mostra de onde veio o conteúdo. O botão que muda de
        cor confirma que o toque foi registrado. Isso reduz repetição de clique e reduz erro.
      </p>
      <p>
        Movimento mal usado faz o contrário. Atrasa quem só quer terminar o serviço, e provoca
        enjoo, tontura e dor de cabeça em quem tem sensibilidade vestibular. Por isso a regra mais
        importante desta página não é estética: é permitir que a pessoa desligue o movimento e
        continuar entregando a mesma informação.
      </p>

      <h2 id="estado-atual">O estado atual, sem rodeio</h2>
      <div className="wiki-numeros">
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{motion.length}</span>
          <span className="wiki-numero__rotulo">tokens de tempo publicados</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{motion.length}</span>
          <span className="wiki-numero__rotulo">deles saem sem unidade</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{easing.length}</span>
          <span className="wiki-numero__rotulo">tokens de easing</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{percentualGuarda}%</span>
          <span className="wiki-numero__rotulo">dos componentes respeitam movimento reduzido</span>
        </div>
      </div>
      <p>
        São {duracoes.length} tokens de duração e {delays.length} de atraso, todos na camada de
        componente. Não existe camada semântica de motion, não existe collection de motion no Figma
        e não existe curva de aceleração nomeada em lugar nenhum do sistema.
      </p>

      <h2 id="defeito">O defeito, com exemplo</h2>
      <p>
        No Figma, as variables de duração <strong>apontam para variables de espaçamento</strong>. O
        pipeline resolve o alias, encontra um número de pixels e exporta esse número — sem unidade e
        sem referência de origem. O resultado publicado em <code>tokens.css</code> é assim:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`:root {
  --ds-component-tooltip-motion-duration-enter: 6;   /* deveria ser um tempo */
  --ds-component-tooltip-motion-duration-exit: 4;
  --ds-component-modal-motion-duration-enter: 8;
  --ds-component-progress-spinner-motion-duration: 48;
}`}</code>
      </pre>
      <p>
        Em CSS, tempo sem unidade é inválido. Se alguém usar o token, o navegador descarta a
        declaração inteira — e a transição some sem aviso:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`/* O que aconteceria ao usar o token hoje */
.ds-tooltip__bubble {
  transition: opacity var(--ds-component-tooltip-motion-duration-enter) ease;
}
/* resolve para:  transition: opacity 6 ease;  → declaração inválida, descartada */

/* O que o Tooltip realmente faz: valor literal, escrito à mão */
.ds-tooltip__bubble {
  transition:
    opacity 120ms ease,
    visibility 120ms ease;
}`}</code>
      </pre>
      <p>
        Mesmo que a unidade existisse, os números não fazem sentido como tempo: 6 ms e 8 ms são
        imperceptíveis, e 48 ms é curto demais para a rotação de um spinner. Eles são{' '}
        <code>spacing/6</code>, <code>spacing/8</code> e <code>spacing/48</code> — medidas de
        espaço, não de tempo.
      </p>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Não consuma estes tokens</p>
        <p>
          Enquanto os aliases não forem corrigidos no Figma, os {motion.length} tokens de tempo não
          devem ser usados em código nem referenciados em documentação de componente. Escreva o
          valor em milissegundos, como o restante do sistema já faz. O mesmo vale para{' '}
          {opacidadesQuebradas.length} tokens de opacidade de backdrop —{' '}
          {opacidadesQuebradas.map((t) => t.cssVar).join(' e ')} — que saem como{' '}
          <code>{opacidadesQuebradas[0]?.valorResolvido}</code> pelo mesmo motivo.
        </p>
      </div>

      <h2 id="tokens">Os {motion.length} tokens de tempo</h2>
      <p>
        Valores como o pipeline os publica hoje. Nenhum tem alias: o vínculo com a variable de
        origem se perdeu na exportação, então o número aparece solto.
      </p>
      <TabelaTokens mostrarOrigem={false} tokens={motion} />

      <h2 id="easing">Easing</h2>
      <p>
        Não existe <strong>nenhum</strong> token de curva de aceleração. O código usa as palavras-chave
        do próprio CSS, e as usa de forma consistente:
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Curvas usadas no código</caption>
          <thead>
            <tr>
              <th scope="col">Curva</th>
              <th scope="col">Quando</th>
              <th scope="col">Por quê</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>ease</code>
              </td>
              <td>Transições de estado com começo e fim</td>
              <td>Sai rápido e chega devagar — parece resposta, não deslocamento mecânico.</td>
            </tr>
            <tr>
              <td>
                <code>linear</code>
              </td>
              <td>Rotação contínua (Spinner, botão em carregamento)</td>
              <td>Loop sem começo nem fim não pode ter aceleração: ficaria pulsando.</td>
            </tr>
            <tr>
              <td>
                <code>ease-in-out</code>
              </td>
              <td>Animações de espera que vão e voltam (Skeleton, progresso indeterminado)</td>
              <td>Suaviza as duas pontas do ciclo, sem solavanco na virada.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Enquanto não houver token, use estas três palavras-chave. Não escreva{' '}
        <code>cubic-bezier()</code> próprio: uma curva inventada por produto é impossível de
        reconciliar depois.
      </p>

      <h2 id="no-codigo">As durações que o código realmente usa</h2>
      <p>
        Levantamento no CSS dos componentes publicados. São valores literais, não tokens — e é a
        coisa mais próxima de uma escala que o sistema tem hoje.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Durações escritas no CSS dos componentes
          </caption>
          <thead>
            <tr>
              <th scope="col">Duração</th>
              <th scope="col">Curva</th>
              <th scope="col">Para quê</th>
              <th scope="col">Onde</th>
              <th scope="col">Com movimento reduzido</th>
            </tr>
          </thead>
          <tbody>
            {DURACOES_NO_CODIGO.map((d) => (
              <tr key={d.valor}>
                <td>
                  <code>{d.valor}</code>
                </td>
                <td>
                  <code>{d.curva}</code>
                </td>
                <td>{d.uso}</td>
                <td>{d.onde}</td>
                <td>{d.reduzido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        A leitura possível: <strong>até 220ms para tudo que responde a uma ação</strong> e{' '}
        <strong>800ms ou mais só para espera em loop</strong>. Não trate isso como escala oficial —
        é a descrição do que existe, e a escala oficial depende da correção no Figma.
      </p>

      <h2 id="principios">Princípios que valem mesmo sem token</h2>
      <ol>
        <li>
          <strong>Movimento explica, não decora.</strong> Se você não consegue dizer o que aquela
          animação informa, ela não deveria estar ali.
        </li>
        <li>
          <strong>Resposta imediata é curta.</strong> Confirmação de toque, hover e foco ficam
          abaixo de 200ms. Acima disso a interface parece lenta, e a pessoa clica de novo.
        </li>
        <li>
          <strong>O movimento segue a direção da ação.</strong> O painel do Accordion cresce a
          partir do cabeçalho que foi clicado. O trilho do Carousel desliza para o lado do botão
          acionado. Um elemento que entra por um lado deve sair pelo mesmo lado.
        </li>
        <li>
          <strong>Quanto maior a área que se move, mais tempo ela precisa.</strong> Um check de 10px
          em 120ms; um painel inteiro em 220ms. A mesma duração aplicada aos dois faz o pequeno
          parecer lento e o grande parecer abrupto.
        </li>
        <li>
          <strong>Nada essencial depende do movimento.</strong> A informação precisa estar no texto
          e no estado do componente. Se o movimento for desligado, nada se perde.
        </li>
        <li>
          <strong>Loop só para espera.</strong> Animação contínua serve para dizer &quot;estamos
          processando&quot;. Fora disso, nada pisca, gira ou pulsa sozinho na tela — é o que pede o
          critério 2.2.2 da WCAG 2.1 (Pausar, Parar, Ocultar).
        </li>
        <li>
          <strong>Uma coisa se move por vez.</strong> Duas animações simultâneas competindo pela
          atenção equivalem a nenhuma.
        </li>
        <li>
          <strong>Respeite <code>prefers-reduced-motion</code> sempre.</strong> Não é opcional e não
          é caso de exceção. É a próxima seção.
        </li>
      </ol>

      <h2 id="movimento-reduzido">Movimento reduzido</h2>
      <p>
        Quem tem sensibilidade vestibular pode ligar a preferência de reduzir movimento no próprio
        sistema operacional — em iOS, Android, Windows, macOS e nas principais distribuições Linux.
        O navegador repassa essa escolha ao CSS pela media query{' '}
        <code>prefers-reduced-motion: reduce</code>. Ignorar a preferência é ignorar um pedido
        explícito da pessoa.
      </p>
      <p>
        Hoje <strong>{percentualGuarda}% dos componentes</strong> declaram a regra. O sistema usa
        duas estratégias, e a escolha entre elas não é arbitrária:
      </p>
      <ul>
        <li>
          <strong>Desligar</strong> (<code>transition: none</code>) — quando o movimento só
          confirmava algo que a mudança de cor ou de estado já comunica. É o caso da maioria.
        </li>
        <li>
          <strong>Alongar</strong> — quando a animação <em>é</em> a informação. O Skeleton passa a
          2800ms e o Spinner a 1600ms, em vez de parar: se parassem, a pessoa acharia que a página
          travou. Movimento lento continua legível e deixa de ser agressivo.
        </li>
      </ul>

      <h3 id="reduzido-codigo">Como o código faz</h3>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`/* Desligar — Tooltip.styles.css */
@media (prefers-reduced-motion: reduce) {
  .ds-tooltip__bubble {
    transition: none;
  }
}

/* Alongar — Skeleton.styles.css: a espera continua visível, mais lenta */
@media (prefers-reduced-motion: reduce) {
  .ds-skeleton--animation-pulse,
  .ds-skeleton--animation-wave::after {
    animation-duration: 2800ms;
  }
}

/* Alongar — Spinner.styles.css: 800ms viram 1600ms */
@media (prefers-reduced-motion: reduce) {
  .ds-spinner__circle {
    animation-duration: 1600ms;
  }
}`}</code>
      </pre>
      <p>
        Movimento disparado por JavaScript também precisa consultar a preferência. O{' '}
        <code>BackToTop</code> faz isso antes de rolar a página:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`function getPrefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// no clique: rolagem instantânea quando a pessoa pediu menos movimento
const behavior = getPrefersReducedMotion() ? 'auto' : scrollBehavior;
scrollTargetToTop(target ?? window, behavior);`}</code>
      </pre>
      <p>
        Esta própria Wiki aplica a regra de forma global, como rede de segurança para qualquer
        transição não prevista:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`}</code>
      </pre>

      <h3 id="reduzido-cobertura">Cobertura componente a componente</h3>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes que declaram prefers-reduced-motion e o que fazem
          </caption>
          <thead>
            <tr>
              <th scope="col">Componente</th>
              <th scope="col">O que muda com movimento reduzido</th>
            </tr>
          </thead>
          <tbody>
            {comGuarda.map((c) => (
              <tr key={c.nome}>
                <td>
                  <strong>{c.nome}</strong>
                </td>
                <td>{c.efeito}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">
          {SEM_GUARDA.length} componentes animam sem declarar a regra
        </p>
        <p>
          {SEM_GUARDA.join(', ')} têm transição de cor em 160ms e não declaram{' '}
          <code>prefers-reduced-motion</code>. Transição de cor não desloca elemento na tela, então
          o risco vestibular é baixo — mas a regra deveria ser uniforme, e hoje não é. Outros{' '}
          {SEM_MOVIMENTO.length} componentes ({SEM_MOVIMENTO.join(', ')}) não têm nenhuma transição
          ou animação, e por isso não precisam da regra.
        </p>
      </div>

      <h2 id="uso-figma">Como usar no Figma</h2>
      <p>
        Não existe collection de motion na biblioteca <strong>Foundations</strong>. As durações que
        existem estão dentro de <code>T3: Components</code>, ligadas por engano a variables de
        espaçamento — é exatamente esse vínculo que precisa ser refeito.
      </p>
      <p>
        Enquanto isso: não crie variable local de duração dentro de um arquivo de produto. Anote a
        duração pretendida na descrição do componente, em milissegundos, e registre a necessidade
        para que ela entre na collection quando ela existir.
      </p>

      <h2 id="uso-codigo">Como usar em código</h2>
      <p>
        Escreva o valor em milissegundos, use uma das três curvas do CSS e declare a regra de
        movimento reduzido no mesmo arquivo — sempre os três juntos.
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`.meu-painel {
  /* certo: literal em ms, curva padrão do CSS */
  transition: transform 220ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .meu-painel {
    transition: none;
  }
}

/* errado: o token de duração sai sem unidade e invalida a declaração */
.meu-painel {
  transition: transform var(--ds-component-card-motion-duration) ease;
}`}</code>
      </pre>
      <ul>
        <li>Anime preferencialmente o que não recalcula layout: cor, opacidade e transformação.</li>
        <li>
          Não anime <code>display</code> nem altura automática. Se precisar abrir um bloco, siga o
          Accordion, que anima <code>grid-template-rows</code>.
        </li>
        <li>
          Toda animação em loop precisa parar sozinha ou ter um controle de parada visível na tela.
        </li>
        <li>
          Toda declaração de <code>transition</code> ou <code>animation</code> exige o bloco{' '}
          <code>@media (prefers-reduced-motion: reduce)</code> correspondente.
        </li>
      </ul>

      <h2 id="pendencias">Pendências</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a escala oficial de duração depende de corrigir, no Figma, o
        alias dos {motion.length} tokens de tempo — hoje eles apontam para variables de{' '}
        <code>spacing</code> e saem sem unidade (<code>--ds-component-tooltip-motion-duration-enter: 6</code>).
        Sem essa correção, esta página não tem durações reais para publicar — fonte: Figma
        (collection <code>T3: Components</code>). Registrado em <code>LACUNAS.md</code>, item 365, e
        em <code>INCONSISTENCIAS.md</code> §6.7.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe nenhum token de easing nem collection de motion na
        biblioteca Foundations. Falta decidir se a curva vira token nomeado ou permanece como
        palavra-chave do CSS — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> {SEM_GUARDA.length} componentes ({SEM_GUARDA.join(', ')})
        animam cor sem declarar <code>prefers-reduced-motion</code>. Falta padronizar — fonte: repo
        (<code>packages/react</code>). Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> os valores literais desta página (120, 160, 180, 220, 800ms)
        descrevem o CSS de hoje; não são uma escala aprovada. A agrupação por uso é uma proposta
        desta documentação e precisa de validação antes de virar regra — fonte: time. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="relacionados">Relacionados</h2>
      <ul>
        <li>
          <Link href="/fundamentos/tokens">Design tokens</Link> — a cadeia de aliases e por que ela
          falha aqui.
        </li>
        <li>
          <Link href="/fundamentos/acessibilidade">Acessibilidade</Link> — critérios completos, além
          do movimento.
        </li>
        <li>
          <Link href="/fundamentos/espacamento">Espaçamento</Link> — a escala para onde os tokens de
          tempo apontam por engano.
        </li>
      </ul>
    </div>
  );
}
