import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Estados vazios',
  description:
    'Quatro telas sem conteúdo — lista vazia, busca sem resultado, primeiro acesso e erro de carregamento — e o que cada uma precisa dizer e oferecer.',
};

export default function PaginaPadraoEstadosVazios() {
  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Padrões', href: '/padroes/visao-geral' },
          { titulo: 'Estados vazios' },
        ]}
      />

      <h1>Estados vazios</h1>
      <p className="wiki-prosa__resumo">
        Uma tela sem conteúdo continua sendo uma tela. Este padrão trata dos quatro casos em que
        isso acontece — lista vazia, busca sem resultado, primeiro acesso e erro de carregamento —,
        do que cada um precisa dizer e da ação que cada um precisa oferecer.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Não existe componente de estado vazio no sistema</p>
        <p>
          Nenhum dos 38 componentes do Sampa Design System é um estado vazio. O que existe hoje é o{' '}
          <code>noDataComponent</code> do <Link href="/componentes/data-table">DataTable</Link>, que
          aceita qualquer nó e, sem valor, mostra o texto padrão{' '}
          <code>Nenhum dado encontrado</code>. Este padrão descreve como montar os estados vazios
          com os componentes existentes — e é proposta desta documentação, não norma validada.
        </p>
      </div>

      <h2 id="o-problema">O problema</h2>
      <p>
        A pessoa abre &quot;Meus pedidos&quot; e vê uma área branca. Ela não sabe se não tem pedido
        nenhum, se o sistema falhou, se o filtro escondeu tudo ou se a página ainda está
        carregando. Essas quatro situações são completamente diferentes, exigem ações diferentes — e
        todas produzem a mesma tela em branco quando ninguém as trata.
      </p>
      <p>
        O resultado prático é a pessoa recarregando a página várias vezes, ou abrindo um chamado
        para perguntar se o serviço está fora do ar. Um estado vazio bem escrito é a diferença entre
        entender e desconfiar.
      </p>

      <h2 id="quando-usar">Quando usar</h2>
      <ul>
        <li>Qualquer lista, tabela ou coleção que possa não ter itens.</li>
        <li>Qualquer resultado de busca ou de filtro.</li>
        <li>Qualquer área que dependa de dados vindos de outro sistema.</li>
        <li>
          A primeira visita a uma área que só ganha conteúdo depois que a pessoa faz alguma coisa.
        </li>
      </ul>

      <h2 id="quando-nao-usar">Quando não usar</h2>
      <ul>
        <li>
          <strong>Enquanto os dados estão a caminho.</strong> Carregamento não é vazio. Use{' '}
          <Link href="/componentes/skeleton">Skeleton</Link> ou{' '}
          <Link href="/componentes/spinner">Spinner</Link>. Mostrar &quot;Nenhum resultado&quot;
          antes da resposta chegar é mentira.
        </li>
        <li>
          <strong>Para um único campo em branco.</strong> Uma célula sem valor resolve-se com um
          traço ou com &quot;Não informado&quot;, não com um bloco de estado vazio.
        </li>
        <li>
          <strong>Quando a área é opcional.</strong> Se a seção não tem conteúdo e não tem ação
          associada, esconda a seção inteira em vez de exibir um bloco vazio.
        </li>
        <li>
          <strong>Para preencher espaço.</strong> Ilustração grande sem informação não ajuda
          ninguém a decidir o que fazer.
        </li>
      </ul>

      <h2 id="composicao">Composição</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes que compõem os estados vazios e o papel de cada um
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
                Ponto de injeção do estado vazio de tabelas: <code>noDataComponent</code> substitui
                o texto padrão <code>Nenhum dado encontrado</code>, e{' '}
                <code>progressPending</code> com <code>progressComponent</code> cobre o
                carregamento.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/skeleton">Skeleton</Link>
              </td>
              <td>
                Estrutura de carregamento antes de qualquer decisão sobre vazio. Aceita{' '}
                <code>lines</code>, <code>shape</code> e, com <code>ariaLabel</code>, passa a
                anunciar <code>role=&quot;status&quot;</code> e <code>aria-busy</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/spinner">Spinner</Link>
              </td>
              <td>Espera curta quando não dá para desenhar a estrutura do conteúdo.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/alert">Alert</Link>
              </td>
              <td>
                Erro de carregamento. Variante <code>error</code>, que já usa{' '}
                <code>role=&quot;alert&quot;</code>. Este é o único dos quatro estados que é um
                erro.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/button">Button</Link>
              </td>
              <td>
                A ação do estado vazio: criar o primeiro item, limpar filtros, tentar carregar de
                novo.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/link">Link</Link>
              </td>
              <td>Saída secundária: ajuda, outro caminho, voltar à lista completa.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/action-card">ActionCard</Link>
              </td>
              <td>
                Primeiro acesso com mais de um caminho possível: cada card é uma escolha acionável.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/card">Card</Link>
              </td>
              <td>
                Bloco de apresentação do serviço no primeiro acesso, com <code>title</code>,{' '}
                <code>description</code> e slot de <code>action</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/chip">Chip</Link>
              </td>
              <td>
                Mostra quais filtros estão ativos quando a busca não retorna nada — e permite
                removê-los.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/text-input">TextInput</Link>
              </td>
              <td>
                O campo de busca que originou o resultado vazio, com o termo digitado preservado (
                <code>type=&quot;search&quot;</code>).
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="anatomia-do-fluxo">Anatomia do fluxo</h2>
      <p>Do ponto de vista da pessoa, ao abrir uma área que pode estar vazia:</p>
      <ol>
        <li>
          <strong>Ela vê que algo está vindo.</strong> Skeleton com a forma do conteúdo esperado, ou
          Spinner. Nunca a área em branco.
        </li>
        <li>
          <strong>A resposta chega.</strong> A interface decide entre quatro desfechos: tem
          conteúdo, não tem nada ainda, tem conteúdo mas o filtro escondeu, ou falhou.
        </li>
        <li>
          <strong>Ela lê o que houve.</strong> Um título curto que responde &quot;por que não tem
          nada aqui?&quot;.
        </li>
        <li>
          <strong>Ela entende o que pode fazer.</strong> Uma frase de apoio, no máximo duas linhas.
        </li>
        <li>
          <strong>Ela age.</strong> Um botão com o próximo passo, e nada mais que compita com ele.
        </li>
      </ol>
      <p>
        Todo estado vazio tem a mesma anatomia: <strong>título</strong> (o que houve),{' '}
        <strong>apoio</strong> (o que isso significa) e <strong>ação</strong> (o que fazer agora). O
        que muda entre os quatro casos é o conteúdo de cada parte.
      </p>

      <h2 id="lista-vazia">Lista vazia</h2>
      <p>
        A consulta funcionou e a resposta é: não há nada. A pessoa está no lugar certo, o sistema
        está no ar, ela simplesmente ainda não tem itens.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Conteúdo do estado de lista vazia</caption>
          <thead>
            <tr>
              <th scope="col">Parte</th>
              <th scope="col">O que dizer</th>
              <th scope="col">Exemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Título</td>
              <td>O fato, sem drama</td>
              <td>Você ainda não tem pedidos</td>
            </tr>
            <tr>
              <td>Apoio</td>
              <td>Quando algo aparece aqui</td>
              <td>Os pedidos que você abrir ficam nesta lista.</td>
            </tr>
            <tr>
              <td>Ação</td>
              <td>O caminho para criar o primeiro item, se existir</td>
              <td>Button primary — Abrir novo pedido</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>Se a pessoa não pode criar nada ali, não invente um botão. Explique quem cria.</li>
        <li>
          Mantenha o cabeçalho, os filtros e a paginação da tela. Sumir com tudo faz parecer erro.
        </li>
        <li>
          Em tabela, passe o bloco em <code>noDataComponent</code> — o texto padrão{' '}
          <code>Nenhum dado encontrado</code> não diz o que fazer.
        </li>
      </ul>

      <h2 id="busca-sem-resultado">Busca sem resultado</h2>
      <p>
        Existem itens, mas nenhum atende ao que a pessoa pediu. A causa está na consulta dela — e é
        por isso que este estado é diferente da lista vazia: aqui há uma correção possível.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Conteúdo do estado de busca sem resultado
          </caption>
          <thead>
            <tr>
              <th scope="col">Parte</th>
              <th scope="col">O que dizer</th>
              <th scope="col">Exemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Título</td>
              <td>O resultado, repetindo o termo buscado</td>
              <td>Nenhum resultado para &quot;certidão de nascimento&quot;</td>
            </tr>
            <tr>
              <td>Apoio</td>
              <td>O que pode ser ajustado</td>
              <td>Verifique a grafia ou use um termo mais curto.</td>
            </tr>
            <tr>
              <td>Ação</td>
              <td>Desfazer a restrição</td>
              <td>Button secondary — Limpar filtros</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          <strong>Preserve o termo no campo.</strong> Apagar a busca obriga a pessoa a digitar tudo
          de novo.
        </li>
        <li>
          <strong>Mostre os filtros ativos.</strong> Com Chips, um por filtro, removíveis. Muitas
          vezes a busca não falhou: um filtro esquecido é que está eliminando tudo.
        </li>
        <li>
          <strong>Diga quantos filtros estão aplicados</strong> quando houver mais de um.
        </li>
        <li>Nunca redirecione automaticamente para uma busca diferente da que a pessoa fez.</li>
      </ul>

      <h2 id="primeiro-acesso">Primeiro acesso</h2>
      <p>
        A pessoa chegou a uma área que nunca usou. Tecnicamente é uma lista vazia, mas a necessidade
        é outra: ela ainda não sabe para que serve aquilo. Este é o único estado vazio em que cabe
        explicar o serviço.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Conteúdo do estado de primeiro acesso</caption>
          <thead>
            <tr>
              <th scope="col">Parte</th>
              <th scope="col">O que dizer</th>
              <th scope="col">Exemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Título</td>
              <td>O que a área faz por ela</td>
              <td>Acompanhe seus protocolos aqui</td>
            </tr>
            <tr>
              <td>Apoio</td>
              <td>O que ela precisa ter em mãos e quanto tempo leva</td>
              <td>
                Você vai precisar do número do protocolo. O acompanhamento é atualizado a cada
                movimentação.
              </td>
            </tr>
            <tr>
              <td>Ação</td>
              <td>Um único primeiro passo</td>
              <td>Button primary — Cadastrar protocolo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          <strong>Uma ação principal.</strong> Se houver mais de um caminho válido, use ActionCards
          — cada card uma escolha, com título e descrição.
        </li>
        <li>
          <strong>Não repita a explicação para sempre.</strong> Assim que existir um item, o estado
          de primeiro acesso não aparece mais.
        </li>
        <li>
          <strong>Nada de tour nem de sequência de dicas.</strong> O sistema não tem componente para
          isso, e o texto de apoio resolve.
        </li>
      </ul>

      <h2 id="erro-de-carregamento">Erro de carregamento</h2>
      <p>
        Não é um estado vazio de verdade: é uma falha. Os dados podem existir — o sistema é que não
        conseguiu buscá-los. Tratar isso como &quot;nenhum resultado&quot; é o erro mais grave deste
        padrão, porque leva a pessoa a concluir que perdeu um pedido, um benefício ou um protocolo.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Conteúdo do estado de erro de carregamento
          </caption>
          <thead>
            <tr>
              <th scope="col">Parte</th>
              <th scope="col">O que dizer</th>
              <th scope="col">Exemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Título</td>
              <td>Que a falha é do sistema</td>
              <td>Não foi possível carregar seus pedidos</td>
            </tr>
            <tr>
              <td>Apoio</td>
              <td>O que isso significa para os dados dela</td>
              <td>Seus pedidos continuam registrados. O problema é na exibição.</td>
            </tr>
            <tr>
              <td>Ação</td>
              <td>Repetir a tentativa</td>
              <td>Button primary — Tentar de novo</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>
          Use <Link href="/componentes/alert">Alert</Link> na variante <code>error</code>. É o único
          dos quatro estados que precisa de anúncio imediato.
        </li>
        <li>
          <strong>Diga explicitamente que os dados não foram perdidos</strong>, quando for verdade.
          É a primeira dúvida da pessoa.
        </li>
        <li>Não mostre código de erro, nome de serviço interno nem stack trace.</li>
        <li>
          Se a falha for parcial — parte da lista carregou —, mostre o que carregou e o Alert acima,
          em vez de esvaziar a tela.
        </li>
      </ul>

      <h2 id="regras">Regras</h2>
      <ul>
        <li>
          <strong>Carregamento nunca é vazio.</strong> Enquanto a resposta não chega, Skeleton ou
          Spinner. Só depois a interface decide qual dos quatro estados mostrar.
        </li>
        <li>
          <strong>Os quatro estados têm textos diferentes.</strong> Se a sua tela mostra a mesma
          frase para lista vazia e para falha, ela está errada.
        </li>
        <li>
          <strong>Título, apoio e ação.</strong> Nessa ordem, sempre. Sem a ação, o estado vazio é
          um beco.
        </li>
        <li>
          <strong>Uma ação principal.</strong> No máximo uma secundária, como Link.
        </li>
        <li>
          <strong>Não esvazie a tela inteira.</strong> Cabeçalho, navegação, busca e filtros
          continuam onde estavam. Só a região de conteúdo muda.
        </li>
        <li>
          <strong>O texto fala do que a pessoa quer, não da estrutura de dados.</strong>{' '}
          &quot;Nenhum registro retornado&quot; é vocabulário de banco de dados.
        </li>
        <li>
          <strong>Erro de carregamento usa Alert; os outros três, não.</strong> Lista vazia e busca
          sem resultado são respostas normais do sistema — pintá-las de vermelho assusta sem motivo.
        </li>
        <li>
          <strong>Não prometa o que não existe.</strong> Se não há como criar o primeiro item pela
          interface, diga onde se cria.
        </li>
      </ul>

      <h2 id="do-e-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Distinguir &quot;Você ainda não tem pedidos&quot; de &quot;Não foi possível carregar
              seus pedidos&quot;.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Mostrar &quot;Nenhum dado encontrado&quot; nos dois casos.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: no primeiro caso não há nada a fazer; no segundo, a pessoa precisa tentar de
            novo. Tratados igual, ela conclui que perdeu o pedido dela.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Manter o termo digitado no campo de busca e mostrar os filtros ativos como Chips
              removíveis.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Limpar o campo e esconder os filtros junto com os resultados.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: sem ver o que restringiu a busca, a pessoa não tem como corrigir. Um filtro
            esquecido costuma ser a causa real do resultado vazio.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Mostrar Skeleton com a forma da lista enquanto os dados carregam, e só então decidir o
              estado.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Renderizar &quot;Nenhum resultado&quot; no primeiro quadro e trocar pelo conteúdo
              quando a resposta chega.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: a pessoa lê a primeira mensagem e sai. Além disso, quem usa leitor de tela pode
            ouvir o anúncio de vazio para uma lista que existe.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Terminar todo estado vazio com uma ação: criar, limpar filtros ou tentar de novo.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Deixar só uma ilustração grande e a frase &quot;Nada por aqui&quot;.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: a ilustração não informa nem resolve. Sem próximo passo, a pessoa recarrega a
            página ou abandona o serviço.
          </p>
        </div>
      </div>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <ul>
        <li>
          <strong>Anuncie a troca de estado.</strong> Quando a lista sai do carregamento e vira
          vazia, quem não vê a tela precisa saber. Uma região viva que contenha o texto do estado
          resolve — ou o próprio Alert, no caso de erro.
        </li>
        <li>
          <strong>Skeleton é decorativo por padrão.</strong> Ele aplica{' '}
          <code>aria-hidden=&quot;true&quot;</code> quando não recebe <code>ariaLabel</code>. Para
          que a espera seja anunciada, passe <code>ariaLabel</code> — aí ele vira{' '}
          <code>role=&quot;status&quot;</code> com <code>aria-busy=&quot;true&quot;</code>.
        </li>
        <li>
          <strong>Um Skeleton anunciado por região.</strong> Dez skeletons com{' '}
          <code>ariaLabel</code> viram dez anúncios. Anuncie a região, não cada linha.
        </li>
        <li>
          <strong>O título do estado vazio é um heading real.</strong> Use o nível que continua a
          hierarquia da página, para que a navegação por títulos não quebre.
        </li>
        <li>
          <strong>Foco depois da ação.</strong> Ao limpar filtros ou tentar de novo, mova o foco
          para o início da região atualizada.
        </li>
        <li>
          <strong>A ilustração não carrega significado.</strong> Se houver imagem, ela é decorativa
          — o texto precisa bastar sozinho.
        </li>
        <li>
          <strong>Contraste do texto vazio.</strong> Não use tom de cinza mais fraco só porque o
          conteúdo é &quot;secundário&quot;. Esse texto é o conteúdo principal da tela naquele
          momento.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> Skeleton, Spinner, Alert e DataTable não têm teste
        automatizado de acessibilidade — não existem os arquivos <code>.a11y.test.tsx</code> desses
        componentes — fonte: inventário dos componentes. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns em estados vazios, consequência e correção
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
              <td>Mesma mensagem para vazio e para falha</td>
              <td>A pessoa acha que perdeu um pedido</td>
              <td>Alert error na falha; texto neutro no vazio</td>
            </tr>
            <tr>
              <td>Estado vazio exibido antes da resposta chegar</td>
              <td>A pessoa sai antes de o conteúdo aparecer</td>
              <td>Skeleton ou Spinner enquanto carrega</td>
            </tr>
            <tr>
              <td>
                Texto padrão <code>Nenhum dado encontrado</code> mantido em produção
              </td>
              <td>Nenhuma orientação sobre o que fazer</td>
              <td>
                Passe um bloco próprio em <code>noDataComponent</code>
              </td>
            </tr>
            <tr>
              <td>Busca sem resultado limpando o campo</td>
              <td>A pessoa digita tudo de novo</td>
              <td>Preserve o termo e mostre os filtros ativos</td>
            </tr>
            <tr>
              <td>Estado vazio sem nenhuma ação</td>
              <td>A tela vira um beco sem saída</td>
              <td>Sempre um próximo passo, mesmo que seja voltar</td>
            </tr>
            <tr>
              <td>Toda a tela esvaziada, inclusive filtros e cabeçalho</td>
              <td>Parece que a página quebrou</td>
              <td>Troque apenas a região de conteúdo</td>
            </tr>
            <tr>
              <td>Linguagem de banco de dados</td>
              <td>A pessoa não entende o que é um &quot;registro&quot;</td>
              <td>Fale do que ela procurava: pedidos, protocolos, agendamentos</td>
            </tr>
            <tr>
              <td>Explicação de primeiro acesso que nunca some</td>
              <td>Ocupa espaço de quem já usa o serviço</td>
              <td>Mostre só enquanto não existir nenhum item</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
