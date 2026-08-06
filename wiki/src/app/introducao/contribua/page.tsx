import type { Metadata } from 'next';
import Link from 'next/link';

import { Tabela } from '@/components/Blocos';
import { Trilha } from '@/components/Trilha';
import { listarComponentes, listarParesFigma } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Contribua',
  description:
    'Como propor um componente novo, abrir uma issue, sugerir mudança em componente existente, o que entregar junto e como funciona a revisão no Sampa Design System.',
};

const REPO = 'https://github.com/victorupspace/sggdds';

export default function PaginaContribua() {
  const componentes = listarComponentes();
  const paresFigma = listarParesFigma();

  const comAxe = componentes.filter((c) => c.tests.a11yFile !== null);
  const percentualAxe = Math.round((comAxe.length / componentes.length) * 100);
  const casosUnitarios = componentes.reduce((soma, c) => soma + (c.tests.unitCount ?? 0), 0);
  const stories = componentes.reduce((soma, c) => soma + c.stories.length, 0);

  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Introdução', href: '/introducao/sobre' }, { titulo: 'Contribua' }]} />

      <h1>Contribua</h1>
      <p className="wiki-prosa__resumo">
        O repositório do Sampa Design System é <strong>público e tem licença MIT</strong>. Qualquer
        pessoa do Estado ou fornecedora contratada pode relatar um defeito, propor uma mudança ou
        trazer um componente novo. Esta página descreve o caminho de cada tipo de contribuição, o
        que precisa ir junto e o que a automação verifica.
      </p>

      <div className="wiki-cartoes">
        <a className="wiki-cartao" href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
          <span className="wiki-cartao__titulo">Abrir uma issue ↗</span>
          <span className="wiki-cartao__descricao">
            Defeito, divergência entre Figma e código, erro de documentação ou proposta.
          </span>
        </a>
        <a className="wiki-cartao" href={REPO} rel="noreferrer noopener" target="_blank">
          <span className="wiki-cartao__titulo">Repositório ↗</span>
          <span className="wiki-cartao__descricao">
            Código dos componentes, tokens, workflows de CI e release.
          </span>
        </a>
        <a
          className="wiki-cartao"
          href="https://sggdds.vercel.app"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Storybook ↗</span>
          <span className="wiki-cartao__descricao">
            {stories} stories da branch principal. Toda story tem URL própria para citar em issue.
          </span>
        </a>
      </div>

      <h2 id="antes-de-comecar">Antes de propor qualquer coisa</h2>
      <p>
        A maior parte das propostas de componente novo é, na verdade, um componente existente que a
        pessoa não encontrou. Três verificações rápidas evitam trabalho jogado fora:
      </p>
      <ol>
        <li>
          <strong>Procure no catálogo.</strong> Os componentes publicados estão em{' '}
          <Link href="/componentes/visao-geral">Componentes</Link>. Busque pelo problema
          (&quot;escolher uma data&quot;), não pelo nome que você imaginou.
        </li>
        <li>
          <strong>Procure nos padrões.</strong> Boa parte do que parece componente é composição:
          formulário, filtro, tabela de dados e estado vazio já têm receita em{' '}
          <Link href="/padroes/visao-geral">Padrões</Link>.
        </li>
        <li>
          <strong>Procure nas issues abertas.</strong> Alguém pode já ter proposto o mesmo. Somar-se
          a uma discussão existente pesa mais do que abrir a segunda issue sobre o mesmo assunto.
        </li>
      </ol>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Traga o problema, não a solução pronta</p>
        <p>
          &quot;Preciso de um acordeão com ícone à direita&quot; é uma solução. &quot;Preciso mostrar
          doze perguntas frequentes sem estourar a página no celular&quot; é um problema — e talvez
          se resolva com um componente que já existe. Proposta que começa pela solução costuma virar
          variação desnecessária; proposta que começa pelo problema costuma virar sistema.
        </p>
      </div>

      <h2 id="tipos">Que tipo de contribuição é a sua</h2>
      <Tabela
        cabecalho={['Situação', 'Caminho', 'O que sai disso']}
        legenda="Encaminhamento por tipo de contribuição"
        linhas={[
          [
            'O componente tem um defeito',
            <a key="c1" href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
              Issue ↗
            </a>,
            'Correção em versão de CORREÇÃO.',
          ],
          [
            'Falta um recurso em um componente existente',
            <span key="c2">
              <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
                Issue ↗
              </a>{' '}
              e depois pull request
            </span>,
            'Recurso novo em versão MENOR, se for compatível.',
          ],
          [
            'Falta um componente inteiro',
            <a key="c3" href="#propor-componente">
              Proposta de componente
            </a>,
            'Componente novo em versão MENOR, depois de aceito.',
          ],
          [
            'O Figma e o código não batem',
            <a key="c4" href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
              Issue ↗
            </a>,
            'Decisão sobre qual dos dois está certo, e correção do outro.',
          ],
          [
            'Erro nesta documentação',
            <a key="c5" href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
              Issue ↗
            </a>,
            'Correção do texto, sem release de pacote.',
          ],
          [
            'Barreira de acessibilidade',
            <span key="c6">
              <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
                Issue ↗
              </a>{' '}
              — diga que é acessibilidade no título
            </span>,
            'Correção prioritária: barreira de acesso não espera ciclo de release.',
          ],
        ]}
      />
      <p>
        Barreira de acessibilidade em serviço público impede acesso a um direito. Ao relatar, informe
        a tecnologia assistiva usada e o passo exato em que a barreira aparece — ver{' '}
        <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>.
      </p>

      <h2 id="issue">Como abrir uma issue</h2>
      <p>
        Toda contribuição começa por uma issue em{' '}
        <a href={`${REPO}/issues`} rel="noreferrer noopener" target="_blank">
          {REPO}/issues ↗
        </a>
        . Ela existe para que a discussão aconteça <em>antes</em> do código, e não em cima de um pull
        request que já custou dois dias de trabalho.
      </p>
      <p>
        Não há formulário guiado no repositório: a issue é um texto livre. Use esta estrutura, que
        cobre o que a triagem precisa saber:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`Título: [defeito|proposta|documentação] Componente — resumo em uma linha

Contexto
  Qual serviço, qual tela, quantas pessoas são afetadas.

O que acontece
  O comportamento observado. Se for defeito, o link da story do
  Storybook que reproduz e o navegador usado.

O que deveria acontecer
  O comportamento esperado, e por que você espera isso.

Impacto
  É bloqueante? Existe contorno? É barreira de acessibilidade?

Referências
  node-id do Figma, arquivo do código, URL da página da Wiki.`}</code>
      </pre>
      <p>
        O item que mais economiza tempo é o <strong>link que reproduz</strong>. Todas as {stories}{' '}
        stories do Storybook têm URL própria: abra o exemplo isolado e cole o endereço.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o repositório não tem modelos de issue nem de pull request (a
        pasta <code>.github/</code> contém apenas <code>workflows/</code>), não há{' '}
        <code>CONTRIBUTING.md</code> e não há rito de triagem com responsável e prazo — fonte: time
        / repo. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="propor-componente">Como propor um componente novo</h2>
      <p>
        Componente novo é o tipo de contribuição mais cara: entra no catálogo, precisa ser mantido,
        testado, documentado e versionado para sempre. Por isso a proposta responde primeiro a seis
        perguntas — e só depois vira desenho.
      </p>
      <ol>
        <li>
          <strong>Qual problema ele resolve?</strong> Descrito do ponto de vista de quem usa o
          serviço, não da interface.
        </li>
        <li>
          <strong>Onde isso já aparece?</strong> Cite telas reais. Se o mesmo problema apareceu em
          mais de um serviço, isso é o argumento mais forte que existe: sistema serve para o que se
          repete.
        </li>
        <li>
          <strong>Por que o catálogo atual não resolve?</strong> Diga qual componente chegou perto e
          onde ele falha. Se a resposta for &quot;funcionaria com um ajuste&quot;, a proposta certa é
          melhorar o existente.
        </li>
        <li>
          <strong>Qual é o comportamento?</strong> Estados, variações, o que acontece com teclado, o
          que é anunciado por leitor de tela, como se comporta em 320px de largura.
        </li>
        <li>
          <strong>Como ele se chama?</strong> Nome que descreve a função, não a aparência.
        </li>
        <li>
          <strong>O que ele não é?</strong> A fronteira com componentes vizinhos. Sem essa fronteira,
          dois componentes começam a se sobrepor na versão seguinte.
        </li>
      </ol>
      <p>
        Antes de propor um item novo, olhe as lacunas que já estão mapeadas — fechá-las costuma ter
        retorno maior do que abrir uma frente nova. A biblioteca do Figma tem 58 componentes
        publicados; o cruzamento com o código rendeu {paresFigma.length} pares. Sobram duas listas
        curtas:
      </p>
      <ul>
        <li>
          <strong>Desenhado e não implementado:</strong> um componente de catálogo, o{' '}
          <em>Star Rating</em>. Os outros 22 itens do Figma sem par no código são partes internas de
          componentes existentes, não candidatos a página própria.
        </li>
        <li>
          <strong>Implementado e sem par no Figma:</strong> cinco componentes —{' '}
          <Link href="/componentes/back-to-top">BackToTop</Link>,{' '}
          <Link href="/componentes/list-item">ListItem</Link>,{' '}
          <Link href="/componentes/meganav">MegaNav</Link>,{' '}
          <Link href="/componentes/skeleton">Skeleton</Link> e{' '}
          <Link href="/componentes/tabs">Tabs</Link>. Falta o desenho na biblioteca, não o código.
        </li>
      </ul>
      <p>
        Se a sua necessidade cai em uma dessas duas listas, a contribuição não é propor um componente
        novo: é completar a metade que falta.
      </p>

      <h2 id="mudar-existente">Como propor mudança em componente existente</h2>
      <p>
        A primeira pergunta é sempre a mesma: <strong>isso quebra alguém?</strong> A resposta define
        o caminho inteiro.
      </p>
      <Tabela
        cabecalho={['Tipo de mudança', 'Exemplo', 'Efeito na versão', 'O que a proposta precisa incluir']}
        legenda="Classificação de mudanças em componentes existentes"
        linhas={[
          [
            <strong key="m1">Compatível</strong>,
            'Acrescentar um valor a uma prop existente, ou uma prop opcional nova.',
            'MENOR',
            'Justificativa de por que o valor atual não atende.',
          ],
          [
            <strong key="m2">Correção</strong>,
            'Ajustar foco, contraste, comportamento de teclado ou um token apontado errado.',
            'CORREÇÃO',
            'O caso que reproduz o defeito, virando teste.',
          ],
          [
            <strong key="m3">Quebra</strong>,
            'Renomear ou remover prop, mudar o valor padrão, alterar a estrutura do HTML gerado.',
            'MAIOR',
            'Guia de migração com antes e depois em código, e quem já usa a versão antiga.',
          ],
          [
            <strong key="m4">Visual ampla</strong>,
            'Mudar altura, raio, espaçamento interno ou cor de estado.',
            'MAIOR',
            'Captura de antes e depois, e o efeito em telas já publicadas.',
          ],
        ]}
      />
      <p>
        Mudança visual merece atenção especial porque não quebra nenhuma chamada de função e ainda
        assim reposiciona elementos em produção. Ver{' '}
        <Link href="/introducao/governanca">Governança</Link>.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Não resolva por fora</p>
        <p>
          Sobrescrever o CSS de um componente dentro do seu produto parece o caminho rápido, mas ele
          se apoia em nomes de classe internos que podem mudar em qualquer versão — e a correção some
          na próxima atualização, silenciosamente. Se o componente não atende, isso é informação que
          o sistema precisa receber. Abra a issue.
        </p>
      </div>

      <h2 id="entregaveis">O que precisa ir junto</h2>
      <p>
        Uma contribuição aceita entrega quatro coisas ao mesmo tempo: design, código, prova e texto.
        Faltando qualquer uma, o item entra no catálogo como dívida.
      </p>

      <h3 id="entregavel-design">1. Design no Figma</h3>
      <ul>
        <li>
          Componente montado na biblioteca <strong>Web Components</strong>, com as variações como
          propriedades — não como cópias soltas.
        </li>
        <li>
          Toda cor, medida, raio e tipografia aplicada por <strong>variable</strong>, nunca digitada.
          Se a variable que você precisa não existe, isso é uma decisão de sistema que falta — ver{' '}
          <Link href="/fundamentos/tokens">Design tokens</Link>.
        </li>
        <li>Estados desenhados: padrão, foco, hover, pressionado, desabilitado, erro e carregando.</li>
        <li>
          Comportamento responsivo declarado, e o <code>node-id</code> anotado na issue para que a
          revisão consiga abrir exatamente o que você desenhou.
        </li>
      </ul>

      <h3 id="entregavel-codigo">2. Código</h3>
      <p>
        O repositório segue uma estrutura fixa por componente. Um componente novo entra em{' '}
        <code>packages/react/src/components/&lt;Nome&gt;/</code> com estes arquivos:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`packages/react/src/components/Button/
├── Button.tsx            componente
├── Button.types.ts       props e tipos exportados
├── Button.styles.css     estilo, consumindo apenas variáveis --ds-*
├── Button.stories.tsx    stories do Storybook
├── Button.stories.css    estilo de apoio das stories, quando necessário
├── Button.test.tsx       teste unitário e de comportamento
├── Button.a11y.test.tsx  teste de acessibilidade com axe
└── index.ts              exportação pública`}</code>
      </pre>
      <ul>
        <li>
          <strong>Zero valor cravado no CSS.</strong> Todo valor vem de <code>var(--ds-*)</code>.
          Valor escrito à mão não acompanha mudança de tema e vira defeito de manutenção.
        </li>
        <li>
          <strong>HTML semântico antes de ARIA.</strong> <code>&lt;button&gt;</code> em vez de{' '}
          <code>&lt;div onClick&gt;</code>. ARIA só quando o HTML não dá conta, e completo: papel,
          estado e relação.
        </li>
        <li>
          <strong>Foco visível</strong> pelo anel canônico, com <code>:focus-visible</code>.
        </li>
        <li>
          <strong>Movimento respeitando <code>prefers-reduced-motion</code></strong> em qualquer
          animação.
        </li>
        <li>
          <strong>Tipos exportados</strong> junto com o componente, como em{' '}
          <code>ButtonProps</code>, <code>ButtonVariant</code>, <code>ButtonSize</code>.
        </li>
      </ul>

      <h3 id="entregavel-testes">3. Testes</h3>
      <p>
        A régua de hoje: <strong>todos os componentes</strong> têm arquivo de teste unitário,
        somando {casosUnitarios} casos; <strong>{percentualAxe}% deles</strong> têm arquivo de teste
        de acessibilidade. Contribuição nova entrega os dois — a segunda métrica só melhora se cada
        entrada nova já vier com o arquivo.
      </p>
      <ul>
        <li>
          <strong>Unitário</strong> (<code>*.test.tsx</code>): renderização de cada variação, cada
          estado, cada callback disparado, e o caso de borda que motivou a mudança.
        </li>
        <li>
          <strong>Acessibilidade</strong> (<code>*.a11y.test.tsx</code>): <code>vitest-axe</code> com{' '}
          <code>axe-core</code>, cobrindo o componente em cada estado relevante — inclusive
          desabilitado, com erro e aberto.
        </li>
        <li>
          <strong>Stories</strong> (<code>*.stories.tsx</code>): uma por variação, com nomes que
          descrevem a situação. A story é ao mesmo tempo exemplo, prova visual e endereço citável em
          issue.
        </li>
      </ul>
      <p>
        E o alerta que vale sempre: axe não certifica nada. Ele pega contraste, rótulo ausente e ARIA
        inválido. Ordem de leitura, foco perdido depois de uma ação e mensagem de erro não anunciada
        só aparecem no teste manual — percorra a tela só com o teclado antes de abrir o pull request.
      </p>

      <h3 id="entregavel-documentacao">4. Documentação</h3>
      <ul>
        <li>Quando usar e quando não usar, com a alternativa nomeada no segundo caso.</li>
        <li>Anatomia das partes e o que cada uma faz.</li>
        <li>Comportamento de teclado e o que o leitor de tela anuncia.</li>
        <li>
          Orientação de escrita: o que escrever dentro do componente. Ver{' '}
          <Link href="/conteudo/writing">Padrões de escrita</Link>.
        </li>
        <li>Erros comuns — o que as pessoas erram ao usar, e a correção.</li>
      </ul>

      <h3 id="entregavel-changeset">5. Changeset</h3>
      <p>
        Toda mudança que afeta quem consome precisa de um changeset. É ele que vira, mais tarde, a
        linha do changelog e o número da versão:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`pnpm changeset
# escolha o pacote (@government/design-system ou @government/tokens)
# escolha o tipo: major (quebra) | minor (recurso novo) | patch (correção)
# escreva o texto e faça commit do arquivo gerado em .changeset/`}</code>
      </pre>
      <p>
        O texto é lido por quem consome, não por quem programa. Descreva o efeito, não o commit:
        &quot;Corrige o anel de foco do Button, invisível sobre o fundo do botão primário&quot; em vez
        de &quot;fix css&quot;.
      </p>

      <h2 id="fluxo">O fluxo do pull request</h2>
      <ol>
        <li>
          <strong>Issue primeiro.</strong> Alinhe o problema antes de escrever código.
        </li>
        <li>
          <strong>Branch a partir da <code>main</code>.</strong> Uma mudança por branch: pull request
          que faz três coisas ao mesmo tempo não é revisável.
        </li>
        <li>
          <strong>Rode a verificação localmente</strong> antes de subir. É o mesmo conjunto que o CI
          executa, e é mais rápido descobrir no seu terminal.
        </li>
        <li>
          <strong>Abra o pull request</strong> referenciando a issue, com captura de tela ou vídeo
          curto quando houver efeito visual.
        </li>
        <li>
          <strong>Responda à revisão.</strong> Comentário de revisão é sobre o código, não sobre
          quem escreveu.
        </li>
      </ol>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`corepack pnpm install --frozen-lockfile

pnpm lint         # ESLint em todo o repositório
pnpm typecheck    # tsc --noEmit em cada pacote
pnpm test         # Vitest: unitários e axe
pnpm build        # tokens + biblioteca

pnpm storybook    # sobe o Storybook local em :6006 para conferir o visual`}</code>
      </pre>
      <p>
        O ambiente é fixado pelo repositório: Node na versão declarada em <code>.nvmrc</code> e pnpm
        como gerenciador (<code>corepack</code> resolve a versão certa sozinho).
      </p>

      <h2 id="ci">O que a automação verifica</h2>
      <p>
        Todo pull request para a <code>main</code> dispara{' '}
        <code>.github/workflows/ci.yml</code>, que roda quatro jobs em paralelo. Todos precisam
        passar:
      </p>
      <Tabela
        cabecalho={['Job', 'Comando', 'O que reprova']}
        legenda="Jobs do workflow de integração contínua"
        linhas={[
          [
            <strong key="j1">Lint</strong>,
            <code key="jc1">pnpm lint</code>,
            'Violação das regras de ESLint do repositório.',
          ],
          [
            <strong key="j2">Typecheck</strong>,
            <code key="jc2">pnpm typecheck</code>,
            'Qualquer erro de tipo em qualquer pacote.',
          ],
          [
            <strong key="j3">Test</strong>,
            <code key="jc3">pnpm test</code>,
            'Teste unitário ou de acessibilidade falhando.',
          ],
          [
            <strong key="j4">Build</strong>,
            <code key="jc4">pnpm build</code>,
            'Falha ao construir tokens ou biblioteca. Em caso de falha, o CI publica o diretório dist como artefato para diagnóstico.',
          ],
        ]}
      />
      <p>
        Depois do merge, <code>.github/workflows/release.yml</code> roda a cada push na{' '}
        <code>main</code>. Ele reúne os changesets acumulados e abre automaticamente um pull request
        de release — desde que o secret <code>NPM_TOKEN</code> esteja configurado; caso contrário
        registra um aviso e encerra sem publicar. Como nenhum changeset foi criado até hoje, esse
        caminho ainda não rodou de verdade. Ver{' '}
        <Link href="/introducao/governanca">Governança</Link>.
      </p>

      <h2 id="revisao">Como funciona a revisão</h2>
      <p>
        A automação verifica o que é mecânico. A revisão humana verifica o que importa, e é a parte
        que ainda não tem regra escrita. O que uma revisão deveria olhar, em ordem:
      </p>
      <Tabela
        cabecalho={['Olhar', 'Pergunta central']}
        legenda="Critérios propostos de revisão"
        linhas={[
          [
            <strong key="r1">Sistema</strong>,
            'Isto pertence ao design system, ou é uma necessidade de um produto só? Já existe algo que resolve?',
          ],
          [
            <strong key="r2">Design</strong>,
            'Bate com o Figma? Usa variables, ou tem valor digitado à mão? Os estados estão todos cobertos?',
          ],
          [
            <strong key="r3">Acessibilidade</strong>,
            'Funciona só com teclado? O foco está visível? O leitor de tela anuncia papel, estado e rótulo? O contraste passa?',
          ],
          [
            <strong key="r4">API</strong>,
            'Os nomes de prop seguem o resto do catálogo? Alguma coisa aqui vai quebrar quem já usa?',
          ],
          [
            <strong key="r5">Prova</strong>,
            'Os testes cobrem o comportamento novo, ou só a renderização feliz? O caso do defeito virou teste?',
          ],
          [
            <strong key="r6">Texto</strong>,
            'A documentação diz quando NÃO usar? Uma pessoa de fora consegue adotar sem perguntar nada?',
          ],
        ]}
      />
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não está definido quem aprova um pull request. Não há{' '}
        <code>CODEOWNERS</code>, não há regra de proteção de branch documentada, não há número mínimo
        de aprovações e não há revisão obrigatória de design ou de acessibilidade antes do merge —
        fonte: time. Hoje a única barreira efetiva é o CI, que verifica lint, tipo, teste e build, e
        nada mais — fonte: repo. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="sem-codigo">Contribuir sem escrever código</h2>
      <p>São as contribuições mais subestimadas, e o sistema precisa das três:</p>
      <ul>
        <li>
          <strong>Relatar uso real.</strong> Contar que um componente não serviu em uma tela
          específica vale mais que uma opinião sobre como ele deveria ser.
        </li>
        <li>
          <strong>Corrigir a documentação.</strong> Se você precisou perguntar algo a alguém, a
          documentação falhou naquele ponto. Abra uma issue dizendo exatamente isso.
        </li>
        <li>
          <strong>Testar acessibilidade em cenário real.</strong> Teclado, leitor de tela, zoom de
          200%, tela de 320px. Cada barreira encontrada aqui é um direito destravado.
        </li>
      </ul>

      <h2 id="proximos">Depois de contribuir</h2>
      <div className="wiki-cartoes">
        <Link className="wiki-cartao" href="/introducao/governanca">
          <span className="wiki-cartao__titulo">Governança</span>
          <span className="wiki-cartao__descricao">
            Papéis, versionamento, depreciação e o que ainda depende de decisão.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/recursos/changelog">
          <span className="wiki-cartao__titulo">Changelog</span>
          <span className="wiki-cartao__descricao">
            Onde a sua mudança aparece quando houver release.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/recursos/suporte">
          <span className="wiki-cartao__titulo">Suporte</span>
          <span className="wiki-cartao__descricao">
            Onde levar cada tipo de problema e o que incluir no pedido.
          </span>
        </Link>
      </div>
    </div>
  );
}
