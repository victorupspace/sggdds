import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { obterComponente } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Tabela de dados',
  description:
    'Padrão de tabela de dados em serviço público: quais colunas mostrar, ordenação, seleção, ações por linha, densidade e o comportamento empilhado no celular.',
};

export default function PaginaPadraoTabelaDeDados() {
  const dataTable = obterComponente('data-table');
  const totalProps = dataTable?.props.length ?? 0;

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Padrões', href: '/padroes/visao-geral' },
          { titulo: 'Tabela de dados' },
        ]}
      />

      <h1>Tabela de dados</h1>
      <p className="wiki-prosa__resumo">
        Tabela é para comparar registros linha a linha. Este padrão define quais colunas entram, como
        ordenar, quando permitir seleção, onde ficam as ações, qual densidade usar e o que acontece
        quando a tela encolhe — porque no celular o{' '}
        <Link href="/componentes/data-table">DataTable</Link> deixa de ser tabela e vira uma pilha de
        cartões.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Base deste padrão</p>
        <p>
          O <Link href="/componentes/data-table">DataTable</Link> existe e tem {totalProps} props.
          Este padrão é a orientação de uso, que não existia em lugar nenhum — nem no Figma, nem no
          Storybook. Todo o conteúdo abaixo é novo e precisa de validação do time. Os comportamentos
          técnicos citados foram lidos do código do componente.
        </p>
      </div>

      <h2 id="o-problema">O problema</h2>
      <p>
        A pessoa acompanha vários registros do mesmo tipo: protocolos, pedidos, veículos, matrículas.
        Ela precisa responder perguntas de comparação, não de leitura: qual está parado há mais
        tempo, quais já foram deferidos, quais vencem esta semana. Uma lista de cartões não responde
        isso — ela obriga a percorrer item por item e guardar os valores de cabeça.
      </p>
      <p>Tabela mal construída troca um problema por outro:</p>
      <ul>
        <li>Vinte colunas com rolagem horizontal, e a coluna que identifica a linha some da vista.</li>
        <li>Ordenação que reordena a página atual e não o conjunto inteiro.</li>
        <li>Seleção em massa que a pessoa acha que pegou tudo, mas pegou só a página.</li>
        <li>No celular, uma tabela espremida com texto de 10px que ninguém lê.</li>
      </ul>

      <h2 id="quando-usar">Quando usar</h2>
      <ul>
        <li>
          Os registros são do mesmo tipo e têm os mesmos atributos preenchidos. A comparação vertical
          é o que a pessoa vem fazer.
        </li>
        <li>Existem pelo menos três atributos relevantes por registro, além do identificador.</li>
        <li>Ordenar por um atributo muda a decisão da pessoa — data, valor, prazo, status.</li>
        <li>A pessoa precisa agir sobre vários registros ao mesmo tempo.</li>
        <li>O total passa de algumas dezenas e precisa de paginação.</li>
      </ul>

      <h2 id="quando-nao-usar">Quando não usar</h2>
      <ul>
        <li>
          Cada item tem conteúdo editorial próprio — imagem, texto longo, chamada. Use{' '}
          <Link href="/componentes/card">Card</Link>.
        </li>
        <li>
          A lista é de opções ou de navegação, com título e descrição. Use{' '}
          <Link href="/componentes/list-item">ListItem</Link>.
        </li>
        <li>
          Só há dois atributos por item e nenhum deles é ordenado. Uma lista simples lê melhor e
          responde melhor no celular.
        </li>
        <li>
          O conteúdo é um documento com estrutura de linhas e colunas fixa — um comparativo, uma
          grade de preços. Isso é uma tabela de conteúdo, escrita em HTML, não um DataTable.
        </li>
        <li>
          A pessoa vai preencher a grade. O DataTable não é um editor: não há navegação por teclado
          entre células (sem <em>grid navigation</em>).
        </li>
      </ul>

      <h2 id="composicao">Composição</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes usados no padrão de tabela de dados e o papel de cada um
          </caption>
          <thead>
            <tr>
              <th scope="col">Componente</th>
              <th scope="col">Papel no padrão</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link href="/componentes/data-table">DataTable</Link>
              </td>
              <td>
                A tabela. Traz ordenação, seleção, expansão, paginação e o layout empilhado de
                celular.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/pagination">Pagination</Link>
              </td>
              <td>
                Já vem embutido quando <code>pagination</code> é <code>true</code>, com faixa de
                resultados, seletor de linhas por página e controles de primeira e última.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/checkbox">Checkbox</Link>
              </td>
              <td>
                Usado internamente na seleção de linhas, com estado <code>indeterminate</code> no
                cabeçalho.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/badge">Badge</Link>
              </td>
              <td>Status da linha na célula. Texto sempre presente — o ícone é decorativo.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/button">Button</Link>
              </td>
              <td>Ação principal por linha e ações em lote sobre a seleção.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/link">Link</Link>
              </td>
              <td>
                O identificador da linha, quando ele leva ao detalhe. É o alvo de clique previsível.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/dropdown">Dropdown</Link> e{' '}
                <Link href="/componentes/text-input">TextInput</Link>
              </td>
              <td>
                Filtros e busca no slot <code>actions</code> do toolbar. Ver{' '}
                <Link href="/padroes/filtros">Filtros</Link>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/skeleton">Skeleton</Link> e{' '}
                <Link href="/componentes/spinner">Spinner</Link>
              </td>
              <td>
                Conteúdo do <code>progressComponent</code> enquanto <code>progressPending</code> é{' '}
                <code>true</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/alert">Alert</Link>
              </td>
              <td>Erro de carregamento acima da tabela, com a ação de tentar de novo.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/toast">Toast</Link>
              </td>
              <td>Confirmação de uma ação em lote que já terminou.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/modal">Modal</Link>
              </td>
              <td>Confirmação antes de uma ação em lote irreversível.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/tooltip">Tooltip</Link>
              </td>
              <td>
                Explicação de um cabeçalho abreviado. Nunca para informação essencial — Tooltip é
                microcopy não essencial.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="anatomia-do-fluxo">Anatomia do fluxo</h2>
      <ol>
        <li>
          <strong>A pessoa chega e lê o título da tabela.</strong> Ele diz de que conjunto se trata:
          “Meus protocolos”. Vai no slot <code>title</code>.
        </li>
        <li>
          <strong>Ela vê quantos registros existem.</strong> A contagem fica no{' '}
          <code>subHeader</code> ou na faixa de resultados da paginação.
        </li>
        <li>
          <strong>Ela varre a primeira coluna.</strong> É por ela que a pessoa localiza o registro que
          tem no papel. Por isso o identificador vem primeiro, sempre.
        </li>
        <li>
          <strong>Ela cruza com o status.</strong> Em duas colunas — identificador e status — a
          maioria das visitas já se resolve.
        </li>
        <li>
          <strong>Ela reordena, se precisar.</strong> Clica no cabeçalho da coluna de data ou de valor.
          A tabela volta para a primeira página.
        </li>
        <li>
          <strong>Ela restringe, se ainda estiver grande.</strong> Filtros e busca ficam no slot{' '}
          <code>actions</code> do toolbar. Ver <Link href="/padroes/filtros">Filtros</Link>.
        </li>
        <li>
          <strong>Ela age.</strong> Abre um registro pelo identificador, ou usa a ação da última
          coluna. Se a ação vale para vários registros, ela marca as linhas e a contagem selecionada
          aparece acima da tabela, junto das ações em lote.
        </li>
        <li>
          <strong>Ela avança de página</strong> e a lista recomeça do primeiro item, com os mesmos
          filtros e a mesma ordenação. Ver <Link href="/padroes/paginacao">Paginação</Link>.
        </li>
        <li>
          <strong>No celular, o passo 3 muda.</strong> Não há colunas: cada registro vira uma ficha em
          que todo valor vem precedido do nome do campo. A varredura deixa de ser vertical e vira
          leitura ficha a ficha — por isso o número de campos por linha importa tanto.
        </li>
      </ol>

      <h2 id="colunas">Quais colunas mostrar</h2>
      <p>
        A pergunta certa não é “o que temos no banco”, é “o que a pessoa precisa para decidir se abre
        esta linha”. Em serviço público, quase toda tabela cabe em cinco colunas:
      </p>
      <ol>
        <li>
          <strong>Identificador.</strong> Número do protocolo, do pedido, da matrícula. Primeira
          coluna, sempre. É por ele que a pessoa confere no papel que tem na mão e é ele que ela leva
          para o telefone do atendimento.
        </li>
        <li>
          <strong>Assunto ou tipo.</strong> O que é aquele registro em uma frase curta. Sem isso, uma
          lista de números não diz nada.
        </li>
        <li>
          <strong>Status.</strong> Em <Link href="/componentes/badge">Badge</Link>, com texto. Sempre
          o vocabulário do serviço, nunca o código interno do sistema.
        </li>
        <li>
          <strong>Data que importa.</strong> Uma só. Escolha entre abertura, atualização e prazo,
          conforme a decisão que a pessoa toma nesta tela. Duas datas na mesma tabela confundem.
        </li>
        <li>
          <strong>Ação.</strong> A última coluna, alinhada à direita, com um verbo.
        </li>
      </ol>
      <p>Regras de corte:</p>
      <ul>
        <li>
          Se a coluna tem o mesmo valor em quase todas as linhas, ela não é coluna: é contexto do
          título da tabela.
        </li>
        <li>
          Se a coluna só serve para uma minoria de casos, ela vai para o detalhe da linha — expansão
          ou página de detalhe.
        </li>
        <li>
          Se a coluna é um id técnico que a pessoa nunca vai usar, ela não entra. Use{' '}
          <code>omit: true</code> em vez de comentar a definição.
        </li>
        <li>
          <code>hideBelow</code> aceita <code>sm</code>, <code>md</code> e <code>lg</code>. Uma coluna
          com <code>hideBelow=&quot;lg&quot;</code> some abaixo de 920px;{' '}
          <code>hideBelow=&quot;md&quot;</code> some abaixo de 720px. Abaixo de 640px,{' '}
          <strong>qualquer coluna com <code>hideBelow</code> desaparece</strong>, inclusive as de{' '}
          <code>sm</code>. Informação essencial nunca vai numa coluna com <code>hideBelow</code>.
        </li>
        <li>
          Prefira <code>selector</code> para valores simples e <code>cell</code> só quando precisar
          renderizar um Badge, um Link ou um valor formatado.
        </li>
      </ul>

      <h2 id="ordenacao">Ordenação</h2>
      <ul>
        <li>
          Marque como <code>sortable</code> apenas as colunas em que ordenar responde uma pergunta
          real. Data e valor, quase sempre. Status, raramente — a ordem alfabética dos rótulos não
          significa nada.
        </li>
        <li>
          Defina a ordem inicial com <code>defaultSortColumnId</code>. O padrão de{' '}
          <code>defaultSortDirection</code> é <code>asc</code>; para listas de acompanhamento, o mais
          recente primeiro costuma ser <code>desc</code>.
        </li>
        <li>
          Quando a célula renderiza Badge, moeda ou data formatada, forneça{' '}
          <code>sortAccessor</code>. Sem ele, a ordenação usa o que foi renderizado e ordena texto,
          não valor: “10/01” vem antes de “09/12”.
        </li>
        <li>
          Com paginação de servidor, use <code>sortServer</code> e ordene no back-end. Ordenar só a
          página atual dá a impressão de que a lista está ordenada quando não está — é o erro mais
          caro deste padrão.
        </li>
        <li>
          Trocar a ordenação volta para a página 1 automaticamente quando{' '}
          <code>paginationPage</code> não é controlado. Se você controla a página, faça isso à mão.
        </li>
        <li>
          Só a coluna ativa recebe <code>aria-sort</code>. É o comportamento correto: as demais não
          declaram ordenação nenhuma.
        </li>
      </ul>

      <h2 id="selecao">Seleção</h2>
      <ul>
        <li>
          Ative <code>selectableRows</code> apenas quando existir uma ação em lote de verdade. Checkbox
          sem ação em lote é ruído.
        </li>
        <li>
          Defina <code>keyField</code> com uma chave estável do registro. Sem ele, o componente usa{' '}
          <code>row.id</code> e, na falta dele, o índice da linha — e o índice muda ao ordenar ou
          paginar, levando a seleção para a linha errada.
        </li>
        <li>
          O checkbox do cabeçalho seleciona <strong>as linhas visíveis</strong>, não o conjunto
          inteiro. O rótulo padrão diz isso: <code>Selecionar linhas visiveis</code>. Se o serviço
          precisa de “selecionar todos os 320 resultados”, isso é uma ação à parte, fora do
          componente, escrita por extenso.
        </li>
        <li>
          Mostre a contagem selecionada acima da tabela, no slot <code>subHeader</code>, junto das
          ações em lote. <code>onSelectedRowsChange</code> entrega{' '}
          <code>selectedCount</code>, <code>selectedRows</code>, <code>selectedRowKeys</code> e{' '}
          <code>allSelected</code>.
        </li>
        <li>
          Use <code>selectableRowDisabled</code> para linhas que não aceitam a ação. Elas também ficam
          de fora do selecionar tudo.
        </li>
        <li>
          Se você controla a seleção com <code>selectedRowKeys</code>, mantenha o estado sincronizado
          com <code>onSelectedRowsChange</code> — o componente não atualiza o estado interno nesse
          modo.
        </li>
        <li>
          Diga o que acontece com a seleção ao trocar de página. O padrão desta documentação é{' '}
          <strong>manter</strong> e mostrar a contagem total selecionada; se o serviço limpa, avise
          antes.
        </li>
      </ul>

      <h2 id="acoes-por-linha">Ações por linha</h2>
      <ul>
        <li>
          <strong>Uma ação principal por linha.</strong> Última coluna, com <code>right: true</code>,
          verbo no infinitivo: “Ver detalhes”, “Baixar guia”, “Cancelar pedido”.
        </li>
        <li>
          O nome acessível precisa identificar a linha. “Ver detalhes” repetido em trinta linhas é
          inútil em leitor de tela: use <code>ariaLabel</code> no Button com o identificador — “Ver
          detalhes do protocolo 2026-114”.
        </li>
        <li>
          Ação destrutiva não fica na linha sem confirmação. Abra um{' '}
          <Link href="/componentes/modal">Modal</Link> nomeando o registro.
        </li>
        <li>
          <code>onRowClicked</code> torna a linha inteira clicável, mas{' '}
          <strong>a linha não é focável e não existe equivalente por teclado</strong>. Se você usar,
          mantenha sempre um alvo focável dentro da linha — o identificador em{' '}
          <Link href="/componentes/link">Link</Link> ou o botão da coluna de ação — com o mesmo
          destino.
        </li>
        <li>
          Cliques nos controles de seleção e de expansão têm <code>stopPropagation</code> e não
          disparam <code>onRowClicked</code>. Isso é o correto e não precisa ser tratado por você.
        </li>
        <li>
          Detalhe secundário e volumoso vai em <code>expandableRows</code> com{' '}
          <code>expandableRowsComponent</code>. Expansão é para consultar, nunca para esconder a ação
          principal.
        </li>
      </ul>

      <h2 id="densidade">Densidade</h2>
      <p>
        A altura padrão da linha é <code>calc(spacing-64 + spacing-8)</code>, ou seja 72px, com o
        cabeçalho em 64px. Com <code>dense</code>, linha e cabeçalho vão para 56px e o padding
        vertical da célula cai de 16px para 12px.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Quando usar cada densidade e cada recurso visual da tabela
          </caption>
          <thead>
            <tr>
              <th scope="col">Situação</th>
              <th scope="col">Configuração</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Serviço para o público, poucas linhas por página, leitura em celular</td>
              <td>
                Padrão. Sem <code>dense</code>. Alvos de toque maiores e mais respiro.
              </td>
            </tr>
            <tr>
              <td>Painel interno de quem trabalha na mesma tela o dia inteiro</td>
              <td>
                <code>dense</code> com <code>striped</code>, para caber mais linhas sem perder a
                linha de leitura.
              </td>
            </tr>
            <tr>
              <td>Tabela larga, com muitas colunas numéricas</td>
              <td>
                <code>striped</code>. A faixa alternada segura o olho na horizontal melhor do que
                qualquer borda.
              </td>
            </tr>
            <tr>
              <td>Linha inteira clicável</td>
              <td>
                <code>highlightOnHover</code>, que já vem <code>true</code>. Sem ele, a linha clicável
                não se anuncia.
              </td>
            </tr>
            <tr>
              <td>Qualquer tabela</td>
              <td>
                <code>animateRows</code> desligado. Ele já respeita{' '}
                <code>prefers-reduced-motion</code>, mas animação de entrada em lista de dados atrasa
                a leitura sem ganho.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Sobre <code>theme</code>: o componente aceita <code>default</code>, <code>material</code>,{' '}
        <code>rounded</code>, <code>catppuccin</code> e <code>crisp</code>. Em produto do Estado,
        use <code>default</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> os nomes dos temas do DataTable não correspondem a nenhuma
        nomenclatura documentada no Figma, e não há definição de quando cada um se aplica — fonte:
        time. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="celular">O que fazer no celular</h2>
      <p>
        Abaixo de 640px o DataTable troca de forma sozinho: <code>table</code>, <code>thead</code>,{' '}
        <code>tbody</code>, linha e célula viram <code>display: block</code>; o corpo vira uma grade
        de cartões com borda e raio; e{' '}
        <strong>cada célula imprime o rótulo da coluna antes do valor</strong>, com{' '}
        <code>content: attr(data-label)</code>. Não é uma tabela espremida: é uma pilha de fichas.
      </p>
      <p>O que isso exige de você:</p>
      <ol>
        <li>
          <strong>
            <code>name</code> da coluna precisa ser uma <code>string</code>.
          </strong>{' '}
          O <code>data-label</code> sai de <code>column.name</code> quando ele é texto; caso
          contrário, cai para <code>column.ariaLabel</code> e, se nem isso existir, para a palavra
          literal <code>coluna</code>. Cabeçalho montado com JSX e sem <code>ariaLabel</code> produz
          uma ficha em que todo campo se chama “coluna”.
        </li>
        <li>
          <strong>Rótulos curtos.</strong> No empilhado, o rótulo ocupa uma faixa de no máximo 42% da
          largura da ficha. “Data de protocolização” quebra em quatro linhas; “Protocolado em”
          resolve.
        </li>
        <li>
          <strong>O cabeçalho fica visualmente oculto.</strong> Ele continua no DOM, com{' '}
          <code>clip</code>. Consequência direta:{' '}
          <strong>não há botão de ordenar visível no celular</strong>, e{' '}
          <strong>o checkbox de selecionar linhas visíveis também some da tela</strong>, porque os
          dois vivem no <code>thead</code>. Se a pessoa precisa ordenar ou selecionar em massa no
          celular, ofereça esses controles fora da tabela — um{' '}
          <Link href="/componentes/dropdown">Dropdown</Link> “Ordenar por” no slot{' '}
          <code>actions</code>, ligado a <code>sortColumnId</code> e <code>sortDirection</code>.
        </li>
        <li>
          <strong>
            <code>right</code> e <code>center</code> deixam de valer.
          </strong>{' '}
          No empilhado tudo volta a alinhar no início. Não construa significado em cima de
          alinhamento.
        </li>
        <li>
          <strong>Colunas com <code>hideBelow</code> somem por completo.</strong> Não ficam
          escondidas atrás de nada: o dado não aparece na ficha. Se ele importa no celular, ele não
          pode ter <code>hideBelow</code>.
        </li>
        <li>
          <strong>A linha expandida vira um bloco separado</strong> abaixo da ficha, com fundo
          próprio. Conteúdo de expansão precisa fazer sentido sozinho, fora do contexto da linha.
        </li>
        <li>
          <strong>Reduza a página.</strong> Cada linha vira uma ficha alta. Dez fichas já é uma tela
          longa; considere <code>paginationPerPage</code> menor quando o acesso é majoritariamente
          por celular.
        </li>
      </ol>
      <p>
        Entre 920px e 640px o componente ainda é tabela, mas aperta: o padding lateral da célula cai
        para 16px, a largura mínima de coluna diminui e as colunas com{' '}
        <code>hideBelow=&quot;lg&quot;</code> (≤920px) e <code>hideBelow=&quot;md&quot;</code>{' '}
        (≤720px) saem de cena. É nessa faixa que uma tabela de oito colunas fica ilegível.
      </p>

      <h2 id="estados">Estados de carregamento, vazio e erro</h2>
      <ul>
        <li>
          <strong>Carregando:</strong> <code>progressPending</code> substitui as linhas.
          Passe um <code>progressComponent</code> com{' '}
          <Link href="/componentes/skeleton">Skeleton</Link>; o texto padrão é{' '}
          <code>Carregando dados</code>.
        </li>
        <li>
          <strong>Vazio:</strong> <code>noDataComponent</code>. O padrão,{' '}
          <code>Nenhum dado encontrado</code>, não serve para pessoa nenhuma. Escreva por que está
          vazio e o que fazer: “Você ainda não tem protocolos. Abra um pedido para começar.”
        </li>
        <li>
          <strong>Vazio por filtro</strong> é diferente de vazio de verdade. Diga quantos filtros
          estão aplicados e ofereça limpar — ver <Link href="/padroes/filtros">Filtros</Link>.
        </li>
        <li>
          <strong>Erro:</strong> não é papel do DataTable. Use{' '}
          <Link href="/componentes/alert">Alert</Link> acima da tabela, com a ação de tentar de novo,
          e mantenha os dados anteriores na tela quando existirem.
        </li>
        <li>
          <code>persistTableHead</code> já vem <code>true</code>: o cabeçalho permanece mesmo sem
          linhas. Mantenha assim — some com ele e a estrutura desaparece junto.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a classe <code>ds-data-table--loading</code> é aplicada quando{' '}
        <code>progressPending</code> é <code>true</code>, mas não existe nenhuma regra CSS para ela
        no arquivo de estilos do componente — fonte: código do DataTable. Não conte com efeito visual
        automático de carregamento. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="regras">Regras</h2>
      <ol>
        <li>
          <strong>Cinco colunas.</strong> Passou disso, corte ou mande para o detalhe. Cada coluna
          extra é uma decisão que a pessoa precisa ignorar.
        </li>
        <li>
          <strong>Identificador na primeira coluna, ação na última.</strong> Sempre, em todas as
          tabelas do serviço.
        </li>
        <li>
          <strong>
            <code>keyField</code> estável, sem exceção.
          </strong>{' '}
          Seleção, expansão e paginação dependem dele.
        </li>
        <li>
          <strong>Ordenação é do conjunto, não da página.</strong> Com dados paginados no servidor,{' '}
          <code>sortServer</code>.
        </li>
        <li>
          <strong>Célula renderizada pede <code>sortAccessor</code>.</strong> Sem ele, você ordena o
          texto que aparece, não o dado.
        </li>
        <li>
          <strong>Status tem texto.</strong> Badge com cor e sem palavra não comunica para quem não
          distingue cores.
        </li>
        <li>
          <strong>Número alinha à direita, texto à esquerda</strong> — e nenhum significado depende
          disso, porque no celular o alinhamento volta para o início.
        </li>
        <li>
          <strong>Data em formato brasileiro por extenso o suficiente:</strong> 04/08/2026. Data
          relativa (“há 3 dias”) só como complemento, nunca sozinha em registro oficial.
        </li>
        <li>
          <strong>Traduza os rótulos padrão.</strong> Os textos embutidos do componente vêm sem
          acentuação — <code>Selecionar linhas visiveis</code>, <code>Linhas por pagina</code>. Passe{' '}
          <code>labels</code> com o português correto em toda tabela.
        </li>
        <li>
          <strong>Rolagem horizontal é o último recurso.</strong> Antes dela, corte coluna, use{' '}
          <code>hideBelow</code> em dado secundário ou mande o detalhe para a expansão.
        </li>
      </ol>

      <h2 id="do-and-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Escreva <code>name</code> da coluna como texto curto: <code>Protocolo</code>,{' '}
              <code>Status</code>, <code>Protocolado em</code>.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Montar o cabeçalho com JSX (ícone + texto) sem informar <code>ariaLabel</code> na
              coluna.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: o rótulo do layout empilhado vem de <code>column.name</code> só quando ele é
            string. Com JSX e sem <code>ariaLabel</code>, toda ficha do celular mostra o campo com o
            nome “coluna”.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Passe <code>sortAccessor</code> em colunas cuja célula renderiza Badge, moeda ou data
              formatada.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Marcar a coluna como <code>sortable</code> e confiar na ordenação do que foi
              renderizado.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: sem <code>sortAccessor</code>, a ordenação compara o conteúdo exibido. “R$
            1.000,00” fica antes de “R$ 90,00” e 10/01 fica antes de 09/12. A tabela parece ordenada e
            está errada.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Deixe o identificador da linha como um Link focável, mesmo quando a linha inteira for
              clicável.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Usar <code>onRowClicked</code> como único caminho para abrir o registro.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: a linha não é focável e o componente não oferece equivalente de teclado para{' '}
            <code>onRowClicked</code>. Sem um alvo focável dentro da linha, quem navega por teclado ou
            leitor de tela não consegue abrir registro nenhum.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Diga na tela que o checkbox do cabeçalho marca as linhas desta página, e ofereça a
              seleção do conjunto inteiro como ação separada e escrita.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Chamar o checkbox do cabeçalho de “selecionar todos”.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: ele marca apenas as linhas visíveis. Quem acredita ter selecionado 320 registros
            e aplica uma ação em lote sobre 10 descobre o erro depois de a ação ter acontecido.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Escreva um <code>noDataComponent</code> que explique o motivo do vazio e ofereça o
              próximo passo.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Deixar o texto padrão <code>Nenhum dado encontrado</code>.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: o texto padrão não distingue “você ainda não tem nada” de “o filtro não achou
            nada” de “deu erro”. São três situações com saídas diferentes, e a pessoa fica sem
            nenhuma.
          </p>
        </div>
      </div>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <p>O que o componente já entrega e você não precisa refazer:</p>
      <ul>
        <li>
          <code>&lt;table&gt;</code> semântica, com <code>aria-label</code> vindo de{' '}
          <code>labels.table</code>, e <code>&lt;th scope=&quot;col&quot;&gt;</code>.
        </li>
        <li>
          <code>aria-sort</code> só na coluna ativa, com o botão de ordenar nomeado por{' '}
          <code>labels.sortColumn</code>.
        </li>
        <li>
          Checkboxes com rótulo acessível visualmente oculto e estado{' '}
          <code>indeterminate</code> real no cabeçalho.
        </li>
        <li>
          Botão de expandir com <code>aria-expanded</code> e <code>aria-controls</code> apontando para
          a célula expandida; linhas selecionáveis com <code>aria-selected</code>.
        </li>
        <li>Ícones de ordenação e chevron marcados com <code>aria-hidden</code>.</li>
      </ul>
      <p>O que você precisa verificar em cada tabela:</p>
      <ul>
        <li>
          <strong>Rótulos em português correto.</strong> Substitua os textos padrão via{' '}
          <code>labels</code>; os embutidos vêm sem acentos e são lidos em voz alta.
        </li>
        <li>
          <strong>Um caminho por teclado para cada ação.</strong> O componente não implementa
          navegação de grade. Tudo que a pessoa pode fazer com o ponteiro precisa estar em um{' '}
          <code>button</code> ou <code>a</code> dentro da linha.
        </li>
        <li>
          <strong>Nomes de ação únicos.</strong> Trinta botões “Ver detalhes” são trinta itens
          idênticos na lista de elementos do leitor de tela. Nomeie com o identificador da linha.
        </li>
        <li>
          <strong>Anuncie o resultado.</strong> Contagem de resultados e contagem de seleção em região{' '}
          <code>aria-live=&quot;polite&quot;</code>, fora da tabela.
        </li>
        <li>
          <strong>Teste no celular com leitor de tela.</strong> No layout empilhado, o rótulo do campo
          vem de um pseudoelemento <code>::before</code>. Confirme na prática que cada valor é lido
          junto do seu rótulo.
        </li>
        <li>
          <strong>Status não pode depender de cor.</strong> Badge com palavra, sempre.
        </li>
        <li>
          <strong>Contraste dos temas.</strong> Só o tema <code>default</code> é auditado nesta
          documentação. Os demais mudam superfície e borda.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o DataTable não tem arquivo de teste axe. Existem 5 testes
        unitários em <code>packages/react/src/components/DataTable/DataTable.test.tsx</code> e nenhum
        teste automatizado de acessibilidade — fonte: repositório. A verificação deste padrão é
        manual. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns em tabelas de dados, consequência e correção
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
              <td>Ordenar só a página atual</td>
              <td>A tabela parece ordenada e não está; a pessoa toma decisão com base falsa</td>
              <td>
                <code>sortServer</code> com ordenação no back-end
              </td>
            </tr>
            <tr>
              <td>
                Coluna <code>sortable</code> sem <code>sortAccessor</code> em célula formatada
              </td>
              <td>Datas e valores ordenam como texto</td>
              <td>
                Informe <code>sortAccessor</code> devolvendo o valor bruto
              </td>
            </tr>
            <tr>
              <td>
                Sem <code>keyField</code>
              </td>
              <td>A seleção migra para outra linha ao ordenar ou paginar</td>
              <td>Aponte para a chave estável do registro</td>
            </tr>
            <tr>
              <td>Dado essencial em coluna com <code>hideBelow</code></td>
              <td>A informação desaparece no celular, sem aviso</td>
              <td>
                Só use <code>hideBelow</code> em dado secundário
              </td>
            </tr>
            <tr>
              <td>Cabeçalho em JSX sem <code>ariaLabel</code></td>
              <td>Todo campo da ficha do celular se chama “coluna”</td>
              <td>
                <code>name</code> como string, ou <code>ariaLabel</code> na coluna
              </td>
            </tr>
            <tr>
              <td>Contar com ordenar e selecionar tudo no celular</td>
              <td>Os controles ficam no cabeçalho, que é visualmente oculto abaixo de 640px</td>
              <td>
                Ofereça “Ordenar por” no slot <code>actions</code>
              </td>
            </tr>
            <tr>
              <td>
                Linha clicável só por <code>onRowClicked</code>
              </td>
              <td>Quem usa teclado não consegue abrir nenhum registro</td>
              <td>Identificador em Link focável dentro da linha</td>
            </tr>
            <tr>
              <td>Doze colunas com rolagem horizontal</td>
              <td>A coluna do identificador sai da vista e a pessoa perde a linha</td>
              <td>Cinco colunas; o resto na expansão ou no detalhe</td>
            </tr>
            <tr>
              <td>Estado vazio com o texto padrão</td>
              <td>A pessoa não sabe se é erro, filtro ou ausência de registro</td>
              <td>
                <code>noDataComponent</code> escrito para cada situação
              </td>
            </tr>
            <tr>
              <td>Rótulos padrão sem tradução</td>
              <td>
                O leitor de tela anuncia “Selecionar linhas visiveis” e “Linhas por pagina”
              </td>
              <td>
                Passe <code>labels</code> em toda tabela
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
