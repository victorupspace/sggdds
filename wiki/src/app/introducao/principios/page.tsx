import type { Metadata } from 'next';
import Link from 'next/link';

import { Rascunho, Tabela } from '@/components/Blocos';
import { Trilha } from '@/components/Trilha';
import { listarComponentes, listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Princípios',
  description:
    'Os sete princípios que decidem por você quando duas soluções parecem igualmente boas no Sampa Design System, com o que cada um significa na prática e a consequência de ignorá-lo.',
};

interface Principio {
  id: string;
  nome: string;
  frase: string;
  significa: string;
  praticas: string[];
  naoEsqueca: string;
}

const PRINCIPIOS: Principio[] = [
  {
    id: 'acessivel-por-padrao',
    nome: 'Acessível por padrão',
    frase: 'Se não funciona para todas as pessoas, não está pronto.',
    significa:
      'Acessibilidade não é uma etapa que vem depois do design nem um ajuste feito na véspera do lançamento. É condição de entrega, no mesmo nível de "o botão salva o formulário". O serviço é do Estado: ele não pode escolher quem atende.',
    praticas: [
      'Contraste mínimo de 4,5:1 para texto normal e 3:1 para texto grande e elementos gráficos, medido, não estimado.',
      'Tudo que se faz com o mouse se faz com o teclado, na ordem em que a tela é lida.',
      'Foco sempre visível — nunca remova o anel de foco para "limpar" a interface.',
      'Nenhuma informação transmitida só por cor: some sempre ícone, texto ou ambos.',
      'Todo campo com rótulo programático; mensagem de erro ligada ao campo, não solta na tela.',
    ],
    naoEsqueca:
      'Acessibilidade retrofitada custa muito mais e quase nunca fica boa: a estrutura já foi decidida errada. Pior, a falha só aparece quando alguém não consegue concluir o serviço — e essa pessoa raramente reclama, ela só desiste e vai ao atendimento presencial.',
  },
  {
    id: 'duvida-e-erro-do-sistema',
    nome: 'A dúvida da pessoa é erro do sistema',
    frase: 'Quando alguém hesita na tela, o defeito é da tela.',
    significa:
      'Ninguém "usa errado" um serviço público. Se a pessoa não sabe qual documento anexar, se hesita entre dois botões ou se preenche o campo de um jeito que o sistema recusa, o problema está na interface, no texto ou na ordem das perguntas — não na pessoa.',
    praticas: [
      'Escreva o rótulo com a palavra que a pessoa usa, não com o nome do campo no banco de dados.',
      'Diga o que é aceito antes do envio, não depois do erro: formato, tamanho, exemplo.',
      'Mensagem de erro diz o que fazer para sair do erro. "Dados inválidos" não é mensagem.',
      'Se dois caminhos parecem iguais, o problema é a escolha existir — não a explicação faltar.',
      'Trate cada chamado de suporte repetido como defeito de interface, não como falta de instrução.',
    ],
    naoEsqueca:
      'Cada dúvida não resolvida na tela vira ligação, atendimento presencial ou desistência — custo que sai do orçamento público e do tempo de quem já estava tentando resolver um problema.',
  },
  {
    id: 'consistencia-antes-de-originalidade',
    nome: 'Consistência antes de originalidade',
    frase: 'Reconhecível vale mais do que inédito.',
    significa:
      'A pessoa aprende uma vez e reaproveita em todos os serviços do Estado. Cada variação de um padrão já conhecido apaga parte desse aprendizado. Interface de serviço público não compete por atenção: ela compete com o cansaço de quem precisa terminar.',
    praticas: [
      'Antes de propor algo novo, procure no catálogo: a peça provavelmente existe com outro nome.',
      'Use o componente do sistema mesmo quando você desenharia diferente — a diferença raramente compensa o custo.',
      'Repita a mesma solução para a mesma situação dentro do produto: um só jeito de mostrar erro, um só jeito de confirmar.',
      'Quando o padrão não atende de verdade, registre a lacuna e peça a decisão. Não invente uma variação silenciosa.',
    ],
    naoEsqueca:
      'Variação sem motivo não fica só na sua tela: ela vira precedente. Alguém vai copiar, o padrão perde autoridade e o sistema passa a documentar exceções em vez de regras.',
  },
  {
    id: 'caminho-mais-curto',
    nome: 'O caminho mais curto até concluir o serviço',
    frase: 'A tela existe para a pessoa terminar e ir embora.',
    significa:
      'O sucesso de um serviço digital do Estado é a tarefa concluída — não o tempo de permanência, não o número de páginas vistas, não o engajamento. Tudo que não ajuda a concluir está disputando espaço com o que ajuda.',
    praticas: [
      'Peça só o que é necessário para prestar o serviço. Todo campo a mais é uma chance a mais de abandono.',
      'Coloque a ação principal onde ela é encontrada sem procura, e deixe uma só ação principal por tela.',
      'Divida formulário longo em etapas com progresso visível e permita voltar sem perder o que foi preenchido.',
      'Deixe claro, desde o começo, o que a pessoa precisa ter em mãos para terminar.',
      'Confirme a conclusão com o que ela precisa guardar: número de protocolo, prazo, próximo passo.',
    ],
    naoEsqueca:
      'Passo desnecessário em serviço público não gera desinteresse — gera desistência no meio, protocolo pela metade e uma segunda tentativa que começa do zero.',
  },
  {
    id: 'celular-ruim-conexao-ruim',
    nome: 'Funciona no celular ruim e na conexão ruim',
    frase: 'O pior aparelho é o que define o padrão.',
    significa:
      'A pessoa que mais depende do serviço público costuma ser a que tem o aparelho mais antigo, a tela menor, o plano de dados mais limitado e o sinal mais instável. O sistema é projetado para esse cenário, não para a bancada de quem o constrói.',
    praticas: [
      'Desenhe primeiro a tela estreita: se cabe ali, cabe no resto.',
      'Alvo de toque confortável e distante o suficiente de outros alvos — dedo não é ponteiro.',
      'Nada essencial pode depender de passar o mouse, de arrastar ou de gesto que não tenha alternativa.',
      'Movimento é reforço, nunca requisito: a tela precisa fazer sentido com animação desligada.',
      'Respeite quem pediu menos movimento no sistema operacional.',
      'Teste com zoom de 200%: o texto precisa continuar legível e nada pode sumir.',
    ],
    naoEsqueca:
      'Uma tela testada só em desktop rápido esconde a falha exatamente de quem tem menos alternativa. Quem tem opção resolve por outro caminho; quem não tem, fica sem o serviço.',
  },
  {
    id: 'nenhum-valor-solto',
    nome: 'Nenhum valor solto',
    frase: 'Toda decisão visual tem nome.',
    significa:
      'Cor, medida, raio, borda, sombra e tipografia vêm de token — no Figma e no código. Valor digitado à mão resolve uma tela e desaparece do sistema: não pode ser auditado, não pode ser trocado de uma vez e não sobrevive à próxima mudança de identidade.',
    praticas: [
      'Aplique a variable no Figma e a variável CSS no código; nunca o valor literal.',
      'Use a camada semântica ao montar telas e a camada de componente ao construir componentes. Primitivo nunca vai direto para a tela.',
      'Use a escala como degrau: não crie valor intermediário porque "ficou melhor".',
      'Se o token de que você precisa não existe, isso é decisão faltando. Registre a lacuna.',
    ],
    naoEsqueca:
      'Cada valor literal é uma dívida que só aparece no dia da mudança — e nesse dia alguém precisa caçá-lo em vários repositórios, de vários fornecedores, sem saber se o valor era intencional ou descuido.',
  },
  {
    id: 'documente-o-que-e',
    nome: 'Documente o que é, não o que se pretende',
    frase: 'Lacuna visível vale mais do que afirmação plausível.',
    significa:
      'A documentação descreve o sistema como ele está, incluindo defeito, divergência e decisão em aberto. Uma frase correta e não verificada é pior do que um espaço em branco assumido, porque alguém vai construir em cima dela.',
    praticas: [
      'Todo número, nome de token e comportamento sai do código ou da biblioteca do Figma.',
      'Dado que não existe vira bloco PENDENTE na página e linha em LACUNAS.md.',
      'Divergência entre Figma e código aparece nas duas versões e vai para INCONSISTENCIAS.md.',
      'Conteúdo editorial ainda não validado pelo time fica marcado como rascunho, inclusive esta página.',
    ],
    naoEsqueca:
      'Documentação que parece completa e está errada destrói a confiança no sistema inteiro. Depois do primeiro erro descoberto na entrega, a equipe passa a conferir tudo no código — e a documentação deixa de ter função.',
  },
];

