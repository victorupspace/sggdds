import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';

export const metadata: Metadata = {
  title: 'Vocabulário',
  description:
    'Glossário controlado da interface dos serviços do Estado de São Paulo: qual palavra usar para cada coisa, o que evitar, por quê e onde o termo aparece.',
};

interface Termo {
  use: string;
  evite: string;
  porque: string;
  onde: string;
}

const SERVICO: Termo[] = [
  {
    use: 'solicitação',
    evite: 'requerimento, pleito, protocolização',
    porque:
      'É a palavra que a pessoa reconhece como “o que eu pedi”. Requerimento e pleito pertencem ao vocabulário do processo administrativo, não ao de quem espera um documento.',
    onde: 'Título da página, resumo do pedido, e-mail de confirmação',
  },
  {
    use: 'pedido',
    evite: 'processo, demanda, caso',
    porque:
      'Sinônimo aceito de solicitação em textos curtos, como botão e lista. Escolha um dos dois para o serviço inteiro e não alterne.',
    onde: 'Button, lista de acompanhamento, estado vazio',
  },
  {
    use: 'protocolo',
    evite: 'ticket, chamado, número de referência',
    porque:
      'É o número que prova o pedido e permite acompanhá-lo. Já é assim que se chama em serviço público — não troque por termo de central de atendimento.',
    onde: 'Tela de confirmação, consulta, comprovante',
  },
  {
    use: 'serviço',
    evite: 'produto, aplicação, sistema, plataforma',
    porque:
      'Quem procura a segunda via de um documento procura um serviço. “Sistema” só aparece quando o assunto é mesmo a tecnologia.',
    onde: 'Título, busca, menu do Header',
  },
  {
    use: 'agendar, agendamento',
    evite: 'marcar horário, reservar vaga, marcação',
    porque:
      'Um verbo para a ação e um substantivo para o resultado, sempre os mesmos, do título ao comprovante.',
    onde: 'Button, título da tela, Stepper',
  },
  {
    use: 'atendimento',
    evite: 'ato de atendimento, serviço presencial',
    porque:
      'Cobre o presencial e o feito pela internet. Diga qual dos dois logo em seguida: “atendimento presencial”, “atendimento pela internet”.',
    onde: 'Título, agendamento, página da unidade',
  },
  {
    use: 'unidade de atendimento',
    evite: 'agência, loja, posto, ponto de atendimento',
    porque:
      '“Unidade” serve para qualquer rede. Quando a rede tem nome próprio — como o Poupatempo — use o nome oficial dela.',
    onde: 'Resultado de busca, agendamento, ListItem',
  },
  {
    use: 'documentos necessários',
    evite: 'documentação exigida, documentos comprobatórios, rol de documentos',
    porque: 'É a lista do que a pessoa precisa separar, escrita como ela pensa a tarefa.',
    onde: 'Seção “Antes de começar”, Accordion',
  },
  {
    use: 'comprovante',
    evite: 'recibo, voucher, protocolo (quando é o documento)',
    porque:
      'Protocolo é o número; comprovante é o documento que a pessoa guarda ou imprime. Trocar os dois faz o serviço parecer que entregou duas coisas.',
    onde: 'Tela final, botão “Baixar comprovante”',
  },
  {
    use: 'taxa',
    evite: 'emolumento, custas, tarifa',
    porque:
      'É o nome do valor cobrado pelo serviço. Os outros pertencem ao vocabulário jurídico ou bancário.',
    onde: 'Resumo do pedido, tabela de valores',
  },
  {
    use: 'gratuito',
    evite: 'grátis, isento, sem custo, R$ 0,00',
    porque:
      'Uma palavra, sem exclamação e sem sugerir que existe uma cobrança escondida em outro lugar.',
    onde: 'Card do serviço, resumo do pedido',
  },
  {
    use: 'prazo',
    evite: 'previsão, prazo estimado, em breve',
    porque:
      'Prazo tem número e unidade: “até 5 dias úteis”. Sem isso, é só uma promessa que a pessoa não pode conferir.',
    onde: 'Alert, resumo do pedido, acompanhamento',
  },
  {
    use: 'acompanhar',
    evite: 'rastrear, consultar status, monitorar',
    porque: 'A pessoa acompanha o pedido; o serviço informa a situação.',
    onde: 'Button, título da consulta, e-mail',
  },
  {
    use: 'situação',
    evite: 'status',
    porque:
      'Estrangeirismo evitável que não acrescenta precisão. Em coluna de tabela, “Situação” cabe no mesmo espaço.',
    onde: 'Badge, coluna da DataTable, acompanhamento',
  },
  {
    use: 'em análise',
    evite: 'em processamento, tramitando, sob apreciação',
    porque:
      'Diz que uma pessoa está olhando o pedido. “Processamento” sugere máquina; “tramitando” sugere corredor de repartição.',
    onde: 'Badge, linha da tabela, acompanhamento',
  },
  {
    use: 'aprovado, negado',
    evite: 'deferido, indeferido',
    porque:
      'A pessoa precisa saber se conseguiu ou não, e por quê. Deferimento é palavra do direito administrativo, não do serviço.',
    onde: 'Badge, Alert, e-mail de resultado',
  },
  {
    use: 'cancelar pedido',
    evite: 'desistir, dar baixa, anular, arquivar',
    porque:
      'O rótulo nomeia o que será cancelado. “Cancelar” sozinho, ao lado de um formulário, confunde-se com “sair sem salvar”.',
    onde: 'Button, título do Modal de confirmação',
  },
  {
    use: 'cadastro, cadastrar',
    evite: 'efetuar cadastro, registro, inscrição',
    porque:
      'Um par verbo-substantivo só. “Inscrição” fica reservado para quando o serviço é mesmo uma inscrição, como em um programa.',
    onde: 'Título, Button, e-mail de boas-vindas',
  },
];

