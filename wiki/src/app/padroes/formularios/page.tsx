import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Formulários',
  description:
    'O padrão de formulário de serviço público no Sampa Design System: etapas, agrupamento, rótulos, obrigatoriedade, validação, mensagens de erro, salvamento de progresso e confirmação.',
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
      'Todo dado curto de uma linha: nome, CPF, e-mail, telefone, CEP, número de protocolo. Traz rótulo, texto de apoio e estado de erro no mesmo componente.',
  },
  {
    slug: 'text-area',
    nome: 'TextArea',
    papel:
      'Texto livre: descrição de ocorrência, justificativa, observação. Tem contador de caracteres ligado por padrão quando há limite.',
  },
  {
    slug: 'checkbox',
    nome: 'Checkbox',
    papel:
      'Escolha de zero a várias opções, e o aceite de termo. Também cobre o estado indeterminado de um “selecionar todos”.',
  },
  {
    slug: 'radio',
    nome: 'Radio / RadioGroup',
    papel:
      'Escolha de exatamente uma opção entre poucas, com todas visíveis. O RadioGroup vira fieldset com legend quando recebe rótulo.',
  },
  {
    slug: 'dropdown',
    nome: 'Dropdown',
    papel:
      'Escolha única quando a lista é longa demais para ficar aberta — estado, município, tipo de solicitação.',
  },
  {
    slug: 'datepicker',
    nome: 'Datepicker',
    papel:
      'Data e período. Aceita digitação no campo e limita o calendário por minDate e maxDate.',
  },
  {
    slug: 'file-upload',
    nome: 'FileUpload',
    papel:
      'Anexo de documento, em botão ou área de arrastar. Lista os arquivos escolhidos e permite remover cada um.',
  },
  {
    slug: 'button',
    nome: 'Button',
    papel:
      'Avançar, voltar e enviar. É o botão de envio que sustenta o estado de carregamento e impede o envio duplicado.',
  },
  {
    slug: 'alert',
    nome: 'Alert',
    papel:
      'Resumo de erros no topo depois de um envio que falhou, aviso persistente antes do formulário e confirmação de progresso salvo.',
  },
  {
    slug: 'stepper',
    nome: 'Stepper',
    papel:
      'Situa a pessoa dentro de um fluxo de várias etapas: em qual ela está e qual é a próxima. Não navega.',
  },
];

