import type { Metadata } from 'next';
import Link from 'next/link';

import { Rascunho, Tabela } from '@/components/Blocos';
import { Trilha } from '@/components/Trilha';
import { listarComponentes, listarParesFigma, listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Premissas e objetivos',
  description:
    'O que o Sampa Design System assume como verdade para existir, o que ele busca alcançar, como isso é medido e o que ele explicitamente não tenta resolver.',
};

interface Premissa {
  id: string;
  titulo: string;
  afirmacao: string;
  obriga: string[];
  seCair: string;
}

const PREMISSAS: Premissa[] = [
  {
    id: 'nao-escolheu',
    titulo: 'Quem usa um serviço do Estado não escolheu usá-lo',
    afirmacao:
      'A pessoa não está ali por interesse, curiosidade ou lazer. Está resolvendo uma obrigação, buscando um direito ou tentando não perder um prazo. Muitas vezes chega cansada, com pressa e depois de já ter tentado por outro caminho.',
    obriga: [
      'A interface não pode cobrar aprendizado: precisa funcionar na primeira visita.',
      'Nada de recurso que dependa de descoberta, exploração ou tutorial.',
      'Erro precisa dizer o que fazer, não apenas o que está errado.',
    ],
    seCair:
      'Se o público fosse voluntário e recorrente, seria aceitável investir em recursos avançados e curva de aprendizado. Não é o caso: quase toda pessoa é visitante de primeira vez.',
  },
  {
    id: 'para-todas',
    titulo: 'O serviço é para todas as pessoas, sem exceção',
    afirmacao:
      'O Estado não escolhe quem atende. Isso inclui quem tem deficiência visual, motora, auditiva ou cognitiva, quem tem baixa familiaridade digital, quem usa aparelho antigo e quem está em conexão instável.',
    obriga: [
      'Acessibilidade entra como requisito do componente, não como ajuste posterior da tela.',
      'Nenhuma informação pode ser transmitida apenas por cor, apenas por posição ou apenas por movimento.',
      'Toda interação precisa funcionar por teclado e ser anunciada por leitor de tela.',
    ],
    seCair:
      'Não cai. É a premissa que dá sentido às outras: um serviço público que funciona só para parte das pessoas não cumpriu sua função, mesmo que a maioria consiga usar.',
  },
  {
    id: 'consistencia',
    titulo: 'Consistência custa menos do que originalidade',
    afirmacao:
      'Repetir a mesma solução entre serviços reduz custo duas vezes: a pessoa reaproveita o que já aprendeu em outro serviço do Estado, e as equipes reaproveitam o que já foi construído, testado e auditado.',
    obriga: [
      'Um componente novo só entra quando nenhum existente resolve — e o ônus da prova é de quem propõe.',
      'Variação sem motivo é defeito, não personalização.',
      'A semelhança entre serviços é resultado desejado, não falta de identidade.',
    ],
    seCair:
      'Se cada serviço tivesse público, contexto e vocabulário radicalmente distintos, um sistema comum atrapalharia mais do que ajudaria. Os serviços do Estado compartilham público e tarefas o suficiente para que isso não se sustente.',
  },
  {
    id: 'codigo-verdade',
    titulo: 'O código é a fonte de verdade do comportamento',
    afirmacao:
      'O Figma define a forma; o comportamento real — estados, foco, teclado, resposta a erro, adaptação de tela — só existe de fato no componente implementado. Uma tela do Figma não prova que algo funciona.',
    obriga: [
      'A documentação de API, estados e acessibilidade é extraída do código, não redigida à mão.',
      'Divergência entre Figma e código aparece nas duas versões, nunca é harmonizada em silêncio.',
      'Antes de aprovar um comportamento, verifique no Storybook, não na tela estática.',
    ],
    seCair:
      'Se a documentação fosse escrita manualmente a partir do Figma, ela passaria a descrever uma intenção — e a distância entre intenção e implementação cresce a cada release.',
  },
  {
    id: 'token',
    titulo: 'Decisão sem nome não se propaga',
    afirmacao:
      'Um valor escrito à mão resolve uma tela e some. Um valor com nome — um token — pode ser encontrado, auditado, trocado em um lugar só e propagado para todo mundo.',
    obriga: [
      'Os tokens publicados são a única origem de cor, medida, raio, borda e tipografia.',
      'Quando o token de que você precisa não existe, isso é sinal de decisão faltando — não autorização para inventar valor.',
      'A lacuna vira registro em LACUNAS.md e pedido de decisão, não contorno local.',
    ],
    seCair:
      'Sem essa premissa, trocar a identidade visual do Estado voltaria a ser uma caçada por valores literais espalhados em vários repositórios de vários fornecedores.',
  },
  {
    id: 'fora-da-sala',
    titulo: 'Quem constrói a maior parte das telas está fora da sala de decisão',
    afirmacao:
      'Boa parte dos serviços é entregue por equipes contratadas, com prazo curto, rotatividade e nenhum acesso ao histórico das decisões do sistema.',
    obriga: [
      'A documentação precisa ser autossuficiente: quem chega hoje entende sem participar de reunião.',
      'Cada página declara a origem do dado e o que ainda não foi decidido.',
      'O caminho recomendado precisa ser também o caminho mais rápido, ou não será seguido.',
    ],
    seCair:
      'Se todo o desenvolvimento fosse interno e estável, parte do rigor documental poderia ser substituída por conversa. Não é o cenário.',
  },
  {
    id: 'verificavel',
    titulo: 'Documentação que não é verificável envelhece e passa a mentir',
    afirmacao:
      'Documentação escrita à mão descola do sistema em semanas. A partir daí ela é pior do que a ausência de documentação, porque a pessoa confia e erra.',
    obriga: [
      'Número, nome de token, prop e estado saem de dados extraídos do repositório e da biblioteca do Figma.',
      'Dado que não existe vira bloco PENDENTE visível, nunca uma frase plausível.',
      'Conteúdo editorial que ainda não foi validado pelo time fica marcado como rascunho.',
    ],
    seCair:
      'Sem verificação automática, a única forma de manter a documentação honesta seria revisão manual periódica — que nunca sobrevive à primeira entrega urgente.',
  },
  {
    id: 'caminho-facil',
    titulo: 'Um sistema só é adotado se for o caminho mais fácil',
    afirmacao:
      'Adoção não se obtém por circular interna. Se usar o sistema custar mais tempo do que reescrever do zero, ele será contornado — e o contorno vira o padrão de fato.',
    obriga: [
      'Instalar, importar tokens e renderizar o primeiro componente precisa ser trivial.',
      'A documentação responde antes que a pessoa precise perguntar.',
      'O sistema assume o custo da compatibilidade para que as equipes não assumam o custo da migração.',
    ],
    seCair:
      'Se a adoção fosse garantida por obrigação contratual, o sistema poderia ser mais rígido e menos conveniente. Obrigação sem conveniência produz cumprimento aparente, não adoção.',
  },
];

