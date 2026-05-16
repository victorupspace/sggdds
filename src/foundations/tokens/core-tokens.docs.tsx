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
  totalTokenCount,
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
      <article className="token-metric token-metric-primary">
        <span>Total</span>
        <strong>{totalTokenCount}</strong>
        <p>Core tokens primitivos compilados</p>
      </article>
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
        count={totalTokenCount}
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
        count={colors.length}
        description="Paleta primitiva importada do Figma e organizada por base, identidade, marca, utilitarios de feedback, neutros e overlays alfa. Aliases preservam a intencao sem duplicar literais."
        eyebrow="Core Tokens"
        title="Color"
      />
      {groupColorTokens(colors).map(([group, groupTokens]) => (
        <section className="token-section" key={group}>
          <SectionHeader count={groupTokens.length} eyebrow="Color category" title={group} />
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
  return (
    <PageShell>
      <PageIntro
        count={spacing.length}
        description="Escala de distancia para gaps, paddings, margins e composicao responsiva. Os valores sao compilados como dimensoes em px."
        eyebrow="Core Tokens"
        title="Spacing"
      />
      <section className="token-section">
        <SectionHeader count={spacing.length} eyebrow="Scale" title="Spacing scale" />
        <div className="scale-list">
          {spacing.map((token) => (
            <article className="scale-row" key={token.path}>
              <TokenMeta token={token} />
              <div className="scale-visual" aria-hidden="true">
                <span style={{ width: `clamp(2px, var(${token.variable}), 100%)` }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export function CoreTokensBorderPage() {
  const radiusTokens = borders.filter((token) => token.path.includes('.radius.'));
  const widthTokens = borders.filter((token) => token.path.includes('.width.'));

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

export function CoreTokensBreakpointsPage() {
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
        <div className="breakpoint-list">
          {breakpoints.map((token) => (
            <article className="breakpoint-row" key={token.path}>
              <TokenMeta token={token} />
              <div className="breakpoint-visual" aria-hidden="true">
                <span style={{ width: `clamp(2px, calc(var(${token.variable}) / 12), 100%)` }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}

export function CoreTokensTypographyPage() {
  return (
    <PageShell>
      <PageIntro
        count={typographyCount}
        description="Escalas primitivas de familia, peso, tamanho, altura de linha e tracking para orientar componentes responsivos futuros."
        eyebrow="Core Tokens"
        title="Typography"
      />
      <section className="token-section">
        <SectionHeader count={fontFamilies.length} eyebrow="Typography" title="Font family" />
        <div className="type-family-grid">
          {fontFamilies.map((token) => (
            <article className="type-family-card" key={token.path}>
              <p>Family</p>
              <strong style={{ fontFamily: `var(${token.variable})` }}>
                {String(token.value)}
              </strong>
              <TokenMeta token={token} />
            </article>
          ))}
        </div>
      </section>
      <section className="token-section">
        <SectionHeader count={fontSizes.length} eyebrow="Typography" title="Font size" />
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

const typographyCount =
  fontFamilies.length +
  fontSizes.length +
  fontWeights.length +
  lineHeights.length +
  letterSpacing.length;

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
