import type { Metadata } from 'next';
import Link from 'next/link';

import { Tabela } from '@/components/Blocos';
import { Trilha } from '@/components/Trilha';
import {
  listarComponentes,
  listarParesFigma,
  listarTokens,
  metaTokens,
  obterConteudoComponente,
} from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Sobre o Sampa DS',
  description:
    'O que é o Sampa Design System, por que ele existe, o que está dentro e fora do escopo, para quem ele serve e como a Wiki, o Figma e o Storybook se dividem.',
};

const ESCOPO_DENTRO: { item: string; detalhe: string }[] = [
  {
    item: 'Design tokens',
    detalhe:
      'Cor, tipografia, espaçamento, raio, borda, sombra e duração, com um nome estável para cada decisão.',
  },
  {
    item: 'Componentes de interface',
    detalhe:
      'Peças reutilizáveis com comportamento, estados, semântica de acessibilidade e API declarada.',
  },
  {
    item: 'Iconografia',
    detalhe: 'Um conjunto único de ícones, com estilo e peso definidos, usado por todos os serviços.',
  },
  {
    item: 'Marca aplicada à interface',
    detalhe: 'Logotipo, cor de marca e o limite entre identidade gráfica e cor de texto e controle.',
  },
  {
    item: 'Padrões de composição',
    detalhe:
      'Como combinar componentes em situações que se repetem: formulário, busca, filtro, erro, estado vazio.',
  },
  {
    item: 'Documentação verificável',
    detalhe:
      'Esta Wiki, com origem declarada para cada dado e lacuna registrada onde o dado não existe.',
  },
];

const ESCOPO_FORA: { item: string; detalhe: string }[] = [
  {
    item: 'O conteúdo de cada serviço',
    detalhe:
      'O sistema define como um campo se comporta, não qual pergunta o formulário faz nem qual documento a pessoa precisa levar.',
  },
  {
    item: 'A arquitetura de informação do produto',
    detalhe:
      'Menu, hierarquia de páginas e ordem das etapas são decisões de cada serviço, feitas com pesquisa.',
  },
  {
    item: 'Back-end, integração e regra de negócio',
    detalhe: 'O sistema entrega interface. Não define API, autenticação, banco nem processo.',
  },
  {
    item: 'Identidade de campanha e peças de comunicação',
    detalhe:
      'Material publicitário, redes sociais e impressos seguem manual de marca próprio, que não vive aqui.',
  },
  {
    item: 'Ilustração e fotografia',
    detalhe: 'Não existe biblioteca de ilustração ou banco de imagens publicado no sistema.',
  },
  {
    item: 'Pesquisa com pessoas',
    detalhe:
      'O sistema não descobre se o serviço resolve o problema de quem o procura. Isso continua sendo trabalho de cada equipe.',
  },
];

const PUBLICOS: { publico: string; usa: string; comeca: { titulo: string; href: string } }[] = [
  {
    publico: 'Design',
    usa: 'Monta telas com as bibliotecas do Figma, sem redesenhar o que já existe e sem inventar valores.',
    comeca: { titulo: 'Fundamentos', href: '/fundamentos/visao-geral' },
  },
  {
    publico: 'Desenvolvimento',
    usa: 'Consome os componentes em React e os tokens em CSS, e confere o comportamento real no Storybook.',
    comeca: { titulo: 'Instalação', href: '/recursos/instalacao' },
  },
  {
    publico: 'Produto',
    usa: 'Descobre o que já está pronto antes de pedir algo novo, e entende o custo de fugir do padrão.',
    comeca: { titulo: 'Catálogo de componentes', href: '/componentes/visao-geral' },
  },
  {
    publico: 'Conteúdo',
    usa: 'Escreve rótulo, mensagem de erro e texto de apoio dentro dos limites que cada componente tem.',
    comeca: { titulo: 'Padrões', href: '/padroes/visao-geral' },
  },
  {
    publico: 'Fornecedores contratados',
    usa: 'Entregam telas que se parecem com o resto do Estado, usando os mesmos tokens e os mesmos componentes.',
    comeca: { titulo: 'Downloads', href: '/recursos/downloads' },
  },
];

