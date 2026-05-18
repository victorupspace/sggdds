import {
  borders,
  breakpoints,
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  groupColorTokens,
  letterSpacing,
  lineHeights,
  spacing,
  tokenSummary,
  type TokenEntry,
} from './core-tokens.data';
import './core-tokens.docs.css';

interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  count?: number;
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <main className="tokens-page">{children}</main>;
}

function PageIntro({ count, description, eyebrow, title }: PageIntroProps) {
  return (
    <header className="tokens-page-intro">
      <div>
        <p>{eyebrow}</p>
        <h1>{title}</h1>
        <span>{description}</span>
      </div>
      {typeof count === 'number' ? (
        <div className="tokens-count-lockup" aria-label={`${String(count)} tokens`}>
          <strong>{count}</strong>
          <span>tokens</span>
        </div>
      ) : null}
    </header>
  );
}

function SectionHeader({
  count,
  eyebrow,
  title,
}: {
  count?: number;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="token-section-header">
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {typeof count === 'number' ? <span>{count} tokens</span> : null}
    </header>
  );
}

function TokenMeta({ compact = false, token }: { compact?: boolean; token: TokenEntry }) {
  const codePath = token.path.replace('primitive.', '');

  return (
    <dl className={compact ? 'token-meta token-meta-compact' : 'token-meta'}>
      <div>
        <dt>Token</dt>
        <dd>{codePath}</dd>
      </div>
      {token.figmaPath ? (
        <div>
          <dt>Figma</dt>
          <dd>{token.figmaPath}</dd>
        </div>
      ) : null}
      <div>
        <dt>CSS</dt>
        <dd>{token.variable}</dd>
      </div>
      {token.reference ? (
        <div>
          <dt>Alias</dt>
          <dd>{token.reference}</dd>
        </div>
      ) : null}
      <div>
        <dt>Valor</dt>
        <dd>{String(token.value)}</dd>
      </div>
      {token.originalValue ? (
        <div>
          <dt>Valor original</dt>
          <dd>{token.originalValue}</dd>
        </div>
      ) : null}
      {token.normalizedFrom ? (
        <div>
          <dt>Normalizado de</dt>
          <dd>{token.normalizedFrom}</dd>
        </div>
      ) : null}
    </dl>
  );
}

function CategoryMetricGrid() {
  return (
    <section className="token-metric-grid" aria-label="Resumo dos Core tokens">
      {tokenSummary.map((item) => (
        <article className="token-metric" key={item.category}>
          <span>{item.label}</span>
          <strong>{item.count}</strong>
          <p>{item.category}</p>
        </article>
      ))}
    </section>
  );
}

function PipelineStrip() {
  return (
    <section className="token-pipeline" aria-label="Fluxo de tokens">
      {[
        ['Raw', 'src/foundations/tokens/raw'],
        ['Normalized', 'src/foundations/tokens/normalized'],
        ['CSS', 'src/foundations/tokens/css/tokens.css'],
        ['JSON', 'src/foundations/tokens/build/tokens.json'],
      ].map(([label, path]) => (
        <article key={label}>
          <span>{label}</span>
          <code>{path}</code>
        </article>
      ))}
    </section>
  );
}