interface NaoObjetivo {
  titulo: string;
  porque: string;
  onde: string;
}

const NAO_OBJETIVOS: NaoObjetivo[] = [
  {
    titulo: 'Não é um site pronto nem um tema instalável',
    porque:
      'O sistema entrega peças e regras de combinação. Montar a jornada de um serviço específico continua sendo trabalho de projeto.',
    onde: 'Equipe do serviço, com apoio dos padrões e templates desta Wiki.',
  },
  {
    titulo: 'Não define a arquitetura de informação de cada serviço',
    porque:
      'Menu, hierarquia de páginas, nomes de seção e ordem das etapas dependem do serviço e das pessoas que o procuram.',
    onde: 'Pesquisa e design de cada produto.',
  },
  {
    titulo: 'Não substitui pesquisa com pessoas',
    porque:
      'Componente consistente não garante serviço compreensível. O sistema não sabe se a pergunta do formulário faz sentido para quem responde.',
    onde: 'Time de produto e pesquisa do serviço.',
  },
  {
    titulo: 'Não impõe uma stack de front-end',
    porque:
      'A implementação de referência é React, mas os tokens são publicados como variáveis CSS e podem ser consumidos por qualquer tecnologia.',
    onde: 'Decisão técnica de cada projeto, respeitando os tokens.',
  },
  {
    titulo: 'Não cobre back-end, integração ou regra de negócio',
    porque:
      'O sistema entrega interface. API, autenticação, prazo de análise e fluxo administrativo estão fora do seu alcance.',
    onde: 'Arquitetura e times de plataforma.',
  },
  {
    titulo: 'Não resolve marca institucional fora da interface',
    porque:
      'Peça publicitária, impresso, sinalização e redes sociais têm requisitos próprios e vivem em manual de marca separado.',
    onde: 'Comunicação institucional.',
  },
  {
    titulo: 'Não fornece ilustração, fotografia ou animação de campanha',
    porque:
      'Não existe biblioteca de ilustração publicada no sistema. Ícones sim; imagem editorial, não.',
    onde: 'Comunicação de cada órgão.',
  },
  {
    titulo: 'Não busca originalidade visual',
    porque:
      'Interface de serviço público não compete por atenção. Uma solução reconhecível vale mais do que uma solução inédita.',
    onde: 'Não se aplica: é uma escolha deliberada do sistema.',
  },
  {
    titulo: 'Não substitui avaliação jurídica de acessibilidade',
    porque:
      'Usar os componentes reduz muito o risco, mas conformidade legal se afere na tela publicada, não na biblioteca.',
    onde: 'Avaliação formal do órgão responsável pelo serviço.',
  },
  {
    titulo: 'Não migra automaticamente o que foi feito nas bibliotecas SP legadas',
    porque:
      'Existem duas bibliotecas anteriores em uso paralelo. Substituí-las exige decisão e plano — não acontece por consequência de publicar este sistema.',
    onde: 'Decisão pendente do time (ver abaixo).',
  },
];

