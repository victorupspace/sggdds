import type { Metadata } from 'next';

import { Tabela } from '@/components/Blocos';
import { Trilha } from '@/components/Trilha';
import { formatarRazao, razaoDeContraste } from '@/lib/contraste';
import { listarComponentes, listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Acessibilidade',
  description:
    'Compromisso de nível, contraste, foco visível, teclado, semântica, leitores de tela, movimento reduzido e o checklist de verificação antes de publicar uma tela do Sampa Design System.',
};

export default function PaginaAcessibilidade() {
  const componentes = listarComponentes();
  const tokens = listarTokens();

  const total = componentes.length;
  const comAxe = componentes.filter((c) => c.tests.a11yFile !== null);
  const semAxe = componentes.filter((c) => c.tests.a11yFile === null);
  const percentual = Math.round((comAxe.length / total) * 100);
  const asseracoes = comAxe.reduce((soma, c) => soma + (c.tests.a11yCount ?? 0), 0);

  const comTeclado = componentes.filter(
    (c) => c.accessibility.keyboardInteractions.length > 0,
  );
  const percentualTeclado = Math.round((comTeclado.length / total) * 100);
  const comMovimentoReduzido = componentes.filter((c) =>
    c.responsive.some((r) => r.query.includes('prefers-reduced-motion')),
  );
  const percentualMovimento = Math.round((comMovimentoReduzido.length / total) * 100);

  const valor = (nome: string) => tokens.find((t) => t.cssVar === nome)?.valorResolvido ?? '';

  const corAnel = valor('--ds-component-focus-ring-color-ring');
  const larguraAnel = valor('--ds-component-focus-ring-effect-width');
  const deslocamentoAnel = valor('--ds-component-focus-ring-effect-offset');
  const raioAnel = valor('--ds-component-focus-ring-border-radius');
  const corMarca = valor('--ds-brand-color-brand-red');
  const corInterface = valor('--ds-brand-color-brand-red-primary');
  const fundoPrimario = valor('--ds-semantic-color-background-brand-primary-default');

  const contrasteAnelBranco = razaoDeContraste(corAnel, '#ffffff');
  const contrasteAnelBotao = razaoDeContraste(corAnel, fundoPrimario);
  const contrasteMarca = razaoDeContraste(corMarca, '#ffffff');
  const contrasteInterface = razaoDeContraste(corInterface, '#ffffff');

  // Inventário real de origem de cor de anel de foco, lido das custom properties
  // declaradas no CSS de cada componente. Aliases internos (var(--nome-local))
  // ficam de fora: eles apenas repassam outra origem.
  const origensFoco = new Map<string, string[]>();
  for (const componente of componentes) {
    for (const prop of componente.cssCustomProperties) {
      if (!/focus/i.test(prop.name)) continue;
      if (prop.value.startsWith('var(--') && !prop.value.startsWith('var(--ds-')) continue;
      const lista = origensFoco.get(prop.value) ?? [];
      if (!lista.includes(componente.name)) lista.push(componente.name);
      origensFoco.set(prop.value, lista);
    }
  }
  const origensOrdenadas = [...origensFoco.entries()].sort((a, b) => b[1].length - a[1].length);

  const resolverOrigem = (expressao: string) => {
    const achado = /^var\((--[a-z0-9-]+)\)$/.exec(expressao);
    if (!achado) return expressao;
    // Grupo de captura obrigatório: sempre presente quando `achado` é truthy.
    return valor(achado[1] ?? '') || '—';
  };

  const tokensMarca = tokens.filter((t) => t.valorResolvido.toLowerCase() === '#ff161f');
  const tokensTextoMarca = tokensMarca.filter((t) => /(color-text|text-style)/.test(t.cssVar));

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Fundamentos', href: '/fundamentos/visao-geral' },
          { titulo: 'Acessibilidade' },
        ]}
      />

      <h1>Acessibilidade</h1>
      <p className="wiki-prosa__resumo">
        Serviço público não pode escolher quem atende. Se uma tela do Estado não funciona com
        teclado, com leitor de tela, com zoom de 200% ou com pouco contraste, ela não está
        &quot;com um problema de usabilidade&quot;: ela está negando um direito. Esta página reúne o
        compromisso do Sampa Design System, o que já está implementado, o que ainda não está — e o
        checklist que você aplica antes de publicar.
      </p>

      <h2 id="compromisso">Compromisso de nível</h2>
      <p>
        O alvo desta documentação é <strong>WCAG 2.1, nível AA</strong>, em todas as telas
        construídas com o Sampa Design System. Isso significa, na prática: contraste de 4,5:1 para
        texto normal e 3:1 para texto grande e para elementos gráficos, tudo operável por teclado,
        foco sempre visível, rótulo programático em todo campo, e nenhuma informação transmitida só
        por cor.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> esse nível ainda <strong>não está formalizado</strong>. Três
        fontes internas divergem: a capa do Storybook afirma &quot;AA&quot;, a página
        <code> accessibility.mdx</code> não declara versão nem nível, e{' '}
        <code>consuming.mdx</code> §13 fixa apenas &quot;≥ 4.5:1&quot;. Falta a decisão do time
        sobre versão (2.1 ou 2.2) e nível (AA ou outro) — fonte: time. Enquanto isso não existir,
        trate &quot;WCAG 2.1 AA&quot; como a meta de trabalho, não como conformidade declarada.
        Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> também não há declaração de qual marco normativo brasileiro se
        aplica ao Design System (eMAG, Lei Brasileira de Inclusão, norma interna do órgão), nem
        existe relatório de conformidade versionado ou página pública de acessibilidade — fonte:
        time / jurídico. Registrado em <code>LACUNAS.md</code>.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Componente acessível não é tela acessível</p>
        <p>
          Os componentes cuidam da própria semântica, do próprio foco e dos próprios rótulos. Eles
          não sabem a ordem em que você os empilhou, se o <code>&lt;h1&gt;</code> existe, se o
          formulário faz sentido, nem se o texto do botão diz o que o botão faz. A maior parte das
          falhas de acessibilidade nasce na composição da página, não dentro do componente.
        </p>
      </div>

      <h2 id="cobertura">Onde o sistema está hoje</h2>
      <div className="wiki-numeros">
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{percentual}%</span>
          <span className="wiki-numero__rotulo">dos componentes com teste axe</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{asseracoes}</span>
          <span className="wiki-numero__rotulo">casos de teste nos arquivos a11y</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{percentualTeclado}%</span>
          <span className="wiki-numero__rotulo">com comportamento de teclado documentado</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{percentualMovimento}%</span>
          <span className="wiki-numero__rotulo">respeitam movimento reduzido</span>
        </div>
      </div>
      <p>
        A cobertura de teste automatizado é medida pela presença de um arquivo{' '}
        <code>*.a11y.test.tsx</code> (vitest + axe) no componente. Hoje{' '}
        <strong>{percentual}% dos componentes</strong> têm esse arquivo. Os demais não têm nenhuma
        verificação automática de acessibilidade.
      </p>

      <h3 id="com-teste">Componentes com teste axe</h3>
      <ul className="wiki-lista-tokens">
        {comAxe.map((c) => (
          <li key={c.slug}>
            <a href={`/componentes/${c.slug}`}>{c.name}</a> — {c.tests.a11yCount ?? 0} casos
          </li>
        ))}
      </ul>

      <h3 id="sem-teste">Componentes sem teste axe</h3>
      <ul className="wiki-lista-tokens">
        {semAxe.map((c) => (
          <li key={c.slug}>
            <a href={`/componentes/${c.slug}`}>{c.name}</a>
          </li>
        ))}
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe meta oficial de cobertura de teste de
        acessibilidade, nem prazo, nem critério de bloqueio de release — fonte: time. Hoje um
        componente pode ser publicado sem nenhum teste axe. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p>
        E vale o alerta de sempre: <strong>axe não certifica nada</strong>. Ferramenta automática
        pega, na melhor das hipóteses, uma parte das falhas — tipicamente contraste, rótulo ausente
        e atributo ARIA inválido. Ordem de leitura, texto de link genérico, foco perdido depois de
        uma ação e mensagem de erro que não é anunciada só aparecem em teste manual.
      </p>

      <h2 id="contraste">Contraste</h2>
      <p>
        A regra de AA: <strong>4,5:1</strong> para texto normal, <strong>3:1</strong> para texto
        grande (a partir de 24px, ou 18,66px em negrito) e <strong>3:1</strong> para bordas de
        campo, ícones informativos e indicadores de estado. A matriz completa, calculada sobre o
        valor real de cada token, está em <a href="/fundamentos/cor">Cor</a>.
      </p>
      <p>
        Os pares semânticos de texto sobre fundo passam. O problema está isolado na cor de marca:
      </p>
      <Tabela
        cabecalho={['Cor', 'Token raiz', 'Sobre branco', 'Texto normal (4,5:1)', 'Tokens que resolvem para ela']}
        legenda="Contraste das duas cores de marca sobre fundo branco"
        linhas={[
          [
            <code key="c1">{corMarca.toUpperCase()}</code>,
            <code key="t1">--ds-brand-color-brand-red</code>,
            contrasteMarca ? formatarRazao(contrasteMarca) : '—',
            <strong key="r1">reprova</strong>,
            `${tokensMarca.length} tokens`,
          ],
          [
            <code key="c2">{corInterface.toUpperCase()}</code>,
            <code key="t2">--ds-brand-color-brand-red-primary</code>,
            contrasteInterface ? formatarRazao(contrasteInterface) : '—',
            'passa',
            `${tokens.filter((t) => t.valorResolvido.toLowerCase() === '#c50007').length} tokens`,
          ],
        ]}
      />
      <p>
        A exceção de logotipo das WCAG cobre a marca gráfica — ver{' '}
        <a href="/fundamentos/logo-e-marca">Logo e marca</a>. Ela <strong>não</strong> cobre texto
        de interface. E hoje {tokensTextoMarca.length} tokens de <strong>cor de texto</strong>{' '}
        resolvem para <code>{corMarca.toUpperCase()}</code>, todos a{' '}
        {contrasteMarca ? formatarRazao(contrasteMarca) : '—'} sobre branco:
      </p>
      <ul className="wiki-lista-tokens">
        {tokensTextoMarca.map((t) => (
          <li key={t.cssVar}>
            <code>{t.cssVar}</code>
          </li>
        ))}
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a decisão de repontar esses {tokensTextoMarca.length} tokens
        de texto para <code>{corInterface.toUpperCase()}</code> depende do time — fonte: time.
        Enquanto ela não sai, <strong>não use esses tokens em texto pequeno</strong>: aplique{' '}
        <code>--ds-semantic-text-style-content-color-typography-primary</code> ou a cor de interface.
        Registrado em <code>LACUNAS.md</code>.
      </p>
      <h3 id="cor-nao-basta">Cor nunca é o único sinal</h3>
      <p>
        Muita gente não distingue vermelho de verde, e ninguém enxerga cor direito num celular sob
        sol. Todo estado — erro, sucesso, alerta, selecionado, obrigatório, desabilitado — precisa
        de um segundo portador: ícone, texto, mudança de forma ou posição. Vermelho sozinho não diz
        &quot;erro&quot;.
      </p>

      <h2 id="foco-visivel">Foco visível</h2>
      <p>
        Quem navega por teclado precisa enxergar, o tempo todo, onde está. Remover o contorno de
        foco (<code>outline: none</code> sem substituto) é a falha de acessibilidade mais comum e
        mais grave em interface web — e é sempre intencional, porque exige escrever a linha que a
        remove.
      </p>
      <p>O sistema publica um anel de foco canônico, em quatro tokens:</p>
      <Tabela
        cabecalho={['Token', 'Valor', 'Função']}
        legenda="Tokens do anel de foco canônico"
        linhas={[
          [
            <code key="1">--ds-component-focus-ring-color-ring</code>,
            <code key="1v">{corAnel}</code>,
            'Cor do anel',
          ],
          [
            <code key="2">--ds-component-focus-ring-effect-width</code>,
            <code key="2v">{larguraAnel}</code>,
            'Espessura',
          ],
          [
            <code key="3">--ds-component-focus-ring-effect-offset</code>,
            <code key="3v">{deslocamentoAnel}</code>,
            'Distância entre o elemento e o anel',
          ],
          [
            <code key="4">--ds-component-focus-ring-border-radius</code>,
            <code key="4v">{raioAnel}</code>,
            'Raio do anel',
          ],
        ]}
      />
      <p>
        O deslocamento de {deslocamentoAnel} não é detalhe estético. O azul{' '}
        <code>{corAnel}</code> mede{' '}
        {contrasteAnelBranco ? formatarRazao(contrasteAnelBranco) : '—'} sobre branco — folgado para
        o critério de 3:1 de elementos gráficos — mas apenas{' '}
        {contrasteAnelBotao ? formatarRazao(contrasteAnelBotao) : '—'} contra{' '}
        <code>{fundoPrimario}</code>, a superfície do botão primário. Desenhado colado no botão, o
        anel some. O deslocamento joga o anel para o fundo da página, onde ele é visível.
      </p>

      <h3 id="inventario-foco">O que os componentes realmente usam</h3>
      <p>
        Levantamento feito sobre as custom properties de foco declaradas no CSS dos componentes
        publicados. São <strong>{origensOrdenadas.length} origens de cor diferentes</strong> para o
        mesmo elemento de interface:
      </p>
      <Tabela
        cabecalho={['Origem declarada no CSS', 'Valor resolvido', 'Componentes']}
        legenda="Inventário das origens de cor de anel de foco por componente"
        linhas={origensOrdenadas.map(([expressao, nomes]) => [
          <code key={`e-${expressao}`}>{expressao}</code>,
          <code key={`v-${expressao}`}>{resolverOrigem(expressao)}</code>,
          `${nomes.length} — ${nomes.join(', ')}`,
        ])}
      />
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">A cor de foco está escrita à mão em dois componentes</p>
        <p>
          <code>#3366e5</code> aparece cravado no CSS de dois componentes, em vez de vir do token
          canônico <code>--ds-component-focus-ring-color-ring</code> (<code>{corAnel}</code>). Não é
          um problema de contraste — é um problema de manutenção: mudar o token não muda esses dois.
          Isso é defeito a corrigir na origem, não variação permitida.
        </p>
      </div>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não há decisão sobre unificar as{' '}
        {origensOrdenadas.length} origens de cor de foco em uma só. O sistema publica um token
        canônico e ele é ignorado por parte do catálogo — fonte: time / repo. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
      <h3 id="foco-codigo">Como aplicar</h3>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`.meu-controle:focus-visible {
  outline: var(--ds-component-focus-ring-effect-width) solid
    var(--ds-component-focus-ring-color-ring);
  outline-offset: var(--ds-component-focus-ring-effect-offset);
  border-radius: var(--ds-component-focus-ring-border-radius);
}

/* nunca faça isto sem colocar outro indicador no lugar */
.meu-controle:focus { outline: none; }`}</code>
      </pre>
      <p>
        Use <code>:focus-visible</code>, não <code>:focus</code>. Assim o anel aparece para quem
        chega pelo teclado e não pisca a cada clique de mouse.
      </p>

      <h2 id="teclado">Navegação por teclado</h2>
      <p>
        Tudo o que funciona com mouse tem que funcionar com teclado — e na mesma ordem em que a
        pessoa lê a tela. {percentualTeclado}% dos componentes têm o comportamento de teclado
        documentado no catálogo; os demais não expõem interação própria ou não foram documentados.
      </p>
      <Tabela
        cabecalho={['Tecla', 'Comportamento esperado']}
        legenda="Convenções de teclado adotadas pelo sistema"
        linhas={[
          ['Tab / Shift+Tab', 'Avança e volta entre os controles, na ordem do DOM.'],
          ['Enter', 'Aciona link e botão. Em campo de formulário simples, envia o formulário.'],
          ['Espaço', 'Aciona botão, marca checkbox, alterna switch. Não usa para link.'],
          ['Setas', 'Move dentro de um grupo: abas, radio, opções de menu, slides do carrossel.'],
          ['Home / End', 'Primeiro e último item do grupo.'],
          ['Esc', 'Fecha modal, menu, calendário e tooltip, devolvendo o foco a quem abriu.'],
        ]}
      />
      <ul>
        <li>
          <strong>Ordem do DOM é a ordem do foco.</strong> Não reordene com CSS (
          <code>order</code>, <code>flex-direction: row-reverse</code>) sem verificar o que
          acontece com o Tab.
        </li>
        <li>
          <strong>Nada de <code>tabindex</code> positivo.</strong> Use <code>0</code> para incluir e{' '}
          <code>-1</code> para tirar da ordem e permitir foco programático. Valores acima de zero
          bagunçam a ordem da página inteira.
        </li>
        <li>
          <strong>Modal prende o foco</strong> enquanto está aberto e o devolve ao gatilho ao
          fechar. O que está atrás não é alcançável por Tab.
        </li>
        <li>
          <strong>Link de pular para o conteúdo</strong> no topo de toda página, visível quando
          recebe foco. Esta Wiki usa <code>.wiki-skip-link</code>.
        </li>
        <li>
          <strong>Alvo de toque de 44×44px</strong> em interface de celular, ou espaçamento
          equivalente entre alvos menores.
        </li>
      </ul>

      <h2 id="semantica">Semântica e ARIA</h2>
      <p>
        A primeira regra do ARIA é não usar ARIA. Um <code>&lt;button&gt;</code> nativo já é
        focável, já responde a Enter e Espaço, já é anunciado como botão e já entra na lista de
        elementos do leitor de tela. Um <code>&lt;div role=&quot;button&quot;&gt;</code> precisa que
        você reimplemente tudo isso — e você vai esquecer alguma coisa.
      </p>
      <Tabela
        cabecalho={['Em vez de', 'Use']}
        legenda="Equivalências entre marcação improvisada e HTML semântico"
        linhas={[
          [
            <code key="a1">&lt;div onClick&gt;</code>,
            <code key="b1">&lt;button type=&quot;button&quot;&gt;</code>,
          ],
          [
            <code key="a2">&lt;span&gt; com estilo de link</code>,
            <code key="b2">&lt;a href&gt;</code>,
          ],
          [
            <code key="a3">&lt;div&gt; com texto grande</code>,
            <code key="b3">&lt;h1&gt;…&lt;h6&gt;, na ordem</code>,
          ],
          [
            <code key="a4">&lt;div&gt; repetido</code>,
            <code key="b4">&lt;ul&gt; / &lt;li&gt;</code>,
          ],
          [
            <code key="a5">placeholder como rótulo</code>,
            <code key="b5">&lt;label for&gt; visível</code>,
          ],
          [
            <code key="a6">&lt;div&gt; de seção</code>,
            <code key="b6">
              &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;aside&gt;, &lt;footer&gt;
            </code>,
          ],
        ]}
      />
      <p>
        Quando o HTML não dá conta — um menu suspenso, um combobox, uma janela modal — aí sim entra
        ARIA, e completo: papel, estado e relação juntos. <code>aria-expanded</code> sem{' '}
        <code>aria-controls</code> deixa o leitor de tela anunciar &quot;expandido&quot; sem dizer o
        que expandiu.
      </p>
      <ul>
        <li>
          <strong>Rótulo programático em todo campo.</strong> <code>&lt;label for&gt;</code> é o
          padrão; <code>aria-labelledby</code> quando o texto já existe na tela;{' '}
          <code>aria-label</code> só quando não há texto visível nenhum.
        </li>
        <li>
          <strong>Erro associado ao campo</strong> por <code>aria-describedby</code>, com{' '}
          <code>aria-invalid=&quot;true&quot;</code> no campo. Sem isso, quem usa leitor de tela
          ouve o erro solto, sem saber a qual campo pertence.
        </li>
        <li>
          <strong>Ícone decorativo recebe <code>aria-hidden=&quot;true&quot;</code>.</strong> Ícone
          que carrega informação recebe nome acessível.
        </li>
        <li>
          <strong>Um <code>&lt;h1&gt;</code> por página</strong> e nenhum salto de nível: não pule
          de h2 para h4.
        </li>
        <li>
          <strong><code>lang=&quot;pt-BR&quot;</code> no <code>&lt;html&gt;</code></strong>, para o
          leitor de tela usar a pronúncia certa.
        </li>
      </ul>

      <h2 id="leitores-de-tela">Leitores de tela</h2>
      <p>
        Texto invisível na tela não é texto inexistente. Três coisas resolvem a maior parte dos
        problemas:
      </p>
      <ul>
        <li>
          <strong>Texto de link diz o destino.</strong> &quot;Baixar o comprovante em PDF&quot; e
          não &quot;clique aqui&quot;. Muita gente navega pela lista de links da página, fora de
          contexto.
        </li>
        <li>
          <strong>Mudança sem recarga é anunciada.</strong> Resultado de busca, contador, erro de
          envio e confirmação precisam de região viva:{' '}
          <code>aria-live=&quot;polite&quot;</code> para informação e{' '}
          <code>role=&quot;alert&quot;</code> para o que interrompe.
        </li>
        <li>
          <strong>Conteúdo visualmente oculto continua no DOM.</strong> Use uma classe de
          ocultação visual (nesta Wiki, <code>.wiki-visualmente-oculto</code>). Nunca{' '}
          <code>display: none</code> nem <code>visibility: hidden</code>, que removem o conteúdo da
          árvore de acessibilidade.
        </li>
      </ul>

      <h2 id="movimento">Movimento reduzido</h2>
      <p>
        Animação pode causar enjoo, tontura e crise em pessoas com distúrbio vestibular ou
        fotossensibilidade. Quem configurou &quot;reduzir movimento&quot; no sistema operacional
        está pedindo explicitamente para não ver isso.
      </p>
      <p>
        {percentualMovimento}% dos componentes já declaram{' '}
        <code>@media (prefers-reduced-motion: reduce)</code> no próprio CSS. Faça o mesmo em toda
        animação que você escrever:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`@media (prefers-reduced-motion: reduce) {
  .meu-componente {
    transition: none;
    animation: none;
  }
}`}</code>
      </pre>
      <p>
        Rolagem suave por script também conta: use <code>behavior: &quot;auto&quot;</code> quando a
        preferência estiver ativa. Nada deve piscar mais de três vezes por segundo.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o sistema não tem nenhum token de easing e as{' '}
        {tokens.filter((t) => t.cssVar.includes('motion-duration')).length} durações de motion saem
        do Figma como número sem unidade, porque apontam para variáveis de spacing — fonte: defeito
        na origem dos tokens. Ver <a href="/fundamentos/motion">Motion</a>. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="checklist">Checklist antes de publicar uma tela</h2>
      <p>
        Passe por esta lista antes de subir qualquer tela. Ela leva poucos minutos e pega a maior
        parte do que ferramenta automática não vê.
      </p>

      <h3 id="checklist-teclado">1. Teclado, sem tocar no mouse</h3>
      <ul>
        <li>Percorra a tela inteira com Tab. Chegou em todos os controles?</li>
        <li>Dá para ver, o tempo todo, onde o foco está?</li>
        <li>A ordem do Tab acompanha a leitura visual?</li>
        <li>Abriu um modal ou menu: o foco entrou, ficou preso, e Esc devolveu ao gatilho?</li>
        <li>Nenhum ponto onde o foco entra e não sai (armadilha de foco fora de modal)?</li>
        <li>O link de pular para o conteúdo aparece no primeiro Tab?</li>
      </ul>

      <h3 id="checklist-estrutura">2. Estrutura</h3>
      <ul>
        <li>Existe um <code>&lt;h1&gt;</code>, e ele descreve a página?</li>
        <li>Os títulos descem em ordem, sem pular nível?</li>
        <li>Existe <code>&lt;main&gt;</code>, e a navegação está em <code>&lt;nav&gt;</code>?</li>
        <li>O <code>&lt;title&gt;</code> da página identifica a tela e o serviço?</li>
        <li>Cada link diz para onde vai, lido fora de contexto?</li>
      </ul>

      <h3 id="checklist-formularios">3. Formulários</h3>
      <ul>
        <li>Todo campo tem rótulo visível, associado programaticamente?</li>
        <li>Campo obrigatório é indicado por texto, não só por asterisco vermelho?</li>
        <li>A mensagem de erro diz o que fazer, e está ligada ao campo?</li>
        <li>O erro é anunciado por leitor de tela ao acontecer?</li>
        <li>O foco vai para o primeiro campo com erro depois de um envio inválido?</li>
      </ul>

      <h3 id="checklist-visual">4. Visual</h3>
      <ul>
        <li>Todo texto atinge 4,5:1 — ou 3:1 se for texto grande?</li>
        <li>Borda de campo, ícone informativo e indicador de estado atingem 3:1?</li>
        <li>Nenhum estado é comunicado só por cor?</li>
        <li>Com zoom de 200% o conteúdo continua legível, sem rolagem horizontal?</li>
        <li>A tela funciona em 320px de largura?</li>
        <li>Nada anima quando &quot;reduzir movimento&quot; está ativo?</li>
      </ul>

      <h3 id="checklist-conteudo">5. Conteúdo e mídia</h3>
      <ul>
        <li>Toda imagem informativa tem <code>alt</code> que descreve a informação?</li>
        <li>Imagem decorativa tem <code>alt=&quot;&quot;</code>?</li>
        <li>Vídeo tem legenda; áudio tem transcrição?</li>
        <li>Nenhum limite de tempo sem aviso e sem opção de estender?</li>
      </ul>

      <h2 id="como-testar">Como testar</h2>
      <p>
        O repositório do Design System já usa <code>@storybook/addon-a11y</code> no Storybook e{' '}
        <code>vitest-axe</code> com <code>axe-core</code> na suíte de testes. Use os dois — e some o
        teste manual, que é o que encontra as falhas reais:
      </p>
      <ul>
        <li>
          <strong>Navegue só com o teclado.</strong> Cinco minutos por tela. É o teste com melhor
          relação custo-benefício que existe.
        </li>
        <li>
          <strong>Ligue um leitor de tela.</strong> NVDA no Windows, VoiceOver no macOS e no iOS,
          TalkBack no Android. Percorra a tela e ouça o que é anunciado.
        </li>
        <li>
          <strong>Dê zoom de 200% e reduza a janela para 320px.</strong> É o que acontece na vida
          real, num celular com fonte aumentada.
        </li>
        <li>
          <strong>Rode o axe</strong> no Storybook ou pela extensão de navegador, e trate os
          achados como piso, não como aprovação.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe procedimento de auditoria manual documentado, nem
        pessoa ou equipe responsável por revisar acessibilidade antes de uma publicação, nem canal
        para quem usa o serviço relatar barreira de acesso — fonte: time. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="por-componente">Acessibilidade componente a componente</h2>
      <p>
        Cada página de componente traz o que foi extraído do código: papéis, atributos ARIA,
        interações de teclado, notas de implementação e o arquivo de teste axe, quando existe. Vá em{' '}
        <a href="/componentes/visao-geral">Componentes</a> e abra a aba de acessibilidade do
        componente que você está usando — é lá que está o comportamento real, não o pretendido.
      </p>
    </div>
  );
}
