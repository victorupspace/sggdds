import type { Metadata } from 'next';
import Link from 'next/link';

import { Tabela } from '@/components/Blocos';
import { Trilha } from '@/components/Trilha';
import { listarComponentes, listarParesFigma } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Fluxo de criação',
  description:
    'A trilha do design no Sampa Design System: entender o problema, verificar se a peça já existe, desenhar na biblioteca do Figma, prototipar, validar com pessoas, revisar acessibilidade e entregar para desenvolvimento.',
};

const ETAPAS: { numero: string; titulo: string; pergunta: string; saida: string; ancora: string }[] =
  [
    {
      numero: '1',
      titulo: 'Entender o problema',
      pergunta: 'Que dificuldade real a pessoa tem hoje?',
      saida: 'O problema escrito em uma frase, sem solução embutida.',
      ancora: 'problema',
    },
    {
      numero: '2',
      titulo: 'Verificar se já existe',
      pergunta: 'O sistema já resolve isso?',
      saida: 'A peça encontrada — ou a prova de que ela não existe.',
      ancora: 'ja-existe',
    },
    {
      numero: '3',
      titulo: 'Desenhar na biblioteca',
      pergunta: 'Como isso se monta com o que temos?',
      saida: 'Tela montada com instâncias e variables, sem valor solto.',
      ancora: 'figma',
    },
    {
      numero: '4',
      titulo: 'Prototipar',
      pergunta: 'Como isso se comporta ao longo do fluxo?',
      saida: 'Protótipo navegável com os estados de erro, vazio e carregamento.',
      ancora: 'prototipo',
    },
    {
      numero: '5',
      titulo: 'Validar com pessoas',
      pergunta: 'Alguém que não fez isto consegue concluir a tarefa?',
      saida: 'Registro do que travou, com as decisões revistas.',
      ancora: 'validacao',
    },
    {
      numero: '6',
      titulo: 'Revisar acessibilidade',
      pergunta: 'Quem não enxerga, não usa mouse ou não lê rápido consegue?',
      saida: 'Ordem de foco, contraste, rótulos e alternativas definidos no próprio arquivo.',
      ancora: 'acessibilidade',
    },
    {
      numero: '7',
      titulo: 'Entregar para desenvolvimento',
      pergunta: 'O que quem vai implementar precisa saber e não está no desenho?',
      saida: 'Handoff com node-id, variantes, estados, tokens, teclado e textos.',
      ancora: 'handoff',
    },
  ];

