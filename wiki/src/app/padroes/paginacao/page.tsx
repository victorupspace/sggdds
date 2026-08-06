import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { obterComponente } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Paginação',
  description:
    'Paginação, carregar mais e rolagem infinita: quando usar cada um, como configurar o Pagination do Sampa Design System e por que rolagem infinita é problemática em serviço público.',
};

export default function PaginaPadraoPaginacao() {
  const pagination = obterComponente('pagination');
  const testesUnitarios = pagination?.tests.unitCount ?? 0;

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Padrões', href: '/padroes/visao-geral' }, { titulo: 'Paginação' }]}
      />

      <h1>Paginação</h1>
      <p className="wiki-prosa__resumo">
        Toda lista longa precisa de uma decisão: dividir em páginas, carregar mais sob demanda ou
        rolar sem fim. Este padrão define quando usar cada uma, como configurar o{' '}
        <Link href="/componentes/pagination">Pagination</Link> do sistema e por que rolagem infinita
        quase nunca serve para serviço público.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">O que existe e o que não existe</p>
        <p>
          O <Link href="/componentes/pagination">Pagination</Link> existe e é usado pelo{' '}
          <Link href="/componentes/data-table">DataTable</Link>. Não existe componente de “carregar
          mais” nem qualquer apoio a rolagem infinita no sistema. A recomendação abaixo é conteúdo
          novo desta Wiki e precisa de validação do time.
        </p>
      </div>

      <h2 id="o-problema">O problema</h2>
      <p>
        A pessoa pediu uma lista e o serviço devolveu 480 registros. Nenhuma tela mostra 480
        registros de uma vez, e nenhuma conexão carrega tudo de graça. Alguém precisa decidir como
        entregar isso em partes. A decisão parece técnica, mas é de experiência: ela determina se a
        pessoa consegue dizer onde está, voltar ao mesmo ponto, mandar o link para outra pessoa e
        chegar ao rodapé da página.
      </p>
      <p>Os três sintomas de uma decisão errada:</p>
      <ul>
        <li>
          A pessoa achou o registro na terceira tela de rolagem, abriu, voltou — e o navegador a
          devolveu no topo, com a lista recomeçada.
        </li>
        <li>
          A pessoa quer imprimir ou guardar a evidência de uma consulta e não consegue delimitar o
          que consultou.
        </li>
        <li>
          A pessoa precisa do telefone da ouvidoria, que está no rodapé, e o rodapé se afasta a cada
          rolagem.
        </li>
      </ul>

      <h2 id="quando-usar">Quando usar</h2>
      <p>Este padrão vale sempre que o total de itens não cabe em uma resposta única. Em particular:</p>
      <ul>
        <li>Listas de registros oficiais — protocolos, pedidos, autos, matrículas, benefícios.</li>
        <li>Resultados de busca e de filtro.</li>
        <li>
          Tabelas de dados. Ver <Link href="/padroes/tabela-de-dados">Tabela de dados</Link>.
        </li>
        <li>Qualquer lista em que a pessoa precise voltar ao mesmo ponto depois.</li>
      </ul>

      <h2 id="quando-nao-usar">Quando não usar</h2>
      <ul>
        <li>
          O total cabe na tela ou em uma rolagem curta. Abaixo de mais ou menos 25 itens, dividir só
          adiciona cliques.
        </li>
        <li>
          O conjunto é fechado e pequeno por natureza — as unidades de atendimento de um município,
          os documentos exigidos por um serviço. Mostre tudo.
        </li>
        <li>
          A lista é um passo a passo em ordem obrigatória. Isso é{' '}
          <Link href="/componentes/stepper">Stepper</Link>, não paginação.
        </li>
        <li>
          O conteúdo é editorial contínuo e a divisão seria arbitrária. Divida por assunto, com
          navegação, não por contagem.
        </li>
      </ul>

      <h2 id="composicao">Composição</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes usados no padrão de paginação e o papel de cada um
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
                <Link href="/componentes/pagination">Pagination</Link>
              </td>
              <td>
                A navegação numerada. Renderiza <code>&lt;nav&gt;</code> com{' '}
                <code>aria-label</code>, lista ordenada de páginas e{' '}
                <code>aria-current=&quot;page&quot;</code> na atual.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/data-table">DataTable</Link>
              </td>
              <td>
                Já embute o Pagination quando <code>pagination</code> é <code>true</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/button">Button</Link>
              </td>
              <td>
                O “Carregar mais”. Use <code>variant=&quot;secondary&quot;</code>,{' '}
                <code>fullWidth</code> e <code>isLoading</code> durante a busca.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/skeleton">Skeleton</Link>
              </td>
              <td>Ocupa o lugar dos itens que ainda não chegaram, sem deslocar a lista.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/spinner">Spinner</Link>
              </td>
              <td>
                Alternativa ao Skeleton quando o número de itens que vêm é desconhecido. O Button já
                traz seu próprio estado de carregamento.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/back-to-top">BackToTop</Link>
              </td>
              <td>
                Volta ao topo em listas longas, principalmente com “Carregar mais”. Tem{' '}
                <code>threshold</code> e <code>scrollBehavior</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/alert">Alert</Link>
              </td>
              <td>Falha ao carregar a próxima página, com a ação de tentar de novo.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/footer">Footer</Link>
              </td>
              <td>
                O que precisa continuar alcançável. É o argumento prático contra rolagem infinita.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="comparacao">Paginação, carregar mais e rolagem infinita</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Comparação entre paginação numerada, carregar mais e rolagem infinita
          </caption>
          <thead>
            <tr>
              <th scope="col">Critério</th>
              <th scope="col">Paginação</th>
              <th scope="col">Carregar mais</th>
              <th scope="col">Rolagem infinita</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">A pessoa sabe onde está</th>
              <td>Sim: página 3 de 24</td>
              <td>Em parte: 40 de 480 carregados</td>
              <td>Não</td>
            </tr>
            <tr>
              <th scope="row">Sabe o tamanho do conjunto</th>
              <td>Sim</td>
              <td>Sim, se o total for exibido</td>
              <td>Raramente</td>
            </tr>
            <tr>
              <th scope="row">Consegue voltar ao mesmo ponto</th>
              <td>Sim</td>
              <td>Só refazendo os cliques</td>
              <td>Não</td>
            </tr>
            <tr>
              <th scope="row">O recorte pode virar link</th>
              <td>Sim</td>
              <td>Não</td>
              <td>Não</td>
            </tr>
            <tr>
              <th scope="row">O rodapé é alcançável</th>
              <td>Sim</td>
              <td>Sim</td>
              <td>Na prática, não</td>
            </tr>
            <tr>
              <th scope="row">Custo em teclado</th>
              <td>Baixo: controles fixos</td>
              <td>Médio: o foco precisa ser tratado</td>
              <td>Alto: a ordem de foco cresce sem fim</td>
            </tr>
            <tr>
              <th scope="row">Custo em memória e dados</th>
              <td>Constante</td>
              <td>Crescente</td>
              <td>Crescente e sem limite</td>
            </tr>
            <tr>
              <th scope="row">Componente no sistema</th>
              <td>
                <Link href="/componentes/pagination">Pagination</Link>
              </td>
              <td>Composição com Button</td>
              <td>Não existe</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 id="use-paginacao">Use paginação quando</h3>
      <ul>
        <li>Os itens são registros oficiais que a pessoa pode precisar citar, imprimir ou comprovar.</li>
        <li>Ela procura um item específico e vai comparar linha a linha.</li>
        <li>O total importa para a decisão: “48 protocolos em análise” é informação, não enfeite.</li>
        <li>A lista está em tabela.</li>
        <li>O recorte precisa ser compartilhável por link ou recuperável pelo botão voltar.</li>
      </ul>

      <h3 id="use-carregar-mais">Use carregar mais quando</h3>
      <ul>
        <li>
          A lista é de exploração, não de conferência — notícias do órgão, editais recentes, unidades
          próximas.
        </li>
        <li>A ordem é por relevância ou por data e os primeiros itens resolvem a maioria dos casos.</li>
        <li>A pessoa está no celular e paginar significa mirar em controles pequenos.</li>
        <li>Ainda assim, mostre o total e o quanto já foi carregado.</li>
      </ul>

      <h3 id="rolagem-infinita">Rolagem infinita: por que não</h3>
      <p>
        Rolagem infinita é carregar mais sem o clique: os itens chegam sozinhos conforme a pessoa
        rola. Em rede social funciona porque o objetivo é ficar. Em serviço público o objetivo é
        <strong> sair resolvido</strong>, e aí a técnica trabalha contra a pessoa:
      </p>
      <ol>
        <li>
          <strong>O rodapé fica inalcançável.</strong> No rodapé de um site do Estado estão os links
          de acessibilidade, privacidade, ouvidoria e contato. Uma lista que cresce a cada rolagem
          empurra esse bloco para sempre. Não é detalhe de layout: é acesso a canal oficial.
        </li>
        <li>
          <strong>Não existe posição.</strong> A pessoa não consegue dizer onde parou, nem retomar
          depois. “Estava mais ou menos no meio” não é uma posição recuperável.
        </li>
        <li>
          <strong>Voltar não volta.</strong> Abrir um registro e usar o botão voltar devolve a pessoa
          ao topo, com a lista zerada. Em uma lista de 300 protocolos, isso significa recomeçar.
        </li>
        <li>
          <strong>Não dá para compartilhar nem comprovar.</strong> Não há link do recorte, não há
          página para imprimir, não há como dizer ao atendimento “é o quinto da segunda página”.
        </li>
        <li>
          <strong>Teclado fica inviável.</strong> A ordem de tabulação cresce sem limite. Chegar a
          qualquer coisa depois da lista deixa de ser possível.
        </li>
        <li>
          <strong>Leitor de tela perde o fio.</strong> Conteúdo aparece sem que nada seja anunciado, e
          a contagem de itens da lista muda por baixo de quem está lendo.
        </li>
        <li>
          <strong>Custa dados e memória.</strong> Serviço público é acessado em celular modesto e
          plano de dados limitado. A página vai ficando pesada até travar, e quem paga é quem tem o
          aparelho mais fraco.
        </li>
        <li>
          <strong>Some a noção de escala.</strong> A pessoa não sabe se são 12 ou 12 mil resultados —
          e é essa informação que diz a ela se vale refinar o filtro.
        </li>
      </ol>
      <p>
        <strong>Regra desta documentação:</strong> não use rolagem infinita em produto do Estado. Se
        um caso parecer exigir, ele quase sempre é resolvido por “carregar mais” com total visível.
        Nenhum componente do sistema oferece rolagem infinita, e não há proposta de criar um.
      </p>

      <h2 id="anatomia-do-fluxo">Anatomia do fluxo</h2>
      <ol>
        <li>
          <strong>A pessoa vê o total antes de rolar.</strong> “48 resultados”, no topo da lista. Sem
          isso ela não sabe se refina o filtro ou se percorre tudo.
        </li>
        <li>
          <strong>Ela lê a primeira página.</strong> O tamanho da página é escolhido pelo serviço, não
          pela pessoa — só ofereça o seletor de tamanho quando houver motivo.
        </li>
        <li>
          <strong>Ela chega ao fim da página e encontra os controles.</strong> Sempre no mesmo lugar,
          logo abaixo do último item.
        </li>
        <li>
          <strong>Ela avança.</strong> A página nova começa do primeiro item, não da posição de
          rolagem anterior.
        </li>
        <li>
          <strong>Ela vê que mudou de página.</strong> A faixa de resultados atualiza — “21 - 40 de
          480” — e o número da página atual muda de estado.
        </li>
        <li>
          <strong>Ela abre um registro e volta.</strong> Volta para a mesma página, com os mesmos
          filtros. Ver <Link href="/padroes/filtros">Filtros</Link>.
        </li>
        <li>
          <strong>Ela chega à última página.</strong> Os controles de avançar e de última página ficam
          desabilitados, com o atributo <code>disabled</code> nativo. Nada de botão que não faz nada.
        </li>
      </ol>

      <h2 id="configuracao">Como configurar o Pagination</h2>
      <p>
        O componente calcula o total de páginas a partir de <code>totalPages</code> ou, na falta
        dele, de <code>totalItems</code> dividido por <code>pageSize</code>. Sem nenhum dos dois, ele
        assume 1 página — e a paginação some sem erro nenhum. Informe sempre um dos dois.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Props do Pagination relevantes para este padrão e a recomendação de uso
          </caption>
          <thead>
            <tr>
              <th scope="col">Prop</th>
              <th scope="col">Padrão</th>
              <th scope="col">Recomendação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>showRange</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>
                Ligue. É o “21 - 40 de 480” que dá à pessoa a noção de posição e de escala.
              </td>
            </tr>
            <tr>
              <td>
                <code>showPageSize</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>
                Ligue só em painel de trabalho. Em serviço para o público, uma escolha a menos.
              </td>
            </tr>
            <tr>
              <td>
                <code>pageSize</code>
              </td>
              <td>
                <code>20</code>
              </td>
              <td>
                Reduza quando cada item for alto — no layout empilhado do DataTable, cada linha vira
                uma ficha.
              </td>
            </tr>
            <tr>
              <td>
                <code>pageSizeOptions</code>
              </td>
              <td>
                <code>[10, 20, 50, 100]</code>
              </td>
              <td>Corte 100 se a página ficar pesada em celular.</td>
            </tr>
            <tr>
              <td>
                <code>showFirstLast</code>
              </td>
              <td>
                <code>true</code>
              </td>
              <td>Mantenha. “Última página” é atalho real em lista ordenada por data.</td>
            </tr>
            <tr>
              <td>
                <code>showPageSelect</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>Ligue apenas acima de mais ou menos 20 páginas.</td>
            </tr>
            <tr>
              <td>
                <code>siblingCount</code>
              </td>
              <td>
                <code>0</code>, limitado entre 0 e 2
              </td>
              <td>Deixe como está. Mais números não ajudam a decidir.</td>
            </tr>
            <tr>
              <td>
                <code>boundaryCount</code>
              </td>
              <td>
                <code>3</code>, limitado entre 1 e 3
              </td>
              <td>Deixe como está.</td>
            </tr>
            <tr>
              <td>
                <code>disabled</code>
              </td>
              <td>
                <code>false</code>
              </td>
              <td>Ligue enquanto a próxima página carrega, para evitar cliques repetidos.</td>
            </tr>
            <tr>
              <td>
                <code>labels</code>
              </td>
              <td>textos embutidos</td>
              <td>
                Sobrescreva sempre: os padrões vêm sem acentuação (<code>Paginacao</code>,{' '}
                <code>Pagina anterior</code>, <code>Resultados por pagina</code>).
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Com os valores padrão (<code>boundaryCount</code> 3 e <code>siblingCount</code> 0), até 9
        páginas todos os números aparecem. Acima disso o componente mostra as três primeiras, a
        página atual entre reticências e as três últimas.
      </p>
      <p>
        Dentro do <Link href="/componentes/data-table">DataTable</Link> você não configura nada
        disso: o componente já renderiza o Pagination com faixa de resultados, seletor de linhas por
        página e controles de primeira e última. Ali o padrão de{' '}
        <code>paginationPerPage</code> é 10, e <code>paginationRowsPerPageOptions</code> é{' '}
        <code>[5, 10, 20, 50]</code>. Em paginação de servidor, informe{' '}
        <code>paginationServer</code> e <code>paginationTotalRows</code> — sem o total, a contagem
        mostrada é só a da página atual.
      </p>

      <h2 id="carregar-mais">Como montar o “carregar mais”</h2>
      <ol>
        <li>
          Um <Link href="/componentes/button">Button</Link> centralizado abaixo do último item, com{' '}
          <code>variant=&quot;secondary&quot;</code> e <code>fullWidth</code> no celular.
        </li>
        <li>
          O rótulo diz o quanto vem: “Carregar mais 20”. Ao lado ou acima, a contagem do que já foi
          carregado: “40 de 480”.
        </li>
        <li>
          Durante o carregamento, use <code>isLoading</code>. O Button bloqueia a interação e troca o
          rótulo visível por <code>loadingLabel</code>, o que também muda o nome acessível do
          controle — escreva um <code>loadingLabel</code> que faça sentido.
        </li>
        <li>
          <strong>Mova o foco para o primeiro item novo</strong> quando os itens chegarem. Sem isso,
          quem usa teclado continua no botão e não alcança o que acabou de aparecer.
        </li>
        <li>
          Anuncie a mudança em região com <code>aria-live=&quot;polite&quot;</code>: “20 itens
          carregados. 60 de 480.”
        </li>
        <li>
          Quando acabar, troque o botão por uma frase de fim: “Fim da lista. 480 de 480.” Não deixe um
          botão desabilitado sem explicação.
        </li>
        <li>
          Em lista longa, acrescente <Link href="/componentes/back-to-top">BackToTop</Link>.
        </li>
        <li>
          Falha ao carregar não apaga o que já está na tela: mostre{' '}
          <Link href="/componentes/alert">Alert</Link> acima do botão, com a ação de tentar de novo.
        </li>
      </ol>

      <h2 id="regras">Regras</h2>
      <ol>
        <li>
          <strong>Uma escolha por lista.</strong> Nunca combine paginação e carregar mais na mesma
          tela.
        </li>
        <li>
          <strong>Mostre o total sempre.</strong> Com paginação, ligue <code>showRange</code>. Com
          carregar mais, escreva “carregados X de Y”.
        </li>
        <li>
          <strong>Os controles ficam abaixo da lista</strong>, no mesmo lugar em todas as telas do
          serviço.
        </li>
        <li>
          <strong>Trocar de página leva ao início da lista</strong>, não ao topo da página inteira, e
          não mantém a rolagem anterior.
        </li>
        <li>
          <strong>Filtrar ou ordenar volta para a página 1.</strong> Sempre.
        </li>
        <li>
          <strong>Estado da paginação vive na URL.</strong> É o que faz o botão voltar funcionar e o
          link ser compartilhável.
        </li>
        <li>
          <strong>Não desabilite o que ainda é possível.</strong> O componente já desabilita anterior
          e primeira na página 1, e próxima e última na última.
        </li>
        <li>
          <strong>Sem rolagem infinita.</strong> Nem como “melhoria progressiva” em cima de carregar
          mais.
        </li>
        <li>
          <strong>Traduza os rótulos.</strong> Os textos embutidos do Pagination não têm acentos e são
          lidos em voz alta por leitor de tela.
        </li>
        <li>
          <strong>Página vazia não existe.</strong> Se o recorte devolveu zero, mostre o estado vazio
          com saída, não uma paginação de uma página só.
        </li>
      </ol>

      <h2 id="celular">Comportamento em celular</h2>
      <p>O Pagination se adapta sozinho, e vale saber exatamente o que ele faz:</p>
      <ul>
        <li>
          <strong>Abaixo de 720px</strong> a raiz vira coluna: os metadados ficam acima e a lista de
          páginas centralizada.
        </li>
        <li>
          <strong>Abaixo de 640px</strong> o componente esconde os controles de primeira e última
          página, as reticências e todos os números que não são o atual. No lugar, aparece um resumo
          com o status da página e um <code>select</code> nativo para saltar direto. O alvo de toque
          cresce para 48px.
        </li>
        <li>
          <strong>Abaixo de 420px</strong> o espaçamento entre controles diminui e o tamanho da fonte
          é fixado, para não quebrar a linha.
        </li>
        <li>
          Isso significa que, no celular, a navegação numerada vira{' '}
          <strong>anterior, página atual, próxima e salto por lista</strong>. Não desenhe telas que
          dependam de ver a sequência de números.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o bloco de resumo para celular do Pagination fica sempre no DOM
        e é exposto a leitores de tela também no desktop, duplicando a informação de página — fonte:
        código do componente. Não há decisão registrada sobre corrigir isso. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="do-and-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Ligue <code>showRange</code> e mostre “21 - 40 de 480” junto dos controles.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Mostrar só os números das páginas, sem o total de resultados.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: sem o total, a pessoa não sabe se refina o filtro ou se percorre a lista inteira.
            É a informação que decide o próximo passo dela, e ela vem desligada por padrão.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>Guarde a página atual na URL e restaure-a ao voltar de um registro.</p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Manter a página só no estado do componente em memória.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: sem estado na URL, o botão voltar devolve a pessoa à página 1 e o recorte não
            pode ser compartilhado com quem a está ajudando — nem com o atendimento do próprio órgão.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              No “carregar mais”, mova o foco para o primeiro item novo e anuncie o total carregado em
              região <code>aria-live</code>.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Acrescentar os itens ao fim da lista e deixar o foco onde estava.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: quem navega por teclado ou leitor de tela não percebe que algo chegou. O botão
            continua sob o foco e a pessoa clica de novo, acumulando páginas sem saber.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Passe <code>labels</code> com o português correto: “Paginação”, “Página anterior”,
              “Resultados por página”.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Aceitar os rótulos padrão do componente.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: os textos embutidos estão sem acentuação. Eles vão para o{' '}
            <code>aria-label</code> da navegação e dos botões, e são pronunciados em voz alta pelo
            leitor de tela.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>Use “carregar mais” com o total visível quando a lista for de exploração.</p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Carregar os próximos itens automaticamente conforme a pessoa rola.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: a rolagem automática afasta o rodapé para sempre, e é lá que ficam os links de
            acessibilidade, privacidade, ouvidoria e contato. Um clique explícito devolve o controle à
            pessoa e mantém a página finita.
          </p>
        </div>
      </div>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <p>O que o Pagination já entrega:</p>
      <ul>
        <li>
          <code>&lt;nav&gt;</code> com <code>aria-label</code>, contendo uma lista ordenada de páginas.
        </li>
        <li>
          <code>aria-current=&quot;page&quot;</code> no botão da página atual, cujo rótulo muda para o
          texto de página atual.
        </li>
        <li>
          Controles indisponíveis com o atributo <code>disabled</code> nativo, não apenas
          desbotados.
        </li>
        <li>
          <code>&lt;select&gt;</code> nativos para resultados por página e salto direto, com{' '}
          <code>aria-label</code>. Sem handler de teclado próprio: o comportamento é o nativo.
        </li>
        <li>Ícones e reticências marcados com <code>aria-hidden</code>.</li>
      </ul>
      <p>O que verificar em cada tela:</p>
      <ul>
        <li>
          <strong>Anuncie a troca de página.</strong> Coloque a contagem de resultados em região com{' '}
          <code>aria-live=&quot;polite&quot;</code>. O componente não anuncia nada sozinho.
        </li>
        <li>
          <strong>Leve o foco ao início da lista</strong> depois de trocar de página. Sem isso, quem
          usa teclado navega uma lista nova a partir do rodapé dela.
        </li>
        <li>
          <strong>Rótulos traduzidos</strong> via <code>labels</code>, sempre.
        </li>
        <li>
          <strong>Alvo de toque.</strong> Abaixo de 640px os controles vão para 48px. Não reduza isso
          com CSS próprio.
        </li>
        <li>
          <strong>Não dependa da sequência de números no celular.</strong> Ela é escondida por CSS
          nessa faixa.
        </li>
        <li>
          <strong>No “carregar mais”</strong>, o foco e o anúncio são responsabilidade sua: não há
          componente cuidando disso.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o Pagination tem {testesUnitarios} testes unitários e nenhum
        teste axe — não existe arquivo <code>Pagination.a11y.test.tsx</code> — fonte: repositório. A
        verificação deste padrão é manual. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns em paginação, consequência e correção
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
              <td>Rolagem infinita em lista de registros oficiais</td>
              <td>A pessoa perde a posição, o rodapé some e o botão voltar zera a lista</td>
              <td>Paginação com faixa de resultados</td>
            </tr>
            <tr>
              <td>
                Nem <code>totalItems</code> nem <code>totalPages</code> informados
              </td>
              <td>O componente assume 1 página e a paginação desaparece, sem erro</td>
              <td>Informe sempre um dos dois</td>
            </tr>
            <tr>
              <td>
                <code>showRange</code> desligado
              </td>
              <td>A pessoa não sabe quantos resultados existem nem onde está</td>
              <td>
                Ligue <code>showRange</code>
              </td>
            </tr>
            <tr>
              <td>Página só no estado do componente</td>
              <td>O botão voltar devolve à página 1 e o recorte não vira link</td>
              <td>Estado da página na URL</td>
            </tr>
            <tr>
              <td>Filtrar sem voltar para a página 1</td>
              <td>A pessoa cai numa página inexistente e vê a lista vazia</td>
              <td>Redefina a página a cada mudança de filtro ou de ordenação</td>
            </tr>
            <tr>
              <td>Trocar de página sem mover o foco</td>
              <td>Quem usa teclado percorre a lista nova de trás para frente</td>
              <td>Mova o foco para o início da lista e anuncie a mudança</td>
            </tr>
            <tr>
              <td>Ordenar só a página atual</td>
              <td>A ordem parece do conjunto e é só do pedaço visível</td>
              <td>
                Ordene no servidor — ver{' '}
                <Link href="/padroes/tabela-de-dados">Tabela de dados</Link>
              </td>
            </tr>
            <tr>
              <td>“Carregar mais” sem total</td>
              <td>A pessoa clica sem saber quantas vezes ainda vai precisar clicar</td>
              <td>“40 de 480” ao lado do botão</td>
            </tr>
            <tr>
              <td>Paginação e carregar mais na mesma lista</td>
              <td>Duas noções de posição concorrentes; a pessoa não sabe o que já viu</td>
              <td>Escolha uma</td>
            </tr>
            <tr>
              <td>Rótulos padrão sem tradução</td>
              <td>O leitor de tela anuncia “Paginacao” e “Pagina anterior”</td>
              <td>
                Passe <code>labels</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