const ACESSO: Termo[] = [
  {
    use: 'entrar',
    evite: 'login, logar, autenticar, acessar sua conta',
    porque:
      'O ButtonGov já traz “Entrar com o gov.br” como texto padrão. Repita essa palavra em todo lugar que leva ao mesmo passo.',
    onde: 'ButtonGov, ação de conta no Header',
  },
  {
    use: 'sair',
    evite: 'logout, deslogar, encerrar sessão, desconectar',
    porque: 'É o par direto de “entrar”, e é o que a pessoa procura no menu da conta.',
    onde: 'Menu da conta, Header',
  },
  {
    use: 'conta gov.br',
    evite: 'login único, conta única, cadastro gov.br',
    porque:
      'É o nome da conta que a pessoa já usa em outros serviços públicos. O nome sempre em minúsculas.',
    onde: 'Tela de acesso, Alert, texto de apoio',
  },
  {
    use: 'senha',
    evite: 'credencial, palavra-passe',
    porque: 'A palavra que está impressa na cabeça de quem vai digitar.',
    onde: 'TextInput, mensagem de erro de acesso',
  },
  {
    use: 'código de verificação',
    evite: 'token, OTP, PIN, código de segurança',
    porque:
      'A pessoa recebe um código e digita. “Token” é jargão de tecnologia e não diz onde encontrar o número.',
    onde: 'TextInput, texto de apoio, e-mail e SMS',
  },
  {
    use: 'sua sessão terminou',
    evite: 'sessão expirada, timeout, sessão inválida',
    porque:
      'Frase completa em voz ativa, seguida do que fazer: “Sua sessão terminou por inatividade. Entre de novo para continuar.”',
    onde: 'Alert, Modal',
  },
  {
    use: 'seus dados',
    evite: 'dados cadastrais, informações do requerente, dados pessoais do titular',
    porque: 'Título de bloco curto e direto, na segunda pessoa.',
    onde: 'Título de bloco do formulário, tela de revisão',
  },
];

