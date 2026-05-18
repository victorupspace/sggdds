import './introduction.docs.css';

interface IconProps {
  size?: number;
}

function ArrowRight({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12l5 5 9-11"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 11V8a6 6 0 0112 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="4.5"
        y="11"
        width="15"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function FigmaMark({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 57" fill="none" aria-hidden>
      <path d="M19 28.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19z" fill="#0acf83" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#a259ff" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262" />
      <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" fill="#f24e1e" />
      <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" fill="#1abcfe" />
    </svg>
  );
}

function IconA11y({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="4.5" r="2" fill="currentColor" />
      <path
        d="M4 8h16M9 22l3-8 3 8M12 8v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconToken({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 3v18M4 7.5l8 4.5 8-4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLayers({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l9 5-9 5-9-5 9-5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M3 13l9 5 9-5M3 18l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const STORYBOOK_LINKS = {
  foundationsOverview: '?path=/docs/foundations-overview--docs',
  foundationsColor: '?path=/docs/foundations-color--docs',
  foundationsTypography: '?path=/docs/foundations-typography--docs',
  foundationsSpacing: '?path=/docs/foundations-spacing--docs',
  foundationsBorder: '?path=/docs/foundations-border--docs',
  foundationsBreakpoints: '?path=/docs/foundations-breakpoints--docs',
  foundationsElevation: '?path=/docs/foundations-elevation--docs',
  foundationsGrids: '?path=/docs/foundations-grids--docs',
  designTokens: '?path=/docs/documentation-design-tokens--docs',
  accessibility: '?path=/docs/documentation-acessibilidade--docs',
  figmaIntegration: '?path=/docs/documentation-integracao-com-figma--docs',
  componentButton: '?path=/docs/web-components-button--docs',
};

interface ComponentCategory {
  description: string;
  items: { id: string; label: string }[];
  title: string;
}

const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    description: 'Decisão e ação primária do produto',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'buttongov', label: 'ButtonGov' },
      { id: 'link', label: 'Link' },
      { id: 'backtotop', label: 'BackToTop' },
    ],
    title: 'Ações',
  },
  {
    description: 'Entrada de dados em formulários',
    items: [
      { id: 'textinput', label: 'TextInput' },
      { id: 'textarea', label: 'TextArea' },
      { id: 'dropdown', label: 'Dropdown' },
      { id: 'datepicker', label: 'Datepicker' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio', label: 'Radio' },
      { id: 'toggle', label: 'Toggle' },
      { id: 'fileupload', label: 'FileUpload' },
    ],
    title: 'Formulário',
  },
  {
    description: 'Localização, hierarquia e fluxo entre seções',
    items: [
      { id: 'header', label: 'Header' },
      { id: 'footer', label: 'Footer' },
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'stepper', label: 'Stepper' },
    ],
    title: 'Navegação',
  },
  {
    description: 'Comunicação de estado ao usuário',
    items: [
      { id: 'alert', label: 'Alert' },
      { id: 'toast', label: 'Toast' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'progressbar', label: 'ProgressBar' },
      { id: 'spinner', label: 'Spinner' },
      { id: 'skeleton', label: 'Skeleton' },
    ],
    title: 'Feedback',
  },
  {
    description: 'Exibição de conteúdo e identidade',
    items: [
      { id: 'card', label: 'Card' },
      { id: 'infocard', label: 'InfoCard' },
      { id: 'hero', label: 'Hero' },
      { id: 'badge', label: 'Badge' },
      { id: 'chip', label: 'Chip' },
      { id: 'avatar', label: 'Avatar' },
      { id: 'divider', label: 'Divider' },
      { id: 'accordion', label: 'Accordion' },
      { id: 'modal', label: 'Modal' },
    ],
    title: 'Conteúdo',
  },
];

const IMPLEMENTED_COMPONENTS = COMPONENT_CATEGORIES.reduce(
  (acc, cat) => acc + cat.items.length,
  0,
);
const TARGET_COMPONENTS = 68;

