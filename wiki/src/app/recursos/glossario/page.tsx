import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Glossário',
  description:
    'O que significa cada termo usado no Sampa Design System e no ecossistema em volta dele: token, variable, collection, story, changeset, WCAG, axe e outros.',
};

export default function PaginaGlossario() {
  const tokens = listarTokens();

  const porCamada = (camada: string) => tokens.filter((t) => t.camada === camada).length;

  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Recursos', href: '/recursos/ferramentas' }, { titulo: 'Glossário' }]} />

      <h1>Glossário</h1>
      <p className="wiki-prosa__resumo">
        Design e desenvolvimento usam as mesmas palavras para coisas diferentes, e isso trava
        conversa. Esta página fixa o significado de cada termo dentro do Sampa Design System. Quando
        existe uma página que aprofunda o assunto, ela está indicada.
      </p>

      <h2 id="como-ler">Como ler esta página</h2>
      <p>
        Os termos estão agrupados por assunto, não em ordem alfabética: quem chega perdido costuma
        precisar do vizinho do termo que procurou. Use a busca no topo do site para ir direto a uma
        palavra.
      </p>
      <p>
        Este glossário trata do vocabulário de <strong>quem constrói</strong> o sistema. O
        vocabulário de <strong>quem lê</strong> o serviço — como escrever “documento” em vez de
        “documentação comprobatória” — está em{' '}
        <Link href="/conteudo/vocabulario">Vocabulário</Link>.
      </p>

      <h2 id="tokens">Tokens e variáveis</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Termos de tokens e variáveis</caption>
          <thead>
            <tr>
              <th scope="col">Termo</th>
              <th scope="col">O que é</th>
              <th scope="col">Aprofunde em</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Token</th>
              <td>
                Uma decisão visual guardada como valor com nome: uma cor, um espaçamento, um tamanho
                de fonte. Quem constrói usa o nome, nunca o valor — assim, mudar a decisão em um
                lugar muda a interface inteira. O sistema tem{' '}
                {tokens.length.toLocaleString('pt-BR')} tokens.
              </td>
              <td>
                <Link href="/fundamentos/tokens">Design tokens</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Variable</th>
              <td>
                O nome que o Figma dá ao token dentro do arquivo de design. Cada variable do Figma
                vira uma variável CSS <code>--ds-*</code> no código, pelo mesmo processo de
                exportação — o desenho e o código não guardam valores separados.
              </td>
              <td>
                <Link href="/fundamentos/tokens">Design tokens</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Collection</th>
              <td>
                Um conjunto de variables no Figma, exportado como um arquivo só. São quatro vindas do
                Figma — <code>Global: Core</code>, <code>T1: Sampa Design System</code>,{' '}
                <code>T2: Semantics</code> e <code>T3: Components</code> — mais um arquivo de sombras
                que existe apenas no código.
              </td>
              <td>
                <Link href="/fundamentos/tokens">Design tokens</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Primitivo</th>
              <td>
                A camada de baixo: o valor cru, sem dizer para que serve. <code>#c50007</code> é um
                primitivo. São {porCamada('primitivo')} tokens com prefixo{' '}
                <code>--ds-primitive-</code>. Não aplique primitivo direto em um componente.
              </td>
              <td>
                <Link href="/fundamentos/tokens">Design tokens</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Semântico</th>
              <td>
                A camada que diz <em>para que serve</em>, não <em>qual é</em>: fundo de botão
                primário, cor de texto de erro. São {porCamada('semantico')} tokens com prefixo{' '}
                <code>--ds-semantic-</code>, todos apontando para outra camada. É a camada que você
                aplica no dia a dia.
              </td>
              <td>
                <Link href="/fundamentos/cor">Cor</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Breakpoint</th>
              <td>
                A largura de tela em que o layout muda de comportamento. O sistema publica quatro:{' '}
                <code>0</code>, <code>640px</code>, <code>900px</code> e <code>1200px</code>.
              </td>
              <td>
                <Link href="/fundamentos/grid-e-layout">Grid e layout</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="componentes">Componentes e bibliotecas</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Termos de componentes e bibliotecas</caption>
          <thead>
            <tr>
              <th scope="col">Termo</th>
              <th scope="col">O que é</th>
              <th scope="col">Aprofunde em</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Componente</th>
              <td>
                Uma peça de interface pronta, com comportamento, estados e acessibilidade já
                resolvidos: botão, campo de texto, modal. São implementados em React, e o Figma
                publica 58 itens — a diferença são partes internas e átomos publicados no Figma que
                não viram componente de catálogo.
              </td>
              <td>
                <Link href="/componentes/visao-geral">Componentes</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Variante</th>
              <td>
                Um eixo de configuração do mesmo componente, com valores fechados. No{' '}
                <Link href="/componentes/button">Button</Link>, <code>variant</code> aceita{' '}
                <code>primary</code>, <code>secondary</code> e <code>tertiary</code>. Variante não é
                exceção: é uma opção prevista.
              </td>
              <td>
                <Link href="/componentes/visao-geral">Componentes</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Slot</th>
              <td>
                Um espaço do componente que recebe conteúdo de quem o usa. O componente decide onde
                o conteúdo fica e como se comporta; você decide o que entra. No Button, os slots são{' '}
                <code>children</code>, <code>iconStart</code> e <code>iconEnd</code>.
              </td>
              <td>
                <Link href="/componentes/button">Button</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Biblioteca</th>
              <td>
                Um arquivo do Figma publicado para os outros arquivos usarem. O sistema tem duas:
                Web Components (componentes e ícones) e Foundations (variables e logo).
              </td>
              <td>
                <Link href="/recursos/ferramentas">Ferramentas</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Instância</th>
              <td>
                A cópia de um componente da biblioteca colocada dentro de uma tela. Ela continua
                ligada ao original: quando o original muda, a instância recebe a atualização. Quebrar
                esse vínculo para “ajustar um detalhe” é o começo de toda divergência.
              </td>
              <td>—</td>
            </tr>
            <tr>
              <th scope="row">Componente publicado</th>
              <td>
                O componente que a biblioteca disponibiliza para quem a assina. O que não foi
                publicado existe só dentro do arquivo de origem. A Web Components tem 2.251 itens
                publicados: 58 componentes e 2.193 ícones.
              </td>
              <td>
                <Link href="/fundamentos/iconografia">Iconografia</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="ferramentas">Ferramentas do fluxo</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Termos das ferramentas de trabalho</caption>
          <thead>
            <tr>
              <th scope="col">Termo</th>
              <th scope="col">O que é</th>
              <th scope="col">Aprofunde em</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Figma</th>
              <td>
                A ferramenta de design onde o sistema é desenhado e de onde saem os tokens e os
                componentes. É a fonte do desenho — não do comportamento, que vive no código.
              </td>
              <td>
                <Link href="/recursos/ferramentas">Ferramentas</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Storybook</th>
              <td>
                O catálogo do código: mostra cada componente rodando de verdade, com os controles
                para trocar as propriedades. Publicado em{' '}
                <a href="https://sggdds.vercel.app" rel="noreferrer noopener" target="_blank">
                  sggdds.vercel.app ↗
                </a>
                .
              </td>
              <td>
                <Link href="/recursos/ferramentas">Ferramentas</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Story</th>
              <td>
                Um exemplo isolado de um componente em um estado específico, dentro do Storybook.
                Cada story tem URL própria — é o link que economiza metade da conversa num relato de
                defeito.
              </td>
              <td>
                <Link href="/recursos/suporte">Suporte</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Code Connect</th>
              <td>
                Recurso do Figma que amarra um componente do desenho ao trecho de código
                correspondente, para quem inspecionar a tela ver o import certo.{' '}
                <strong>Não está em uso aqui:</strong> não existe nenhum arquivo de Code Connect no
                repositório.
              </td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="codigo">Código e distribuição</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Termos de código e distribuição</caption>
          <thead>
            <tr>
              <th scope="col">Termo</th>
              <th scope="col">O que é</th>
              <th scope="col">Aprofunde em</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Monorepo</th>
              <td>
                Um repositório único que guarda vários pacotes que evoluem juntos. Aqui são dois:{' '}
                <code>packages/tokens</code> e <code>packages/react</code>.
              </td>
              <td>
                <Link href="/recursos/ferramentas">Ferramentas</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Peer dependency</th>
              <td>
                Dependência que o pacote exige mas não instala: quem instala é o projeto que consome.
                O sistema declara React e React DOM <code>^19.0.0</code> assim, para não existirem
                duas cópias do React na mesma página.
              </td>
              <td>
                <Link href="/recursos/instalacao">Instalação</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Changeset</th>
              <td>
                Um arquivo curto escrito junto com a mudança, dizendo o que mudou e qual o tamanho da
                mudança. Na hora de publicar, a ferramenta soma os changesets, calcula a versão e
                monta o changelog. O repositório tem Changesets instalado e nenhum changeset criado
                até hoje.
              </td>
              <td>
                <Link href="/recursos/changelog">Changelog</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">SemVer</th>
              <td>
                Versionamento semântico: três números no formato{' '}
                <code>maior.menor.correção</code>. O primeiro sobe quando algo quebra para quem já
                usa, o segundo quando algo novo aparece sem quebrar, o terceiro quando só se conserta
                um defeito. Os dois pacotes estão em <code>0.1.0</code> e não há nenhuma tag no
                repositório.
              </td>
              <td>
                <Link href="/introducao/governanca">Governança</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">SSG</th>
              <td>
                Geração estática: as páginas viram HTML durante o build, e não a cada visita. Esta
                Wiki é assim — enquanto você lê, nada é consultado no Figma nem no Storybook.
              </td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="acessibilidade">Acessibilidade</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Termos de acessibilidade</caption>
          <thead>
            <tr>
              <th scope="col">Termo</th>
              <th scope="col">O que é</th>
              <th scope="col">Aprofunde em</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">WCAG</th>
              <td>
                Web Content Accessibility Guidelines: as diretrizes internacionais de acessibilidade
                para conteúdo web. O sistema mede contraste e comportamento pela versão 2.1.
              </td>
              <td>
                <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">AA</th>
              <td>
                O nível intermediário da WCAG, e o patamar esperado em serviço público. Para texto,
                exige contraste de pelo menos 4,5:1 — ou 3:1 quando o texto é grande.
              </td>
              <td>
                <Link href="/fundamentos/cor">Cor</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">axe</th>
              <td>
                Motor que verifica acessibilidade automaticamente e aponta o que está errado no HTML
                gerado. Roda nos testes de 13 componentes e dentro do Storybook; os demais ainda não
                têm esse teste. Encontra parte dos problemas — nunca todos.
              </td>
              <td>
                <Link href="/recursos/ferramentas">Ferramentas</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Leitor de tela</th>
              <td>
                Programa que lê a interface em voz alta ou envia para uma linha braille, usado
                principalmente por pessoas cegas ou com baixa visão. Ele não enxerga o layout: depende
                de rótulo, ordem e semântica corretos.
              </td>
              <td>
                <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>
              </td>
            </tr>
            <tr>
              <th scope="row">Focus ring</th>
              <td>
                O contorno que marca qual elemento está selecionado pelo teclado. Sem ele, quem não
                usa mouse fica sem saber onde está. Nunca remova: no Button, ele tem 2px de espessura
                e 2px de afastamento, definidos por token.
              </td>
              <td>
                <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="faltou">Faltou um termo</h2>
      <p>
        Se você chegou aqui procurando uma palavra que não está na lista, isso é uma falha desta
        página, não sua. Abra uma issue dizendo qual termo procurava e em que contexto ele apareceu —
        ver <Link href="/recursos/suporte">Suporte</Link>.
      </p>
    </div>
  );
}
