import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { listarComponentes } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Padrões de escrita',
  description:
    'Como escrever a interface de um serviço do Estado de São Paulo: títulos, rótulos, botões, textos de ajuda, capitalização, datas, valores, documentos, siglas e linguagem inclusiva, com exemplos de antes e depois.',
};

interface ParEscrita {
  evite: string;
  escreva: string;
  porque: string;
}

interface LinhaAntesDepois {
  onde: string;
  antes: string;
  depois: string;
  porque: string;
}

interface TextoPadrao {
  componente: string;
  slug: string;
  prop: string;
  texto: string;
}

const PARES_TITULOS: ParEscrita[] = [
  {
    evite: 'Solicitação de Emissão de Segunda Via de Documento',
    escreva: 'Segunda via do RG',
    porque:
      'O título nomeia o serviço com as palavras que a pessoa usa para procurar. Maiúscula em cada palavra atrasa a leitura e não é regra do português.',
  },
  {
    evite: 'Bem-vindo ao portal de serviços!',
    escreva: 'Serviços do Estado de São Paulo',
    porque:
      'A saudação ocupa a linha mais visível da página sem dizer o que dá para fazer ali.',
  },
  {
    evite: 'DOCUMENTAÇÃO NECESSÁRIA',
    escreva: 'Documentos necessários',
    porque:
      'Caixa alta em frase inteira quebra o formato da palavra, é mais lenta de ler e alguns leitores de tela anunciam letra por letra.',
  },
  {
    evite: 'Informações gerais acerca do procedimento',
    escreva: 'Como funciona',
    porque:
      'O título de seção responde à pergunta que a pessoa tem naquele ponto da página, com as palavras dela.',
  },
  {
    evite: 'Etapa 2 — Preenchimento dos dados cadastrais do requerente',
    escreva: 'Seus dados',
    porque:
      'Título curto cabe na tela do celular e continua legível quando a pessoa amplia a página em 200%.',
  },
  {
    evite: 'Consulta de protocolo.',
    escreva: 'Consulta de protocolo',
    porque: 'Título não é frase: não leva ponto final.',
  },
];

const PARES_ROTULOS: ParEscrita[] = [
  {
    evite: 'Informe o número do CPF do requerente:',
    escreva: 'CPF',
    porque:
      'O rótulo nomeia o dado. A instrução vai para o texto de apoio, e dois-pontos no fim não acrescenta nada.',
  },
  {
    evite: 'E-MAIL',
    escreva: 'E-mail',
    porque:
      'O rótulo em caixa alta não fica mais visível: fica mais lento de ler, e o destaque já vem do peso da fonte.',
  },
  {
    evite: 'Data',
    escreva: 'Data do atendimento',
    porque:
      'Rótulo genérico obriga a pessoa a adivinhar de que data a tela está falando — e a errar quando adivinha errado.',
  },
  {
    evite: 'Telefone/Celular',
    escreva: 'Celular',
    porque:
      'A barra transfere para a pessoa uma decisão que é do serviço. Se aceita os dois, diga isso no texto de apoio.',
  },
  {
    evite: 'Nome (preencher conforme documento oficial, sem abreviações)',
    escreva: 'Nome completo',
    porque:
      'A regra de preenchimento cabe em helperText: “Escreva como está no seu documento, sem abreviar.”',
  },
  {
    evite: 'Anexo obrigatório *',
    escreva: 'Comprovante de residência',
    porque:
      'O asterisco é desenhado pelo componente com aria-hidden. A obrigatoriedade chega a quem usa leitor de tela pelo atributo required, não pelo símbolo escrito no rótulo.',
  },
];

const PARES_BOTOES: ParEscrita[] = [
  {
    evite: 'OK',
    escreva: 'Enviar solicitação',
    porque:
      'O botão diz o que vai acontecer quando for acionado. “OK” só funciona para quem já leu e entendeu tudo acima.',
  },
  {
    evite: 'SUBMETER',
    escreva: 'Enviar',
    porque:
      '“Submeter” é tradução literal de submit e não é a palavra que a pessoa usa. A caixa alta atrapalha a leitura.',
  },
  {
    evite: 'Sim / Não, em um pedido de confirmação',
    escreva: 'Excluir pedido / Voltar',
    porque:
      'Quem chega ao botão pela tecla Tab, sem reler o texto acima, precisa entender a consequência só pelo rótulo.',
  },
  {
    evite: 'Clique aqui para continuar',
    escreva: 'Continuar',
    porque:
      'O botão já é o lugar do clique. E nem todo mundo clica: há quem toque na tela e quem acione pelo teclado.',
  },
  {
    evite: 'Enviando…, escrito à mão no lugar do texto do botão',
    escreva: 'Enviar, com a prop isLoading',
    porque:
      'O Button já resolve o estado de carregamento: isLoading aplica aria-busy, bloqueia a interação e exibe loadingLabel, que vem como “Carregando”.',
  },
  {
    evite: 'Voltar ao início do formulário e apagar tudo',
    escreva: 'Recomeçar',
    porque:
      'O Stepper já usa “Recomeçar” em restartLabel. Repita a palavra que o sistema usa em vez de criar outra para a mesma ação.',
  },
  {
    evite: 'Log in',
    escreva: 'Entrar',
    porque:
      'O ButtonGov já traz “Entrar com o gov.br” como texto padrão. Manter a mesma palavra no serviço inteiro evita que a pessoa ache que são coisas diferentes.',
  },
];

const PARES_AJUDA: ParEscrita[] = [
  {
    evite: 'Campo de preenchimento obrigatório',
    escreva: 'Use o e-mail que você consulta com frequência. É para lá que enviamos o protocolo.',
    porque:
      'O texto de apoio explica o formato ou o motivo do dado. A obrigatoriedade já é dita pelo componente.',
  },
  {
    evite: 'Um placeholder escrito “CPF”, sem rótulo',
    escreva: 'Rótulo “CPF” e apoio “Somente números, 11 dígitos”',
    porque:
      'O placeholder desaparece no primeiro caractere digitado. Depois disso, a pessoa não tem mais como conferir o que aquele campo pedia.',
  },
  {
    evite: 'Formato: dd/mm/yyyy',
    escreva: 'Use o formato DD/MM/AAAA',
    porque:
      'É o mesmo formato que o Datepicker já mostra no placeholder. Escrever de outro jeito sugere que são regras diferentes.',
  },
  {
    evite: 'Informações adicionais',
    escreva: 'Conte o que aconteceu, com data e local. Isso ajuda na análise.',
    porque:
      'Texto de apoio genérico produz resposta genérica — e resposta genérica volta como pedido de complementação.',
  },
  {
    evite: 'Rótulo “Data de nascimento” e apoio “Digite sua data de nascimento”',
    escreva: 'Rótulo “Data de nascimento” e apoio “Use o formato DD/MM/AAAA”',
    porque:
      'O apoio entra no aria-describedby: repetir o rótulo faz quem usa leitor de tela ouvir a mesma informação duas vezes.',
  },
];

