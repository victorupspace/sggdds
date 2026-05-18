import './elevation.docs.css';

interface ElevationLevel {
  code: string;
  description: string;
  level: string;
  title: string;
}

const elevationLevels: ElevationLevel[] = [
  {
    code: 'box-shadow: none',
    description: 'Base plana para areas que ja estao separadas por cor, borda ou estrutura.',
    level: 'Level 0',
    title: 'Base',
  },
  {
    code: 'alpha-12 + spacing-2/6',
    description: 'Superficies discretas como cards e paineis sobre o background oficial.',
    level: 'Level 1',
    title: 'Raised',
  },
  {
    code: 'alpha-12 + alpha-8',
    description: 'Elementos interativos destacados, menus e regioes temporarias de baixa interrupcao.',
    level: 'Level 2',
    title: 'Floating',
  },
  {
    code: 'alpha-24 + alpha-12',
    description: 'Overlays, modais, toasts e elementos que precisam aparecer acima da interface.',
    level: 'Level 3',
    title: 'Overlay',
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
    <header className="elevation-section-header">
      <p className="elevation-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

function ElevationCard({ item, index }: { index: number; item: ElevationLevel }) {
  return (
    <article className={`elevation-card elevation-card--level-${String(index)}`}>
      <p className="elevation-eyebrow">{item.level}</p>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <code>{item.code}</code>
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
    <article className="elevation-practice-card">
      <h3>{title}</h3>
      {children}
    </article>
  );
}

export function ElevationShadowsPage() {
  return (
    <main className="elevation-page">
      <header className="elevation-hero">
        <p className="elevation-eyebrow">Foundations</p>
        <h1>Elevation / Shadows</h1>
        <p>
          Elevation organiza a percepcao de profundidade na interface. Shadows devem indicar
          hierarquia, estado temporario ou sobreposicao, sem substituir spacing, bordas,
          contraste ou estrutura semantica.
        </p>
      </header>

      <section className="elevation-section">
        <SectionHeader
          description="A partir deste guideline, todas as paginas do produto devem usar grey-100 como fundo oficial. Superficies, cards e containers aparecem sobre esse fundo com white ou tokens semanticos futuros."
          eyebrow="Background oficial"
          title="Pagina sempre em grey-100"
        />
        <div className="elevation-background-lockup">
          <article className="elevation-background-rule">
            <strong>O background oficial de paginas e #F5F5F5.</strong>
            <p>
              Use sempre o token primitive color neutral grey 100 para o fundo global de
              paginas, shells e areas principais. Esse valor reduz contraste excessivo,
              separa superficies brancas com clareza e cria base consistente para elevation.
            </p>
            <p>
              Evite backgrounds brancos em pagina inteira. White deve ser reservado para
              superficies internas, cards, modais, paineis e componentes que precisam se
              destacar sobre o fundo.
            </p>
          </article>
          <article className="elevation-token-card" aria-label="Token oficial de background">
            <span className="elevation-token-card__swatch" aria-hidden="true" />
            <dl>
              <div>
                <dt>Token</dt>
                <dd>primitive.color.neutral.grey.100</dd>
              </div>
              <div>
                <dt>CSS</dt>
                <dd>--ds-primitive-color-neutral-grey-100</dd>
              </div>
              <div>
                <dt>Valor</dt>
                <dd>#F5F5F5</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>

      <section className="elevation-section">
        <SectionHeader
          description="Enquanto tokens semanticos de shadow/elevation nao estiverem publicados, use receitas controladas com alpha tokens e spacing tokens. Nao crie sombras ad hoc por componente."
          eyebrow="Escala"
          title="Niveis recomendados"
        />
        <div className="elevation-stack">
          {elevationLevels.map((item, index) => (
            <ElevationCard index={index} item={item} key={item.level} />
          ))}
        </div>
      </section>

      <section className="elevation-section">
        <SectionHeader
          description="A sombra so funciona quando existe uma relacao clara entre fundo, superficie e camada temporaria. O fundo grey-100 e parte dessa relacao."
          eyebrow="Modelo mental"
          title="Camadas de interface"
        />
        <div className="elevation-layer-demo">
          <div className="elevation-layer-stage" aria-hidden="true">
            <div className="elevation-layer elevation-layer--page">Page background</div>
            <div className="elevation-layer elevation-layer--surface">Surface</div>
            <div className="elevation-layer elevation-layer--overlay">Overlay</div>
          </div>
          <div className="elevation-background-rule">
            <strong>Use elevation para comunicar relacao espacial.</strong>
            <p>
              A camada base e sempre grey-100. Superficies brancas carregam conteudo.
              Overlays, menus e modais usam sombra mais forte porque interrompem ou flutuam
              acima do fluxo principal.
            </p>
          </div>
        </div>
      </section>

      <section className="elevation-section">
        <SectionHeader
          description="Boas praticas para manter shadows consistentes, acessiveis e alinhadas aos tokens do Design System."
          eyebrow="Guidelines"
          title="Melhores praticas"
        />
        <div className="elevation-practice-grid">
          <PracticeCard title="Consistencia">
            <ul>
              <li>Use grey-100 como fundo global de pagina em desktop e mobile.</li>
              <li>Use white para superficies internas que precisam aparecer sobre o fundo.</li>
              <li>Escolha um nivel de elevation por intencao, nao por gosto visual.</li>
            </ul>
          </PracticeCard>
          <PracticeCard title="Composicao">
            <ul>
              <li>Prefira spacing e bordas antes de aumentar sombra.</li>
              <li>Nao empilhe sombras em cards dentro de cards.</li>
              <li>Reserve sombras fortes para overlays, modais, menus e toasts.</li>
            </ul>
          </PracticeCard>
          <PracticeCard title="Acessibilidade">
            <ul>
              <li>Nunca dependa apenas da sombra para comunicar foco, erro ou selecao.</li>
              <li>Mantenha contraste suficiente entre superficie, texto e fundo.</li>
              <li>Valide zoom e mobile para evitar sombras cortadas ou sobreposicao visual.</li>
            </ul>
          </PracticeCard>
        </div>
      </section>

      <section className="elevation-section">
        <SectionHeader
          description="Elevation e uma fundacao visual. Ela deve ajudar a interface a explicar hierarquia sem adicionar ruido."
          eyebrow="Uso"
          title="Quando usar e quando evitar"
        />
        <div className="elevation-usage">
          <article>
            <h3>Use</h3>
            <ul>
              <li>Para separar superficies brancas do fundo grey-100.</li>
              <li>Para indicar elementos temporarios acima do fluxo principal.</li>
              <li>Para reforcar hierarquia em modais, menus, popovers, toasts e cards.</li>
            </ul>
          </article>
          <article>
            <h3>Evite</h3>
            <ul>
              <li>Usar sombra como decoracao sem funcao de hierarquia.</li>
              <li>Criar novos valores de shadow fora das receitas documentadas.</li>
              <li>Usar page background white como padrao de tela.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