const ACOES: Termo[] = [
  {
    use: 'preencher',
    evite: 'inserir dados, informar os campos, alimentar o formulário',
    porque: 'É o verbo que a pessoa usa para descrever o que está fazendo no formulário.',
    onde: 'Instrução, Alert de resumo de erros',
  },
  {
    use: 'digite',
    evite: 'insira, informe, entre com',
    porque:
      'Em mensagem de erro e texto de apoio, o imperativo direto diz o que fazer: “Digite o CPF com 11 números.”',
    onde: 'helperText e errorText do TextInput',
  },
  {
    use: 'obrigatório',
    evite: 'de preenchimento obrigatório, mandatório, requerido',
    porque:
      'Uma palavra basta — e, na maioria dos casos, nem ela: o componente já mostra a obrigatoriedade pela prop required.',
    onde: 'TextInput, RadioGroup, FileUpload',
  },
  {
    use: 'opcional',
    evite: 'facultativo, não obrigatório, se desejar',
    porque:
      'Quando quase tudo é obrigatório, escreva “(opcional)” no rótulo dos poucos campos que não são.',
    onde: 'Rótulo do campo',
  },
  {
    use: 'enviar',
    evite: 'submeter, transmitir, efetuar o envio',
    porque:
      '“Submeter” é tradução literal de submit. “Enviar” é o que a pessoa entende que acontece com o pedido.',
    onde: 'Button de envio do formulário',
  },
  {
    use: 'anexar',
    evite: 'fazer upload, carregar, subir arquivo',
    porque: 'O FileUpload já traz “Anexar arquivos” como rótulo padrão do botão.',
    onde: 'FileUpload, instrução sobre documentos',
  },
  {
    use: 'baixar',
    evite: 'fazer download, efetuar download, exportar (quando é baixar)',
    porque: 'Verbo em português, curto, que cabe no botão: “Baixar comprovante”.',
    onde: 'Button, link do comprovante',
  },
  {
    use: 'salvar',
    evite: 'gravar, armazenar, persistir',
    porque: 'É a palavra que aparece em todo aplicativo que a pessoa já usa.',
    onde: 'Button, Toast de confirmação',
  },
  {
    use: 'continuar',
    evite: 'próximo, avançar, seguir, prosseguir',
    porque:
      'Um verbo só para ir adiante no fluxo. O Stepper já anuncia o que vem em seguida com o rótulo “Próxima:”.',
    onde: 'Button no rodapé de cada etapa',
  },
  {
    use: 'voltar',
    evite: 'retornar, página anterior, cancelar (quando é voltar)',
    porque: 'Par direto de “continuar”, e sem risco de ser lido como desistência do pedido.',
    onde: 'Button secundário no rodapé da etapa',
  },
  {
    use: 'selecionar',
    evite: 'clicar em, clique aqui, tocar em',
    porque:
      'Funciona para quem usa mouse, toque ou teclado. “Clique” exclui parte do público já no verbo.',
    onde: 'Instrução, texto de apoio, Dropdown',
  },
  {
    use: 'escolher',
    evite: 'optar por, eleger, marcar',
    porque: 'Usado quando há alternativas visíveis, como no grupo de opções.',
    onde: 'RadioGroup, Dropdown, Checkbox',
  },
  {
    use: 'buscar',
    evite: 'pesquisar, procurar, localizar',
    porque:
      'Um verbo só para a busca do serviço. Alternar entre “buscar” e “pesquisar” na mesma tela sugere duas funções diferentes.',
    onde: 'Campo de busca, Button, estado vazio',
  },
  {
    use: 'filtrar, limpar filtros',
    evite: 'refinar, resetar, aplicar critérios',
    porque: 'O par nomeia a ação e o desfazer dela, sem estrangeirismo.',
    onde: 'Chip de filtro, Button, resultado da busca',
  },
  {
    use: 'excluir',
    evite: 'deletar, eliminar, apagar definitivamente',
    porque: 'Reservado para o que deixa de existir. É o verbo do Modal de confirmação.',
    onde: 'Button destrutivo, Modal',
  },
  {
    use: 'remover',
    evite: 'deletar, retirar, tirar da lista',
    porque:
      'Reservado para tirar um item de uma lista sem apagar o dado — como o arquivo anexado antes do envio.',
    onde: 'Lista de arquivos do FileUpload, lista de filtros',
  },
  {
    use: 'editar',
    evite: 'alterar, modificar, atualizar cadastro',
    porque: 'Um verbo só para mudar algo já preenchido, inclusive na tela de revisão.',
    onde: 'Link ou Button na revisão do formulário',
  },
  {
    use: 'corrigir',
    evite: 'ajustar, retificar, sanar',
    porque: 'Usado quando o serviço aponta um erro e pede uma nova tentativa.',
    onde: 'Alert de resumo de erros, errorText',
  },
  {
    use: 'confirmar',
    evite: 'validar, ratificar, homologar',
    porque:
      'Só quando a pessoa está confirmando algo que ela mesma fez. Se a ação é destrutiva, nomeie o que acontece: “Excluir pedido”.',
    onde: 'Modal, tela de revisão',
  },
];

