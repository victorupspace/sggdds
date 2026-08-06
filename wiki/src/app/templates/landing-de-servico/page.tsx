import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Landing de serviço',
  description:
    'Template da página de entrada de um serviço público: destaque, o que é o serviço, quem pode usar, documentos necessários e uma única chamada para ação.',
};

interface PecaRegiao {
  slug: string;
  nome: string;
}

interface Regiao {
  regiao: string;
  conteudo: string;
  componentes: PecaRegiao[];
  nota?: string;
}

const ESTRUTURA: Regiao[] = [
  {
    regiao: '1. Cabeçalho',
    conteudo:
      'Identificação do Estado e do portal, navegação principal e acesso à conta. Igual em todas as páginas do serviço.',
    componentes: [
      { slug: 'header', nome: 'Header' },
      { slug: 'meganav', nome: 'Meganav' },
    ],
    nota: 'Meganav só quando o portal tem várias áreas globais.',
  },
  {
    regiao: '2. Trilha',
    conteudo:
      'Onde a pessoa está e como voltar: portal, categoria do serviço, serviço atual. O nível atual não é link.',
    componentes: [{ slug: 'breadcrumb', nome: 'Breadcrumb' }],
  },
  {
    regiao: '3. Destaque de entrada',
    conteudo:
      'Nome do serviço em uma linha, uma frase dizendo o que ele resolve e o botão que começa o atendimento. Nada mais.',
    componentes: [
      { slug: 'hero', nome: 'Hero' },
      { slug: 'badge', nome: 'Badge' },
      { slug: 'button', nome: 'Button' },
      { slug: 'button-gov', nome: 'ButtonGov' },
    ],
    nota: 'Badge no slot acima do título para marcar “100% digital” ou “gratuito”; no máximo 2 botões.',
  },
  {
    regiao: '4. Aviso de situação',
    conteudo:
      'Só aparece quando há algo que muda a decisão da pessoa agora: prazo aberto, sistema indisponível, mudança de regra.',
    componentes: [{ slug: 'alert', nome: 'Alert' }],
    nota: 'Região opcional. Sem aviso real, ela não existe.',
  },
  {
    regiao: '5. O que é o serviço',
    conteudo:
      'Dois ou três parágrafos: o que a pessoa recebe no fim, para que serve e o que este serviço não faz.',
    componentes: [
      { slug: 'divider', nome: 'Divider' },
      { slug: 'link', nome: 'Link' },
    ],
    nota: 'Texto corrido. Não transforme explicação em cards.',
  },
  {
    regiao: '6. Quem pode usar',
    conteudo:
      'Os requisitos, um por linha, em frases que a pessoa consegue conferir sozinha. Se houver quem não pode, diga também.',
    componentes: [
      { slug: 'list-item', nome: 'ListItem' },
      { slug: 'badge', nome: 'Badge' },
    ],
  },
  {
    regiao: '7. Documentos necessários',
    conteudo:
      'A lista do que precisa estar em mãos antes de começar, com formato e limite aceitos quando houver envio de arquivo.',
    componentes: [
      { slug: 'list-item', nome: 'ListItem' },
      { slug: 'badge', nome: 'Badge' },
      { slug: 'accordion', nome: 'Accordion' },
    ],
    nota: 'Accordion só quando a lista muda por situação (ex.: titular, procurador, empresa).',
  },
  {
    regiao: '8. Como funciona',
    conteudo:
      'As etapas do serviço em ordem, numeradas, com o que acontece em cada uma e quanto tempo costuma levar.',
    componentes: [
      { slug: 'list-item', nome: 'ListItem' },
      { slug: 'card', nome: 'Card' },
    ],
    nota: 'Card só quando cada etapa tem imagem; caso contrário, lista ordenada.',
  },
  {
    regiao: '9. Prazo, custo e atendimento',
    conteudo:
      'Quanto custa, quanto demora e onde conseguir ajuda — telefone, presencial ou canal digital.',
    componentes: [
      { slug: 'card', nome: 'Card' },
      { slug: 'link', nome: 'Link' },
      { slug: 'divider', nome: 'Divider' },
    ],
  },
  {
    regiao: '10. Perguntas frequentes',
    conteudo:
      'As dúvidas que hoje chegam ao atendimento, com a resposta completa dentro de cada item — sem levar a pessoa para outra página.',
    componentes: [{ slug: 'accordion', nome: 'Accordion' }],
  },
  {
    regiao: '11. Chamada para ação',
    conteudo:
      'O mesmo botão do destaque, repetido no fim para quem leu tudo. Ao lado dele, os caminhos alternativos.',
    componentes: [
      { slug: 'button', nome: 'Button' },
      { slug: 'button-gov', nome: 'ButtonGov' },
      { slug: 'action-card', nome: 'ActionCard' },
    ],
  },
  {
    regiao: '12. Serviços relacionados',
    conteudo:
      'De três a seis serviços que costumam vir junto com este. Região opcional — só entra se a relação for real.',
    componentes: [
      { slug: 'action-card', nome: 'ActionCard' },
      { slug: 'carousel', nome: 'Carousel' },
    ],
    nota: 'Carousel apenas se a lista não couber; grade de ActionCard é a primeira opção.',
  },
  {
    regiao: '13. Rodapé',
    conteudo: 'Navegação secundária, links legais, redes sociais e informação institucional.',
    componentes: [{ slug: 'footer', nome: 'Footer' }],
  },
  {
    regiao: '14. Apoios de página',
    conteudo:
      'Retorno ao topo depois da rolagem longa e aviso de cookies na primeira visita.',
    componentes: [
      { slug: 'back-to-top', nome: 'BackToTop' },
      { slug: 'cookie-consent-banner', nome: 'CookieConsentBanner' },
    ],
  },
];

