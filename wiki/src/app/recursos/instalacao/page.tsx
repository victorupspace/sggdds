import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Instalação',
  description:
    'Como instalar e consumir o Sampa Design System: pacote, tokens, estilos, configuração por framework e verificação.',
};

const PACOTE = '@government/design-system';
const PACOTE_TOKENS = '@government/tokens';

export default function PaginaInstalacao() {
  const tokens = listarTokens();

  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Recursos', href: '/recursos/ferramentas' }, { titulo: 'Instalação' }]} />

      <h1>Instalação</h1>
      <p className="wiki-prosa__resumo">
        O Sampa Design System é distribuído como um pacote React com os componentes e{' '}
        {tokens.length.toLocaleString('pt-BR')} tokens. Esta página descreve a instalação definitiva
        e, enquanto o pacote não é publicado, o caminho que funciona hoje.
      </p>

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">O pacote ainda não está publicado no npm</p>
        <p>
          <code>{PACOTE}</code> e <code>{PACOTE_TOKENS}</code> retornam 404 no registro público.
          Toda a seção <a href="#instalacao-definitiva">Instalação</a> abaixo é a forma definitiva e
          passa a valer no dia da publicação, sem mudança de conteúdo. Até lá, use o{' '}
          <a href="#enquanto-nao-publica">consumo direto do repositório</a>. Esta página será
          atualizada quando a publicação acontecer.
        </p>
      </div>

      <h2 id="requisitos">Requisitos</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Requisitos de ambiente</caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Versão</th>
              <th scope="col">Observação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>React</td>
              <td>
                <code>^19.0.0</code>
              </td>
              <td>Declarado como peer dependency</td>
            </tr>
            <tr>
              <td>React DOM</td>
              <td>
                <code>^19.0.0</code>
              </td>
              <td>Declarado como peer dependency</td>
            </tr>
            <tr>
              <td>Node</td>
              <td>
                <code>&gt;=22.12</code>
              </td>
              <td>Exigido pelo monorepo para desenvolvimento</td>
            </tr>
            <tr>
              <td>Bundler</td>
              <td>Vite, Next.js, Webpack 5</td>
              <td>O pacote é ESM e importa CSS</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="instalacao-definitiva">Instalação</h2>
      <p>Escolha o gerenciador que seu projeto já usa.</p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`npm install ${PACOTE}
# ou
pnpm add ${PACOTE}
# ou
yarn add ${PACOTE}`}</code>
      </pre>
      <p>
        O pacote de tokens (<code>{PACOTE_TOKENS}</code>) vem junto. Instale-o separadamente apenas
        se você quiser os tokens sem os componentes React — por exemplo, num produto que não usa
        React.
      </p>

      <h2 id="importacao">Importação</h2>
      <p>
        São duas importações: os estilos, uma vez na raiz da aplicação, e os componentes, onde você
        precisar deles.
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`// raiz da aplicação — uma vez só
import '${PACOTE}/styles.css';

// onde você usa
import { Button, Alert, TextInput } from '${PACOTE}';`}</code>
      </pre>

      <h3 id="so-tokens">Só os tokens</h3>
      <p>
        Se o produto não usa React, ou se você quer aplicar as decisões visuais em CSS próprio,
        importe apenas os tokens:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`import '${PACOTE}/tokens.css';

/* agora todas as variáveis --ds-* estão disponíveis */
.meu-cabecalho {
  background: var(--ds-semantic-color-background-neutral-default);
  padding: var(--ds-primitive-spacing-24);
}`}</code>
      </pre>

      <h2 id="tipografia">Tipografia</h2>
      <p>
        O sistema usa Plus Jakarta Sans e <strong>não embute a fonte</strong>: carregue-a no seu
        projeto. Duas formas, nesta ordem de preferência:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`// 1. Auto-hospedada (recomendado: sem requisição externa, melhor privacidade)
import { Plus_Jakarta_Sans } from 'next/font/google';
const fonte = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700'] });

// 2. Via CDN, em qualquer stack
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link
  href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>`}</code>
      </pre>

      <h2 id="frameworks">Configuração por framework</h2>

      <h3 id="next">Next.js (App Router)</h3>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`// app/layout.tsx
import '${PACOTE}/styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}`}</code>
      </pre>
      <p>
        Componentes com estado (Dropdown, Modal, Tabs, Datepicker, Carousel) precisam de{' '}
        <code>&apos;use client&apos;</code> no arquivo que os usa.
      </p>

      <h3 id="vite">Vite</h3>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`// src/main.tsx
import '${PACOTE}/styles.css';
import { createRoot } from 'react-dom/client';`}</code>
      </pre>

      <h2 id="verificar">Como verificar que deu certo</h2>
      <ol>
        <li>
          Renderize um <Link href="/componentes/button">Button</Link> e confirme que ele aparece com
          o vermelho da marca — se aparecer sem estilo, o <code>styles.css</code> não foi importado.
        </li>
        <li>
          Abra o inspetor e confirme que <code>--ds-primitive-spacing-16</code> resolve para{' '}
          <code>16px</code> no <code>:root</code>.
        </li>
        <li>
          Confirme que o texto está em Plus Jakarta Sans, não na fonte padrão do navegador.
        </li>
      </ol>

      <h2 id="tamanho">Tamanho da distribuição</h2>
      <p>Medido sobre o build atual do pacote:</p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Tamanho dos arquivos distribuídos</caption>
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
        O CSS é consolidado: contém o estilo de todos os componentes, não só dos que você importa.
        Tree-shaking de CSS por componente ainda não existe.
      </p>

      <h2 id="enquanto-nao-publica">Enquanto o pacote não é publicado</h2>
      <p>
        O repositório é público e tem licença MIT. É possível consumir a biblioteca direto do Git,
        apontando para um commit fixo — nunca para um branch, para não receber mudança sem revisão:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`# clone e construa localmente
git clone https://github.com/victorupspace/sggdds.git
cd sggdds
corepack pnpm install
corepack pnpm build

# os artefatos ficam em packages/react/dist e packages/tokens/dist`}</code>
      </pre>
      <p>
        Para avaliar componentes sem instalar nada, use o{' '}
        <a href="https://sggdds.vercel.app" rel="noreferrer noopener" target="_blank">
          Storybook publicado ↗
        </a>
        , que roda a versão mais recente da <code>main</code>.
      </p>

      <h2 id="versionamento">Versionamento</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> política de versionamento e primeira release — fonte: time.
        O repositório tem Changesets configurado, mas ainda não há nenhuma tag git nem{' '}
        <code>CHANGELOG.md</code>. Enquanto não houver release formal, não existe versão a fixar.
        Ver <Link href="/introducao/governanca">Governança</Link>.
      </p>
    </div>
  );
}