const PESSOAS: Termo[] = [
  {
    use: 'você',
    evite: 'o usuário, o cidadão-usuário, o requerente, o interessado, o beneficiário',
    porque:
      'A interface fala com a pessoa, não sobre ela. “Requerente” e “beneficiário” só entram quando são termo legal do serviço, e mesmo aí precisam de explicação.',
    onde: 'Toda a interface',
  },
  {
    use: 'a pessoa',
    evite: 'o usuário',
    porque:
      'Em documentação, pesquisa e nesta wiki, quem usa o serviço é a pessoa. A palavra “usuário” não aparece.',
    onde: 'Documentação, relatório de pesquisa, wiki',
  },
  {
    use: 'pessoa com deficiência',
    evite: 'portador de deficiência, deficiente, pessoa especial, portador de necessidades',
    porque:
      'A pessoa vem antes da característica. “Portador” trata a deficiência como algo que se carrega e se pode largar.',
    onde: 'Atendimento prioritário, página de acessibilidade',
  },
  {
    use: 'pessoa idosa',
    evite: 'idoso, terceira idade, melhor idade',
    porque: 'É a forma usada na legislação e não reduz alguém à idade.',
    onde: 'Atendimento prioritário, critérios do serviço',
  },
  {
    use: 'nome social',
    evite: 'apelido, nome de tratamento, como prefere ser chamado',
    porque:
      'É o nome pelo qual a pessoa é reconhecida, e é um direito — não uma preferência de tratamento.',
    onde: 'Rótulo do campo, texto de apoio',
  },
  {
    use: 'responsável legal',
    evite: 'tutor, representante, terceiro autorizado',
    porque: 'Nomeia com precisão quem pode agir por outra pessoa, sem ambiguidade jurídica.',
    onde: 'Formulário preenchido por outra pessoa',
  },
  {
    use: 'quem tem interesse',
    evite: 'os interessados, todos os cidadãos, o público-alvo',
    porque:
      'A reescrita elimina a marca de gênero sem usar grafias que o leitor de tela não consegue ler, como “tod@s” e “todxs”.',
    onde: 'Chamada, aviso, critérios do serviço',
  },
];

const TEMPO: Termo[] = [
  {
    use: 'dias úteis, dias corridos',
    evite: 'dias (sozinho)',
    porque:
      'A diferença muda a semana de quem espera. Sempre escreva qual das duas contagens o serviço usa.',
    onde: 'Prazo, Alert, e-mail de confirmação',
  },
  {
    use: 'até',
    evite: 'no prazo máximo de, em até, dentro do período de',
    porque: '“Até 5 dias úteis” diz o mesmo com menos palavras e sem cara de norma.',
    onde: 'Prazo, resumo do pedido',
  },
  {
    use: 'horário de atendimento',
    evite: 'expediente, funcionamento, horário de funcionamento',
    porque: 'É o que a pessoa procura antes de sair de casa.',
    onde: 'Página da unidade, Card, agendamento',
  },
  {
    use: 'agora',
    evite: 'neste exato momento, no presente momento, hoje em dia',
    porque:
      'Em aviso de indisponibilidade, “agora” é suficiente — e o resto da frase precisa dizer quando volta.',
    onde: 'Alert de sistema fora do ar',
  },
];

