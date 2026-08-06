import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Formulário longo',
  description:
    'Template do formulário de várias etapas: stepper, blocos de campos por assunto, salvamento a cada etapa, revisão antes do envio e comprovante no fim.',
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
      'Versão reduzida da navegação. Durante o preenchimento, quanto menos caminho de saída, menor a chance de perder o trabalho.',
    componentes: [{ slug: 'header', nome: 'Header' }],
    nota: 'Passe navigationItems e utilityItems com o conteúdo real do serviço.',
  },
  {
    regiao: '2. Trilha',
    conteudo: 'Portal, serviço e formulário. É o caminho de volta quando a pessoa desiste da etapa.',
    componentes: [{ slug: 'breadcrumb', nome: 'Breadcrumb' }],
  },
  {
    regiao: '3. Identificação da tarefa',
    conteudo:
      'Nome do que está sendo solicitado, em h1, e uma linha com o tempo estimado de preenchimento.',
    componentes: [{ slug: 'divider', nome: 'Divider' }],
  },
  {
    regiao: '4. Onde você está',
    conteudo: 'A etapa atual e a próxima, antes do primeiro campo. Aparece em todas as etapas.',
    componentes: [{ slug: 'stepper', nome: 'Stepper' }],
    nota: 'steps com a lista completa e currentStep com a posição.',
  },
  {
    regiao: '5. Resumo de erros',
    conteudo:
      'Depois de um envio que falhou: a lista dos campos com problema, cada um como link para o campo. Só existe depois do erro.',
    componentes: [{ slug: 'alert', nome: 'Alert' }],
    nota: 'variant error, role alert e dismissible={false}. Mova o foco para ele.',
  },
  {
    regiao: '6. Blocos de campos',
    conteudo:
      'Um bloco por assunto, com título próprio: “Seus dados”, “Endereço”, “Documentos”. Uma coluna, na ordem do mundo real.',
    componentes: [
      { slug: 'text-input', nome: 'TextInput' },
      { slug: 'text-area', nome: 'TextArea' },
      { slug: 'dropdown', nome: 'Dropdown' },
      { slug: 'radio', nome: 'Radio' },
      { slug: 'checkbox', nome: 'Checkbox' },
      { slug: 'datepicker', nome: 'Datepicker' },
      { slug: 'toggle', nome: 'Toggle' },
    ],
    nota: 'label é obrigatório em todos eles. Ver o padrão de Formulários.',
  },
  {
    regiao: '7. Anexos',
    conteudo:
      'O que precisa ser enviado, com formato e limite ditos antes do botão. A lista mostra o que já foi anexado, com remoção item a item.',
    componentes: [
      { slug: 'file-upload', nome: 'FileUpload' },
      { slug: 'progress-bar', nome: 'ProgressBar' },
      { slug: 'badge', nome: 'Badge' },
    ],
    nota: 'ProgressBar é composta ao lado: o FileUpload não tem estado de progresso.',
  },
  {
    regiao: '8. Ajuda desta etapa',
    conteudo:
      'As dúvidas que travam o preenchimento aqui: onde achar um número, o que fazer sem determinado documento.',
    componentes: [
      { slug: 'accordion', nome: 'Accordion' },
      { slug: 'link', nome: 'Link' },
    ],
    nota: 'Região opcional. Ajuda de campo específico vai em helperText, não aqui.',
  },
  {
    regiao: '9. Ações da etapa',
    conteudo:
      'Voltar, avançar e sair. Um primário só. Sair pede confirmação, porque descarta o que foi digitado.',
    componentes: [
      { slug: 'button', nome: 'Button' },
      { slug: 'modal', nome: 'Modal' },
    ],
    nota: 'O botão de envio usa type submit e isLoading, que aplica aria-busy e desabilita.',
  },
  {
    regiao: '10. Confirmação de salvamento',
    conteudo:
      'Aviso curto de que o progresso foi guardado ao trocar de etapa. Não interrompe e não rouba o foco.',
    componentes: [{ slug: 'toast', nome: 'Toast' }],
    nota: 'Dispensa sozinho depois de duration; pausa em hover e em foco.',
  },
  {
    regiao: '11. Revisão',
    conteudo:
      'Tudo que foi preenchido, agrupado pelos mesmos blocos do formulário, com um caminho de edição por bloco.',
    componentes: [
      { slug: 'list-item', nome: 'ListItem' },
      { slug: 'divider', nome: 'Divider' },
      { slug: 'checkbox', nome: 'Checkbox' },
      { slug: 'button', nome: 'Button' },
    ],
    nota: 'Checkbox para o aceite do termo, quando houver termo.',
  },
  {
    regiao: '12. Conclusão',
    conteudo:
      'O que aconteceu, o número do protocolo, o que vem depois e como acompanhar. Esta tela é o comprovante.',
    componentes: [
      { slug: 'alert', nome: 'Alert' },
      { slug: 'button', nome: 'Button' },
      { slug: 'link', nome: 'Link' },
    ],
  },
  {
    regiao: '13. Rodapé',
    conteudo: 'Navegação secundária, links legais e informação institucional.',
    componentes: [{ slug: 'footer', nome: 'Footer' }],
  },
  {
    regiao: '14. Apoios de página',
    conteudo: 'Retorno ao topo em etapas longas e aviso de cookies na primeira visita.',
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

export default function PaginaTemplateFormularioLongo() {
  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Templates', href: '/templates/visao-geral' },
          { titulo: 'Formulário longo' },
        ]}
      />

      <h1>Formulário longo</h1>
      <p className="wiki-prosa__resumo">
        É o formulário que não cabe em uma tela: várias etapas, dados que a pessoa precisa buscar em
        algum lugar e uma sessão que pode ser interrompida. O template organiza o caminho para que a
        interrupção não custe o preenchimento inteiro.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <h2 id="para-que-serve">Para que serve</h2>
      <p>
        Alguém está no celular, fora de casa, preenchendo um pedido que exige o número de um
        documento que ficou em casa. O telefone toca, a bateria acaba, a conexão cai. Em um
        formulário mal montado, qualquer um desses eventos apaga trinta minutos de trabalho — e,
        como em serviço público não há concorrente para onde ir, a pessoa simplesmente fica sem o
        direito.
      </p>
      <p>
        Este template resolve três coisas: <strong>dividir</strong> o formulário em etapas que a
        pessoa reconhece, <strong>guardar</strong> o que já foi preenchido a cada etapa concluída e{' '}
        <strong>mostrar</strong> tudo antes de enviar. As regras de rótulo, validação e mensagem de
        erro não estão aqui — estão em{' '}
        <Link href="/padroes/formularios">Formulários</Link>, e valem inteiras.
      </p>

      <h3 id="quando-usar">Use quando</h3>
      <ul>
        <li>O formulário tem assuntos distintos que a pessoa reconhece como diferentes.</li>
        <li>O preenchimento leva mais de alguns minutos e pode ser interrompido.</li>
        <li>Há anexo de documento, que depende de a pessoa ter o arquivo à mão.</li>
        <li>O envio gera protocolo e consequência — e um erro custa caro.</li>
      </ul>

      <h3 id="quando-nao-usar">Não use quando</h3>
      <ul>
        <li>
          <strong>São poucos campos de um assunto só.</strong> Etapa é ponto de parada, não disfarce
          para o tamanho do formulário. Cinco campos em uma tela é melhor do que cinco telas.
        </li>
        <li>
          <strong>É uma consulta.</strong> Buscar protocolo ou unidade não valida, não envia e não
          gera protocolo: é <Link href="/padroes/busca">busca</Link>.
        </li>
        <li>
          <strong>É uma preferência com efeito imediato.</strong> Use{' '}
          <Link href="/componentes/toggle">Toggle</Link> ou{' '}
          <Link href="/componentes/dropdown">Dropdown</Link> sem botão de envio.
        </li>
      </ul>

      <h2 id="estrutura">Estrutura da página</h2>
      <p>
        Na ordem vertical de uma etapa qualquer. As regiões 11 e 12 substituem as regiões 4 a 9 nas
        duas últimas telas do fluxo — a de revisão e a de conclusão.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Regiões do formulário longo, conteúdo de cada uma e componentes usados
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

      <h3 id="sequencia">A sequência das telas</h3>
      <ol>
        <li>
          <strong>Antes de começar.</strong> O que vai precisar, quanto tempo leva, se há custo. Sem
          essa tela, a pessoa começa e trava no meio.
        </li>
        <li>
          <strong>Etapas de preenchimento.</strong> Uma por assunto, com as regiões 4 a 9 acima.
        </li>
        <li>
          <strong>Revisão.</strong> Tudo que foi preenchido, com edição por bloco.
        </li>
        <li>
          <strong>Conclusão.</strong> Protocolo, próximo passo e comprovante.
        </li>
      </ol>
      <p>
        Se o envio falhar em qualquer ponto, a pessoa volta à mesma etapa{' '}
        <strong>com tudo que digitou ainda lá</strong>, com o Alert de resumo no topo e o foco nesse
        alerta. Perder o preenchimento é o pior desfecho possível deste template.
      </p>

      <h3 id="salvamento">Salvamento</h3>
      <p>
        O progresso é gravado ao concluir cada etapa, não só no envio final, e a confirmação vem por
        Toast — que dispensa sozinho depois de <code>duration</code>, pausa quando o ponteiro está
        sobre ele ou quando recebe foco, e não interrompe o preenchimento.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe no sistema componente de rascunho, retomada de
        formulário ou aviso de expiração de sessão — fonte: time. O comportamento descrito acima
        precisa ser construído por cada produto. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="grade-e-responsividade">Grade e responsividade</h2>
      <p>
        Formulário é coluna única, em todas as larguras. Os campos do sistema já vêm com{' '}
        <code>fullWidth</code> ligado por padrão em TextInput, TextArea, Dropdown, Datepicker e
        FileUpload — eles ocupam a largura do container, e é o container que precisa ter limite.
      </p>
      <ul>
        <li>
          <strong>Largura da coluna.</strong> Não existe token de largura máxima de página, e as
          três grades publicadas são do tipo <em>Stretch</em>. Sem um limite definido pelo produto,
          um campo de CEP fica com 1.400px de largura em monitor grande. Ver{' '}
          <Link href="/fundamentos/grid-e-layout">Grid e layout</Link>.
        </li>
        <li>
          <strong>Campos lado a lado.</strong> Só quando a relação é evidente e ambos são curtos,
          como CEP e número. Em tela estreita, tudo empilha — e a ordem de tabulação continua sendo a
          ordem visual.
        </li>
        <li>
          <strong>Stepper.</strong> Abaixo de <strong>480px</strong> ele usa a versão compacta:
          círculo menor, tipografia reduzida e botão de recomeçar com menos padding.
        </li>
        <li>
          <strong>Confirmação de saída.</strong> Abaixo de <strong>768px</strong>, o Modal{' '}
          <code>small</code> e <code>medium</code> vira folha inferior alinhada ao fim da tela.
        </li>
        <li>
          <strong>Toast.</strong> Ocupa a largura toda abaixo de <strong>640px</strong> e reorganiza
          título, ações e botão de dispensar em <strong>420px</strong>.
        </li>
        <li>
          <strong>Ajuda.</strong> O Accordion reduz título e conteúdo abaixo de{' '}
          <strong>640px</strong>.
        </li>
        <li>
          <strong>Moldura.</strong> Header em <strong>768px</strong>; Footer em{' '}
          <strong>1200px</strong>, <strong>720px</strong> e <strong>420px</strong>; Breadcrumb em{' '}
          <strong>640px</strong>.
        </li>
      </ul>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Dois cuidados de layout específicos deste template</p>
        <p>
          <strong>O menu do Dropdown não desvia da borda da tela</strong>, e o componente não tem
          busca por digitação nem seleção múltipla — em lista longa, prefira um campo de texto
          validado ou um grupo de radios. E <strong>o botão de ação da etapa precisa estar
          visível</strong> em tela pequena: rodapé de etapa preso ao fim da página, com o conteúdo
          rolando acima, é melhor do que um botão que só aparece depois de rolar tudo.
        </p>
      </div>

      <h2 id="variacoes">Variações</h2>

      <h3 id="variacao-etapa-unica">Etapa única</h3>
      <p>
        Formulário de um assunto só: sem Stepper e sem região 10. A revisão vira um bloco no fim da
        mesma tela, e o botão de envio fica logo abaixo dela. O resto do template não muda.
      </p>

      <h3 id="variacao-autenticado">Com conta gov.br</h3>
      <p>
        Quando o serviço exige identificação, o acesso vem antes da primeira etapa, com{' '}
        <Link href="/componentes/button-gov">ButtonGov</Link>. Dados que o Estado já tem não são
        perguntados de novo: aparecem preenchidos, com a origem declarada e um caminho para
        correção. Ver <Link href="/padroes/login">Login e identificação</Link>.
      </p>

      <h3 id="variacao-anexos">Formulário com muitos anexos</h3>
      <p>
        A região 7 vira uma etapa própria. O FileUpload em modo <code>dropzone</code> ocupa a tela
        toda, com a lista de arquivos logo abaixo — ela tem{' '}
        <code>aria-live=&quot;polite&quot;</code>, então anexar e remover são anunciados. O limite de
        tamanho e o formato vão em <code>dropzoneHint</code> e em <code>accept</code>,{' '}
        <strong>e também na validação do servidor</strong>: o componente não valida tipo nem tamanho.
      </p>

      <h3 id="variacao-condicional">Perguntas que dependem da resposta anterior</h3>
      <p>
        Quando um bloco só faz sentido para parte das pessoas, use um RadioGroup como chave e revele
        o bloco na sequência do documento, logo abaixo da pergunta — nunca em outra etapa. Não
        pré-selecione a opção que abre menos campos.
      </p>

      <h3 id="variacao-terceiro">Preenchimento por outra pessoa</h3>
      <p>
        Procurador, responsável legal, servidor no atendimento presencial: o formulário ganha um
        bloco inicial sobre quem está preenchendo, e os rótulos deixam de usar “seu”. É a diferença
        entre “Seu CPF” e “CPF do titular”.
      </p>

      <h2 id="erros-comuns">Erros comuns</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Erros comuns no formulário longo, consequência e correção
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
              <th scope="row">Etapa para esconder o tamanho</th>
              <td>Dez campos viram dez telas e dez esperas de rede.</td>
              <td>Uma etapa por assunto. Etapa é ponto de parada, não disfarce.</td>
            </tr>
            <tr>
              <th scope="row">Salvar só no envio final</th>
              <td>Queda de conexão na quarta etapa apaga as três anteriores.</td>
              <td>Grave ao concluir cada etapa e confirme com Toast.</td>
            </tr>
            <tr>
              <th scope="row">Stepper usado como navegação</th>
              <td>A pessoa clica na etapa anterior e nada acontece.</td>
              <td>O caminho de volta é um Button secundário no rodapé da etapa.</td>
            </tr>
            <tr>
              <th scope="row">Resumo de erro fechável</th>
              <td>A pessoa fecha por reflexo e perde a lista dos campos com problema.</td>
              <td>
                <code>dismissible=&#123;false&#125;</code> no Alert de resumo, e foco nele depois do
                envio.
              </td>
            </tr>
            <tr>
              <th scope="row">Envio sem estado de carregamento</th>
              <td>Clique duplo gera duas solicitações e dois protocolos.</td>
              <td>
                <code>isLoading</code> no botão de envio: aplica <code>aria-busy</code> e desabilita.
              </td>
            </tr>
            <tr>
              <th scope="row">Sair da etapa sem confirmação</th>
              <td>Um clique errado no cabeçalho descarta o preenchimento.</td>
              <td>Modal com dois botões, dizendo o que será perdido.</td>
            </tr>
            <tr>
              <th scope="row">Limite de arquivo só no texto de apoio</th>
              <td>
                A pessoa anexa um arquivo grande, espera o envio e recebe erro do servidor.
              </td>
              <td>
                Declare em <code>accept</code>, valide no cliente e no servidor, e diga o limite
                antes do botão.
              </td>
            </tr>
            <tr>
              <th scope="row">Revisão que não deixa editar</th>
              <td>
                Para corrigir um dado, a pessoa recomeça o fluxo ou desiste e envia errado.
              </td>
              <td>Um caminho de edição por bloco, que volta à etapa e preserva o resto.</td>
            </tr>
            <tr>
              <th scope="row">Dropdown com centenas de opções</th>
              <td>Sem busca por digitação, a pessoa percorre a lista inteira com a seta.</td>
              <td>Campo de texto validado, ou lista reduzida pelo contexto já conhecido.</td>
            </tr>
            <tr>
              <th scope="row">Conclusão sem protocolo</th>
              <td>A pessoa não tem prova de que enviou nem como acompanhar.</td>
              <td>Número, próximo passo e comprovante que se possa guardar.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="pendencias">Pendências deste template</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de lista de revisão (o “confira seus
        dados” antes do envio) nem de página de confirmação com protocolo — fonte: time. As regiões
        11 e 12 precisam ser construídas por cada produto. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o FileUpload não tem estado de progresso —{' '}
        <code>itemStatusLabel</code> é um texto fixo (&quot;Carregado&quot; por padrão), sem
        indicação de envio em andamento nem percentual. Enquanto isso, a ProgressBar precisa ser
        composta ao lado, por conta de cada produto — fonte: repositório. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe componente de máscara de entrada, autocompletar ou
        consulta de CEP. O TextInput aceita os tipos <code>text</code>, <code>email</code>,{' '}
        <code>password</code>, <code>search</code>, <code>tel</code> e <code>url</code>, e não expõe
        prop de máscara — fonte: repositório. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> entre os componentes deste template, TextInput, Checkbox,
        Radio, Dropdown, Datepicker, FileUpload, Toggle, Button e Modal têm teste axe. TextArea,
        Alert, Stepper, Toast, Accordion, Badge, ProgressBar, ListItem, Header, Footer e Breadcrumb
        não têm — neles o teste manual é obrigatório. Ver{' '}
        <Link href="/fundamentos/acessibilidade">Acessibilidade</Link> — fonte: repositório.
        Registrado em <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
