import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { TabelaTokens } from '@/components/TokensVisuais';
import { listarComponentes, listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Elevação e sombra',
  description:
    'Os 6 tokens de sombra do Sampa Design System, com amostra visual de cada um, a hierarquia de profundidade proposta e quando não usar sombra.',
};

/**
 * Papel de cada sombra. O nome e o valor vêm de tokens.json; a leitura de
 * profundidade abaixo é descritiva do valor real (deslocamento, desfoque e
 * opacidade), não uma definição do time.
 */
const PAPEL: Record<string, { camada: string; papel: string }> = {
  '--ds-semantic-shadow-switch-thumb': {
    camada: 'Peça de controle',
    papel:
      'A menor sombra do sistema. Existe para destacar o botão deslizante dentro da trilha do Toggle, não para elevar uma superfície.',
  },
  '--ds-semantic-shadow-overlay': {
    camada: 'Rente à superfície',
    papel:
      'Sombra curta e escura, com spread negativo. O nome sugere camada alta, mas o valor é o segundo mais discreto do conjunto.',
  },
  '--ds-semantic-shadow-floating': {
    camada: 'Acima do conteúdo',
    papel:
      'Sombra ampla e leve. Usada em elementos que flutuam sobre o conteúdo sem bloquear a página.',
  },
  '--ds-semantic-shadow-raised': {
    camada: 'Acima do conteúdo (mais forte)',
    papel:
      'Duas camadas — uma ampla e escura, outra curta e leve. É mais pesada que floating, apesar do nome sugerir o contrário.',
  },
  '--ds-semantic-shadow-popover': {
    camada: 'Camada flutuante alta',
    papel:
      'Deslocamento e desfoque grandes. Para superfícies que abrem sobre o conteúdo e se fecham ao clicar fora.',
  },
  '--ds-semantic-shadow-modal': {
    camada: 'Camada mais alta',
    papel:
      'O mesmo valor de popover, mais uma segunda camada curta que reforça a base. É a sombra mais pesada do sistema.',
  },
};

/** Ordem de leitura de profundidade, do mais rente ao mais alto. */
const ORDEM = [
  '--ds-semantic-shadow-switch-thumb',
  '--ds-semantic-shadow-overlay',
  '--ds-semantic-shadow-floating',
  '--ds-semantic-shadow-raised',
  '--ds-semantic-shadow-popover',
  '--ds-semantic-shadow-modal',
];

/**
 * Hierarquia de profundidade proposta por esta documentação. Não existe escala
 * de z-index publicada no sistema — ver a pendência ao final da página.
 */
const PROFUNDIDADE = [
  {
    nivel: '5 — Dica',
    ocupantes: 'Tooltip',
    regra: 'Fica acima de tudo, inclusive de diálogo. Nunca recebe foco e nunca bloqueia interação.',
    sombra: '--ds-semantic-shadow-popover',
  },
  {
    nivel: '4 — Diálogo',
    ocupantes: 'Modal, CookieConsentBanner',
    regra: 'Bloqueia a página. Só um por vez, com scrim atrás e foco preso dentro.',
    sombra: '--ds-semantic-shadow-modal',
  },
  {
    nivel: '3 — Camada flutuante',
    ocupantes: 'Dropdown, Datepicker, Meganav, Toast',
    regra: 'Abre sobre o conteúdo e fecha ao clicar fora ou com Esc. Não bloqueia a página.',
    sombra: '--ds-semantic-shadow-popover / --ds-semantic-shadow-raised',
  },
  {
    nivel: '2 — Fixo na tela',
    ocupantes: 'Header fixo, BackToTop, Carousel, DataTable',
    regra: 'Acompanha a rolagem ou paira sobre a área de conteúdo. Some sob os níveis 3, 4 e 5.',
    sombra: '--ds-semantic-shadow-floating',
  },
  {
    nivel: '1 — Superfície',
    ocupantes: 'Card, ActionCard, Accordion',
    regra: 'Está no fluxo da página. Rola junto com o conteúdo.',
    sombra: 'nenhum token cobre este nível',
  },
  {
    nivel: '0 — Página',
    ocupantes: 'Fundo, seções, faixas de largura total',
    regra: 'Sem sombra nenhuma. Separação por cor de fundo, borda ou espaço.',
    sombra: 'nenhuma',
  },
];