const TELA: Termo[] = [
  {
    use: 'campo',
    evite: 'caixa de texto, input, box',
    porque: 'É o nome do lugar onde a pessoa digita, e o que ela vai procurar quando houver erro.',
    onde: 'Texto de apoio, mensagem de erro',
  },
  {
    use: 'lista de opções',
    evite: 'combo, select, dropdown',
    porque:
      'O componente se chama Dropdown; o texto voltado à pessoa, não. Nome de componente é vocabulário de quem constrói.',
    onde: 'Texto de apoio do Dropdown',
  },
  {
    use: 'aba',
    evite: 'guia, tab',
    porque: 'Uma palavra em português para a mesma coisa, em toda a interface.',
    onde: 'Texto que se refere ao Tabs',
  },
  {
    use: 'janela',
    evite: 'modal, pop-up, diálogo',
    porque: 'O componente se chama Modal. Para a pessoa, o que abre por cima da página é uma janela.',
    onde: 'Texto que se refere ao Modal',
  },
  {
    use: 'menu',
    evite: 'hambúrguer, nav, navegação principal (para a pessoa)',
    porque: 'O Header já traz “Abrir menu principal” como rótulo acessível do botão.',
    onde: 'Header, instrução de navegação',
  },
  {
    use: 'página',
    evite: 'tela, view, seção (quando é página)',
    porque:
      'Na web, o que carrega é uma página; em aplicativo, é uma tela. Escolha conforme o produto e não misture.',
    onde: 'Breadcrumb, paginação, instrução',
  },
  {
    use: 'anexo',
    evite: 'arquivo anexado, documento carregado, upload',
    porque: 'Substantivo curto, par natural do verbo “anexar”.',
    onde: 'Lista de arquivos do FileUpload, revisão',
  },
  {
    use: 'e-mail',
    evite: 'email, Email, correio eletrônico',
    porque:
      'Com hífen e em minúsculas no meio da frase. “Correio eletrônico” só aparece em texto legal.',
    onde: 'Rótulo do campo, texto de confirmação',
  },
  {
    use: 'site',
    evite: 'sítio eletrônico, portal, endereço eletrônico',
    porque: 'É a palavra em uso. “Sítio eletrônico” pertence ao texto normativo, não à tela.',
    onde: 'Rodapé, links externos',
  },
  {
    use: 'celular',
    evite: 'telefone móvel, aparelho, smartphone',
    porque: 'É como a pessoa chama o próprio telefone.',
    onde: 'Rótulo do campo, instrução',
  },
  {
    use: 'link',
    evite: 'hiperlink, atalho, endereço',
    porque:
      'Só quando é preciso nomear o elemento. Na maior parte das vezes, descreva o destino em vez de falar do link.',
    onde: 'Texto de apoio, instrução de acessibilidade',
  },
];

const ESTRANGEIRISMOS: Termo[] = [
  {
    use: 'entrar, sair',
    evite: 'login, logout, logar, deslogar',
    porque: 'Verbos em português, curtos, que cabem no botão.',
    onde: 'ButtonGov, menu da conta',
  },
  {
    use: 'anexar, baixar',
    evite: 'upload, download',
    porque: 'Um verbo em português para cada ação, do rótulo do botão ao e-mail.',
    onde: 'FileUpload, Button',
  },
  {
    use: 'situação',
    evite: 'status',
    porque: 'Mesma quantidade de informação, sem estrangeirismo.',
    onde: 'Badge, DataTable',
  },
  {
    use: 'código de verificação',
    evite: 'token, OTP',
    porque: 'Descreve o que a pessoa recebe e vai digitar.',
    onde: 'TextInput, e-mail e SMS',
  },
  {
    use: 'prazo',
    evite: 'deadline',
    porque: 'Palavra corrente em serviço público, e a que aparece nos comunicados oficiais.',
    onde: 'Prazo, acompanhamento',
  },
  {
    use: 'e-mail, site, link',
    evite: 'reescrever para outra coisa',
    porque:
      'Estes três já foram incorporados ao português e são mais claros que qualquer tradução. Mantenha a grafia estável.',
    onde: 'Toda a interface',
  },
];

