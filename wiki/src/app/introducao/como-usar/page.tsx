import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { listarComponentes, listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Como usar',
  description:
    'Uma trilha por perfil — designer, pessoa desenvolvedora, produto, conteúdo e fornecedor contratado: por onde começar, quais páginas importam, qual ferramenta usar e qual é o primeiro entregável.',
};

interface PaginaChave {
  titulo: string;
  href: string;
  descricao: string;
}

interface Perfil {
  id: string;
  titulo: string;
  quem: string;
  comecar: string[];
  ferramenta: string;
  entregavel: string;
  paginas: PaginaChave[];
}

const PERFIS: Perfil[] = [
  {
    id: 'designer',
    titulo: 'Designer',
    quem: 'Quem desenha as telas: fluxo, layout, estados e comportamento visual.',
    comecar: [
      'Leia Design tokens antes de qualquer outra página. Ele explica por que existem quatro camadas de decisão e qual delas você usa ao montar uma tela.',
      'Abra as duas bibliotecas do Figma e confirme que elas estão habilitadas no seu arquivo: Foundations (variables e estilos) e Web Components (componentes).',
      'Percorra o catálogo de componentes antes de desenhar. A pergunta certa não é “como eu desenho isso”, e sim “o que já existe para isso”.',
    ],
    ferramenta:
      'Figma, com as bibliotecas Foundations e Web Components habilitadas. Nada é desenhado fora delas.',
    entregavel:
      'Uma tela montada só com componentes da biblioteca e variables aplicadas — nenhuma cor, medida ou raio digitado à mão. Se faltou peça, a falta vira registro antes de virar desenho novo.',
    paginas: [
      {
        titulo: 'Fluxo de criação',
        href: '/introducao/fluxo-de-criacao',
        descricao: 'Do problema ao componente aprovado — a trilha completa do design.',
      },
      {
        titulo: 'Design tokens',
        href: '/fundamentos/tokens',
        descricao: 'As quatro camadas, a cadeia de alias e a regra de qual usar em cada situação.',
      },
      {
        titulo: 'Cor',
        href: '/fundamentos/cor',
        descricao: 'A paleta com a matriz de contraste calculada e as duas cores de marca.',
      },
      {
        titulo: 'Tipografia',
        href: '/fundamentos/tipografia',
        descricao: 'Plus Jakarta Sans: escala, pesos e altura de linha.',
      },
      {
        titulo: 'Catálogo de componentes',
        href: '/componentes/visao-geral',
        descricao: 'O que já existe, com anatomia, estados e par no Figma.',
      },
      {
        titulo: 'Padrões',
        href: '/padroes/visao-geral',
        descricao: 'Como resolver situações recorrentes: formulário, busca, filtro, erro.',
      },
    ],
  },
  {
    id: 'desenvolvimento',
    titulo: 'Pessoa desenvolvedora',
    quem: 'Quem implementa a tela em React e responde pelo que roda no navegador.',
    comecar: [
      'Instale o pacote e importe os estilos uma única vez na raiz da aplicação. A página de Instalação traz o caminho definitivo e o contorno que funciona hoje.',
      'Abra o Storybook publicado antes de escrever código. É lá que está o comportamento real do componente, com controles e verificação de acessibilidade.',
      'Leia a página do componente que você vai usar. Ela lista props, estados, tokens consumidos e se existe teste axe.',
    ],
    ferramenta:
      'O pacote @government/design-system no projeto e o Storybook publicado como referência de comportamento.',
    entregavel:
      'Uma tela em que nenhum valor visual está escrito à mão: toda cor, medida e raio vem de var(--ds-*), e todo controle vem de um componente do catálogo.',
    paginas: [
      {
        titulo: 'Fluxo de desenvolvimento',
        href: '/introducao/fluxo-de-desenvolvimento',
        descricao: 'Instalar, importar, usar, verificar, testar e revisar.',
      },
      {
        titulo: 'Instalação',
        href: '/recursos/instalacao',
        descricao: 'Pacote, tokens, fonte, configuração por framework e tamanho da distribuição.',
      },
      {
        titulo: 'Catálogo de componentes',
        href: '/componentes/visao-geral',
        descricao: 'API, estados, tokens e exemplos de cada componente.',
      },
      {
        titulo: 'Design tokens',
        href: '/fundamentos/tokens',
        descricao: 'Nomenclatura, camadas e o que você pode ou não sobrescrever.',
      },
      {
        titulo: 'Acessibilidade',
        href: '/fundamentos/acessibilidade',
        descricao: 'Foco, teclado, semântica e o checklist antes de publicar uma tela.',
      },
      {
        titulo: 'Downloads',
        href: '/recursos/downloads',
        descricao: 'Tokens em JSON e CSS para consumo fora do React.',
      },
    ],
  },
  {
    id: 'produto',
    titulo: 'Produto',
    quem: 'Quem define o que o serviço faz, prioriza o backlog e aceita a entrega.',
    comecar: [
      'Entenda a diferença entre componente, padrão e template. Ela muda o tamanho da conversa: pedir um componente novo é caro; usar um padrão existente é barato.',
      'Trate o design system como restrição de escopo, não como enfeite. Uma tela fora do sistema custa mais para manter e envelhece sozinha.',
      'Coloque acessibilidade no critério de aceite, não na lista de melhorias futuras.',
    ],
    ferramenta:
      'Nenhuma ferramenta nova. O sistema entra no seu trabalho como critério de aceite e como vocabulário comum entre design, desenvolvimento e conteúdo.',
    entregavel:
      'Um critério de aceite escrito na história: a tela usa componentes do Sampa Design System e passa no checklist de acessibilidade. Sem isso, a conformidade vira opinião no fim da sprint.',
    paginas: [
      {
        titulo: 'Sobre o Sampa DS',
        href: '/introducao/sobre',
        descricao: 'O que é o sistema, o que ele cobre e o que ele não cobre.',
      },
      {
        titulo: 'Premissas e objetivos',
        href: '/introducao/premissas-e-objetivos',
        descricao: 'O que o sistema se propõe a resolver e sob quais condições.',
      },
      {
        titulo: 'Padrões',
        href: '/padroes/visao-geral',
        descricao: 'As situações já resolvidas — use antes de pedir tela nova.',
      },
      {
        titulo: 'Acessibilidade',
        href: '/fundamentos/acessibilidade',
        descricao: 'O que precisa estar no critério de aceite de toda entrega.',
      },
      {
        titulo: 'Governança',
        href: '/introducao/governanca',
        descricao: 'Quem decide o quê, e o que ainda não tem dono definido.',
      },
    ],
  },
  {
    id: 'conteudo',
    titulo: 'Conteúdo',
    quem: 'Quem escreve o texto que aparece na tela: rótulo de botão, mensagem de erro, título, ajuda.',
    comecar: [
      'Escreva o texto junto com a tela, não depois. Rótulo e mensagem definem o tamanho do componente e o número de etapas do fluxo.',
      'Comece pelos textos que mais custam à pessoa quando estão errados: mensagem de erro, estado vazio e rótulo de campo obrigatório.',
      'Use o vocabulário do serviço público, não o do sistema interno. Quem lê não sabe o que é “protocolo indeferido por inconsistência cadastral”.',
    ],
    ferramenta:
      'O próprio arquivo do Figma, comentando sobre a tela, e esta Wiki. O texto é parte do design, não uma camada aplicada no fim.',
    entregavel:
      'A lista de textos da tela revisada e aprovada antes do handoff: rótulos, mensagens de erro, estado vazio, confirmação e texto de botão. Cada botão diz o que acontece ao ser acionado.',
    paginas: [
      {
        titulo: 'Padrões de escrita',
        href: '/conteudo/writing',
        descricao: 'Tom, pessoa, tempo verbal e tamanho de frase.',
      },
      {
        titulo: 'Vocabulário',
        href: '/conteudo/vocabulario',
        descricao: 'Os termos que o sistema usa e os que ele evita.',
      },
      {
        titulo: 'Feedback e erros',
        href: '/padroes/feedback-e-erros',
        descricao: 'Dizer o que aconteceu, onde aconteceu e o que fazer agora.',
      },
      {
        titulo: 'Estados vazios',
        href: '/padroes/estados-vazios',
        descricao: 'Separar “ainda não há nada”, “não encontramos” e “deu erro”.',
      },
      {
        titulo: 'Formulários',
        href: '/padroes/formularios',
        descricao: 'Rótulo, texto de apoio, validação e mensagem de erro.',
      },
    ],
  },
  {
    id: 'fornecedor',
    titulo: 'Fornecedor contratado',
    quem: 'Empresa ou pessoa contratada para entregar um serviço digital do Estado.',
    comecar: [
      'O repositório é público e tem licença MIT: você não precisa de acesso liberado para começar a avaliar o sistema.',
      'Leia esta página inteira e depois a de Instalação. Elas dizem o que existe hoje de fato — não o que está planejado.',
      'Antes de propor qualquer componente novo, mostre que o problema não é resolvido pelo catálogo atual. Componente novo é dívida de manutenção que fica com o Estado depois que o contrato termina.',
    ],
    ferramenta:
      'O pacote instalado no projeto, o Storybook publicado para verificação e o repositório público para abrir issue.',
    entregavel:
      'Uma primeira tela auditável: dá para apontar, elemento por elemento, de qual componente e de qual token cada coisa veio. Toda divergência em relação ao sistema é declarada, não escondida.',
    paginas: [
      {
        titulo: 'Sobre o Sampa DS',
        href: '/introducao/sobre',
        descricao: 'O escopo do sistema e o que ele não promete.',
      },
      {
        titulo: 'Instalação',
        href: '/recursos/instalacao',
        descricao: 'Requisitos, pacote, tokens e o caminho enquanto o npm não publica.',
      },
      {
        titulo: 'Catálogo de componentes',
        href: '/componentes/visao-geral',
        descricao: 'O que está pronto para usar — e o que não está.',
      },
      {
        titulo: 'Acessibilidade',
        href: '/fundamentos/acessibilidade',
        descricao: 'O piso da entrega. Barreira de acesso não é bug de baixa prioridade.',
      },
      {
        titulo: 'Contribua',
        href: '/introducao/contribua',
        descricao: 'Como devolver ao sistema o que você construiu por fora dele.',
      },
      {
        titulo: 'Suporte',
        href: '/recursos/suporte',
        descricao: 'Onde levar defeito, divergência e proposta.',
      },
    ],
  },
];

