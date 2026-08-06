import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Painel',
  description:
    'Template do painel de acompanhamento de protocolos e solicitações: busca, filtros, tabela de dados, paginação e os estados de carregamento, vazio e erro.',
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
      'Identificação do portal e da conta. No painel a pessoa está sempre autenticada, então o Header mostra o menu da conta.',
    componentes: [
      { slug: 'header', nome: 'Header' },
      { slug: 'avatar', nome: 'Avatar' },
    ],
    nota: 'A prop user recebe o avatar; sem imagem, o Avatar usa as iniciais.',
  },
  {
    regiao: '2. Trilha',
    conteudo: 'Portal e painel. Quando a pessoa abre o detalhe de um registro, a trilha volta até aqui.',
    componentes: [{ slug: 'breadcrumb', nome: 'Breadcrumb' }],
  },
  {
    regiao: '3. Identificação e ação principal',
    conteudo:
      'Título do painel em h1 e o botão que cria um registro novo. Uma ação primária só, no canto oposto ao título.',
    componentes: [
      { slug: 'button', nome: 'Button' },
      { slug: 'divider', nome: 'Divider' },
    ],
  },
  {
    regiao: '4. Aviso do momento',
    conteudo:
      'Só quando há algo que exige reação em todo o conjunto: pendência em vários registros, prazo geral, sistema em manutenção.',
    componentes: [{ slug: 'alert', nome: 'Alert' }],
    nota: 'Região opcional. Pendência de um registro só fica na linha dele.',
  },
  {
    regiao: '5. Resumo por situação',
    conteudo:
      'Quantos registros em cada situação — em análise, com pendência, concluídos. Clicar em um resumo aplica o filtro correspondente.',
    componentes: [
      { slug: 'action-card', nome: 'ActionCard' },
      { slug: 'badge', nome: 'Badge' },
    ],
    nota: 'Região opcional. Com onClick ou href o ActionCard vira botão ou link.',
  },
  {
    regiao: '6. Busca',
    conteudo:
      'Um campo para encontrar por número de protocolo, nome ou documento. Diga no texto de apoio o que ele procura.',
    componentes: [{ slug: 'text-input', nome: 'TextInput' }],
    nota: 'type="search". Ver o padrão de Busca.',
  },
  {
    regiao: '7. Filtros',
    conteudo:
      'Situação, período e órgão. Os filtros aplicados ficam visíveis como pílulas removíveis, com a contagem do resultado.',
    componentes: [
      { slug: 'dropdown', nome: 'Dropdown' },
      { slug: 'datepicker', nome: 'Datepicker' },
      { slug: 'chip', nome: 'Chip' },
      { slug: 'button', nome: 'Button' },
    ],
    nota: 'Datepicker em mode="range" para período. Ver o padrão de Filtros.',
  },
  {
    regiao: '8. Lista de registros',
    conteudo:
      'Uma linha por registro: número, o que é, quando entrou, situação e a ação disponível. Ordenável pelas colunas que importam.',
    componentes: [
      { slug: 'data-table', nome: 'DataTable' },
      { slug: 'badge', nome: 'Badge' },
      { slug: 'button', nome: 'Button' },
    ],
    nota: 'keyField estável; sortAccessor nas colunas que renderizam Badge ou data formatada.',
  },
  {
    regiao: '9. Paginação',
    conteudo:
      'Onde a pessoa está na lista e como avançar. Mostre o intervalo exibido e o total, não só o número da página.',
    componentes: [{ slug: 'pagination', nome: 'Pagination' }],
    nota: 'showRange para o “1 – 20 de 137”. Ver o padrão de Paginação.',
  },
  {
    regiao: '10. Estados da lista',
    conteudo:
      'Carregando, sem nenhum registro ainda, sem resultado para o filtro e erro ao carregar. Quatro telas diferentes, não uma.',
    componentes: [
      { slug: 'skeleton', nome: 'Skeleton' },
      { slug: 'spinner', nome: 'Spinner' },
      { slug: 'alert', nome: 'Alert' },
    ],
    nota: 'progressComponent e noDataComponent da DataTable recebem esses blocos.',
  },
  {
    regiao: '11. Ações sobre os registros',
    conteudo:
      'Abrir o detalhe, baixar comprovante e, quando fizer sentido, agir em lote sobre as linhas selecionadas.',
    componentes: [
      { slug: 'button', nome: 'Button' },
      { slug: 'modal', nome: 'Modal' },
      { slug: 'toast', nome: 'Toast' },
    ],
    nota: 'Modal confirma o que é irreversível; Toast confirma o que deu certo.',
  },
  {
    regiao: '12. Rodapé',
    conteudo: 'Navegação secundária, links legais e informação institucional.',
    componentes: [{ slug: 'footer', nome: 'Footer' }],
  },
  {
    regiao: '13. Apoios de página',
    conteudo: 'Retorno ao topo em lista longa e aviso de cookies na primeira visita.',
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

export default function PaginaTemplatePainel() {
  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Templates', href: '/templates/visao-geral' }, { titulo: 'Painel' }]}
      />

      <h1>Painel</h1>
      <p className="wiki-prosa__resumo">
        É a página de quem tem muitos registros para acompanhar: protocolos, solicitações, processos.
        Ela responde a uma pergunta antes de qualquer outra —{' '}
        <em>tem alguma coisa esperando por mim?</em> — e só depois oferece a lista completa.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <h2 id="para-que-serve">Para que serve</h2>
      <p>
        Dois públicos usam este template. A pessoa que tem alguns pedidos abertos e quer saber se
        algum travou. E quem trabalha no serviço, que abre a mesma tela dezenas de vezes por dia,
        precisa filtrar por situação e agir em várias linhas de uma vez. Os dois casos têm a mesma
        estrutura; o que muda é a densidade e o volume.
      </p>
      <p>
        O painel <strong>não é o detalhe</strong>. Ele lista, ordena, filtra e leva para a{' '}
        <Link href="/templates/pagina-de-servico">página de serviço</Link>, onde cada registro é
        tratado. Tentar resolver tudo dentro da tabela produz uma tela que não funciona em celular e
        que ninguém consegue auditar.
      </p>

      <h3 id="quando-usar">Use quando</h3>
      <ul>
        <li>Há muitos registros do mesmo tipo, com atributos comparáveis entre linhas.</li>
        <li>A pessoa precisa filtrar, ordenar ou procurar antes de escolher um registro.</li>
        <li>A situação de cada registro muda com o tempo e precisa ser vista de relance.</li>
        <li>Existe ação repetida sobre vários registros.</li>
      </ul>

      <h3 id="quando-nao-usar">Não use quando</h3>
      <ul>
        <li>
          <strong>A pessoa tem um ou dois registros.</strong> Uma tabela com duas linhas é mais
          trabalho de leitura do que dois blocos de texto. Leve direto para a página de serviço.
        </li>
        <li>
          <strong>O conteúdo é editorial.</strong> Notícias, serviços e conteúdo com imagem são
          grade de <Link href="/componentes/card">Card</Link>, não tabela.
        </li>
        <li>
          <strong>Não há o que comparar entre linhas.</strong> Se cada item tem campos diferentes, a
          tabela fica cheia de células vazias. Use{' '}
          <Link href="/componentes/list-item">ListItem</Link>.
        </li>
      </ul>

      <h2 id="estrutura">Estrutura da página</h2>
      <p>
        Na ordem vertical. A sequência tem uma lógica: primeiro o que já está resolvido pelo sistema
        (o resumo), depois o que a pessoa faz para reduzir a lista (busca e filtros), e só então a
        lista.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Regiões do painel, conteúdo de cada uma e componentes usados
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

      <h3 id="colunas">Quantas colunas</h3>
      <p>
        Cinco a sete colunas é o limite prático de uma tabela que ainda se lê. Comece pelas que
        respondem à pergunta de quem abre a página: identificador, o que é, quando, situação e ação.
        Tudo além disso vai para o detalhe.
      </p>
      <ul>
        <li>
          <strong>Marque o que pode sumir.</strong> A prop <code>hideBelow</code> de cada coluna
          aceita <code>sm</code>, <code>md</code> e <code>lg</code>. Use só para informação
          secundária — nunca para a situação nem para o identificador.
        </li>
        <li>
          <strong>Ordenação que respeita o conteúdo.</strong> Quando a célula renderiza um Badge,
          uma data formatada ou um valor em moeda, informe <code>sortAccessor</code>: sem ele, a
          ordenação usa o que foi renderizado, não o dado.
        </li>
        <li>
          <strong>Chave estável.</strong> <code>keyField</code> é o que sustenta seleção, expansão e
          paginação. Índice de array não serve.
        </li>
        <li>
          <strong>Ordenação e paginação no servidor.</strong> Em volume grande, ligue{' '}
          <code>sortServer</code> e <code>paginationServer</code> e informe{' '}
          <code>paginationTotalRows</code> — sem isso, a tabela ordena e pagina só o que já está na
          tela.
        </li>
      </ul>

      <h3 id="estados">Os quatro estados da lista</h3>
      <p>
        São situações diferentes, com textos diferentes. Tratar as quatro como “nenhum resultado” é o
        erro mais comum deste template. Ver{' '}
        <Link href="/padroes/estados-vazios">Estados vazios</Link>.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Os quatro estados da lista do painel e o que mostrar em cada um
          </caption>
          <thead>
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">O que mostrar</th>
              <th scope="col">Como</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Carregando</th>
              <td>A silhueta da tabela, para não haver salto de layout quando os dados chegam.</td>
              <td>
                <code>progressPending</code> com um <Link href="/componentes/skeleton">Skeleton</Link>{' '}
                em <code>progressComponent</code>
              </td>
            </tr>
            <tr>
              <th scope="row">Ainda não há nada</th>
              <td>
                Que o painel está vazio porque a pessoa ainda não criou nenhum registro, e o botão
                que cria o primeiro.
              </td>
              <td>
                <code>noDataComponent</code>, com a mesma ação primária da região 3
              </td>
            </tr>
            <tr>
              <th scope="row">Nada para este filtro</th>
              <td>
                Quais filtros estão aplicados e como limpá-los. A pessoa precisa saber que o
                conteúdo existe, mas está escondido pelo próprio filtro.
              </td>
              <td>
                <code>noDataComponent</code>, com os <Link href="/componentes/chip">Chip</Link> de
                filtro ainda visíveis acima
              </td>
            </tr>
            <tr>
              <th scope="row">Erro ao carregar</th>
              <td>O que houve, que não é culpa de quem está lendo, e o caminho para tentar de novo.</td>
              <td>
                <Link href="/componentes/alert">Alert</Link> com{' '}
                <code>variant=&quot;error&quot;</code> no lugar da tabela
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="grade-e-responsividade">Grade e responsividade</h2>
      <p>
        O painel é a página que mais sofre em tela estreita, porque a tabela é o formato menos
        adaptável que existe. A boa notícia é que a DataTable já resolve o caso mais difícil sozinha.
      </p>
      <ul>
        <li>
          <strong>Tabela.</strong> Em <strong>920px</strong> o espaço interno das células diminui e
          as colunas com <code>hideBelow=&quot;lg&quot;</code> somem. Em <strong>720px</strong> somem
          as de <code>hideBelow=&quot;md&quot;</code> e a paginação passa a esticar. Em{' '}
          <strong>640px</strong> a tabela vira uma pilha de cards: o cabeçalho fica visualmente
          oculto e cada célula passa a exibir o rótulo da própria coluna.
        </li>
        <li>
          <strong>Paginação.</strong> Em <strong>720px</strong> vira coluna. Em{' '}
          <strong>640px</strong> os alvos de toque crescem para 48px e somem o seletor de página, os
          controles de primeira e última página e as reticências — sobram anterior, próxima e a
          página atual. Em <strong>420px</strong> o espaço entre controles diminui de novo.
        </li>
        <li>
          <strong>Filtros.</strong> Em tela estreita eles empilham e ocupam a largura toda —{' '}
          <code>fullWidth</code> já vem ligado em Dropdown, Datepicker e TextInput. Os Chip de filtro
          aplicado não têm ponto de quebra: eles quebram linha e truncam o rótulo.
        </li>
        <li>
          <strong>Resumo por situação.</strong> A grade de ActionCard acompanha a largura. Não
          reduza tanto a ponto de o número e o rótulo ficarem em três linhas.
        </li>
        <li>
          <strong>Ações.</strong> Abaixo de <strong>768px</strong> o Modal <code>small</code> e{' '}
          <code>medium</code> vira folha inferior. O Toast ocupa a largura toda abaixo de{' '}
          <strong>640px</strong> e reorganiza suas partes em <strong>420px</strong>.
        </li>
        <li>
          <strong>Moldura.</strong> Header em <strong>768px</strong>; Footer em{' '}
          <strong>1200px</strong>, <strong>720px</strong> e <strong>420px</strong>; Breadcrumb em{' '}
          <strong>640px</strong>; BackToTop em <strong>640px</strong> e <strong>420px</strong>.
        </li>
      </ul>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Dois números que não conferem entre si</p>
        <p>
          A paginação interna da DataTable começa com 10 itens por página e oferece as opções 5, 10,
          20 e 50. A Pagination usada de forma independente começa com 20 e oferece 10, 20, 50 e 100.
          São dois padrões diferentes para a mesma decisão: se o painel usa os dois em telas
          distintas, alinhe os valores explicitamente. Além disso,{' '}
          <code>hideBelow</code> usa 640px, 720px e 920px para <code>sm</code>, <code>md</code> e{' '}
          <code>lg</code>, enquanto os tokens de mesmo nome valem 640px, 900px e 1200px. Ver{' '}
          <Link href="/fundamentos/grid-e-layout">Grid e layout</Link>.
        </p>
      </div>

      <h2 id="variacoes">Variações</h2>

      <h3 id="variacao-cidadao">Painel do cidadão</h3>
      <p>
        Poucos registros, alta importância cada um. Corte a região 5, mantenha três ou quatro
        colunas e use a densidade padrão da tabela. Quando forem menos de dez registros, a busca e os
        filtros também saem: eles só existem para reduzir uma lista que a pessoa não consegue
        percorrer com os olhos.
      </p>

      <h3 id="variacao-servidor">Painel de quem opera o serviço</h3>
      <p>
        Muitos registros e uso diário. Aqui entram <code>dense</code> para caber mais linhas na
        tela, <code>striped</code> para facilitar a leitura horizontal e{' '}
        <code>selectableRows</code> para ação em lote. Mantenha{' '}
        <code>persistTableHead</code> ligado, para que o cabeçalho continue visível durante a
        rolagem, e prefira ordenação e paginação no servidor.
      </p>

      <h3 id="variacao-abas">Painel dividido por situação</h3>
      <p>
        Quando quase toda visita começa por “o que está pendente”, use{' '}
        <Link href="/componentes/tabs">Tabs</Link> com uma aba por situação, e a de pendências como
        aba inicial. Cada aba tem sua própria paginação. Não use aba e filtro de situação ao mesmo
        tempo — a pessoa não vai saber qual dos dois está valendo.
      </p>

      <h3 id="variacao-detalhe-inline">Detalhe sem sair da lista</h3>
      <p>
        Para informação curta de conferência, <code>expandableRows</code> abre um bloco abaixo da
        linha; o botão de expandir tem <code>aria-expanded</code> e{' '}
        <code>aria-controls</code>. Para o registro inteiro, leve para a página de serviço: bloco
        expandido não é endereçável, não pode ser compartilhado e não sobrevive ao recarregar.
      </p>

      <h3 id="variacao-lista">Painel sem tabela</h3>
      <p>
        Quando os registros não têm atributos comparáveis, troque a região 8 por uma lista de{' '}
        <Link href="/componentes/list-item">ListItem</Link>, com o identificador no título, a
        situação no slot inicial e a ação no final. A busca, os filtros e a paginação continuam
        iguais.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns no painel, consequência e correção
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
              <th scope="row">Uma coluna para cada campo do banco</th>
              <td>
                Quinze colunas: rolagem horizontal no desktop e, no celular, um card com quinze
                linhas.
              </td>
              <td>Cinco a sete colunas. O resto vai para o detalhe.</td>
            </tr>
            <tr>
              <th scope="row">Linha inteira clicável como única saída</th>
              <td>
                Quem usa teclado não abre o registro: <code>onRowClicked</code> não tem equivalente
                de teclado e a linha não é focável.
              </td>
              <td>Uma coluna de ação com Button ou Link em cada linha.</td>
            </tr>
            <tr>
              <th scope="row">Um só texto para lista vazia</th>
              <td>
                “Nenhum resultado” aparece tanto para quem nunca criou nada quanto para quem filtrou
                demais.
              </td>
              <td>Quatro estados, quatro textos, com a ação certa em cada um.</td>
            </tr>
            <tr>
              <th scope="row">Filtro aplicado invisível</th>
              <td>
                A pessoa jura que o registro sumiu, quando ele só está fora do período selecionado.
              </td>
              <td>Chip para cada filtro ativo, removível, acima da lista.</td>
            </tr>
            <tr>
              <th scope="row">Situação indicada só por cor</th>
              <td>Quem não distingue as cores não separa deferido de indeferido.</td>
              <td>Badge com texto em cada linha.</td>
            </tr>
            <tr>
              <th scope="row">Ordenar por célula formatada</th>
              <td>
                A coluna de data ordena em ordem alfabética do texto e “10/01” vem antes de “02/02”.
              </td>
              <td>
                Informe <code>sortAccessor</code> com o dado bruto.
              </td>
            </tr>
            <tr>
              <th scope="row">Paginar no cliente com muitos registros</th>
              <td>
                A tabela pagina só o que já foi baixado e mostra um total que não corresponde à base.
              </td>
              <td>
                <code>paginationServer</code> com <code>paginationTotalRows</code>, e{' '}
                <code>sortServer</code> junto.
              </td>
            </tr>
            <tr>
              <th scope="row">Paginação sem intervalo</th>
              <td>“Página 3” não diz quantos registros existem nem onde a pessoa está.</td>
              <td>
                Ligue <code>showRange</code> para exibir o intervalo e o total.
              </td>
            </tr>
            <tr>
              <th scope="row">Ação em lote sem confirmação</th>
              <td>Um clique aplica uma mudança irreversível em quarenta registros.</td>
              <td>Modal dizendo quantos registros serão afetados e o que vai acontecer.</td>
            </tr>
            <tr>
              <th scope="row">Esconder a situação em telas pequenas</th>
              <td>
                O painel perde justamente a informação que a pessoa veio buscar. <code>hideBelow</code>{' '}
                é para o secundário.
              </td>
              <td>Mantenha identificador e situação em todas as larguras.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="pendencias">Pendências deste template</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a DataTable não tem teste axe, não implementa navegação por
        teclado própria e não expõe equivalente de teclado para <code>onRowClicked</code>. Pagination,
        Alert, Badge, Chip, Skeleton, Spinner, Toast, ActionCard, Avatar, Header, Footer e Breadcrumb
        também não têm teste axe — neles o teste manual é obrigatório. Ver{' '}
        <Link href="/fundamentos/acessibilidade">Acessibilidade</Link> — fonte: repositório.
        Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de barra de filtros, de estado vazio nem
        de resumo em números — fonte: time. As regiões 5, 7 e 10 são montadas hoje com peças soltas e
        marcação própria de cada produto. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> os temas da DataTable (<code>default</code>,{' '}
        <code>material</code>, <code>rounded</code>, <code>catppuccin</code> e <code>crisp</code>)
        não correspondem a nenhuma nomenclatura documentada do Figma, e não há regra dizendo qual
        deles um serviço do Estado deve usar. Enquanto não houver decisão, use{' '}
        <code>default</code> — fonte: repositório e Figma. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o resumo da paginação no celular fica sempre no DOM e continua
        exposto a leitores de tela também no desktop; o comportamento não está documentado — fonte:
        repositório. Registrado em <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
