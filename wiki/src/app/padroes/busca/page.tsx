import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Busca',
  description:
    'O padrão de busca dentro de um serviço no Sampa Design System: campo, sugestões, carregamento, resultado, filtros associados e o que fazer quando a busca não encontra nada.',
};

interface PecaComposicao {
  slug: string;
  nome: string;
  papel: string;
}

const COMPOSICAO: PecaComposicao[] = [
  {
    slug: 'text-input',
    nome: 'TextInput',
    papel:
      'O campo de busca. Use type="search", rótulo visível e um ícone decorativo em iconStart. É o único componente de entrada deste padrão.',
  },
  {
    slug: 'button',
    nome: 'Button',
    papel:
      'Aciona a busca ao lado do campo, para quem não usa Enter. Também é o caminho de saída no resultado vazio: “Ver todos os serviços”.',
  },
  {
    slug: 'chip',
    nome: 'Chip',
    papel:
      'Mostra cada filtro aplicado como uma peça removível. Com onClick vira button e reflete a seleção em aria-pressed.',
  },
  {
    slug: 'dropdown',
    nome: 'Dropdown',
    papel:
      'Ordenação do resultado — por relevância, por data, por nome. Uma escolha única entre poucas opções.',
  },
  {
    slug: 'skeleton',
    nome: 'Skeleton',
    papel:
      'Placeholder da lista durante a primeira carga. Mantém a altura do bloco e evita o salto do conteúdo.',
  },
  {
    slug: 'spinner',
    nome: 'Spinner',
    papel:
      'Carregamento pontual: nova página, reordenação, aplicação de filtro sobre um resultado já visível.',
  },
  {
    slug: 'list-item',
    nome: 'ListItem',
    papel:
      'Cada resultado da lista, com título, descrição e destino. É o formato padrão quando os resultados são homogêneos.',
  },
  {
    slug: 'card',
    nome: 'Card',
    papel:
      'Alternativa ao ListItem quando cada resultado precisa de imagem, selo e ação própria.',
  },
  {
    slug: 'data-table',
    nome: 'DataTable',
    papel:
      'Quando o resultado é tabular e a pessoa precisa comparar colunas — registros, protocolos, valores.',
  },
  {
    slug: 'badge',
    nome: 'Badge',
    papel:
      'Marca o tipo ou a situação de um resultado: “Online”, “Presencial”, “Encerrado”. Nunca carrega informação que só existe ali.',
  },
  {
    slug: 'link',
    nome: 'Link',
    papel: 'Ações de texto em torno do resultado: limpar filtros, ver todos, ir para a ajuda.',
  },
  {
    slug: 'pagination',
    nome: 'Pagination',
    papel:
      'Navega entre páginas de resultado e informa o intervalo exibido dentro do total encontrado.',
  },
  {
    slug: 'alert',
    nome: 'Alert',
    papel:
      'Quando a busca falha por erro do sistema — não quando ela funciona e não encontra nada. São coisas diferentes.',
  },
];