const PARES_LINKS: ParEscrita[] = [
  {
    evite: 'Para ver a lista de documentos, clique aqui.',
    escreva: 'Veja a lista de documentos necessários.',
    porque:
      'Quem usa leitor de tela pode navegar por uma lista só de links. Uma lista com dez “clique aqui” não leva a lugar nenhum.',
  },
  {
    evite: 'Saiba mais',
    escreva: 'Como funciona o agendamento',
    porque: 'O texto do link é a promessa do destino. “Saiba mais” não promete nada.',
  },
  {
    evite: 'O endereço completo colado como texto do link',
    escreva: 'O nome da página de destino',
    porque:
      'Endereço cru é lido caractere a caractere pelo leitor de tela e quebra o layout em tela estreita.',
  },
  {
    evite: 'Um link que abre em outra aba sem avisar',
    escreva: 'O texto do destino, com a marcação de link externo',
    porque:
      'O Link exibe o ícone de externo quando recebe external ou target igual a _blank, e aplica rel com noopener noreferrer. O ícone avisa; o texto explica para onde vai.',
  },
];

const PARES_CAPITALIZACAO: ParEscrita[] = [
  {
    evite: 'Agendar Atendimento',
    escreva: 'Agendar atendimento',
    porque:
      'Em português, só a primeira palavra e os nomes próprios levam maiúscula. Title Case é convenção do inglês.',
  },
  {
    evite: 'Solicitar Segunda Via da CNH',
    escreva: 'Solicitar segunda via da CNH',
    porque: 'A sigla continua em caixa alta; o resto da frase, não.',
  },
  {
    evite: 'Gov.br, GOV.BR',
    escreva: 'gov.br',
    porque:
      'O nome é escrito em minúsculas. Se a frase começaria por ele, reescreva a frase: “Entre com a conta gov.br.”',
  },
  {
    evite: 'Você receberá um E-mail com o Protocolo',
    escreva: 'Você recebe um e-mail com o número do protocolo',
    porque:
      'Substantivo comum não vira nome próprio por ser importante. Maiúscula fora de lugar deixa a frase ruidosa.',
  },
  {
    evite: 'ATENÇÃO: LEVE UM DOCUMENTO COM FOTO',
    escreva: 'Leve um documento oficial com foto',
    porque:
      'Se a informação é importante, ela vai para o lugar certo — um Alert — e não para a caixa alta.',
  },
];

const PARES_LINGUAGEM: ParEscrita[] = [
  {
    evite: 'O usuário deverá informar seus dados pessoais',
    escreva: 'Informe seus dados',
    porque:
      'A interface fala com a pessoa, não sobre ela. Em texto de documentação, escreva “a pessoa” — nunca “o usuário”.',
  },
  {
    evite: 'Prezado(a) usuário(a), seja bem-vindo!',
    escreva: 'Olá',
    porque:
      'O leitor de tela anuncia “usuário abre parênteses a fecha parênteses”. Além de confuso, marca gênero sem necessidade.',
  },
  {
    evite: 'Portadores de deficiência têm atendimento prioritário',
    escreva: 'Pessoas com deficiência têm atendimento prioritário',
    porque:
      'A pessoa vem antes da característica. “Portador” trata a deficiência como algo que se carrega.',
  },
  {
    evite: 'Idosos e gestantes',
    escreva: 'Pessoas idosas e gestantes',
    porque: '“Pessoa idosa” é a forma usada na legislação e não reduz alguém à idade.',
  },
  {
    evite: 'Preso a uma cadeira de rodas',
    escreva: 'Usa cadeira de rodas',
    porque:
      'A cadeira de rodas dá autonomia. Descrevê-la como prisão é interpretação, não informação.',
  },
  {
    evite: 'Basta clicar no botão que é simples',
    escreva: 'Selecione Continuar',
    porque:
      '“Basta”, “é só” e “simples” culpam quem não conseguiu. E nem todo mundo clica: há toque e teclado.',
  },
  {
    evite: 'Todos os interessados devem comparecer',
    escreva: 'Quem tem interesse precisa comparecer',
    porque:
      'A reescrita elimina a marca de gênero sem inventar grafia que leitor de tela não lê, como “tod@s” ou “todxs”.',
  },
];

