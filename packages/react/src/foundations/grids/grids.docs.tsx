import './grids.docs.css';

interface GridSpec {
  columns: number;
  gutter: string;
  label: string;
  margin: string;
  modifier: string;
  range: string;
  type: string;
}

const breakpointSpecs = [
  {
    label: 'mobile width',
    range: '360px',
  },
  {
    label: 'tablet width',
    range: '768px a 1024px',
  },
  {
    label: 'desktop width',
    range: '1280px a 1440px',
  },
];

const gridSpecs: GridSpec[] = [
  {
    columns: 4,
    gutter: '10px',
    label: 'Mobile',
    margin: '20px',
    modifier: 'mobile',
    range: '360px',
    type: 'Stretch',
  },
  {
    columns: 6,
    gutter: '24px',
    label: 'Tablet',
    margin: '24px',
    modifier: 'tablet',
    range: '768px a 1024px',
    type: 'Stretch',
  },
  {
    columns: 12,
    gutter: '24px',
    label: 'Desktop',
    margin: '40px',
    modifier: 'desktop',
    range: '1280px a 1440px',
    type: 'Stretch',
  },
];

function SectionHeader({
  description,
  eyebrow,
  title,
}: {
  description?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="grids-section-header">
      <p className="grids-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

function BreakpointStrip() {
  return (
    <div className="grids-breakpoint-strip" aria-label="Breakpoints comuns no Brasil">
      {breakpointSpecs.map((item) => (
        <article className="grids-breakpoint" key={item.label}>
          <div className="grids-breakpoint__measure">
            <span>{item.range}</span>
          </div>
          <span className="grids-breakpoint__label">{item.label}</span>
        </article>
      ))}
    </div>
  );
}

function GridPreview({ spec }: { spec: GridSpec }) {
  return (
    <article className="grids-demo">
      <div className="grids-demo__meta">
        <h3>
          {spec.label} - {spec.range}
        </h3>
        <ul className="grids-spec-list">
          <li>{spec.columns} colunas</li>
          <li>Margem horizontal: {spec.margin}</li>
          <li>Gutter: {spec.gutter}</li>
          <li>Tipo: {spec.type}</li>
        </ul>
      </div>
      <div
        aria-label={`${spec.label}: ${String(spec.columns)} colunas, margem ${spec.margin}, gutter ${spec.gutter}`}
        className={`grids-preview grids-preview--${spec.modifier}`}
        role="img"
      >
        {Array.from({ length: spec.columns }, (_, index) => (
          <span className="grids-preview__column" key={String(index)} />
        ))}
      </div>
    </article>
  );
}

function PracticeCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <article className="grids-practice-card">
      <h3>{title}</h3>
      {children}
    </article>
  );
}

export function GridsPage() {
  return (
    <main className="grids-page">
      <header className="grids-hero">
        <p className="grids-eyebrow">Foundations</p>
        <h1>Grids</h1>
        <p>
          Grid e a fundacao de layout que organiza conteudo em colunas, gutters e margens.
          Ele cria consistencia visual entre mobile, tablet e desktop sem transformar cada
          pagina em um layout rigido.
        </p>
      </header>

      <section className="grids-section">
        <SectionHeader
          description="Os valores abaixo representam os tamanhos de referencia mais comuns nos fluxos web brasileiros e se conectam aos tokens de breakpoint ja publicados."
          eyebrow="Responsive"
          title="Breakpoints comuns no Brasil"
        />
        <BreakpointStrip />
      </section>

      <section className="grids-section">
        <SectionHeader
          description="Use colunas para posicionar conteudo, gutters para separar elementos e margens para proteger a interface das bordas da tela."
          eyebrow="Anatomia"
          title="Como o grid organiza a tela"
        />
        <div className="grids-definition">
          <p>
            O grid e uma estrutura composta por colunas e espacamentos. Ele define onde os
            elementos devem ser posicionados e mantem consistencia visual em diferentes
            dispositivos.
          </p>
          <ul>
            <li>
              <strong>Colunas:</strong> areas onde os conteudos sao posicionados.
            </li>
            <li>
              <strong>Gutter:</strong> espaco entre colunas, usado para separar elementos.
            </li>
            <li>
              <strong>Margens:</strong> espaco nas bordas da tela, fora das colunas.
            </li>
          </ul>
        </div>
      </section>

      <section className="grids-section">
        <SectionHeader
          description="Estes sao os grids base recomendados para composicoes de produto. Em telas menores, o proprio exemplo se adapta para preservar leitura e evitar scroll horizontal."
          eyebrow="Grid system"
          title="Grids que mais utilizamos"
        />
        <div className="grids-demo-grid">
          {gridSpecs.map((spec) => (
            <GridPreview key={spec.modifier} spec={spec} />
          ))}
        </div>
      </section>

      <section className="grids-section">
        <SectionHeader
          description="Boas praticas para manter layouts escalaveis, acessiveis e consistentes com os tokens do Design System."
          eyebrow="Guidelines"
          title="Melhores praticas"
        />
        <div className="grids-practice-grid">
          <PracticeCard title="Responsividade">
            <ul>
              <li>Projete mobile-first e expanda a composicao conforme o viewport cresce.</li>
              <li>Use os tokens de breakpoint para trocar densidade, nao para esconder conteudo essencial.</li>
              <li>Evite largura fixa em containers principais; prefira max-width, minmax e clamp.</li>
            </ul>
          </PracticeCard>
          <PracticeCard title="Composicao">
            <ul>
              <li>Alinhe conteudos ao grid, mas permita que componentes internos tenham sua propria logica.</li>
              <li>Mantenha gutters consistentes entre cards, formularios, listas e areas operacionais.</li>
              <li>Use margens externas para respiro; nao encoste conteudo na borda do viewport.</li>
            </ul>
          </PracticeCard>
          <PracticeCard title="Acessibilidade">
            <ul>
              <li>Nao altere a ordem do DOM apenas para encaixar itens visualmente no grid.</li>
              <li>Garanta que zoom, texto maior e quebra de linha nao criem sobreposicao.</li>
              <li>Evite grids densos demais em mobile; priorize leitura linear e toque confortavel.</li>
            </ul>
          </PracticeCard>
        </div>
      </section>

      <section className="grids-section">
        <SectionHeader
          description="O grid e uma fundacao de layout. Ele orienta componentes e templates, mas nao substitui regras semanticas de HTML, hierarquia visual ou conteudo."
          eyebrow="Uso"
          title="Quando usar e quando evitar"
        />
        <div className="grids-usage">
          <article>
            <h3>Use</h3>
            <ul>
              <li>Para organizar paginas, dashboards, formularios, listas e templates.</li>
              <li>Para alinhar regioes de conteudo entre diferentes componentes.</li>
              <li>Para manter consistencia entre prototipo, implementacao e documentacao.</li>
            </ul>
          </article>
          <article>
            <h3>Evite</h3>
            <ul>
              <li>Usar grid como solucao para todos os alinhamentos internos de componentes.</li>
              <li>Criar layouts que dependem de ordem visual diferente da ordem de leitura.</li>
              <li>Forcar 12 colunas em mobile quando 4 colunas resolvem melhor a hierarquia.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