export function CoreTokensOverviewPage() {
  return (
    <PageShell>
      <PageIntro
        description="Tokens primitivos importados do Figma, normalizados para CSS custom properties e JSON interno, com estrutura preparada para evoluir para plataformas nativas."
        eyebrow="SGGD Core Tokens"
        title="Fundacao visual do Design System"
      />
      <CategoryMetricGrid />
      <PipelineStrip />
      <section className="token-overview-band">
        <SectionHeader eyebrow="Governanca" title="Categorias documentadas em paginas dedicadas" />
        <div className="token-category-grid">
          {tokenSummary.map((item) => (
            <article className="token-category-card" key={item.category}>
              <span>{item.label}</span>
              <strong>{item.count}</strong>
              <p>{item.category}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export function CoreTokensColorPage() {
  return (
    <PageShell>
      <PageIntro
        description="Paleta primitiva importada do Figma e organizada por base, identidade, marca, utilitarios de feedback, neutros e overlays alfa. Aliases preservam a intencao sem duplicar literais."
        eyebrow="Core Tokens"
        title="Color"
      />
      {groupColorTokens(colors).map(([group, groupTokens]) => (
        <section className="token-section" key={group}>
          <SectionHeader eyebrow="Color category" title={group} />
          <div className="color-grid">
            {groupTokens.map((token) => (
              <article className="color-card" key={token.path}>
                <div className="color-swatch-frame">
                  <div className="color-swatch" style={{ background: `var(${token.variable})` }} />
                </div>
                <TokenMeta token={token} />
              </article>
            ))}
          </div>
        </section>
      ))}
    </PageShell>
  );
}

export function CoreTokensSpacingPage() {
  const sortedSpacing = spacing.slice().sort(sortByValueAsc);
  const maxSpacing = Math.max(...sortedSpacing.map((t) => toNumericValue(t.value)));

  return (
    <PageShell>
      <PageIntro
        description="Escala de distancia para gaps, paddings, margins e composicao responsiva. Os valores sao compilados como dimensoes em px."
        eyebrow="Core Tokens"
        title="Spacing"
      />
      <section className="token-section">
        <SectionHeader eyebrow="Scale" title="Spacing scale" />
        <div className="spacing-cards">
          {sortedSpacing.map((token) => {
            const numeric = toNumericValue(token.value);
            const ratio = maxSpacing > 0 ? (numeric / maxSpacing) * 100 : 0;
            return (
              <article className="spacing-card" key={token.path}>
                <div className="spacing-card-step">
                  <strong>{numeric > 0 ? `${String(numeric)}px` : '0'}</strong>
                  <small>spacing-{token.name}</small>
                </div>
                <div className="spacing-card-bar" aria-hidden="true">
                  <span
                    className="spacing-card-bar-fill"
                    style={{ width: `max(${numeric > 0 ? '4px' : '0px'}, ${String(ratio)}%)` }}
                  />
                </div>
                <div className="spacing-card-meta">
                  <code className="spacing-card-token">{token.variable}</code>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

function toNumericValue(value: TokenEntry['value']): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function sortByValueAsc(a: TokenEntry, b: TokenEntry): number {
  return toNumericValue(a.value) - toNumericValue(b.value);
}

export function CoreTokensBorderPage() {
  const radiusTokens = borders
    .filter((token) => token.path.includes('.radius.'))
    .slice()
    .sort(sortByValueAsc);
  const widthTokens = borders
    .filter((token) => token.path.includes('.width.'))
    .slice()
    .sort(sortByValueAsc);

  return (
    <PageShell>
      <PageIntro
        count={borders.length}
        description="Tokens primitivos para raio e espessura de borda. A escala mantem leitura objetiva para superficies, controles e containers futuros."
        eyebrow="Core Tokens"
        title="Border"
      />
      <section className="token-section">
        <SectionHeader count={radiusTokens.length} eyebrow="Border" title="Radius" />
        <div className="border-grid">
          {radiusTokens.map((token) => (
            <article className="border-card" key={token.path}>
              <div className="border-preview-area">
                <div
                  className="radius-preview"
                  style={{ borderRadius: `var(${token.variable})` }}
                />
              </div>
              <TokenMeta token={token} />
            </article>
          ))}
        </div>
      </section>
      <section className="token-section">
        <SectionHeader count={widthTokens.length} eyebrow="Border" title="Width" />
        <div className="border-grid">
          {widthTokens.map((token) => (
            <article className="border-card" key={token.path}>
              <div className="border-preview-area">
                <div className="width-preview" style={{ borderWidth: `var(${token.variable})` }} />
              </div>
              <TokenMeta token={token} />
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

const BREAKPOINT_LABELS: Record<string, { description: string; device: string }> = {
  'bp-xs': {
    description: 'Mobile pequeno e ponto de partida da escala responsiva.',
    device: 'Mobile XS',
  },
  'bp-sm': {
    description: 'Mobile padrão. Layouts de uma coluna com toque confortável.',
    device: 'Mobile',
  },
  'bp-md': {
    description: 'Tablet. Layouts de 2 colunas e densidade intermediária.',
    device: 'Tablet',
  },
  'bp-lg': {
    description: 'Desktop. Grid de 12 colunas, navegação horizontal e densidade alta.',
    device: 'Desktop',
  },
};

export function CoreTokensBreakpointsPage() {
  const orderedBreakpoints = breakpoints.slice().sort(sortByValueAsc);

  return (
    <PageShell>
      <PageIntro
        count={breakpoints.length}
        description="Pontos de resposta para web responsiva. A documentacao usa a escala como referencia tecnica, sem impor layout de produto."
        eyebrow="Core Tokens"
        title="Breakpoints"
      />
      <section className="token-section">
        <SectionHeader count={breakpoints.length} eyebrow="Responsive" title="Viewport scale" />
        <div className="bp-cards">
          {orderedBreakpoints.map((token) => {
            const info = BREAKPOINT_LABELS[token.name] ?? { description: '', device: token.name };
            const numeric = toNumericValue(token.value);
            return (
              <article className="bp-card" key={token.path}>
                <div className="bp-card-head">
                  <div>
                    <span className="bp-card-device">{info.device}</span>
                    <strong className="bp-card-value">
                      {numeric > 0 ? `${String(numeric)}px` : '0'}
                    </strong>
                  </div>
                  <code className="bp-card-name">{token.name}</code>
                </div>
                <div className="bp-card-bar" aria-hidden="true">
                  <span
                    className="bp-card-bar-fill"
                    style={{ width: `${String(Math.max(2, (numeric / 1440) * 100))}%` }}
                  />
                  <span className="bp-card-bar-tick">0</span>
                  <span className="bp-card-bar-tick bp-card-bar-tick-end">1440</span>
                </div>
                <p className="bp-card-desc">{info.description}</p>
                <TokenMeta compact token={token} />
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}

export function CoreTokensTypographyPage() {
  const primaryFamily = fontFamilies[0];
  const familyName = String(primaryFamily.value).replace(/['"]/g, '');
  const googleFontsUrl = `https://fonts.google.com/specimen/${familyName.replace(/\s+/g, '+')}`;

  return (
    <PageShell>
      <PageIntro
        description="Escalas primitivas de familia, peso, tamanho, altura de linha e tracking para orientar componentes responsivos futuros."
        eyebrow="Core Tokens"
        title="Typography"
      />
      <section className="token-section">
        <SectionHeader eyebrow="Typography" title="Font family" />
        <article className="type-family-feature">
          <div className="type-family-feature-preview">
            <p className="type-family-feature-display">
              Aa<span className="accent">Bb</span>
            </p>
            <p className="type-family-feature-sample">
              The quick brown fox jumps over the lazy dog. — A raposa marrom salta sobre o cachorro
              preguiçoso.
            </p>
          </div>
          <div className="type-family-feature-meta">
            <dl>
              <div>
                <dt>Família</dt>
                <dd>{familyName}</dd>
              </div>
              <div>
                <dt>Tipo</dt>
                <dd>Sans-serif geométrica · Open source</dd>
              </div>
              <div>
                <dt>Pesos disponíveis</dt>
                <dd>200 → 800 (Variable)</dd>
              </div>
              <div>
                <dt>Token</dt>
                <dd>
                  <code>{primaryFamily.variable}</code>
                </dd>
              </div>
            </dl>
            <a
              className="type-family-feature-cta"
              href={googleFontsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Baixar no Google Fonts
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M7 17L17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </article>
      </section>
      <section className="token-section">
        <SectionHeader eyebrow="Typography" title="Font size" />
        <div className="type-scale">
          {fontSizes.map((token) => (
            <article className="type-row" key={token.path}>
              <p style={{ fontSize: `var(${token.variable})` }}>Aa</p>
              <TokenMeta token={token} />
            </article>
          ))}
        </div>
      </section>
      <section className="token-section">
        <SectionHeader eyebrow="Typography" title="Supporting scales" />
        <div className="type-support-grid">
          <TokenCompactList title="Font weight" tokens={fontWeights} />
          <TokenCompactList title="Line height" tokens={lineHeights} />
          <TokenCompactList title="Letter spacing" tokens={letterSpacing} />
        </div>
      </section>
    </PageShell>
  );
}

function TokenCompactList({ title, tokens: entries }: { title: string; tokens: TokenEntry[] }) {
  return (
    <article className="compact-list">
      <h3>{title}</h3>
      <ul>
        {entries.map((token) => (
          <li key={token.path}>
            <span>{token.name}</span>
            <code>{String(token.value)}</code>
          </li>
        ))}
      </ul>
    </article>
  );
}