const ANTES_E_DEPOIS: LinhaAntesDepois[] = [
  {
    onde: 'Título da página',
    antes: 'Solicitação de Emissão de Segunda Via',
    depois: 'Segunda via do RG',
    porque: 'Nomeia o serviço com a palavra que a pessoa procura, em sentence case.',
  },
  {
    onde: 'Título de seção',
    antes: 'DA DOCUMENTAÇÃO EXIGIDA',
    depois: 'Documentos necessários',
    porque: 'Sem caixa alta e sem construção de texto legal.',
  },
  {
    onde: 'Rótulo de campo',
    antes: 'Informe o CPF do requerente:',
    depois: 'CPF',
    porque: 'Rótulo nomeia o dado; a instrução vai para o texto de apoio.',
  },
  {
    onde: 'Texto de apoio',
    antes: 'Campo obrigatório',
    depois: 'Somente números, 11 dígitos',
    porque: 'A obrigatoriedade vem da prop required; o apoio explica o formato.',
  },
  {
    onde: 'Botão primário',
    antes: 'SUBMETER',
    depois: 'Enviar solicitação',
    porque: 'Verbo no infinitivo, em sentence case, dizendo o que acontece.',
  },
  {
    onde: 'Botão secundário',
    antes: 'Cancelar',
    depois: 'Voltar sem salvar',
    porque: 'Diz a consequência da ação, não o nome técnico dela.',
  },
  {
    onde: 'Link no meio do texto',
    antes: 'Para consultar o prazo, clique aqui.',
    depois: 'Consulte o prazo de análise.',
    porque: 'O texto do link descreve o destino e funciona fora do contexto.',
  },
  {
    onde: 'Erro de preenchimento',
    antes: 'Campo inválido',
    depois: 'Digite o CPF com 11 números, sem pontos nem traço.',
    porque: 'Diz o que aconteceu e o que fazer agora.',
  },
  {
    onde: 'Erro de sistema',
    antes: 'Sistema indisponível',
    depois:
      'Não foi possível carregar seus pedidos agora. O problema é nosso. Tente de novo em alguns minutos.',
    porque: 'Assume o erro, dá a próxima ação e não deixa a pessoa achando que fez algo errado.',
  },
  {
    onde: 'Erro de acesso',
    antes: 'Usuário ou senha inválidos',
    depois: 'Não conseguimos entrar com esses dados. Confira o CPF e a senha e tente de novo.',
    porque: 'Sem a palavra “usuário” e sem acusar a pessoa de invalidez.',
  },
  {
    onde: 'Confirmação de envio',
    antes: 'Operação realizada com sucesso!',
    depois:
      'Pedido enviado. Guarde o número do protocolo abaixo: é com ele que você acompanha a análise.',
    porque: 'Diz o que foi feito, o que a pessoa leva dali e o que vem depois.',
  },
  {
    onde: 'Estado vazio',
    antes: 'Nenhum registro encontrado',
    depois: 'Você ainda não tem pedidos. Quando fizer um, ele aparece aqui.',
    porque: 'Explica a ausência em vez de anunciar o resultado de uma consulta ao banco.',
  },
  {
    onde: 'Aviso antes do formulário',
    antes: 'ATENÇÃO!!! Documento obrigatório',
    depois: 'Leve um documento oficial com foto. Sem ele, o atendimento não pode ser feito.',
    porque: 'Uma frase de fato e uma de consequência, sem caixa alta e sem exclamação.',
  },
  {
    onde: 'Data em texto',
    antes: 'Prazo: 05/08/26',
    depois: 'Prazo: 5 de agosto de 2026',
    porque: 'Ano com quatro dígitos e mês por extenso não deixam dúvida.',
  },
  {
    onde: 'Horário',
    antes: 'Atendimento das 09:00 AM às 06:00 PM',
    depois: 'Atendimento das 9h às 18h',
    porque: 'Formato de 24 horas, que é o uso brasileiro.',
  },
  {
    onde: 'Valor',
    antes: 'Taxa: 89.5 reais',
    depois: 'Taxa: R$ 89,50',
    porque: 'Vírgula decimal, duas casas e o símbolo antes do número.',
  },
  {
    onde: 'Quantidade',
    antes: '1472 tokens',
    depois: '1.472 tokens',
    porque: 'Ponto separa o milhar em português.',
  },
  {
    onde: 'Documento',
    antes: 'Nr. do CPF: 12345678900',
    depois: 'CPF: 000.000.000-00',
    porque: 'Formato pontuado, rótulo com a sigla e sem abreviação de “número”.',
  },
  {
    onde: 'Telefone',
    antes: 'Tel.: 1100000000',
    depois: '(00) 00000-0000',
    porque: 'DDD entre parênteses e hífen antes dos quatro últimos dígitos.',
  },
  {
    onde: 'Sigla na primeira menção',
    antes: 'Solicite sua CNH',
    depois: 'Solicite sua Carteira Nacional de Habilitação (CNH)',
    porque: 'Depois da primeira menção, use só a sigla.',
  },
  {
    onde: 'Texto sobre quem usa',
    antes: 'O usuário poderá acompanhar o andamento do seu pleito',
    depois: 'Você pode acompanhar o andamento do pedido',
    porque: 'Fala com a pessoa, em voz ativa, sem “usuário” e sem juridiquês.',
  },
  {
    onde: 'Parágrafo de norma',
    antes:
      'Outrossim, informamos que o deferimento do pleito dar-se-á no prazo de até 30 (trinta) dias, contados da data da protocolização.',
    depois: 'A análise leva até 30 dias corridos, contados a partir do envio do pedido.',
    porque: 'Uma frase, voz ativa, sem número repetido por extenso e sem “outrossim”.',
  },
  {
    onde: 'Instrução de interação',
    antes: 'Clique no botão abaixo para prosseguir',
    depois: 'Selecione Continuar',
    porque: 'Funciona para quem usa mouse, toque ou teclado.',
  },
  {
    onde: 'Aviso de manutenção',
    antes: 'Sistema em manutenção. Volte mais tarde.',
    depois:
      'O agendamento fica fora do ar até as 6h de amanhã, por manutenção. Os pedidos já enviados não são afetados.',
    porque: 'Diz o que parou, até quando e o que acontece com o que já foi feito.',
  },
];

