import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Página de serviço',
  description:
    'Template da página do serviço em si: situação do pedido, o que fazer agora, passo a passo, documentos, histórico de movimentações e comprovante.',
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
      'Identificação do Estado e do portal, navegação e conta. Quando a pessoa está autenticada, o Header mostra o menu da conta.',
    componentes: [
      { slug: 'header', nome: 'Header' },
      { slug: 'meganav', nome: 'Meganav' },
    ],
    nota: 'A prop user troca a ação de entrar pelo painel da conta.',
  },
  {
    regiao: '2. Trilha',
    conteudo:
      'Portal, categoria, serviço e, quando existe, o número do pedido. É o caminho de volta para a landing.',
    componentes: [{ slug: 'breadcrumb', nome: 'Breadcrumb' }],
  },
  {
    regiao: '3. Identificação do serviço',
    conteudo:
      'Nome do serviço, número do protocolo quando já existe um pedido, e a situação atual em uma palavra.',
    componentes: [
      { slug: 'badge', nome: 'Badge' },
      { slug: 'divider', nome: 'Divider' },
    ],
    nota: 'Badge para a situação; nunca use só cor para indicar o estado.',
  },
  {
    regiao: '4. Aviso do momento',
    conteudo:
      'Só quando há algo que exige reação: pendência de documento, prazo correndo, indisponibilidade do sistema.',
    componentes: [{ slug: 'alert', nome: 'Alert' }],
    nota: 'Região opcional; use variant error para pendência que trava o pedido.',
  },
  {
    regiao: '5. Situação do pedido',
    conteudo:
      'Em que etapa o pedido está e qual é a próxima. Aparece antes de qualquer ação, para situar quem volta depois de dias.',
    componentes: [{ slug: 'stepper', nome: 'Stepper' }],
  },
  {
    regiao: '6. O que fazer agora',
    conteudo:
      'Uma frase dizendo a ação que depende da pessoa neste momento, e o botão que a executa. Se nada depende dela, diga isso.',
    componentes: [
      { slug: 'button', nome: 'Button' },
      { slug: 'button-gov', nome: 'ButtonGov' },
      { slug: 'list-item', nome: 'ListItem' },
    ],
  },
  {
    regiao: '7. Passo a passo do serviço',
    conteudo:
      'Todas as etapas em ordem, com o que acontece em cada uma, quem executa e o prazo. A etapa atual fica aberta.',
    componentes: [
      { slug: 'accordion', nome: 'Accordion' },
      { slug: 'list-item', nome: 'ListItem' },
    ],
    nota: 'defaultExpanded abre a etapa atual; allowMultiple fica desligado.',
  },
  {
    regiao: '8. Documentos do pedido',
    conteudo:
      'O que já foi enviado, o que falta e o que foi emitido pelo serviço, com formato e data de cada arquivo.',
    componentes: [
      { slug: 'list-item', nome: 'ListItem' },
      { slug: 'badge', nome: 'Badge' },
      { slug: 'link', nome: 'Link' },
      { slug: 'progress-bar', nome: 'ProgressBar' },
    ],
    nota: 'ProgressBar apenas durante o envio de um arquivo.',
  },
  {
    regiao: '9. Histórico de movimentações',
    conteudo:
      'Data, o que aconteceu e o responsável, do mais recente para o mais antigo. É a prova de que o pedido andou.',
    componentes: [
      { slug: 'data-table', nome: 'DataTable' },
      { slug: 'chip', nome: 'Chip' },
      { slug: 'pagination', nome: 'Pagination' },
    ],
    nota: 'Paginação só quando o histórico passa de uma tela.',
  },
  {
    regiao: '10. Comprovante e protocolo',
    conteudo:
      'O número do pedido em destaque, com a ação de copiar e a de baixar o comprovante. A pessoa precisa poder guardar isso.',
    componentes: [
      { slug: 'button', nome: 'Button' },
      { slug: 'toast', nome: 'Toast' },
      { slug: 'link', nome: 'Link' },
    ],
    nota: 'Toast confirma a cópia sem interromper; dispensa sozinho.',
  },
  {
    regiao: '11. Ajuda e atendimento',
    conteudo:
      'As dúvidas desta etapa e os canais de contato. Fica no fim porque só é procurada quando algo não ficou claro acima.',
    componentes: [
      { slug: 'accordion', nome: 'Accordion' },
      { slug: 'link', nome: 'Link' },
      { slug: 'tooltip', nome: 'Tooltip' },
    ],
    nota: 'Tooltip só para explicar um termo, nunca para informação essencial.',
  },
  {
    regiao: '12. Rodapé',
    conteudo: 'Navegação secundária, links legais, redes sociais e informação institucional.',
    componentes: [{ slug: 'footer', nome: 'Footer' }],
  },
  {
    regiao: '13. Apoios de página',
    conteudo: 'Retorno ao topo depois da rolagem longa e aviso de cookies na primeira visita.',
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

export default function PaginaTemplatePaginaDeServico() {
  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Templates', href: '/templates/visao-geral' },
          { titulo: 'Página de serviço' },
        ]}
      />

      <h1>Página de serviço</h1>
      <p className="wiki-prosa__resumo">
        É a página onde o serviço acontece e onde a pessoa volta para saber o que houve com o pedido
        dela. Responde a duas perguntas, nesta ordem: <em>em que pé está</em> e{' '}
        <em>o que depende de mim agora</em>.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <h2 id="para-que-serve">Para que serve</h2>
      <p>
        Serviço público raramente termina em uma sessão. A pessoa solicita hoje, é chamada daqui a
        uma semana para enviar um documento, e volta um mês depois para pegar o resultado. Entre uma
        visita e outra ela esquece o que já fez. Esta página existe para reconstruir esse contexto
        em segundos.
      </p>
      <p>
        A diferença para a{' '}
        <Link href="/templates/landing-de-servico">landing de serviço</Link> é o momento: a landing
        convence e prepara; esta executa e informa. A diferença para o{' '}
        <Link href="/templates/formulario-longo">formulário longo</Link> é o escopo: o formulário é
        uma das etapas <em>dentro</em> desta página, não a página inteira.
      </p>

      <h3 id="quando-usar">Use quando</h3>
      <ul>
        <li>O serviço tem mais de uma etapa e gera um protocolo.</li>
        <li>A pessoa precisa voltar depois para acompanhar ou completar algo.</li>
        <li>Existe pendência que pode ser criada pelo órgão e resolvida por ela.</li>
        <li>Há documento emitido no fim que precisa ficar disponível.</li>
      </ul>

      <h3 id="quando-nao-usar">Não use quando</h3>
      <ul>
        <li>
          <strong>O serviço termina na hora.</strong> Uma consulta que devolve resultado imediato é{' '}
          <Link href="/padroes/busca">busca</Link> com resultado, não pedido com acompanhamento.
        </li>
        <li>
          <strong>A pessoa tem dezenas de pedidos.</strong> Aí a entrada é um{' '}
          <Link href="/templates/painel">painel</Link>, e esta página vira o detalhe de um item da
          lista.
        </li>
        <li>
          <strong>Ainda não existe pedido.</strong> Sem protocolo, as regiões 5, 9 e 10 não têm o
          que mostrar — a pessoa está na landing.
        </li>
      </ul>

      <h2 id="estrutura">Estrutura da página</h2>
      <p>
        Na ordem vertical. A regra que organiza a sequência é: primeiro a situação, depois a ação,
        depois o histórico. Quem abre a página com pressa precisa das regiões 3, 5 e 6 sem rolar.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Regiões da página de serviço, conteúdo de cada uma e componentes usados
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

      <h3 id="o-stepper">O que o Stepper faz e o que ele não faz</h3>
      <p>
        O Stepper recebe a lista de etapas em <code>steps</code> e a posição em{' '}
        <code>currentStep</code>, e mostra <strong>a etapa atual e a próxima</strong> — nada mais.
        Ele expõe o progresso com <code>aria-valuenow</code>, <code>aria-valuemax</code> e{' '}
        <code>aria-valuetext</code>. Quando o serviço termina, <code>completed</code> troca o card
        pelo estado de conclusão, com <code>completedTitle</code>, <code>completedDescription</code>{' '}
        e um botão de <code>restartLabel</code> ligado a <code>onRestart</code>.
      </p>
      <p>
        <strong>O Stepper não navega</strong> e não tem estado visual de etapa concluída
        individual. Ele não substitui a região 7: quem quiser ver todas as etapas usa o Accordion do
        passo a passo. Se o desenho sugerir que o Stepper é clicável, a pessoa vai clicar e concluir
        que o serviço está quebrado.
      </p>

      <h3 id="estados">Carregamento, vazio e erro</h3>
      <p>Cada região que depende de dados do serviço precisa de três respostas:</p>
      <ul>
        <li>
          <strong>Carregando.</strong> Use{' '}
          <Link href="/componentes/skeleton">Skeleton</Link> quando a forma do conteúdo é conhecida
          — histórico, lista de documentos — e{' '}
          <Link href="/componentes/spinner">Spinner</Link> só em espera curta e pontual. O Skeleton
          troca o conteúdo por linhas com a mesma silhueta, o que evita o salto de layout.
        </li>
        <li>
          <strong>Vazio.</strong> Um pedido recém-criado tem histórico com uma linha, não zero. Se
          uma região está legitimamente vazia, escreva o motivo. Ver{' '}
          <Link href="/padroes/estados-vazios">Estados vazios</Link>.
        </li>
        <li>
          <strong>Erro.</strong> Falha ao carregar o histórico não pode derrubar a página inteira.
          Mostre um <Link href="/componentes/alert">Alert</Link> naquela região, com a ação de tentar
          de novo, e mantenha o resto. Ver{' '}
          <Link href="/padroes/feedback-e-erros">Feedback e erros</Link>.
        </li>
      </ul>

      <h2 id="grade-e-responsividade">Grade e responsividade</h2>
      <p>
        Esta página é de coluna única. Duas colunas só se justificam a partir do desktop, e mesmo
        assim com a regra de que a coluna lateral nunca leva informação exclusiva — ela repete um
        atalho que já existe no fluxo principal. Ver{' '}
        <Link href="/fundamentos/grid-e-layout">Grid e layout</Link>.
      </p>
      <ul>
        <li>
          <strong>Situação do pedido.</strong> O Stepper tem uma versão compacta abaixo de{' '}
          <strong>480px</strong>: círculo da etapa menor, tipografia reduzida e botão de recomeçar
          com menos padding.
        </li>
        <li>
          <strong>Histórico.</strong> A DataTable muda em três pontos. Em <strong>920px</strong>{' '}
          reduz o espaço interno das células e esconde as colunas marcadas com{' '}
          <code>hideBelow=&quot;lg&quot;</code>. Em <strong>720px</strong> esconde as de{' '}
          <code>hideBelow=&quot;md&quot;</code>. Em <strong>640px</strong> a tabela vira uma pilha de
          cards: o cabeçalho fica visualmente oculto e cada célula passa a exibir o rótulo da coluna.
        </li>
        <li>
          <strong>Paginação.</strong> Abaixo de <strong>720px</strong> a paginação vira coluna. Em{' '}
          <strong>640px</strong> os alvos de toque crescem para 48px e somem o seletor de página, os
          controles de primeira e última página e as reticências. Em <strong>420px</strong> o espaço
          entre controles diminui de novo.
        </li>
        <li>
          <strong>Passo a passo.</strong> Abaixo de <strong>640px</strong> o Accordion reduz título e
          conteúdo, e a área de badge e ação do item passa a ocupar a linha inteira.
        </li>
        <li>
          <strong>Confirmações.</strong> Abaixo de <strong>768px</strong> o Modal nos tamanhos{' '}
          <code>small</code> e <code>medium</code> vira folha inferior, alinhada ao fim da tela;{' '}
          <code>large</code> e <code>extended</code> continuam centralizados.
        </li>
        <li>
          <strong>Notificações.</strong> O Toast ocupa a largura toda abaixo de{' '}
          <strong>640px</strong> e reorganiza título, ações e botão de dispensar em{' '}
          <strong>420px</strong>.
        </li>
        <li>
          <strong>Moldura.</strong> Header em <strong>768px</strong>; Footer em{' '}
          <strong>1200px</strong>, <strong>720px</strong> e <strong>420px</strong>; Breadcrumb em{' '}
          <strong>640px</strong>, onde cada rótulo passa a ser limitado a 160px; ListItem reduz
          espaçamento e tipografia em <strong>640px</strong>.
        </li>
      </ul>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">
          <code>hideBelow</code> não usa os valores dos tokens de breakpoint
        </p>
        <p>
          Na DataTable, <code>sm</code> vale 640px, <code>md</code> vale 720px e <code>lg</code> vale
          920px. Os tokens de mesmo nome valem 640px, 900px e 1200px. Quem escreve{' '}
          <code>hideBelow=&quot;lg&quot;</code> esperando 1200px vai ver a coluna sumir só abaixo de
          920px. Ver <Link href="/fundamentos/grid-e-layout">Grid e layout</Link>.
        </p>
      </div>

      <h2 id="variacoes">Variações</h2>

      <h3 id="variacao-abas">Solicitar e acompanhar na mesma página</h3>
      <p>
        Quando o serviço aceita novo pedido e acompanhamento no mesmo lugar, use{' '}
        <Link href="/componentes/tabs">Tabs</Link> com duas abas. A aba de acompanhamento é a
        selecionada por padrão para quem já tem pedido. Cada aba tem uma ação principal só — não
        empilhe dois botões primários.
      </p>

      <h3 id="variacao-concluido">Serviço concluído</h3>
      <p>
        O Stepper entra em <code>completed</code>, a região 6 deixa de pedir ação e passa a dizer o
        que a pessoa recebeu, e a região 10 sobe para logo abaixo da situação — porque é o que ela
        veio buscar. O histórico continua disponível, mais abaixo.
      </p>

      <h3 id="variacao-pendencia">Pedido com pendência</h3>
      <p>
        A pendência é o assunto da página: <Link href="/componentes/alert">Alert</Link> com{' '}
        <code>variant=&quot;error&quot;</code> e <code>dismissible=&#123;false&#125;</code> na região
        4, e a região 6 com o botão que resolve. Diga o prazo e o que acontece se ele passar. Não
        esconda pendência dentro do histórico.
      </p>

      <h3 id="variacao-sem-login">Acompanhamento sem conta</h3>
      <p>
        Quando o serviço permite consultar por número de protocolo, a página começa com o campo de
        consulta e só mostra as regiões 3 a 10 depois da consulta bem-sucedida. Sem resultado, mostre
        o estado vazio explicando as duas causas possíveis: número errado ou pedido de outro
        serviço.
      </p>

      <h3 id="variacao-multiplos">Pessoa com vários pedidos</h3>
      <p>
        A entrada passa a ser o <Link href="/templates/painel">painel</Link>, e esta página vira o
        detalhe de um item. Mantenha a trilha até o painel, para que o caminho de volta continue
        existindo.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns na página de serviço, consequência e correção
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
              <th scope="row">Situação abaixo do histórico</th>
              <td>
                A pessoa rola a página inteira para descobrir uma informação de três palavras.
              </td>
              <td>Situação e próxima ação ficam acima da dobra, nas regiões 3, 5 e 6.</td>
            </tr>
            <tr>
              <th scope="row">Stepper desenhado como navegação</th>
              <td>A pessoa clica numa etapa anterior e nada acontece.</td>
              <td>O Stepper só informa. O caminho para as demais etapas é o Accordion da região 7.</td>
            </tr>
            <tr>
              <th scope="row">Situação indicada só por cor</th>
              <td>Quem não distingue as cores não sabe se o pedido foi deferido ou negado.</td>
              <td>Badge com texto. Cor nunca é o único portador de significado.</td>
            </tr>
            <tr>
              <th scope="row">Histórico em linguagem de sistema</th>
              <td>
                “Status alterado para 3” não diz nada a quem está esperando um documento.
              </td>
              <td>Escreva o que aconteceu do ponto de vista da pessoa, com data.</td>
            </tr>
            <tr>
              <th scope="row">Linha da tabela clicável sem alternativa</th>
              <td>
                Quem usa teclado não consegue abrir o detalhe: <code>onRowClicked</code> não tem
                equivalente de teclado e a linha não é focável.
              </td>
              <td>Coloque um Button ou Link dentro de uma coluna de ação.</td>
            </tr>
            <tr>
              <th scope="row">Protocolo sem forma de guardar</th>
              <td>A pessoa fotografa a tela porque não há como copiar nem baixar.</td>
              <td>Ação de copiar com Toast de confirmação, e comprovante para baixar.</td>
            </tr>
            <tr>
              <th scope="row">Pendência só por e-mail</th>
              <td>
                Quem não recebeu o e-mail nunca descobre que o pedido está parado esperando por ela.
              </td>
              <td>A pendência aparece na página, na região 4, com a ação que a resolve.</td>
            </tr>
            <tr>
              <th scope="row">Página inteira em carregamento</th>
              <td>
                Uma consulta lenta de histórico esconde a situação do pedido, que já estava
                disponível.
              </td>
              <td>Carregue por região, com Skeleton só na região que ainda não chegou.</td>
            </tr>
            <tr>
              <th scope="row">Prazo escrito como promessa vaga</th>
              <td>“Em breve” não permite à pessoa saber se deve esperar ou reclamar.</td>
              <td>Publique o prazo da norma do serviço, ou diga que não há prazo definido.</td>
            </tr>
            <tr>
              <th scope="row">Informação essencial dentro de Tooltip</th>
              <td>
                Em toque, a dica é difícil de acionar; o conteúdo desaparece ao mover o ponteiro.
              </td>
              <td>Tooltip é para termo secundário. O essencial fica no texto.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="pendencias">Pendências deste template</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de linha do tempo, de bloco de protocolo
        nem de comprovante para download — fonte: time. As regiões 9 e 10 são montadas hoje com
        DataTable, ListItem e marcação própria de cada produto. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a DataTable não tem teste axe, não implementa navegação por
        teclado própria e não expõe equivalente de teclado para <code>onRowClicked</code>; o Stepper,
        o Alert, o Toast, o Badge, o Chip e a Pagination também não têm teste axe. Neles o teste
        manual é obrigatório. Ver <Link href="/fundamentos/acessibilidade">Acessibilidade</Link> —
        fonte: repositório. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o Accordion não tem modo controlado — só aceita{' '}
        <code>defaultExpanded</code>, com estado interno. Abrir a etapa atual por código depois que a
        página carrega não é possível com a API atual — fonte: repositório. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
