import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { figmaDoComponente, listarComponentes, listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Perguntas frequentes',
  description:
    'Respostas diretas sobre o Sampa Design System para quem projeta, quem desenvolve, quem gere produto e quem entrega por contrato — inclusive quando a resposta é que a decisão ainda não existe.',
};

const REPO = 'https://github.com/victorupspace/sggdds';
const STORYBOOK = 'https://sggdds.vercel.app';
const FIGMA_WEB = 'https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components';
const FIGMA_FOUNDATIONS = 'https://www.figma.com/design/3IPhcwjiNpG6PXVmdG2x3x/Foundations';

export default function PaginaFaq() {
  const componentes = listarComponentes();
  const tokens = listarTokens();

  const comAxe = componentes.filter((c) => c.tests.a11yFile !== null).length;
  const stories = componentes.reduce((soma, c) => soma + c.stories.length, 0);
  const semFigma = componentes.filter((c) => figmaDoComponente(c.slug) === null);

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Recursos', href: '/recursos/ferramentas' }, { titulo: 'Perguntas frequentes' }]}
      />

      <h1>Perguntas frequentes</h1>
      <p className="wiki-prosa__resumo">
        As perguntas que aparecem com mais frequência sobre o Sampa Design System, agrupadas por
        quem pergunta. Onde existe resposta, ela vem com a evidência. Onde a decisão ainda não foi
        tomada, a resposta é que ela ainda não foi tomada — e aponta para{' '}
        <Link href="/introducao/governanca">Governança</Link>.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Como ler esta página</p>
        <p>
          Cada pergunta abre e fecha. As respostas se dividem em três tipos:{' '}
          <strong>o que existe hoje</strong> foi lido do repositório, do Figma ou do Storybook;{' '}
          <strong>proposta</strong> é redação desta documentação e precisa de validação;{' '}
          <strong>pendente</strong> é decisão que ninguém tomou ainda. Seções inteiras que são
          proposta estão marcadas como tal logo abaixo do título.
        </p>
      </div>

      <h2 id="geral">Geral</h2>

      <details>
        <summary>O que é o Sampa Design System?</summary>
        <p>
          É o conjunto de decisões de design e a implementação delas para os serviços digitais do
          Governo do Estado de São Paulo. Na prática, três coisas: {tokens.length.toLocaleString('pt-BR')}{' '}
          design tokens (cor, tipografia, espaçamento, raio), os componentes React construídos
          sobre esses tokens, e as bibliotecas correspondentes no Figma. O objetivo é que dois
          serviços diferentes do Estado se pareçam, se comportem e sejam acessíveis do mesmo jeito,
          sem que cada equipe precise redecidir tudo do zero.
        </p>
        <p>
          Ver <Link href="/introducao/sobre">Sobre o Sampa DS</Link>.
        </p>
      </details>

      <details>
        <summary>Quem mantém o sistema?</summary>
        <p>
          O repositório é público e recebe contribuições por pull request, com integração contínua
          rodando lint, typecheck, testes e build. Mas não existe pessoa ou equipe formalmente
          designada como responsável.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não há <code>CODEOWNERS</code>, <code>CONTRIBUTING.md</code>{' '}
          nem documento de papéis no repositório; ninguém está designado para manter o código, a
          biblioteca do Figma ou esta documentação — fonte: time. Ver{' '}
          <Link href="/introducao/governanca">Governança</Link>. Registrado em{' '}
          <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>O que já está pronto e o que não está?</summary>
        <p>Pronto e verificável hoje:</p>
        <ul>
          <li>
            Componentes React implementados, com {stories} exemplos publicados no Storybook.
          </li>
          <li>
            {tokens.length.toLocaleString('pt-BR')} tokens gerados a partir das variables do Figma,
            em CSS e em JSON.
          </li>
          <li>2.193 ícones na biblioteca do Figma.</li>
          <li>
            Todos os componentes com teste unitário e {comAxe} deles com teste automatizado de
            acessibilidade.
          </li>
        </ul>
        <p>Não está pronto:</p>
        <ul>
          <li>
            Distribuição: <code>@government/design-system</code> e <code>@government/tokens</code>{' '}
            não estão publicados no npm.
          </li>
          <li>Versionamento: nenhuma tag git, nenhum changelog, tudo em <code>0.1.0</code>.</li>
          <li>Governança: papéis, canal de suporte e política de depreciação não definidos.</li>
          <li>
            Padrões e templates: nada documentado no Figma nem no Storybook. O que esta Wiki publica
            em <Link href="/padroes/visao-geral">Padrões</Link> é proposta aguardando validação.
          </li>
        </ul>
      </details>

      <details>
        <summary>Como acompanho as mudanças do sistema?</summary>
        <p>
          Hoje, por dois lugares: o{' '}
          <a href={`${REPO}/commits/main`} rel="noreferrer noopener" target="_blank">
            histórico de commits ↗
          </a>{' '}
          e o{' '}
          <a href={STORYBOOK} rel="noreferrer noopener" target="_blank">
            Storybook ↗
          </a>
          , que publica automaticamente a versão mais recente da branch principal. Não existe
          changelog nem número de versão para comparar. Ver{' '}
          <Link href="/recursos/changelog">Changelog</Link>.
        </p>
      </details>

      <details>
        <summary>Onde fica a documentação oficial: aqui, no Storybook ou no Figma?</summary>
        <p>
          Cada um responde uma pergunta diferente. Esta Wiki explica <strong>quando</strong> e{' '}
          <strong>por que</strong> usar cada coisa, e é onde as decisões ficam escritas. O Storybook
          mostra o componente <strong>funcionando</strong>, com os estados reais e a API viva. O
          Figma é a fonte das <strong>variables e dos componentes de design</strong>. Quando os três
          divergirem, o código é a referência de comportamento e o Figma é a referência visual — e a
          divergência é um defeito a reportar.
        </p>
      </details>

      <details>
        <summary>Existem outras bibliotecas do Estado. Qual delas vale?</summary>
        <p>
          Existem pelo menos duas bibliotecas anteriores em paralelo no Figma:{' '}
          <em>SP / Design System / Arquivo PÚBLICO</em> (com componentes <code>sp-*</code>{' '}
          versionados individualmente e paleta própria) e <em>UI Kit Poupatempo SP.GOV.BR</em>.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não há declaração de qual biblioteca é a vigente nem do que
          acontece com as anteriores — se são descontinuadas, se convivem e por quanto tempo —
          fonte: time. Enquanto isso não for decidido, produtos novos correm o risco de adotar a
          biblioteca errada. Ver <Link href="/introducao/governanca">Governança</Link>. Registrado
          em <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>Posso usar o sistema fora do Governo do Estado de São Paulo?</summary>
        <p>
          O código está sob{' '}
          <a href={`${REPO}/blob/main/LICENSE`} rel="noreferrer noopener" target="_blank">
            licença MIT ↗
          </a>{' '}
          em repositório público, o que permite uso, modificação e redistribuição. A marca é outra
          coisa: logotipo, nome e o vermelho institucional identificam o Estado e não devem ser
          usados por quem não o representa. Ver <Link href="/fundamentos/logo-e-marca">Logo e marca</Link>.
        </p>
      </details>

      <h2 id="projeta">Para quem projeta</h2>

      <details>
        <summary>Como acesso a biblioteca do Figma?</summary>
        <p>São dois arquivos:</p>
        <ul>
          <li>
            <a href={FIGMA_WEB} rel="noreferrer noopener" target="_blank">
              Web Components ↗
            </a>{' '}
            — os componentes publicados e a biblioteca de ícones.
          </li>
          <li>
            <a href={FIGMA_FOUNDATIONS} rel="noreferrer noopener" target="_blank">
              Foundations ↗
            </a>{' '}
            — as variables de cor, tipografia, espaçamento e raio.
          </li>
        </ul>
        <p>
          No seu arquivo, habilite as duas bibliotecas em <em>Assets → Libraries</em> antes de
          começar. Sem isso, você desenha com valores soltos e o resultado não vira código.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não está definido como uma pessoa de fora do time obtém
          acesso aos arquivos, nem se existe licença de Figma prevista para equipes contratadas —
          fonte: time. Registrado em <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>Como sei se o componente que preciso já existe?</summary>
        <p>
          Comece pelo <Link href="/componentes/visao-geral">catálogo de componentes</Link>, que
          lista os componentes por categoria com um resumo do que cada um resolve. Se a
          dúvida for de comportamento, abra o exemplo no{' '}
          <a href={STORYBOOK} rel="noreferrer noopener" target="_blank">
            Storybook ↗
          </a>
          . Busque pelo problema, não pelo nome que você deu à solução: quem procura por
          &quot;seletor de etapas&quot; não encontra <Link href="/componentes/stepper">Stepper</Link>.
        </p>
      </details>

      <details>
        <summary>Por que o Figma publica 58 itens e a Wiki não lista todos eles?</summary>
        <p>
          Porque nem tudo que está publicado no Figma é um componente do sistema. Parte dos 58 itens
          são peças internas de outro componente, átomos de composição ou elementos sem par em
          código. A Wiki lista apenas o que existe implementado em React e pode ser usado num
          produto.
        </p>
        <p>
          {semFigma.length} componentes do código também não têm par publicado no Figma:{' '}
          {semFigma.map((c) => c.name).join(', ')}. Eles estão marcados no{' '}
          <Link href="/componentes/visao-geral#sem-figma">catálogo</Link>.
        </p>
      </details>

      <details>
        <summary>Falta um componente para o que eu preciso. O que faço?</summary>
        <p>Nesta ordem:</p>
        <ol>
          <li>
            <strong>Verifique se é composição.</strong> Boa parte do que parece componente novo é
            arranjo de componentes existentes. Um card com ação, por exemplo, já existe como{' '}
            <Link href="/componentes/action-card">ActionCard</Link>.
          </li>
          <li>
            <strong>Descreva o problema, não a solução.</strong> &quot;Preciso de um acordeão com
            três níveis&quot; é uma solução; &quot;preciso apresentar 40 requisitos documentais sem
            que a pessoa perca o contexto&quot; é o problema — e pode ter resposta melhor.
          </li>
          <li>
            <strong>Abra uma proposta.</strong> Uma{' '}
            <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
              issue no repositório ↗
            </a>{' '}
            com o problema, onde ele aparece e por que o catálogo atual não resolve. Ver{' '}
            <Link href="/introducao/contribua">Contribua</Link>.
          </li>
          <li>
            <strong>Não trave a entrega.</strong> Enquanto a proposta é avaliada, resolva no
            produto — usando os tokens do sistema, para que a migração depois seja pequena.
          </li>
        </ol>
      </details>

      <details>
        <summary>Como proponho mudança em um componente que já existe?</summary>
        <p>
          Pelo mesmo caminho de uma proposta de componente: uma issue no repositório, descrevendo o
          comportamento atual, o que você precisa que ele faça e em qual tela isso aparece. Anexe o
          link da story do Storybook e o node do Figma, se houver. Mudança em componente existente
          afeta todos os produtos que já o usam, então a pergunta que a proposta precisa responder
          é: isso é necessidade geral ou exceção de um produto?
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não existe rito de triagem, prazo de resposta nem quem
          decide se uma proposta entra — fonte: time. Ver{' '}
          <Link href="/introducao/governanca#decisoes">Governança</Link>. Registrado em{' '}
          <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>Posso destacar (detach) um componente da biblioteca e alterar no meu arquivo?</summary>
        <p>
          Pode, e é a forma mais rápida de perder tudo que o sistema oferece. Um componente
          destacado para de receber correção, some do inventário de uso da biblioteca e vira débito
          invisível: quem for implementar não sabe se aquela diferença é intencional ou acidente.
          Se você precisou destacar, isso é informação — abra uma issue dizendo o que faltava.
        </p>
      </details>

      <details>
        <summary>Onde estão as cores, os tamanhos de texto e os espaçamentos?</summary>
        <p>
          Na biblioteca <strong>Foundations</strong>, em três collections:{' '}
          <code>T1: Sampa Design System</code> (marca), <code>Global: Core</code> (primitivas) e{' '}
          <code>T2: Semantics</code> (semânticas). Aplique sempre a variable semântica, nunca a
          primitiva direto no componente — é o que faz a decisão se propagar depois. Ver{' '}
          <Link href="/fundamentos/tokens">Design tokens</Link>.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não existem estilos de texto compostos publicados (display,
          heading, body, label, caption) ligando tamanho, peso e altura de linha. Só há a escala
          primitiva solta, que é o oposto do que designer e desenvolvedor usam no dia a dia —
          fonte: time. Ver <Link href="/fundamentos/tipografia">Tipografia</Link>. Registrado em{' '}
          <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>O componente no Figma não explica quando usá-lo. Onde vejo isso?</summary>
        <p>
          Aqui. Os componentes publicados no Figma estão com a descrição vazia, então o Figma
          responde &quot;como é&quot;, e não &quot;quando usar&quot;. As diretrizes de uso — quando
          usar, quando não usar, anatomia, do &amp; don&apos;t, erros comuns — estão na página de
          cada componente nesta Wiki.
        </p>
      </details>

      <details>
        <summary>O sistema tem tema escuro?</summary>
        <p>
          Não. A collection <code>T2: Semantics</code> tem um único modo. Não existe modo alternativo
          em nenhuma collection, e nenhum componente implementa tema escuro.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não está declarado se o sistema é de tema único por decisão
          ou por omissão — fonte: time. Registrado em <code>LACUNAS.md</code>.
        </p>
      </details>

      <h2 id="desenvolve">Para quem desenvolve</h2>

      <details>
        <summary>Como instalo o pacote?</summary>
        <p>
          Hoje, não dá por npm. <code>@government/design-system</code> e{' '}
          <code>@government/tokens</code> retornam <strong>404</strong> no registro público: nunca
          foram publicados. O caminho que funciona é construir a partir do repositório:
        </p>
        <pre className="wiki-codigo" tabIndex={0}>
          <code>{`git clone ${REPO}.git
cd sggdds
corepack pnpm install
corepack pnpm build

# artefatos em packages/react/dist e packages/tokens/dist`}</code>
        </pre>
        <p>
          Ver <Link href="/recursos/instalacao">Instalação</Link>, que já traz o comando definitivo
          para o dia em que a publicação acontecer.
        </p>
      </details>

      <details>
        <summary>Quais são os requisitos de ambiente?</summary>
        <p>
          Para <strong>consumir</strong> a biblioteca: React e React DOM em <code>^19.0.0</code>{' '}
          (declarados como peer dependencies) e um bundler que aceite ESM e importação de CSS —
          Vite, Next.js ou Webpack 5.
        </p>
        <p>
          Para <strong>desenvolver</strong> no monorepo: Node <code>&gt;=22.12.0</code> e pnpm{' '}
          <code>&gt;=10.24.0</code>, conforme o campo <code>engines</code> do{' '}
          <code>package.json</code>.
        </p>
      </details>

      <details>
        <summary>Funciona com React 19? E com React 18?</summary>
        <p>
          Com React 19, sim: é exatamente o que os dois pacotes declaram em{' '}
          <code>peerDependencies</code> (<code>react</code> e <code>react-dom</code> em{' '}
          <code>^19.0.0</code>). Com React 18, <strong>não é compatibilidade declarada</strong> — a
          faixa de peer dependency exclui a versão 18, e não há teste rodando contra ela. Instalar
          em um projeto React 18 vai gerar aviso de peer dependency e não há garantia nenhuma sobre
          o resultado.
        </p>
      </details>

      <details>
        <summary>Como importo só os tokens, sem os componentes React?</summary>
        <p>
          O pacote <code>@government/tokens</code> distribui os tokens em CSS e em JSON, de forma
          independente do React:
        </p>
        <pre className="wiki-codigo" tabIndex={0}>
          <code>{`/* variáveis CSS — todas as --ds-* passam a existir no :root */
import '@government/tokens/tokens.css';

/* consumo programático */
import tokens from '@government/tokens/tokens.json';`}</code>
        </pre>
        <p>
          Quem já usa a biblioteca React não precisa do segundo pacote: ela reexporta{' '}
          <code>@government/design-system/tokens.css</code> e{' '}
          <code>@government/design-system/tokens.json</code>. Enquanto nada está publicado, os
          arquivos ficam em <code>packages/tokens/dist/css/tokens.css</code> e{' '}
          <code>packages/tokens/dist/json/tokens.json</code> depois do build. Ver{' '}
          <Link href="/recursos/downloads">Downloads</Link>.
        </p>
      </details>

      <details>
        <summary>Funciona com Server Components e SSR?</summary>
        <p>
          Com ressalva importante: <strong>nenhum arquivo da biblioteca declara{' '}
          <code>&apos;use client&apos;</code></strong>. Os componentes que têm estado interno
          continuam usando hooks do React, então, no App Router do Next.js, importar um deles
          diretamente de um Server Component causa erro em tempo de build.
        </p>
        <p>
          A solução hoje é marcar o arquivo <em>que consome</em> o componente:
        </p>
        <pre className="wiki-codigo" tabIndex={0}>
          <code>{`'use client';

import { Dropdown, Modal, Tabs } from '@government/design-system';`}</code>
        </pre>
        <p>
          Componentes puramente de apresentação renderizam no servidor sem nenhum ajuste. O CSS pode
          ser importado no <code>layout.tsx</code> normalmente. Ver{' '}
          <Link href="/recursos/instalacao#frameworks">Instalação</Link>.
        </p>
      </details>

      <details>
        <summary>Qual é o tamanho que isso adiciona ao meu produto?</summary>
        <p>Medido sobre o build atual:</p>
        <div className="wiki-tabela-rolagem" tabIndex={0}>
          <table className="wiki-tabela">
            <caption className="wiki-visualmente-oculto">
              Tamanho dos arquivos distribuídos pelo pacote
            </caption>
            <thead>
              <tr>
                <th scope="col">Arquivo</th>
                <th scope="col">Bruto</th>
                <th scope="col">Gzip</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>styles.css</code>
                </td>
                <td>240,6 KB</td>
                <td>27,4 KB</td>
              </tr>
              <tr>
                <td>
                  <code>index.js</code>
                </td>
                <td>140,2 KB</td>
                <td>32,5 KB</td>
              </tr>
              <tr>
                <td>
                  <code>tokens.css</code>
                </td>
                <td>128,2 KB</td>
                <td>9,6 KB</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          O CSS é consolidado: os 27,4 KB comprimidos chegam inteiros mesmo que você use um único
          componente, porque não há tree-shaking de CSS por componente. O JavaScript, esse sim, é
          ESM e o bundler remove o que você não importa.
        </p>
      </details>

      <details>
        <summary>Existem tipos TypeScript?</summary>
        <p>
          Sim. O pacote é escrito em TypeScript e publica as declarações junto com o build
          (<code>types</code> aponta para <code>dist/src/index.d.ts</code>). Cada componente também
          exporta o próprio tipo de props, o que permite tipar wrappers no produto sem redeclarar
          nada. A lista de tipos exportados está na aba de referência técnica da página de cada
          componente.
        </p>
      </details>

      <details>
        <summary>Preciso carregar a fonte separadamente?</summary>
        <p>
          Sim. O sistema usa Plus Jakarta Sans e <strong>não embute os arquivos da fonte</strong>.
          Sem carregá-la no seu projeto, a interface renderiza na fonte padrão do navegador e a
          métrica muda. Ver <Link href="/recursos/instalacao#tipografia">Instalação</Link>.
        </p>
      </details>

      <details>
        <summary>Como testo acessibilidade?</summary>
        <p>
          O repositório usa <code>vitest-axe</code> sobre o componente renderizado. O padrão é
          simples e funciona igual no seu produto:
        </p>
        <pre className="wiki-codigo" tabIndex={0}>
          <code>{`import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { describe, expect, it } from 'vitest';

describe('MinhaTela — acessibilidade', () => {
  it('não tem violações', async () => {
    const { container } = render(<MinhaTela />);
    expect(await axe(container)).toHaveNoViolations();
  });
});`}</code>
        </pre>
        <p>
          Duas coisas importam mais que rodar o teste. A primeira: hoje apenas{' '}
          <strong>{comAxe} componentes</strong> têm teste axe, e a suíte não bloqueia nada no
          processo de release — passar não significa que o componente foi auditado. A segunda:
          verificação automática pega uma fração das barreiras reais. Teste com teclado, com zoom
          de 200% e com leitor de tela também. O
          checklist está em <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>.
        </p>
      </details>

      <details>
        <summary>O componente não atende ao que preciso. Posso sobrescrever o CSS?</summary>
        <p>
          Antes de sobrescrever, confira se a necessidade não está atendida por uma prop ou por
          composição — muita sobrescrita nasce de não ter lido a API inteira. Se ainda assim for
          preciso, a ordem de preferência é:
        </p>
        <ol>
          <li>
            <strong>Prop ou slot do componente.</strong> É a única forma que sobrevive a
            atualização.
          </li>
          <li>
            <strong>Token.</strong> Se a diferença é de cor, espaço ou raio, o ajuste pertence ao
            token, não ao componente.
          </li>
          <li>
            <strong>Wrapper no seu produto.</strong> Um componente seu que compõe o do sistema
            mantém a separação clara entre o que é do sistema e o que é do produto.
          </li>
          <li>
            <strong>Sobrescrita de CSS.</strong> Último recurso, e sempre acompanhada de uma issue
            no repositório explicando o que faltou.
          </li>
        </ol>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não está declarado se as classes CSS dos componentes fazem
          parte da API pública. Sem essa definição, qualquer sobrescrita por seletor pode quebrar
          numa mudança interna sem que isso seja considerado uma quebra de contrato — fonte: time.
          Ver <Link href="/introducao/governanca#versionamento">Governança</Link>. Registrado em{' '}
          <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>Em qual versão eu fixo a dependência?</summary>
        <p>
          Não existe versão para fixar: zero tags git, zero releases, os dois pacotes em{' '}
          <code>0.1.0</code> desde o primeiro commit. Consumindo do repositório, aponte para um{' '}
          <strong>commit específico</strong>, nunca para a branch — apontar para a branch significa
          receber mudança sem revisão em qualquer build.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> política de versionamento, critério do <code>1.0.0</code> e
          ritmo de release — fonte: time. Ver{' '}
          <Link href="/introducao/governanca#versionamento">Governança</Link>. Registrado em{' '}
          <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>Como rodo o Storybook localmente?</summary>
        <p>
          Depois do <code>pnpm install</code> na raiz do repositório:
        </p>
        <pre className="wiki-codigo" tabIndex={0}>
          <code>{`pnpm storybook       # constrói os tokens e sobe o Storybook
pnpm test            # roda a suíte de testes de todos os pacotes
pnpm typecheck       # verifica os tipos
pnpm lint            # roda o ESLint`}</code>
        </pre>
        <p>
          A versão publicada da branch principal fica em{' '}
          <a href={STORYBOOK} rel="noreferrer noopener" target="_blank">
            {STORYBOOK.replace('https://', '')} ↗
          </a>
          .
        </p>
      </details>

      <details>
        <summary>Encontrei um defeito. Onde reporto?</summary>
        <p>
          Em uma{' '}
          <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
            issue no repositório ↗
          </a>
          , com o link da story do Storybook que reproduz o problema, o que você esperava, o que
          aconteceu e o navegador. Barreira de acessibilidade tem prioridade sobre defeito visual:
          diga explicitamente quando for o caso. Ver <Link href="/recursos/suporte">Suporte</Link>.
        </p>
      </details>

      <h2 id="gestao">Para gestão e produto</h2>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>
      <p>
        As respostas desta seção são redação desta documentação. Não existe política de adoção,
        meta de conformidade nem medição publicada — o que existe é o estado do sistema descrito
        acima.
      </p>

      <details>
        <summary>Por que usar o design system em vez de construir do zero?</summary>
        <p>Três razões, em ordem de peso para serviço público:</p>
        <ol>
          <li>
            <strong>Acessibilidade não recomeça a cada projeto.</strong> Semântica, foco visível,
            navegação por teclado e contraste já vêm resolvidos no componente. Refazer isso a cada
            produto é caro e falha com frequência.
          </li>
          <li>
            <strong>Reconhecimento.</strong> Quem usa três serviços do Estado deve reconhecer que é
            o mesmo Estado. Isso reduz erro, reduz chamado de suporte e sustenta confiança.
          </li>
          <li>
            <strong>Custo de decisão.</strong> Cada cor, espaço e comportamento decidido uma vez é
            uma discussão que não se repete em cada squad.
          </li>
        </ol>
      </details>

      <details>
        <summary>Quanto o sistema reduz de custo e de prazo?</summary>
        <p>
          Não é possível responder com número. Nenhum produto mediu antes e depois, e não existe
          medição publicada de tempo de entrega, retrabalho ou defeito de interface atribuível ao
          sistema. Qualquer percentual apresentado hoje seria invenção.
        </p>
        <p>
          O que dá para afirmar sem medir: o custo se desloca. Ele sai do desenho de cada tela e vai
          para a manutenção do sistema, que é um custo compartilhado. Isso só compensa com mais de
          um produto consumindo — com um produto só, o design system é despesa.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não há linha de base nem instrumentação para medir efeito do
          sistema sobre custo, prazo ou qualidade — fonte: time. Registrado em{' '}
          <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>Como medir adoção?</summary>
        <p>
          Não existe instrumentação hoje. Como o pacote não está publicado, também não existe a
          medida mais simples de todas — downloads no npm. Quatro medidas propostas, todas obtíveis
          sem ferramenta nova:
        </p>
        <ul>
          <li>
            <strong>Produtos que consomem o pacote.</strong> Contagem direta, produto a produto. É a
            única que importa no começo.
          </li>
          <li>
            <strong>Proporção de tela construída com componentes do sistema</strong>, medida por
            amostragem em telas críticas — não no produto inteiro.
          </li>
          <li>
            <strong>Volume de sobrescrita de CSS</strong> apontando para classes do sistema. Alto
            volume não é desobediência: é sinal de que falta prop ou falta componente.
          </li>
          <li>
            <strong>Issues abertas por quem consome.</strong> Silêncio raramente significa
            satisfação; costuma significar que ninguém está usando.
          </li>
        </ul>
        <p>
          Contar componentes usados sem olhar para o que foi sobrescrito produz número bonito e
          falso.
        </p>
      </details>

      <details>
        <summary>O que fazer com produtos legados?</summary>
        <p>
          Não reescrever. Migração de interface inteira raramente termina, e enquanto ela corre o
          produto para de evoluir. A ordem que costuma funcionar:
        </p>
        <ol>
          <li>
            <strong>Tokens primeiro.</strong> Importar <code>tokens.css</code> e trocar valores
            literais por variáveis alinha cor, tipografia e espaçamento sem tocar em componente
            nenhum.
          </li>
          <li>
            <strong>Depois os componentes de formulário.</strong> É onde a acessibilidade falha mais
            e onde o ganho aparece mais rápido.
          </li>
          <li>
            <strong>Telas novas já nascem no sistema.</strong> Nada novo entra fora do padrão.
          </li>
          <li>
            <strong>O legado migra quando for mexer.</strong> Tela que ninguém toca há dois anos não
            é prioridade de migração.
          </li>
        </ol>
      </details>

      <details>
        <summary>Dá para exigir o Sampa DS em um contrato hoje?</summary>
        <p>
          Dá, com duas ressalvas escritas de forma explícita no edital ou no termo de referência. A
          primeira: como os pacotes não estão publicados, a obrigação precisa descrever o consumo
          por repositório em commit fixo, senão a exigência é impossível de cumprir. A segunda: não
          existe acordo de nível de serviço, então o contrato não pode depender de prazo de resposta
          do time do sistema para destravar entrega da fornecedora.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não existe cláusula contratual padrão, nem texto de
          referência aprovado juridicamente para exigir o design system em contratação — fonte:
          time / jurídico. Registrado em <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>Quem responde se uma mudança no sistema quebrar meu produto?</summary>
        <p>
          Hoje, ninguém formalmente. Não há responsável designado, não há acordo de nível de
          serviço e não há política de depreciação em vigor. A proteção prática disponível é
          técnica: fixe um commit, atualize deliberadamente e teste antes de subir.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> responsável, acordo de nível de serviço por severidade e
          prazo de convivência da política de depreciação — fonte: time. Ver{' '}
          <Link href="/introducao/governanca#depreciacao">Governança</Link>. Registrado em{' '}
          <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>Meu produto precisa de identidade visual própria. O sistema permite?</summary>
        <p>
          O sistema tem um único tema, e a marca do Estado é justamente o que ele existe para
          preservar. Diferenciação de produto deve vir de conteúdo, arquitetura de informação e
          ilustração — não de cor, tipografia ou forma de botão. Um serviço do Estado que parece
          outra empresa cria dúvida sobre ser legítimo, e essa dúvida tem custo real.
        </p>
      </details>

      <h2 id="fornecedores">Para fornecedores contratados</h2>
      <p className="wiki-selo wiki-selo--rascunho">rascunho para validação</p>
      <p>
        Não existe hoje nenhuma exigência contratual publicada sobre o Sampa Design System. As
        respostas abaixo são proposta desta documentação e só valem para o seu contrato se
        estiverem escritas nele.
      </p>

      <details>
        <summary>O que é obrigatório entregar quando o contrato exige o design system?</summary>
        <p>Proposta de mínimo verificável, em cinco itens:</p>
        <ol>
          <li>
            <strong>Zero valor literal de cor, tipografia, espaçamento e raio.</strong> Tudo por
            token. É verificável por busca no código.
          </li>
          <li>
            <strong>Componentes do sistema onde eles existem.</strong> Recriar um{' '}
            <Link href="/componentes/button">Button</Link> ou um{' '}
            <Link href="/componentes/text-input">TextInput</Link> por conta própria é não conformidade.
          </li>
          <li>
            <strong>Justificativa escrita para cada componente novo</strong>, com a issue aberta no
            repositório do sistema.
          </li>
          <li>
            <strong>Acessibilidade verificada</strong>: teste automatizado sem violação, navegação
            por teclado em todos os fluxos e contraste conferido. Ver{' '}
            <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>.
          </li>
          <li>
            <strong>Registro de divergências.</strong> Toda sobrescrita, com o motivo. Divergência
            documentada é gerenciável; divergência escondida vira débito de quem recebe.
          </li>
        </ol>
      </details>

      <details>
        <summary>Como valido conformidade antes de entregar?</summary>
        <p>Cinco verificações, todas executáveis sem ferramenta especial:</p>
        <div className="wiki-tabela-rolagem" tabIndex={0}>
          <table className="wiki-tabela">
            <caption className="wiki-visualmente-oculto">
              Verificações de conformidade propostas
            </caption>
            <thead>
              <tr>
                <th scope="col">Verificação</th>
                <th scope="col">Como fazer</th>
                <th scope="col">Critério</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Uso de token</td>
                <td>
                  Buscar no código por valores literais de cor (<code>#</code>, <code>rgb(</code>) e
                  por medidas em <code>px</code> fora de tokens
                </td>
                <td>Nenhuma ocorrência sem justificativa registrada</td>
              </tr>
              <tr>
                <td>Uso de componente</td>
                <td>
                  Listar os componentes de interface do produto e comparar com o{' '}
                  <Link href="/componentes/visao-geral">catálogo</Link>
                </td>
                <td>Nenhuma reimplementação de componente existente</td>
              </tr>
              <tr>
                <td>Acessibilidade automatizada</td>
                <td>
                  Rodar <code>axe</code> nas telas principais
                </td>
                <td>Zero violação</td>
              </tr>
              <tr>
                <td>Teclado</td>
                <td>Percorrer cada fluxo crítico sem tocar no mouse</td>
                <td>Todo elemento alcançável, foco sempre visível, sem armadilha de foco</td>
              </tr>
              <tr>
                <td>Sobrescrita</td>
                <td>Buscar no CSS do produto por seletores que atingem classes do sistema</td>
                <td>Cada ocorrência com motivo escrito e issue correspondente</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não existe processo formal de validação de conformidade,
          nem quem faz o aceite, nem ferramenta oficial de verificação — fonte: time. Registrado em{' '}
          <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>Posso criar componentes que não existem no sistema?</summary>
        <p>
          Pode, quando o catálogo realmente não resolve. Duas condições: o componente novo é
          construído sobre os tokens do sistema, e a necessidade é registrada em uma{' '}
          <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
            issue no repositório ↗
          </a>
          . Componente criado em silêncio some junto com o contrato — o Estado paga de novo pela
          mesma peça no projeto seguinte.
        </p>
      </details>

      <details>
        <summary>Posso usar outra biblioteca de componentes junto?</summary>
        <p>
          Misturar bibliotecas de interface produz duas fontes de verdade para a mesma decisão:
          dois botões, dois anéis de foco, dois comportamentos de modal. Bibliotecas sem interface
          visual própria — máscara de campo, gráfico, mapa, tabela virtualizada — são outra coisa e
          costumam ser necessárias; nesse caso, o estilo aplicado a elas deve vir dos tokens do
          sistema.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não existe política sobre uso de bibliotecas de terceiros
          junto ao design system, nem lista de bibliotecas aceitas — fonte: time. Registrado em{' '}
          <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>A licença permite usar o sistema em projeto contratado?</summary>
        <p>
          Sim. O código está sob licença MIT em repositório público, o que cobre uso comercial,
          modificação e redistribuição, mantido o aviso de licença. A fonte Plus Jakarta Sans tem
          licença própria (SIL Open Font License) e não é distribuída pelo sistema. Ver{' '}
          <Link href="/recursos/downloads">Downloads</Link>.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> a licença dos 2.193 ícones não está declarada em lugar
          nenhum — fonte: time. Ver <Link href="/fundamentos/iconografia">Iconografia</Link>.
          Registrado em <code>LACUNAS.md</code>.
        </p>
      </details>

      <details>
        <summary>O sistema está bloqueando minha entrega. A quem recorro?</summary>
        <p>
          O único canal que funciona hoje é a{' '}
          <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
            issue no repositório ↗
          </a>
          . Descreva o bloqueio, o prazo contratual afetado e o contorno que você pretende adotar.
          Não pare a entrega esperando resposta: registre, siga com o contorno construído sobre os
          tokens do sistema e mantenha a issue aberta.
        </p>
        <p className="wiki-pendente">
          ⚠️ <strong>PENDENTE:</strong> não existe canal de atendimento, prazo de resposta nem
          instância de escalonamento — fonte: time. Ver <Link href="/recursos/suporte">Suporte</Link>.
          Registrado em <code>LACUNAS.md</code>.
        </p>
      </details>

      <h2 id="nao-respondido">O que esta página ainda não responde</h2>
      <p>
        As perguntas acima que terminam em pendência não têm resposta porque a decisão não foi
        tomada, não porque falta pesquisa. Elas se concentram em cinco pontos, e todos estão
        detalhados em <Link href="/introducao/governanca">Governança</Link>:
      </p>
      <ol>
        <li>
          <strong>Quem mantém</strong> o código, a biblioteca do Figma e esta documentação.
        </li>
        <li>
          <strong>Como o sistema é distribuído</strong> — publicar no npm ou declarar que a
          distribuição é por repositório.
        </li>
        <li>
          <strong>Política de versão e de depreciação</strong>, incluindo o prazo de convivência.
        </li>
        <li>
          <strong>Canal de suporte e acordo de nível de serviço</strong> por severidade.
        </li>
        <li>
          <strong>Qual biblioteca é a vigente</strong> diante das anteriores que ainda existem.
        </li>
      </ol>

      <h2 id="onde-mais">Onde continuar</h2>
      <div className="wiki-cartoes">
        <Link className="wiki-cartao" href="/recursos/instalacao">
          <span className="wiki-cartao__titulo">Instalação</span>
          <span className="wiki-cartao__descricao">
            O caminho definitivo e o que funciona enquanto o pacote não é publicado.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/introducao/governanca">
          <span className="wiki-cartao__titulo">Governança</span>
          <span className="wiki-cartao__descricao">
            Papéis, versionamento e depreciação: o que existe, o que é proposta e o que falta
            decidir.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/recursos/suporte">
          <span className="wiki-cartao__titulo">Suporte</span>
          <span className="wiki-cartao__descricao">
            Onde levar cada tipo de problema e o que incluir no relato.
          </span>
        </Link>
        <Link className="wiki-cartao" href="/componentes/visao-geral">
          <span className="wiki-cartao__titulo">Componentes</span>
          <span className="wiki-cartao__descricao">
            Os componentes implementados, com API, estados e exemplos.
          </span>
        </Link>
      </div>
    </div>
  );
}
