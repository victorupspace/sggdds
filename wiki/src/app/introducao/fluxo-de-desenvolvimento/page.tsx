import type { Metadata } from 'next';
import Link from 'next/link';

import { Tabela } from '@/components/Blocos';
import { Trilha } from '@/components/Trilha';
import { listarComponentes, listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Fluxo de desenvolvimento',
  description:
    'A trilha do código no Sampa Design System: instalar o pacote, importar tokens e estilos, usar o componente, verificar contra o Storybook, testar com vitest e axe, e passar pela revisão.',
};

const PACOTE = '@government/design-system';
const PACOTE_TOKENS = '@government/tokens';
const REPO = 'https://github.com/victorupspace/sggdds';
const STORYBOOK = 'https://sggdds.vercel.app';

/**
 * Componentes que usam hooks do React no próprio código-fonte. Levantado sobre
 * packages/react/src/components: nenhum arquivo do pacote declara 'use client',
 * então a diretiva é responsabilidade de quem consome.
 */
const COMPONENTES_COM_HOOK = [
  'Accordion',
  'Alert',
  'Avatar',
  'BackToTop',
  'Carousel',
  'Checkbox',
  'CookieConsentBanner',
  'DataTable',
  'Datepicker',
  'Dropdown',
  'FileUpload',
  'Footer',
  'Header',
  'Meganav',
  'Modal',
  'ProgressBar',
  'Radio',
  'Tabs',
  'TextArea',
  'TextInput',
  'Toast',
  'Toggle',
  'Tooltip',
];

const NOMES_CAMADA: Record<string, string> = {
  primitivo: 'Primitivo',
  marca: 'Marca',
  semantico: 'Semântico',
  componente: 'Componente',
  extra: 'Extra (só código)',
};

const USO_CAMADA: Record<string, string> = {
  primitivo: 'Não use direto. Existe para ser referenciado pelas camadas de cima.',
  marca: 'Só onde a identidade do Estado precisa aparecer.',
  semantico: 'É esta que você usa ao construir uma tela.',
  componente: 'Consumida pelo próprio componente. Sobrescreva só em caso excepcional.',
  extra: 'Sombras que existem só no código, sem collection correspondente no Figma.',
};