const TEXTOS_PADRAO: TextoPadrao[] = [
  { componente: 'Button', slug: 'button', prop: 'loadingLabel', texto: 'Carregando' },
  { componente: 'ButtonGov', slug: 'button-gov', prop: 'children', texto: 'Entrar com o gov.br' },
  { componente: 'Alert', slug: 'alert', prop: 'dismissLabel', texto: 'Dispensar alerta' },
  { componente: 'Toast', slug: 'toast', prop: 'dismissLabel', texto: 'Dispensar notificacao' },
  { componente: 'Modal', slug: 'modal', prop: 'closeLabel', texto: 'Fechar modal' },
  { componente: 'Dropdown', slug: 'dropdown', prop: 'placeholder', texto: 'Selecione' },
  { componente: 'Datepicker', slug: 'datepicker', prop: 'placeholder', texto: 'DD/MM/AAAA' },
  { componente: 'FileUpload', slug: 'file-upload', prop: 'uploadLabel', texto: 'Anexar arquivos' },
  {
    componente: 'FileUpload',
    slug: 'file-upload',
    prop: 'dropzoneText',
    texto: 'Arraste arquivos aqui ou clique para selecionar',
  },
  {
    componente: 'FileUpload',
    slug: 'file-upload',
    prop: 'dropzoneHint',
    texto: 'PDF, CSV ou XLSX até 10mb',
  },
  { componente: 'Stepper', slug: 'stepper', prop: 'nextLabel', texto: 'Próxima:' },
  { componente: 'Stepper', slug: 'stepper', prop: 'completedTitle', texto: 'Serviço concluído' },
  { componente: 'Stepper', slug: 'stepper', prop: 'restartLabel', texto: 'Recomeçar' },
  { componente: 'Spinner', slug: 'spinner', prop: 'label', texto: 'Carregando' },
  { componente: 'BackToTop', slug: 'back-to-top', prop: 'ariaLabel', texto: 'Voltar ao topo' },
  { componente: 'Breadcrumb', slug: 'breadcrumb', prop: 'homeLabel', texto: 'Inicio' },
  { componente: 'Header', slug: 'header', prop: 'menuButtonLabel', texto: 'Abrir menu principal' },
  {
    componente: 'Pagination',
    slug: 'pagination',
    prop: 'labels.firstPage',
    texto: 'Primeira pagina',
  },
  {
    componente: 'DataTable',
    slug: 'data-table',
    prop: 'labels.noData',
    texto: 'Nenhum dado encontrado',
  },
  {
    componente: 'DataTable',
    slug: 'data-table',
    prop: 'labels.rowsPerPage',
    texto: 'Linhas por pagina',
  },
  { componente: 'Carousel', slug: 'carousel', prop: 'labels.previousSlide', texto: 'Card anterior' },
  {
    componente: 'CookieConsentBanner',
    slug: 'cookie-consent-banner',
    prop: 'title',
    texto: 'Estamos usando cookies para melhorar sua experiência!',
  },
];

