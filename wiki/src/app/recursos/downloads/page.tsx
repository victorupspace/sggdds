import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Downloads',
  description:
    'Logo, tokens, ícones e biblioteca do Sampa Design System: o que está disponível para baixar e o que ainda depende de decisão.',
};

export default function PaginaDownloads() {
  const tokens = listarTokens();

  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Recursos', href: '/recursos/ferramentas' }, { titulo: 'Downloads' }]} />

      <h1>Downloads</h1>
      <p className="wiki-prosa__resumo">
        O que está disponível hoje para baixar e usar, e o que ainda depende de decisão do time.
        Esta página é honesta sobre as duas coisas.
      </p>

      <h2 id="logo">Logo</h2>
      <p>
        Vetor oficial extraído da biblioteca Foundations do Figma. Duas versões, ambas em SVG e com
        proporção 217×29.
      </p>

      <div className="wiki-cartoes">
        <a className="wiki-cartao" download href="/logo-spgov.svg">
          <span className="wiki-cartao__titulo">Logo para fundo claro (SVG)</span>
          <span className="wiki-cartao__descricao">
            Versão positiva. Marca em <code>#FF161F</code> e texto em <code>#292929</code>.
          </span>
        </a>
        <a className="wiki-cartao" download href="/logo-spgov-inverse.svg">
          <span className="wiki-cartao__titulo">Logo para fundo escuro (SVG)</span>
          <span className="wiki-cartao__descricao">
            Versão negativa, como publicada no Figma. Marca em <code>#FF161F</code> e texto em
            branco.
          </span>
        </a>
      </div>

      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBlockStart: 24 }}>
        <div
          style={{
            padding: 24,
            border: '1px solid var(--wiki-border)',
            borderRadius: 'var(--wiki-radius-md)',
            background: '#ffffff',
          }}
        >
          <img alt="Logo em fundo claro" height={29} src="/logo-spgov.svg" width={217} />
        </div>
        <div
          style={{
            padding: 24,
            borderRadius: 'var(--wiki-radius-md)',
            background: 'var(--wiki-surface-inverse)',
          }}
        >
          <img alt="Logo em fundo escuro" height={29} src="/logo-spgov-inverse.svg" width={217} />
        </div>
      </div>

      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> a versão para fundo claro foi derivada automaticamente da
        versão para fundo escuro, trocando o branco por <code>#292929</code>. Não existe manual de
        marca nem versão monocromática publicada — fonte: time. Ver{' '}
        <Link href="/fundamentos/logo-e-marca">Logo e marca</Link>. Registrado em{' '}
        <code>LACUNAS.md</code>.
      </p>

      <h2 id="tokens">Design tokens</h2>
      <p>
        {tokens.length.toLocaleString('pt-BR')} tokens, distribuídos em dois formatos dentro do
        pacote <code>@government/tokens</code>:
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Formatos de token disponíveis</caption>
          <thead>
            <tr>
              <th scope="col">Formato</th>
              <th scope="col">Caminho</th>
              <th scope="col">Para que serve</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CSS</td>
              <td>
                <code>packages/tokens/dist/css/tokens.css</code>
              </td>
              <td>Variáveis CSS prontas para consumo direto no navegador</td>
            </tr>
            <tr>
              <td>JSON</td>
              <td>
                <code>packages/tokens/dist/json/tokens.json</code>
              </td>
              <td>Consumo programático, geração para outras plataformas</td>
            </tr>
            <tr>
              <td>DTCG bruto</td>
              <td>
                <code>packages/tokens/src/raw/*.tokens.json</code>
              </td>
              <td>Exportação original das collections do Figma, antes da transformação</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Enquanto o pacote não está no npm, baixe pelo{' '}
        <a
          href="https://github.com/victorupspace/sggdds/tree/main/packages/tokens"
          rel="noreferrer noopener"
          target="_blank"
        >
          repositório ↗
        </a>
        . Ver <Link href="/recursos/instalacao">Instalação</Link>.
      </p>

      <h2 id="icones">Ícones</h2>
      <p>
        2.193 ícones publicados na biblioteca Web Components do Figma — 2.185 Material Symbols no
        estilo outlined, peso 300, mais 8 ícones avulsos.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe pacote de ícones para download. Os ícones usados
        pelos componentes estão embutidos no JSX, e a biblioteca completa só existe dentro do
        Figma. Além disso, a licença não está declarada em lugar nenhum — fonte: time. Ver{' '}
        <Link href="/fundamentos/iconografia">Iconografia</Link>.
      </p>
      <p>
        Enquanto isso, para usar um ícone: abra a{' '}
        <a
          href="https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components"
          rel="noreferrer noopener"
          target="_blank"
        >
          biblioteca no Figma ↗
        </a>
        , localize o ícone pelo nome e exporte em SVG.
      </p>

      <h2 id="biblioteca">Biblioteca de componentes</h2>
      <div className="wiki-cartoes">
        <a
          className="wiki-cartao"
          href="https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Web Components (Figma) ↗</span>
          <span className="wiki-cartao__descricao">
            58 componentes publicados e a biblioteca de ícones.
          </span>
        </a>
        <a
          className="wiki-cartao"
          href="https://www.figma.com/design/3IPhcwjiNpG6PXVmdG2x3x/Foundations"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Foundations (Figma) ↗</span>
          <span className="wiki-cartao__descricao">
            Variables de cor, tipografia, espaçamento e raio.
          </span>
        </a>
        <a
          className="wiki-cartao"
          href="https://github.com/victorupspace/sggdds"
          rel="noreferrer noopener"
          target="_blank"
        >
          <span className="wiki-cartao__titulo">Código-fonte ↗</span>
          <span className="wiki-cartao__descricao">
            Repositório público sob licença MIT, com tokens e biblioteca React.
          </span>
        </a>
      </div>

      <h2 id="fonte">Tipografia</h2>
      <p>
        Plus Jakarta Sans não é distribuída pelo sistema. Baixe em{' '}
        <a
          href="https://fonts.google.com/specimen/Plus+Jakarta+Sans"
          rel="noreferrer noopener"
          target="_blank"
        >
          Google Fonts ↗
        </a>
        , sob licença SIL Open Font License. Ver <Link href="/fundamentos/tipografia">Tipografia</Link>.
      </p>
    </div>
  );
}
