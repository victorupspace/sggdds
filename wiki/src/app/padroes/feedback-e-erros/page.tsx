import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Feedback e erros',
  description:
    'Quando usar Alert, Toast, Modal ou mensagem inline; hierarquia de severidade; como escrever uma mensagem de erro que resolve; diferença entre erro de sistema e erro de preenchimento.',
};

export default function PaginaPadraoFeedbackEErros() {
  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Padrões', href: '/padroes/visao-geral' },
          { titulo: 'Feedback e erros' },
        ]}
      />

      <h1>Feedback e erros</h1>
      <p className="wiki-prosa__resumo">
        Toda ação da pessoa precisa de resposta. Este padrão define qual componente carrega cada
        tipo de resposta — <Link href="/componentes/alert">Alert</Link>,{' '}
        <Link href="/componentes/toast">Toast</Link>, <Link href="/componentes/modal">Modal</Link>{' '}
        ou mensagem inline no próprio campo —, como ordenar a severidade e como escrever uma
        mensagem de erro que a pessoa consegue resolver sozinha.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Este padrão é conteúdo novo</p>
        <p>
          Os componentes citados existem e estão documentados individualmente. A regra de escolha
          entre eles, a hierarquia de severidade e o modelo de escrita são propostas desta
          documentação e precisam de validação.
        </p>
      </div>

      <h2 id="o-problema">O problema</h2>
      <p>
        A pessoa clica em &quot;Enviar&quot; e nada acontece na tela. Ela clica de novo. Ou preenche
        um formulário longo, envia, e recebe uma faixa vermelha no topo dizendo &quot;Erro ao
        processar a solicitação&quot; — sem saber qual campo está errado nem o que fazer. Ou vê uma
        mensagem verde piscar e sumir antes de conseguir ler.
      </p>
      <p>
        O custo disso em serviço público é concreto: pedido reenviado várias vezes, protocolo
        duplicado, atendimento presencial que não precisaria existir. Um feedback mal colocado
        transfere para a pessoa um trabalho que era do sistema.
      </p>

      <h2 id="quando-usar">Quando usar</h2>
      <p>Este padrão vale sempre que o sistema precisar dizer alguma coisa à pessoa:</p>
      <ul>
        <li>Uma ação terminou — com sucesso ou não.</li>
        <li>Alguma coisa está acontecendo e leva tempo.</li>
        <li>O que a pessoa digitou não serve.</li>
        <li>Existe uma condição do serviço que ela precisa saber antes de continuar — prazo, requisito, indisponibilidade.</li>
        <li>Uma ação é irreversível e precisa de confirmação.</li>
      </ul>

      <h2 id="quando-nao-usar">Quando não usar</h2>
      <ul>
        <li>
          <strong>Para narrar o óbvio.</strong> Se a tela já mudou de forma evidente — o item saiu
          da lista, a etapa avançou —, não acrescente uma mensagem confirmando.
        </li>
        <li>
          <strong>Como texto explicativo permanente.</strong> Instrução de preenchimento é{' '}
          <code>helperText</code> do campo, não Alert. Alert que está sempre lá deixa de ser lido.
        </li>
        <li>
          <strong>Para marketing ou agradecimento.</strong> &quot;Obrigado por usar nosso
          serviço&quot; não é feedback.
        </li>
        <li>
          <strong>Empilhado.</strong> Três avisos simultâneos no topo da página equivalem a nenhum.
        </li>
      </ul>

      <h2 id="composicao">Composição</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes que compõem o padrão de feedback e o papel de cada um
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
                <Link href="/componentes/alert">Alert</Link>
              </td>
              <td>
                Mensagem que <strong>permanece</strong> na tela, ligada a um contexto. Variantes{' '}
                <code>information</code>, <code>success</code>, <code>warning</code>,{' '}
                <code>error</code>. Role padrão <code>status</code>, exceto <code>error</code>, que
                usa <code>alert</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/toast">Toast</Link>
              </td>
              <td>
                Mensagem <strong>temporária</strong> e não modal. Variantes <code>brand</code>,{' '}
                <code>neutral</code>, <code>positive</code>, <code>information</code>,{' '}
                <code>notice</code>, <code>negative</code>. Fecha sozinho em{' '}
                <code>duration</code> (5000 ms por padrão) e aceita até duas ações.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/modal">Modal</Link>
              </td>
              <td>
                Interrupção deliberada: confirmar algo irreversível ou tratar um bloqueio que impede
                qualquer outra coisa. <code>role=&quot;dialog&quot;</code> com{' '}
                <code>aria-modal=&quot;true&quot;</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/text-input">TextInput</Link>
              </td>
              <td>
                Erro de preenchimento no próprio campo, via <code>errorText</code> e{' '}
                <code>state=&quot;error&quot;</code>, com <code>aria-invalid</code> e{' '}
                <code>aria-describedby</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/dropdown">Dropdown</Link>
              </td>
              <td>
                Mesma mecânica de erro inline do TextInput: <code>errorText</code> e{' '}
                <code>state</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/file-upload">FileUpload</Link>
              </td>
              <td>
                Erro de arquivo no próprio campo. Definir <code>errorText</code> já força o estado
                de erro.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/progress-bar">ProgressBar</Link>
              </td>
              <td>
                Feedback de processo demorado com progresso conhecido (<code>determinate</code>) ou
                não (<code>indeterminate</code>). Variantes <code>success</code> e{' '}
                <code>error</code> comunicam o desfecho.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/spinner">Spinner</Link>
              </td>
              <td>
                Espera curta e indeterminada. <code>role=&quot;status&quot;</code> com{' '}
                <code>aria-busy</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/button">Button</Link>
              </td>
              <td>
                Feedback no ponto do clique: <code>isLoading</code> aplica{' '}
                <code>aria-busy=&quot;true&quot;</code> e bloqueia repetição.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="qual-componente">Qual componente usar</h2>
      <p>
        A escolha depende de duas perguntas: <strong>a pessoa precisa fazer alguma coisa?</strong> e{' '}
        <strong>a mensagem precisa continuar visível?</strong>
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Critério de escolha entre mensagem inline, Alert, Toast e Modal
          </caption>
          <thead>
            <tr>
              <th scope="col">Situação</th>
              <th scope="col">Componente</th>
              <th scope="col">Por quê</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>O que a pessoa digitou num campo não serve</td>
              <td>Mensagem inline no campo</td>
              <td>
                O erro pertence ao campo. Longe dele, a pessoa não sabe o que corrigir.
              </td>
            </tr>
            <tr>
              <td>Condição que vale para a tela inteira e precisa continuar visível</td>
              <td>Alert</td>
              <td>Permanece no DOM até ser dispensado ou removido pela aplicação.</td>
            </tr>
            <tr>
              <td>Confirmação curta de algo que deu certo, sem próxima ação</td>
              <td>Toast</td>
              <td>Informa sem ocupar espaço permanente nem exigir dispensa.</td>
            </tr>
            <tr>
              <td>Ação irreversível esperando confirmação</td>
              <td>Modal</td>
              <td>Interrompe de propósito e concentra a decisão.</td>
            </tr>
            <tr>
              <td>Falha que impede continuar e exige uma decisão</td>
              <td>Alert (ou Modal, se bloqueia tudo)</td>
              <td>Precisa permanecer enquanto a pessoa decide.</td>
            </tr>
            <tr>
              <td>Processo em andamento com fim previsível</td>
              <td>ProgressBar</td>
              <td>Mostra quanto falta e evita a sensação de travamento.</td>
            </tr>
            <tr>
              <td>Espera curta, sem progresso conhecido</td>
              <td>Spinner ou Button com isLoading</td>
              <td>Diz que o sistema recebeu o clique.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">O Toast não tem região de empilhamento</p>
        <p>
          O componente Toast não implementa fila, viewport nem portal: o posicionamento e o
          empilhamento ficam por conta de quem consome. Enquanto não houver um padrão de região de
          toasts no sistema, mostre <strong>um toast por vez</strong>.
        </p>
      </div>

      <h2 id="severidade">Hierarquia de severidade</h2>
      <p>
        Quatro níveis, do mais grave ao menos grave. Se duas mensagens competem pelo mesmo espaço,
        mostre a mais grave primeiro.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Níveis de severidade, variantes correspondentes e regra de anúncio
          </caption>
          <thead>
            <tr>
              <th scope="col">Nível</th>
              <th scope="col">Significa</th>
              <th scope="col">Alert</th>
              <th scope="col">Toast</th>
              <th scope="col">Anúncio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. Erro</td>
              <td>A pessoa não consegue continuar sem agir</td>
              <td>
                <code>error</code>
              </td>
              <td>
                <code>negative</code>
              </td>
              <td>
                <code>role=&quot;alert&quot;</code> — interrompe a leitura
              </td>
            </tr>
            <tr>
              <td>2. Atenção</td>
              <td>Dá para continuar, mas há consequência</td>
              <td>
                <code>warning</code>
              </td>
              <td>
                <code>notice</code>
              </td>
              <td>
                <code>role=&quot;status&quot;</code> — espera a pausa
              </td>
            </tr>
            <tr>
              <td>3. Sucesso</td>
              <td>Terminou como esperado</td>
              <td>
                <code>success</code>
              </td>
              <td>
                <code>positive</code>
              </td>
              <td>
                <code>role=&quot;status&quot;</code>
              </td>
            </tr>
            <tr>
              <td>4. Informação</td>
              <td>Contexto útil, sem urgência</td>
              <td>
                <code>information</code>
              </td>
              <td>
                <code>information</code> ou <code>neutral</code>
              </td>
              <td>
                <code>role=&quot;status&quot;</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Os dois componentes derivam o role da variante: no Alert, <code>error</code> vira{' '}
        <code>alert</code> e o resto vira <code>status</code>; no Toast, <code>negative</code> vira{' '}
        <code>alert</code> com <code>aria-live=&quot;assertive&quot;</code> e o resto vira{' '}
        <code>status</code> com <code>polite</code>. Escolher a variante certa já resolve o anúncio.
      </p>
      <p>
        <strong>A cor nunca é o único sinal.</strong> Alert e Toast trazem ícone próprio por
        variante, e a mensagem precisa fazer sentido lida em voz alta, sem a cor.
      </p>

      <h2 id="sistema-x-preenchimento">Erro de sistema e erro de preenchimento</h2>
      <p>São dois problemas diferentes e não podem ser tratados do mesmo jeito.</p>

      <h3 id="erro-de-preenchimento">Erro de preenchimento</h3>
      <p>
        A pessoa digitou algo que o serviço não aceita. É corrigível por ela, agora, e pertence a um
        campo específico.
      </p>
      <ul>
        <li>
          A mensagem fica no campo, em <code>errorText</code>. O componente aplica{' '}
          <code>aria-invalid</code> e liga a mensagem ao campo por <code>aria-describedby</code>.
        </li>
        <li>Valide quando a pessoa sai do campo, não a cada tecla digitada.</li>
        <li>
          Em formulário longo, some um Alert de <code>error</code> no topo listando os campos com
          problema, com links que levam a cada um. O erro individual continua no campo.
        </li>
        <li>
          Diga o que é aceito, não só o que está errado: &quot;Digite a data no formato
          DD/MM/AAAA&quot; resolve; &quot;Data inválida&quot; não.
        </li>
        <li>Nunca apague o que a pessoa digitou para forçar a correção.</li>
      </ul>

      <h3 id="erro-de-sistema">Erro de sistema</h3>
      <p>
        Alguma coisa falhou do lado do serviço: rede, integração, indisponibilidade, tempo esgotado.
        A pessoa não fez nada de errado.
      </p>
      <ul>
        <li>
          Não culpe a pessoa. Não use &quot;você&quot; na frase que descreve a falha.
        </li>
        <li>Diga o que falhou, em linguagem comum, e o que ela pode fazer agora.</li>
        <li>
          Ofereça uma saída concreta: tentar de novo, voltar, ou um caminho alternativo de
          atendimento.
        </li>
        <li>
          Se o trabalho dela pode ser perdido, diga se foi salvo. Essa é a primeira dúvida de quem
          preencheu um formulário longo.
        </li>
        <li>
          Não exponha código de exceção, stack trace ou nome de serviço interno. Se houver um número
          de referência útil ao suporte, mostre só ele.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe canal de suporte documentado para onde encaminhar a
        pessoa quando um erro de sistema não pode ser resolvido na tela — fonte: time. Sem esse
        dado, as mensagens de erro de sistema ficam sem destino final. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="como-escrever">Como escrever uma mensagem que resolve</h2>
      <p>Toda mensagem de erro responde a três perguntas, nesta ordem:</p>
      <ol>
        <li>
          <strong>O que aconteceu?</strong> Em uma frase, sem jargão.
        </li>
        <li>
          <strong>Por quê?</strong> Só se ajudar a pessoa a agir.
        </li>
        <li>
          <strong>O que eu faço agora?</strong> Uma ação concreta.
        </li>
      </ol>
      <p>
        No Alert e no Toast isso mapeia direto: <code>title</code> responde a primeira pergunta, o{' '}
        <code>children</code> responde as outras duas.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Reescrita de mensagens de erro genéricas para mensagens acionáveis
          </caption>
          <thead>
            <tr>
              <th scope="col">Não resolve</th>
              <th scope="col">Resolve</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Erro ao processar a solicitação</td>
              <td>
                Não foi possível enviar o pedido. O serviço está indisponível no momento. Seus dados
                foram salvos — tente enviar de novo em alguns minutos.
              </td>
            </tr>
            <tr>
              <td>Campo inválido</td>
              <td>Digite o CPF com 11 números, sem pontos nem traço.</td>
            </tr>
            <tr>
              <td>Falha na operação</td>
              <td>
                Não foi possível anexar o arquivo. Ele passa do tamanho aceito. Envie um arquivo
                menor.
              </td>
            </tr>
            <tr>
              <td>Sessão expirada</td>
              <td>
                Sua sessão terminou por inatividade. Entre de novo para continuar de onde parou.
              </td>
            </tr>
            <tr>
              <td>Erro 500</td>
              <td>
                Não foi possível carregar seus pedidos. O problema é nosso. Tente de novo em alguns
                minutos.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Regras de escrita, alinhadas ao padrão gov.br:</p>
      <ul>
        <li>Voz ativa e frase curta.</li>
        <li>
          Sem &quot;Ops!&quot;, sem &quot;Ocorreu um erro inesperado&quot;, sem ponto de
          exclamação.
        </li>
        <li>
          Sem culpa: prefira &quot;Não foi possível enviar&quot; a &quot;Você não conseguiu
          enviar&quot;.
        </li>
        <li>Sem jargão técnico: &quot;token&quot;, &quot;payload&quot;, &quot;timeout&quot;.</li>
        <li>
          O título do Alert ou do Toast é a frase mais importante. Ele precisa funcionar sozinho,
          porque é o que a pessoa lê primeiro.
        </li>
      </ul>

      <h2 id="anatomia-do-fluxo">Anatomia do fluxo</h2>
      <p>Do ponto de vista da pessoa, quando ela aciona algo:</p>
      <ol>
        <li>
          <strong>Ela clica.</strong> O controle responde imediatamente — o Button entra em{' '}
          <code>isLoading</code>, o que já bloqueia o clique repetido.
        </li>
        <li>
          <strong>Ela vê que algo está acontecendo.</strong> Se a espera passa de um instante,
          Spinner; se há progresso mensurável, ProgressBar.
        </li>
        <li>
          <strong>Ela recebe o desfecho.</strong> Deu certo: Toast <code>positive</code>, ou nada,
          se a tela já mostra o resultado. Deu errado: mensagem inline, se o problema é de um campo;
          Alert, se é da tela.
        </li>
        <li>
          <strong>Ela é levada ao ponto de correção.</strong> No erro de preenchimento, o foco vai
          para o primeiro campo com problema.
        </li>
        <li>
          <strong>Ela tenta de novo.</strong> A mensagem anterior desaparece quando a nova tentativa
          começa — senão a pessoa não sabe se o erro é o antigo ou o novo.
        </li>
      </ol>

      <h2 id="regras">Regras</h2>
      <ul>
        <li>
          <strong>Toda ação tem resposta.</strong> Silêncio é o pior feedback.
        </li>
        <li>
          <strong>A mensagem fica perto da causa.</strong> Erro de campo, no campo. Erro de tela, no
          topo da tela.
        </li>
        <li>
          <strong>Uma mensagem por vez.</strong> Não empilhe Alerts nem exiba vários Toasts
          simultâneos.
        </li>
        <li>
          <strong>Erro não desaparece sozinho.</strong> Nunca use auto-dismiss para algo que a
          pessoa precisa resolver. Se usar Toast <code>negative</code>, é só para falha temporária e
          recuperável — e ainda assim ele pausa em hover e foco por padrão.
        </li>
        <li>
          <strong>Sucesso não bloqueia.</strong> Modal para confirmar que deu certo obriga um clique
          a mais sem motivo.
        </li>
        <li>
          <strong>A variante segue o significado, não a cor desejada.</strong> Não use{' '}
          <code>error</code> para chamar atenção de algo que não é erro.
        </li>
        <li>
          <strong>Não dispense o que a pessoa precisa ler.</strong> Alert e Toast trazem{' '}
          <code>dismissible</code> ligado por padrão; desligue quando a mensagem precisa ficar.
        </li>
        <li>
          <strong>Feedback não substitui prevenção.</strong> Se um erro se repete muito, o problema
          está no campo, no rótulo ou na regra — não na mensagem.
        </li>
      </ul>

      <h2 id="do-e-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Mostrar o erro de CPF dentro do próprio campo, com <code>errorText</code> dizendo o
              formato aceito.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Mostrar &quot;Existem campos inválidos&quot; num Alert no topo e deixar os campos sem
              marcação.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: num formulário longo, a pessoa não tem como descobrir qual campo está errado. O
            erro precisa estar onde está a causa.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Usar Alert <code>error</code> para uma falha de envio que exige nova tentativa.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Usar Toast para a mesma falha, contando com os 5 segundos de leitura.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: o Toast fecha sozinho e some do DOM. Quem lê devagar, usa leitor de tela ou
            desviou o olhar perde a mensagem e não sabe o que aconteceu com o pedido.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Confirmar &quot;Agendamento cancelado&quot; com Toast <code>positive</code>, deixando
              a tela livre.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Abrir um Modal &quot;Cancelado com sucesso&quot; com um botão OK.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: o Modal interrompe e exige uma ação para nada. Interrupção se reserva para
            decisão, não para aviso.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Escrever &quot;Não foi possível carregar seus pedidos. Tente de novo em alguns
              minutos.&quot;
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Escrever &quot;Erro 500 — internal server error (req_id: a9f3c1)&quot;.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: o código não diz nada a quem só quer resolver a vida. A mensagem tem que
            informar o que houve e o que fazer agora.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Renderizar o Alert de erro só no momento em que o erro acontece, para que{' '}
              <code>role=&quot;alert&quot;</code> seja anunciado.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Deixar o Alert escondido por CSS desde o carregamento e apenas exibi-lo.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: leitor de tela anuncia conteúdo que entra na região viva. Se o nó já estava
            lá, não há mudança a anunciar e o erro passa em silêncio.
          </p>
        </div>
      </div>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <ul>
        <li>
          <strong>Insira, não revele.</strong> Alert e Toast só anunciam quando entram no DOM. Ambos
          retornam <code>null</code> quando invisíveis — respeite esse comportamento em vez de
          escondê-los por CSS.
        </li>
        <li>
          <strong>Use <code>assertive</code> com parcimônia.</strong> Só erro. Toast{' '}
          <code>negative</code> e Alert <code>error</code> já interrompem a leitura; qualquer outra
          variante deve continuar <code>polite</code>.
        </li>
        <li>
          <strong>Erro de campo precisa de três coisas:</strong> <code>aria-invalid</code>, a
          mensagem ligada por <code>aria-describedby</code> e um texto que não dependa de cor. O
          TextInput, o Dropdown e o FileUpload já fazem isso quando recebem{' '}
          <code>errorText</code>.
        </li>
        <li>
          <strong>Mova o foco depois de um erro de formulário.</strong> Para o Alert de resumo ou
          para o primeiro campo com problema. Sem isso, quem navega por teclado precisa procurar.
        </li>
        <li>
          <strong>Toast não é lugar de ação obrigatória.</strong> Ele fecha sozinho; se a única
          forma de refazer algo está nele, quem navega por teclado pode não chegar a tempo. O timer
          pausa em foco e em hover por padrão, mas isso não basta como garantia.
        </li>
        <li>
          <strong>Alert não fecha com Esc.</strong> O componente não tem atalho de teclado para
          dispensar; o botão de fechar é alcançado por Tab.
        </li>
        <li>
          <strong>Modal devolve o foco.</strong> Ao fechar, o foco volta para o controle que o
          abriu. Verifique isso quando o Modal for aberto a partir de um item de lista que sumiu.
        </li>
        <li>
          <strong>Espera anunciada.</strong> Spinner usa <code>role=&quot;status&quot;</code> com{' '}
          <code>aria-busy</code>; Button e ButtonGov aplicam{' '}
          <code>aria-busy=&quot;true&quot;</code> em <code>isLoading</code>. Uma espera longa sem
          nenhum desses é silêncio para quem não vê a tela.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> Alert, Toast, ProgressBar e Spinner não têm teste automatizado
        de acessibilidade — não existem os arquivos <code>.a11y.test.tsx</code> desses componentes —
        fonte: inventário dos componentes. A verificação deste padrão é manual. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns em feedback, consequência e correção
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
              <td>Erro grave em Toast</td>
              <td>A mensagem some antes de ser lida</td>
              <td>Alert, que permanece na tela</td>
            </tr>
            <tr>
              <td>Erro de campo mostrado só no topo da página</td>
              <td>A pessoa não descobre qual campo corrigir</td>
              <td>
                <code>errorText</code> no campo; Alert no topo só como resumo com links
              </td>
            </tr>
            <tr>
              <td>Validação a cada tecla digitada</td>
              <td>O campo fica vermelho enquanto a pessoa ainda está digitando</td>
              <td>Valide na saída do campo</td>
            </tr>
            <tr>
              <td>Cor como único sinal</td>
              <td>Quem não distingue as cores não percebe o estado</td>
              <td>Ícone da variante mais texto explícito</td>
            </tr>
            <tr>
              <td>Modal para confirmar sucesso</td>
              <td>Clique a mais sem necessidade</td>
              <td>Toast, ou nenhuma mensagem se a tela já mostra o resultado</td>
            </tr>
            <tr>
              <td>Vários Alerts empilhados</td>
              <td>Nenhum é lido</td>
              <td>Uma mensagem, a mais grave</td>
            </tr>
            <tr>
              <td>Alert permanente como instrução</td>
              <td>Vira paisagem e some da atenção</td>
              <td>
                <code>helperText</code> do campo ou texto corrido
              </td>
            </tr>
            <tr>
              <td>Mensagem antiga permanece na nova tentativa</td>
              <td>A pessoa não sabe se o erro é o mesmo</td>
              <td>Limpe a mensagem ao iniciar a nova tentativa</td>
            </tr>
            <tr>
              <td>Código técnico exposto à pessoa</td>
              <td>Nenhuma ação possível a partir da mensagem</td>
              <td>Frase em linguagem comum, com a saída concreta</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
