import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { listarComponentes } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Filtros',
  description:
    'Padrão de filtragem de listas longas no Sampa Design System: tipos de filtro, filtros aplicados visíveis, limpar tudo e comportamento em celular.',
};

export default function PaginaPadraoFiltros() {
  const componentes = listarComponentes();

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Padrões', href: '/padroes/visao-geral' }, { titulo: 'Filtros' }]}
      />

      <h1>Filtros</h1>
      <p className="wiki-prosa__resumo">
        Filtro é o que a pessoa usa para reduzir uma lista grande até o punhado de registros que ela
        veio buscar. Este padrão define os tipos de filtro, como mostrar o que está aplicado, como
        limpar tudo e o que muda no celular.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Não existe componente de filtro no sistema</p>
        <p>
          Nenhum dos {componentes.length} componentes é uma barra de filtros, um painel lateral
          (drawer) ou uma lista de filtros aplicados. Este padrão é uma composição de componentes que
          já existem. Toda a página é conteúdo novo, escrito para esta Wiki, e precisa de validação
          do time antes de virar norma.
        </p>
      </div>

      <h2 id="o-problema">O problema</h2>
      <p>
        A pessoa abre a lista de processos, de vagas ou de unidades de atendimento e encontra
        centenas de linhas. Ela não quer navegar por elas: quer chegar nas que servem para o caso
        dela. Sem filtro, ela pagina no escuro. Com filtro mal feito, acontece o pior dos dois
        mundos:
      </p>
      <ul>
        <li>Ela aplica um filtro, a lista encolhe, e ela não consegue mais lembrar qual filtro pôs.</li>
        <li>Ela combina dois filtros, chega a zero resultado, e não sabe qual dos dois afrouxar.</li>
        <li>Ela abre um registro, volta, e a seleção sumiu — recomeça do zero.</li>
        <li>No celular, o painel de filtros cobre a lista e ela perde a noção do efeito de cada escolha.</li>
      </ul>
      <p>
        Em serviço público o custo disso é concreto: a pessoa desiste da autoatendimento e vai ao
        telefone ou ao guichê. Filtro não é conveniência, é a diferença entre resolver sozinha e
        depender de alguém.
      </p>

      <h2 id="quando-usar">Quando usar</h2>
      <ul>
        <li>A lista passa de algumas dezenas de itens e continua crescendo com o tempo.</li>
        <li>
          Os itens compartilham atributos objetivos e repetidos — status, órgão, período, município,
          tipo de documento.
        </li>
        <li>
          A pessoa costuma voltar à mesma lista com recortes diferentes, e não com uma busca única.
        </li>
        <li>
          O recorte precisa ser combinado: <em>protocolos em análise</em> +{' '}
          <em>abertos nos últimos 30 dias</em>.
        </li>
      </ul>

      <h2 id="quando-nao-usar">Quando não usar</h2>
      <ul>
        <li>
          A lista cabe na tela. Abaixo de mais ou menos vinte itens, filtrar dá mais trabalho do que
          ler.
        </li>
        <li>
          A pessoa já sabe exatamente o que procura e tem um identificador — número de protocolo,
          CPF, placa. Isso é busca, não filtro. Use um campo de busca direto.
        </li>
        <li>
          Só existe um atributo com poucos valores e eles são excludentes. Nesse caso use{' '}
          <Link href="/componentes/tabs">Tabs</Link> para separar as visões, sem construir um painel
          de filtros.
        </li>
        <li>
          Cada recorte tem endereço próprio e conteúdo editorial diferente. Aí são páginas
          diferentes, com navegação, não filtros.
        </li>
        <li>
          O filtro dispararia um processamento caro no servidor a cada tecla. Trate como formulário
          com botão de aplicar, e explique isso na tela.
        </li>
      </ul>

      <h2 id="composicao">Composição</h2>
      <p>
        Nenhum componente abaixo foi criado para filtrar. Todos existem e são usados aqui em um papel
        específico. Confira a API de cada um antes de montar a tela.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes usados no padrão de filtros e o papel de cada um
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
                <Link href="/componentes/text-input">TextInput</Link>
              </td>
              <td>
                Busca textual dentro do conjunto já filtrado. Use <code>type=&quot;search&quot;</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/dropdown">Dropdown</Link>
              </td>
              <td>
                Filtro de escolha única com muitos valores. A prop <code>value</code> é{' '}
                <code>string</code>: o componente não seleciona múltiplos.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/checkbox">Checkbox</Link>
              </td>
              <td>
                Filtro de múltipla escolha. Um checkbox por valor, dentro de um{' '}
                <code>fieldset</code> com <code>legend</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/radio">RadioGroup</Link>
              </td>
              <td>
                Filtro de escolha única com poucos valores visíveis ao mesmo tempo, incluindo a opção
                “Todos”.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/datepicker">Datepicker</Link>
              </td>
              <td>
                Filtro de período. Use <code>mode=&quot;range&quot;</code> e limite com{' '}
                <code>minDate</code> e <code>maxDate</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/chip">Chip</Link>
              </td>
              <td>
                Filtro rápido de um clique e representação de cada filtro aplicado. Com{' '}
                <code>onClick</code> o Chip vira <code>&lt;button&gt;</code> com{' '}
                <code>aria-pressed</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/accordion">Accordion</Link>
              </td>
              <td>
                Agrupa seções de filtro quando os grupos não cabem abertos. O gatilho já vem dentro
                de um <code>h3</code> fixo.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/divider">Divider</Link>
              </td>
              <td>Separa grupos de filtro no painel, sem criar hierarquia falsa.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/button">Button</Link>
              </td>
              <td>
                “Aplicar filtros” em <code>variant=&quot;primary&quot;</code> e “Limpar tudo” em{' '}
                <code>variant=&quot;tertiary&quot;</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/badge">Badge</Link>
              </td>
              <td>
                Contagem de filtros ativos no botão que abre o painel. O Badge não é botão nem link:
                a informação tem de estar no texto.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/modal">Modal</Link>
              </td>
              <td>Painel de filtros em tela estreita. Ver a seção de celular.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/skeleton">Skeleton</Link>
              </td>
              <td>Substitui os resultados enquanto a nova consulta não volta.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/data-table">DataTable</Link> ou{' '}
                <Link href="/componentes/list-item">ListItem</Link>
              </td>
              <td>
                Os resultados. O DataTable tem o slot <code>actions</code> no toolbar, feito para
                receber os controles de filtro.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/pagination">Pagination</Link>
              </td>
              <td>
                Navegação nos resultados filtrados. Ver{' '}
                <Link href="/padroes/paginacao">Paginação</Link>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="tipos-de-filtro">Tipos de filtro</h2>

      <h3 id="tipo-escolha-unica">Escolha única</h3>
      <p>
        Um valor por vez dentro de um atributo. Até cinco valores, use{' '}
        <Link href="/componentes/radio">RadioGroup</Link> com tudo visível — a pessoa compara as
        opções sem abrir nada. Acima disso, use{' '}
        <Link href="/componentes/dropdown">Dropdown</Link>. Sempre inclua a opção que desliga o
        filtro, escrita por extenso (“Todos os status”), nunca um valor vazio.
      </p>

      <h3 id="tipo-multipla-escolha">Múltipla escolha</h3>
      <p>
        Vários valores do mesmo atributo, somados com “ou”. Use{' '}
        <Link href="/componentes/checkbox">Checkbox</Link>, um por valor, agrupados em{' '}
        <code>fieldset</code> com <code>legend</code>. O Dropdown do sistema não faz seleção
        múltipla: forçar isso quebra o componente e a semântica do <code>listbox</code>.
      </p>

      <h3 id="tipo-periodo">Período</h3>
      <p>
        Datas quase sempre são intervalo, não data solta. Use{' '}
        <Link href="/componentes/datepicker">Datepicker</Link> com{' '}
        <code>mode=&quot;range&quot;</code> e limite o calendário com <code>minDate</code> e{' '}
        <code>maxDate</code> para a faixa que o serviço realmente cobre. Ofereça atalhos como
        “Últimos 30 dias” em <Link href="/componentes/chip">Chip</Link>, acima do calendário: a
        maioria das pessoas quer um desses e não precisa abrir a grade.
      </p>

      <h3 id="tipo-busca-no-conjunto">Busca dentro do conjunto</h3>
      <p>
        Um <Link href="/componentes/text-input">TextInput</Link> com{' '}
        <code>type=&quot;search&quot;</code> que procura no que já está filtrado. Deixe explícito o
        escopo no rótulo: “Buscar nestes resultados”. Não confunda com a busca geral do serviço, que
        é outro padrão.
      </p>

      <h3 id="tipo-filtro-rapido">Filtro rápido</h3>
      <p>
        Uma fileira de <Link href="/componentes/chip">Chip</Link> com os dois ou três recortes que
        respondem pela maior parte dos acessos. Cada chip é um atalho para uma combinação inteira, não
        para um valor solto. Use <code>selected</code> para marcar o que está ligado; com{' '}
        <code>onClick</code>, o Chip renderiza <code>&lt;button type=&quot;button&quot;&gt;</code>{' '}
        com <code>aria-pressed</code> refletindo <code>selected</code>.
      </p>

      <h2 id="anatomia-do-fluxo">Anatomia do fluxo</h2>
      <ol>
        <li>
          <strong>A pessoa chega e vê a lista completa.</strong> Nunca comece com filtro aplicado sem
          avisar. Se o serviço exige um recorte inicial, mostre esse recorte como filtro aplicado
          visível, do mesmo jeito que qualquer outro.
        </li>
        <li>
          <strong>Ela vê quantos itens existem.</strong> A contagem fica perto do topo da lista e é a
          referência para tudo que vem depois.
        </li>
        <li>
          <strong>Ela escolhe um valor.</strong> A lista atualiza e a contagem muda. Enquanto a
          resposta não chega, o lugar dos resultados mostra{' '}
          <Link href="/componentes/skeleton">Skeleton</Link> — o painel de filtros não se mexe.
        </li>
        <li>
          <strong>O filtro aplicado aparece acima da lista.</strong> Em{' '}
          <Link href="/componentes/chip">Chip</Link>, com o nome do atributo e o valor: “Status:
          em análise”.
        </li>
        <li>
          <strong>Ela combina mais filtros.</strong> Cada novo filtro vira mais um chip. A ordem dos
          chips segue a ordem em que ela aplicou.
        </li>
        <li>
          <strong>Ela remove um filtro.</strong> Clicando no chip correspondente ou desmarcando no
          painel. Os dois caminhos existem e ficam sincronizados.
        </li>
        <li>
          <strong>Ela chega a zero resultados.</strong> A tela diz quantos filtros estão aplicados e
          oferece remover o último ou limpar tudo. Nunca mostre uma área em branco.
        </li>
        <li>
          <strong>Ela abre um resultado e volta.</strong> Os filtros continuam aplicados. Isso não é
          opcional.
        </li>
      </ol>

      <h2 id="filtros-aplicados">Filtros aplicados e limpar tudo</h2>
      <p>
        A regra que sustenta o padrão inteiro: <strong>o que está filtrando tem de estar visível sem
        abrir nada</strong>. Um painel fechado com seleções escondidas dentro é a causa mais comum de
        confusão.
      </p>
      <ul>
        <li>
          Mostre uma linha de chips entre os controles e a lista, precedida de um rótulo curto:
          “Filtros aplicados”.
        </li>
        <li>
          Escreva atributo e valor no chip: “Município: Campinas”, não só “Campinas”. Fora de
          contexto, o valor sozinho não diz nada.
        </li>
        <li>
          O clique no chip remove aquele filtro. O <Link href="/componentes/chip">Chip</Link> é um
          único botão: o ícone final é decorativo e vem com <code>aria-hidden</code>, então ele não
          pode ter uma ação diferente da do resto do chip.
        </li>
        <li>
          “Limpar tudo” só aparece quando há pelo menos dois filtros aplicados. Com um só, remover o
          chip já resolve.
        </li>
        <li>
          “Limpar tudo” usa <Link href="/componentes/button">Button</Link> com{' '}
          <code>variant=&quot;tertiary&quot;</code> e fica no fim da linha de chips, não dentro do
          painel.
        </li>
        <li>
          Limpar não pede confirmação, mas atualiza a contagem imediatamente. A pessoa desfaz
          reaplicando, e reaplicar precisa ser barato.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> definir se os filtros aplicados são persistidos na URL, na
        sessão ou no perfil da pessoa, e por quanto tempo — fonte: time de arquitetura. A escolha
        muda o comportamento do botão voltar do navegador e a possibilidade de compartilhar um
        recorte por link. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="celular">Comportamento em celular</h2>
      <p>
        Em tela estreita não há espaço para painel e lista ao mesmo tempo. O padrão é:
      </p>
      <ol>
        <li>
          Um <Link href="/componentes/button">Button</Link> “Filtrar” de largura total (
          <code>fullWidth</code>) fixo acima da lista, com a contagem de filtros ativos escrita no
          próprio rótulo: “Filtrar (3)”. Se usar{' '}
          <Link href="/componentes/badge">Badge</Link> para o número, repita o número no texto — o
          Badge não tem <code>aria-label</code> nem <code>role</code>, e a informação precisa estar no
          conteúdo textual.
        </li>
        <li>
          O toque abre um <Link href="/componentes/modal">Modal</Link> com os grupos de filtro.
          Grupos longos vão dentro de um <Link href="/componentes/accordion">Accordion</Link>, com o
          primeiro grupo aberto.
        </li>
        <li>
          O rodapé do Modal (slot <code>footer</code>) tem dois botões: “Limpar tudo” em terciário e
          “Ver N resultados” em primário. O número muda conforme a pessoa marca as opções — é o que
          substitui o feedback da lista, que está coberta.
        </li>
        <li>
          Fechar o Modal sem confirmar descarta as mudanças feitas ali dentro. Diga isso no botão de
          fechar, com <code>closeLabel</code>.
        </li>
        <li>
          De volta à lista, a linha de chips aplicados fica logo abaixo do botão “Filtrar” e rola com
          a página.
        </li>
      </ol>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Duas restrições reais do Modal</p>
        <p>
          O <Link href="/componentes/modal">Modal</Link> não usa React Portal: ele é renderizado no
          lugar em que aparece na árvore de componentes. Coloque-o fora de containers com{' '}
          <code>overflow</code> ou <code>transform</code>, senão o backdrop recorta. E o título é
          sempre um <code>h2</code>: encaixe o Modal em uma página cuja hierarquia de títulos suporte
          isso.
        </p>
      </div>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o sistema não tem componente de painel lateral (drawer / bottom
        sheet), que é a solução usual para filtros em celular — fonte: catálogo de componentes. Até
        existir um, o Modal é o substituto. Avaliar se vale abrir uma proposta de componente.
        Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="regras">Regras</h2>
      <ol>
        <li>
          <strong>Filtro reduz, busca encontra.</strong> Se a pessoa sabe o identificador, ela precisa
          de um campo de busca, não de uma lista de opções.
        </li>
        <li>
          <strong>A contagem de resultados é obrigatória</strong> e fica sempre no mesmo lugar. Sem
          ela, a pessoa não sabe se o filtro funcionou.
        </li>
        <li>
          <strong>Filtro aplicado é filtro visível.</strong> Nunca deixe uma seleção ativa escondida
          atrás de um painel fechado.
        </li>
        <li>
          <strong>Toda opção que liga tem uma que desliga.</strong> Grupos de escolha única começam com
          “Todos”.
        </li>
        <li>
          <strong>Nunca esconda opções que não têm resultado.</strong> Desabilite e mostre zero. Sumir
          com a opção faz a pessoa achar que o serviço não a atende.
        </li>
        <li>
          <strong>Em desktop, aplique ao marcar.</strong> Botão “Aplicar” só quando a consulta é cara
          ou quando o painel está em Modal.
        </li>
        <li>
          <strong>O painel não pula.</strong> Enquanto a lista recarrega, a posição e a altura dos
          controles ficam iguais. Quem estava marcando a terceira opção continua sobre a terceira
          opção.
        </li>
        <li>
          <strong>Ordene os valores por utilidade,</strong> não por ordem alfabética automática. O que
          a maioria escolhe vem primeiro; listas grandes de municípios ou órgãos ficam em ordem
          alfabética porque aí a busca visual depende disso.
        </li>
        <li>
          <strong>Zero resultados é uma tela, não um vazio.</strong> Diga quantos filtros estão
          aplicados, ofereça remover o último e ofereça limpar tudo.
        </li>
        <li>
          <strong>Volte para a página 1</strong> sempre que um filtro mudar. Ficar na página 7 de um
          conjunto que agora tem 2 páginas é um beco sem saída.
        </li>
      </ol>

      <h2 id="do-and-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Mostre os filtros aplicados em chips acima da lista, com atributo e valor: “Status: em
              análise”, “Período: 01/07/2026 a 31/07/2026”.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Mostrar só “3 filtros aplicados” e obrigar a pessoa a abrir o painel para descobrir
              quais são.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: a pessoa precisa relacionar a lista que está vendo com a decisão que tomou. Um
            número não permite isso, e ela acaba limpando tudo por não conseguir identificar o filtro
            errado.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Use Checkbox dentro de um <code>fieldset</code> com <code>legend</code> quando o
              atributo aceita vários valores ao mesmo tempo.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Adaptar o Dropdown para seleção múltipla com checkboxes dentro das opções.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: o Dropdown do sistema tem <code>value</code> do tipo <code>string</code> e usa{' '}
            <code>role=&quot;listbox&quot;</code> com <code>aria-selected</code> em uma única opção. A
            adaptação quebra a semântica e o leitor de tela anuncia um valor que não corresponde ao
            que está marcado.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Desabilite a opção que hoje traz zero resultados e mantenha-a na lista, com a contagem
              visível.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Remover da lista as opções sem resultado no recorte atual.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: opções que aparecem e somem fazem a lista mudar de tamanho a cada clique e tiram
            a referência de quem navega por teclado. Pior: a pessoa conclui que o serviço não cobre
            aquele caso, quando ele só está vazio naquele recorte.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Ponha um Button de “Limpar” ao lado do campo de busca, com nome acessível próprio.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Passar um “x” clicável em <code>iconEnd</code> do TextInput para limpar o campo.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: no TextInput, <code>iconStart</code> e <code>iconEnd</code> ficam dentro de um{' '}
            <code>span</code> com <code>aria-hidden=&quot;true&quot;</code>. O botão existe na tela,
            mas some para tecnologia assistiva e não recebe foco pela ordem natural.
          </p>
        </div>
      </div>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <ul>
        <li>
          <strong>Agrupe.</strong> Cada grupo de filtro vai em <code>fieldset</code> com{' '}
          <code>legend</code>. Sem isso, o leitor de tela anuncia vinte checkboxes seguidos sem dizer
          a que atributo pertencem.
        </li>
        <li>
          <strong>Anuncie a mudança de resultado.</strong> A contagem de resultados fica em uma região
          com <code>aria-live=&quot;polite&quot;</code>. Quem não vê a lista mudar precisa ouvir “48
          resultados”.
        </li>
        <li>
          <strong>Não mova o foco ao filtrar.</strong> A pessoa continua no controle que acabou de
          marcar. Mover o foco para a lista faz perder o lugar em teclado e em leitor de tela.
        </li>
        <li>
          <strong>Chips têm nome acessível completo.</strong> “Remover filtro Status: em análise”, não
          só “em análise”. Com <code>onClick</code>, o Chip é um botão com <code>aria-pressed</code>{' '}
          espelhando <code>selected</code>.
        </li>
        <li>
          <strong>Ordem de tabulação segue a leitura.</strong> Controles, depois filtros aplicados,
          depois resultados. Em celular: botão “Filtrar”, chips aplicados, lista.
        </li>
        <li>
          <strong>Foco no Modal.</strong> O Modal devolve o foco ao elemento que estava ativo antes de
          abrir e bloqueia a rolagem do corpo da página. Verifique isso em cada tela: o comportamento
          depende de o Modal estar montado no lugar certo da árvore.
        </li>
        <li>
          <strong>Atenção ao Datepicker.</strong> O popover do calendário{' '}
          <strong>não tem trap de foco</strong> e não devolve o foco ao campo ao fechar. Em um painel
          de filtros com muitos controles, teste a navegação por teclado saindo do calendário.
        </li>
        <li>
          <strong>Cor não é o único sinal.</strong> Chip selecionado tem borda mais grossa, mas isso
          sozinho não basta: o rótulo do chip aplicado precisa dizer o que está filtrando.
        </li>
        <li>
          <strong>Alvo de toque.</strong> Em celular, cada opção do painel precisa de área de toque
          confortável. O Checkbox do sistema expõe <code>--checkbox-touch-size</code> justamente para
          isso.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe teste axe automatizado para Chip, Dropdown e
        Datepicker — fonte: arquivos de teste do repositório. 13 dos {componentes.length} componentes
        têm teste axe. Enquanto isso, a verificação deste padrão é manual. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns no padrão de filtros, consequência e correção
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
              <td>Filtro aplicado só existe dentro do painel fechado</td>
              <td>
                A pessoa não entende por que a lista está curta e não acha o que remover
              </td>
              <td>Linha de chips aplicados acima da lista, sempre visível</td>
            </tr>
            <tr>
              <td>Filtro padrão aplicado sem aviso ao abrir a página</td>
              <td>
                A pessoa acredita que está vendo tudo e conclui que o registro dela não existe
              </td>
              <td>
                Mostre o recorte inicial como chip aplicado, com a mesma aparência de qualquer outro
              </td>
            </tr>
            <tr>
              <td>Opções sem resultado desaparecem da lista</td>
              <td>A lista muda de tamanho a cada clique e o teclado perde a referência</td>
              <td>Mantenha a opção, desabilite e mostre a contagem zero</td>
            </tr>
            <tr>
              <td>Perder os filtros ao abrir um resultado e voltar</td>
              <td>A pessoa refaz a seleção inteira; muitas desistem no segundo retorno</td>
              <td>Persistir o estado dos filtros — ver a pendência acima</td>
            </tr>
            <tr>
              <td>Ficar na mesma página depois de mudar um filtro</td>
              <td>A pessoa cai numa página vazia e acha que zerou o resultado</td>
              <td>Voltar para a página 1 a cada mudança de filtro</td>
            </tr>
            <tr>
              <td>Zero resultados sem saída</td>
              <td>A tela em branco não diz o que fazer e a pessoa abandona</td>
              <td>
                Texto com a contagem de filtros aplicados, ação de remover o último e ação de limpar
                tudo
              </td>
            </tr>
            <tr>
              <td>Dropdown adaptado para seleção múltipla</td>
              <td>
                Leitor de tela anuncia uma seleção diferente da que está marcada na tela
              </td>
              <td>Checkbox em fieldset, ou um novo componente proposto e aprovado</td>
            </tr>
            <tr>
              <td>Painel de filtros que muda de altura a cada clique</td>
              <td>O ponteiro e o foco perdem o alvo no meio da seleção</td>
              <td>Reserve o espaço; use Skeleton apenas na área dos resultados</td>
            </tr>
            <tr>
              <td>Botão “Aplicar” em filtro que já responde a cada clique</td>
              <td>A pessoa marca as opções, não clica em aplicar e acha que o filtro não funciona</td>
              <td>Ou aplique ao marcar, sem botão, ou não atualize antes do clique</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
