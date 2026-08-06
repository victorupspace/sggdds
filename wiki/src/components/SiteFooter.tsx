const ANO = 2026;

export function SiteFooter() {
  return (
    <footer className="wiki-footer">
      <div className="wiki-footer__interno">
        <div>
          <p>
            <strong>Sampa Design System</strong>
            <br />
            Governo do Estado de São Paulo — Prodesp
          </p>
          <p style={{ marginBlockStart: 'var(--ds-primitive-spacing-8)' }}>
            Documentação construída com os próprios componentes e tokens do sistema.
          </p>
        </div>

        <ul className="wiki-footer__links">
          <li>
            <a href="https://sggdds.vercel.app" rel="noreferrer noopener" target="_blank">
              Storybook
            </a>
          </li>
          <li>
            <a
              href="https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components"
              rel="noreferrer noopener"
              target="_blank"
            >
              Biblioteca no Figma
            </a>
          </li>
          <li>
            <a
              href="https://github.com/victorupspace/sggdds"
              rel="noreferrer noopener"
              target="_blank"
            >
              Repositório
            </a>
          </li>
          <li>
            <a href="/recursos/suporte/">Suporte</a>
          </li>
        </ul>
      </div>

      <p
        style={{
          maxInlineSize: '1200px',
          marginInline: 'auto',
          marginBlockStart: 'var(--ds-primitive-spacing-24)',
        }}
      >
        © {ANO} Prodesp. Código sob licença MIT.
      </p>
    </footer>
  );
}
