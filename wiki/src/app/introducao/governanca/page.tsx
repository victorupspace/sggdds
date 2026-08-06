import type { Metadata } from 'next';
import Link from 'next/link';

import { Tabela } from '@/components/Blocos';
import { Trilha } from '@/components/Trilha';
import { listarComponentes, listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Governança',
  description:
    'Quem decide o quê no Sampa Design System, como o versionamento é proposto, qual é a política de depreciação e o que ainda depende de decisão do time.',
};

const REPO = 'https://github.com/victorupspace/sggdds';

export default function PaginaGovernanca() {
  const componentes = listarComponentes();
  const tokens = listarTokens();

  const total = componentes.length;
  const comAxe = componentes.filter((c) => c.tests.a11yFile !== null);
  const comUnitario = componentes.filter((c) => c.tests.unitFile !== null);
  const casosUnitarios = componentes.reduce((soma, c) => soma + (c.tests.unitCount ?? 0), 0);
  const casosAxe = componentes.reduce((soma, c) => soma + (c.tests.a11yCount ?? 0), 0);
  const stories = componentes.reduce((soma, c) => soma + c.stories.length, 0);

  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Introdução', href: '/introducao/sobre' }, { titulo: 'Governança' }]} />

      <h1>Governança</h1>
      <p className="wiki-prosa__resumo">
        Governança é o combinado que responde três perguntas: <strong>quem decide</strong> o que
        entra no sistema, <strong>como uma mudança chega</strong> a quem consome e{' '}
        <strong>o que acontece</strong> quando algo precisa sair. Hoje o Sampa Design System não tem
        esse combinado escrito. Esta página descreve com precisão o vazio e propõe o modelo — para
        ser discutido e decidido, não para ser tomado como já valendo.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Nada nesta página está formalizado</p>
        <p>
          Não existe documento de governança, papel atribuído a ninguém, política de versionamento
          nem rito de decisão publicado. Tudo que aparece abaixo sob o rótulo{' '}
          <strong>proposta</strong> é redação desta documentação e precisa ser validado pelo time
          antes de virar regra. O que aparece sob <strong>o que existe hoje</strong> foi lido
          diretamente do repositório.
        </p>
      </div>

      <h2 id="estado-atual">O estado de hoje</h2>
      <div className="wiki-numeros">
        <div className="wiki-numero">
          <span className="wiki-numero__valor">0</span>
          <span className="wiki-numero__rotulo">tags git no repositório</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">0</span>
          <span className="wiki-numero__rotulo">changesets já criados</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">0</span>
          <span className="wiki-numero__rotulo">versões publicadas no npm</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">
            {total}/{total}
          </span>
          <span className="wiki-numero__rotulo">componentes sem status oficial</span>
        </div>
      </div>

      <Tabela
        cabecalho={['O que um sistema mantido precisa ter', 'Situação hoje', 'Evidência no repositório']}
        legenda="Comparação entre o esperado de um design system mantido e o que existe hoje"
        linhas={[
          [
            'Versões numeradas e navegáveis',
            <strong key="s1">não existe</strong>,
            <span key="e1">
              Nenhuma tag git. Os dois pacotes estão em <code>0.1.0</code> desde o primeiro commit.
            </span>,
          ],
          [
            'Histórico de mudanças legível',
            <strong key="s2">não existe</strong>,
            <span key="e2">
              Nenhum arquivo <code>CHANGELOG.md</code>. O único histórico é a lista de commits.
            </span>,
          ],
          [
            'Distribuição instalável',
            <strong key="s3">não existe</strong>,
            <span key="e3">
              <code>@government/design-system</code> e <code>@government/tokens</code> retornam 404
              no registro público do npm.
            </span>,
          ],
          [
            'Mecanismo de versionamento',
            <strong key="s4">instalado, nunca usado</strong>,
            <span key="e4">
              Changesets configurado em <code>.changeset/config.json</code> (<code>access</code>{' '}
              público, branch base <code>main</code>). A pasta <code>.changeset/</code> contém
              apenas o <code>README.md</code> e o próprio <code>config.json</code>: nenhum changeset
              foi criado.
            </span>,
          ],
          [
            'Automação de release',
            <strong key="s5">existe e não dispara</strong>,
            <span key="e5">
              <code>.github/workflows/release.yml</code> roda a cada push na <code>main</code>, mas
              a etapa de publicação é condicionada ao secret <code>NPM_TOKEN</code>. Sem changesets
              acumulados, não há o que publicar de qualquer forma.
            </span>,
          ],
          [
            'Integração contínua',
            <strong key="s6">existe e funciona</strong>,
            <span key="e6">
              <code>.github/workflows/ci.yml</code> roda lint, typecheck, testes e build em todo
              pull request para a <code>main</code>.
            </span>,
          ],
          [
            'Papéis definidos',
            <strong key="s7">não existe</strong>,
            <span key="e7">
              Nenhum <code>CODEOWNERS</code>, nenhum <code>CONTRIBUTING.md</code>, nenhum documento
              de papéis.
            </span>,
          ],
        ]}
      />

      <p>
        Vale separar duas coisas que costumam ser confundidas. O <strong>produto</strong> existe:
        são {total} componentes React, {tokens.length.toLocaleString('pt-BR')} tokens, {stories}{' '}
        stories publicadas no Storybook e {casosUnitarios} casos de teste unitário. O que falta é a{' '}
        <strong>camada de contrato</strong> em volta dele — versão, histórico, promessa de
        estabilidade e alguém responsável por sustentar essa promessa. Sem essa camada, um produto
        que adota o sistema não consegue responder a uma pergunta básica: &quot;o que muda para mim
        se eu atualizar?&quot;
      </p>

      <h2 id="papeis">Papéis propostos</h2>
      <p>
        Três papéis bastam para um sistema deste tamanho. Papel não é cargo: uma mesma pessoa pode
        ocupar mais de um, e uma pessoa consumidora pode virar contribuidora em uma mudança
        específica sem deixar de ser consumidora.
      </p>

      <Tabela
        cabecalho={['Papel', 'Responsabilidade', 'Decide', 'Não decide']}
        legenda="Proposta de papéis da governança do Sampa Design System"
        linhas={[
          [
            <strong key="p1">Mantenedores do sistema</strong>,
            'Sustentam o repositório, a biblioteca do Figma e a documentação. Fazem a triagem das issues, revisam pull requests e conduzem o release.',
            'O que entra no catálogo, o nome e a API pública de cada componente, o valor de cada token, quando uma versão sai e o que é depreciado.',
            'Como cada produto usa o sistema; prioridade interna dos times consumidores.',
          ],
          [
            <strong key="p2">Contribuidores</strong>,
            'Propõem componentes, correções e melhorias. Entregam design, código, teste e documentação da própria proposta.',
            'A forma da própria proposta e o problema que ela resolve.',
            'Se a proposta entra no sistema, nem em qual versão.',
          ],
          [
            <strong key="p3">Pessoas consumidoras</strong>,
            'Usam o sistema em produtos do Estado. Relatam defeito, lacuna e barreira de acessibilidade.',
            'Quando atualizar a versão do sistema no próprio produto, dentro do que a política de depreciação permitir.',
            'Alterar componente por conta própria: sobrescrever estilo em produto quebra o contrato e some na próxima atualização.',
          ],
        ]}
      />

      <h3 id="mantenedores">Mantenedores do sistema</h3>
      <p>
        São a última palavra sobre a API pública. A responsabilidade central deles não é escrever
        componente: é <strong>dizer não</strong> com fundamento. Todo design system morre do mesmo
        jeito — aceitando variações pontuais até virar um depósito de exceções que ninguém consegue
        manter. Cada &quot;só desta vez&quot; aprovado é um custo permanente cobrado de todos os
        produtos que consomem o sistema.
      </p>

      <h3 id="contribuidores">Contribuidores</h3>
      <p>
        Qualquer pessoa do Estado ou fornecedora contratada pode contribuir. O repositório é público
        e tem licença MIT. A regra é que a proposta chegue completa — design, código, teste e texto —
        e que ela descreva o problema antes da solução. Ver{' '}
        <Link href="/introducao/contribua">Contribua</Link>.
      </p>

      <h3 id="consumidoras">Pessoas consumidoras</h3>
      <p>
        Quem constrói um serviço com o sistema é a fonte mais confiável de informação sobre o que
        falta nele. Um relato de uso real vale mais que uma auditoria: se três equipes recriaram o
        mesmo componente por fora, isso é um requisito, não uma reclamação.
      </p>

      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> nenhuma pessoa ou equipe está formalmente designada para
        qualquer um dos três papéis, não há <code>CODEOWNERS</code> no repositório e não há
        definição de quantas aprovações um pull request precisa para ser mesclado — fonte: time.
        Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="decisoes">Como uma decisão entra no sistema</h2>
      <p>Fluxo proposto, em quatro etapas, com registro público em todas elas:</p>
      <ol>
        <li>
          <strong>Proposta.</strong> Uma issue no repositório descrevendo o problema, onde ele
          aparece e por que o catálogo atual não resolve.
        </li>
        <li>
          <strong>Triagem.</strong> Mantenedores classificam: defeito, melhoria, componente novo ou
          fora de escopo. Fora de escopo também é resposta — e precisa vir com o motivo escrito.
        </li>
        <li>
          <strong>Decisão.</strong> Aceita, recusada ou adiada. Recusa e adiamento ficam registrados
          na própria issue, para que a mesma discussão não recomece daqui a seis meses.
        </li>
        <li>
          <strong>Registro.</strong> Toda mudança aceita que afeta quem consome vira um changeset, e
          o changeset vira uma linha do changelog na próxima versão.
        </li>
      </ol>
      <p>
        Hoje apenas a etapa 1 tem endereço real (as issues do repositório) e a etapa 4 tem
        ferramenta instalada e não usada. As etapas 2 e 3 não têm rito, prazo nem responsável.
      </p>

      <h2 id="versionamento">Versionamento</h2>
      <p>
        A proposta é <strong>SemVer</strong> — versionamento semântico, no formato{' '}
        <code>MAIOR.MENOR.CORREÇÃO</code>. O número não é decorativo: ele é a promessa que o sistema
        faz a quem atualiza.
      </p>

      <Tabela
        cabecalho={['Parte', 'Quando aumenta', 'Exemplo concreto no sistema', 'O que quem consome precisa fazer']}
        legenda="Proposta de regras de versionamento semântico"
        linhas={[
          [
            <strong key="v1">MAIOR</strong>,
            'Mudança que quebra código existente.',
            <span key="x1">
              Remover o valor <code>tertiary</code> da prop <code>variant</code> do{' '}
              <Link href="/componentes/button">Button</Link>, ou renomear uma prop.
            </span>,
            'Ler o guia de migração e ajustar o código antes de atualizar.',
          ],
          [
            <strong key="v2">MENOR</strong>,
            'Recurso novo, compatível com o que já existe.',
            <span key="x2">
              Acrescentar um componente ao catálogo, ou um valor novo a uma prop já existente.
            </span>,
            'Atualizar sem mudar nada. O novo é opcional.',
          ],
          [
            <strong key="v3">CORREÇÃO</strong>,
            'Correção de defeito, sem mudança de API.',
            <span key="x3">
              Corrigir o anel de foco de um componente, ou repontar um token para o valor certo.
            </span>,
            'Atualizar. É o tipo de mudança que se quer receber rápido.',
          ],
        ]}
      />

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Mudança visual também pode ser quebra</p>
        <p>
          SemVer costuma ser lido só como contrato de código, mas em um design system o contrato é
          também visual. Alterar a altura de um botão, o raio de um card ou a cor de um estado não
          quebra nenhuma chamada de função — e ainda assim reposiciona elementos em telas que já
          estão no ar. A proposta é tratar mudança visual ampla como <strong>MAIOR</strong> e
          descrevê-la no changelog com captura de antes e depois.
        </p>
      </div>

      <h3 id="zero-um">Por que tudo está em 0.1.0</h3>
      <p>
        Em SemVer, a faixa <code>0.x</code> significa explicitamente &quot;ainda não há promessa de
        estabilidade&quot;. É a versão honesta para o momento atual: a API pode mudar sem aviso.
        Sair de <code>0.x</code> para <code>1.0.0</code> não é uma formalidade — é o dia em que o
        sistema passa a assumir compromisso de compatibilidade com quem já adotou. Esse marco
        precisa de critério, não de data.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe definição do que precisa estar pronto para o
        sistema ser chamado de <code>1.0.0</code> — fonte: time. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h3 id="changesets">Changesets: o mecanismo já está instalado</h3>
      <p>
        Changesets é a ferramenta que o repositório já usa para versionar. Ela funciona por
        acumulação: cada pull request que muda alguma coisa relevante deixa um arquivo descrevendo o
        que mudou e de que tamanho é a mudança. Na hora do release, a ferramenta soma tudo, calcula
        o número da versão e escreve o changelog.
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`# no seu pull request, depois de fazer a mudança
pnpm changeset          # pergunta o pacote, o tipo (major/minor/patch) e o texto
                        # e grava um arquivo em .changeset/

# a qualquer momento, para ver o que está acumulado
pnpm changeset:status

# no release (rodado pela automação, não à mão)
pnpm version:packages   # consome os changesets, sobe as versões e escreve o CHANGELOG
pnpm release            # constrói e publica no npm`}</code>
      </pre>
      <p>
        O texto do changeset é lido por quem consome, não por quem programa. &quot;fix button&quot;
        não ajuda ninguém. &quot;Corrige o anel de foco do Button, que sumia sobre o fundo do botão
        primário&quot; ajuda.
      </p>

      <h2 id="release">Ritmo de release</h2>
      <p>O que a automação faz hoje, lido de <code>.github/workflows/release.yml</code>:</p>
      <ol>
        <li>Todo push na <code>main</code> dispara o workflow de release.</li>
        <li>
          Se o secret <code>NPM_TOKEN</code> não estiver configurado, o workflow registra um aviso e
          encerra sem publicar nada.
        </li>
        <li>
          Com o secret configurado, a ação do Changesets abre automaticamente um pull request
          chamado <code>chore: release packages</code> reunindo as versões e o changelog. Publicar é
          mesclar esse pull request.
        </li>
      </ol>
      <p>
        Ou seja: a esteira está montada e a decisão que falta é humana, não técnica. Como não há
        nenhum changeset acumulado, mesmo com o token configurado não haveria o que publicar.
      </p>
      <p>
        <strong>Proposta de ritmo:</strong> correção de defeito sai assim que estiver revisada;
        recurso novo entra no ciclo regular seguinte; mudança que quebra compatibilidade sai apenas
        em versão MAIOR anunciada com antecedência. Um ciclo regular com data previsível vale mais
        que um ciclo curto: quem consome consegue planejar a atualização.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> periodicidade do ciclo regular, critério para publicar fora do
        ciclo, e definição de quem aciona o release — fonte: time. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="depreciacao">Política de depreciação</h2>
      <p>
        Depreciar é avisar que algo vai sair, sem tirar do ar no mesmo dia. É o oposto de remover de
        surpresa. A proposta tem quatro estágios, e o ponto central é que{' '}
        <strong>nada some sem ter passado pelo estágio de aviso</strong>.
      </p>

      <Tabela
        cabecalho={['Estágio', 'O que acontece', 'O que quem consome vê', 'Sai em qual versão']}
        legenda="Proposta de estágios de depreciação"
        linhas={[
          [
            <strong key="d1">1. Ativo</strong>,
            'O componente é a recomendação corrente.',
            'Nada de especial.',
            '—',
          ],
          [
            <strong key="d2">2. Depreciado</strong>,
            'Continua funcionando exatamente igual. Recebe apenas correção de defeito e de segurança — nenhum recurso novo.',
            'Aviso na página do componente com a alternativa nomeada, aviso no Storybook, aviso no console em ambiente de desenvolvimento e marcação no Figma.',
            'A depreciação é anunciada em versão MENOR.',
          ],
          [
            <strong key="d3">3. Prazo de convivência</strong>,
            'Janela em que a alternativa e o componente depreciado coexistem, para dar tempo de migrar.',
            'Guia de migração publicado, com o antes e o depois em código.',
            'Corre entre a MENOR que anunciou e a MAIOR que remove.',
          ],
          [
            <strong key="d4">4. Removido</strong>,
            'O componente sai do pacote e da biblioteca do Figma.',
            'Entrada no changelog apontando para o guia de migração.',
            'Só em versão MAIOR, nunca em MENOR ou CORREÇÃO.',
          ],
        ]}
      />

      <p>
        Três regras acompanham a política, e nenhuma delas depende de decisão de prazo para valer:
      </p>
      <ul>
        <li>
          <strong>Depreciar exige alternativa nomeada.</strong> &quot;Não use mais este
          componente&quot; sem dizer o que usar no lugar não é depreciação, é abandono.
        </li>
        <li>
          <strong>O aviso chega onde a pessoa está.</strong> Documentação, Storybook, console e
          Figma. Aviso que existe só no changelog não é lido.
        </li>
        <li>
          <strong>Segurança e acessibilidade continuam sendo corrigidas</strong> durante todo o
          prazo de convivência. Barreira de acesso não espera migração.
        </li>
      </ul>

      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a duração do prazo de convivência (contada em meses ou em
        número de versões MAIOR) não está definida, nem existe decisão sobre depreciar{' '}
        <strong>token</strong> pelo mesmo processo dos componentes — fonte: time. Sem esse número, a
        política acima descreve o mecanismo, mas ainda não é uma promessa que alguém possa planejar.
        Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="status-componente">Status de componente</h2>
      <p>
        Quem vai adotar um componente precisa saber o quanto pode confiar nele. Esta Wiki publica
        quatro estados possíveis — <code>estável</code>, <code>beta</code>, <code>em revisão</code> e{' '}
        <code>depreciado</code> — e hoje marca <strong>os {total} componentes como em revisão</strong>
        , porque não existe nenhum critério publicado que permita chamar qualquer um deles de
        estável.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não há critério definido para um componente sair de{' '}
        <em>em revisão</em> e ser marcado como <em>estável</em>, nem quem faz essa classificação —
        fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="qualidade">O que já é verificado, e o que não bloqueia nada</h2>
      <p>
        Uma parte da governança já está automatizada e roda de verdade a cada pull request:{' '}
        <code>.github/workflows/ci.yml</code> executa lint, typecheck, testes e build. O que falta é
        transformar medida em critério — hoje nenhum dos números abaixo impede uma mudança de
        entrar.
      </p>

      <Tabela
        cabecalho={['Verificação', 'Cobertura real hoje', 'É bloqueante?']}
        legenda="Verificações existentes e seu efeito sobre o processo"
        linhas={[
          [
            'Lint, typecheck e build',
            'Rodam em 100% dos pull requests para a main',
            <strong key="b1">sim — falhou, não passa</strong>,
          ],
          [
            'Teste unitário',
            `${comUnitario.length}/${total} componentes com arquivo de teste, ${casosUnitarios} casos`,
            <span key="b2">
              a suíte é bloqueante, mas <strong>não há mínimo de cobertura exigido</strong>
            </span>,
          ],
          [
            'Teste de acessibilidade (axe)',
            `${comAxe.length}/${total} componentes, ${casosAxe} casos`,
            <strong key="b3">não</strong>,
          ],
          [
            'Story no Storybook',
            `${stories} stories, todos os ${total} componentes cobertos`,
            <strong key="b4">não</strong>,
          ],
          [
            'Documentação da mudança',
            'Nenhum changeset criado até hoje',
            <strong key="b5">não</strong>,
          ],
        ]}
      />

      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe definição de pronto (<em>definition of done</em>)
        acordada para um componente, nem meta de cobertura de teste de acessibilidade, nem regra que
        bloqueie um release por falta de teste ou de changeset — fonte: time. Ver{' '}
        <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="figma">Governança da biblioteca no Figma</h2>
      <p>
        O código tem CI, revisão por pull request e histórico. A biblioteca do Figma não tem
        equivalente: publicar uma alteração de componente ou de variable propaga a mudança para
        todos os arquivos que consomem a biblioteca, imediatamente e sem revisão. É o ponto mais
        frágil da governança atual, porque é o único lugar do sistema onde uma pessoa muda a
        aparência de vários produtos sozinha.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe rito de publicação da biblioteca do Figma (quem
        publica, o que é revisado antes, como a alteração é comunicada), e ainda não foi decidido
        qual biblioteca legada é a vigente: existem em paralelo a &quot;SP / Design System / Arquivo
        PÚBLICO&quot; (componentes <code>sp-*</code>) e a &quot;UI Kit Poupatempo SP.GOV.BR&quot; —
        fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="pendencias">O que precisa ser decidido</h2>
      <p>
        Reunindo tudo em uma lista só, na ordem em que cada decisão destrava as seguintes. As três
        primeiras são pré-requisito de qualquer adoção séria por outro time.
      </p>
      <ol>
        <li>
          <strong>Quem mantém.</strong> Pessoa ou equipe responsável pelo repositório e pela
          biblioteca do Figma, e quantas aprovações um pull request exige.
        </li>
        <li>
          <strong>Publicar os pacotes.</strong> Configurar o <code>NPM_TOKEN</code> e sair de{' '}
          <code>0.1.0</code> — ou declarar explicitamente que a distribuição é por repositório.
        </li>
        <li>
          <strong>Critério do 1.0.0.</strong> O que precisa estar pronto para o sistema assumir
          compromisso de compatibilidade.
        </li>
        <li>
          <strong>Ritmo de release</strong> e quem o aciona.
        </li>
        <li>
          <strong>Prazo de convivência</strong> da política de depreciação.
        </li>
        <li>
          <strong>Definição de pronto</strong> de um componente, incluindo meta de teste de
          acessibilidade e nível WCAG assumido.
        </li>
        <li>
          <strong>Rito de publicação da biblioteca do Figma</strong> e definição da biblioteca
          vigente.
        </li>
      </ol>

      <h2 id="onde-mais">Onde isso aparece na Wiki</h2>
      <div className="wiki-cartoes">
        <Link className="wiki-cartao" href="/introducao/contribua">
          <span className="wiki-cartao__titulo">Contribua</span>
          <span className="wiki-cartao__descricao">
            Como propor um componente, o que entregar junto e o que o CI verifica.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/recursos/changelog">
          <span className="wiki-cartao__titulo">Changelog</span>
          <span className="wiki-cartao__descricao">
            Por que ainda não existe histórico publicado e o que dá para acompanhar hoje.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/recursos/instalacao">
          <span className="wiki-cartao__titulo">Instalação</span>
          <span className="wiki-cartao__descricao">
            O caminho definitivo e o que funciona enquanto o pacote não é publicado.
          </span>
        </Link>
        <a className="wiki-cartao" href={REPO} rel="noreferrer noopener" target="_blank">
          <span className="wiki-cartao__titulo">Repositório ↗</span>
          <span className="wiki-cartao__descricao">
            Código, workflows e issues. Público, com licença MIT.
          </span>
        </a>
      </div>
    </div>
  );
}