export default function PaginaElevacaoESombra() {
  const tokens = listarTokens();
  const componentes = listarComponentes();

  const sombras = tokens.filter((t) => t.cssVar.startsWith('--ds-semantic-shadow-'));
  const ordenadas = ORDEM.map((nome) => sombras.find((t) => t.cssVar === nome)).filter(
    (t): t is (typeof sombras)[number] => Boolean(t),
  );

  // Quem consome cada token de sombra, lido dos dados dos componentes.
  const usoPorToken = new Map<string, string[]>();
  for (const t of sombras) usoPorToken.set(t.cssVar, []);
  for (const c of componentes) {
    for (const usado of c.tokensUsed) {
      if (usoPorToken.has(usado)) usoPorToken.get(usado)?.push(c.name);
    }
  }
  for (const [chave, nomes] of usoPorToken) {
    usoPorToken.set(chave, [...new Set(nomes)].sort((a, b) => a.localeCompare(b, 'pt-BR')));
  }
  const semUso = [...usoPorToken.entries()].filter(([, nomes]) => nomes.length === 0);

  // Sombras escritas à mão dentro dos componentes, sem passar por token.
  const literais: {
    componente: string;
    propriedade: string;
    valor: string;
    origem: string | null;
  }[] = [];
  for (const c of componentes) {
    for (const prop of c.cssCustomProperties) {
      if (!prop.name.includes('shadow')) continue;
      if (prop.value.includes('var(--ds-')) continue;
      literais.push({
        componente: c.name,
        propriedade: prop.name,
        valor: prop.value,
        origem: prop.comment,
      });
    }
  }
  literais.sort(
    (a, b) =>
      a.componente.localeCompare(b.componente, 'pt-BR') || a.propriedade.localeCompare(b.propriedade),
  );
  const compsComLiteral = [...new Set(literais.map((l) => l.componente))];

  const comSombraTokenizada = new Set(
    [...usoPorToken.values()].flat(),
  ).size;

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Fundamentos', href: '/fundamentos/visao-geral' },
          { titulo: 'Elevação e sombra' },
        ]}
      />

      <h1>Elevação e sombra</h1>
      <p className="wiki-prosa__resumo">
        Sombra responde a uma única pergunta: <strong>este elemento está no plano da página ou
        acima dele?</strong> Quando um menu abre sobre o conteúdo, a sombra é o que diz que ele vai
        se fechar e que o conteúdo continua ali embaixo. O Sampa Design System publica{' '}
        {sombras.length} tokens de sombra.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Estes {sombras.length} tokens existem só no código</p>
        <p>
          Todos vêm de <code>web-extras.tokens.json</code>, a <strong>única</strong> das cinco
          fontes de token que não tem collection correspondente no Figma. Eles são escritos à mão
          no repositório e emitidos sob o prefixo <code>--ds-semantic-shadow-*</code>. No Figma,
          as elevações existem como <strong>Effect Styles</strong> (<code>elevation/level-1..5</code>
          ), que não são exportados como variables e portanto nunca chegam ao pipeline. Design e
          código não compartilham fonte nenhuma para sombra.
        </p>
      </div>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Em serviço público, camada é orientação. Quem preenche um formulário longo precisa entender,
        em um relance, que o calendário que acabou de abrir é temporário e que o formulário continua
        preenchido embaixo. Sombra mal usada faz o contrário: quando tudo tem sombra, nada parece
        estar acima de nada, e a pessoa perde a noção do que é permanente e do que é passageiro.
      </p>
      <p>
        Sombra também é o exemplo mais claro de sinal que não pode carregar significado sozinho. Ela
        desaparece em modo de alto contraste do sistema operacional, some na impressão e é
        praticamente invisível para quem tem baixa visão. Se a única diferença entre dois estados de
        um componente é a sombra, esses dois estados são idênticos para parte das pessoas.
      </p>

      <h2 id="tokens">Os {sombras.length} tokens</h2>
      <p>
        Ordenados do mais rente ao mais alto, pela leitura do próprio valor: deslocamento vertical,
        desfoque e opacidade.
      </p>
      <TabelaTokens mostrarOrigem={false} tokens={ordenadas} />

      <h2 id="amostras">Amostra visual</h2>
      <p>
        Cada quadrado abaixo é uma superfície branca sobre fundo{' '}
        <code>grey-100</code>, com <code>box-shadow</code> apontando para o token real. É o que o
        navegador realmente desenha.
      </p>
      <div className="wiki-cartoes">
        {ordenadas.map((t) => {
          // ORDEM e PAPEL compartilham as mesmas chaves por construção (ambos
          // declarados acima, a partir dos mesmos --ds-semantic-shadow-*); o
          // fallback abaixo só satisfaz o índice de Record<string, ...>.
          const papel = PAPEL[t.cssVar] ?? { camada: '', papel: '' };
          return (
            <div key={t.cssVar}>
              <div
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  padding: 'var(--ds-primitive-spacing-24)',
                  borderRadius: 'var(--ds-primitive-border-radius-radius-md)',
                  background: 'var(--ds-primitive-color-neutral-grey-100)',
                }}
              >
                <div
                  style={{
                    inlineSize: '100%',
                    blockSize: '72px',
                    borderRadius: 'var(--ds-primitive-border-radius-radius-md)',
                    background: 'var(--ds-semantic-color-background-neutral-white)',
                    boxShadow: `var(${t.cssVar})`,
                  }}
                />
              </div>
              <p style={{ marginBlockStart: 'var(--ds-primitive-spacing-12)' }}>
                <code>{t.figmaPath.replace('semantic/shadow/', 'shadow/')}</code>
                <br />
                <strong>{papel.camada}</strong>
                <br />
                {papel.papel}
              </p>
            </div>
          );
        })}
      </div>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Os nomes não descrevem a ordem dos valores</p>
        <p>
          <code>raised</code> (<code>0 8px 20px</code> a 24%, mais uma segunda camada) é{' '}
          <strong>mais pesada</strong> que <code>floating</code> (<code>0 8px 16px</code> a 12%),
          embora em qualquer vocabulário de elevação &quot;raised&quot; seja a camada mais baixa e
          &quot;floating&quot; a mais alta. E <code>overlay</code>, cujo nome sugere a camada de
          cobertura, tem a segunda menor sombra do conjunto. Escolher a sombra pelo nome leva ao
          resultado errado — escolha pelo valor.
        </p>
      </div>

      <h2 id="hierarquia">Hierarquia de profundidade</h2>
      <p>
        Elevação não é só sombra: é a ordem em que as coisas se cobrem. A tabela abaixo é a ordem
        que esta documentação propõe, do plano da página até o topo.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Hierarquia de profundidade proposta, do nível 0 ao nível 5
          </caption>
          <thead>
            <tr>
              <th scope="col">Nível</th>
              <th scope="col">Quem ocupa</th>
              <th scope="col">Regra</th>
              <th scope="col">Token indicado</th>
            </tr>
          </thead>
          <tbody>
            {PROFUNDIDADE.map((n) => (
              <tr key={n.nivel}>
                <td>
                  <strong>{n.nivel}</strong>
                </td>
                <td>{n.ocupantes}</td>
                <td>{n.regra}</td>
                <td>
                  {n.sombra === 'nenhuma' ? (
                    <em>nenhuma</em>
                  ) : n.sombra.startsWith('--ds') ? (
                    n.sombra.split(' / ').map((s) => (
                      <div key={s}>
                        <code>{s}</code>
                      </div>
                    ))
                  ) : (
                    <em>{n.sombra}</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Em resumo: <strong>Tooltip fica acima de Modal, que fica acima de Dropdown e Toast, que
        ficam acima de Card.</strong> A regra por trás disso é de comportamento, não de estética:
        quanto mais efêmero e menos interativo o elemento, mais alto ele fica. O Tooltip está no
        topo porque some sozinho e nunca recebe foco; o Card está na base porque faz parte do
        conteúdo e rola junto com ele.
      </p>
      <p>
        <strong>O que o código faz hoje é outra coisa.</strong> O Modal não aplica sombra nenhuma; o
        único componente que consome <code>--ds-semantic-shadow-modal</code> é o
        CookieConsentBanner. Tooltip, Dropdown e Datepicker usam sombras escritas à mão. Card,
        ActionCard e Accordion também. A tabela acima descreve para onde o sistema deveria
        convergir, não onde ele está.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a hierarquia acima é uma proposta desta documentação, não uma
        definição do time. <strong>Não existe escala de z-index publicada</strong> — nenhum token,
        nenhuma tabela. Os dois valores encontrados no código são literais e não conversam entre si:{' '}
        <code>50</code> no BackToTop e <code>70</code> na gaveta do Meganav. Sem escala, dois
        componentes que abrem ao mesmo tempo se cobrem por ordem de DOM, não por decisão de design —
        fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="uso-real">Quem usa cada token hoje</h2>
      <p>
        Levantado dos componentes publicados. {comSombraTokenizada} deles consomem algum token de
        sombra.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes que consomem cada token de sombra
          </caption>
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">Valor</th>
              <th scope="col">Componentes</th>
            </tr>
          </thead>
          <tbody>
            {ordenadas.map((t) => {
              const nomes = usoPorToken.get(t.cssVar) ?? [];
              return (
                <tr key={t.cssVar}>
                  <td>
                    <code>{t.cssVar}</code>
                  </td>
                  <td>
                    <code>{t.valorResolvido}</code>
                  </td>
                  <td>{nomes.length ? nomes.join(', ') : <em>nenhum</em>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {semUso.length ? (
        <p>
          {semUso.length === 1 ? 'Um token não é usado' : `${semUso.length} tokens não são usados`}{' '}
          por nenhum componente:{' '}
          {semUso.map(([nome]) => (
            <code key={nome}>{nome}</code>
          ))}
          . Ele existe no CSS publicado, mas nenhuma parte do sistema o consome.
        </p>
      ) : null}

      <h2 id="fora-do-token">Sombras que não passam por token</h2>
      <p>
        Este é o outro lado do inventário. {literais.length} sombras estão escritas à mão dentro do
        CSS de {compsComLiteral.length} componentes, como custom properties locais que não apontam
        para nenhum token <code>--ds-*</code>. A coluna da direita traz o comentário que o próprio
        CSS deixou registrado sobre a origem no Figma.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Sombras escritas à mão no CSS dos componentes
          </caption>
          <thead>
            <tr>
              <th scope="col">Componente</th>
              <th scope="col">Custom property local</th>
              <th scope="col">Valor</th>
              <th scope="col">Origem declarada no CSS</th>
            </tr>
          </thead>
          <tbody>
            {literais.map((l) => (
              <tr key={`${l.componente}-${l.propriedade}`}>
                <td>{l.componente}</td>
                <td>
                  <code>{l.propriedade}</code>
                </td>
                <td>
                  <code>{l.valor}</code>
                </td>
                <td>{l.origem ?? <em>não declarada</em>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Soma-se a essas a sombra do Tooltip — <code>0 4px 4px rgb(0 0 0 / 12%)</code> mais{' '}
        <code>0 2px 2px rgb(0 0 0 / 8%)</code> —, que está aplicada direto na regra do balão, sem
        nem virar custom property. Registrada em <code>INCONSISTENCIAS.md</code> §6.4.
      </p>
      <p>
        Repare em dois padrões. Primeiro: parte dos literais usa <code>rgb(0 0 0 / …)</code> — preto
        puro — enquanto todos os tokens usam <code>rgba(24, 24, 24, …)</code>. São duas famílias de
        sombra convivendo no mesmo produto. Segundo: os comentários do CSS apontam sempre para{' '}
        <code>elevation/level-1</code> e <code>level-2</code> do Figma, ou seja, a implementação
        sabe de qual estilo veio — o que falta é o estilo virar variable e entrar no pipeline.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> as sombras de {compsComLiteral.join(', ')} e Tooltip precisam
        virar token, ou os tokens existentes precisam ser ajustados para cobrir esses casos. A
        decisão depende de definir primeiro a escala oficial de elevação — fonte: Figma (variables) +{' '}
        <code>packages/tokens</code>. Registrado em <code>LACUNAS.md</code> (itens 90, 138, 153, 268)
        e em <code>INCONSISTENCIAS.md</code> §7, item 30.
      </p>

      <h2 id="tres-vocabularios">Três vocabulários de elevação</h2>
      <p>Como no caso dos breakpoints, o sistema tem mais de uma resposta para a mesma pergunta.</p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Vocabulários de elevação em circulação
          </caption>
          <thead>
            <tr>
              <th scope="col">Fonte</th>
              <th scope="col">Quantos níveis</th>
              <th scope="col">Como se chamam</th>
              <th scope="col">Chega ao código?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Tokens</strong> (<code>web-extras.tokens.json</code>)
              </td>
              <td>{sombras.length}</td>
              <td>
                floating, modal, overlay, popover, raised, switch-thumb — nomes de{' '}
                <em>uso</em>, não de nível
              </td>
              <td>
                <span className="wiki-selo wiki-selo--estavel">sim</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Figma</strong> (Effect Styles)
              </td>
              <td>5</td>
              <td>
                <code>elevation/level-1</code> a <code>level-5</code> — nomes de nível
              </td>
              <td>
                <span className="wiki-selo wiki-selo--neutro">não são variables</span>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Storybook</strong> (<code>Foundations/Elevation</code>)
              </td>
              <td>4</td>
              <td>Level 0 Base, Level 1 Raised, Level 2 Floating, Level 3 Overlay</td>
              <td>
                <span className="wiki-selo wiki-selo--neutro">receitas em texto</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        A página do Storybook descreve os níveis como receitas —{' '}
        <code>&quot;alpha-12 + spacing-2/6&quot;</code> — que não correspondem a nenhum valor
        compilado e não podem ser copiadas para o código. As sombras que aquela página mostra estão
        escritas no CSS da própria documentação.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> escolher um vocabulário único de elevação (níveis numerados ou
        nomes de uso), publicá-lo como variables no Figma e reconciliar os {sombras.length} tokens
        atuais com ele — fonte: decisão conjunta de Design e Eng de tokens. Registrado em{' '}
        <code>LACUNAS.md</code> (itens 342 e 344).
      </p>

      <h2 id="quando-nao-usar">Quando não usar sombra</h2>
      <p>
        Sombra é cara: ela pesa visualmente, atrapalha a leitura em telas pequenas e não sobrevive a
        modo de alto contraste nem à impressão. Não use nos casos abaixo.
      </p>
      <ul>
        <li>
          <strong>Para separar coisas que estão no mesmo plano.</strong> Duas seções de uma página
          se separam com espaço, borda ou mudança de fundo — não com sombra. Se tudo é elevado, nada
          é.
        </li>
        <li>
          <strong>Como único sinal de estado.</strong> Foco precisa de anel visível, seleção precisa
          de borda ou marca, erro precisa de cor e texto. Sombra pode acompanhar, nunca substituir.
        </li>
        <li>
          <strong>Empilhada.</strong> Card com sombra dentro de painel com sombra dentro de modal
          com sombra vira borrão. Sombra é do elemento mais alto, e só dele.
        </li>
        <li>
          <strong>Em faixas de largura total.</strong> Um bloco que ocupa a largura da janela não
          &quot;flutua&quot; sobre nada. Use cor de fundo.
        </li>
        <li>
          <strong>Em campo de formulário, linha de tabela ou item de lista.</strong> São conteúdo em
          fluxo. A leitura fica mais difícil, não mais fácil.
        </li>
        <li>
          <strong>Para compensar contraste insuficiente.</strong> Se o card não se distingue do
          fundo, o problema é a cor. Ver{' '}
          <Link href="/fundamentos/cor">Cor</Link> e a matriz de contraste.
        </li>
        <li>
          <strong>Sobre superfície escura.</strong> Os {sombras.length} tokens são construídos com{' '}
          <code>rgba(24, 24, 24, …)</code> e desaparecem em fundo escuro. Ver a pendência de modo
          escuro abaixo.
        </li>
      </ul>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <ul>
        <li>
          Sombra não é percebida por parte das pessoas e some no modo de alto contraste do sistema
          operacional. Ela pode reforçar hierarquia, nunca ser a única portadora dela.
        </li>
        <li>
          Elevação precisa ter equivalente programático. Um diálogo elevado precisa de{' '}
          <code>role=&quot;dialog&quot;</code>, <code>aria-modal</code> e foco preso — a sombra não
          informa nada a quem usa leitor de tela.
        </li>
        <li>
          Ordem visual e ordem de foco precisam coincidir. Se algo está desenhado acima, precisa
          estar acima também na sequência de tabulação.
        </li>
        <li>
          Não use sombra para criar contraste de texto. O texto tem que passar em WCAG contra o
          fundo real.
        </li>
      </ul>

      <h2 id="uso-codigo">Como usar em código</h2>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`/* certo: token de sombra */
.ds-meu-popover {
  background: var(--ds-semantic-color-background-neutral-white);
  border-radius: var(--ds-primitive-border-radius-radius-md);
  box-shadow: var(--ds-semantic-shadow-popover);
}

/* errado: sombra escrita à mão */
.ds-meu-popover {
  box-shadow: 0 4px 4px rgb(0 0 0 / 8%);
}`}</code>
      </pre>
      <p>
        Não some sombras nem empilhe camadas próprias: os tokens <code>modal</code> e{' '}
        <code>raised</code> já são compostos por duas camadas. Se um token não serve para o seu
        caso, isso é sinal de que falta uma decisão de sistema — registre a lacuna em vez de
        escrever um valor novo.
      </p>

      <h2 id="uso-figma">Como usar no Figma</h2>
      <p>
        As elevações estão na biblioteca <strong>Foundations</strong> como <strong>Effect
        Styles</strong> (<code>elevation/level-1</code> a <code>level-5</code>), não como variables.
        Aplique o estilo de efeito ao frame — mas saiba que <strong>o valor aplicado no Figma não é
        o valor que sai no código</strong>, porque essas duas listas nunca foram reconciliadas.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não há instrução publicada de onde encontrar os Effect Styles
        de elevação na biblioteca nem de como aplicá-los, e não existe correspondência declarada
        entre <code>elevation/level-N</code> e os {sombras.length} tokens do código — fonte: Figma
        (biblioteca Foundations). Registrado em <code>LACUNAS.md</code> (item 347).
      </p>

      <h2 id="modo-escuro">Modo escuro</h2>
      <p>
        Não existe. A collection <code>T2: Semantics</code> tem um modo único, chamado{' '}
        <code>Prodesp</code>. Como as {sombras.length} sombras são sempre escuras sobre claro, elas
        não têm leitura em superfície escura — em um tema escuro, elevação normalmente se resolve
        clareando a superfície, não escurecendo o entorno.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não há decisão sobre modo escuro nem sobre como a elevação se
        comportaria nele — fonte: time. Registrado em <code>INCONSISTENCIAS.md</code> §7, item 32, e
        em <code>LACUNAS.md</code> (item 346).
      </p>

      <h2 id="pendencias">Pendências desta página</h2>
      <ul>
        <li>
          Os {sombras.length} tokens não têm collection no Figma — vivem só em{' '}
          <code>web-extras.tokens.json</code>.
        </li>
        <li>
          Três vocabulários de elevação em circulação ({sombras.length} tokens, 5 Effect Styles, 4
          níveis no Storybook).
        </li>
        <li>
          {literais.length} sombras escritas à mão no CSS de {compsComLiteral.length} componentes,
          sem token — mais a do Tooltip, aplicada direto na regra.
        </li>
        <li>
          O Modal não aplica sombra nenhuma, e o único consumidor de{' '}
          <code>--ds-semantic-shadow-modal</code> é o CookieConsentBanner.
        </li>
        <li>Nenhuma escala de z-index publicada.</li>
        <li>Nenhuma decisão sobre modo escuro.</li>
        {semUso.length ? (
          <li>
            {semUso.length === 1 ? 'Um token de sombra' : `${semUso.length} tokens de sombra`} sem
            nenhum consumidor no sistema.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