export default function PaginaPadraoFormularios() {
  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Padrões', href: '/padroes/visao-geral' }, { titulo: 'Formulários' }]}
      />

      <h1>Formulários</h1>
      <p className="wiki-prosa__resumo">
        Formulário é o lugar onde a pessoa entrega dados ao Estado para receber algo em troca: uma
        segunda via, um agendamento, uma autorização. É o padrão mais caro de errar — quando o
        formulário falha, a pessoa não perde uma tela, perde o serviço.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <h2 id="o-problema">O problema</h2>
      <p>
        Alguém precisa de um documento. Abre o serviço no celular, muitas vezes fora de casa, às
        vezes com dado de internet contado, quase sempre sem os documentos por perto. Encontra uma
        página longa, com trinta campos empilhados, rótulos escritos em linguagem de repartição e
        um botão “Enviar” no fim. Preenche, envia, e a página volta ao topo com uma tarja vermelha
        genérica. A pessoa não sabe qual campo errou, o que digitou já sumiu, e ela vai ter que
        recomeçar.
      </p>
      <p>
        Esse é o cenário que o padrão evita. O formulário de serviço público tem três diferenças em
        relação a um formulário comercial: <strong>não há alternativa</strong> — se a pessoa
        desistir, ela não vai comprar em outro lugar, ela fica sem o direito;{' '}
        <strong>o público é todo mundo</strong> — inclui quem tem baixa visão, quem usa leitor de
        tela, quem nunca preencheu formulário na internet; e <strong>o erro custa caro</strong> —
        um dado errado pode significar processo indeferido, perda de prazo, viagem inútil até um
        posto de atendimento.
      </p>

      <h2 id="quando-usar">Quando usar</h2>
      <ul>
        <li>A pessoa precisa fornecer dados para que o serviço aconteça.</li>
        <li>Há mais de um campo, e a ordem em que eles aparecem importa.</li>
        <li>O envio produz uma consequência: um protocolo, um agendamento, uma solicitação.</li>
        <li>Existe validação — algum dado pode estar errado e precisa ser corrigido antes.</li>
        <li>
          O preenchimento pode levar mais de um minuto, e a pessoa pode ser interrompida no meio.
        </li>
      </ul>

      <h2 id="quando-nao-usar">Quando não usar</h2>
      <ul>
        <li>
          <strong>É um único campo de consulta.</strong> Consultar protocolo, buscar unidade,
          procurar serviço não é formulário: é{' '}
          <Link href="/padroes/busca">busca</Link>. Busca não valida, não envia, não gera
          protocolo.
        </li>
        <li>
          <strong>É uma preferência que se aplica na hora.</strong> Ligar notificação, mudar
          ordenação, alternar visualização são controles diretos — use{' '}
          <Link href="/componentes/toggle">Toggle</Link> ou{' '}
          <Link href="/componentes/dropdown">Dropdown</Link> sem botão de envio.
        </li>
        <li>
          <strong>É apenas uma confirmação de sim ou não.</strong> Confirmar exclusão, aceitar um
          aviso. Use <Link href="/componentes/modal">Modal</Link> com dois botões.
        </li>
        <li>
          <strong>O dado já está no Estado.</strong> Se o serviço pode consultar, não pergunte.
          Cada campo a menos é uma chance a menos de erro e de desistência.
        </li>
      </ul>

      <h2 id="composicao">Composição</h2>
      <p>
        Todos os componentes abaixo existem hoje no sistema. Nenhum outro é necessário para montar
        um formulário completo.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Componentes que compõem o padrão de formulário e o papel de cada um
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
      <p>
        Fora da tabela, mas frequentes:{' '}
        <Link href="/componentes/toast">Toast</Link> para confirmar um salvamento automático,{' '}
        <Link href="/componentes/progress-bar">ProgressBar</Link> para envio de arquivo grande e{' '}
        <Link href="/componentes/breadcrumb">Breadcrumb</Link> para situar o formulário dentro do
        serviço.
      </p>

      <h2 id="anatomia-do-fluxo">Anatomia do fluxo</h2>
      <p>Na ordem em que a pessoa vive o formulário, não na ordem em que ele é construído.</p>
      <ol>
        <li>
          <strong>Antes de começar.</strong> A pessoa lê o que vai precisar: quais documentos, quanto
          tempo leva, se há custo. Essa tela evita que ela comece e trave no meio por falta de um
          número que está numa gaveta.
        </li>
        <li>
          <strong>Ela vê onde está.</strong> Em fluxo de várias etapas, o Stepper mostra a etapa
          atual e a próxima logo no topo, antes do primeiro campo.
        </li>
        <li>
          <strong>Ela preenche um assunto por vez.</strong> Cada bloco tem um título e reúne campos
          que pertencem à mesma pergunta: “Seus dados”, “Endereço”, “Documentos”.
        </li>
        <li>
          <strong>Ela recebe retorno ao sair de cada campo.</strong> Se o formato está errado, o erro
          aparece ali, embaixo do campo, e não no fim.
        </li>
        <li>
          <strong>Ela avança.</strong> O progresso é salvo ao trocar de etapa, não só no envio final.
        </li>
        <li>
          <strong>Ela revisa.</strong> Antes de enviar, vê tudo que preencheu, com um caminho de
          volta para corrigir cada bloco sem perder o resto.
        </li>
        <li>
          <strong>Ela envia.</strong> O botão entra em carregamento, deixa de aceitar novo clique e
          diz que está processando.
        </li>
        <li>
          <strong>Ela recebe a confirmação.</strong> O que aconteceu, o número do protocolo, o que
          vem depois e como acompanhar. Esta tela é o comprovante — precisa poder ser salva ou
          impressa.
        </li>
      </ol>
      <p>
        Se em qualquer ponto o envio falhar, a pessoa volta ao formulário{' '}
        <strong>com tudo que digitou ainda lá</strong>, com um Alert de erro no topo e o foco nesse
        alerta. Perder o preenchimento é o pior desfecho possível deste padrão.
      </p>

      <h2 id="regras">Regras</h2>

      <h3 id="regra-etapas">Estrutura em etapas</h3>
      <ul>
        <li>
          Divida em etapas quando o formulário tem assuntos que a pessoa reconhece como diferentes —
          não para esconder o tamanho. Etapa é ponto de parada, não disfarce.
        </li>
        <li>
          Uma etapa, um assunto. Não misture “seus dados” com “dados do veículo” na mesma tela.
        </li>
        <li>
          Diga o tamanho do caminho desde o começo. O Stepper recebe a lista de etapas em{' '}
          <code>steps</code> e a posição em <code>currentStep</code>, e expõe o progresso com{' '}
          <code>aria-valuenow</code>, <code>aria-valuemax</code> e <code>aria-valuetext</code>.
        </li>
        <li>
          <strong>O Stepper não navega.</strong> Ele mostra a etapa atual e a próxima; não tem
          estado visual de etapa concluída individual nem clique para voltar. O caminho de volta é
          um <Link href="/componentes/button">Button</Link> secundário no rodapé de cada etapa.
        </li>
        <li>
          Avançar sem preencher não pode ser possível em silêncio: valide a etapa inteira antes de
          passar para a próxima.
        </li>
      </ul>

      <h3 id="regra-agrupamento">Agrupamento de campos</h3>
      <ul>
        <li>
          Um bloco por assunto, com título em <code>h2</code> ou <code>h3</code>. O título é a
          pergunta que os campos abaixo respondem.
        </li>
        <li>
          Uma coluna. Campos lado a lado só quando a relação é evidente e ambos são curtos, como CEP
          e número. Em tela estreita, tudo empilha.
        </li>
        <li>
          Grupos de escolha usam o componente de grupo, não campos soltos: o{' '}
          <code>RadioGroup</code> com <code>label</code> gera <code>fieldset</code> e{' '}
          <code>legend</code>, e é isso que faz o leitor de tela anunciar a pergunta antes das
          opções.
        </li>
        <li>
          Pergunte primeiro o que a pessoa sabe de cabeça (nome, CPF, telefone) e deixe para o fim o
          que exige consultar um documento. Assim ela avança antes de precisar levantar da cadeira.
        </li>
        <li>
          A ordem dos campos segue a ordem do mundo real, não a ordem da tabela do banco de dados.
        </li>
      </ul>

      <h3 id="regra-rotulos">Rótulos</h3>
      <ul>
        <li>
          Rótulo sempre visível, acima do campo.{' '}
          <code>label</code> é obrigatório em TextInput, TextArea, Checkbox, Radio, Dropdown,
          Datepicker e FileUpload — o sistema não permite campo sem rótulo, e isso é de propósito.
        </li>
        <li>
          <strong>Placeholder não é rótulo.</strong> Ele desaparece quando a pessoa começa a
          digitar, tem contraste baixo e não é lido de forma confiável. Use-o só para exemplo de
          formato, e mesmo assim prefira o texto de apoio.
        </li>
        <li>
          O rótulo diz <em>o que</em> preencher. O formato vai em <code>helperText</code>: rótulo
          “Data de nascimento”, apoio “Use o formato DD/MM/AAAA”.
        </li>
        <li>
          Escreva como a pessoa fala. “CPF”, não “Número de inscrição no cadastro de pessoas
          físicas”. Se o termo técnico for inevitável, explique no texto de apoio.
        </li>
        <li>
          Rótulo não termina em dois-pontos e não fica em caixa alta.
        </li>
      </ul>

      <h3 id="regra-obrigatorios">Campos obrigatórios e opcionais</h3>
      <ul>
        <li>
          <strong>Não peça o que não vai usar.</strong> Todo campo opcional é uma pergunta que
          alguém vai responder por precaução, achando que é exigência.
        </li>
        <li>
          Marque o obrigatório com <code>required</code>. O asterisco desenhado pelo componente é{' '}
          <code>aria-hidden</code>: quem usa leitor de tela recebe a obrigatoriedade pelo atributo{' '}
          <code>required</code> nativo, não pelo símbolo.
        </li>
        <li>
          Quando quase tudo for obrigatório, inverta: escreva “(opcional)” no rótulo dos poucos
          campos que não são. Uma tela cheia de asteriscos não informa nada.
        </li>
        <li>
          Se o dado é sensível, diga no texto de apoio por que ele é necessário e o que será feito
          com ele. Silêncio sobre isso é o que faz a pessoa abandonar.
        </li>
      </ul>

      <h3 id="regra-validacao">Validação: quando validar e onde mostrar</h3>
      <ul>
        <li>
          <strong>Não valide a cada tecla.</strong> Marcar o campo de vermelho no terceiro caractere
          de um CPF é acusar alguém de um erro que ela ainda não cometeu.
        </li>
        <li>
          <strong>Valide quando a pessoa sai do campo</strong> e de novo no envio. Só valide durante
          a digitação para <em>remover</em> um erro já exibido, assim que ele for corrigido.
        </li>
        <li>
          O erro de um campo aparece <strong>no campo</strong>, via <code>errorText</code>. O
          componente aplica <code>aria-invalid</code> e coloca a mensagem de erro no{' '}
          <code>aria-describedby</code> antes do texto de apoio.
        </li>
        <li>
          Quando o envio falha com mais de um erro, mostre também um{' '}
          <strong>resumo no topo</strong> com <Link href="/componentes/alert">Alert</Link>{' '}
          <code>variant=&quot;error&quot;</code> e <code>role=&quot;alert&quot;</code>, listando os
          campos com problema como links para cada um. Depois de exibir, mova o foco para o alerta.
        </li>
        <li>
          Esse resumo precisa de <code>dismissible={'{false}'}</code>. O padrão do Alert é ser
          fechável, e um resumo de erro que some antes da correção deixa a pessoa sem referência.
        </li>
        <li>
          Impeça o erro antes de precisar reclamar dele: <code>minDate</code> e{' '}
          <code>maxDate</code> no Datepicker, <code>accept</code> e <code>multiple</code> no
          FileUpload, <code>maxLength</code> no TextArea.
        </li>
        <li>
          Aceite o que a pessoa digitou. Se ela colar o CPF com pontos, limpe os pontos no código —
          não devolva um erro por causa de pontuação.
        </li>
      </ul>

      <h3 id="regra-mensagens">Mensagens de erro que ajudam</h3>
      <ul>
        <li>
          Uma mensagem responde a duas perguntas: <strong>o que aconteceu</strong> e{' '}
          <strong>o que fazer agora</strong>. “Campo inválido” não responde a nenhuma das duas.
        </li>
        <li>
          Diga o esperado, não a regra interna. “Digite o CPF com 11 números” em vez de “Falha na
          validação do dígito verificador”.
        </li>
        <li>
          Não culpe. Sem “você errou”, sem “dado incorreto”. O sujeito da frase é o serviço: “Não
          encontramos esse número na base.”
        </li>
        <li>
          Uma mensagem por campo. Se há dois problemas no mesmo campo, mostre o que impede o
          avanço.
        </li>
        <li>
          A mensagem é frase completa, com ponto final, e não repete o rótulo que já está logo
          acima.
        </li>
        <li>
          Se o problema não for da pessoa — sistema fora do ar, integração indisponível — diga isso
          com todas as letras e ofereça um caminho: tentar de novo, ou o que fazer se persistir.
        </li>
      </ul>

      <h3 id="regra-salvamento">Salvamento de progresso</h3>
      <ul>
        <li>
          Em fluxo de várias etapas, salve ao concluir cada etapa. Não espere o envio final.
        </li>
        <li>
          Diga que salvou, sem interromper: <Link href="/componentes/toast">Toast</Link> com{' '}
          <code>variant=&quot;positive&quot;</code> dispensa sozinho depois de{' '}
          <code>duration</code> e não rouba o foco.
        </li>
        <li>
          Se a sessão pode expirar, avise <strong>antes</strong> de perder o preenchimento, com
          tempo suficiente para a pessoa reagir.
        </li>
        <li>
          Falha de rede no meio não pode apagar o formulário. Volte à mesma etapa com os campos
          preenchidos e um Alert explicando o que houve.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe no sistema nenhum componente de rascunho, retomada
        de formulário ou aviso de expiração de sessão — fonte: time. As regras acima descrevem o
        comportamento esperado, mas hoje cada produto precisa construir isso por conta. Registrado
        em <code>LACUNAS.md</code>.
      </p>

      <h3 id="regra-confirmacao">Confirmação</h3>
      <ul>
        <li>
          Antes do envio, mostre uma revisão de tudo que foi preenchido, agrupada pelos mesmos
          blocos do formulário, com um caminho de edição por bloco.
        </li>
        <li>
          O botão de envio é <code>type=&quot;submit&quot;</code> com <code>isLoading</code>{' '}
          enquanto processa: o componente aplica <code>aria-busy</code> e desabilita o botão,
          impedindo o envio duplicado.
        </li>
        <li>
          Um único botão primário por tela. Voltar e cancelar são secundário e terciário — nunca
          dois primários lado a lado.
        </li>
        <li>
          A tela de confirmação diz, nesta ordem: que deu certo, qual é o número do protocolo, o
          que acontece agora e como acompanhar. Sem número de protocolo, a pessoa não tem prova de
          nada.
        </li>
        <li>
          Nunca conclua com uma tela que só diz “Enviado”. Toda conclusão gera um comprovante que a
          pessoa consegue guardar.
        </li>
      </ul>

      <h2 id="do-e-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Rótulo visível acima do campo, com o formato no texto de apoio: rótulo “CEP”, apoio
              “Somente números, 8 dígitos”.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Campo sem rótulo, com o texto “CEP (somente números)” dentro do placeholder para
              economizar espaço.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            O placeholder some no primeiro caractere digitado. A partir daí a pessoa não consegue
            mais conferir o que aquele campo pedia — e quem revisa o formulário no fim vê uma
            coluna de valores sem nome.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Validar quando a pessoa sai do campo e, no envio, mostrar um Alert de resumo no topo
              com <code>dismissible={'{false}'}</code>, listando os campos com erro.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Validar a cada tecla e mostrar só uma tarja vermelha genérica no topo, fechável, sem
              indicar quais campos falharam.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Erro durante a digitação acusa antes da hora e treina a pessoa a ignorar vermelho. E um
            resumo fechável sem lista de campos obriga quem usa leitor de tela ou zoom alto a
            varrer o formulário inteiro atrás do problema.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Escrever “Não encontramos esse CPF na nossa base. Confira os números e tente de
              novo.”
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>Escrever “CPF inválido” ou “Erro 422: falha na validação do campo cpf”.</p>
          </div>
          <p className="wiki-dodont__porque">
            A primeira mensagem diz o que houve e o que fazer. As outras duas deixam a pessoa sem
            ação possível — e a segunda transfere para ela um código que só faz sentido para quem
            escreveu o sistema.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Usar o Stepper para mostrar em que etapa a pessoa está, e um Button secundário
              “Voltar” no rodapé de cada etapa.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Tratar o Stepper como menu de navegação, esperando que a pessoa clique numa etapa
              anterior para voltar.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            O Stepper do sistema não navega e não tem estado de etapa concluída individual. Se o
            desenho sugerir que ele é clicável, a pessoa vai clicar, nada vai acontecer, e ela vai
            concluir que o serviço está quebrado.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Pedir só o que o serviço usa, e explicar no texto de apoio por que um dado sensível é
              necessário.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Repetir no formulário dados que o Estado já tem, e incluir campos “para uso futuro”
              ou “para pesquisa”.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Cada campo extra aumenta o tempo, a chance de erro e a desistência. Pedir dado sem
            finalidade declarada também contraria o princípio de coletar o mínimo necessário.
          </p>
        </div>
      </div>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <p>
        Os componentes já resolvem parte disto. O que a lista abaixo cobre é justamente o que{' '}
        <strong>não</strong> é resolvido por um componente isolado — o que depende da composição.
      </p>
      <ul>
        <li>
          <strong>Rótulo associado.</strong> Todos os campos ligam <code>label</code> e{' '}
          <code>input</code> por <code>htmlFor</code>/<code>id</code>, gerando o id com{' '}
          <code>useId</code> quando você não passa um. Não substitua o rótulo por{' '}
          <code>aria-label</code> em campo visível.
        </li>
        <li>
          <strong>Ordem do describedby.</strong> Quando há erro, ele entra no{' '}
          <code>aria-describedby</code> antes do texto de apoio. Se a mensagem de erro repetir o
          apoio, quem usa leitor de tela ouve a mesma informação duas vezes.
        </li>
        <li>
          <strong>Foco depois do envio com erro.</strong> Mova o foco para o Alert de resumo. Sem
          isso, quem usa teclado continua no botão, no rodapé, sem saber que apareceu um alerta no
          topo.
        </li>
        <li>
          <strong>Grupos de escolha.</strong> No RadioGroup, as setas movem o foco e selecionam,
          pulam opções desabilitadas e dão a volta no fim da lista; Tab entra e sai do grupo
          inteiro. Não substitua o grupo por radios soltos — a pergunta se perde.
        </li>
        <li>
          <strong>Checkbox.</strong> O input nativo fica visualmente oculto por recorte, não por{' '}
          <code>display: none</code> — continua recebendo Tab, e Espaço alterna. O estado
          indeterminado expõe <code>aria-checked=&quot;mixed&quot;</code>.
        </li>
        <li>
          <strong>Dropdown.</strong> Seta abre, setas movem, Home e End vão às pontas, Enter ou
          Espaço selecionam, Esc fecha e devolve o foco ao campo, Tab fecha sem devolver. Ele{' '}
          <strong>não tem busca por digitação nem seleção múltipla</strong>, e o menu não desvia da
          borda da tela: em lista muito longa, prefira um campo de texto validado ou um grupo de
          radios.
        </li>
        <li>
          <strong>Datepicker.</strong> Enter, Espaço e seta para baixo abrem o calendário; Esc
          fecha. Mantenha sempre a digitação no campo — quem usa teclado ou leitor de tela costuma
          digitar a data em vez de navegar por um calendário.
        </li>
        <li>
          <strong>FileUpload.</strong> A lista de arquivos tem <code>aria-live=&quot;polite&quot;</code>,
          então anexar e remover é anunciado; cada botão de remoção tem{' '}
          <code>aria-label</code> com o nome do arquivo. No modo botão, o foco vai para o botão; no
          modo área de arrastar, o input nativo permanece na ordem de tabulação.
        </li>
        <li>
          <strong>Foco visível.</strong> Não remova o anel. O TextInput desenha o foco com{' '}
          <code>:focus-within</code>, então o anel aparece também no clique de mouse — é
          intencional, não é defeito.
        </li>
        <li>
          <strong>Cobertura automatizada.</strong> Entre os componentes deste padrão, TextInput,
          Checkbox, Radio, Dropdown, Datepicker, FileUpload e Button têm teste axe. TextArea,
          Alert e Stepper <strong>não têm</strong> — nesses, o teste manual é obrigatório.
        </li>
        <li>
          <strong>Verificação manual mínima:</strong> percorrer o formulário inteiro só com Tab, na
          ordem visual; ampliar para 200% e conferir se nada é cortado; completar um envio com erro
          usando leitor de tela e confirmar que o alerta é anunciado.
        </li>
      </ul>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns no padrão de formulário, consequência e correção
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
              <th scope="row">Placeholder no lugar do rótulo</th>
              <td>A referência some no primeiro caractere e a revisão fica ilegível.</td>
              <td>
                Use <code>label</code>, que é obrigatório, e leve o exemplo para{' '}
                <code>helperText</code>.
              </td>
            </tr>
            <tr>
              <th scope="row">Validar a cada tecla</th>
              <td>O campo fica vermelho enquanto a pessoa ainda está digitando.</td>
              <td>Valide na saída do campo; durante a digitação, só remova erro já corrigido.</td>
            </tr>
            <tr>
              <th scope="row">Resumo de erro fechável</th>
              <td>
                A pessoa fecha por reflexo e perde a única lista dos campos com problema.
              </td>
              <td>
                Passe <code>dismissible={'{false}'}</code> no Alert de resumo.
              </td>
            </tr>
            <tr>
              <th scope="row">Envio sem estado de carregamento</th>
              <td>Clique duplo gera duas solicitações e dois protocolos.</td>
              <td>
                Use <code>isLoading</code>, que aplica <code>aria-busy</code> e desabilita o botão.
              </td>
            </tr>
            <tr>
              <th scope="row">Stepper tratado como navegação</th>
              <td>A pessoa clica na etapa anterior e nada acontece.</td>
              <td>Ofereça um Button secundário “Voltar” no rodapé de cada etapa.</td>
            </tr>
            <tr>
              <th scope="row">Perder o preenchimento no erro</th>
              <td>A pessoa recomeça do zero e, em geral, desiste.</td>
              <td>Volte à mesma etapa com todos os campos preenchidos.</td>
            </tr>
            <tr>
              <th scope="row">Máscara que rejeita colar</th>
              <td>Quem copia o CPF de outro lugar não consegue preencher.</td>
              <td>Aceite o valor colado e normalize a pontuação no código.</td>
            </tr>
            <tr>
              <th scope="row">Um campo por página sem motivo</th>
              <td>Um formulário de dez campos vira dez telas e dez esperas de rede.</td>
              <td>Agrupe por assunto; etapa só quando o assunto muda.</td>
            </tr>
            <tr>
              <th scope="row">Dropdown com centenas de opções</th>
              <td>
                Sem busca por digitação, a pessoa percorre a lista inteira com a seta.
              </td>
              <td>Use campo de texto validado, ou reduza a lista pelo contexto já conhecido.</td>
            </tr>
            <tr>
              <th scope="row">Confirmação sem protocolo</th>
              <td>A pessoa não tem como provar que enviou nem como acompanhar.</td>
              <td>Mostre o número, o prazo informado pelo serviço e o caminho de acompanhamento.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="pendencias">Pendências deste padrão</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de máscara de entrada, autocompletar ou
        consulta de CEP no sistema — fonte: time. O TextInput aceita os tipos{' '}
        <code>text</code>, <code>email</code>, <code>password</code>, <code>search</code>,{' '}
        <code>tel</code> e <code>url</code>, e não expõe prop de máscara. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de lista de revisão (o resumo “confira
        seus dados” antes do envio) nem de página de confirmação com protocolo — fonte: time. Os
        passos 6 e 8 da anatomia do fluxo precisam ser construídos por cada produto. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