export function IntroductionPage() {
  return (
    <main className="intro-page">
      {/* ============ HERO ============ */}
      <section className="intro-hero">
        <div className="intro-container intro-hero-inner">
          <div>
            <span className="intro-eyebrow">
              <span className="intro-eyebrow-dot" aria-hidden />
              SGGD Design System · v0.1
            </span>
            <h1>
              Uma base sólida para construir experiências{' '}
              <span className="intro-grad">consistentes</span>, acessíveis e bonitas.
            </h1>
            <p className="intro-lede">
              O Design System SGGD reúne fundamentos, tokens e componentes prontos para
              acelerar a entrega de produtos React com identidade institucional, acessibilidade
              AA e visual refinado — sem reinventar a roda a cada tela.
            </p>
            <div className="intro-cta-row">
              <a className="intro-btn intro-btn-primary" href={STORYBOOK_LINKS.foundationsOverview}>
                Explorar Foundations <ArrowRight />
              </a>
              <a className="intro-btn intro-btn-secondary" href={STORYBOOK_LINKS.componentButton}>
                Ver Web Components <ArrowRight />
              </a>
            </div>
          </div>

          {/* Hero artwork */}
          <div className="intro-hero-art" aria-hidden>
            <div className="intro-art-card intro-art-card-1">
              <span className="intro-art-label">Colors · Identity</span>
              <div className="intro-art-swatch-row">
                <span className="intro-art-swatch" style={{ background: '#034EA2' }} />
                <span className="intro-art-swatch" style={{ background: '#233254' }} />
                <span className="intro-art-swatch" style={{ background: '#62C9E0' }} />
                <span className="intro-art-swatch" style={{ background: '#0B9247' }} />
                <span className="intro-art-swatch" style={{ background: '#FBB900' }} />
              </div>
            </div>
            <div className="intro-art-card intro-art-card-2">
              <span className="intro-art-label">Typography · Display</span>
              <div className="intro-art-type">
                <strong>Aa</strong>
                <span>Plus Jakarta · 44 / 50</span>
              </div>
            </div>
            <div className="intro-art-card intro-art-card-3">
              <span className="intro-art-label">Components · Atoms</span>
              <div className="intro-art-component">
                <span className="chip">Primary</span>
                <span className="chip ghost">Secondary</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <div className="intro-container">
        <div className="intro-stats" role="list">
          <div className="intro-stat" role="listitem">
            <div className="intro-stat-num">
              {TARGET_COMPONENTS}
              <small>componentes</small>
            </div>
            <div className="intro-stat-label">Web Components</div>
            <span className="intro-stat-tag">Em progresso</span>
          </div>
          <div className="intro-stat" role="listitem">
            <div className="intro-stat-num">
              8<small>áreas</small>
            </div>
            <div className="intro-stat-label">Foundations</div>
          </div>
          <div className="intro-stat" role="listitem">
            <div className="intro-stat-num">
              200<small>+ tokens</small>
            </div>
            <div className="intro-stat-label">Design Tokens</div>
          </div>
          <div className="intro-stat" role="listitem">
            <div className="intro-stat-num">AA</div>
            <div className="intro-stat-label">Acessibilidade WCAG</div>
          </div>
        </div>
      </div>

      {/* ============ PILLARS ============ */}
      <section className="intro-section">
        <div className="intro-container">
          <div className="intro-section-head">
            <span className="intro-section-eyebrow">O que é</span>
            <h2>Construído sobre três pilares que não negociamos.</h2>
            <p className="intro-section-sub">
              Cada decisão visual e técnica do Design System está ancorada nesses três princípios.
              Eles definem o que entra, o que sai e como evoluímos.
            </p>
          </div>

          <div className="intro-pillars">
            <article className="intro-pillar">
              <span className="intro-pillar-icon">
                <IconA11y />
              </span>
              <h3>Acessibilidade primeiro</h3>
              <p>
                Contraste, foco visível, semântica ARIA, navegação por teclado e leitores de tela
                são critérios de aceite — não fase final. AA é o piso.
              </p>
            </article>

            <article className="intro-pillar">
              <span className="intro-pillar-icon">
                <IconToken />
              </span>
              <h3>Token-first</h3>
              <p>
                Cores, espaçamentos, tipografia, raios e elevação vivem como tokens versionados,
                sincronizados com o Figma. Componentes consomem variáveis CSS, nunca valores fixos.
              </p>
            </article>

            <article className="intro-pillar">
              <span className="intro-pillar-icon">
                <IconLayers />
              </span>
              <h3>Independência de produto</h3>
              <p>
                Componentes não dependem de Tailwind, layout ou regras de aplicação. Eles são
                pequenos, testáveis, documentados e plug-and-play em qualquer contexto React.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============ USAGE ============ */}
      <section className="intro-section tight" style={{ background: 'var(--intro-surface)' }}>
        <div className="intro-container">
          <div className="intro-section-head">
            <span className="intro-section-eyebrow">Como usar</span>
            <h2>Comece em três passos.</h2>
            <p className="intro-section-sub">
              Importe os tokens, escolha o componente, componha. O Design System já cuida de
              estados, foco, contraste e responsividade.
            </p>
          </div>

          <div className="intro-usage">
            <div className="intro-code" aria-label="Exemplo de uso">
              <div className="intro-code-bar">
                <span className="intro-code-dot" />
                <span className="intro-code-dot" />
                <span className="intro-code-dot" />
                <span className="intro-code-tab">app.tsx</span>
              </div>
              <pre>
                <code>
                  <span className="tk-com">{`// 1. Importe os tokens uma vez na raiz da app`}</span>
                  {'\n'}
                  <span className="tk-key">import</span> <span className="tk-str">
                    {`'@sggd/design-system/tokens.css'`}
                  </span>;{'\n'}
                  {'\n'}
                  <span className="tk-com">{`// 2. Importe os componentes que precisar`}</span>
                  {'\n'}
                  <span className="tk-key">import</span> {'{ '}
                  <span className="tk-id">Button</span>, <span className="tk-id">TextInput</span>
                  {' }'} <span className="tk-key">from</span>{' '}
                  <span className="tk-str">{`'@sggd/design-system'`}</span>;{'\n'}
                  {'\n'}
                  <span className="tk-key">export function</span>{' '}
                  <span className="tk-fn">LoginForm</span>() {'{'}
                  {'\n'}
                  {'  '}
                  <span className="tk-key">return</span> ({'\n'}
                  {'    '}&lt;<span className="tk-fn">form</span>&gt;{'\n'}
                  {'      '}&lt;<span className="tk-fn">TextInput</span>{' '}
                  <span className="tk-id">label</span>=<span className="tk-str">"E-mail"</span>{' '}
                  /&gt;{'\n'}
                  {'      '}&lt;<span className="tk-fn">Button</span>{' '}
                  <span className="tk-id">variant</span>=<span className="tk-str">"primary"</span>
                  &gt;{'\n'}
                  {'        '}Entrar{'\n'}
                  {'      '}&lt;/<span className="tk-fn">Button</span>&gt;{'\n'}
                  {'    '}&lt;/<span className="tk-fn">form</span>&gt;{'\n'}
                  {'  '});{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>

            <div className="intro-steps">
              <div className="intro-step">
                <span className="intro-step-num">1</span>
                <div>
                  <h4>Carregue os tokens</h4>
                  <p>
                    Um único <code>import</code> de <code>tokens.css</code> disponibiliza todas
                    as variáveis CSS do DS para qualquer árvore de componentes.
                  </p>
                </div>
              </div>
              <div className="intro-step">
                <span className="intro-step-num">2</span>
                <div>
                  <h4>Componha com os componentes</h4>
                  <p>
                    Cada componente é independente, tipado e documentado com stories que cobrem
                    estados, variações e critérios de uso.
                  </p>
                </div>
              </div>
              <div className="intro-step">
                <span className="intro-step-num">3</span>
                <div>
                  <h4>Personalize por tokens</h4>
                  <p>
                    Customize a aparência substituindo variáveis CSS — nunca reescrevendo
                    estilos internos. Garante consistência e atualizações sem quebra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOUNDATIONS ============ */}
      <section className="intro-section">
        <div className="intro-container">
          <div className="intro-section-head">
            <span className="intro-section-eyebrow">Foundations</span>
            <h2>A base visual que sustenta tudo.</h2>
            <p className="intro-section-sub">
              Cores, tipografia, espaçamento, bordas, breakpoints, elevação e grids. Os fundamentos
              ficam à mão e sincronizam com o Figma via Style Dictionary.
            </p>
          </div>

          <div className="intro-foundations">
            <a className="intro-fcard" href={STORYBOOK_LINKS.foundationsColor}>
              <div className="intro-fcard-head">
                <strong>Color</strong>
                <span>Identidade + utilitárias</span>
              </div>
              <div className="intro-palette">
                {[
                  '#034EA2',
                  '#233254',
                  '#005992',
                  '#4297D3',
                  '#62C9E0',
                  '#A1DDF7',
                  '#0B9247',
                  '#FBB900',
                  '#E52207',
                  '#262626',
                  '#737373',
                  '#D4D4D4',
                  '#E5E5E5',
                  '#F5F5F5',
                  '#FAFAFA',
                  '#FFFFFF',
                ].map((c) => (
                  <span key={c} style={{ background: c }} />
                ))}
              </div>
            </a>

            <a className="intro-fcard" href={STORYBOOK_LINKS.foundationsTypography}>
              <div className="intro-fcard-head">
                <strong>Typography</strong>
                <span>Plus Jakarta Sans</span>
              </div>
              <div className="intro-type-preview">
                <span className="lg">Aa</span>
                <span className="sm">10 → 96 px</span>
              </div>
            </a>

            <a className="intro-fcard" href={STORYBOOK_LINKS.foundationsSpacing}>
              <div className="intro-fcard-head">
                <strong>Spacing</strong>
                <span>Escala 2 → 128</span>
              </div>
              <div className="intro-spacing">
                {[8, 12, 18, 24, 32, 40, 48, 56].map((h) => (
                  <span key={h} style={{ height: `${String(h)}px` }} />
                ))}
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ============ COMPONENT INVENTORY ============ */}
      <section className="intro-section tight" style={{ background: 'var(--intro-surface)' }}>
        <div className="intro-container">
          <div className="intro-section-head">
            <span className="intro-section-eyebrow">Inventário</span>
            <h2>Categorias</h2>
            <p className="intro-section-sub">
              Cada componente possui story interativa, documentação MDX, testes e tipagem
              TypeScript. A biblioteca cresce de forma incremental, sempre a partir de
              especificações aprovadas no Figma.
            </p>
          </div>

          {COMPONENT_CATEGORIES.map((cat) => (
            <div className="intro-inventory" key={cat.title}>
              <div className="intro-inv-cat">
                <strong>{cat.title}</strong>
                <span>{cat.description}</span>
              </div>
              <div className="intro-chips">
                {cat.items.map((c) => (
                  <a
                    key={c.id}
                    className="intro-chip"
                    href={`?path=/docs/web-components-${c.id}--docs`}
                  >
                    <span className="intro-chip-dot" />
                    {c.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ GUIDELINES ============ */}
      <section className="intro-section">
        <div className="intro-container">
          <div className="intro-section-head">
            <span className="intro-section-eyebrow">Guidelines</span>
            <h2>Personalize com intenção, não com força.</h2>
            <p className="intro-section-sub">
              Estas práticas garantem que o DS continue consistente, atualizável e acessível
              mesmo quando os times precisarem adaptar visual ou comportamento.
            </p>
          </div>

          <div className="intro-guidelines">
            <article className="intro-gcard">
              <h4>Tokens primeiro</h4>
              <div className="intro-gcheck intro-gcheck-do">
                <span className="intro-gcheck-icon">
                  <CheckIcon />
                </span>
                <span>
                  <strong>Use:</strong> <code>--ds-primitive-color-identity-blue-primary</code> para
                  estabelecer a cor primária. Tokens são versionados e auditáveis.
                </span>
              </div>
              <div className="intro-gcheck intro-gcheck-dont">
                <span className="intro-gcheck-icon">
                  <XIcon />
                </span>
                <span>
                  <strong>Evite:</strong> hardcode como <code>color: #034EA2</code>. Quebra o
                  contrato com o Figma e perde theming.
                </span>
              </div>
            </article>

            <article className="intro-gcard">
              <h4>Customização por CSS custom properties</h4>
              <div className="intro-gcheck intro-gcheck-do">
                <span className="intro-gcheck-icon">
                  <CheckIcon />
                </span>
                <span>
                  <strong>Use:</strong> redefinição de variáveis CSS em um wrapper (
                  <code>:root</code> ou escopo) para alterar o visual de um componente inteiro
                  sem tocar no código dele.
                </span>
              </div>
              <div className="intro-gcheck intro-gcheck-dont">
                <span className="intro-gcheck-icon">
                  <XIcon />
                </span>
                <span>
                  <strong>Evite:</strong> sobrescrever classes internas via <code>!important</code>.
                  É frágil, quebra em updates e dificulta debugging.
                </span>
              </div>
            </article>

            <article className="intro-gcard">
              <h4>Composição &gt; configuração</h4>
              <div className="intro-gcheck intro-gcheck-do">
                <span className="intro-gcheck-icon">
                  <CheckIcon />
                </span>
                <span>
                  <strong>Use:</strong> <code>children</code> e slots para variar conteúdo. Mantenha
                  os componentes pequenos e combine-os para criar UI complexa.
                </span>
              </div>
              <div className="intro-gcheck intro-gcheck-dont">
                <span className="intro-gcheck-icon">
                  <XIcon />
                </span>
                <span>
                  <strong>Evite:</strong> adicionar dezenas de props para cada caso de uso. Se
                  precisar de muita variação, é sinal de composição faltando.
                </span>
              </div>
            </article>

            <article className="intro-gcard">
              <h4>Acessibilidade não é opcional</h4>
              <div className="intro-gcheck intro-gcheck-do">
                <span className="intro-gcheck-icon">
                  <CheckIcon />
                </span>
                <span>
                  <strong>Use:</strong> labels visíveis, foco com 2 px de outline, contraste mínimo
                  4.5:1, e teste com leitor de tela antes de aceitar a entrega.
                </span>
              </div>
              <div className="intro-gcheck intro-gcheck-dont">
                <span className="intro-gcheck-icon">
                  <XIcon />
                </span>
                <span>
                  <strong>Evite:</strong> <code>outline: none</code> sem alternativa, ícones
                  decorativos sem <code>aria-hidden</code>, ou cor como única indicação de estado.
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ FIGMA CARD (DISABLED) ============ */}
      <section className="intro-section tight">
        <div className="intro-container">
          <div className="intro-figma" aria-disabled="true">
            <span className="intro-figma-locked">
              <LockIcon /> Em breve
            </span>
            <div>
              <span className="intro-section-eyebrow">Figma</span>
              <h3>Abra o arquivo Figma do Design System.</h3>
              <p>
                Em breve você acessará diretamente daqui a biblioteca completa de componentes,
                tokens e fluxos no Figma — com paridade total ao que está implementado no código.
                Por enquanto, a sincronização ocorre via Style Dictionary.
              </p>
              <span className="intro-figma-cta">
                <FigmaMark size={16} />
                Abrir no Figma
              </span>
            </div>
            <div className="intro-figma-art" aria-hidden>
              <div className="intro-figma-art-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="intro-figma-art-body" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRINCIPLES STRIP ============ */}
      <section className="intro-principles">
        <div className="intro-container intro-principles-inner">
          <span className="intro-section-eyebrow">Princípios</span>
          <h2>Cinco ideias que orientam toda decisão.</h2>
          <p className="intro-section-sub">
            Quando há dúvida sobre escopo, escala ou abordagem, esses princípios servem como
            critério de desempate.
          </p>

          <div className="intro-principles-list">
            <div className="intro-principle">
              <div className="intro-principle-num">01</div>
              <h4>Acessibilidade é aceite</h4>
              <p>Requisito de definition of done, não etapa posterior à entrega.</p>
            </div>
            <div className="intro-principle">
              <div className="intro-principle-num">02</div>
              <h4>Tokens decidem visual</h4>
              <p>A fonte técnica para qualquer escolha de cor, espaço ou tipografia.</p>
            </div>
            <div className="intro-principle">
              <div className="intro-principle-num">03</div>
              <h4>Pequeno e testável</h4>
              <p>Componentes minimalistas, documentados e independentes de aplicação.</p>
            </div>
            <div className="intro-principle">
              <div className="intro-principle-num">04</div>
              <h4>Stories são contrato</h4>
              <p>Demonstram comportamento real, estados e critérios de uso aprovados.</p>
            </div>
            <div className="intro-principle">
              <div className="intro-principle-num">05</div>
              <h4>Multiplataforma desde a base</h4>
              <p>
                Web primeiro, mas tokens estruturados para crescer para iOS e Android sem
                refundação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ NAVIGATE NEXT ============ */}
      <section className="intro-next">
        <div className="intro-container">
          <div className="intro-section-head" style={{ marginBottom: 32 }}>
            <span className="intro-section-eyebrow">Próximos passos</span>
            <h2>Continue por aqui.</h2>
          </div>
          <div className="intro-next-grid">
            <a className="intro-next-card" href={STORYBOOK_LINKS.foundationsOverview}>
              <div>
                <strong>Foundations</strong>
                <span>Tokens, cores, tipografia e grids</span>
              </div>
              <ArrowRight />
            </a>
            <a className="intro-next-card" href={STORYBOOK_LINKS.componentButton}>
              <div>
                <strong>Web Components</strong>
                <span>
                  {IMPLEMENTED_COMPONENTS} de {TARGET_COMPONENTS} prontos · em progresso
                </span>
              </div>
              <ArrowRight />
            </a>
            <a className="intro-next-card" href={STORYBOOK_LINKS.accessibility}>
              <div>
                <strong>Acessibilidade</strong>
                <span>Critérios, testes e padrões AA</span>
              </div>
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