function TabelaVocabulario({ legenda, termos }: { legenda: string; termos: Termo[] }) {
  return (
    <div className="wiki-tabela-rolagem" tabIndex={0}>
      <table className="wiki-tabela">
        <caption className="wiki-visualmente-oculto">{legenda}</caption>
        <thead>
          <tr>
            <th scope="col">Termo preferido</th>
            <th scope="col">Evitar</th>
            <th scope="col">Por quê</th>
            <th scope="col">Onde aparece</th>
          </tr>
        </thead>
        <tbody>
          {termos.map((termo) => (
            <tr key={termo.use}>
              <th scope="row">{termo.use}</th>
              <td>{termo.evite}</td>
              <td>{termo.porque}</td>
              <td>{termo.onde}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PaginaVocabulario() {
  const total =
    SERVICO.length + ACESSO.length + ACOES.length + PESSOAS.length + TEMPO.length + TELA.length;

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Conteúdo', href: '/conteudo/writing' }, { titulo: 'Vocabulário' }]}
      />

      <h1>Vocabulário</h1>
      <p className="wiki-prosa__resumo">
        Uma coisa, uma palavra. Este é o vocabulário controlado da interface dos serviços do Estado
        de São Paulo: {total} termos com a forma preferida, o que evitar, o motivo e o lugar em que
        cada um aparece. Quando houver dúvida entre dois jeitos de escrever, esta página decide.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Em redação, sinônimo é qualidade. Em interface, é dúvida. Se a tela chama de “solicitação”, o
        e-mail chama de “requerimento” e o atendimento chama de “processo”, a pessoa conclui que são
        três coisas diferentes — e liga para perguntar qual delas é a dela. O custo aparece no
        telefone, na fila e no pedido que volta para correção.
      </p>
      <p>
        Vocabulário controlado também é acessibilidade. Quem usa leitor de tela ouve o texto em
        sequência, sem poder comparar telas lado a lado. Quem tem deficiência intelectual, baixa
        escolaridade ou está com pressa depende de reconhecer a mesma palavra no mesmo lugar. E quem
        traduz o serviço para outra língua, ou usa tradução automática, produz um resultado melhor a
        partir de um texto consistente.
      </p>

      <h2 id="como-usar">Como usar esta página</h2>
      <ul>
        <li>
          <strong>A coluna “Termo preferido” é a decisão.</strong> Use exatamente essa forma, na tela,
          no e-mail, no SMS e no comprovante.
        </li>
        <li>
          <strong>A coluna “Evitar” não é proibição de dicionário.</strong> São palavras corretas em
          português que, neste contexto, confundem ou pertencem a outro vocabulário.
        </li>
        <li>
          <strong>Quando o termo evitado for exigência legal</strong>, escreva o termo preferido e
          cite o legal ao lado, uma vez: “pedido (requerimento, no texto da lei)”.
        </li>
        <li>
          <strong>Nome de componente não é vocabulário de interface.</strong> O sistema tem um
          componente chamado <Link href="/componentes/modal">Modal</Link>; a pessoa lê “janela”.
        </li>
        <li>
          As regras de forma — capitalização, datas, valores, siglas — estão em{' '}
          <Link href="/conteudo/writing">Padrões de escrita</Link>. Aqui está a escolha da palavra.
        </li>
        <li>
          Os termos técnicos do design system — token, variante, componente, primitivo — ficam no{' '}
          <Link href="/recursos/glossario">Glossário</Link>. Esta página é o vocabulário voltado a
          quem usa o serviço.
        </li>
      </ul>

      <h2 id="glossario">Glossário de interface</h2>

      <h3 id="servico">O serviço e o pedido</h3>
      <TabelaVocabulario
        legenda="Termos de serviço, pedido, prazo e acompanhamento"
        termos={SERVICO}
      />

      <h3 id="acesso">Identificação e acesso</h3>
      <TabelaVocabulario legenda="Termos de entrada, conta e identificação" termos={ACESSO} />

      <h3 id="acoes">Formulário e ações</h3>
      <TabelaVocabulario
        legenda="Verbos e termos de preenchimento, envio e edição"
        termos={ACOES}
      />

      <h3 id="pessoas">Pessoas</h3>
      <TabelaVocabulario
        legenda="Como nomear quem usa o serviço e quem tem atendimento prioritário"
        termos={PESSOAS}
      />

      <h3 id="tempo">Tempo e prazo</h3>
      <TabelaVocabulario legenda="Termos de prazo, horário e disponibilidade" termos={TEMPO} />

      <h3 id="tela">Elementos da tela</h3>
      <TabelaVocabulario
        legenda="Como nomear campos, listas, abas, janelas e anexos para a pessoa"
        termos={TELA}
      />

      <h2 id="estrangeirismos">Estrangeirismos</h2>
      <p>
        A regra não é purismo: é previsibilidade. Um estrangeirismo fica quando já é a palavra em uso
        e não tem tradução mais clara. Sai quando existe verbo curto em português para a mesma ação.
      </p>
      <TabelaVocabulario
        legenda="Estrangeirismos: o que traduzir, o que manter e por quê"
        termos={ESTRANGEIRISMOS}
      />

      <h2 id="nomes">Nomes próprios</h2>
      <p>
        Nome próprio não se adapta ao estilo do texto: se escreve como o dono dele escreve. Os nomes
        abaixo aparecem nos componentes do sistema e valem como referência de grafia.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Nomes próprios, grafia correta e onde a grafia está registrada no sistema
          </caption>
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Como escrever</th>
              <th scope="col">Onde está no sistema</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">gov.br</th>
              <td>
                Sempre em minúsculas, inclusive no começo da frase — reescreva a frase para não
                começar por ele.
              </td>
              <td>
                <Link href="/componentes/button-gov">ButtonGov</Link>, no texto padrão “Entrar com o
                gov.br”
              </td>
            </tr>
            <tr>
              <th scope="row">SP.GOV.BR</th>
              <td>Em caixa alta, com pontos, sem espaços.</td>
              <td>
                <Link href="/componentes/header">Header</Link> e{' '}
                <Link href="/componentes/footer">Footer</Link>, como rótulo acessível da marca
              </td>
            </tr>
            <tr>
              <th scope="row">Portal de Serviços ao Cidadão</th>
              <td>Iniciais maiúsculas, por ser nome próprio.</td>
              <td>
                <Link href="/componentes/header">Header</Link>, no rótulo acessível do logo
                secundário
              </td>
            </tr>
            <tr>
              <th scope="row">Governo do Estado de São Paulo</th>
              <td>Por extenso, com acentos, sem sigla.</td>
              <td>
                <Link href="/componentes/footer">Footer</Link>, no texto padrão de direitos autorais
              </td>
            </tr>
            <tr>
              <th scope="row">Sampa Design System</th>
              <td>
                Três palavras, iniciais maiúsculas. A sigla “DS” só em texto interno de time, nunca
                em tela voltada à pessoa.
              </td>
              <td>
                <Link href="/introducao/sobre">Sobre o Sampa DS</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Poupatempo</th>
              <td>Uma palavra, sem hífen, com inicial maiúscula.</td>
              <td>Nome de serviço — confirme a grafia com o próprio órgão antes de publicar</td>
            </tr>
            <tr>
              <th scope="row">Detran-SP</th>
              <td>
                Inicial maiúscula, resto em minúsculas, por ser sigla pronunciável com mais de três
                letras.
              </td>
              <td>Nome de serviço — confirme a grafia com o próprio órgão antes de publicar</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe lista oficial consolidada de nomes e siglas dos
        órgãos e serviços do Estado de São Paulo para uso em interface — fonte: time. As duas
        últimas linhas da tabela registram o uso corrente, não uma fonte oficial. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="nos-componentes">Onde o vocabulário entra nos componentes</h2>
      <p>
        Cada palavra desta página tem um lugar concreto no código. A tabela liga o tipo de termo à
        prop que o recebe.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Tipo de termo, prop que recebe o texto e componente correspondente
          </caption>
          <thead>
            <tr>
              <th scope="col">Tipo de termo</th>
              <th scope="col">Prop</th>
              <th scope="col">Componente</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Verbo de ação</th>
              <td>
                <code>children</code>
              </td>
              <td>
                <Link href="/componentes/button">Button</Link>,{' '}
                <Link href="/componentes/link">Link</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Nome do dado</th>
              <td>
                <code>label</code>
              </td>
              <td>
                <Link href="/componentes/text-input">TextInput</Link>,{' '}
                <Link href="/componentes/dropdown">Dropdown</Link>,{' '}
                <Link href="/componentes/file-upload">FileUpload</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Formato e motivo do dado</th>
              <td>
                <code>helperText</code>
              </td>
              <td>
                <Link href="/componentes/text-input">TextInput</Link>,{' '}
                <Link href="/componentes/text-area">TextArea</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">O que houve e o que fazer</th>
              <td>
                <code>errorText</code>
              </td>
              <td>
                <Link href="/componentes/text-input">TextInput</Link>,{' '}
                <Link href="/componentes/file-upload">FileUpload</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Mensagem completa</th>
              <td>
                <code>title</code> e <code>children</code>
              </td>
              <td>
                <Link href="/componentes/alert">Alert</Link>,{' '}
                <Link href="/componentes/toast">Toast</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Situação do pedido</th>
              <td>
                <code>children</code>
              </td>
              <td>
                <Link href="/componentes/badge">Badge</Link>,{' '}
                <Link href="/componentes/chip">Chip</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Instrução de escolha</th>
              <td>
                <code>placeholder</code>
              </td>
              <td>
                <Link href="/componentes/dropdown">Dropdown</Link>, que já traz “Selecione”
              </td>
            </tr>
            <tr>
              <th scope="row">Rótulo lido por leitor de tela</th>
              <td>
                <code>ariaLabel</code>, <code>dismissLabel</code>, <code>closeLabel</code>,{' '}
                <code>labels</code>
              </td>
              <td>
                <Link href="/componentes/modal">Modal</Link>,{' '}
                <Link href="/componentes/toast">Toast</Link>,{' '}
                <Link href="/componentes/pagination">Pagination</Link>,{' '}
                <Link href="/componentes/data-table">DataTable</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Vários desses textos já vêm preenchidos no código. A lista dos valores padrão, com as
        correções pendentes, está em{' '}
        <Link href="/conteudo/writing">Padrões de escrita</Link>.
      </p>

      <h2 id="do-e-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              “Acompanhe sua solicitação pelo número do protocolo.” — e a mesma frase no e-mail e no
              comprovante.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              “Acompanhe seu requerimento pelo número do protocolo” na tela e “consulte seu processo
              pelo código” no e-mail.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Quem recebe as duas mensagens passa a procurar a diferença entre requerimento, processo,
            protocolo e código. Não existe diferença — existe inconsistência.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>Botão “Entrar com o gov.br”, com a mesma palavra em toda chamada de acesso.</p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>“Faça login”, “Autentique-se” e “Acesse sua conta” em três telas do mesmo serviço.</p>
          </div>
          <p className="wiki-dodont__porque">
            O ButtonGov já define o texto padrão. Três nomes para o mesmo passo fazem a pessoa achar
            que precisa de três credenciais diferentes.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              “Remover” para tirar um arquivo da lista antes do envio e “Excluir” para apagar um
              pedido já registrado.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>“Deletar” nos dois casos, ou “Excluir” para as duas ações.</p>
          </div>
          <p className="wiki-dodont__porque">
            A distinção entre tirar da lista e apagar de vez é a diferença entre um susto e um dano
            real. O verbo precisa carregar essa informação sozinho.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>“Pessoas com deficiência e pessoas idosas têm atendimento prioritário.”</p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>“Portadores de deficiência e idosos têm atendimento prioritário.”</p>
          </div>
          <p className="wiki-dodont__porque">
            A pessoa vem antes da característica. É a forma usada na legislação e a que o próprio
            público adota para se nomear.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>“Escolha uma opção na lista” no texto de apoio de um Dropdown.</p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>“Selecione um item no dropdown” ou “abra o combo”.</p>
          </div>
          <p className="wiki-dodont__porque">
            Dropdown é o nome do componente para quem constrói. Para quem usa o serviço, é uma lista
            de opções — e a palavra precisa funcionar também para quem não vê a tela.
          </p>
        </div>
      </div>

      <h2 id="propor">Como propor um termo</h2>
      <ol>
        <li>
          Confira se o termo já está nesta página ou no{' '}
          <Link href="/recursos/glossario">Glossário</Link>. Termo repetido com definição diferente
          é o pior desfecho possível.
        </li>
        <li>
          Escreva a proposta no formato da tabela: termo preferido, o que evitar, por quê e onde
          aparece.
        </li>
        <li>
          Traga a evidência: onde o termo aparece hoje, em qual serviço, e o que a pesquisa com
          pessoas mostrou. Preferência de time não decide vocabulário.
        </li>
        <li>
          Verifique o impacto: se o termo já está em um texto padrão de componente, a mudança é no
          código, não só nesta página.
        </li>
        <li>
          Leve a proposta pelo caminho descrito em{' '}
          <Link href="/introducao/governanca">Governança</Link>.
        </li>
      </ol>

      <h2 id="pendencias">Pendências desta página</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> este vocabulário não existia em nenhuma fonte antes desta
        wiki — nem no Figma, nem no Storybook, nem em documento do time. O item 8 de{' '}
        <code>LACUNAS.md</code> registra a ausência do guia de conteúdo e escrita e atribui a lacuna
        ao time de conteúdo e UX writing. Cada linha destas tabelas é proposta e precisa ser validada
        antes de virar norma.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> falta definir quem decide sobre vocabulário — quem aprova um
        termo novo, em quanto tempo e com qual critério de desempate — fonte: time. Sem isso, o
        passo 5 da seção <a href="#propor">Como propor um termo</a> não tem destinatário. Registrado
        em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> os termos legais obrigatórios de cada serviço — os casos em que
        a lei exige “requerente”, “deferimento” ou “interessado” no texto — não estão levantados —
        fonte: jurídico dos órgãos. Até esse levantamento existir, a decisão é caso a caso, com o
        termo preferido em primeiro lugar e o termo legal citado uma vez. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
