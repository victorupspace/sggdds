import type { Metadata } from 'next';

import { Trilha } from '@/components/Trilha';
import {
  ListaCores,
  ListaNomesToken,
  MatrizContraste,
  Rampa,
  type DegrauRampa,
  type ParContraste,
} from '@/components/TokensVisuais';
import { listarTokens, metaTokens } from '@/lib/dados';

export const metadata: Metadata = {
  title: 'Cor',
  description:
    'Paleta do Sampa Design System: cores de marca, primitivas e semânticas, com matriz de contraste WCAG 2.1 calculada sobre os valores reais dos tokens.',
};

export default function PaginaCor() {
  const tokens = listarTokens();

  const hex = (t: (typeof tokens)[number]) =>
    t.tipo === 'color' && t.valorResolvido.startsWith('#');

  // Famílias com degrau numérico viram rampa; o resto vira lista.
  const rampas = new Map<string, DegrauRampa[]>();
  const avulsas: typeof tokens = [];

  for (const t of tokens) {
    if (!hex(t) || (t.camada !== 'marca' && t.camada !== 'primitivo')) continue;
    const casa = /^(.*?)[-/]?(\d{2,3})$/.exec(t.figmaPath);
    if (casa) {
      // Os dois grupos de captura são obrigatórios na regex, então sempre
      // existem quando `casa` é truthy.
      const familia = (casa[1] ?? '').replace(/[-/]$/, '');
      rampas.set(familia, [...(rampas.get(familia) ?? []), { degrau: casa[2] ?? '', token: t }]);
    } else {
      avulsas.push(t);
    }
  }

  for (const degraus of rampas.values()) {
    degraus.sort((a, b) => Number(a.degrau) - Number(b.degrau));
  }

  const rampaDe = (familia: string) => rampas.get(familia) ?? [];
  const marca = avulsas.filter((t) => t.figmaPath.startsWith('color/brand/'));
  const identidade = avulsas.filter((t) => t.figmaPath.startsWith('color/identity/'));
  const outrasAvulsas = avulsas.filter(
    (t) => !t.figmaPath.startsWith('color/brand/') && !t.figmaPath.startsWith('color/identity/'),
  );
  const fundos = tokens.filter((t) => t.cssVar.startsWith('--ds-semantic-color-background-'));
  const textos = tokens.filter(
    (t) => t.cssVar.startsWith('--ds-semantic-text-style-content-color-typography-'),
  );

  const valor = (nome: string) =>
    tokens.find((t) => t.cssVar === nome)?.valorResolvido ?? '#000000';

  const paresTexto: ParContraste[] = [
    {
      rotuloTexto: 'typography/primary',
      corTexto: valor('--ds-semantic-text-style-content-color-typography-primary'),
      rotuloFundo: 'background/neutral/white',
      corFundo: '#ffffff',
      contexto: 'Texto corrido em fundo branco',
    },
    {
      rotuloTexto: 'typography/secondary',
      corTexto: valor('--ds-semantic-text-style-content-color-typography-secondary'),
      rotuloFundo: 'background/neutral/white',
      corFundo: '#ffffff',
      contexto: 'Texto de apoio',
    },
    {
      rotuloTexto: 'typography/tertiary',
      corTexto: valor('--ds-semantic-text-style-content-color-typography-tertiary'),
      rotuloFundo: 'background/neutral/white',
      corFundo: '#ffffff',
      contexto: 'Legendas e metadados',
    },
    {
      rotuloTexto: 'typography/disabled',
      corTexto: valor('--ds-semantic-text-style-content-color-typography-disabled'),
      rotuloFundo: 'background/neutral/white',
      corFundo: '#ffffff',
      contexto: 'Campos e botões desabilitados',
    },
    {
      rotuloTexto: 'typography/brand',
      corTexto: valor('--ds-semantic-text-style-content-color-typography-brand'),
      rotuloFundo: 'background/neutral/white',
      corFundo: '#ffffff',
      contexto: 'Texto de marca — ver alerta abaixo',
    },
    {
      rotuloTexto: 'typography/success',
      corTexto: valor('--ds-semantic-text-style-content-color-typography-success'),
      rotuloFundo: 'background/neutral/white',
      corFundo: '#ffffff',
      contexto: 'Mensagens de sucesso',
    },
    {
      rotuloTexto: 'typography/danger',
      corTexto: valor('--ds-semantic-text-style-content-color-typography-danger'),
      rotuloFundo: 'background/neutral/white',
      corFundo: '#ffffff',
      contexto: 'Mensagens de erro',
    },
    {
      rotuloTexto: 'typography/inverse',
      corTexto: valor('--ds-semantic-text-style-content-color-typography-inverse'),
      rotuloFundo: 'brand/primary/default',
      corFundo: valor('--ds-semantic-color-background-brand-primary-default'),
      contexto: 'Texto branco sobre botão primário',
    },
    {
      rotuloTexto: 'typography/inverse',
      corTexto: '#ffffff',
      rotuloFundo: 'brand/red (marca)',
      corFundo: valor('--ds-brand-color-brand-red'),
      contexto:
        'Não usar: o vermelho do logotipo é marca gráfica, não superfície de texto',
    },
    {
      rotuloTexto: 'typography/inverse',
      corTexto: '#ffffff',
      rotuloFundo: 'background/neutral/soft-black',
      corFundo: valor('--ds-semantic-color-background-neutral-soft-black'),
      contexto: 'Texto em superfícies escuras',
    },
  ];

  const tokensVermelhoMarca = tokens.filter(
    (t) => t.valorResolvido.toLowerCase() === '#ff161f' && t.cssVar !== '--ds-brand-color-brand-red',
  );
  const tokensCorrigidos =
    (metaTokens() as { tokensCorrigidosPorAcessibilidade?: number })
      .tokensCorrigidosPorAcessibilidade ?? 0;

  return (
    <div className="wiki-prosa">
      <Trilha passos={[{ titulo: 'Fundamentos', href: '/fundamentos/visao-geral' }, { titulo: 'Cor' }]} />

      <h1>Cor</h1>
      <p className="wiki-prosa__resumo">
        A cor no Sampa Design System cumpre três funções: identificar a marca do Governo do Estado
        de São Paulo, hierarquizar a informação e comunicar estado. Toda cor da interface vem de um
        token — nenhum valor é escrito à mão.
      </p>

      <h2 id="por-que-importa">Por que importa</h2>
      <p>
        Em serviço público, cor não é preferência estética: é acessibilidade e é confiança. Quem
        acessa um serviço do Estado precisa reconhecer que está no lugar certo e precisa conseguir
        ler o que está escrito — inclusive com baixa visão, em tela de celular sob sol, ou com
        daltonismo. Por isso a paleta é auditada por contraste e a cor nunca é o único portador de
        significado.
      </p>

      <h2 id="marca">Cores de marca</h2>
      <p>
        O vermelho <code>#FF161F</code> é a cor da marca — a mesma do logotipo oficial. Ela
        identifica o Estado e é usada em superfícies, elementos gráficos e destaques grandes.
      </p>
      <ListaCores tokens={marca} />

      <div className="wiki-aviso">
        <p className="wiki-aviso__titulo">Duas cores de marca, dois papéis</p>
        <p>
          O sistema publica <code>color/brand/red</code> (<code>#FF161F</code>, a cor do logotipo) e{' '}
          <code>color/brand/red-primary</code> (<code>#C50007</code>). A primeira mede 3,90:1 sobre
          branco e não atinge WCAG AA para texto normal; a segunda mede 6,22:1 e atinge. A regra é
          direta: <strong>#FF161F identifica a marca</strong> — logotipo, superfícies e elementos
          gráficos grandes — e <strong>#C50007 escreve</strong>, em texto e controles pequenos.
        </p>
        <p style={{ marginBlockStart: 'var(--ds-primitive-spacing-8)' }}>
          Essa regra passou a valer no código em 6 de agosto de 2026:{' '}
          <strong>{tokensCorrigidos} tokens</strong> que formavam pares abaixo de 4,5:1 foram
          corrigidos, e nenhum token de texto aponta mais para a cor do logotipo. As correções ainda
          precisam ser espelhadas no Figma — ver <code>CORRECOES-ACESSIBILIDADE.md</code> e{' '}
          <code>INCONSISTENCIAS.md</code> §7 item 49.
        </p>
      </div>

      <h3 id="onde-ff161f">Onde #FF161F é usado</h3>
      <p>
        Depois da correção, a cor do logotipo aparece apenas como raiz da marca e em superfícies —
        nunca em texto.
      </p>
      <ListaNomesToken nomes={tokensVermelhoMarca.map((t) => t.cssVar)} />

      <h2 id="utilitarias">Cores utilitárias</h2>
      <p>
        Comunicam estado: sucesso, erro, atenção e informação. Cada família é uma rampa — o degrau
        baixo serve de fundo, o alto serve de texto e de borda. Nunca use cor sozinha para
        transmitir estado: sempre acompanhe de ícone e texto.
      </p>
      <Rampa
        degraus={rampaDe('color/utility/sucess/green')}
        descricao="Confirmação, conclusão e estados positivos. A grafia com um “c” só vem do Figma e está registrada como divergência."
        nome="color/utility/sucess/green"
      />
      <Rampa
        degraus={rampaDe('color/utility/danger/red')}
        descricao="Erro, falha e ação destrutiva."
        nome="color/utility/danger/red"
      />
      <Rampa
        degraus={rampaDe('color/utility/warning/yellow')}
        descricao="Atenção e pendência. O degrau 400 é o mais escuro disponível e ainda assim não atinge AA sobre o fundo 50 — ver a matriz abaixo."
        nome="color/utility/warning/yellow"
      />
      <Rampa
        degraus={rampaDe('color/utility/info/blue')}
        descricao="Informação neutra e destaque não crítico."
        nome="color/utility/info/blue"
      />

      <h2 id="neutras">Neutras</h2>
      <p>
        Sustentam a maior parte da interface: texto, bordas, fundos e superfícies. Dez degraus, do
        quase branco ao quase preto.
      </p>
      <Rampa degraus={rampaDe('color/neutral/grey')} nome="color/neutral/grey" />

      <h3 id="neutras-avulsas">Neutras sem escala</h3>
      <ListaCores tokens={outrasAvulsas} />

      <h2 id="identidade">Cores de identidade</h2>
      <p>
        Herdadas da identidade visual do Estado. Aparecem em contextos institucionais específicos e
        não fazem parte da paleta de interface do dia a dia.
      </p>
      <ListaCores tokens={identidade} />

      <h2 id="contraste">Matriz de contraste</h2>
      <p>
        Calculada nesta página, em tempo de build, a partir do valor real de cada token. Referência:
        WCAG 2.1 — 4,5:1 para texto normal (AA), 3:1 para texto grande, 7:1 para AAA.
      </p>
      <MatrizContraste pares={paresTexto} />

      <h2 id="uso-figma">Como usar no Figma</h2>
      <p>
        As cores estão nas collections <code>T1: Sampa Design System</code> (marca),{' '}
        <code>Global: Core</code> (primitivas) e <code>T2: Semantics</code> (semânticas), na
        biblioteca <strong>Foundations</strong>. Aplique sempre a variable semântica — nunca a
        primitiva diretamente em um componente.
      </p>

      <h2 id="uso-codigo">Como usar em código</h2>
      <pre className="wiki-codigo" tabIndex={0}>
        <code>{`.meu-componente {
  /* certo: token semântico */
  background: var(--ds-semantic-color-background-neutral-default);
  color: var(--ds-semantic-text-style-content-color-typography-primary);

  /* errado: valor literal */
  background: #f5f5f5;
}`}</code>
      </pre>

      <h2 id="semanticas">Fundos e textos semânticos</h2>
      <p>
        {fundos.length} tokens de fundo e {textos.length} de texto. A lista completa, com valor
        resolvido, está em <a href="/fundamentos/tokens">Design tokens</a>.
      </p>
    </div>
  );
}