export default function PaginaSobre() {
  const componentes = listarComponentes();
  const tokens = listarTokens();
  const pares = listarParesFigma();
  const meta = metaTokens() as { colecoes: { arquivo: string }[] };

  const stories = componentes.reduce((total, c) => total + c.stories.length, 0);
  const comAxe = componentes.filter((c) => c.tests.a11yFile !== null).length;
  const comTesteUnitario = componentes.filter((c) => c.tests.unitFile !== null).length;
  const percentualAxe = Math.round((comAxe / componentes.length) * 100);

  const categorias = new Map<string, number>();
  for (const componente of componentes) {
    const conteudo = obterConteudoComponente(componente.slug);
    const categoria = conteudo?.categoria ?? 'Sem categoria';
    categorias.set(categoria, (categorias.get(categoria) ?? 0) + 1);
  }
  const categoriasOrdenadas = [...categorias.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Introdução', href: '/introducao/sobre' },
          { titulo: 'Sobre o Sampa DS' },
        ]}
      />

      <h1>Sobre o Sampa Design System</h1>
      <p className="wiki-prosa__resumo">
        O Sampa Design System é o conjunto de decisões de design e de código que os serviços
        digitais do Governo do Estado de São Paulo compartilham. Ele existe para que a pessoa que
        agenda uma consulta, tira uma segunda via ou consulta um protocolo encontre sempre a mesma
        interface — e para que cada equipe pare de resolver de novo o que já foi resolvido.
      </p>

      <h2 id="o-que-e">O que é</h2>
      <p>
        Um design system não é um site nem um kit de telas prontas. É um repertório: um conjunto de
        peças nomeadas, com regra de uso, que várias equipes combinam para construir serviços
        diferentes. No Sampa DS esse repertório tem três camadas.
      </p>
      <ul>
        <li>
          <strong>Tokens</strong> — as decisões visuais guardadas como valor com nome:{' '}
          {tokens.length.toLocaleString('pt-BR')} tokens em {meta.colecoes.length} coleções. Nenhuma
          cor, medida ou fonte é escrita à mão.
        </li>
        <li>
          <strong>Componentes</strong> — peças implementadas em React, com estados, comportamento de
          teclado e semântica de acessibilidade já resolvidos por dentro.
        </li>
        <li>
          <strong>Padrões</strong> — o modo combinado de resolver situações que se repetem em
          serviço público: preencher um formulário longo, mostrar um erro, lidar com uma lista
          vazia.
        </li>
      </ul>
      <p>
        Quem constrói uma tela do Estado não escolhe valores: escolhe significados. Em vez de decidir
        qual cinza usar em uma borda, aplica o token de borda neutra. Em vez de desenhar um campo de
        texto, usa o campo de texto do sistema, que já sabe mostrar erro, já tem rótulo programático
        e já responde ao teclado.
      </p>

      <h2 id="por-que-existe">Por que existe</h2>
      <p>
        Serviço público digital tem uma diferença dura em relação a produto privado: quem usa não
        escolheu usar. A pessoa está ali porque precisa de um direito, de um documento ou de um
        atendimento. Se a interface muda de comportamento a cada serviço, o custo dessa
        inconsistência não cai sobre a marca — cai sobre a pessoa, que erra, desiste ou vai
        presencialmente resolver o que poderia ter resolvido de casa.
      </p>
      <p>O sistema ataca três problemas concretos:</p>
      <ul>
        <li>
          <strong>Inconsistência entre serviços.</strong> Sem base comum, cada fornecedor entrega um
          botão diferente, um campo diferente e uma mensagem de erro diferente para a mesma
          situação.
        </li>
        <li>
          <strong>Retrabalho.</strong> Todo projeto que redesenha um <em>datepicker</em> gasta tempo
          em algo que não distingue serviço nenhum, e gasta de novo no projeto seguinte.
        </li>
        <li>
          <strong>Acessibilidade resolvida caso a caso.</strong> Foco visível, contraste e navegação
          por teclado são difíceis de acertar e fáceis de esquecer. Resolvidos uma vez dentro do
          componente, passam a valer para todas as telas que o usam.
        </li>
      </ul>

      <h2 id="o-que-tem-dentro">O que tem dentro hoje</h2>
      <div className="wiki-numeros">
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{tokens.length.toLocaleString('pt-BR')}</span>
          <span className="wiki-numero__rotulo">design tokens</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{stories}</span>
          <span className="wiki-numero__rotulo">exemplos no Storybook</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">2.193</span>
          <span className="wiki-numero__rotulo">ícones</span>
        </div>
      </div>
      <p>
        Os componentes estão distribuídos em {categoriasOrdenadas.length} categorias, da que reúne
        mais peças para a que reúne menos:{' '}
        {/* Sem a quantidade por categoria: somá-las devolveria o total de
            componentes, que esta documentação deixou de informar. A ordem
            preserva a noção de tamanho relativo. */}
        {categoriasOrdenadas.map(([nome], indice) => (
          <span key={nome}>
            {indice > 0 ? ', ' : ''}
            <strong>{nome}</strong>
          </span>
        ))}
        . O catálogo completo, com API, estados e tokens de cada um, está em{' '}
        <Link href="/componentes/visao-geral">Componentes</Link>.
      </p>

      <h2 id="escopo">O que está dentro do escopo</h2>
      <Tabela
        cabecalho={['Faz parte do sistema', 'O que isso significa']}
        legenda="Itens dentro do escopo do Sampa Design System"
        linhas={ESCOPO_DENTRO.map((linha) => [<strong key={linha.item}>{linha.item}</strong>, linha.detalhe])}
      />

      <h2 id="fora-do-escopo">O que está fora do escopo</h2>
      <p>
        Delimitar o que o sistema não faz é tão importante quanto listar o que ele faz. Um sistema
        que promete resolver tudo não é confiável em nada — e cria a expectativa errada em quem
        contrata e em quem entrega.
      </p>
      <Tabela
        cabecalho={['Não faz parte do sistema', 'De quem é a responsabilidade']}
        legenda="Itens fora do escopo do Sampa Design System"
        linhas={ESCOPO_FORA.map((linha) => [<strong key={linha.item}>{linha.item}</strong>, linha.detalhe])}
      />
      <p>
        A lista completa de não-objetivos, com a justificativa de cada um, está em{' '}
        <Link href="/introducao/premissas-e-objetivos">Premissas e objetivos</Link>.
      </p>

      <h2 id="publicos">Para quem serve</h2>
      <p>
        Cinco públicos usam esta documentação, e usam por motivos diferentes. A mesma página de
        componente responde a perguntas distintas dependendo de quem chega.
      </p>
      <Tabela
        cabecalho={['Público', 'Como usa o sistema', 'Por onde começar']}
        legenda="Públicos do Sampa Design System"
        linhas={PUBLICOS.map((p) => [
          <strong key={p.publico}>{p.publico}</strong>,
          p.usa,
          <Link href={p.comeca.href} key={p.comeca.href}>
            {p.comeca.titulo}
          </Link>,
        ])}
      />
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Fornecedor contratado não é público secundário</p>
        <p>
          Boa parte dos serviços do Estado é construída por equipes contratadas, que não participam
          das decisões do sistema e muitas vezes trabalham em prazo curto. Se a documentação só faz
          sentido para quem já está por dentro, o sistema não é adotado — ele é contornado. Por isso
          cada página desta Wiki declara de onde o dado veio e o que ainda não foi decidido.
        </p>
      </div>

      <h2 id="tres-fontes">Wiki, Figma e Storybook</h2>
      <p>
        O sistema fala por três canais, e eles não competem: cada um é autoridade sobre uma coisa
        diferente. Confundir isso é a origem mais comum de divergência entre o que foi desenhado e o
        que foi entregue.
      </p>
      <Tabela
        cabecalho={['Fonte', 'Responde a', 'É autoridade sobre', 'Onde fica']}
        legenda="Divisão de papéis entre Wiki, Figma e Storybook"
        linhas={[
          [
            <strong key="wiki">Esta Wiki</strong>,
            '“Por quê?”, “quando usar?”, “quando não usar?”',
            'A explicação, a regra de uso e o registro do que ainda não foi decidido.',
            'Você está nela.',
          ],
          [
            <strong key="figma">Figma</strong>,
            '“Como isto se parece?”',
            'A forma: variables, estilos, anatomia e variantes de cada componente.',
            <span key="figma-links">
              Bibliotecas{' '}
              <a
                href="https://www.figma.com/design/3IPhcwjiNpG6PXVmdG2x3x/Foundations"
                rel="noreferrer noopener"
                target="_blank"
              >
                Foundations ↗
              </a>{' '}
              e{' '}
              <a
                href="https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components"
                rel="noreferrer noopener"
                target="_blank"
              >
                Web Components ↗
              </a>
            </span>,
          ],
          [
            <strong key="sb">Storybook</strong>,
            '“Como isto se comporta de verdade?”',
            'O comportamento: estados, foco, teclado, responsividade e a API real do componente.',
            <a
              href="https://sggdds.vercel.app"
              key="sb-link"
              rel="noreferrer noopener"
              target="_blank"
            >
              sggdds.vercel.app ↗
            </a>,
          ],
        ]}
      />
      <p>
        A regra prática de precedência: <strong>o código é a fonte de verdade do comportamento</strong>{' '}
        — se o Figma mostra um estado que o componente não tem, o componente está certo e o arquivo
        precisa ser corrigido. <strong>O Figma é a fonte de verdade da forma</strong> — se o código
        usa um valor que não existe como variable, o código está errado. Quando as duas fontes
        divergem, esta Wiki mostra as duas versões e registra a divergência em{' '}
        <code>INCONSISTENCIAS.md</code>; ela nunca escolhe uma em silêncio.
      </p>
      <p>
        Hoje {pares.length} componentes em React têm par identificado na biblioteca do Figma; os
        demais ainda não. A biblioteca publica 58 componentes: 36 de catálogo e 22 partes
        internas — átomos como <code>. Checkbox Control</code> ou <code>. Table Header Row</code>,
        que não viram página própria e aparecem como anatomia do componente pai.
      </p>

      <h2 id="maturidade">Em que estágio o sistema está</h2>
      <p>
        O Sampa DS está em construção, e esta documentação não tem interesse em parecer mais pronta
        do que é. O que já é sólido:
      </p>
      <ul>
        <li>
          Componentes implementados em React, com {stories} exemplos publicados e{' '}
          {comTesteUnitario} arquivos de teste unitário.
        </li>
        <li>
          {tokens.length.toLocaleString('pt-BR')} tokens exportados do Figma para CSS por um
          processo automático, sem digitação manual de valores.
        </li>
        <li>
          Uma única família tipográfica, uma única biblioteca de ícones e uma paleta com contraste
          medido.
        </li>
      </ul>
      <p>O que ainda não está resolvido, e afeta quem constrói agora:</p>
      <ul>
        <li>
          <strong>Acessibilidade verificada em parte do catálogo:</strong> {percentualAxe}% dos
          componentes têm teste automatizado de acessibilidade. Ver{' '}
          <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>.
        </li>
        <li>
          <strong>Distribuição não publicada:</strong> os pacotes{' '}
          <code>@government/design-system</code> e <code>@government/tokens</code> retornam 404 no
          npm. Ver <Link href="/recursos/instalacao">Instalação</Link>.
        </li>
        <li>
          <strong>Sem versão declarada:</strong> não existe tag no repositório nem arquivo{' '}
          <code>CHANGELOG.md</code>. O Changesets está configurado e nunca foi usado. Ver{' '}
          <Link href="/recursos/changelog">Changelog</Link>.
        </li>
        <li>
          <strong>Fundamentos com decisão em aberto:</strong> breakpoints com três respostas
          diferentes, movimento sem unidade e sem easing, sombras que só existem no código. Ver{' '}
          <Link href="/fundamentos/visao-geral">Fundamentos</Link>.
        </li>
      </ul>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Por que a documentação mostra os defeitos</p>
        <p>
          Documentação que esconde lacuna transfere o problema para quem implementa: a pessoa
          descobre a falha no meio da entrega, sem tempo e sem contexto. Aqui, todo dado que falta
          vira um bloco <strong>PENDENTE</strong> na página e uma linha em <code>LACUNAS.md</code>;
          toda divergência entre Figma e código vira uma linha em <code>INCONSISTENCIAS.md</code>.
        </p>
      </div>

      <h2 id="codigo-aberto">Onde o sistema vive</h2>
      <p>
        O código é público, sob licença MIT, em{' '}
        <a
          href="https://github.com/victorupspace/sggdds"
          rel="noreferrer noopener"
          target="_blank"
        >
          github.com/victorupspace/sggdds ↗
        </a>
        . A integração contínua e a rotina de release rodam em GitHub Actions, nos workflows{' '}
        <code>ci.yml</code> e <code>release.yml</code>.
      </p>

      <h2 id="o-que-nao-afirmamos">O que esta página não afirma</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe registro publicado do histórico do Sampa Design
        System — data de início, versão inicial, marcos, decisão que motivou a criação. Esta página
        descreve o sistema como ele está hoje, sem narrativa de origem — fonte: time. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não está declarado em lugar nenhum quem mantém o sistema: qual
        equipe responde por ele, quais papéis existem, como uma decisão é tomada e quem aprova a
        entrada de um componente novo. Nenhum nome de pessoa, papel ou canal é afirmado aqui — fonte:
        time. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> convivem hoje duas bibliotecas SP legadas no Figma —{' '}
        <em>SP / Design System / Arquivo PÚBLICO</em> (componentes <code>sp-*</code>) e{' '}
        <em>UI Kit Poupatempo SP.GOV.BR</em>. Não há decisão publicada sobre qual é a vigente, o que
        acontece com o que foi construído sobre elas, nem se existe caminho de migração — fonte:
        time. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="por-onde-continuar">Por onde continuar</h2>
      <div className="wiki-cartoes">
        <Link className="wiki-cartao" href="/introducao/premissas-e-objetivos">
          <span className="wiki-cartao__titulo">Premissas e objetivos</span>
          <span className="wiki-cartao__descricao">
            O que o sistema assume como verdade, o que busca alcançar e o que decidiu não resolver.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/introducao/principios">
          <span className="wiki-cartao__titulo">Princípios</span>
          <span className="wiki-cartao__descricao">
            As sete regras que decidem por você quando duas soluções parecem igualmente boas.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/fundamentos/visao-geral">
          <span className="wiki-cartao__titulo">Fundamentos</span>
          <span className="wiki-cartao__descricao">
            Cor, tipografia, espaço, ícone e marca — as decisões que valem para todas as telas.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/componentes/visao-geral">
          <span className="wiki-cartao__titulo">Componentes</span>
          <span className="wiki-cartao__descricao">
            Cada componente com API, estados, tokens, exemplos e erros comuns.
          </span>
        </Link>
      </div>
    </div>
  );
}