export default function PaginaFluxoDeCriacao() {
  const componentes = listarComponentes();
  const pares = listarParesFigma();
  const slugsComFigma = new Set(pares.map((p) => p.codeSlug).filter(Boolean));
  const semFigma = componentes.filter((c) => !slugsComFigma.has(c.slug));
  const comFigma = componentes.length - semFigma.length;

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Introdução', href: '/introducao/sobre' }, { titulo: 'Fluxo de criação' }]}
      />

      <h1>Fluxo de criação</h1>
      <p className="wiki-prosa__resumo">
        Esta é a trilha do design: do problema de quem usa o serviço até a peça aprovada e entregue
        para desenvolvimento. São sete etapas, e a mais importante é a segunda — verificar se a peça
        já existe. Um design system só funciona enquanto a resposta padrão for reutilizar, não
        desenhar de novo.
      </p>

      <h2 id="etapas">As sete etapas</h2>
      <Tabela
        cabecalho={['Etapa', 'Pergunta que ela responde', 'O que sai dela']}
        legenda="As sete etapas do fluxo de criação"
        linhas={ETAPAS.map((etapa) => [
          <a href={`#${etapa.ancora}`} key={etapa.ancora}>
            <strong>
              {etapa.numero}. {etapa.titulo}
            </strong>
          </a>,
          etapa.pergunta,
          etapa.saida,
        ])}
      />
      <p>
        As etapas são sequenciais na primeira vez e cíclicas depois. Voltar da etapa 5 para a 3 é
        parte do trabalho; pular da 1 direto para a 3 é o erro que produz componente duplicado.
      </p>

      <h2 id="problema">1. Entender o problema</h2>
      <p>
        Comece pela dificuldade concreta, não pela tela. &quot;Precisamos de um card com filtro no
        topo&quot; já é solução; &quot;a pessoa não encontra o protocolo dela entre 200 resultados&quot;
        é problema. A diferença define se o sistema pode responder com o que já tem.
      </p>
      <p>Escreva, antes de abrir o Figma:</p>
      <ul>
        <li>
          <strong>Quem é a pessoa</strong> e em que situação ela está — com pressa, no celular, pela
          primeira vez, com um prazo correndo.
        </li>
        <li>
          <strong>Qual tarefa ela precisa concluir</strong> e o que hoje impede.
        </li>
        <li>
          <strong>O que acontece se ela errar</strong> — perde o lugar na fila, refaz o cadastro,
          precisa ir presencialmente.
        </li>
        <li>
          <strong>Como você vai saber que resolveu.</strong> Sem isso, a etapa 5 não tem o que
          medir.
        </li>
      </ul>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Serviço público não tem concorrente</p>
        <p>
          Quem não consegue concluir a tarefa não vai para outro lugar: fica sem o direito, ou vai
          para a fila presencial. Isso muda o critério de sucesso. Não basta a tela ser agradável —
          ela precisa ser conclusiva para quem tem pouca familiaridade com interfaces, conexão ruim e
          nenhuma alternativa.
        </p>
      </div>

      <h2 id="ja-existe">2. Verificar se a peça já existe</h2>
      <p>
        Antes de desenhar qualquer coisa, procure. O sistema publica {componentes.length}{' '}
        componentes em código e 58 componentes na biblioteca do Figma — 36 de catálogo e 22 partes
        internas de componentes maiores. Boa parte do que parece novo é uma composição de peças que
        já estão lá.
      </p>
      <div className="wiki-cartoes">
        <Link className="wiki-cartao" href="/componentes/visao-geral">
          <span className="wiki-cartao__titulo">Catálogo de componentes</span>
          <span className="wiki-cartao__descricao">
            Os {componentes.length} componentes, com anatomia, estados, props e par no Figma.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/padroes/visao-geral">
          <span className="wiki-cartao__titulo">Padrões</span>
          <span className="wiki-cartao__descricao">
            Situações já resolvidas: formulário, busca, filtro, tabela, erro, estado vazio.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/fundamentos/visao-geral">
          <span className="wiki-cartao__titulo">Fundamentos</span>
          <span className="wiki-cartao__descricao">
            Cor, tipografia, espaçamento, grid, ícone e raio — antes de inventar um valor.
          </span>
        </Link>
      </div>
      <p>Procure em três níveis, nesta ordem:</p>
      <ol>
        <li>
          <strong>Padrão.</strong> A situação inteira já pode estar resolvida. Se o seu problema é
          &quot;pedir dados a alguém com pressa&quot;, comece por{' '}
          <Link href="/padroes/formularios">Formulários</Link>, não por um campo novo.
        </li>
        <li>
          <strong>Componente.</strong> Procure pela função, não pelo nome. &quot;Aviso de sistema
          fora do ar&quot; pode ser <Link href="/componentes/alert">Alert</Link>; &quot;confirmação
          que some sozinha&quot; é <Link href="/componentes/toast">Toast</Link>.
        </li>
        <li>
          <strong>Token.</strong> Se o que falta é uma medida, uma cor ou um raio, o valor
          provavelmente já existe entre os tokens publicados. Ver{' '}
          <Link href="/fundamentos/tokens">Design tokens</Link>.
        </li>
      </ol>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Figma e código não estão sincronizados</p>
        <p>
          Dos {componentes.length} componentes em código, <strong>{comFigma}</strong> têm par
          identificado na biblioteca do Figma e <strong>{semFigma.length}</strong> não têm nenhum:{' '}
          {semFigma.map((c) => c.name).join(', ')}. No sentido inverso, o componente de catálogo{' '}
          <strong>Star Rating</strong> está publicado no Figma e não existe em código. Antes de
          desenhar com uma peça, confirme na página do componente se ela existe dos dois lados — o
          que só existe no Figma não pode ser implementado sem trabalho novo.
        </p>
      </div>

      <h3 id="estender-ou-criar">Estender ou criar?</h3>
      <p>
        Esta é a decisão que mais impacta o custo de manutenção do sistema. A regra geral:{' '}
        <strong>estenda sempre que o papel do componente continuar o mesmo</strong>. Crie um
        componente novo só quando o papel muda.
      </p>
      <Tabela
        cabecalho={['O que muda no seu caso', 'O que fazer']}
        legenda="Decisão entre reutilizar, estender e criar"
        linhas={[
          [
            'Só o conteúdo: outro texto, outro ícone, outra quantidade de itens',
            'Use o componente como está. Isso não é extensão — é uso.',
          ],
          [
            'O tamanho, a densidade ou a cor de um estado',
            'Verifique as variantes existentes. Se não houver, proponha uma variante nova no componente existente.',
          ],
          [
            'A estrutura interna: uma parte a mais, um espaço para outro elemento',
            'Proponha uma extensão do componente existente — nova parte opcional, não componente paralelo.',
          ],
          [
            'A composição: várias peças que aparecem sempre juntas',
            'Isso é um padrão ou um template, não um componente. Documente a composição, não a empacote.',
          ],
          [
            'O papel semântico e o comportamento: outra função na tela, outra interação de teclado',
            'Aí sim é componente novo.',
          ],
        ]}
      />
      <p>Um componente novo se justifica quando as três condições valem ao mesmo tempo:</p>
      <ul>
        <li>
          <strong>Repetição real.</strong> O mesmo problema aparece em mais de um produto ou em mais
          de uma tela — não em uma tela única.
        </li>
        <li>
          <strong>Nenhum existente resolve</strong> sem sobrescrever o CSS interno ou lutar contra o
          componente.
        </li>
        <li>
          <strong>Tem papel próprio.</strong> Dá para descrever a função em uma frase, sem citar
          outro componente.
        </li>
      </ul>
      <p>
        Se faltar uma dessas condições, você provavelmente está diante de uma variante, de uma
        composição ou de uma solução local. Peça nova no sistema é decisão permanente: alguém vai
        mantê-la, testá-la e documentá-la por anos, muito depois de a tela que a originou sair do ar.
      </p>

      <h2 id="figma">3. Desenhar na biblioteca do Figma</h2>
      <p>
        O desenho acontece dentro das bibliotecas publicadas, não ao lado delas. São duas:{' '}
        <strong>Foundations</strong>, com as variables de cor, tipografia, espaçamento, raio e borda,
        e <strong>Web Components</strong>, com os componentes.
      </p>
      <div className="wiki-cartoes">
        <a
          className="wiki-cartao"
          href="https://www.figma.com/design/3IPhcwjiNpG6PXVmdG2x3x/Foundations"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Foundations ↗</span>
          <span className="wiki-cartao__descricao">
            As collections de variables que alimentam todos os componentes.
          </span>
        </a>
        <a
          className="wiki-cartao"
          href="https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Web Components ↗</span>
          <span className="wiki-cartao__descricao">
            58 componentes publicados: 36 de catálogo e 22 partes internas.
          </span>
        </a>
      </div>
      <p>Regras de trabalho no arquivo:</p>
      <ul>
        <li>
          <strong>Instância, nunca cópia.</strong> Não descole (<em>detach</em>) um componente para
          ajustar detalhe. Instância descolada não recebe correção nem atualização.
        </li>
        <li>
          <strong>Variable, nunca valor digitado.</strong> Aplique a variable semântica. Se a que
          você precisa não existe, isso é decisão faltando no sistema — registre em vez de digitar um
          hexadecimal.
        </li>
        <li>
          <strong>Não use variable primitiva direto.</strong> A cadeia é componente → semântico →
          primitivo. Pular degraus quebra a troca de tema no futuro.
        </li>
        <li>
          <strong>Desenhe todos os estados.</strong> Padrão, foco, desabilitado, carregando, erro,
          vazio e o conteúdo mais longo que pode aparecer de verdade — não o texto de exemplo curto.
        </li>
        <li>
          <strong>Desenhe em mais de uma largura.</strong> Celular primeiro. A maior parte do acesso a
          serviço público do Estado acontece em tela estreita.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe uma resposta única para quais larguras usar. Os
        tokens declaram quatro pontos (<code>bp-xs</code> 0, <code>bp-sm</code> 640px,{' '}
        <code>bp-md</code> 900px, <code>bp-lg</code> 1200px), o CSS real dos componentes usa
        420/480/640/720/768/900/920/1200 e a página Grids do Storybook fala em 360, 768–1024 e
        1280–1440. São três respostas diferentes, e a decisão de qual vale ainda não foi tomada —
        fonte: time. Também não existe token de largura máxima de container nem regra de
        centralização de página. Ver <Link href="/fundamentos/grid-e-layout">Grid e layout</Link>.
        Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> convivem no ambiente duas bibliotecas SP legadas —{' '}
        <code>SP / Design System / Arquivo PÚBLICO</code> (componentes <code>sp-*</code>) e{' '}
        <code>UI Kit Poupatempo SP.GOV.BR</code>. Qual delas continua vigente, para quais produtos, e
        se há prazo de migração é decisão pendente — fonte: time. Enquanto isso não sai, misturar
        peças das três bibliotecas no mesmo arquivo produz telas que ninguém consegue manter.
        Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="prototipo">4. Prototipar</h2>
      <p>
        Tela estática esconde o que mais custa a quem usa: a espera, o erro e o caminho de volta.
        Prototipe o fluxo inteiro, não a tela bonita.
      </p>
      <ul>
        <li>
          <strong>Ligue o percurso completo</strong>, incluindo o passo em que a pessoa desiste ou
          volta atrás.
        </li>
        <li>
          <strong>Inclua os estados que ninguém gosta de desenhar:</strong> carregando, sem
          resultado, sem permissão, sistema indisponível, sessão expirada.
        </li>
        <li>
          <strong>Use conteúdo realista.</strong> Nome comprido, endereço com complemento, valor
          alto, lista vazia. Texto de exemplo curto esconde quebra de layout.
        </li>
        <li>
          <strong>Anote o que o protótipo não simula</strong> — tempo de resposta real, validação do
          servidor, comportamento com teclado. Isso vira nota de handoff.
        </li>
      </ul>

      <h2 id="validacao">5. Validar com pessoas</h2>
      <p>
        Validação é observar alguém tentando concluir a tarefa, não pedir opinião sobre o desenho.
        Cinco pessoas que se parecem com quem usa o serviço encontram a maior parte dos problemas
        graves.
      </p>
      <ul>
        <li>
          <strong>Peça a tarefa, não a impressão.</strong> &quot;Agende um atendimento para a próxima
          semana&quot;, e depois fique quieto.
        </li>
        <li>
          <strong>Convide quem o serviço realmente atende</strong> — inclusive pessoas com baixa
          familiaridade digital, baixa visão e pouco tempo. Não valide só com colegas.
        </li>
        <li>
          <strong>Registre onde a pessoa travou</strong>, o que ela leu em voz alta e o que ela
          entendeu diferente do previsto. Palavra confusa é achado tão sério quanto botão escondido.
        </li>
        <li>
          <strong>Volte à etapa 3</strong> com as decisões revistas. Se nada mudou depois da
          validação, provavelmente a validação não aconteceu de verdade.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe protocolo de pesquisa documentado, nem repositório
        de achados, nem procedimento para recrutar pessoas participantes em serviços do Estado —
        fonte: time. As orientações acima são a proposta desta documentação, não um processo
        aprovado. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="acessibilidade">6. Revisar acessibilidade</h2>
      <p>
        Acessibilidade se decide no desenho e só se verifica no código. A maior parte das falhas
        nasce na composição da tela — ordem, hierarquia, rótulo, texto — e não dentro do componente.
        Componente acessível não garante tela acessível.
      </p>
      <p>Antes do handoff, resolva no próprio arquivo:</p>
      <ul>
        <li>
          <strong>Contraste.</strong> Texto normal a 4,5:1 e elementos gráficos a 3:1. Atenção à cor
          de marca: <code>#FF161F</code> mede 3,90:1 sobre branco e não serve para texto. Use{' '}
          <code>#C50007</code> em texto e controles. Ver <Link href="/fundamentos/cor">Cor</Link>.
        </li>
        <li>
          <strong>Ordem de leitura e de foco.</strong> Marque no arquivo a sequência do Tab. Ela
          segue a leitura visual, não a ordem em que você desenhou.
        </li>
        <li>
          <strong>Rótulo em todo campo</strong>, visível. Placeholder não é rótulo: ele desaparece
          quando a pessoa começa a digitar.
        </li>
        <li>
          <strong>Nenhum estado só por cor.</strong> Erro, sucesso, selecionado e obrigatório
          precisam de ícone ou texto junto.
        </li>
        <li>
          <strong>Alvo de toque de 44×44px</strong> em telas de celular, ou espaçamento equivalente.
        </li>
        <li>
          <strong>Texto alternativo</strong> de cada imagem informativa, escrito por quem desenhou —
          quem implementa não sabe qual era a informação.
        </li>
      </ul>
      <p>
        O checklist completo, com o que verificar depois de implementado, está em{' '}
        <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>.
      </p>

      <h2 id="handoff">7. Entregar para desenvolvimento</h2>
      <p>
        Handoff não é enviar o link do arquivo. É entregar as decisões que o desenho não consegue
        mostrar sozinho. Quanto mais completo o handoff, menos o componente é reinterpretado durante
        a implementação.
      </p>
      <Tabela
        cabecalho={['O que entregar', 'Por que isso trava a implementação quando falta']}
        legenda="Conteúdo mínimo de um handoff de design"
        linhas={[
          [
            'Node-id de cada componente usado',
            'Sem ele, quem implementa procura no arquivo inteiro e às vezes acha a versão antiga.',
          ],
          [
            'Variantes e propriedades usadas em cada instância',
            'Define se é variante existente ou pedido de variante nova — muda o tamanho da tarefa.',
          ],
          [
            'Todos os estados: padrão, foco, desabilitado, carregando, erro, vazio',
            'O estado não desenhado vira invenção de quem implementa, e cada pessoa inventa diferente.',
          ],
          [
            'Tokens aplicados, pelo nome',
            'Evita que a cor certa seja reproduzida como hexadecimal digitado à mão.',
          ],
          [
            'Comportamento em cada largura',
            'Sem isso, o layout de celular é decidido no código, sem revisão de design.',
          ],
          [
            'Ordem de foco e comportamento de teclado',
            'É a informação que nunca está no desenho e é a que mais afeta acessibilidade.',
          ],
          [
            'Textos finais, revisados',
            'Texto provisório publicado é o defeito mais barato de evitar e o mais visível quando escapa.',
          ],
          [
            'O que é intencionalmente diferente do sistema, e por quê',
            'Divergência declarada vira decisão; divergência silenciosa vira defeito.',
          ],
        ]}
      />
      <p>
        A partir daqui, a trilha continua em{' '}
        <Link href="/introducao/fluxo-de-desenvolvimento">Fluxo de desenvolvimento</Link>. Se a
        entrega inclui componente novo ou variante nova, ela também precisa passar por{' '}
        <Link href="/introducao/contribua">Contribua</Link> — senão ela nasce fora do sistema e
        continua fora dele.
      </p>

      <h2 id="depois">Depois do handoff</h2>
      <p>
        Um componente aprovado não termina no merge. Ele passa a ser mantido: recebe correção,
        ganha estado novo, é usado em contexto que ninguém previu. Três compromissos seguem com ele:
      </p>
      <ul>
        <li>
          <strong>O Figma acompanha o código.</strong> Quando a implementação muda o desenho, a
          biblioteca é atualizada — não o contrário.
        </li>
        <li>
          <strong>A documentação acompanha o componente.</strong> Quando usar, quando não usar e
          erros comuns são conteúdo de design, não de desenvolvimento.
        </li>
        <li>
          <strong>A acessibilidade é verificada de novo</strong> a cada mudança de estrutura. Hoje 13
          dos {componentes.length} componentes têm teste automatizado de acessibilidade — os outros
          dependem inteiramente de revisão manual.
        </li>
      </ul>

      <h2 id="pendencias">Pendências deste fluxo</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe processo formal de proposta e aprovação de
        componente — nem critério de aceite, nem etapa de revisão obrigatória, nem pessoa ou grupo
        responsável por aprovar a entrada de uma peça no sistema — fonte: time. O fluxo desta página
        descreve a prática recomendada, não um rito aprovado. Ver{' '}
        <Link href="/introducao/governanca">Governança</Link>. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe modelo de handoff nem definição de pronto (
        <em>definition of done</em>) para uma entrega de design — fonte: time. A lista da etapa 7 é
        proposta desta documentação. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não há decisão sobre o que fazer com as divergências já
        conhecidas entre Figma e código: {semFigma.length} componentes existem só em código e o
        componente de catálogo Star Rating existe só no Figma — fonte: time / repo. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
