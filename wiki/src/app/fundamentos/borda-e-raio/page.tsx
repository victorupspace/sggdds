import type { Metadata } from 'next';
import Link from 'next/link';

import { ListaDoDont } from '@/components/Blocos';
import { Trilha } from '@/components/Trilha';
import { TabelaTokens } from '@/components/TokensVisuais';
import { listarTokens, type TokenInventariado } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Borda e raio',
  description:
    'Escala de raio e larguras de borda do Sampa Design System: o que cada degrau significa, onde o sistema já aplica cada um e como consumir em Figma e código.',
};

/** Leitura de cada degrau. As chaves são cssVars reais da coleção Global: Core. */
const USO_RAIO: Record<string, string> = {
  '--ds-primitive-border-radius-radius-none':
    'Canto vivo, quando ele é intencional: conteúdo que encosta na lateral da tela e tabelas de dados densas.',
  '--ds-primitive-border-radius-radius-sm':
    'Elementos pequenos, em que 8px comeria o próprio conteúdo: caixa do Checkbox, Tooltip, opção de lista.',
  '--ds-primitive-border-radius-radius-md':
    'O degrau padrão de controle: botão, campo de texto, área de texto, Select, Alert, Toast e o anel de foco.',
  '--ds-primitive-border-radius-radius-lg':
    'Superfícies que contêm outros elementos: Card, Modal, Drawer, Cookie banner e a área de soltar arquivo.',
  '--ds-primitive-border-radius-radius-full':
    'Formas lidas como pílula ou círculo: Badge, Tag, trilho do Switch, barra de progresso, Avatar circular.',
};

const USO_LARGURA: Record<string, string> = {
  '--ds-primitive-border-width-border-none':
    'Ausência de borda declarada como decisão, não como esquecimento.',
  '--ds-primitive-border-width-border-sm':
    'A largura padrão: contorno de campo, card, tabela, Badge, Tag e Modal.',
  '--ds-primitive-border-width-border-md':
    'Ênfase e estado: campo em foco, controle de Checkbox e Radio, aro de Avatar, alça do Slider.',
  '--ds-primitive-border-width-border-lg':
    'Faixa lateral que carrega significado, como a barra colorida à esquerda do Alert.',
};

function porValor(tokens: TokenInventariado[]): Map<string, string[]> {
  const mapa = new Map<string, string[]>();
  for (const t of tokens) {
    const lista = mapa.get(t.valorResolvido) ?? [];
    lista.push(t.figmaPath);
    mapa.set(t.valorResolvido, lista);
  }
  return mapa;
}