export default function PaginaPremissasEObjetivos() {
  const componentes = listarComponentes();
  const tokens = listarTokens();
  const pares = listarParesFigma();

  const comAxe = componentes.filter((c) => c.tests.a11yFile !== null).length;
  const percentualAxe = Math.round((comAxe / componentes.length) * 100);
  const paresExatos = pares.filter((p) => p.confianca === 'exata').length;

  const objetivos: { objetivo: string; porque: string; medida: string; hoje: string }[] = [
    {
      objetivo: 'Cobrir o repertório que os serviços realmente repetem',
      porque:
        'O sistema só evita retrabalho se a peça de que a equipe precisa já existir no dia em que ela precisa.',
      medida: 'Componentes de catálogo do Figma com implementação em código.',
      hoje: `${pares.length} de 36 componentes de catálogo têm par em código.`,
    },
    {
      objetivo: 'Eliminar valor literal da interface',
      porque:
        'Enquanto existir cor ou medida escrita à mão, a identidade do Estado não pode ser ajustada de forma central.',
      medida: 'Ocorrências de cor, medida e fonte fora de token nos repositórios de serviço.',
      hoje: `${tokens.length.toLocaleString('pt-BR')} tokens publicados; não existe medição publicada de uso literal nos serviços.`,
    },
    {
      objetivo: 'Verificar acessibilidade automaticamente em todo componente',
      porque:
        'Verificação manual não escala e não sobrevive a prazo apertado. O que não é testado a cada mudança regride.',
      medida: 'Percentual de componentes com teste automatizado de acessibilidade no CI.',
      hoje: `${percentualAxe}% dos componentes.`,
    },
    {
      objetivo: 'Tornar o sistema instalável sem intervenção humana',
      porque: 'Um sistema que exige contato com alguém para ser usado não é adotado por fornecedor.',
      medida: 'Pacotes resolvíveis publicamente pelo gerenciador de dependências.',
      hoje: '@government/design-system e @government/tokens retornam 404 no npm.',
    },
    {
      objetivo: 'Tornar a mudança previsível',
      porque:
        'Quem constrói sobre o sistema precisa saber o que mudou, o que quebrou e o que vai sair de circulação.',
      medida: 'Versão publicada, changelog legível e política de depreciação declarada.',
      hoje: 'Nenhuma tag no repositório, nenhum CHANGELOG.md; Changesets configurado e nunca usado.',
    },
    {
      objetivo: 'Fechar a distância entre o que está desenhado e o que está implementado',
      porque:
        'Divergência silenciosa entre Figma e código faz o design ser aprovado com base em algo que não existe.',
      medida: 'Pares Figma ↔ código com correspondência exata verificada.',
      hoje: `${paresExatos} dos ${pares.length} pares são correspondência exata; os demais são prováveis ou incertos.`,
    },
    {
      objetivo: 'Manter a documentação verificável e honesta',
      porque:
        'Documentação plausível e errada custa mais caro do que documentação incompleta e assumida.',
      medida: 'Páginas com origem de dado declarada e lacunas registradas em LACUNAS.md.',
      hoje: 'Todas as páginas desta Wiki declaram origem; o conteúdo editorial ainda não validado aparece marcado como rascunho.',
    },
    {
      objetivo: 'Reduzir o tempo entre começar um serviço e ter a primeira tela em conformidade',
      porque: 'É a medida que interessa a quem contrata: menos tempo montando o básico.',
      medida: 'Não existe medição definida.',
      hoje: 'Sem linha de base. Ver pendência ao final desta página.',
    },
  ];

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Introdução', href: '/introducao/sobre' },
          { titulo: 'Premissas e objetivos' },
        ]}
      />

      <h1>Premissas e objetivos</h1>
      <p>
        <Rascunho />
      </p>
      <p className="wiki-prosa__resumo">
        Esta página declara o contrato do Sampa Design System: o que assumimos como verdade para ele
        fazer sentido, o que ele busca alcançar e o que ele decidiu não resolver. Sem isso, cada
        discussão de design vira disputa de preferência, e cada pedido novo parece igualmente
        legítimo.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Página inteira é rascunho para validação</p>
        <p>
          Nenhuma premissa, objetivo ou não-objetivo abaixo foi formalizado pelo time responsável.
          Este texto é uma proposta redigida a partir do sistema como ele existe hoje — código,
          bibliotecas do Figma e documentação encontrada no repositório. Serve para ser discutido,
          corrigido e aprovado, não para ser citado como decisão tomada. As metas numéricas são
          sugestões desta proposta; nenhuma meta oficial foi definida.
        </p>
      </div>

      <h2 id="como-ler">Como ler esta página</h2>
      <p>Os três blocos respondem a perguntas diferentes e não devem ser misturados.</p>
      <Tabela
        cabecalho={['Bloco', 'Responde a', 'Como se verifica']}
        legenda="Diferença entre premissa, objetivo e não-objetivo"
        linhas={[
          [
            <strong key="p">Premissa</strong>,
            'O que precisa ser verdade para o sistema fazer sentido.',
            'Não se mede: se deixar de valer, o sistema precisa ser repensado.',
          ],
          [
            <strong key="o">Objetivo</strong>,
            'O que o sistema busca alcançar.',
            'Mede-se. Cada objetivo abaixo traz a medida e onde ela está hoje.',
          ],
          [
            <strong key="n">Não-objetivo</strong>,
            'O que o sistema decidiu não resolver.',
            'Serve para recusar pedido sem discussão caso a caso, e para dizer onde a pessoa resolve aquilo.',
          ],
        ]}
      />

      <h2 id="premissas">Premissas</h2>
      <p>
        São {PREMISSAS.length}. Elas não são metas nem promessas: são as condições que sustentam
        tudo o que vem depois. Quando uma decisão de design gera discussão, quase sempre é porque as
        duas partes estão apoiadas em premissas diferentes.
      </p>

      {PREMISSAS.map((premissa, indice) => (
        <div key={premissa.id}>
          <h3 id={premissa.id}>
            P{indice + 1}. {premissa.titulo}
          </h3>
          <p>{premissa.afirmacao}</p>
          <p>
            <strong>O que isso obriga:</strong>
          </p>
          <ul>
            {premissa.obriga.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            <em>Se esta premissa não valesse:</em> {premissa.seCair}
          </p>
        </div>
      ))}

      <h2 id="objetivos">Objetivos</h2>
      <p>
        Cada objetivo vem com a medida que o torna verificável e com a situação real de hoje. A
        coluna &quot;onde estamos&quot; sai dos dados extraídos do repositório e das bibliotecas do
        Figma — ela envelhece junto com o sistema, não com o texto.
      </p>
      <Tabela
        cabecalho={['Objetivo', 'Por que importa', 'Como se mede', 'Onde estamos hoje']}
        legenda="Objetivos do Sampa Design System, com medida e linha de base"
        linhas={objetivos.map((o) => [
          <strong key={o.objetivo}>{o.objetivo}</strong>,
          o.porque,
          o.medida,
          o.hoje,
        ])}
      />
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Nenhuma meta numérica foi acordada</p>
        <p>
          As medidas acima existem; os alvos, não. Quanto de cobertura de acessibilidade é
          suficiente para publicar uma versão? Qual percentual de pares exatos entre Figma e código
          é aceitável? Enquanto o time não responder, esta página reporta a linha de base sem
          afirmar meta.
        </p>
      </div>

      <h2 id="nao-objetivos">Não-objetivos</h2>
      <p>
        Um sistema que aceita qualquer pedido perde a capacidade de manter o que já tem. Os itens
        abaixo são recusas deliberadas — e cada recusa indica onde aquilo se resolve, para que a
        conversa não termine em &quot;não é conosco&quot;.
      </p>
      <Tabela
        cabecalho={['Não-objetivo', 'Por quê', 'Onde isso se resolve']}
        legenda="Não-objetivos do Sampa Design System"
        linhas={NAO_OBJETIVOS.map((n) => [
          <strong key={n.titulo}>{n.titulo}</strong>,
          n.porque,
          n.onde,
        ])}
      />

      <h2 id="tensoes">Tensões conhecidas</h2>
      <p>
        Os objetivos não são todos compatíveis o tempo todo. Registrar as tensões evita que cada
        equipe resolva a mesma disputa por conta própria.
      </p>
      <Tabela
        cabecalho={['Tensão', 'Como esta proposta resolve']}
        legenda="Tensões entre objetivos do sistema"
        linhas={[
          [
            <strong key="t1">Cobrir mais × verificar melhor</strong>,
            `Componente novo sem teste de acessibilidade aumenta o catálogo e piora a média — hoje em ${percentualAxe}%. A proposta é priorizar verificação do que já existe antes de ampliar o catálogo.`,
          ],
          [
            <strong key="t2">Consistência × necessidade real de um serviço</strong>,
            'Quando o padrão não atende, a saída não é variar em silêncio: é registrar a lacuna e pedir a decisão. Variação local sem registro é dívida invisível.',
          ],
          [
            <strong key="t3">Estabilidade × correção de defeito</strong>,
            'Corrigir o vermelho de marca em textos melhora o contraste e muda telas em produção. Sem versão e changelog, essa correção não tem como ser comunicada — por isso o objetivo de previsibilidade vem antes.',
          ],
          [
            <strong key="t4">Fidelidade ao Figma × realidade do código</strong>,
            'Onde divergem, valem as duas regras: o código manda no comportamento, o Figma manda na forma. A divergência é publicada, nunca resolvida em silêncio.',
          ],
        ]}
      />

      <h2 id="para-sair-de-rascunho">O que falta para esta página deixar de ser rascunho</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> as premissas, os objetivos e os não-objetivos acima nunca foram
        formalizados. Falta a validação do time responsável pelo Design System, incluindo eventual
        remoção ou reescrita de qualquer item — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> nenhuma meta numérica foi definida — nem para cobertura de
        acessibilidade, nem para paridade entre Figma e código, nem para adoção. Também não existe
        indicador de adoção medido: não se sabe quantos serviços do Estado consomem o sistema hoje —
        fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o objetivo de reduzir o tempo até a primeira tela em
        conformidade não tem definição de medida nem linha de base. Sem instrumento, ele não é um
        objetivo — é uma intenção — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não há decisão publicada sobre as bibliotecas SP legadas —{' '}
        <em>SP / Design System / Arquivo PÚBLICO</em> e <em>UI Kit Poupatempo SP.GOV.BR</em> —, o que
        deixa em aberto se elas são alternativas válidas, se estão descontinuadas e o que acontece
        com os serviços construídos sobre elas — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="continuar">Continuar</h2>
      <div className="wiki-cartoes">
        <Link className="wiki-cartao" href="/introducao/principios">
          <span className="wiki-cartao__titulo">Princípios</span>
          <span className="wiki-cartao__descricao">
            Como estas premissas viram decisão no dia a dia de quem desenha e implementa.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/introducao/sobre">
          <span className="wiki-cartao__titulo">Sobre o Sampa DS</span>
          <span className="wiki-cartao__descricao">
            O que é o sistema, o que tem dentro e como Wiki, Figma e Storybook se dividem.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/fundamentos/acessibilidade">
          <span className="wiki-cartao__titulo">Acessibilidade</span>
          <span className="wiki-cartao__descricao">
            O que o sistema já garante, o que depende de quem implementa e o que falta decidir.
          </span>
        </Link>
      </div>
    </div>
  );
}
