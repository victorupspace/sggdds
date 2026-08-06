import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Login e identificação',
  description:
    'Padrão de identificação e entrada em serviços do Estado de São Paulo: acionamento do gov.br com ButtonGov, caminho para quem não tem conta e o que a pessoa vê depois de entrar.',
};

export default function PaginaPadraoLogin() {
  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Padrões', href: '/padroes/visao-geral' },
          { titulo: 'Login e identificação' },
        ]}
      />

      <h1>Login e identificação</h1>
      <p className="wiki-prosa__resumo">
        Este padrão descreve como um serviço do Estado pede que a pessoa se identifique. A entrada
        acontece pelo gov.br, acionada pelo componente{' '}
        <Link href="/componentes/button-gov">ButtonGov</Link>. O padrão cobre o momento anterior à
        entrada, o redirecionamento, o retorno e o que a interface mostra quando a pessoa já está
        identificada.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Este padrão é conteúdo novo</p>
        <p>
          Não existe padrão de login documentado no Figma nem no Storybook do Sampa Design System. O
          que está escrito aqui é uma proposta desta documentação, construída a partir da API real
          dos componentes existentes. Precisa de validação antes de virar norma.
        </p>
      </div>

      <h2 id="o-problema">O problema</h2>
      <p>
        A pessoa chega ao serviço para resolver alguma coisa: emitir uma segunda via, acompanhar um
        protocolo, agendar um atendimento. O login não é o objetivo dela — é um pedágio. Quando esse
        pedágio é confuso, a pessoa desiste antes de exercer um direito.
      </p>
      <p>Três situações se repetem e precisam de resposta:</p>
      <ul>
        <li>
          A pessoa não sabe se precisa entrar. Ela clica no serviço e é jogada numa tela de login
          sem entender por quê.
        </li>
        <li>
          A pessoa não tem conta gov.br, ou não lembra que tem. Se a tela só oferece o botão de
          entrar, ela trava.
        </li>
        <li>
          A pessoa entra, volta ao serviço e não reconhece que está identificada. Recomeça o
          caminho, às vezes tentando entrar de novo.
        </li>
      </ul>

      <h2 id="quando-usar">Quando usar</h2>
      <ul>
        <li>
          O serviço trata dados pessoais da própria pessoa — CPF, endereço, histórico, benefícios,
          documentos.
        </li>
        <li>O serviço gera um ato com efeito jurídico em nome da pessoa.</li>
        <li>
          O serviço precisa recuperar um estado anterior: um pedido em andamento, um agendamento,
          uma solicitação salva pela metade.
        </li>
        <li>
          A pessoa precisa assinar, autorizar ou confirmar algo que só ela pode confirmar.
        </li>
      </ul>

      <h2 id="quando-nao-usar">Quando não usar</h2>
      <ul>
        <li>
          <strong>Consulta pública.</strong> Se a informação é pública — endereço de uma unidade,
          horário de funcionamento, texto de uma lei —, não peça identificação.
        </li>
        <li>
          <strong>Antes de explicar o serviço.</strong> A tela de login não pode ser a primeira
          coisa que a pessoa vê. Ela precisa saber o que vai fazer antes de provar quem é.
        </li>
        <li>
          <strong>Para etapas informativas de um fluxo.</strong> Se as três primeiras etapas de um
          formulário são de preenchimento livre e só a quarta exige identificação, peça o login na
          quarta.
        </li>
        <li>
          <strong>Como barreira de leitura.</strong> Não use login para medir audiência ou coletar
          contato.
        </li>
      </ul>

      <h2 id="composicao">Composição</h2>
      <p>
        Todos os componentes abaixo existem hoje no sistema. A composição entre eles é a proposta
        deste padrão.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes que compõem o padrão de login e o papel de cada um
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
                <Link href="/componentes/button-gov">ButtonGov</Link>
              </td>
              <td>
                Único acionador da entrada. Label padrão <code>Entrar com o gov.br</code>. Aceita{' '}
                <code>href</code> — renderiza <code>&lt;a&gt;</code> quando o destino é o
                redirecionamento — e <code>isLoading</code> para o instante entre o clique e a saída
                da página.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/link">Link</Link>
              </td>
              <td>
                Caminho secundário: criar conta, saber o que é o gov.br, voltar ao serviço sem
                entrar.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/alert">Alert</Link>
              </td>
              <td>
                Falha de autenticação que precisa permanecer na tela. Variante <code>error</code> —
                que já aplica <code>role=&quot;alert&quot;</code> por padrão.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/spinner">Spinner</Link>
              </td>
              <td>
                Espera na volta do gov.br, enquanto o serviço valida a sessão e decide para onde
                mandar a pessoa.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/header">Header</Link>
              </td>
              <td>
                Estado de identificação persistente. A prop <code>accountAction</code> tem valor
                padrão <code>{'{ label: \'Entrar com o gov.br\' }'}</code> e é ignorada quando{' '}
                <code>user</code> está definida; com <code>user</code>, o Header troca o botão pelo
                User Menu.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/avatar">Avatar</Link>
              </td>
              <td>
                Representação da pessoa identificada dentro do User Menu do Header. Aceita{' '}
                <code>name</code>, <code>initials</code> e <code>src</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/button">Button</Link>
              </td>
              <td>
                Ações que não são a entrada: continuar sem entrar, voltar, tentar de novo depois de
                uma falha.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/hero">Hero</Link>
              </td>
              <td>
                Bloco de abertura da página que antecede o login, explicando o serviço. Aceita{' '}
                <code>actions</code>, onde o ButtonGov pode ser colocado.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/modal">Modal</Link>
              </td>
              <td>
                Apenas para confirmar a saída (<code>Sair</code>) quando há trabalho não salvo. Não
                use Modal para pedir o login.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de formulário de login local (usuário e
        senha) no Sampa Design System — fonte: time. O{' '}
        <Link href="/componentes/text-input">TextInput</Link> aceita{' '}
        <code>type=&quot;password&quot;</code>, mas nenhum padrão de conta própria do Estado está
        definido. Falta decidir se serviços do Estado podem ter identificação fora do gov.br e, se
        puderem, qual é a regra. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="anatomia-do-fluxo">Anatomia do fluxo</h2>
      <p>Do ponto de vista da pessoa, em ordem:</p>
      <ol>
        <li>
          <strong>Ela entende o serviço.</strong> Nome do serviço, o que ele resolve, o que ela
          precisa ter em mãos e quanto tempo leva. Sem pedir nada ainda.
        </li>
        <li>
          <strong>Ela lê por que precisa se identificar.</strong> Uma frase, junto do botão: o que o
          serviço vai acessar e por quê.
        </li>
        <li>
          <strong>Ela aciona o ButtonGov.</strong> O botão passa a <code>isLoading</code> — o que
          aplica <code>aria-busy=&quot;true&quot;</code> e bloqueia novo clique — e a página
          redireciona.
        </li>
        <li>
          <strong>Ela se autentica no gov.br.</strong> Fora do domínio do serviço, em interface que
          não é do Sampa Design System.
        </li>
        <li>
          <strong>Ela volta.</strong> O serviço mostra uma espera curta com Spinner enquanto valida
          a sessão.
        </li>
        <li>
          <strong>Ela retoma exatamente de onde parou.</strong> Se o login foi pedido no meio de um
          fluxo, ela volta para aquela etapa — não para a página inicial.
        </li>
        <li>
          <strong>Ela reconhece que está identificada.</strong> O Header mostra o User Menu com o
          nome dela no lugar do botão de entrar.
        </li>
      </ol>

      <h2 id="sem-conta">Quem não tem conta gov.br</h2>
      <p>
        Este é o caminho que mais se perde. A tela que pede o login precisa oferecer, no mesmo
        lugar e com o mesmo destaque de leitura, a saída para criar a conta:
      </p>
      <ul>
        <li>
          Um <Link href="/componentes/link">Link</Link> explícito com o texto{' '}
          <em>Ainda não tenho conta gov.br</em>, imediatamente abaixo do ButtonGov. Não use o
          ButtonGov para essa ação: a documentação do componente diz que ele é exclusivo de
          entrada e autenticação.
        </li>
        <li>
          Uma frase curta dizendo o que a pessoa precisa para criar a conta, antes de ela sair da
          página.
        </li>
        <li>
          O aviso de que, depois de criar a conta, ela vai precisar voltar e entrar — e um caminho
          de volta ao serviço.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a URL oficial de criação de conta gov.br a ser usada pelos
        serviços do Estado, e o comportamento de retorno depois do cadastro — fonte: time e
        documentação oficial do gov.br. Nada disso está no código nem no Figma do Sampa Design
        System. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="niveis">Níveis de confiabilidade da conta</h2>
      <p>
        A conta gov.br tem níveis de confiabilidade — <strong>bronze</strong>,{' '}
        <strong>prata</strong> e <strong>ouro</strong>. Isso é uma característica da conta gov.br,
        do Governo Federal, e não do Sampa Design System.
      </p>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">O sistema não trata níveis hoje</p>
        <p>
          Nenhum componente do Sampa Design System lê, exibe ou valida nível de conta. O ButtonGov
          apenas aciona a entrada. Não existe selo, badge ou estado de &quot;nível
          insuficiente&quot; no sistema. Se o seu serviço exige um nível mínimo, a interface dessa
          exigência é responsabilidade do produto — e deve ser levada ao time do design system para
          virar padrão.
        </p>
      </div>
      <p>Quando o serviço exigir um nível mínimo, este padrão recomenda:</p>
      <ul>
        <li>
          Dizer o nível exigido <strong>antes</strong> do clique, junto do ButtonGov — não depois de
          a pessoa ir ao gov.br e voltar.
        </li>
        <li>
          No retorno com nível insuficiente, usar <Link href="/componentes/alert">Alert</Link> na
          variante <code>warning</code>, explicando o que falta e como elevar o nível. Não é um erro
          da pessoa: é um requisito que ela ainda não cumpre.
        </li>
        <li>
          Nunca expulsar a pessoa da página. Ela precisa poder voltar ao ponto em que estava.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> quais serviços do Estado exigem cada nível, como a aplicação
        recebe o nível da conta e qual componente representa esse estado na interface — fonte: time.
        Não há nada sobre isso no código, no Figma ou no Storybook. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="depois-de-entrar">O que a pessoa vê depois de entrar</h2>
      <p>
        A identificação precisa ficar visível o tempo todo, não só na tela seguinte ao login. O{' '}
        <Link href="/componentes/header">Header</Link> resolve isso: quando a prop <code>user</code>{' '}
        é definida, ele substitui o botão gov.br pelo User Menu — Avatar, nome e seta — que abre um
        painel com <code>Minha conta</code>, <code>Configurações</code> e <code>Sair</code>.
      </p>
      <p>Na primeira tela depois do retorno, a pessoa precisa de três respostas:</p>
      <ol>
        <li>
          <strong>Deu certo?</strong> O nome dela no Header já responde. Se o serviço quiser
          confirmar de forma explícita, use <Link href="/componentes/toast">Toast</Link> na variante{' '}
          <code>positive</code> — mensagem curta, que some sozinha.
        </li>
        <li>
          <strong>Onde eu estou?</strong> A pessoa volta para a etapa que motivou o login, não para
          uma página de boas-vindas.
        </li>
        <li>
          <strong>O que faço agora?</strong> A próxima ação precisa estar visível sem rolagem.
        </li>
      </ol>

      <h2 id="regras">Regras</h2>
      <ul>
        <li>
          <strong>Um único acionador de entrada por tela.</strong> Se houver dois ButtonGov na mesma
          página, a pessoa vai duvidar de que são a mesma coisa.
        </li>
        <li>
          <strong>Não altere o label padrão.</strong> <code>Entrar com o gov.br</code> é o texto que
          a pessoa reconhece entre serviços. O componente divide esse texto em dois pesos para
          preservar a marca; ao trocar o label, essa divisão deixa de acontecer.
        </li>
        <li>
          <strong>Explique o pedido antes do botão.</strong> Uma frase que diga o que o serviço vai
          acessar. Sem essa frase, o login parece arbitrário.
        </li>
        <li>
          <strong>Peça o login o mais tarde possível.</strong> Deixe a pessoa avançar até o ponto em
          que a identificação é realmente necessária.
        </li>
        <li>
          <strong>Preserve o que já foi preenchido.</strong> Se o login interrompe um formulário, os
          dados precisam estar lá na volta.
        </li>
        <li>
          <strong>Bloqueie o clique repetido.</strong> Use <code>isLoading</code> no ButtonGov entre
          o clique e o redirecionamento — ele já bloqueia a interação, porque{' '}
          <code>isDisabled = disabled || isLoading</code>.
        </li>
        <li>
          <strong>Sair é sempre visível.</strong> Se dá para entrar, tem que dar para sair, do mesmo
          lugar: o User Menu do Header.
        </li>
        <li>
          <strong>Erro de autenticação não é toast.</strong> Se a pessoa precisa fazer algo a
          respeito, a mensagem tem que permanecer — use Alert.
        </li>
      </ul>

      <h2 id="do-e-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Mostrar o que o serviço faz e por que a identificação é necessária, e só então o
              ButtonGov.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Abrir o serviço direto numa tela em que só existe o botão de entrar.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: quem não sabe o que vai encontrar do outro lado não tem motivo para se
            identificar. A tela de login sozinha não informa nada.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Colocar <em>Ainda não tenho conta gov.br</em> como Link logo abaixo do ButtonGov.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Usar um segundo ButtonGov, com label trocado, para mandar a pessoa criar a conta.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: a própria documentação do ButtonGov restringe o componente à entrada e
            autenticação. Dois botões iguais com destinos diferentes desfazem o reconhecimento do
            botão gov.br.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Devolver a pessoa para a etapa exata que motivou o login, com o que ela já tinha
              preenchido.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Levar todo mundo para a página inicial depois de autenticar.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: recomeçar é o momento em que a pessoa desiste. O login é um desvio dentro da
            tarefa dela, não o começo de uma tarefa nova.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Manter o nome da pessoa no Header, via prop <code>user</code>, em todas as telas
              depois da entrada.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Confirmar a entrada só com um Toast e deixar o Header mostrando &quot;Entrar com o
              gov.br&quot;.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: o Toast some — por padrão em 5 segundos. Se o Header continua oferecendo a
            entrada, a pessoa entende que não entrou e tenta de novo.
          </p>
        </div>
      </div>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <p>O que verificar especificamente neste padrão:</p>
      <ul>
        <li>
          <strong>Nome acessível do botão.</strong> O ButtonGov quebra o label padrão em dois spans
          e, por isso, resolve <code>aria-label</code> para <code>Entrar com o gov.br</code>. Se
          você trocar o <code>children</code>, passe <code>ariaLabel</code> — senão o nome acessível
          vira o texto quebrado.
        </li>
        <li>
          <strong>Durante o loading.</strong> Com <code>isLoading</code>, o rótulo visível passa a
          ser <code>loadingLabel</code> (padrão <code>Carregando</code>) e o{' '}
          <code>aria-label</code> automático deixa de ser preenchido. Se o texto{' '}
          <code>Carregando</code> não descreve o que está acontecendo, passe um{' '}
          <code>loadingLabel</code> específico, como{' '}
          <code>Redirecionando para o gov.br</code>.
        </li>
        <li>
          <strong>Modo link desabilitado.</strong> Com <code>href</code> e{' '}
          <code>disabled</code> ou <code>isLoading</code>, o componente aplica{' '}
          <code>aria-disabled=&quot;true&quot;</code> e <code>{'tabIndex={-1}'}</code>, tirando o
          elemento da ordem de tabulação. Confirme que a pessoa não fica sem nenhum destino de foco.
        </li>
        <li>
          <strong>Foco na volta.</strong> Quando a pessoa retorna do gov.br, mova o foco para o
          início do conteúdo principal da página de retorno. Sem isso, quem usa leitor de tela
          recomeça a leitura pelo cabeçalho.
        </li>
        <li>
          <strong>Anúncio do erro.</strong> O Alert na variante <code>error</code> já usa{' '}
          <code>role=&quot;alert&quot;</code>. Renderize o Alert só quando o erro acontece — se ele
          já estiver no DOM desde o carregamento, o anúncio não dispara.
        </li>
        <li>
          <strong>Área de toque no celular.</strong> Abaixo de 420px o ButtonGov passa a ocupar 100%
          do container. Verifique que o container tem largura útil e que o botão não fica espremido
          contra a borda.
        </li>
        <li>
          <strong>Contraste do foco.</strong> O anel de foco do ButtonGov usa{' '}
          <code>--ds-semantic-text-style-content-color-typography-secondary</code>. Confirme o
          contraste dele contra o fundo real da sua tela de login.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o ButtonGov não tem teste automatizado de acessibilidade — não
        existe arquivo <code>ButtonGov.a11y.test.tsx</code> — fonte: inventário do componente.
        Enquanto isso, a verificação do padrão de login precisa ser manual. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns no padrão de login, consequência e correção
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
              <td>Login logo na abertura do serviço</td>
              <td>A pessoa sai sem saber o que perdeu</td>
              <td>Explique o serviço primeiro; peça a identificação na etapa que precisa dela</td>
            </tr>
            <tr>
              <td>Nenhuma saída para quem não tem conta</td>
              <td>O fluxo termina ali</td>
              <td>Link para criar conta, logo abaixo do ButtonGov</td>
            </tr>
            <tr>
              <td>Label do botão reescrito (&quot;Acessar&quot;, &quot;Login&quot;)</td>
              <td>
                A pessoa não reconhece a entrada do gov.br e o nome acessível automático deixa de
                valer
              </td>
              <td>
                Mantenha <code>Entrar com o gov.br</code>
              </td>
            </tr>
            <tr>
              <td>Perda dos dados preenchidos após o redirecionamento</td>
              <td>A pessoa preenche tudo de novo e erra mais</td>
              <td>Persista o rascunho antes de sair da página</td>
            </tr>
            <tr>
              <td>Erro de autenticação em Toast</td>
              <td>A mensagem desaparece antes de ser lida</td>
              <td>Use Alert na variante error, que permanece na tela</td>
            </tr>
            <tr>
              <td>Botão sem estado de espera</td>
              <td>Cliques repetidos e sessões duplicadas</td>
              <td>
                <code>isLoading</code> entre o clique e o redirecionamento
              </td>
            </tr>
            <tr>
              <td>Nível de conta exigido só revelado no retorno</td>
              <td>A pessoa faz o caminho inteiro para ser barrada no fim</td>
              <td>Informe a exigência antes do clique</td>
            </tr>
            <tr>
              <td>Header continua deslogado depois da entrada</td>
              <td>A pessoa tenta entrar de novo</td>
              <td>
                Defina a prop <code>user</code> do Header assim que a sessão existir
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