export default function PaginaPrincipios() {
  const componentes = listarComponentes();
  const tokens = listarTokens();
  const comAxe = componentes.filter((c) => c.tests.a11yFile !== null).length;
  const percentualAxe = Math.round((comAxe / componentes.length) * 100);

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Introdução', href: '/introducao/sobre' }, { titulo: 'Princípios' }]}
      />

      <h1>Princípios</h1>
      <p>
        <Rascunho />
      </p>
      <p className="wiki-prosa__resumo">
        Princípio não é frase de parede. Ele existe para decidir por você quando duas soluções
        parecem igualmente boas, quando o prazo aperta e quando alguém pede uma exceção. Se um
        princípio nunca faz ninguém abrir mão de nada, ele não é princípio — é decoração. Os{' '}
        {PRINCIPIOS.length} abaixo custam alguma coisa.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Página inteira é rascunho para validação</p>
        <p>
          Estes princípios foram redigidos a partir do sistema como ele existe hoje e da natureza do
          serviço público digital. Nenhum deles foi formalizado pelo time responsável. O texto serve
          para ser discutido, cortado e aprovado — não para ser citado como decisão tomada.
        </p>
      </div>

      <h2 id="resumo">Os {PRINCIPIOS.length} princípios</h2>
      <Tabela
        cabecalho={['Princípio', 'Em uma frase']}
        legenda="Resumo dos princípios do Sampa Design System"
        linhas={PRINCIPIOS.map((p, indice) => [
          <a href={`#${p.id}`} key={p.id}>
            <strong>
              {indice + 1}. {p.nome}
            </strong>
          </a>,
          p.frase,
        ])}
      />

      <h2 id="como-usar">Como usar estes princípios</h2>
      <p>
        Eles servem em três momentos concretos: ao escolher entre duas soluções, ao revisar um
        design antes de implementar e ao responder a um pedido de exceção. Em todos os casos, a
        pergunta é a mesma — <em>qual princípio esta decisão está deixando para trás?</em> Se a
        resposta for &quot;nenhum&quot;, provavelmente a decisão não foi examinada.
      </p>

      <h2 id="detalhe">Um a um</h2>

      {PRINCIPIOS.map((principio, indice) => (
        <div key={principio.id}>
          <h3 id={principio.id}>
            {indice + 1}. {principio.nome}
          </h3>
          <p>
            <strong>{principio.frase}</strong>
          </p>
          <p>{principio.significa}</p>
          <p>
            <strong>Na prática:</strong>
          </p>
          <ul>
            {principio.praticas.map((pratica) => (
              <li key={pratica}>{pratica}</li>
            ))}
          </ul>
          <div className="wiki-aviso">
            <p className="wiki-aviso__titulo">Não esqueça</p>
            <p>{principio.naoEsqueca}</p>
          </div>
        </div>
      ))}

      <h2 id="conflito">Quando dois princípios brigam</h2>
      <p>
        Eles brigam com frequência. O caminho mais curto pede menos etapas; a acessibilidade às
        vezes pede mais explicação. A consistência pede o componente existente; a conclusão da
        tarefa às vezes pede algo mais direto. A ordem abaixo é uma proposta de desempate — não uma
        hierarquia de importância, e sim de precedência quando não dá para atender aos dois.
      </p>
      <Tabela
        cabecalho={['Ordem', 'Princípio', 'Por que vem antes']}
        legenda="Ordem de precedência proposta entre os princípios"
        linhas={[
          [
            '1º',
            <strong key="c1">Acessível por padrão</strong>,
            'Sem acesso não há serviço. Nenhum ganho de fluidez compensa excluir alguém.',
          ],
          [
            '2º',
            <strong key="c2">A dúvida da pessoa é erro do sistema</strong>,
            'Uma tela rápida que a pessoa não entende não conclui nada.',
          ],
          [
            '3º',
            <strong key="c3">O caminho mais curto até concluir o serviço</strong>,
            'Entendida a tela, o que resta é não desperdiçar o tempo de quem já entendeu.',
          ],
          [
            '4º',
            <strong key="c4">Funciona no celular ruim e na conexão ruim</strong>,
            'Define o piso técnico em que os três primeiros precisam valer.',
          ],
          [
            '5º',
            <strong key="c5">Consistência antes de originalidade</strong>,
            'Cede apenas quando comprovadamente impede a pessoa de concluir — e a exceção vira proposta ao sistema.',
          ],
          [
            '6º',
            <strong key="c6">Nenhum valor solto</strong>,
            'Disciplina interna: protege a manutenção, não a pessoa que usa o serviço agora.',
          ],
          [
            '7º',
            <strong key="c7">Documente o que é, não o que se pretende</strong>,
            'Vale sempre, mas nunca é motivo para travar uma entrega: registre a lacuna e siga.',
          ],
        ]}
      />

      <h2 id="checklist">Checklist de revisão</h2>
      <p>
        Sete perguntas, uma por princípio, para aplicar antes de aprovar uma tela ou abrir um pedido
        de revisão.
      </p>
      <ol>
        <li>
          Esta tela funciona só com teclado, com foco visível, e nenhum estado depende apenas de
          cor?
        </li>
        <li>
          Alguém que nunca viu esta tela sabe o que fazer sem perguntar — inclusive quando erra?
        </li>
        <li>
          Cada componente usado já existe no catálogo, e cada divergência tem motivo registrado?
        </li>
        <li>Todo campo e todo passo desta tela são necessários para concluir o serviço?</li>
        <li>Isso funciona em tela estreita, com zoom de 200% e sem animação?</li>
        <li>Alguma cor, medida ou tipografia foi escrita à mão em vez de vir de token?</li>
        <li>O que ainda não foi decidido está registrado, em vez de suposto?</li>
      </ol>

      <h2 id="ancoragem">De onde estes princípios saem</h2>
      <p>
        Eles não são abstratos: descrevem tensões reais deste sistema hoje. O primeiro existe porque{' '}
        {percentualAxe}% dos componentes têm teste automatizado de acessibilidade — o restante
        depende de revisão humana. O sexto existe porque os{' '}
        {tokens.length.toLocaleString('pt-BR')} tokens só têm valor se ninguém contorná-los. O sétimo
        existe porque partes do sistema ainda divergem entre si, e essa divergência precisa ficar
        visível para ser resolvida.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe orçamento de desempenho declarado (peso de página,
        tempo de carregamento aceitável, aparelho e conexão de referência para teste). Sem isso, o
        princípio &quot;funciona no celular ruim e na conexão ruim&quot; não tem critério objetivo de
        verificação — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> o nível de conformidade de acessibilidade assumido pelo sistema
        não está declarado, e três fontes internas divergem. Os valores de contraste citados no
        princípio 1 seguem WCAG 2.1 AA como meta de trabalho, não como conformidade declarada —
        fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="continuar">Continuar</h2>
      <div className="wiki-cartoes">
        <Link className="wiki-cartao" href="/introducao/premissas-e-objetivos">
          <span className="wiki-cartao__titulo">Premissas e objetivos</span>
          <span className="wiki-cartao__descricao">
            De onde vêm estes princípios e o que o sistema decidiu não resolver.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/fundamentos/acessibilidade">
          <span className="wiki-cartao__titulo">Acessibilidade</span>
          <span className="wiki-cartao__descricao">
            O checklist completo, o inventário de foco e o que ainda não está verificado.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/fundamentos/tokens">
          <span className="wiki-cartao__titulo">Design tokens</span>
          <span className="wiki-cartao__descricao">
            As camadas, a cadeia de alias e como consumir em Figma e em código.
          </span>
        </Link>
      </div>
    </div>
  );
}
