import type { Metadata } from 'next';
import Link from 'next/link';

import { Trilha } from '@/components/Trilha';
import { listarTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Ferramentas',
  description:
    'O que cada pessoa precisa ter para trabalhar com o Sampa Design System: bibliotecas do Figma, Storybook, repositório, verificação de acessibilidade e esta Wiki.',
};

const FIGMA_WEB = 'https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components';
const FIGMA_FOUNDATIONS = 'https://www.figma.com/design/3IPhcwjiNpG6PXVmdG2x3x/Foundations';
const STORYBOOK = 'https://sggdds.vercel.app';
const REPO = 'https://github.com/victorupspace/sggdds';

export default function PaginaFerramentas() {
  const tokens = listarTokens();

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[{ titulo: 'Recursos', href: '/recursos/ferramentas' }, { titulo: 'Ferramentas' }]}
      />

      <h1>Ferramentas</h1>
      <p className="wiki-prosa__resumo">
        São cinco ferramentas, e nenhuma substitui a outra: o Figma tem o desenho, o Storybook tem o
        comportamento, o repositório tem o código, os verificadores de acessibilidade dizem se o
        resultado serve, e esta Wiki diz por que cada decisão é assim. Esta página mostra como obter
        e usar cada uma.
      </p>

      <h2 id="por-onde-comecar">Por onde começar</h2>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Ferramentas por tipo de trabalho</caption>
          <thead>
            <tr>
              <th scope="col">Se você</th>
              <th scope="col">Precisa de</th>
              <th scope="col">Para</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Desenha telas</th>
              <td>Figma com as duas bibliotecas ativas, e esta Wiki</td>
              <td>Montar telas com componentes e variables reais, sem redesenhar o que existe</td>
            </tr>
            <tr>
              <th scope="row">Escreve código de produto</th>
              <td>Storybook, repositório e esta Wiki</td>
              <td>Ver o componente rodando, ler a API e instalar a biblioteca</td>
            </tr>
            <tr>
              <th scope="row">Mantém o Design System</th>
              <td>Tudo acima, mais os verificadores de acessibilidade</td>
              <td>Alterar tokens e componentes sem quebrar quem já consome</td>
            </tr>
            <tr>
              <th scope="row">Revisa ou testa</th>
              <td>Storybook, teclado, leitor de tela e esta Wiki</td>
              <td>Conferir estado, foco, contraste e comportamento antes de publicar</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="wiki-cartoes">
        <a className="wiki-cartao" href={FIGMA_WEB} rel="noreferrer noopener" target="_blank">
          <span className="wiki-cartao__titulo">Figma · Web Components ↗</span>
          <span className="wiki-cartao__descricao">
            58 componentes e 2.193 ícones publicados.
          </span>
        </a>
        <a className="wiki-cartao" href={FIGMA_FOUNDATIONS} rel="noreferrer noopener" target="_blank">
          <span className="wiki-cartao__titulo">Figma · Foundations ↗</span>
          <span className="wiki-cartao__descricao">
            Variables de cor, tipografia, espaçamento e raio, e o logo oficial.
          </span>
        </a>
        <a className="wiki-cartao" href={STORYBOOK} rel="noreferrer noopener" target="_blank">
          <span className="wiki-cartao__titulo">Storybook ↗</span>
          <span className="wiki-cartao__descricao">
            Os componentes React rodando, com controles e painel de acessibilidade.
          </span>
        </a>
        <a className="wiki-cartao" href={REPO} rel="noreferrer noopener" target="_blank">
          <span className="wiki-cartao__titulo">Repositório ↗</span>
          <span className="wiki-cartao__descricao">
            Código-fonte público sob licença MIT: tokens, componentes e esta Wiki.
          </span>
        </a>
      </div>

      <h2 id="figma">Figma</h2>
      <p>
        O desenho do sistema vive em dois arquivos, publicados como bibliotecas. Os dois são
        necessários: um sem o outro produz tela com componente certo e cor errada, ou o contrário.
      </p>

      <h3 id="figma-web-components">Web Components</h3>
      <p>
        A biblioteca de componentes e ícones. Tem <strong>2.251 itens publicados</strong>: 58
        componentes e 2.193 ícones. Os 58 não correspondem um a um aos componentes React — parte
        deles é peça interna de outro componente, como{' '}
        <code>. Table Row</code> ou <code>. Checkbox Control</code>, e não vira componente de
        catálogo. Quatro componentes do código (<code>back-to-top</code>, <code>list-item</code>,{' '}
        <code>meganav</code> e <code>skeleton</code>) não têm par publicado no Figma.
      </p>

      <h3 id="figma-foundations">Foundations</h3>
      <p>
        A biblioteca das decisões de base: as variables de cor, tipografia, espaçamento e raio, e o
        logo oficial. As variables do Figma são a origem dos{' '}
        {tokens.length.toLocaleString('pt-BR')} tokens do sistema e estão organizadas em quatro
        collections:
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Collections de variables do Figma</caption>
          <thead>
            <tr>
              <th scope="col">Collection</th>
              <th scope="col">Camada no código</th>
              <th scope="col">Tokens</th>
              <th scope="col">O que guarda</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>Global: Core</code>
              </td>
              <td>
                <code>--ds-primitive-*</code>
              </td>
              <td>114</td>
              <td>Valores crus: escalas de cor, espaçamento, borda, breakpoint e tipografia</td>
            </tr>
            <tr>
              <td>
                <code>T1: Sampa Design System</code>
              </td>
              <td>
                <code>--ds-brand-*</code>
              </td>
              <td>44</td>
              <td>As cores e a tipografia da marca do Estado</td>
            </tr>
            <tr>
              <td>
                <code>T2: Semantics</code>
              </td>
              <td>
                <code>--ds-semantic-*</code>
              </td>
              <td>116</td>
              <td>O significado de cada valor: fundo, texto, borda, estado</td>
            </tr>
            <tr>
              <td>
                <code>T3: Components</code>
              </td>
              <td>
                <code>--ds-component-*</code>
              </td>
              <td>1.192</td>
              <td>Um valor por parte e estado de cada componente</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Ao desenhar, aplique a variable semântica — nunca a primitiva direto num componente. A regra
        e os valores estão em <Link href="/fundamentos/tokens">Design tokens</Link>.
      </p>

      <h3 id="figma-assinar">Como assinar as bibliotecas</h3>
      <ol>
        <li>Abra o arquivo do Figma em que você vai trabalhar.</li>
        <li>
          No painel <strong>Assets</strong>, abra <strong>Libraries</strong>.
        </li>
        <li>
          Ative <strong>Web Components</strong> e <strong>Foundations</strong>. Depois disso, os
          componentes aparecem no painel de assets e as variables aparecem nos seletores de cor,
          texto e espaçamento.
        </li>
        <li>
          Use sempre <strong>instância</strong> da biblioteca, e não cópia solta. Instância recebe
          correção; cópia vira divergência silenciosa.
        </li>
      </ol>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> como pedir acesso aos arquivos do Figma — quem concede, em qual
        organização ou time os arquivos estão, e se as bibliotecas estão liberadas para toda a
        organização ou apenas por convite — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="storybook">Storybook</h2>
      <p>
        O Storybook é o catálogo do código: cada componente rodando de verdade, no navegador, com os
        estados isolados. É onde se confere comportamento — o Figma mostra como a peça deve parecer,
        o Storybook mostra o que ela realmente faz. Está publicado em{' '}
        <a href={STORYBOOK} rel="noreferrer noopener" target="_blank">
          sggdds.vercel.app ↗
        </a>{' '}
        e roda a versão mais recente da <code>main</code>. Não exige instalação nem login.
      </p>

      <h3 id="ler-story">Como ler uma story</h3>
      <p>
        Cada componente aparece na lateral sob <code>Web Components/</code>, e dentro dele ficam as
        stories — um exemplo por estado ou variante. Ao abrir uma:
      </p>
      <ul>
        <li>
          <strong>Docs</strong> reúne a descrição, a tabela de propriedades e todas as stories do
          componente numa página só. É por onde começar.
        </li>
        <li>
          <strong>Canvas</strong> mostra uma story sozinha, sem a moldura da documentação. É a visão
          para inspecionar o HTML no navegador.
        </li>
        <li>
          <strong>Controls</strong> lista as propriedades editáveis. Mude o valor e o exemplo muda na
          hora — é a forma mais rápida de descobrir o que uma prop faz antes de escrever código.
        </li>
        <li>
          <strong>A URL é sua.</strong> Toda story tem endereço próprio, no formato{' '}
          <code>?path=/docs/web-components-button--docs</code>. Copiar essa URL é o jeito de mostrar
          exatamente o caso de que você está falando.
        </li>
      </ul>
      <p>
        As páginas de componente desta Wiki já incorporam a story correspondente, então na maioria
        das vezes você não precisa sair daqui — ver{' '}
        <Link href="/componentes/visao-geral">Componentes</Link>.
      </p>

      <h3 id="storybook-a11y">O painel de acessibilidade</h3>
      <p>
        O Storybook do sistema já roda o addon de acessibilidade em todas as stories: ele executa a
        verificação automática sobre o HTML renderizado e mostra o resultado num painel próprio,
        separado em violações, aprovações e itens que precisam de conferência humana.
      </p>
      <p>
        Duas leituras importantes: <strong>violação encontrada é problema real</strong> — trate antes
        de subir; e <strong>painel limpo não é conformidade</strong>. A verificação automática não
        avalia ordem de leitura, clareza de rótulo, foco preso num modal ou sentido do texto
        alternativo. Isso só o teste manual encontra.
      </p>

      <h2 id="repositorio">Repositório</h2>
      <p>
        Todo o código é público, sob licença MIT, em{' '}
        <a href={REPO} rel="noreferrer noopener" target="_blank">
          github.com/victorupspace/sggdds ↗
        </a>
        . É um monorepo com pnpm: um repositório, vários pacotes que evoluem juntos.
      </p>

      <h3 id="repositorio-estrutura">Como está organizado</h3>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Estrutura do repositório</caption>
          <thead>
            <tr>
              <th scope="col">Caminho</th>
              <th scope="col">O que tem</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>packages/tokens</code>
              </td>
              <td>
                Os exports das collections do Figma em <code>src/raw</code>, o script que normaliza e
                constrói, e as saídas <code>dist/css/tokens.css</code> e{' '}
                <code>dist/json/tokens.json</code>. É o pacote <code>@government/tokens</code>,
                ainda não publicado no npm.
              </td>
            </tr>
            <tr>
              <td>
                <code>packages/react</code>
              </td>
              <td>
                Os componentes. Um diretório por componente, com o{' '}
                <code>.tsx</code>, os tipos, o CSS, as stories e os testes lado a lado. É o pacote{' '}
                <code>@government/design-system</code>, ainda não publicado no npm — ver{' '}
                <Link href="/recursos/instalacao">Instalação</Link>.
              </td>
            </tr>
            <tr>
              <td>
                <code>.storybook</code>
              </td>
              <td>Configuração do Storybook e dos addons de documentação, acessibilidade e teste.</td>
            </tr>
            <tr>
              <td>
                <code>docs</code>
              </td>
              <td>Páginas de documentação técnica exibidas dentro do Storybook.</td>
            </tr>
            <tr>
              <td>
                <code>platforms</code> e <code>showcase</code>
              </td>
              <td>
                As implementações para iOS (Swift Package) e Android (módulos Gradle), e as telas de
                demonstração dessas plataformas dentro do Storybook.
              </td>
            </tr>
            <tr>
              <td>
                <code>wiki</code>
              </td>
              <td>Esta documentação.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Para rodar localmente, ver <Link href="/recursos/instalacao">Instalação</Link>.
      </p>

      <h3 id="repositorio-ci">O que o CI verifica</h3>
      <p>
        Todo pull request para a <code>main</code> — e todo push nela — dispara quatro verificações
        independentes. Se qualquer uma falhar, a mudança não entra.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Verificações automáticas do CI</caption>
          <thead>
            <tr>
              <th scope="col">Verificação</th>
              <th scope="col">Comando</th>
              <th scope="col">O que pega</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Lint</th>
              <td>
                <code>pnpm lint</code>
              </td>
              <td>Padrão de código e regras de React que costumam virar defeito</td>
            </tr>
            <tr>
              <th scope="row">Typecheck</th>
              <td>
                <code>pnpm typecheck</code>
              </td>
              <td>Erro de tipo em qualquer pacote, inclusive na API pública dos componentes</td>
            </tr>
            <tr>
              <th scope="row">Testes</th>
              <td>
                <code>pnpm test</code>
              </td>
              <td>
                Testes unitários e os testes de acessibilidade com axe dos componentes que já os têm
              </td>
            </tr>
            <tr>
              <th scope="row">Build</th>
              <td>
                <code>pnpm build</code>
              </td>
              <td>Que os tokens e a biblioteca realmente constroem, na ordem certa</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Rode os quatro na sua máquina antes de abrir o pull request — é mais rápido do que esperar o
        CI reprovar:
      </p>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`corepack pnpm install
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build`}</code>
      </pre>

      <h2 id="acessibilidade">Verificação de acessibilidade</h2>
      <p>
        Nenhuma ferramenta sozinha diz que uma interface é acessível. O caminho é sempre o mesmo:
        automático primeiro, porque é barato e pega o óbvio; teclado depois, porque revela o que a
        automação não vê; leitor de tela por último, porque é o teste que mais se aproxima do uso
        real.
      </p>

      <h3 id="a11y-axe">axe — verificação automática</h3>
      <p>
        O axe roda em dois lugares: dentro do Storybook, no painel de acessibilidade, e nos testes do
        repositório. Hoje <strong>13 componentes</strong> têm arquivo de teste de acessibilidade —{' '}
        <code>Button</code>, <code>Carousel</code>, <code>Checkbox</code>,{' '}
        <code>CookieConsentBanner</code>, <code>Datepicker</code>, <code>Dropdown</code>,{' '}
        <code>FileUpload</code>, <code>Meganav</code>, <code>Modal</code>, <code>Radio</code>,{' '}
        <code>Tabs</code>, <code>TextInput</code> e <code>Toggle</code>. Os demais não têm.
      </p>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">O que a cobertura de 13 componentes significa</p>
        <p>
          Significa que, para os outros componentes, ninguém pode afirmar conformidade com base em
          teste automatizado. Não significa que eles sejam inacessíveis — significa que não foram
          verificados. Ao usar um componente sem teste, faça a verificação manual descrita abaixo e
          relate o que encontrar. Ver{' '}
          <Link href="/fundamentos/acessibilidade">Acessibilidade</Link>.
        </p>
      </div>

      <h3 id="a11y-teclado">Teclado</h3>
      <p>
        Não exige ferramenta nenhuma: guarde o mouse e percorra a tela inteira. O roteiro mínimo:
      </p>
      <ol>
        <li>
          <strong>Tab</strong> percorre todos os elementos interativos, na mesma ordem em que eles
          aparecem na tela.
        </li>
        <li>
          <strong>O foco é sempre visível.</strong> Se você perdeu de vista onde está, quem depende do
          teclado também perdeu.
        </li>
        <li>
          <strong>Enter e Espaço</strong> acionam o que está focado, sem surpresa.
        </li>
        <li>
          <strong>Esc</strong> fecha o que abriu por cima — modal, dropdown, calendário — e o foco
          volta para o elemento que abriu.
        </li>
        <li>
          <strong>Nada prende o foco</strong> fora de um modal aberto, e nada fica inalcançável.
        </li>
      </ol>

      <h3 id="a11y-leitor">Leitor de tela</h3>
      <p>
        O leitor de tela não enxerga o layout: ele anuncia o que a estrutura diz. Por isso ele
        encontra o que nenhuma outra verificação encontra — botão sem nome, campo sem rótulo ligado,
        erro que aparece na tela mas nunca é anunciado, ordem de leitura que não faz sentido.
      </p>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> qual leitor de tela é a referência de teste do sistema, em qual
        sistema operacional e navegador, e qual o roteiro mínimo de verificação manual antes de
        publicar um componente — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>

      <h2 id="wiki">Esta Wiki</h2>
      <p>
        A Wiki é a fonte de <em>por que</em>: quando usar cada componente, o que a cor significa, o
        que ainda não está decidido. Ela é gerada estaticamente a partir dos dados extraídos do
        código, dos tokens e do Figma — não consulta nada enquanto você lê.
      </p>

      <h3 id="wiki-buscar">Como buscar</h3>
      <ul>
        <li>
          O campo de busca fica no topo de qualquer página e procura no texto inteiro do site a
          partir de duas letras.
        </li>
        <li>
          A lateral esquerda tem a árvore completa: fundamentos, os componentes, padrões e recursos.
        </li>
        <li>
          A lateral direita tem o índice da página aberta — útil nas páginas longas de fundamento e
          de componente.
        </li>
        <li>
          Não achou pelo nome do componente? Procure pelo problema: “erro”, “vazio”, “filtro”. Os
          nomes de código nem sempre são a palavra que você tem na cabeça.
        </li>
      </ul>

      <h3 id="wiki-reportar">Como reportar um erro na documentação</h3>
      <p>
        Documentação errada é pior que documentação ausente, porque é seguida. Se algo aqui estiver
        errado, desatualizado ou impossível de entender,{' '}
        <a href={`${REPO}/issues/new`} rel="noreferrer noopener" target="_blank">
          abra uma issue ↗
        </a>{' '}
        com três informações:
      </p>
      <ol>
        <li>
          <strong>A URL da página</strong> e o título da seção — o endereço de cada seção termina com{' '}
          <code>#</code> mais o nome dela.
        </li>
        <li>
          <strong>O trecho exato</strong> que está errado, copiado e colado.
        </li>
        <li>
          <strong>O que você esperava ler</strong>, ou onde encontrou a informação correta.
        </li>
      </ol>
      <p>
        Se a informação simplesmente não existe, vale relatar do mesmo jeito: as lacunas conhecidas
        estão registradas e uma pergunta repetida é o sinal de que alguma delas precisa subir de
        prioridade. Os outros canais estão em <Link href="/recursos/suporte">Suporte</Link>.
      </p>
    </div>
  );
}