function ListaDeComponentes({ itens, nota }: { itens: PecaRegiao[]; nota?: string }) {
  return (
    <>
      {itens.map((item, indice) => (
        <span key={item.slug}>
          {indice > 0 ? ', ' : ''}
          <Link href={`/componentes/${item.slug}`}>{item.nome}</Link>
        </span>
      ))}
      {nota ? (
        <div>
          <em>{nota}</em>
        </div>
      ) : null}
    </>
  );
}

export default function PaginaTemplateLandingDeServico() {
  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Templates', href: '/templates/visao-geral' },
          { titulo: 'Landing de serviço' },
        ]}
      />

      <h1>Landing de serviço</h1>
      <p className="wiki-prosa__resumo">
        É a porta de entrada de um serviço do Estado: a página que responde “isto serve para mim?”
        antes de pedir qualquer dado. Ela existe para que ninguém comece um atendimento que não
        podia fazer, nem desista no meio por falta de um documento que estava na gaveta.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <h2 id="para-que-serve">Para que serve</h2>
      <p>
        Quem chega aqui vem de uma busca, de um link do atendimento ou do portal, e quase sempre com
        uma pergunta prática: <em>eu tenho direito, quanto custa, o que preciso ter em mãos</em>. A
        landing responde a essas três perguntas na ordem em que elas aparecem e só então oferece o
        botão que começa o serviço.
      </p>
      <p>
        A landing <strong>não é</strong> o serviço. Ela não pede dado, não valida nada e não gera
        protocolo. Tudo que ela faz é qualificar a decisão e entregar a pessoa preparada para a{' '}
        <Link href="/templates/pagina-de-servico">página de serviço</Link>.
      </p>

      <h3 id="quando-usar">Use quando</h3>
      <ul>
        <li>O serviço tem critério de elegibilidade que nem todo mundo cumpre.</li>
        <li>É preciso ter documento, número ou dado em mãos antes de começar.</li>
        <li>Existe custo, prazo ou etapa presencial que muda a decisão da pessoa.</li>
        <li>O serviço é procurado por busca externa e precisa se explicar sozinho.</li>
      </ul>

      <h3 id="quando-nao-usar">Não use quando</h3>
      <ul>
        <li>
          <strong>O serviço é uma consulta simples.</strong> Consultar protocolo ou situação de um
          documento não precisa de página de entrada: vá direto ao campo de{' '}
          <Link href="/padroes/busca">busca</Link>.
        </li>
        <li>
          <strong>A pessoa já está autenticada e dentro do serviço.</strong> Repetir a landing para
          quem já entrou é um obstáculo, não um esclarecimento.
        </li>
        <li>
          <strong>Não há nada a explicar.</strong> Se a landing só teria título e botão, ela é uma
          tela a mais entre a pessoa e o serviço.
        </li>
      </ul>

      <h2 id="estrutura">Estrutura da página</h2>
      <p>
        Na ordem vertical em que a pessoa encontra cada região. As regiões marcadas como opcionais
        só entram quando têm conteúdo real — região vazia é ruído.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Regiões da landing de serviço, conteúdo de cada uma e componentes usados
          </caption>
          <thead>
            <tr>
              <th scope="col">Região</th>
              <th scope="col">O que vai nela</th>
              <th scope="col">Componentes usados</th>
            </tr>
          </thead>
          <tbody>
            {ESTRUTURA.map((linha) => (
              <tr key={linha.regiao}>
                <th scope="row">{linha.regiao}</th>
                <td>{linha.conteudo}</td>
                <td>
                  <ListaDeComponentes itens={linha.componentes} nota={linha.nota} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 id="hierarquia-de-titulos">Hierarquia de títulos</h3>
      <p>
        O nome do serviço é o único <code>h1</code> da página. O Hero renderiza{' '}
        <code>h1</code> por padrão e aceita <code>headingLevel</code> com os valores{' '}
        <code>1</code>, <code>2</code> e <code>3</code> — mantenha <code>1</code> aqui. Cada região
        seguinte abre com <code>h2</code>. Card e ActionCard recebem{' '}
        <code>headingLevel=&quot;3&quot;</code> por padrão, o que já encaixa dentro de um{' '}
        <code>h2</code> de região.
      </p>

      <h3 id="uma-acao-principal">Uma ação principal</h3>
      <p>
        A landing tem <strong>um</strong> botão primário, repetido no destaque e na chamada final. O
        Hero aceita no máximo dois botões no slot <code>actions</code> — o segundo é sempre
        secundário (por exemplo, “Consultar andamento”). Se o serviço exige conta gov.br, o botão de
        entrada é o <Link href="/componentes/button-gov">ButtonGov</Link>, que já traz o rótulo
        institucional e o ícone.
      </p>

      <h2 id="grade-e-responsividade">Grade e responsividade</h2>
      <p>
        O sistema publica três configurações de grade — 4 colunas no celular, 6 no tablet e 12 no
        desktop —, mas elas são valores escritos na página <code>Foundations/Grids</code> do
        Storybook, não tokens. Os únicos tokens de grade que existem são os de espaço entre colunas
        e linhas, no grupo <code>--ds-component-grid-*</code>. Ver{' '}
        <Link href="/fundamentos/grid-e-layout">Grid e layout</Link>.
      </p>
      <ul>
        <li>
          <strong>Coluna de leitura.</strong> As regiões 5, 6, 7 e 10 são texto: limite a largura da
          linha, porque não existe token de largura máxima de página e as três grades publicadas são
          do tipo <em>Stretch</em>. Em monitor largo, sem limite, uma linha atravessa a tela inteira.
        </li>
        <li>
          <strong>Destaque.</strong> O Hero <code>default</code> põe o conteúdo à esquerda, com no
          máximo 600px, e deixa o slot da direita para imagem. Abaixo de{' '}
          <strong>768px</strong> ele empilha, o padding lateral cai e o slot passa a ocupar 100%.
        </li>
        <li>
          <strong>Cards.</strong> O Card horizontal volta a empilhar abaixo de{' '}
          <strong>640px</strong>, com a mídia ocupando a largura toda. Em grade de ActionCard, use
          colunas que caibam sem apertar o título.
        </li>
        <li>
          <strong>Perguntas frequentes.</strong> Abaixo de <strong>640px</strong> o Accordion reduz
          o título e o conteúdo do painel, e o bloco de badge e ação do item passa a ocupar a linha
          inteira.
        </li>
        <li>
          <strong>Serviços relacionados.</strong> O Carousel muda em três pontos: em{' '}
          <strong>900px</strong> reduz o espaço lateral, em <strong>640px</strong> move as setas
          para baixo do conteúdo e faz cada item ocupar a largura inteira, e em{' '}
          <strong>420px</strong> compacta o card interno.
        </li>
        <li>
          <strong>Moldura.</strong> O Header vira a versão mobile em <strong>768px</strong>. O
          Footer passa de 4 para 2 colunas em <strong>1200px</strong>, vira acordeão de coluna única
          em <strong>720px</strong> e reduz de novo em <strong>420px</strong>. O Breadcrumb reduz o
          padding e limita cada rótulo a 160px em <strong>640px</strong>.
        </li>
        <li>
          <strong>Apoios.</strong> O BackToTop encolhe em <strong>640px</strong> e aproxima-se da
          borda em <strong>420px</strong>. O aviso de cookies empilha em <strong>900px</strong>,
          compacta em <strong>640px</strong> e coloca os botões em coluna única em{' '}
          <strong>420px</strong>.
        </li>
      </ul>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Os pontos de quebra não são um conjunto só</p>
        <p>
          Os tokens de breakpoint publicam 640px, 900px e 1200px, mas os componentes desta página
          quebram também em 420px, 640px, 720px, 768px e 900px. Revisar a landing só em 640, 900 e
          1200 deixa passar o rearranjo do Hero (768px) e o do Footer (720px). Teste nos pontos
          citados acima, não nos tokens.
        </p>
      </div>

      <h2 id="variacoes">Variações</h2>

      <h3 id="variacao-sem-imagem">Destaque sem imagem</h3>
      <p>
        Quando não há foto ou ilustração de qualidade, use o Hero em{' '}
        <code>variant=&quot;center&quot;</code>: coluna única centralizada, com o slot abaixo do
        conteúdo. É melhor do que preencher o slot da direita com imagem genérica de banco.
      </p>

      <h3 id="variacao-autenticado">Serviço que exige conta gov.br</h3>
      <p>
        A ação principal passa a ser o ButtonGov, e a região “Quem pode usar” ganha uma linha
        dizendo que é preciso ter conta. Não esconda a exigência de login para depois do primeiro
        clique. Ver <Link href="/padroes/login">Login e identificação</Link>.
      </p>

      <h3 id="variacao-publicos">Mais de um público</h3>
      <p>
        Quando o serviço muda conforme quem solicita — pessoa física, pessoa jurídica, procurador —,
        as regiões 6, 7 e 8 vão para dentro de <Link href="/componentes/tabs">Tabs</Link>, uma aba
        por público. Mantenha uma aba selecionada por padrão e não use aba para esconder requisito
        que vale para todo mundo.
      </p>

      <h3 id="variacao-presencial">Serviço com etapa presencial</h3>
      <p>
        A chamada para ação deixa de ser “Solicitar” e passa a ser “Agendar atendimento”. A região 9
        cresce: endereço, horário e o que levar. Um{' '}
        <Link href="/componentes/alert">Alert</Link> com{' '}
        <code>variant=&quot;information&quot;</code> no topo avisa que parte do serviço não é
        digital.
      </p>

      <h3 id="variacao-curta">Landing curta</h3>
      <p>
        Serviço simples, sem custo e sem documento: funda “Quem pode usar” e “Documentos
        necessários” numa região só, e corte “Como funciona” se forem duas etapas. Uma landing de
        quatro regiões bem escritas é melhor do que uma de doze com conteúdo inventado para
        preencher.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns na landing de serviço, consequência e correção
          </caption>
          <thead>
            <tr>
              <th scope="col">Erro</th>
              <th scope="col">O que acontece</th>
              <th scope="col">Correção</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Começar pelo formulário</th>
              <td>
                A pessoa preenche três campos e descobre no quarto que não tem o documento
                necessário.
              </td>
              <td>Documentos e requisitos vêm antes da ação, nas regiões 6 e 7.</td>
            </tr>
            <tr>
              <th scope="row">Dois botões primários no destaque</th>
              <td>A pessoa não sabe qual é o caminho principal e escolhe no chute.</td>
              <td>
                Um primário e, se necessário, um secundário. O Hero recebe no máximo 2 botões em{' '}
                <code>actions</code>.
              </td>
            </tr>
            <tr>
              <th scope="row">Explicar o serviço dentro de accordion</th>
              <td>
                O que é essencial fica fechado por padrão e não aparece na busca da própria página.
              </td>
              <td>Accordion é para dúvida, não para a explicação principal.</td>
            </tr>
            <tr>
              <th scope="row">Requisitos em texto corrido</th>
              <td>A pessoa não consegue conferir item por item e desiste de tentar entender.</td>
              <td>Uma linha por requisito, em frases que se possa marcar mentalmente.</td>
            </tr>
            <tr>
              <th scope="row">Badge no lugar de aviso</th>
              <td>
                Uma informação que muda a decisão fica reduzida a uma pílula que ninguém lê.
              </td>
              <td>
                Badge é rótulo curto e não interativo. Aviso é{' '}
                <Link href="/componentes/alert">Alert</Link>.
              </td>
            </tr>
            <tr>
              <th scope="row">Carrossel com o conteúdo principal</th>
              <td>Parte da informação fica fora da tela e nunca é vista.</td>
              <td>
                Carousel só para serviços relacionados. Conteúdo essencial fica sempre visível.
              </td>
            </tr>
            <tr>
              <th scope="row">Manter o conteúdo padrão do Header e do Footer</th>
              <td>
                O portal publica quatro itens “Option” de exemplo e seções de rodapé genéricas.
              </td>
              <td>
                Passe <code>navigationItems</code>, <code>utilityItems</code> e{' '}
                <code>sections</code> com o conteúdo real do serviço.
              </td>
            </tr>
            <tr>
              <th scope="row">Prometer prazo sem fonte</th>
              <td>A pessoa cobra um prazo que o serviço não se comprometeu a cumprir.</td>
              <td>Só publique prazo e custo que venham da norma do serviço.</td>
            </tr>
            <tr>
              <th scope="row">Texto sem largura máxima</th>
              <td>Em monitor largo, a linha atravessa a tela e a leitura fica cansativa.</td>
              <td>
                Limite a coluna de texto. Ver{' '}
                <Link href="/fundamentos/tipografia">Tipografia</Link>.
              </td>
            </tr>
            <tr>
              <th scope="row">Título de serviço genérico</th>
              <td>
                “Portal de serviços” não diz o que a pessoa vai conseguir, e a busca externa não
                encontra a página.
              </td>
              <td>O <code>h1</code> é o nome do serviço, na linguagem de quem procura por ele.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="pendencias">Pendências deste template</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de lista de requisitos nem de “o que
        levar”, e não existe layout de página com container e grade — fonte: time. As regiões 6, 7 e
        8 são montadas hoje com ListItem e marcação própria de cada produto. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> entre os componentes deste template, só Button, Meganav,
        Carousel e CookieConsentBanner têm teste axe. Header, Footer, Breadcrumb, Hero, Card,
        ActionCard, Accordion, Alert, Badge, ListItem, Link, Divider, BackToTop e ButtonGov não têm —
        neles o teste manual é obrigatório. Ver{' '}
        <Link href="/fundamentos/acessibilidade">Acessibilidade</Link> — fonte: repositório.
        Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o Header aplica <code>aria-current=&quot;page&quot;</code> nos
        itens de navegação, mas não há estilo correspondente no CSS — o item atual não tem distinção
        visual. Enquanto isso não é corrigido, a trilha é a única indicação visível de onde a pessoa
        está — fonte: repositório. Registrado em <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