export default function PaginaBordaERaio() {
  const tokens = listarTokens();
  const numero = (t: TokenInventariado) => Number.parseFloat(t.valorResolvido);

  const raios = tokens
    .filter((t) => t.cssVar.startsWith('--ds-primitive-border-radius-'))
    .sort((a, b) => numero(a) - numero(b));
  const larguras = tokens
    .filter((t) => t.cssVar.startsWith('--ds-primitive-border-width-'))
    .sort((a, b) => numero(a) - numero(b));

  const raiosDeComponente = tokens.filter(
    (t) => t.camada === 'componente' && t.cssVar.includes('border-radius'),
  );
  const largurasDeComponente = tokens.filter(
    (t) => t.camada === 'componente' && t.cssVar.includes('border-width'),
  );

  const usosRaio = porValor(raiosDeComponente);
  const usosLargura = porValor(largurasDeComponente);

  const raiosSemanticos = tokens.filter(
    (t) => t.camada === 'semantico' && t.cssVar.includes('border-radius'),
  );
  const coresDeBorda = tokens.filter((t) => t.cssVar.startsWith('--ds-semantic-color-border-'));
  const larguraComAliasErrado = largurasDeComponente.filter(
    (t) => t.aliasDe !== null && !t.aliasDe.includes('border-width'),
  );

  return (
    <div className="wiki-prosa">
      <Trilha
        passos={[
          { titulo: 'Fundamentos', href: '/fundamentos/visao-geral' },
          { titulo: 'Borda e raio' },
        ]}
      />

      <h1>Borda e raio</h1>
      <p className="wiki-prosa__resumo">
        Borda separa; raio suaviza. São os dois recursos que dizem, sem texto, onde uma superfície
        começa e onde ela termina. O sistema publica {raios.length} degraus de raio e{' '}
        {larguras.length} larguras de borda — e nada além disso.
      </p>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Raio e borda parecem detalhe até a tela ficar pronta. Aí o campo com canto de 6px ao lado do
        botão com canto de 10px denuncia que as duas peças vieram de lugares diferentes. Em serviço
        público isso pesa: quem acessa precisa reconhecer, sem pensar, que continua dentro do mesmo
        serviço do Estado.
      </p>
      <p>
        Borda também tem função de acessibilidade. Ela é o que delimita um campo para quem tem baixa
        visão e o que marca o estado de foco para quem navega por teclado. Reduzir a borda a um
        traço decorativo de 1px cinza-claro é uma decisão que exclui gente.
      </p>

      <h2 id="escala-raio">A escala de raio</h2>
      <p>
        {raios.length} degraus, de canto vivo a pílula. Cada amostra abaixo é renderizada com o
        próprio token — o que você vê é o valor que o navegador computa.
      </p>
      <div
        style={{
          display: 'grid',
          gap: 'var(--ds-primitive-spacing-16)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          marginBlockStart: 'var(--ds-primitive-spacing-16)',
        }}
      >
        {raios.map((t) => (
          <figure key={t.cssVar} style={{ margin: 0 }}>
            <div
              aria-hidden="true"
              style={{
                blockSize: '72px',
                background: 'var(--wiki-surface-subtle)',
                border: '1px solid var(--wiki-border-strong)',
                borderRadius: `var(${t.cssVar})`,
              }}
            />
            <figcaption
              style={{
                marginBlockStart: 'var(--ds-primitive-spacing-8)',
                color: 'var(--wiki-text-tertiary)',
                fontSize: 'var(--ds-primitive-typography-font-size-12)',
              }}
            >
              <code>{t.figmaPath.replace('border/radius/', '')}</code> · {t.valorResolvido}
            </figcaption>
          </figure>
        ))}
      </div>

      <h2 id="quando-usar">Quando usar cada degrau</h2>
      <p>
        A coluna <strong>Já usado em</strong> não é recomendação: é o que os{' '}
        {raiosDeComponente.length} tokens de raio da camada de componente resolvem hoje. Antes de
        escolher um degrau, veja em que companhia ele já está.
      </p>
      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Degraus de raio e onde se aplicam</caption>
          <thead>
            <tr>
              <th scope="col">Degrau</th>
              <th scope="col">Valor</th>
              <th scope="col">Quando usar</th>
              <th scope="col">Já usado em</th>
            </tr>
          </thead>
          <tbody>
            {raios.map((t) => {
              const usos = usosRaio.get(t.valorResolvido) ?? [];
              return (
                <tr key={t.cssVar}>
                  <td>
                    <code>{t.figmaPath.replace('border/radius/', '')}</code>
                  </td>
                  <td>
                    <code>{t.valorResolvido}</code>
                  </td>
                  <td>{USO_RAIO[t.cssVar]}</td>
                  <td>
                    {usos.length} {usos.length === 1 ? 'token' : 'tokens'} de componente
                    {usos.length ? <> — </> : null}
                    {usos.slice(0, 3).map((caminho, indice) => (
                      <span key={caminho}>
                        {indice > 0 ? ', ' : ''}
                        <code>{caminho}</code>
                      </span>
                    ))}
                    {usos.length > 3 ? ` e mais ${usos.length - 3}` : ''}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>
        A leitura resumida: <strong>campo e botão em 8px</strong>,{' '}
        <strong>superfície que contém outros elementos em 16px</strong>,{' '}
        <strong>pílula e círculo em 999px</strong>. Os 4px ficam para peças miúdas e os 0px, para
        onde o canto reto é intencional.
      </p>

      <h2 id="tokens-raio">Tokens de raio</h2>
      <TabelaTokens mostrarOrigem={false} tokens={raios} />

      <h2 id="larguras">Larguras de borda</h2>
      <p>
        {larguras.length} larguras, do zero declarado à faixa de destaque. A regra é a mesma da
        escala de raio: não existe valor intermediário.
      </p>
      <div
        style={{
          display: 'grid',
          gap: 'var(--ds-primitive-spacing-16)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          marginBlockStart: 'var(--ds-primitive-spacing-16)',
        }}
      >
        {larguras.map((t) => (
          <figure key={t.cssVar} style={{ margin: 0 }}>
            <div
              aria-hidden="true"
              style={{
                blockSize: '72px',
                background: 'var(--wiki-surface)',
                borderColor: 'var(--ds-semantic-color-border-neutral-prominent)',
                borderStyle: 'solid',
                borderWidth: `var(${t.cssVar})`,
                borderRadius: 'var(--ds-primitive-border-radius-radius-md)',
              }}
            />
            <figcaption
              style={{
                marginBlockStart: 'var(--ds-primitive-spacing-8)',
                color: 'var(--wiki-text-tertiary)',
                fontSize: 'var(--ds-primitive-typography-font-size-12)',
              }}
            >
              <code>{t.figmaPath.replace('border/width/', '')}</code> · {t.valorResolvido}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="wiki-tabela-rolagem" tabIndex={0}>
        <table className="wiki-tabela">
          <caption className="wiki-visualmente-oculto">Larguras de borda e onde se aplicam</caption>
          <thead>
            <tr>
              <th scope="col">Largura</th>
              <th scope="col">Valor</th>
              <th scope="col">Quando usar</th>
              <th scope="col">Já usada em</th>
            </tr>
          </thead>
          <tbody>
            {larguras.map((t) => {
              const usos = usosLargura.get(t.valorResolvido) ?? [];
              return (
                <tr key={t.cssVar}>
                  <td>
                    <code>{t.figmaPath.replace('border/width/', '')}</code>
                  </td>
                  <td>
                    <code>{t.valorResolvido}</code>
                  </td>
                  <td>{USO_LARGURA[t.cssVar]}</td>
                  <td>
                    {usos.length} {usos.length === 1 ? 'token' : 'tokens'} de componente
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 id="tokens-largura">Tokens de largura</h2>
      <TabelaTokens mostrarOrigem={false} tokens={larguras} />

      <h2 id="cor-da-borda">A cor da borda vem de outro lugar</h2>
      <p>
        Largura e raio são medidas; cor é significado. Os {coresDeBorda.length} tokens{' '}
        <code>--ds-semantic-color-border-*</code> cobrem neutro, marca, foco, sucesso, atenção, erro
        e informação, cada um com variação de repouso, hover, sutil e proeminente. Nunca escreva o
        hex: escolha o token pelo que ele significa. A lista completa está em{' '}
        <Link href="/fundamentos/cor">Cor</Link>.
      </p>

      <h2 id="foco">Borda, contorno e anel de foco</h2>
      <p>
        Borda e anel de foco são coisas diferentes e não devem competir. O anel de foco do sistema é
        um <code>outline</code> de{' '}
        <code>--ds-component-focus-ring-effect-width</code> (2px), afastado por{' '}
        <code>--ds-component-focus-ring-effect-offset</code> (2px), com raio de{' '}
        <code>--ds-component-focus-ring-border-radius</code> (8px) — o mesmo degrau dos controles,
        para o anel acompanhar a forma do elemento.
      </p>
      <p>
        O campo de texto reforça o próprio contorno no foco: sai de{' '}
        <code>--ds-component-input-border-width-default</code> (1px) para{' '}
        <code>--ds-component-input-border-width-focus</code> (2px). Essa mudança de largura é
        adicional ao anel, não substituta dele. Nunca remova o anel de foco para deixar a interface
        mais limpa.
      </p>

      <h2 id="nao-faca">O que não fazer</h2>
      <ListaDoDont
        pares={[
          {
            faca: 'Dê o mesmo raio a elementos com o mesmo papel e o mesmo porte: todos os campos de um formulário em 8px, todos os cards de uma lista em 16px.',
            naoFaca:
              'Alternar 4px e 8px entre campos do mesmo formulário, ou arredondar mais um card só porque ele é o destaque.',
            porque:
              'O olho lê diferença de raio como diferença de função. Raio inconsistente dentro de um agrupamento sugere uma hierarquia que não existe.',
          },
          {
            faca: 'Deixe o raio crescer junto com a superfície: controle em 8px, superfície que contém outros elementos em 16px.',
            naoFaca: 'Aplicar 16px em um botão ou 8px em um modal apenas para variar.',
            porque: `É assim que o sistema já se comporta: ${usosRaio.get('8px')?.length ?? 0} tokens de componente resolvem em 8px e ${usosRaio.get('16px')?.length ?? 0} resolvem em 16px.`,
          },
          {
            faca: 'Use radius-full só quando a forma inteira é pílula ou círculo: Badge, Tag, trilho do Switch, Avatar circular.',
            naoFaca: 'Usar radius-full em um card, um alerta ou qualquer bloco alto de conteúdo.',
            porque:
              '999px não significa "bem arredondado", significa "arredonde até o limite". Em uma superfície alta o resultado são laterais deformadas.',
          },
          {
            faca: 'Quando um elemento encosta na borda interna do contêiner, dê a ele um raio menor que o do contêiner.',
            naoFaca: 'Repetir o mesmo raio no contêiner e no elemento colado nele.',
            porque:
              'Dois raios iguais encaixados deixam uma fresta visível no canto. Com preenchimento entre os dois, o problema não aparece.',
          },
        ]}
      />

      <h2 id="uso-figma">Como usar no Figma</h2>
      <p>
        Os {raios.length} raios e as {larguras.length} larguras estão na collection{' '}
        <code>Global: Core</code>, sob <code>border/radius/*</code> e <code>border/width/*</code>,
        publicada na biblioteca <strong>Foundations</strong>. Nos campos de canto e de traço, aplique
        a variable pela lista — não digite o número. Se você precisou digitar, o degrau que faltou é
        uma decisão de sistema, não uma escolha de arquivo.
      </p>
      <p>
        Os valores já resolvidos por componente ficam na collection{' '}
        <code>T3: Components</code>, com nomes como <code>button/border/radius</code> e{' '}
        <code>card/border/width</code>. Use essa camada apenas quando estiver construindo o próprio
        componente do sistema.
      </p>

      <h2 id="uso-codigo">Como usar em código</h2>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`/* superfície que contém outros elementos */
.cartao {
  border: var(--ds-primitive-border-width-border-sm) solid
    var(--ds-semantic-color-border-neutral-subtle);
  border-radius: var(--ds-primitive-border-radius-radius-lg);
}

/* controle */
.campo {
  border: var(--ds-primitive-border-width-border-sm) solid
    var(--ds-semantic-color-border-neutral-prominent);
  border-radius: var(--ds-primitive-border-radius-radius-md);
}

.campo:focus-visible {
  border-width: var(--ds-primitive-border-width-border-md);
  outline: var(--ds-component-focus-ring-effect-width) solid
    var(--ds-component-focus-ring-color-ring);
  outline-offset: var(--ds-component-focus-ring-effect-offset);
}

/* pílula */
.etiqueta {
  border-radius: var(--ds-primitive-border-radius-radius-full);
}`}</code>
      </pre>
      <p>
        Um detalhe do valor emitido: <code>radius-none</code> sai como <code>0</code>, sem unidade, e{' '}
        <code>border-none</code> também. Em <code>border-width</code> isso funciona; em atalhos como{' '}
        <code>border: var(--ds-primitive-border-width-border-none) solid …</code> o zero sem unidade
        continua válido em CSS.
      </p>

      <h2 id="divergencias">Divergências conhecidas</h2>
      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Não existe camada semântica de raio</p>
        <p>
          O sistema tem {raios.length} tokens primitivos de raio, {raiosSemanticos.length}{' '}
          semânticos e {raiosDeComponente.length} de componente — e todos os de componente apontam
          direto para o primitivo, pulando a camada do meio. Isso quebra a cadeia descrita em{' '}
          <Link href="/fundamentos/tokens">Design tokens</Link> e tem um custo prático: não há como
          dizer &ldquo;raio de superfície&rdquo; ou &ldquo;raio de controle&rdquo; sem citar o valor.
          Quem constrói uma tela nova precisa escolher entre <code>radius-md</code> e{' '}
          <code>radius-lg</code> por conta própria.
        </p>
      </div>

      {larguraComAliasErrado.length ? (
        <div className="wiki-aviso">
          <p className="wiki-aviso__titulo">
            {larguraComAliasErrado.length} tokens de largura apontam para espaçamento
          </p>
          <p>
            Estes tokens de borda referenciam variables de <strong>espaçamento</strong> em vez de{' '}
            <code>border/width</code>. O valor final coincide, mas o vínculo está errado na origem:
            uma mudança na escala de espaçamento mexeria na espessura da borda.
          </p>
          <ul className="wiki-lista-tokens">
            {larguraComAliasErrado.map((t) => (
              <li key={t.cssVar}>
                <code>{t.figmaPath}</code> → <code>{t.aliasDe}</code>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p>
        Não existe token de <strong>estilo</strong> de borda em nenhuma camada: sólida, tracejada e
        pontilhada não são decisões do sistema hoje. Onde uma borda tracejada aparecer, ela está
        escrita no CSS do componente.
      </p>

      <h2 id="pendencias">Pendência conhecida</h2>
      <p className="wiki-pendente">
        ⚠️ <strong>PENDENTE:</strong> não existe regra publicada de raio aninhado — como calcular o
        raio de um elemento interno a partir do raio do contêiner e do preenchimento entre eles. A
        orientação dada acima em &ldquo;O que não fazer&rdquo; é uma proposta desta documentação, não
        uma definição oficial — fonte: time. Registrado em <code>LACUNAS.md</code>.
      </p>
    </div>
  );
}