function TabelaPares({ legenda, pares }: { legenda: string; pares: ParEscrita[] }) {
  return (
    <div className="wiki-tabela-rolagem" tabIndex={0}>
      <table className="wiki-tabela">
        <caption className="wiki-visualmente-oculto">{legenda}</caption>
        <thead>
          <tr>
            <th scope="col">Evite</th>
            <th scope="col">Escreva</th>
            <th scope="col">Por quê</th>
          </tr>
        </thead>
        <tbody>
          {pares.map((par) => (
            <tr key={par.evite}>
              <th scope="row">{par.evite}</th>
              <td>{par.escreva}</td>
              <td>{par.porque}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PaginaPadroesDeEscrita() {
  const componentes = listarComponentes();

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Conteúdo', href: '/conteudo/writing' },
          { titulo: 'Padrões de escrita' },
        ]}
      />

      <h1>Padrões de escrita</h1>
      <p className="wiki-prosa__resumo">
        O texto é a maior parte de um serviço digital. Antes de ver um componente, a pessoa lê uma
        palavra — e é ela que decide se o serviço vai ser concluído. Esta página define como o
        Estado de São Paulo escreve na tela: títulos, rótulos, botões, mensagens, formatos e
        vocabulário.
      </p>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Quem usa um serviço público não escolheu estar ali. Precisa de uma segunda via, de um
        agendamento, de uma autorização — e não tem outro lugar para ir. Se a frase é ambígua, a
        pessoa erra o campo; se é técnica demais, ela desiste; se é juridiquês, ela liga para o
        atendimento ou vai até um posto. Cada uma dessas saídas custa dinheiro público e tempo de
        vida.
      </p>
      <p>
        Escrever bem aqui não é escrever bonito. É escrever de um jeito que funcione para quem lê
        com pressa, no celular, com pouca luz, com baixa visão, com leitor de tela, ou sem
        familiaridade com formulário na internet. A régua é uma só:{' '}
        <strong>a pessoa entende de primeira e sabe o que fazer em seguida</strong>.
      </p>

      <h2 id="principios">Seis princípios</h2>
      <ol>
        <li>
          <strong>Fale com a pessoa, não sobre ela.</strong> Use “você”. Em documentação, escreva “a
          pessoa” — nunca “o usuário”.
        </li>
        <li>
          <strong>Voz ativa e frase curta.</strong> Quem age vem antes do que é feito. Uma ideia por
          frase.
        </li>
        <li>
          <strong>Diga primeiro o que importa.</strong> A informação principal vem na primeira
          frase, não depois do contexto.
        </li>
        <li>
          <strong>Use a palavra que a pessoa usa.</strong> Se o termo técnico é obrigatório por lei,
          escreva-o e explique ao lado.
        </li>
        <li>
          <strong>Toda tela termina com uma próxima ação.</strong> Se não há o que fazer, diga o que
          esperar e por quanto tempo.
        </li>
        <li>
          <strong>Repita a mesma palavra para a mesma coisa.</strong> Sinônimo em interface não é
          elegância: é dúvida. O{' '}
          <Link href="/conteudo/vocabulario">Vocabulário</Link> define qual palavra vale.
        </li>
      </ol>

      <h2 id="titulos">Títulos</h2>
      <p>
        O título é o texto mais lido da página — e às vezes o único. Ele aparece na aba do
        navegador, no resultado de busca e no anúncio do leitor de tela quando a página carrega.
      </p>
      <ul>
        <li>Um <code>h1</code> por página, e ele nomeia o serviço ou a tarefa.</li>
        <li>
          Sentence case: só a primeira letra em maiúscula, mais os nomes próprios e as siglas.
        </li>
        <li>Sem ponto final. Título não é frase.</li>
        <li>
          Comece pela palavra que carrega o assunto. “Documentos necessários”, não “Informações
          sobre os documentos”.
        </li>
        <li>
          Não pule nível de hierarquia: depois de um <code>h2</code> vem <code>h3</code>, nunca{' '}
          <code>h4</code>. Quem navega por títulos usa essa estrutura como índice.
        </li>
        <li>Até 60 caracteres, para não quebrar em três linhas no celular.</li>
      </ul>
      <TabelaPares legenda="Exemplos de reescrita de títulos" pares={PARES_TITULOS} />

      <h2 id="rotulos">Rótulos de campo</h2>
      <p>
        O rótulo é o nome do dado. Ele fica visível, acima do campo, e continua lá depois que a
        pessoa começa a digitar. Em{' '}
        <Link href="/componentes/text-input">TextInput</Link>,{' '}
        <Link href="/componentes/text-area">TextArea</Link>,{' '}
        <Link href="/componentes/dropdown">Dropdown</Link>,{' '}
        <Link href="/componentes/datepicker">Datepicker</Link> e{' '}
        <Link href="/componentes/file-upload">FileUpload</Link>, a prop <code>label</code> é o que
        liga o texto ao campo — o sistema não oferece campo sem rótulo, e isso é de propósito.
      </p>
      <ul>
        <li>Uma a três palavras. O rótulo nomeia, não instrui.</li>
        <li>Sem dois-pontos no fim, sem caixa alta, sem asterisco escrito à mão.</li>
        <li>
          Use o termo do documento que a pessoa tem na mão: “CPF”, não “Cadastro de Pessoas
          Físicas”.
        </li>
        <li>
          Quando quase tudo é obrigatório, escreva “(opcional)” no rótulo dos poucos campos que não
          são — em vez de marcar todos os outros.
        </li>
        <li>
          Não use barra para juntar dois dados diferentes. Um campo, um dado.
        </li>
      </ul>
      <TabelaPares legenda="Exemplos de reescrita de rótulos de campo" pares={PARES_ROTULOS} />

      <h2 id="botoes">Botões e ações</h2>
      <p>
        O rótulo do botão é uma promessa: ele diz o que vai acontecer. Quem navega por teclado chega
        no botão sem reler a tela, e quem usa leitor de tela pode ouvir só a lista de botões.
      </p>
      <ul>
        <li>
          <strong>Verbo no infinitivo</strong> — “Enviar”, “Agendar”, “Baixar comprovante”. Nunca
          conjugue: “Envio” e “Enviado” não são ações.
        </li>
        <li>Uma a três palavras, em sentence case.</li>
        <li>
          O verbo é o mesmo do título da tela. Título “Agendar atendimento”, botão “Agendar”.
        </li>
        <li>
          Um botão primário por tela. Voltar e cancelar são secundário e terciário —{' '}
          <code>variant</code> resolve isso no <Link href="/componentes/button">Button</Link>.
        </li>
        <li>
          Ação destrutiva nomeia o que destrói: “Excluir pedido”, não “Confirmar”.
        </li>
        <li>
          Não escreva o estado no rótulo. <code>isLoading</code> já exibe{' '}
          <code>loadingLabel</code> e aplica <code>aria-busy</code>.
        </li>
        <li>
          Se o botão precisar de explicação para ser entendido, o problema está no rótulo — não
          acrescente um texto embaixo.
        </li>
      </ul>
      <TabelaPares legenda="Exemplos de reescrita de rótulos de botão" pares={PARES_BOTOES} />

      <h2 id="ajuda">Textos de ajuda e placeholder</h2>
      <p>
        O texto de apoio (<code>helperText</code>) responde a uma de duas perguntas: qual é o
        formato esperado, ou por que este dado está sendo pedido. Não serve para repetir o rótulo
        nem para dizer que o campo é obrigatório.
      </p>
      <ul>
        <li>Uma linha. Se precisa de duas, a informação provavelmente é do topo da tela.</li>
        <li>
          <strong>Placeholder não é rótulo.</strong> Ele some quando a pessoa digita, tem contraste
          baixo e não é lido de forma confiável. Use só para exemplo de formato.
        </li>
        <li>
          Quando o dado é sensível, diga por que é necessário e o que será feito com ele. O silêncio
          nesse ponto é o que faz a pessoa abandonar o formulário.
        </li>
        <li>
          O apoio entra no <code>aria-describedby</code> junto com o erro. Escreva os dois de forma
          que não se repitam.
        </li>
      </ul>
      <TabelaPares legenda="Exemplos de reescrita de textos de apoio" pares={PARES_AJUDA} />

      <h2 id="mensagens">Mensagens</h2>
      <p>
        Toda mensagem responde a três perguntas, nesta ordem: o que aconteceu, por que (só se
        ajudar) e o que fazer agora. No{' '}
        <Link href="/componentes/alert">Alert</Link> e no{' '}
        <Link href="/componentes/toast">Toast</Link>, a prop <code>title</code> responde a primeira
        e o <code>children</code> responde as outras duas. O tratamento completo de erro, incluindo
        a escolha entre Alert, Toast e erro de campo, está em{' '}
        <Link href="/padroes/feedback-e-erros">Feedback e erros</Link>.
      </p>
      <ul>
        <li>Sem “Ops!”, sem emoji, sem ponto de exclamação.</li>
        <li>
          Sem culpa. O sujeito é o serviço: “Não foi possível enviar”, não “Você não conseguiu
          enviar”.
        </li>
        <li>
          Sem código de erro e sem jargão: “token”, “timeout”, “payload” e “erro 500” não dizem nada
          para quem só quer o documento.
        </li>
        <li>
          Sucesso também informa: além de dizer que deu certo, entregue o número do protocolo, o
          prazo e o caminho para acompanhar.
        </li>
        <li>
          Mensagem de sistema fora do ar precisa dizer o que parou, até quando e o que acontece com
          o que já foi enviado.
        </li>
      </ul>

      <h2 id="links">Links</h2>
      <p>
        O texto do link descreve o destino e funciona lido sozinho, fora da frase. Essa é a
        diferença entre navegar por lista de links e caçar informação na página inteira.
      </p>
      <TabelaPares legenda="Exemplos de reescrita de textos de link" pares={PARES_LINKS} />

      <h2 id="capitalizacao">Capitalização</h2>
      <p>
        A regra é uma: <strong>sentence case em tudo</strong> — títulos, rótulos, botões, abas,
        itens de menu, opções de lista, mensagens. Só a primeira letra da frase em maiúscula, mais
        nomes próprios e siglas.
      </p>
      <ul>
        <li>
          <strong>Title Case não existe em português.</strong> “Agendar Atendimento” é hábito
          importado do inglês.
        </li>
        <li>
          <strong>Caixa alta não é ênfase.</strong> Ela reduz a velocidade de leitura e alguns
          leitores de tela soletram a palavra. Para destacar, use negrito com parcimônia ou um
          Alert.
        </li>
        <li>
          Nomes de documentos oficiais mantêm a maiúscula quando são o nome do documento: “Carteira
          Nacional de Habilitação”. “Documento com foto” é substantivo comum.
        </li>
        <li>
          Nomes de serviços seguem a grafia oficial: Poupatempo, Detran-SP, gov.br — este último
          sempre em minúsculas.
        </li>
      </ul>
      <TabelaPares legenda="Exemplos de capitalização" pares={PARES_CAPITALIZACAO} />

      <h2 id="formatos">Números, datas e documentos</h2>
      <p>
        Formato inconsistente é erro de preenchimento disfarçado. Escolha um formato por tipo de
        dado e use o mesmo na tela inteira, no e-mail e no comprovante.
      </p>

      <h3 id="datas">Datas</h3>
      <ul>
        <li>
          <strong>Em texto corrido:</strong> 5 de agosto de 2026. Dia sem zero à esquerda, mês por
          extenso em minúscula, ano com quatro dígitos.
        </li>
        <li>
          <strong>Em campo, tabela ou lista:</strong> 05/08/2026. Sempre DD/MM/AAAA — é o mesmo
          formato que o <Link href="/componentes/datepicker">Datepicker</Link> mostra no
          placeholder.
        </li>
        <li>Nunca misture os dois formatos na mesma tela.</li>
        <li>Ano com dois dígitos não existe: 05/08/26 é ambíguo e envelhece mal.</li>
        <li>
          Intervalo: “de 5 a 9 de agosto de 2026”. Quando o dia da semana ajuda a pessoa a se
          organizar, escreva-o: “quarta-feira, 5 de agosto”.
        </li>
        <li>
          <strong>Prazo sempre diz a unidade:</strong> “até 5 dias úteis” ou “até 30 dias
          corridos”. “Dias”, sozinho, faz a pessoa contar errado e voltar antes da hora.
        </li>
        <li>
          Datas relativas só quando não há dúvida: “hoje”, “amanhã”. “Em breve” não é prazo.
        </li>
      </ul>

      <h3 id="horas">Horas</h3>
      <ul>
        <li>Formato de 24 horas: 9h, 14h30, 23h59. Sem AM e sem PM.</li>
        <li>Minutos só quando existem: 9h, não 9h00. Em coluna de tabela, mantenha o mesmo padrão.</li>
        <li>Intervalo: “das 9h às 18h”.</li>
        <li>
          Quando o horário é limite de prazo, escreva o minuto final: “até 23h59 do dia 5 de agosto
          de 2026”.
        </li>
      </ul>

      <h3 id="numeros">Números</h3>
      <ul>
        <li>
          <strong>Na interface, sempre algarismo</strong> — inclusive de um a dez. Números são
          âncoras visuais em rótulo, lista, tabela e resumo.
        </li>
        <li>
          Em texto corrido explicativo, escreva por extenso de um a dez e use algarismo a partir de
          11. Quantidade, idade, medida, prazo e dinheiro são sempre algarismo.
        </li>
        <li>Milhar com ponto e decimal com vírgula: 1.472, 2.193, 3,5.</li>
        <li>Porcentagem colada no número: 12%.</li>
        <li>Ordinal com a letra sobrescrita: 1º, 2ª.</li>
        <li>Não comece frase com algarismo. Reescreva a frase.</li>
        <li>
          Zero é uma frase, não um número: escreva “Você não tem pedidos”, não “0 pedidos”.
        </li>
      </ul>

      <h3 id="valores">Valores em real</h3>
      <ul>
        <li>Símbolo, espaço e duas casas decimais: R$ 89,50 — nunca R$ 89,5 nem R$ 89.</li>
        <li>Milhar com ponto: R$ 1.234,56.</li>
        <li>
          Serviço sem custo se escreve “Gratuito”. “R$ 0,00” faz a pessoa procurar a taxa escondida.
        </li>
        <li>Não abrevie: “R$ 1,2 mil” vira dúvida. Escreva o número inteiro.</li>
        <li>
          Se há mais de um custo, mostre a soma e a lista. O total é o que a pessoa precisa ter no
          bolso.
        </li>
      </ul>

      <h3 id="documentos">CPF, CNPJ e outros documentos</h3>
      <ul>
        <li>
          <strong>CPF:</strong> 11 dígitos, exibido como 000.000.000-00. Rótulo “CPF”, apoio
          “Somente números, 11 dígitos”.
        </li>
        <li>
          <strong>CNPJ:</strong> 14 dígitos, exibido como 00.000.000/0000-00.
        </li>
        <li>
          <strong>Aceite o que a pessoa digitar.</strong> Com pontos, sem pontos, colado de outro
          lugar: limpe a pontuação no código em vez de devolver erro.
        </li>
        <li>
          <strong>RG não tem formato único</strong> — varia conforme o órgão emissor. Não imponha
          máscara nem quantidade de dígitos.
        </li>
        <li>
          Ao exibir um documento em tela que outra pessoa pode ver, mostre só parte:
          •••.000.000-••.
        </li>
        <li>
          Não escreva “Nr.”, “N°” nem “número do CPF”. A sigla já é o nome do campo.
        </li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o sistema não tem componente de máscara de entrada — o{' '}
        <Link href="/componentes/text-input">TextInput</Link> não expõe prop de máscara e aceita
        apenas os tipos nativos <code>text</code>, <code>email</code>, <code>password</code>,{' '}
        <code>search</code>, <code>tel</code> e <code>url</code> — fonte: time. Até existir, cada
        produto formata o valor por conta. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h3 id="telefone-e-cep">Telefone e CEP</h3>
      <ul>
        <li>
          <strong>Celular:</strong> (00) 00000-0000. <strong>Fixo:</strong> (00) 0000-0000. DDD
          entre parênteses, espaço, hífen antes dos quatro últimos dígitos.
        </li>
        <li>
          Peça o DDD no mesmo campo do número. Dois campos separados dobram a chance de erro e
          quebram o preenchimento automático do navegador.
        </li>
        <li>
          <strong>CEP:</strong> 00000-000. Rótulo “CEP”, em caixa alta, com apoio “Somente números,
          8 dígitos”.
        </li>
        <li>
          Se o serviço busca o endereço pelo CEP, diga isso no apoio — e mantenha os campos de
          endereço editáveis.
        </li>
      </ul>

      <h2 id="siglas">Siglas</h2>
      <ul>
        <li>
          <strong>Primeira menção:</strong> nome por extenso com a sigla entre parênteses —
          “Carteira Nacional de Habilitação (CNH)”. Depois, só a sigla.
        </li>
        <li>
          Em rótulo de campo, a sigla conhecida vem sozinha: “CPF”, “RG”, “CEP”. Escrever por
          extenso ali atrapalha em vez de ajudar.
        </li>
        <li>Sem pontos entre as letras: CPF, não C.P.F.</li>
        <li>Plural sem apóstrofo: CPFs, CNHs.</li>
        <li>
          Siglas de até três letras ficam em caixa alta (RG, CEP, CNH). Siglas pronunciáveis com
          quatro letras ou mais levam só a inicial maiúscula (Detran).
        </li>
        <li>
          <strong>Não use sigla interna do órgão</strong> em tela voltada à pessoa. Nome de sistema,
          de setor e de processo interno não significam nada fora da repartição.
        </li>
        <li>Não invente sigla nova para caber no espaço. Reescreva o texto.</li>
      </ul>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe uma lista oficial de nomes e siglas dos órgãos do
        Estado de São Paulo consolidada para uso em interface — fonte: time. Até existir, confirme a
        grafia com o próprio órgão antes de publicar. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="linguagem">Linguagem neutra e não capacitista</h2>
      <p>
        O serviço é para todo mundo, e o texto precisa mostrar isso sem esforço aparente. Quase
        sempre a solução não é acrescentar palavra: é reescrever a frase.
      </p>
      <ul>
        <li>
          <strong>Fale direto com a pessoa.</strong> “Informe seus dados” resolve o gênero sem
          precisar marcá-lo.
        </li>
        <li>
          <strong>Não use “(a)”, “@” nem “x”.</strong> O leitor de tela anuncia os parênteses e o
          símbolo, e a leitura fica ininteligível. Prefira termos sem marca de gênero: “pessoa”,
          “quem”, “time”, “equipe”.
        </li>
        <li>
          <strong>A pessoa vem antes da característica:</strong> pessoa com deficiência, pessoa
          idosa, pessoa surda, pessoa em situação de rua.
        </li>
        <li>
          <strong>Sem “portador de”, “sofre de”, “vítima de”.</strong> Deficiência não é doença nem
          tragédia.
        </li>
        <li>
          <strong>Não use “normal”</strong> como oposto de deficiência. O oposto é “pessoa sem
          deficiência”.
        </li>
        <li>
          <strong>Sem metáfora capacitista:</strong> “cego para”, “surdo aos apelos”, “isso é
          loucura”.
        </li>
        <li>
          <strong>Sem “basta”, “é só”, “simples”, “rápido”.</strong> Quem travou na etapa lê essas
          palavras como acusação.
        </li>
        <li>
          <strong>Sem gíria, sem humor, sem regionalismo.</strong> O serviço é lido por todo o
          Estado.
        </li>
        <li>
          Não presuma família, renda, escolaridade nem acesso a impressora, carro ou internet
          rápida.
        </li>
      </ul>
      <TabelaPares
        legenda="Exemplos de reescrita para linguagem neutra e não capacitista"
        pares={PARES_LINGUAGEM}
      />

      <h2 id="nunca-escrever">O que nunca escrever</h2>
      <ul>
        <li>
          <strong>“Clique aqui”.</strong> O texto do link precisa dizer o destino, e nem todo mundo
          clica.
        </li>
        <li>
          <strong>“Usuário”.</strong> Em interface, fale “você”; em documentação, “a pessoa”.
        </li>
        <li>
          <strong>“Sistema indisponível” sem explicação.</strong> Diga o que parou, o que continua
          funcionando e quando volta.
        </li>
        <li>
          <strong>“Ocorreu um erro inesperado”.</strong> Todo erro é inesperado para quem o recebe.
        </li>
        <li>
          <strong>“Ops!”, emoji e ponto de exclamação em erro.</strong> O tom animado diante de um
          problema soa como deboche.
        </li>
        <li>
          <strong>Código de erro na tela.</strong> “Erro 500” é informação de registro técnico, não
          de interface.
        </li>
        <li>
          <strong>Jargão de tecnologia:</strong> token, payload, timeout, cache, back-end.
        </li>
        <li>
          <strong>Juridiquês:</strong> outrossim, requerente, pleito, deferimento, indeferimento,
          protocolizar, supracitado, “nos termos do artigo”.
        </li>
        <li>
          <strong>Frases em caixa alta</strong> e pontos de exclamação repetidos.
        </li>
        <li>
          <strong>Marketing:</strong> “a melhor experiência”, “inovador”, “moderno”, “tudo na palma
          da mão”.
        </li>
        <li>
          <strong>“Em breve”, “o mais rápido possível”, “aguarde”.</strong> Sem prazo, não é
          informação.
        </li>
        <li>
          <strong>“Preencha os campos obrigatórios”</strong> sem dizer quais. Nomeie os campos e
          leve o foco até eles.
        </li>
      </ul>

      <h2 id="antes-e-depois">Antes e depois</h2>
      <p>
        A tabela reúne os casos mais frequentes em serviço público, com o motivo de cada mudança. Se
        houver dúvida entre duas formas de escrever, ela é o desempate.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Exemplos de antes e depois por lugar da interface, com a razão de cada mudança
          </caption>
          <thead>
            <tr>
              <th scope="col">Onde aparece</th>
              <th scope="col">Antes</th>
              <th scope="col">Depois</th>
              <th scope="col">Por quê</th>
            </tr>
          </thead>
          <tbody>
            {ANTES_E_DEPOIS.map((linha) => (
              <tr key={linha.antes}>
                <th scope="row">{linha.onde}</th>
                <td>{linha.antes}</td>
                <td>{linha.depois}</td>
                <td>{linha.porque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Os números, datas, valores e documentos destes exemplos são ilustrativos: servem para
        mostrar o formato, não para descrever prazo, taxa ou dado de um serviço real.
      </p>

      <h2 id="textos-do-componente">Textos que já vêm no componente</h2>
      <p>
        Parte do texto da interface não é escrita pelo produto: já vem pronta no código, como valor
        padrão de uma prop. A tabela reúne textos padrão encontrados entre os {componentes.length}{' '}
        componentes do sistema. Antes de escrever, confira o que já existe — e, se precisar mudar,
        mude pela prop, nunca por CSS nem por um texto solto ao lado.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Textos padrão dos componentes, com o componente e a prop que os define
          </caption>
          <thead>
            <tr>
              <th scope="col">Componente</th>
              <th scope="col">Prop</th>
              <th scope="col">Texto padrão</th>
            </tr>
          </thead>
          <tbody>
            {TEXTOS_PADRAO.map((item) => (
              <tr key={`${item.slug}-${item.prop}`}>
                <th scope="row">
                  <Link href={`/componentes/${item.slug}`}>{item.componente}</Link>
                </th>
                <td>
                  <code>{item.prop}</code>
                </td>
                <td>{item.texto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> parte dos textos padrão está no código sem acentuação —{' '}
        <code>Dispensar notificacao</code> no Toast, <code>Inicio</code> no Breadcrumb,{' '}
        <code>Primeira pagina</code> na Pagination, <code>Linhas por pagina</code> na DataTable,{' '}
        <code>Proximo card</code> no Carousel e <code>Governo do Estado de Sao Paulo</code> no
        Footer. Vários deles são rótulos acessíveis, lidos em voz alta por leitor de tela. A
        correção é na origem; enquanto não acontece, passe o texto acentuado pela prop. Registrado
        em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o título padrão do{' '}
        <Link href="/componentes/cookie-consent-banner">CookieConsentBanner</Link> —{' '}
        “Estamos usando cookies para melhorar sua experiência!” — tem tom promocional e ponto de
        exclamação, o que contraria as regras desta página. Falta a decisão editorial sobre o texto
        definitivo — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="do-e-dont">Do &amp; don&apos;t</h2>
      <div className="wiki-dodont">
        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Botão “Agendar atendimento” na tela cujo título é “Agendar atendimento”.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Título “Agendamento de atendimento presencial” e botão “Prosseguir”.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Quando o verbo do botão repete o verbo do título, a pessoa reconhece que está concluindo
            o que começou. Verbos diferentes para a mesma ação criam a suspeita de que o botão faz
            outra coisa.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Rótulo “Data de nascimento” com apoio “Use o formato DD/MM/AAAA”.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Campo com o placeholder “Digite sua data de nascimento (dd/mm/aaaa)” e nenhum rótulo.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            O placeholder desaparece no primeiro caractere. A partir daí a pessoa perde a
            referência, e a tela de revisão vira uma coluna de valores sem nome.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>“A análise leva até 30 dias corridos, contados a partir do envio.”</p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              “O deferimento do pleito dar-se-á no prazo de até 30 (trinta) dias, contados da data
              da protocolização.”
            </p>
          </div>
          <p className="wiki-dodont__porque">
            A segunda frase é juridicamente idêntica e praticamente inútil: exige vocabulário de
            repartição para responder a uma pergunta simples — quando fica pronto.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              Escrever “solicitação” na tela inteira: no título, no botão, na confirmação e no
              e-mail.
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>
              Alternar entre “solicitação”, “pedido”, “requerimento” e “processo” para variar o
              texto.
            </p>
          </div>
          <p className="wiki-dodont__porque">
            Sinônimo é qualidade em redação e defeito em interface: a pessoa passa a procurar a
            diferença entre as palavras e conclui que existem quatro coisas diferentes.
          </p>
        </div>

        <div className="wiki-dodont__par">
          <div className="wiki-dodont__lado wiki-dodont__lado--faca">
            <p className="wiki-dodont__rotulo">Faça</p>
            <p>
              “Pedido enviado. Guarde o número do protocolo: é com ele que você acompanha a
              análise.”
            </p>
          </div>
          <div className="wiki-dodont__lado wiki-dodont__lado--nao">
            <p className="wiki-dodont__rotulo">Não faça</p>
            <p>“Sua solicitação foi processada com sucesso pelo sistema!”</p>
          </div>
          <p className="wiki-dodont__porque">
            A segunda frase é sobre o sistema, não sobre a pessoa: não diz o que ela leva dali, nem
            o que fazer em seguida. Sem o número do protocolo, ela não tem prova de nada.
          </p>
        </div>
      </div>

      <h2 id="revisao">Como revisar um texto antes de publicar</h2>
      <ol>
        <li>Leia em voz alta. Se você tropeça, quem lê no celular também tropeça.</li>
        <li>Cubra o resto da tela e leia só o botão. Dá para saber o que vai acontecer?</li>
        <li>Procure “usuário”, “clique aqui”, “Ops” e “em breve”. Reescreva cada ocorrência.</li>
        <li>Confira se a mesma coisa tem o mesmo nome na tela toda, no e-mail e no comprovante.</li>
        <li>Confira datas, horas, valores e documentos contra a seção de formatos desta página.</li>
        <li>Confira maiúsculas: só a primeira letra, mais nomes próprios e siglas.</li>
        <li>Force um erro no formulário e leia a mensagem. Ela diz o que fazer agora?</li>
        <li>Amplie a página em 200%. Nenhum título ou rótulo pode ser cortado.</li>
        <li>
          Percorra a tela com o leitor de tela e ouça os rótulos: eles fazem sentido fora da ordem
          visual?
        </li>
        <li>
          Pergunte a alguém que não trabalhou no serviço o que a tela pede. Se precisar explicar, o
          texto ainda não está pronto.
        </li>
      </ol>

      <h2 id="pendencias">Pendências desta página</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe guia de escrita oficial do Sampa Design System. O
        item 8 de <code>LACUNAS.md</code> registra que o guia de conteúdo e escrita por componente
        “não existe em nenhuma fonte” — nem no Figma, nem no Storybook — e atribui a lacuna ao time
        de conteúdo e UX writing. Tudo nesta página é proposta e precisa ser validada antes de virar
        norma.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não há verificação automática de texto. Nada impede hoje que
        um produto publique “clique aqui”, “usuário” ou uma data em formato diferente — fonte: time.
        Enquanto não existir, a revisão é manual, pela lista da seção{' '}
        <a href="#revisao">Como revisar um texto antes de publicar</a>. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
      <p>
        As decisões de vocabulário — qual palavra usar para cada coisa — estão em{' '}
        <Link href="/conteudo/vocabulario">Vocabulário</Link>. As regras de mensagem de erro
        aplicadas a cada componente estão em{' '}
        <Link href="/padroes/feedback-e-erros">Feedback e erros</Link>, e as de campo e validação em{' '}
        <Link href="/padroes/formularios">Formulários</Link>.
      </p>
    </div>
  );
}