export default function PaginaComoUsar() {
  const componentes = listarComponentes();
  const tokens = listarTokens();
  const exemplos = componentes.reduce((total, c) => total + c.stories.length, 0);

  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Introdução', href: '/introducao/sobre' }, { titulo: 'Como usar' }]} />

      <h1>Como usar</h1>
      <p className="wiki-prosa__resumo">
        O Sampa Design System serve a cinco perfis de trabalho, e cada um entra por uma porta
        diferente. Esta página é o mapa: por onde começar, quais páginas importam, qual ferramenta
        usar e qual é o primeiro entregável que prova que o sistema foi realmente adotado. Escolha o
        seu perfil e siga a trilha.
      </p>

      <div className="wiki-numeros">
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{componentes.length}</span>
          <span className="wiki-numero__rotulo">componentes prontos para usar</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{tokens.length.toLocaleString('pt-BR')}</span>
          <span className="wiki-numero__rotulo">tokens publicados</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{exemplos}</span>
          <span className="wiki-numero__rotulo">exemplos no Storybook</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">2.193</span>
          <span className="wiki-numero__rotulo">ícones na biblioteca</span>
        </div>
      </div>

      <h2 id="tres-fontes">As três fontes, e o que perguntar a cada uma</h2>
      <p>
        Antes da trilha, uma orientação que vale para os cinco perfis. O sistema vive em três
        lugares, e cada um responde a uma pergunta diferente. Perguntar no lugar errado é a origem
        mais comum de divergência entre o que foi desenhado e o que foi publicado.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            As três fontes do sistema e a pergunta que cada uma responde
          </caption>
          <thead>
            <tr>
              <th scope="col">Fonte</th>
              <th scope="col">Pergunta que ela responde</th>
              <th scope="col">O que ela não responde</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Esta Wiki</strong>
              </td>
              <td>Por que a decisão é essa, quando usar e quando não usar.</td>
              <td>O comportamento exato do componente em tela.</td>
            </tr>
            <tr>
              <td>
                <strong>Figma</strong>
              </td>
              <td>Como o componente é desenhado e quais variantes existem no design.</td>
              <td>O que de fato foi implementado — nem tudo que está no Figma existe em código.</td>
            </tr>
            <tr>
              <td>
                <strong>Storybook</strong>
              </td>
              <td>Como o componente se comporta de verdade: props, estados, teclado, foco.</td>
              <td>Se aquele é o componente certo para o seu problema.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="wiki-cartoes">
        <a
          className="wiki-cartao"
          href="https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Biblioteca Web Components ↗</span>
          <span className="wiki-cartao__descricao">
            58 componentes publicados no Figma: 36 de catálogo e 22 partes internas.
          </span>
        </a>
        <a
          className="wiki-cartao"
          href="https://www.figma.com/design/3IPhcwjiNpG6PXVmdG2x3x/Foundations"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Biblioteca Foundations ↗</span>
          <span className="wiki-cartao__descricao">
            As variables de cor, tipografia, espaçamento, raio e borda que alimentam tudo.
          </span>
        </a>
        <a
          className="wiki-cartao"
          href="https://sggdds.vercel.app"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Storybook publicado ↗</span>
          <span className="wiki-cartao__descricao">
            Os {componentes.length} componentes React rodando, com {exemplos} exemplos interativos.
          </span>
        </a>
      </div>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Quando as três fontes divergem, o código vence</p>
        <p>
          Esta documentação extrai do código o conteúdo técnico de cada componente — props, estados,
          tokens consumidos, testes. Se o Figma mostra uma variante que o Storybook não tem, a
          variante não existe para quem está construindo hoje. Divergência não é licença para
          improvisar: é motivo para abrir registro em <Link href="/recursos/suporte">Suporte</Link>.
        </p>
      </div>

      <h2 id="resumo-por-perfil">Resumo por perfil</h2>
      <p>
        A tabela abaixo é o mapa em uma tela. Cada linha é detalhada na seção correspondente, logo
        em seguida.
      </p>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Parte das páginas citadas ainda está sendo escrita</p>
        <p>
          A barra lateral lista o índice completo previsto para esta Wiki, e nem todas as páginas
          existem hoje — alguns links das trilhas abaixo ainda não abrem. O conteúdo em falta está
          sendo produzido; o índice não muda.
        </p>
      </div>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">
            Ferramenta e primeiro entregável de cada perfil
          </caption>
          <thead>
            <tr>
              <th scope="col">Perfil</th>
              <th scope="col">Ferramenta</th>
              <th scope="col">Primeiro entregável</th>
            </tr>
          </thead>
          <tbody>
            {PERFIS.map((perfil) => (
              <tr key={perfil.id}>
                <td>
                  <a href={`#${perfil.id}`}>
                    <strong>{perfil.titulo}</strong>
                  </a>
                </td>
                <td>{perfil.ferramenta}</td>
                <td>{perfil.entregavel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {PERFIS.map((perfil) => (
        <section key={perfil.id}>
          <h2 id={perfil.id}>{perfil.titulo}</h2>
          <p>{perfil.quem}</p>

          <h3 id={`${perfil.id}-comecar`}>Por onde começar</h3>
          <ol>
            {perfil.comecar.map((passo) => (
              <li key={passo}>{passo}</li>
            ))}
          </ol>

          <h3 id={`${perfil.id}-ferramenta`}>Qual ferramenta usar</h3>
          <p>{perfil.ferramenta}</p>

          <h3 id={`${perfil.id}-entregavel`}>Primeiro entregável</h3>
          <p>{perfil.entregavel}</p>

          <h3 id={`${perfil.id}-paginas`}>Páginas que importam</h3>
          <div className="wiki-cartoes">
            {perfil.paginas.map((pagina) => (
              <Link className="wiki-cartao" href={pagina.href} key={pagina.href}>
                <span className="wiki-cartao__titulo">{pagina.titulo}</span>
                <span className="wiki-cartao__descricao">{pagina.descricao}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <h2 id="regras-comuns">O que vale para todos os perfis</h2>
      <ul>
        <li>
          <strong>Não invente valor.</strong> Cor, medida, raio, peso e duração vêm de token. Se o
          token que você precisa não existe, isso é sinal de decisão faltando no sistema — não de
          permissão para digitar um número.
        </li>
        <li>
          <strong>Procure antes de criar.</strong> São {componentes.length} componentes e{' '}
          {tokens.length.toLocaleString('pt-BR')} tokens. A chance de o seu problema já ter solução é
          alta, e o custo de uma peça duplicada é permanente.
        </li>
        <li>
          <strong>Acessibilidade é requisito, não etapa final.</strong> Serviço público não escolhe
          quem atende. Teclado, foco visível, contraste e rótulo entram desde o primeiro rascunho.
        </li>
        <li>
          <strong>Escreva para a pessoa que usa o serviço.</strong> Ela está com pressa, no celular,
          e não conhece o vocabulário interno do órgão.
        </li>
        <li>
          <strong>Divergência se registra, não se contorna.</strong> Se o sistema não resolve o seu
          caso, a informação mais útil que você produz naquele dia é o registro dessa lacuna.
        </li>
      </ul>

      <h2 id="proximo-passo">Próximo passo</h2>
      <div className="wiki-cartoes">
        <Link className="wiki-cartao" href="/introducao/fluxo-de-criacao">
          <span className="wiki-cartao__titulo">Fluxo de criação</span>
          <span className="wiki-cartao__descricao">
            A trilha do design: do problema ao componente aprovado.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/introducao/fluxo-de-desenvolvimento">
          <span className="wiki-cartao__titulo">Fluxo de desenvolvimento</span>
          <span className="wiki-cartao__descricao">
            A trilha do código: instalar, usar, verificar, testar e revisar.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/fundamentos/visao-geral">
          <span className="wiki-cartao__titulo">Fundamentos</span>
          <span className="wiki-cartao__descricao">
            As decisões que sustentam tudo: token, cor, tipografia, espaçamento e acessibilidade.
          </span>
        </Link>
      </div>

      <h2 id="pendencias">Pendências</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe processo de integração documentado para nenhum dos
        cinco perfis — nem pessoa responsável por receber quem chega, nem canal de dúvida, nem
        material de apresentação do sistema — fonte: time. As trilhas acima são a proposta desta
        documentação, construída a partir do que o sistema oferece hoje, e não uma norma aprovada.
        Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não há definição de qual é o compromisso de uso do sistema em
        contrato com fornecedor — se adotar o Sampa Design System é obrigatório, recomendado ou
        opcional em contratações do Estado — fonte: time / jurídico. Sem isso, o perfil de fornecedor
        não tem base contratual para exigir prazo ou escopo compatível. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
