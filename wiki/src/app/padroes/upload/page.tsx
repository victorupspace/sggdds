import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Upload de arquivos',
  description:
    'Padrão de envio de documentos: formatos aceitos, limite de tamanho, feedback de progresso, erro de arquivo e remoção, com o componente FileUpload.',
};

export default function PaginaPadraoUpload() {
  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Padrões', href: '/padroes/visao-geral' },
          { titulo: 'Upload de arquivos' },
        ]}
      />

      <h1>Upload de arquivos</h1>
      <p className="wiki-prosa__resumo">
        Enviar um documento é a etapa em que mais gente desiste de um serviço digital. Este padrão
        descreve como pedir arquivos com o componente{' '}
        <Link href="/componentes/file-upload">FileUpload</Link>: o que dizer antes do envio, como
        mostrar o andamento, como tratar arquivo recusado e como permitir a remoção.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Este padrão é conteúdo novo</p>
        <p>
          O FileUpload existe e está documentado. O que não existe é um padrão de envio de
          documentos: nem no Figma, nem no Storybook. Tudo o que está aqui é proposta desta
          documentação e precisa de validação — em especial a parte de progresso, que exige
          componentes fora do FileUpload.
        </p>
      </div>

      <h2 id="o-problema">O problema</h2>
      <p>
        A pessoa está no celular, com a foto de um documento na galeria. Ela precisa anexá-la a um
        pedido. Nesse ponto ela enfrenta, de uma vez:
      </p>
      <ul>
        <li>Não sabe quais formatos o serviço aceita, nem qual é o tamanho máximo.</li>
        <li>Não sabe se o arquivo está sendo enviado ou se travou.</li>
        <li>
          Quando o arquivo é recusado, recebe uma mensagem que não diz o que fazer — e o
          formulário inteiro pode ter sido perdido.
        </li>
        <li>Anexa o arquivo errado e não encontra como tirá-lo.</li>
      </ul>
      <p>
        Cada uma dessas falhas empurra a pessoa para o atendimento presencial, que é exatamente o
        que o serviço digital deveria evitar.
      </p>

      <h2 id="quando-usar">Quando usar</h2>
      <ul>
        <li>O serviço exige comprovação documental — identidade, residência, renda, laudo.</li>
        <li>A pessoa precisa anexar algo que só ela tem.</li>
        <li>Há uma planilha ou arquivo estruturado a ser processado pelo serviço.</li>
        <li>Um pedido em análise precisa de complemento documental.</li>
      </ul>

      <h2 id="quando-nao-usar">Quando não usar</h2>
      <ul>
        <li>
          <strong>Quando o Estado já tem o dado.</strong> Se o documento pode ser consultado em base
          própria, não peça. Cada arquivo pedido é trabalho transferido para a pessoa.
        </li>
        <li>
          <strong>Para uma informação que cabe num campo.</strong> Um número de protocolo digitado
          num <Link href="/componentes/text-input">TextInput</Link> é melhor que a foto de um papel
          com o número.
        </li>
        <li>
          <strong>Antes de a pessoa saber que vai precisar.</strong> A lista de documentos
          necessários vem antes de começar o formulário, não no meio dele.
        </li>
        <li>
          <strong>Como campo opcional sem propósito.</strong> &quot;Anexe outros documentos, se
          quiser&quot; gera dúvida e arquivo irrelevante.
        </li>
      </ul>

      <h2 id="composicao">Composição</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes que compõem o padrão de upload e o papel de cada um
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
                <Link href="/componentes/file-upload">FileUpload</Link>
              </td>
              <td>
                O campo em si. Dois modos: <code>button</code> (botão{' '}
                <code>Anexar arquivos</code>) e <code>dropzone</code> (área de arrastar). Traz{' '}
                <code>label</code>, <code>helperText</code>, <code>errorText</code>,{' '}
                <code>accept</code>, <code>multiple</code>, <code>required</code> e a lista de
                arquivos com botão de remover.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/progress-bar">ProgressBar</Link>
              </td>
              <td>
                Progresso do envio. <strong>Não faz parte do FileUpload</strong> — precisa ser
                composto ao lado dele. Modo <code>determinate</code> quando a porcentagem é
                conhecida, <code>indeterminate</code> quando não é.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/alert">Alert</Link>
              </td>
              <td>
                Falha que não é de um arquivo específico: conexão caiu, serviço de armazenamento
                fora do ar, envio interrompido. Variante <code>error</code>.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/button">Button</Link>
              </td>
              <td>
                Enviar o formulário, tentar de novo depois de uma falha. Use{' '}
                <code>isLoading</code> enquanto o envio acontece.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/modal">Modal</Link>
              </td>
              <td>
                Só para confirmar a remoção de um arquivo já enviado e aceito, quando refazer o
                envio for custoso.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/link">Link</Link>
              </td>
              <td>Ajuda sobre como obter ou digitalizar o documento pedido.</td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/list-item">ListItem</Link>
              </td>
              <td>
                Lista de documentos exigidos pelo serviço, antes do campo de envio, com o que já foi
                entregue e o que falta.
              </td>
            </tr>
            <tr>
              <td>
                <Link href="/componentes/stepper">Stepper</Link>
              </td>
              <td>
                Quando o envio de documentos é uma etapa de um fluxo maior, situa a pessoa no
                percurso.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="anatomia-do-fluxo">Anatomia do fluxo</h2>
      <ol>
        <li>
          <strong>Ela lê o que precisa enviar.</strong> Nome do documento, formatos aceitos e
          tamanho máximo — antes de qualquer botão. O FileUpload tem <code>helperText</code> e, no
          modo dropzone, <code>dropzoneHint</code> para isso.
        </li>
        <li>
          <strong>Ela escolhe o arquivo.</strong> No modo <code>button</code>, pelo botão{' '}
          <code>Anexar arquivos</code>; no modo <code>dropzone</code>, arrastando ou clicando na
          área.
        </li>
        <li>
          <strong>Ela vê o arquivo listado.</strong> Nome com a extensão preservada e a linha de
          status (tamanho e situação).
        </li>
        <li>
          <strong>Ela acompanha o envio.</strong> Enquanto o arquivo sobe, um ProgressBar composto
          ao lado do campo.
        </li>
        <li>
          <strong>Ela recebe a confirmação.</strong> O item passa a mostrar o status de carregado,
          com o ícone de check.
        </li>
        <li>
          <strong>Ela corrige, se precisar.</strong> Remove o arquivo errado pelo botão de remover e
          anexa outro.
        </li>
        <li>
          <strong>Ela envia o formulário.</strong> Nunca antes de todos os arquivos terem terminado
          de subir.
        </li>
      </ol>

      <h2 id="formatos-e-limite">Formatos aceitos e limite de tamanho</h2>
      <p>
        Esta é a informação que precisa aparecer <strong>antes</strong> do primeiro clique — não
        como mensagem de erro depois da tentativa.
      </p>
      <ul>
        <li>
          <strong>Escreva os formatos em linguagem comum.</strong> &quot;PDF, JPG ou PNG&quot;
          funciona; <code>application/pdf, image/jpeg</code> não.
        </li>
        <li>
          <strong>Diga o limite em unidade que a pessoa entende</strong>, junto dos formatos, na
          mesma frase.
        </li>
        <li>
          <strong>Use <code>accept</code> no input</strong> para filtrar o seletor de arquivos do
          sistema. Isso reduz a chance de erro, mas não substitui a validação no servidor.
        </li>
        <li>
          <strong>Aceite o máximo que o serviço puder processar.</strong> Foto de celular é o
          formato real de quem não tem scanner. Recusar JPG por preferência interna cria barreira.
        </li>
        <li>
          <strong>Se pede mais de um arquivo, ligue <code>multiple</code>.</strong> O padrão é{' '}
          <code>false</code>, e nesse caso a seleção e o arrastar ficam limitados a um arquivo.
        </li>
      </ul>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">O componente não valida formato nem tamanho</p>
        <p>
          O texto padrão do <code>dropzoneHint</code> é{' '}
          <code>PDF, CSV ou XLSX até 10mb</code>, mas ele é <strong>apenas texto</strong>: o
          FileUpload não verifica tipo nem tamanho. O limite real depende de quem consome o
          componente. Se o seu serviço aceita outros formatos ou outro limite, troque o texto — caso
          contrário, a interface promete uma regra que não é a sua.
        </p>
      </div>

      <h2 id="progresso">Feedback de progresso</h2>
      <p>
        Este é o ponto mais frágil do padrão hoje, e precisa ser dito com clareza: o FileUpload{' '}
        <strong>não tem estado de progresso</strong>. O status do item é o texto estático de{' '}
        <code>itemStatusLabel</code>, cujo padrão é <code>Carregado</code>. Não há percentual, não
        há barra interna, não há estado &quot;enviando&quot;.
      </p>
      <p>Enquanto isso não muda, este padrão propõe:</p>
      <ul>
        <li>
          Compor um <Link href="/componentes/progress-bar">ProgressBar</Link> logo abaixo do campo,
          em modo <code>determinate</code> quando o percentual for conhecido.
        </li>
        <li>
          Usar <code>indeterminate</code> quando o percentual não for conhecido — é melhor que
          nenhum sinal.
        </li>
        <li>
          Passar <code>itemStatusLabel</code> coerente com o momento: enquanto sobe, algo como{' '}
          <code>Enviando</code>; ao terminar, o padrão <code>Carregado</code>.
        </li>
        <li>
          Manter o <Link href="/componentes/button">Button</Link> de envio do formulário em{' '}
          <code>isLoading</code> — ou desabilitado — enquanto houver arquivo subindo.
        </li>
        <li>
          Ao terminar, trocar a variante do ProgressBar para <code>success</code>, ou removê-lo e
          deixar o status do item falar.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o FileUpload não tem estado de progresso nem de upload em
        andamento — <code>itemStatusLabel</code> é texto estático, sem percentual — fonte:
        inventário do componente. A composição com ProgressBar descrita acima é proposta desta
        documentação; falta decidir se o progresso entra no próprio componente. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="erro-de-arquivo">Erro de arquivo</h2>
      <p>
        O erro de arquivo é um erro de preenchimento: pertence ao campo e a pessoa consegue
        corrigi-lo. Ele vive no FileUpload, não num Alert no topo da página.
      </p>
      <ul>
        <li>
          Passe <code>errorText</code>. Isso já força o estado de erro — a documentação do
          componente registra que <code>isError</code> é verdadeiro quando{' '}
          <code>state === &apos;error&apos;</code> <em>ou</em> quando há <code>errorText</code>.
        </li>
        <li>
          A mensagem diz o que houve <strong>e</strong> o que é aceito. &quot;Arquivo
          inválido&quot; não resolve nada.
        </li>
        <li>
          <strong>Não descarte os arquivos que deram certo.</strong> Se três subiram e o quarto
          falhou, os três continuam na lista.
        </li>
        <li>
          Se a falha é do sistema — a conexão caiu no meio do envio —, aí sim use{' '}
          <Link href="/componentes/alert">Alert</Link>, porque não é erro da pessoa nem de um
          arquivo específico.
        </li>
      </ul>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Mensagens de erro de arquivo: versão genérica e versão que resolve
          </caption>
          <thead>
            <tr>
              <th scope="col">Situação</th>
              <th scope="col">Não resolve</th>
              <th scope="col">Resolve</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Formato não aceito</td>
              <td>Arquivo inválido</td>
              <td>Este formato não é aceito. Envie o documento em PDF, JPG ou PNG.</td>
            </tr>
            <tr>
              <td>Arquivo grande demais</td>
              <td>Limite excedido</td>
              <td>
                O arquivo passa do tamanho aceito. Envie um arquivo menor ou reduza a qualidade da
                foto.
              </td>
            </tr>
            <tr>
              <td>Arquivo vazio ou corrompido</td>
              <td>Falha na leitura</td>
              <td>Não foi possível ler este arquivo. Tente gerar o documento de novo e reenviar.</td>
            </tr>
            <tr>
              <td>Envio interrompido</td>
              <td>Erro no upload</td>
              <td>
                O envio foi interrompido. Os arquivos anteriores continuam anexados — tente enviar
                este de novo.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="remocao">Remoção</h2>
      <p>
        Anexar o arquivo errado é comum, e desfazer precisa ser trivial. O FileUpload já traz o
        botão de remover em cada item, com <code>aria-label</code> específico no formato{' '}
        <code>Remover &lt;nome do arquivo&gt;</code>, e dispara <code>onFileRemove</code> e{' '}
        <code>onFilesChange</code>.
      </p>
      <ul>
        <li>
          <strong>Remover é imediato.</strong> Antes do envio do formulário, tirar um arquivo da
          lista não precisa de confirmação.
        </li>
        <li>
          <strong>Confirme só quando refazer for caro.</strong> Se o arquivo já foi enviado e
          aceito pelo serviço, um <Link href="/componentes/modal">Modal</Link> curto de confirmação
          se justifica.
        </li>
        <li>
          <strong>Diga que o campo voltou a ser obrigatório</strong> quando a remoção deixa um
          documento exigido em falta.
        </li>
        <li>
          <strong>Não esconda o botão de remover.</strong> Ele não pode depender de{' '}
          <code>hover</code>: em tela de toque, hover não existe.
        </li>
        <li>
          <strong>Remoção não apaga o resto.</strong> Tirar um arquivo não pode limpar os outros nem
          o restante do formulário.
        </li>
      </ul>

      <h2 id="regras">Regras</h2>
      <ul>
        <li>
          <strong>Formatos e limite antes do botão.</strong> Sempre visíveis, não só na mensagem de
          erro.
        </li>
        <li>
          <strong>Um campo por documento exigido.</strong> Se o serviço pede identidade e
          comprovante de residência, são dois campos com <code>label</code> próprio — não um campo
          genérico com <code>multiple</code>.
        </li>
        <li>
          <strong>O <code>label</code> é obrigatório e nomeia o documento.</strong> &quot;RG ou
          CNH&quot; ajuda; &quot;Arquivo&quot; não.
        </li>
        <li>
          <strong>Escolha o modo pelo contexto.</strong> <code>button</code> é o padrão e funciona
          em qualquer tela; <code>dropzone</code> só faz sentido quando arrastar é plausível — e
          ainda assim precisa continuar clicável.
        </li>
        <li>
          <strong>Nunca envie o formulário com upload em andamento.</strong> Bloqueie o botão
          enquanto houver arquivo subindo.
        </li>
        <li>
          <strong>Preserve a lista entre erros.</strong> Um erro em um arquivo não pode derrubar os
          demais.
        </li>
        <li>
          <strong>Valide também no servidor.</strong> <code>accept</code> filtra o seletor, não
          garante nada.
        </li>
        <li>
          <strong>Não peça o mesmo documento duas vezes</strong> no mesmo fluxo.
        </li>
      </ul>

      <h2 id="do-e-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Escrever os formatos e o limite em <code>helperText</code> ou{' '}
              <code>dropzoneHint</code>, visíveis desde o começo.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Revelar a regra só depois que a pessoa tenta anexar e é recusada.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: quem está no celular pode não ter outro arquivo à mão. Descobrir a regra depois
            da tentativa significa sair do serviço para converter o documento.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Manter o texto de <code>dropzoneHint</code> igual à regra real do seu serviço.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Deixar o texto padrão <code>PDF, CSV ou XLSX até 10mb</code> num serviço que aceita
              foto de documento.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: o componente não valida nada. O texto é a única promessa que a pessoa lê — e
            uma promessa errada produz recusa que ela não consegue explicar.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Mostrar um ProgressBar enquanto o arquivo sobe e bloquear o botão de envio nesse
              período.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Listar o arquivo com o status <code>Carregado</code> assim que ele é selecionado.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: o status padrão do componente é estático. Se ele diz &quot;Carregado&quot;
            antes de o envio terminar, a pessoa submete o formulário sem o documento.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Mostrar o erro do arquivo em <code>errorText</code>, dentro do próprio campo,
              preservando os arquivos que deram certo.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Limpar a lista inteira e mostrar um Alert genérico no topo da página.</p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: refazer três envios por causa de um erro no quarto é a forma mais rápida de
            perder a pessoa. O erro é do arquivo, não do campo inteiro.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>Manter o botão de remover sempre visível em cada item da lista.</p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Exibir o botão de remover apenas no <code>hover</code> do item.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Por quê: em celular não existe hover. A pessoa fica sem como desfazer justamente no
            dispositivo em que ela mais anexa arquivo errado.
          </p>
        </div>
      </div>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <p>O FileUpload já resolve boa parte. O que verificar neste padrão:</p>
      <ul>
        <li>
          <strong>Não existe alternativa por teclado ao arrastar.</strong> A única alternativa é o
          próprio input de arquivo. Por isso o modo <code>dropzone</code> precisa continuar
          clicável e alcançável por Tab — nunca ofereça arrastar como caminho exclusivo.
        </li>
        <li>
          <strong>Foco por modo.</strong> No modo <code>button</code>, o input recebe{' '}
          <code>tabIndex</code> negativo e o foco vai para o botão{' '}
          <code>Anexar arquivos</code>. No modo <code>dropzone</code>, o input nativo permanece na
          ordem de tabulação e a área recebe contorno por <code>:focus-within</code>. Teste os dois.
        </li>
        <li>
          <strong>A lista de arquivos é uma região viva.</strong> A <code>ul</code> tem{' '}
          <code>aria-live=&quot;polite&quot;</code>: a inclusão e a remoção de itens são anunciadas
          sozinhas. Não anuncie a mesma coisa de novo com um Toast.
        </li>
        <li>
          <strong>Cada botão de remover tem nome próprio</strong> — <code>Remover</code> seguido do
          nome do arquivo. Isso só funciona se o nome do arquivo for significativo; nomes truncados
          na tela continuam completos no nome acessível.
        </li>
        <li>
          <strong>Erro ligado ao campo.</strong> Com <code>errorText</code>, o componente aplica{' '}
          <code>aria-invalid=&quot;true&quot;</code> e liga erro, texto de apoio e lista ao input
          por <code>aria-describedby</code>, nessa ordem.
        </li>
        <li>
          <strong>Progresso precisa ser anunciado.</strong> O ProgressBar composto ao lado usa{' '}
          <code>role=&quot;progressbar&quot;</code>. Dê a ele um <code>label</code> visível ou{' '}
          <code>ariaLabel</code> que identifique o arquivo.
        </li>
        <li>
          <strong>Campo obrigatório.</strong> Com <code>required</code>, o asterisco no rótulo é{' '}
          <code>aria-hidden</code> — a obrigatoriedade vem do atributo no input, não do símbolo.
          Diga por escrito o que é obrigatório.
        </li>
        <li>
          <strong>Área de toque no celular.</strong> Abaixo de 640px o preenchimento lateral do
          dropzone diminui bastante. Verifique que o alvo continua confortável.
        </li>
      </ul>
      <p>
        O FileUpload é um dos componentes com teste automatizado de acessibilidade — tem arquivo{' '}
        <code>FileUpload.a11y.test.tsx</code>. O ProgressBar e o Alert, que este padrão compõe ao
        lado dele, não têm.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não há alternativa por teclado ao arrastar e soltar além do
        próprio input de arquivo, e o modo dropzone não tem estado visual de <code>hover</code> —
        fonte: inventário do componente. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns no envio de documentos, consequência e correção
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
              <td>Formatos e limite só na mensagem de erro</td>
              <td>A pessoa tenta, é recusada e sai do serviço para converter o arquivo</td>
              <td>
                <code>helperText</code> ou <code>dropzoneHint</code> desde o início
              </td>
            </tr>
            <tr>
              <td>Texto padrão do hint mantido sem revisão</td>
              <td>A interface promete uma regra que não é a do serviço</td>
              <td>Escreva o hint com a regra real</td>
            </tr>
            <tr>
              <td>Nenhum sinal de envio em andamento</td>
              <td>A pessoa clica em enviar várias vezes ou fecha a página</td>
              <td>ProgressBar composto e botão bloqueado durante o envio</td>
            </tr>
            <tr>
              <td>
                Status <code>Carregado</code> exibido antes de o envio terminar
              </td>
              <td>Formulário enviado sem o documento</td>
              <td>
                Controle <code>itemStatusLabel</code> conforme o momento do envio
              </td>
            </tr>
            <tr>
              <td>Lista limpa a cada erro</td>
              <td>A pessoa reenvia tudo</td>
              <td>Preserve os arquivos aceitos e marque só o que falhou</td>
            </tr>
            <tr>
              <td>Erro de arquivo em Alert no topo</td>
              <td>A pessoa não sabe qual arquivo recusar</td>
              <td>
                <code>errorText</code> no próprio campo
              </td>
            </tr>
            <tr>
              <td>Botão de remover só no hover</td>
              <td>Em celular, não há como desfazer</td>
              <td>Botão sempre visível</td>
            </tr>
            <tr>
              <td>Arrastar como único caminho</td>
              <td>Exclui quem usa teclado ou toque</td>
              <td>O dropzone continua clicável e alcançável por Tab</td>
            </tr>
            <tr>
              <td>Um campo genérico para todos os documentos</td>
              <td>A pessoa não sabe o que já entregou nem o que falta</td>
              <td>Um campo por documento, com label próprio</td>
            </tr>
            <tr>
              <td>Validação apenas no navegador</td>
              <td>Arquivo indevido chega ao serviço</td>
              <td>Valide também no servidor</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