export default function PaginaFluxoDeDesenvolvimento() {
  const componentes = listarComponentes();
  const tokens = listarTokens();

  const exemplos = componentes.reduce((total, c) => total + c.stories.length, 0);
  const comUnit = componentes.filter((c) => c.tests.unitFile !== null);
  const comAxe = componentes.filter((c) => c.tests.a11yFile !== null);
  const semAxe = componentes.filter((c) => c.tests.a11yFile === null);
  const percentualAxe = Math.round((comAxe.length / componentes.length) * 100);
  const casosUnit = comUnit.reduce((soma, c) => soma + (c.tests.unitCount ?? 0), 0);
  const casosAxe = comAxe.reduce((soma, c) => soma + (c.tests.a11yCount ?? 0), 0);

  const porCamada = new Map<string, number>();
  for (const t of tokens) porCamada.set(t.camada, (porCamada.get(t.camada) ?? 0) + 1);
  const camadas = ['primitivo', 'marca', 'semantico', 'componente', 'extra'];
  const tokensDeComponente = porCamada.get('componente') ?? 0;

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Introdução', href: '/introducao/sobre' },
          { titulo: 'Fluxo de desenvolvimento' },
        ]}
      />

      <h1>Fluxo de desenvolvimento</h1>
      <p className="wiki-prosa__resumo">
        Esta é a trilha do código: instalar o pacote, importar os tokens, usar o componente,
        verificar contra o Storybook, testar — inclusive acessibilidade — e passar pela revisão. O
        objetivo final é simples de enunciar e difícil de manter: nenhum valor visual escrito à mão
        no seu produto.
      </p>

      <h2 id="antes">Antes de escrever código</h2>
      <p>
        Duas verificações economizam a maior parte do retrabalho. Faça as duas antes de abrir o
        editor.
      </p>
      <ol>
        <li>
          <strong>O componente já existe?</strong> São {componentes.length} componentes publicados.
          Procure pela função no <Link href="/componentes/visao-geral">catálogo</Link> antes de
          construir qualquer controle.
        </li>
        <li>
          <strong>O valor já é token?</strong> São {tokens.length.toLocaleString('pt-BR')} tokens.
          Cor, medida, raio, borda e peso quase sempre já existem. Ver{' '}
          <Link href="/fundamentos/tokens">Design tokens</Link>.
        </li>
      </ol>

      <h2 id="instalar">1. Instalar</h2>
      <p>
        O sistema é distribuído em dois pacotes: <code>{PACOTE}</code>, com os componentes React e o
        CSS, e <code>{PACOTE_TOKENS}</code>, com os tokens. O primeiro já depende do segundo —
        instale <code>{PACOTE_TOKENS}</code> separadamente apenas se o produto não usa React.
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`npm install ${PACOTE}
# ou
pnpm add ${PACOTE}
# ou
yarn add ${PACOTE}`}</code>
      </pre>

      <Tabela
        cabecalho={['Requisito', 'Versão', 'Origem']}
        legenda="Requisitos de ambiente do pacote"
        linhas={[
          [
            'React e React DOM',
            <code key="react">^19.0.0</code>,
            'peerDependencies do pacote — não são embutidos',
          ],
          ['Node', <code key="node">&gt;=22.12.0</code>, 'engines do monorepo'],
          ['pnpm (opcional)', <code key="pnpm">&gt;=10.24.0</code>, 'engines do monorepo'],
          [
            'Formato do módulo',
            'ESM apenas',
            'O pacote declara "type": "module". Não há build CommonJS.',
          ],
        ]}
      />

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">O pacote ainda não está publicado no npm</p>
        <p>
          <code>{PACOTE}</code> e <code>{PACOTE_TOKENS}</code> retornam 404 no registro público. O
          comando acima é a forma definitiva e passa a valer no dia da publicação, sem mudança. Até
          lá, o caminho que funciona é construir a partir do repositório, que é público e tem licença
          MIT. Detalhes em <Link href="/recursos/instalacao">Instalação</Link>.
        </p>
      </div>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`git clone ${REPO}.git
cd sggdds
corepack pnpm install
corepack pnpm build

# os artefatos ficam em packages/react/dist e packages/tokens/dist`}</code>
      </pre>

      <h2 id="tokens">2. Importar tokens e estilos</h2>
      <p>
        São dois arquivos CSS, importados <strong>uma única vez</strong>, na raiz da aplicação. A
        ordem importa: tokens primeiro, estilos depois. Invertida, os componentes resolvem variáveis
        que ainda não existem.
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`// app/layout.tsx (Next.js App Router) ou src/main.tsx (Vite)
import '${PACOTE}/tokens.css';
import '${PACOTE}/styles.css';`}</code>
      </pre>
      <p>
        O pacote também exporta <code>{PACOTE}/tokens.json</code>, para quem precisa dos tokens em
        tempo de build — geradores, validadores, temas de outra plataforma.
      </p>

      <h3 id="fonte">A fonte não vem no pacote</h3>
      <p>
        O sistema usa Plus Jakarta Sans e não embute os arquivos da fonte. Carregue-a no seu projeto;
        sem isso, o texto cai na fonte padrão do navegador e a tela inteira muda de aparência. Ver{' '}
        <Link href="/fundamentos/tipografia">Tipografia</Link> e{' '}
        <Link href="/recursos/instalacao">Instalação</Link>.
      </p>

      <h3 id="camadas">Qual camada de token usar</h3>
      <p>
        Os {tokens.length.toLocaleString('pt-BR')} tokens estão organizados em cinco coleções. Ao
        construir uma tela de produto, você usa a camada <strong>semântica</strong> — as outras
        existem para sustentá-la.
      </p>
      <Tabela
        cabecalho={['Camada', 'Tokens', 'Regra de uso']}
        legenda="Camadas de token e regra de uso em código de produto"
        linhas={camadas.map((camada) => [
          <strong key={camada}>{NOMES_CAMADA[camada] ?? camada}</strong>,
          (porCamada.get(camada) ?? 0).toLocaleString('pt-BR'),
          USO_CAMADA[camada] ?? '',
        ])}
      />
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">A camada de componente está publicada</p>
        <p>
          A página &quot;Consumindo a biblioteca&quot; do Storybook afirma que o tier de componente
          &quot;ainda não foi publicado&quot;. Isso está desatualizado: hoje existem{' '}
          <strong>{tokensDeComponente.toLocaleString('pt-BR')} tokens</strong>{' '}
          <code>--ds-component-*</code> no <code>tokens.css</code> distribuído. Eles são consumidos
          pelos próprios componentes — você raramente precisa tocá-los, mas eles existem e podem ser
          sobrescritos.
        </p>
      </div>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`.painel-do-servico {
  /* certo: camada semântica */
  background: var(--ds-semantic-color-background-neutral-default);
  color: var(--ds-semantic-text-style-content-color-typography-primary);
  padding: var(--ds-primitive-spacing-24);
  border-radius: var(--ds-primitive-border-radius-radius-lg);

  /* errado: valor literal, que ninguém consegue trocar depois */
  background: #f5f5f5;
}`}</code>
      </pre>

      <h2 id="usar">3. Usar o componente</h2>
      <p>
        Todos os componentes são exportados nominalmente do entrypoint raiz. Não existem subcaminhos
        por componente: <code>{PACOTE}/button</code> não resolve.
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`import { Alert, Badge, Button, Card } from '${PACOTE}';

export function PaginaDoServico() {
  return (
    <main>
      <Alert title="Atenção" variant="warning">
        Sua senha expira em 7 dias.
      </Alert>

      <Card
        title="Agendamento online"
        description="Agende atendimentos presenciais sem enfrentar fila."
        badge={<Badge appearance="subtle" size="small" variant="neutral">Serviços</Badge>}
        action={<Button variant="secondary">Agendar</Button>}
      />
    </main>
  );
}`}</code>
      </pre>
      <p>
        Os tipos das props também são exportados, para quem precisa tipar um wrapper ou um helper:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`import type { ButtonProps, ButtonVariant, CardProps } from '${PACOTE}';`}</code>
      </pre>

      <h3 id="use-client">Componentes que exigem &quot;use client&quot;</h3>
      <p>
        <strong>Nenhum arquivo do pacote declara <code>&apos;use client&apos;</code>.</strong> Em
        frameworks com Server Components — Next.js App Router, por exemplo — a diretiva é
        responsabilidade de quem consome. {COMPONENTES_COM_HOOK.length} dos {componentes.length}{' '}
        componentes usam hooks do React no próprio código e, portanto, só funcionam em um arquivo
        marcado como cliente:
      </p>
      <ul className="wiki-lista-tokens">
        {COMPONENTES_COM_HOOK.map((nome) => (
          <li key={nome}>
            <code>{nome}</code>
          </li>
        ))}
      </ul>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`'use client';

import { Modal } from '${PACOTE}';

export function ConfirmacaoDeAgendamento() {
  // ...
}`}</code>
      </pre>
      <p>
        Isole o trecho interativo no menor componente possível, em vez de marcar a página inteira
        como cliente.
      </p>

      <h3 id="customizacao">O que você pode e o que não pode ajustar</h3>
      <Tabela
        cabecalho={['Permitido', 'Proibido']}
        legenda="Limites de customização do Design System"
        linhas={[
          [
            'Sobrescrever variáveis --ds-* em :root ou em um escopo local.',
            <>
              Usar <code>!important</code> sobre classes do Design System.
            </>,
          ],
          [
            'Compor com children, props e wrappers do seu produto.',
            <>
              Selecionar classes internas do componente (<code>.ds-button__icon</code> e afins): elas
              mudam sem aviso.
            </>,
          ],
          [
            'Usar className para margem, posicionamento e contexto.',
            'Copiar o CSS do componente para dentro do seu app — você perde toda correção futura.',
          ],
          [
            'Importar os tipos exportados para construir helpers tipados.',
            <>
              Escrever valor cravado onde existe token (<code>color: #ff161f</code> em vez de{' '}
              <code>var(--ds-brand-color-brand-red)</code>).
            </>,
          ],
        ]}
      />

      <h2 id="storybook">4. Verificar contra o Storybook</h2>
      <p>
        O Storybook publicado é a referência de comportamento real. São {exemplos} exemplos
        interativos cobrindo os {componentes.length} componentes, com controles de props e o painel
        de acessibilidade ligado.
      </p>
      <div className="wiki-cartoes">
        <a className="wiki-cartao" href={STORYBOOK} rel="noreferrer noopener" target="_blank">
          <span className="wiki-cartao__titulo">Storybook publicado ↗</span>
          <span className="wiki-cartao__descricao">
            Roda a versão mais recente da <code>main</code>, com {exemplos} exemplos.
          </span>
        </a>
        <Link className="wiki-cartao" href="/componentes/visao-geral">
          <span className="wiki-cartao__titulo">Catálogo desta Wiki</span>
          <span className="wiki-cartao__descricao">
            Props, estados, tokens consumidos e testes de cada componente, extraídos do código.
          </span>
        </Link>
      </div>
      <p>Compare quatro coisas antes de considerar a tela pronta:</p>
      <ul>
        <li>
          <strong>Props e valores aceitos.</strong> Se a variante que você quer não aparece nos
          controles, ela não existe — não a simule com CSS por cima.
        </li>
        <li>
          <strong>Estados.</strong> Foco, desabilitado, carregando, erro. Abra cada um no Storybook e
          confirme que o seu uso reproduz o mesmo comportamento.
        </li>
        <li>
          <strong>Teclado.</strong> Percorra o exemplo isolado com Tab, Enter, Espaço, setas e Esc.
        </li>
        <li>
          <strong>Painel de acessibilidade.</strong> O <code>@storybook/addon-a11y</code> roda axe na
          story aberta. Achados ali são piso, não aprovação.
        </li>
      </ul>
      <p>
        Cada story tem URL própria. Ao relatar um defeito, cole o link do exemplo que reproduz — é a
        informação que mais acelera a correção. Ver <Link href="/recursos/suporte">Suporte</Link>.
      </p>

      <h2 id="testes">5. Testes</h2>
      <p>
        O repositório usa <strong>vitest</strong> para teste unitário e <strong>vitest-axe</strong>{' '}
        com <strong>axe-core</strong> para acessibilidade. O comando <code>pnpm test</code> na raiz
        roda os dois.
      </p>
      <div className="wiki-numeros">
        <div className="wiki-numero">
          <span className="wiki-numero__valor">
            {comUnit.length}/{componentes.length}
          </span>
          <span className="wiki-numero__rotulo">componentes com teste unitário</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{casosUnit}</span>
          <span className="wiki-numero__rotulo">casos de teste unitário</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">
            {comAxe.length}/{componentes.length}
          </span>
          <span className="wiki-numero__rotulo">com teste axe ({percentualAxe}%)</span>
        </div>
        <div className="wiki-numero">
          <span className="wiki-numero__valor">{casosAxe}</span>
          <span className="wiki-numero__rotulo">casos de teste axe</span>
        </div>
      </div>
      <p>
        Todo componente tem teste unitário. Só {comAxe.length} têm teste de acessibilidade — os
        outros {semAxe.length} não têm nenhuma verificação automática. Se você escreve um componente
        ou uma composição no seu produto, escreva os dois arquivos.
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`// MeuFormulario.a11y.test.tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

import { MeuFormulario } from './MeuFormulario';

describe('MeuFormulario — acessibilidade', () => {
  it('não tem violações no estado padrão', async () => {
    const { container } = render(<MeuFormulario />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('não tem violações com erro de validação visível', async () => {
    const { container } = render(<MeuFormulario erro="Informe o CPF" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});`}</code>
      </pre>
      <p>
        Teste cada estado separadamente: padrão, erro, carregando, desabilitado, vazio. A maior parte
        das violações aparece justamente nos estados que ninguém abre.
      </p>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Axe não certifica acessibilidade</p>
        <p>
          Ferramenta automática pega uma parte das falhas — tipicamente contraste, rótulo ausente e
          atributo ARIA inválido. Ordem de leitura, texto de link genérico, foco perdido depois de uma
          ação e mensagem de erro que não é anunciada só aparecem em teste manual. Passe também pelo
          checklist de <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>: navegar a tela
          inteira só com teclado leva cinco minutos e é o teste com melhor retorno que existe.
        </p>
      </div>

      <h2 id="revisao">6. Revisão</h2>
      <p>
        O repositório roda quatro verificações em GitHub Actions a cada pull request e a cada push na{' '}
        <code>main</code>, definidas em <code>.github/workflows/ci.yml</code>:
      </p>
      <Tabela
        cabecalho={['Job', 'Comando', 'O que ele impede']}
        legenda="Verificações automáticas de CI"
        linhas={[
          ['Lint', <code key="l">pnpm lint</code>, 'Padrão de código e regras de React fora do lugar.'],
          [
            'Typecheck',
            <code key="t">pnpm typecheck</code>,
            'Prop inexistente, tipo errado, import quebrado.',
          ],
          [
            'Test',
            <code key="te">pnpm test</code>,
            'Regressão de comportamento e violação de acessibilidade detectável por axe.',
          ],
          ['Build', <code key="b">pnpm build</code>, 'Pacote que não compila ou não gera os tipos.'],
        ]}
      />
      <p>
        CI passando não é revisão. O que a máquina não vê, alguém precisa olhar. Antes de pedir
        revisão, confira você mesmo:
      </p>
      <ul>
        <li>Nenhuma cor, medida, raio ou peso escrito à mão — tudo vem de <code>var(--ds-*)</code>.</li>
        <li>Nenhum seletor apontando para classe interna do Design System.</li>
        <li>Todo controle interativo é componente do catálogo, não <code>&lt;div&gt;</code> com clique.</li>
        <li>A tela inteira funciona só com teclado, e o foco é sempre visível.</li>
        <li>Todo campo tem rótulo visível e associado; todo erro está ligado ao campo.</li>
        <li>Os estados de carregando, vazio e erro existem e foram testados.</li>
        <li>A tela funciona em 320px de largura e com zoom de 200%.</li>
        <li>Divergência em relação ao sistema está declarada na descrição do pull request.</li>
      </ul>
      <p>
        Achou defeito no componente, e não no seu uso dele? Abra issue no{' '}
        <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
          repositório ↗
        </a>{' '}
        com o link da story que reproduz. Ver <Link href="/recursos/suporte">Suporte</Link>.
      </p>

      <h2 id="tamanho">Tamanho da distribuição</h2>
      <p>Medido sobre o build atual do pacote:</p>
      <Tabela
        cabecalho={['Arquivo', 'Bruto', 'Gzip']}
        legenda="Tamanho dos arquivos distribuídos"
        linhas={[
          [<code key="a">styles.css</code>, '240,6 KB', '27,4 KB'],
          [<code key="b">index.js</code>, '140,2 KB', '32,5 KB'],
          [<code key="c">tokens.css</code>, '128,2 KB', '9,6 KB'],
        ]}
      />
      <p>
        O JavaScript é <em>tree-shakeable</em>: <code>react</code>, <code>react-dom</code> e{' '}
        <code>react/jsx-runtime</code> são externals, e o pacote declara{' '}
        <code>&quot;sideEffects&quot;: [&quot;*.css&quot;]</code>, então o bundler elimina o
        componente que você não importa. O CSS não: <code>styles.css</code> é consolidado e traz o
        estilo dos {componentes.length} componentes, importe você um ou todos.
      </p>

      <h2 id="limites">O que ainda não existe</h2>
      <Tabela
        cabecalho={['Item', 'Estado hoje']}
        legenda="Limitações conhecidas do pacote"
        linhas={[
          [
            'Modo escuro',
            <>
              Não existe. O <code>tokens.css</code> distribuído define todas as variáveis apenas em{' '}
              <code>:root</code>, sem variação por modo.
            </>,
          ],
          [
            'Subcaminhos por componente',
            <>
              Não existem. <code>{PACOTE}/button</code> não resolve; use o import nominal da raiz.
            </>,
          ],
          ['Build CommonJS', 'Não existe. O pacote é ESM puro.'],
          ['Fonte auto-hospedada no pacote', 'Não existe. Carregue Plus Jakarta Sans no seu projeto.'],
          ['CSS por componente', 'Não existe. O styles.css é único e consolidado.'],
          [
            'Exportação de ícones',
            <>
              Não existe arquivo SVG distribuído. Os 2.193 ícones estão inline no JSX. Ver{' '}
              <Link href="/fundamentos/iconografia">Iconografia</Link>.
            </>,
          ],
          [
            'Tokens de easing',
            <>
              Não existem. E as durações de movimento saem sem unidade, como número solto. Ver{' '}
              <Link href="/fundamentos/motion">Motion</Link>.
            </>,
          ],
        ]}
      />

      <h2 id="documento-desatualizado">Sobre a documentação técnica do Storybook</h2>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">
          A página &quot;Consumindo a biblioteca&quot; do Storybook tem informação desatualizada
        </p>
        <p>
          Três pontos divergem do que está no repositório hoje, e esta página usa os valores
          verificados: o nome do pacote é <code>{PACOTE}</code>; a camada de componente{' '}
          <strong>está publicada</strong>, com {tokensDeComponente.toLocaleString('pt-BR')} tokens; e
          o CSS distribuído mede <strong>240,6 KB</strong> (27,4 KB gzip), não os valores citados lá.
          O documento também lista CI/CD e teste de acessibilidade como pendentes, quando ambos
          existem — <code>.github/workflows/ci.yml</code> roda lint, typecheck, test e build, e{' '}
          {comAxe.length} componentes têm teste axe. Em caso de divergência, vale o repositório.
        </p>
      </div>

      <h2 id="pendencias">Pendências</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe versão publicada a fixar. Os pacotes{' '}
        <code>{PACOTE}</code> e <code>{PACOTE_TOKENS}</code> dão 404 no npm, não há nenhuma tag git e
        não existe <code>CHANGELOG.md</code>. O Changesets está configurado e{' '}
        <code>.github/workflows/release.yml</code> está pronto, mas o fluxo nunca foi usado e a
        publicação só roda se o segredo <code>NPM_TOKEN</code> for configurado — fonte: repo. Ver{' '}
        <Link href="/introducao/governanca">Governança</Link>. Registrado em <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe meta de cobertura de teste de acessibilidade, nem
        critério que bloqueie a publicação de um componente sem teste axe. Hoje {semAxe.length} dos{' '}
        {componentes.length} componentes não têm nenhum — fonte: time. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não há política de suporte a navegadores declarada, nem
        procedimento de atualização do pacote em produtos já entregues (janela, aviso, guia de
        migração) — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