export default function PaginaPadraoBusca() {
  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Padrões', href: '/padroes/visao-geral' }, { titulo: 'Busca' }]} />

      <h1>Busca</h1>
      <p className="wiki-prosa__resumo">
        Busca é o atalho de quem não conhece o caminho. A pessoa chega com uma palavra na cabeça —
        o nome do serviço, o número do protocolo, o nome do documento — e espera que o serviço a
        leve direto ao lugar certo, sem que ela precise entender a estrutura do site.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <h2 id="o-problema">O problema</h2>
      <p>
        Alguém precisa da segunda via de um documento. Não sabe qual secretaria cuida disso, não
        sabe o nome oficial do serviço, e não vai descobrir navegando por um menu organizado pela
        estrutura administrativa do Estado. Ela digita “segunda via” no primeiro campo que encontra
        e espera.
      </p>
      <p>
        A partir daí, três coisas costumam dar errado. A busca devolve uma lista sem ordem clara, e
        a pessoa não sabe qual dos dez resultados é o dela. A busca não encontra nada e mostra uma
        tela em branco — e a pessoa conclui que o serviço não existe, quando na verdade ele existe
        com outro nome. Ou a busca fica carregando sem dizer nada, e a pessoa clica de novo, e de
        novo.
      </p>
      <p>
        Este padrão trata da <strong>busca dentro de um serviço</strong>: procurar entre unidades
        de atendimento, entre solicitações, entre documentos, entre registros de uma lista. Quando
        a busca não encontra, ela ainda tem trabalho a fazer — e é aí que a maior parte das
        implementações desiste.
      </p>

      <h2 id="quando-usar">Quando usar</h2>
      <ul>
        <li>
          A lista é grande o bastante para que percorrer item a item deixe de ser razoável.
        </li>
        <li>
          A pessoa chega sabendo o que procura, mas não sabe onde isso está na estrutura.
        </li>
        <li>
          O que ela procura tem um identificador que ela já tem em mãos: número de protocolo, nome
          da unidade, CPF, placa.
        </li>
        <li>
          A mesma lista é consultada várias vezes com termos diferentes ao longo do uso.
        </li>
      </ul>

      <h2 id="quando-nao-usar">Quando não usar</h2>
      <ul>
        <li>
          <strong>A lista é curta.</strong> Com poucos itens visíveis na tela, um campo de busca
          adiciona um passo sem eliminar nenhum. Mostre a lista inteira.
        </li>
        <li>
          <strong>A pessoa não sabe o que procurar.</strong> Quem chega sem termo precisa de
          navegação e de categorias, não de um campo vazio. Busca não substitui um menu bem
          organizado — ela cobre o caso de quem já sabe o nome.
        </li>
        <li>
          <strong>O objetivo é reduzir uma lista por características conhecidas.</strong> Escolher
          “abertas”, “deste mês”, “desta unidade” é{' '}
          <Link href="/padroes/filtros">filtro</Link>, não busca. Filtro reduz o que já está na
          tela; busca vai procurar.
        </li>
        <li>
          <strong>Os dados a fornecer produzem uma solicitação.</strong> Aí é{' '}
          <Link href="/padroes/formularios">formulário</Link>: tem validação, envio e protocolo.
          Busca não valida e não gera consequência.
        </li>
      </ul>

      <h2 id="composicao">Composição</h2>
      <p>
        Todos os componentes abaixo existem hoje no sistema. A ausência de um componente de
        sugestão automática está registrada em{' '}
        <a href="#regra-sugestoes">Sugestões</a>.
      </p>
      <div className="wiki-tabela-rolagem">
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes que compõem o padrão de busca e o papel de cada um
          </caption>
          <thead>
            <tr>
              <th scope="col">Componente</th>
              <th scope="col">Papel no padrão</th>
            </tr>
          </thead>
          <tbody>
            {COMPOSICAO.map((peca) => (
              <tr key={peca.slug}>
                <th scope="row">
                  <Link href={`/componentes/${peca.slug}`}>{peca.nome}</Link>
                </th>
                <td>{peca.papel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="anatomia-do-fluxo">Anatomia do fluxo</h2>
      <ol>
        <li>
          <strong>A pessoa encontra o campo.</strong> Ele está no mesmo lugar em todas as telas do
          serviço, com rótulo visível dizendo onde a busca procura: “Buscar unidade de
          atendimento”, não apenas uma lupa solta.
        </li>
        <li>
          <strong>Ela digita o termo.</strong> O campo aceita o que ela souber — nome parcial,
          número com ou sem pontuação, letras maiúsculas ou minúsculas.
        </li>
        <li>
          <strong>Ela aciona.</strong> Enter ou o botão ao lado. Os dois caminhos existem sempre: em
          celular, o botão é mais confiável que o Enter do teclado virtual.
        </li>
        <li>
          <strong>O sistema mostra que está procurando.</strong> Skeleton na primeira carga, Spinner
          quando já havia uma lista na tela.
        </li>
        <li>
          <strong>O resultado aparece com contexto.</strong> Quantos itens foram encontrados e para
          qual termo. O termo continua escrito no campo — a pessoa precisa poder corrigir uma letra
          sem redigitar tudo.
        </li>
        <li>
          <strong>Ela refina, se precisar.</strong> Filtros aparecem junto do resultado, com cada
          filtro aplicado visível como um Chip removível.
        </li>
        <li>
          <strong>Ela percorre.</strong> Pagination quando há mais itens do que cabe, sempre com o
          intervalo exibido dentro do total.
        </li>
        <li>
          <strong>Ela abre um resultado.</strong> E, ao voltar, encontra a mesma busca, com os
          mesmos filtros e na mesma página. Perder o resultado no botão “voltar” é o defeito mais
          irritante deste padrão.
        </li>
      </ol>
      <p>
        Quando o passo 5 não encontra nada, o fluxo não acaba: ele continua em{' '}
        <a href="#regra-vazio">Quando a busca não encontra nada</a>.
      </p>

      <h2 id="regras">Regras</h2>

      <h3 id="regra-campo">O campo</h3>
      <ul>
        <li>
          Use <code>type=&quot;search&quot;</code> no TextInput. É o tipo que aciona o teclado certo
          no celular e o comportamento nativo esperado.
        </li>
        <li>
          <strong>Rótulo visível, sempre.</strong> O <code>label</code> é obrigatório no componente,
          e ele deve dizer onde a busca procura. Uma lupa sozinha não informa se a busca é no site
          inteiro ou só naquela lista.
        </li>
        <li>
          O ícone em <code>iconStart</code> é decorativo — o componente o envolve em{' '}
          <code>aria-hidden</code>. Ele reforça o reconhecimento visual, não substitui o rótulo.
        </li>
        <li>
          O campo ocupa a largura disponível (<code>fullWidth</code> já vem ligado). Campo de busca
          estreito faz a pessoa perder de vista o que digitou.
        </li>
        <li>
          <strong>Nunca limpe o termo depois de buscar.</strong> Corrigir uma letra é o refinamento
          mais comum; apagar o campo obriga a redigitar.
        </li>
        <li>
          Ofereça um jeito de limpar a busca inteira e voltar à lista completa — em texto, com{' '}
          <Link href="/componentes/link">Link</Link>, ao lado da contagem.
        </li>
        <li>
          Não exija um número mínimo de caracteres sem dizer. Se houver, avise no{' '}
          <code>helperText</code>.
        </li>
      </ul>

      <h3 id="regra-sugestoes">Sugestões</h3>
      <p>
        Sugestão enquanto se digita reduz erro de grafia e ensina o vocabulário do serviço. É um
        recurso desejável — e hoje ele não tem como ser feito corretamente com os componentes
        existentes.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de autocompletar, combobox ou lista de
        sugestões no sistema — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p>
        O Dropdown <strong>não serve</strong> como substituto: ele não tem busca por digitação, abre
        por seta e não por entrada de texto, posiciona o menu sem detectar a borda da tela e não
        expõe controle externo de abertura. Montar um combobox por cima dele produz um controle sem
        a semântica correta, que se comporta de forma imprevisível com leitor de tela.
      </p>
      <ul>
        <li>
          Enquanto o componente não existe, <strong>entregue busca sem sugestão</strong>. Uma busca
          simples que funciona é melhor do que um combobox improvisado que confunde.
        </li>
        <li>
          Compense do outro lado: aceite grafias próximas, ignore acento e pontuação, e trate
          sinônimos no servidor. É lá que o problema da sugestão se resolve de verdade.
        </li>
        <li>
          Se ainda assim for construir sugestões no produto, elas precisam ser navegáveis por seta,
          aceitáveis por Enter, canceláveis por Esc, e anunciadas em quantidade a cada mudança.
          Nada disso vem pronto no sistema hoje.
        </li>
      </ul>

      <h3 id="regra-carregamento">Carregamento</h3>
      <ul>
        <li>
          <strong>Primeira carga:</strong> <Link href="/componentes/skeleton">Skeleton</Link> com o
          formato aproximado dos resultados. Ele segura a altura do bloco e evita que o conteúdo
          salte quando a lista chega.
        </li>
        <li>
          O Skeleton é decorativo por padrão (<code>aria-hidden</code>), justamente para não gerar
          ruído com vários placeholders. Para anunciar o carregamento, passe{' '}
          <code>ariaLabel</code> em <strong>um</strong> deles — aí ele aplica{' '}
          <code>role=&quot;status&quot;</code> e <code>aria-busy</code>.
        </li>
        <li>
          <strong>Recarga sobre um resultado existente:</strong>{' '}
          <Link href="/componentes/spinner">Spinner</Link>, que já traz{' '}
          <code>role=&quot;status&quot;</code> e <code>aria-live=&quot;polite&quot;</code> fixos.
        </li>
        <li>
          Não troque a lista por uma tela vazia enquanto recarrega. Mantenha o resultado anterior
          visível e sinalize que está atualizando.
        </li>
        <li>
          Se a busca demora, diga. Silêncio longo é lido como travamento e produz cliques
          repetidos.
        </li>
      </ul>

      <h3 id="regra-resultado">O resultado</h3>
      <ul>
        <li>
          Comece pela contagem e pelo termo: “12 resultados para <em>segunda via</em>”. É essa linha
          que diz à pessoa se ela precisa refinar ou se pode começar a ler.
        </li>
        <li>
          Ordene por relevância por padrão. Ofereça outras ordenações em{' '}
          <Link href="/componentes/dropdown">Dropdown</Link>, sem esconder qual está ativa.
        </li>
        <li>
          Cada resultado responde “é este que eu quero?” antes do clique: título que a pessoa
          reconheça e uma linha de descrição que a diferencie dos vizinhos.
        </li>
        <li>
          <strong>Os slots <code>leading</code> e <code>trailing</code> do ListItem são
          decorativos</strong> — o componente os marca como <code>aria-hidden</code>. Um Badge
          colocado ali não é lido. Informação que distingue um resultado do outro vai em{' '}
          <code>title</code> ou <code>description</code>.
        </li>
        <li>
          Não destaque o termo buscado com cor apenas. Se marcar a ocorrência no texto, use também
          peso ou marcação semântica.
        </li>
        <li>
          Se o resultado for tabular, cuidado com o DataTable: o clique de linha não tem equivalente
          de teclado hoje. Coloque um link explícito na célula que abre o registro.
        </li>
      </ul>

      <h3 id="regra-vazio">Quando a busca não encontra nada</h3>
      <p>
        Este é o momento decisivo do padrão. Uma tela em branco faz a pessoa concluir que o serviço
        não existe. Separe três situações que costumam ser tratadas como uma só:
      </p>
      <div className="wiki-tabela-rolagem">
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Três situações distintas de resultado ausente e o tratamento de cada uma
          </caption>
          <thead>
            <tr>
              <th scope="col">Situação</th>
              <th scope="col">O que a pessoa precisa ler</th>
              <th scope="col">Como montar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">A busca funcionou e não achou</th>
              <td>
                O termo procurado, por que pode não ter encontrado e o que tentar em seguida.
              </td>
              <td>
                Bloco de texto no lugar da lista, com Link para limpar a busca e Button para ver a
                lista completa. Não use Alert.
              </td>
            </tr>
            <tr>
              <th scope="row">Os filtros zeraram o resultado</th>
              <td>Que a culpa é do filtro, não do termo — e como desfazer.</td>
              <td>
                Mantenha os Chips dos filtros aplicados visíveis e ofereça “Limpar filtros” em
                destaque.
              </td>
            </tr>
            <tr>
              <th scope="row">A busca falhou</th>
              <td>Que houve um erro do sistema, e que o termo dela não é o problema.</td>
              <td>
                <Link href="/componentes/alert">Alert</Link> com{' '}
                <code>variant=&quot;error&quot;</code> e uma ação para tentar de novo.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          Repita o termo buscado na mensagem. Muitas vezes o erro está numa letra, e ver o termo
          escrito é o que faz a pessoa perceber.
        </li>
        <li>
          Ofereça pelo menos uma saída concreta: ver a lista completa, limpar filtros, procurar por
          outro campo, falar com o atendimento.
        </li>
        <li>
          Se houver termos próximos, sugira-os em texto: “Você quis dizer…”. Sem inventar
          resultado.
        </li>
        <li>
          Nunca deixe só um desenho e a palavra “Nada encontrado”. Ilustração não é caminho de
          saída.
        </li>
        <li>
          O bloco de resultado vazio ocupa o mesmo espaço da lista. Não deixe a tela colapsar até o
          rodapé.
        </li>
      </ul>
      <p>
        O tratamento completo das telas sem conteúdo, incluindo o caso de lista que nunca teve
        itens, está em <Link href="/padroes/estados-vazios">Estados vazios</Link>.
      </p>

      <h3 id="regra-filtros">Filtros associados</h3>
      <ul>
        <li>
          Busca e filtro se combinam: a busca encontra, o filtro reduz. Deixe claro que os dois
          estão agindo ao mesmo tempo sobre a mesma contagem.
        </li>
        <li>
          Cada filtro aplicado aparece como um <Link href="/componentes/chip">Chip</Link>{' '}
          removível, acima da lista. Com <code>onClick</code>, o Chip vira{' '}
          <code>button</code> nativo e reflete a seleção em <code>aria-pressed</code>.
        </li>
        <li>
          Sempre exista um “Limpar filtros”, separado do “Limpar busca”. São desfazimentos
          diferentes.
        </li>
        <li>
          Aplicar filtro não pode apagar o termo buscado, e limpar filtro não pode apagar o
          resultado.
        </li>
        <li>
          Não ofereça filtro que leva a zero resultado quando você já sabe que levará. Se a
          contagem por opção estiver disponível, mostre-a.
        </li>
        <li>
          A regra completa de construção dos filtros está em{' '}
          <Link href="/padroes/filtros">Filtros</Link>.
        </li>
      </ul>

      <h3 id="regra-persistencia">Persistência</h3>
      <ul>
        <li>
          Termo, filtros, ordenação e página vão para a URL. Isso torna o resultado compartilhável,
          recarregável e recuperável pelo botão “voltar” do navegador.
        </li>
        <li>
          Voltar de um resultado devolve a mesma lista, na mesma posição de rolagem sempre que
          possível.
        </li>
        <li>
          Não guarde a busca da pessoa sem que ela peça. Histórico de busca é dado — trate como
          tal.
        </li>
      </ul>

      <h2 id="do-e-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Campo com rótulo visível dizendo o escopo — “Buscar unidade de atendimento” — e a
              lupa como ícone decorativo em <code>iconStart</code>.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Só um ícone de lupa que expande um campo sem rótulo, com “Pesquisar…” no placeholder.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Sem rótulo, ninguém sabe onde a busca procura — no site inteiro ou naquela lista. O
            ícone é <code>aria-hidden</code> no componente, então para quem usa leitor de tela o
            campo fica sem nome; e o placeholder some no primeiro caractere.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              No resultado vazio, repetir o termo buscado, explicar por que pode não ter encontrado
              e oferecer “Limpar filtros” e “Ver todos”.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Mostrar uma ilustração com “Nenhum resultado encontrado” e nada mais.</p>
          </div>
          <p className="wiki-dodont__porque">
            A pessoa não veio buscar por esporte: ela precisa de um serviço. Sem termo repetido e
            sem saída, ela conclui que o serviço não existe e abandona — e o Estado perde um
            atendimento digital para o balcão.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Manter o termo no campo depois de buscar, com a contagem logo acima da lista: “12
              resultados para <em>segunda via</em>”.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Limpar o campo ao buscar e mostrar a lista sem contagem nem termo.</p>
          </div>
          <p className="wiki-dodont__porque">
            Refinar uma letra é o gesto mais comum depois de uma busca. Sem o termo no campo, cada
            correção vira uma redigitação inteira; e sem contagem, a pessoa não sabe se vale a pena
            refinar ou se já pode ler.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Colocar a informação que distingue um resultado do outro em <code>title</code> e{' '}
              <code>description</code> do ListItem.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Colocar um Badge “Online” ou “Presencial” no slot <code>trailing</code> como única
              forma de distinguir os resultados.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Os slots <code>leading</code> e <code>trailing</code> do ListItem são marcados como{' '}
            <code>aria-hidden</code> pelo componente. Quem usa leitor de tela ouve dez resultados
            aparentemente idênticos.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Usar Alert apenas quando a busca falha por erro do sistema, com uma ação para tentar
              de novo.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Usar Alert de erro quando a busca funcionou e simplesmente não encontrou o termo.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Não achar não é erro: é uma resposta válida. Tratar as duas situações do mesmo jeito
            faz a pessoa achar que o sistema quebrou, quando o caminho certo era corrigir o termo
            ou limpar um filtro.
          </p>
        </div>
      </div>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <ul>
        <li>
          <strong>Marque a região.</strong> Envolva campo e botão em um <code>form</code> com{' '}
          <code>role=&quot;search&quot;</code>. Isso cria um marco de página que quem usa leitor de
          tela alcança direto, sem percorrer o cabeçalho.
        </li>
        <li>
          <strong>Anuncie a contagem.</strong> A linha “12 resultados para <em>segunda via</em>”
          precisa estar numa região com <code>aria-live=&quot;polite&quot;</code>, atualizada a cada
          nova busca. Sem isso, quem não vê a tela não sabe que o resultado mudou. O sistema não tem
          componente para essa região — é marcação do produto.
        </li>
        <li>
          <strong>Foco depois de buscar.</strong> O foco não sai do campo. Quem quiser ler o
          resultado desce com Tab ou com os atalhos do leitor de tela; roubar o foco para a lista
          impede a correção do termo.
        </li>
        <li>
          <strong>Carregamento anunciado uma vez só.</strong> O Skeleton é{' '}
          <code>aria-hidden</code> por padrão — passe <code>ariaLabel</code> em apenas um deles. O
          Spinner já traz <code>role=&quot;status&quot;</code>, <code>aria-live</code> e{' '}
          <code>aria-busy</code>: dois spinners na mesma tela produzem dois anúncios.
        </li>
        <li>
          <strong>A lista precisa ser uma lista.</strong> O ListItem renderiza apenas o{' '}
          <code>li</code>; o <code>ul</code> é responsabilidade de quem usa. Sem ele, a semântica de
          lista e a contagem de itens se perdem.
        </li>
        <li>
          <strong>Não use <code>selected</code> do ListItem como estado de resultado.</strong> Ele
          aplica <code>aria-selected</code> num <code>li</code>, onde o atributo não é válido sem um{' '}
          <code>role</code> adequado no consumidor.
        </li>
        <li>
          <strong>Chips de filtro.</strong> Com <code>onClick</code> viram <code>button</code>{' '}
          nativo, alcançável por Tab e acionável por Enter e Espaço, com{' '}
          <code>aria-pressed</code> refletindo a seleção. Sem <code>onClick</code> são{' '}
          <code>span</code> estático e não devem parecer clicáveis.
        </li>
        <li>
          <strong>Paginação.</strong> A página atual usa <code>aria-current=&quot;page&quot;</code>{' '}
          e os controles indisponíveis usam <code>disabled</code> nativo. Atenção a um
          comportamento conhecido: o resumo de celular fica sempre no DOM e continua exposto a
          leitores de tela no desktop.
        </li>
        <li>
          <strong>Resultado tabular.</strong> O clique de linha do DataTable não tem equivalente de
          teclado. Se a linha abre um registro, coloque um link real dentro dela.
        </li>
        <li>
          <strong>Cobertura automatizada.</strong> Entre os componentes deste padrão, apenas
          TextInput, Dropdown e Button têm teste axe. Chip, Skeleton, Spinner, ListItem, Card,
          DataTable, Badge, Link, Pagination e Alert <strong>não têm</strong> — nesses, o teste
          manual é obrigatório.
        </li>
        <li>
          <strong>Verificação manual mínima:</strong> completar uma busca inteira só com teclado;
          conferir se a contagem é anunciada ao trocar de termo; buscar um termo inexistente com
          leitor de tela e confirmar que a mensagem de resultado vazio é lida.
        </li>
      </ul>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem">
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns no padrão de busca, consequência e correção
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
              <th scope="row">Lupa sem rótulo</th>
              <td>Ninguém sabe o escopo da busca, e o campo fica sem nome acessível.</td>
              <td>
                Use o <code>label</code> obrigatório do TextInput dizendo onde a busca procura.
              </td>
            </tr>
            <tr>
              <th scope="row">Limpar o campo depois de buscar</th>
              <td>Corrigir uma letra obriga a redigitar o termo inteiro.</td>
              <td>Mantenha o termo e ofereça um “Limpar busca” explícito.</td>
            </tr>
            <tr>
              <th scope="row">Resultado sem contagem</th>
              <td>A pessoa não sabe se refina ou se já pode ler.</td>
              <td>Mostre “N resultados para X” acima da lista, em região com aria-live.</td>
            </tr>
            <tr>
              <th scope="row">Tela em branco quando não encontra</th>
              <td>A pessoa conclui que o serviço não existe e vai ao balcão.</td>
              <td>Repita o termo, explique o motivo provável e ofereça uma saída.</td>
            </tr>
            <tr>
              <th scope="row">Alert de erro para resultado vazio</th>
              <td>Parece que o sistema quebrou quando ele funcionou.</td>
              <td>Reserve o Alert para falha real; resultado vazio é bloco de conteúdo.</td>
            </tr>
            <tr>
              <th scope="row">Combobox improvisado com Dropdown</th>
              <td>
                Controle sem typeahead, que abre por seta e não desvia da borda da tela.
              </td>
              <td>Entregue busca sem sugestão e trate sinônimos e acentos no servidor.</td>
            </tr>
            <tr>
              <th scope="row">Informação essencial dentro de leading ou trailing</th>
              <td>O que diferencia os resultados não é lido por leitor de tela.</td>
              <td>
                Leve para <code>title</code> ou <code>description</code> do ListItem.
              </td>
            </tr>
            <tr>
              <th scope="row">Filtro que apaga o termo buscado</th>
              <td>A pessoa perde o resultado ao tentar refiná-lo.</td>
              <td>Busca e filtro são independentes; um não desfaz o outro.</td>
            </tr>
            <tr>
              <th scope="row">Estado só na memória da página</th>
              <td>Recarregar ou voltar apaga a busca inteira.</td>
              <td>Guarde termo, filtros, ordenação e página na URL.</td>
            </tr>
            <tr>
              <th scope="row">Trocar a lista por vazio durante a recarga</th>
              <td>A tela pisca e a pessoa perde a referência do que estava lendo.</td>
              <td>Mantenha o resultado anterior e sinalize a atualização com Spinner.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="pendencias">Pendências deste padrão</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de sugestão de busca, autocompletar ou
        combobox no sistema — fonte: time. Enquanto isso, o passo de sugestão da anatomia do fluxo
        não pode ser implementado com os componentes publicados. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de estado vazio nem região de anúncio de
        resultado (<code>aria-live</code>) no sistema — fonte: time. As duas peças centrais deste
        padrão precisam ser construídas por cada produto, o que abre espaço para divergência entre
        serviços. Registrado em <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
