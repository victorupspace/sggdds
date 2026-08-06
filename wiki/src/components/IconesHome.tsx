/**
 * Ícones da home, no traço do Material Symbols outlined — o mesmo conjunto que
 * o Sampa DS usa (2.193 ícones, peso 300). Desenhados inline para a home não
 * depender de rede nem de fonte de ícone.
 *
 * Todos são decorativos: quem lê por leitor de tela recebe o texto ao lado.
 */
export function Icone({ nome }: { nome: NomeDeIcone }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      viewBox="0 0 24 24"
      width="24"
    >
      {DESENHOS[nome]}
    </svg>
  );
}

export type NomeDeIcone = keyof typeof DESENHOS;

const DESENHOS = {
  // widgets — componentes
  componentes: (
    <>
      <rect height="7" rx="1" width="7" x="3" y="3" />
      <rect height="7" rx="1" width="7" x="14" y="3" />
      <rect height="7" rx="1" width="7" x="3" y="14" />
      <rect height="7" rx="1" width="7" x="14" y="14" />
    </>
  ),
  // palette — tokens
  tokens: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="8.5" cy="10" r="1.2" />
      <circle cx="12" cy="7.5" r="1.2" />
      <circle cx="15.5" cy="10" r="1.2" />
      <path d="M12 21a3 3 0 0 1 0-6 2 2 0 0 0 0-4" />
    </>
  ),
  // grid_view — ícones
  icones: (
    <>
      <circle cx="7" cy="7" r="3" />
      <rect height="6" rx="1" width="6" x="14" y="4" />
      <path d="M7 14v6M4 17h6" />
      <path d="M17 14l3 6h-6z" />
    </>
  ),
  // play_circle — exemplos
  exemplos: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5-6 3.5z" />
    </>
  ),
  // draw — quem projeta
  projeta: (
    <>
      <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
      <path d="M14.5 6.5l3 3" />
    </>
  ),
  // code — quem desenvolve
  desenvolve: (
    <>
      <path d="M8.5 8L4 12l4.5 4" />
      <path d="M15.5 8l4.5 4-4.5 4" />
    </>
  ),
  // edit_note — quem escreve
  escreve: (
    <>
      <path d="M4 6h13M4 11h8M4 16h6" />
      <path d="M20 10.5l-6 6V19h2.5l6-6a1.8 1.8 0 0 0-2.5-2.5z" />
    </>
  ),
  // verified — quem contrata
  contrata: (
    <>
      <path d="M12 3l2.4 1.8 3-.2.9 2.9 2.4 1.8-1.2 2.7 1.2 2.7-2.4 1.8-.9 2.9-3-.2L12 21l-2.4-1.8-3 .2-.9-2.9L3.3 14.7 4.5 12 3.3 9.3l2.4-1.8.9-2.9 3 .2z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  // fact_check — verificado
  verificado: (
    <>
      <rect height="16" rx="2" width="18" x="3" y="4" />
      <path d="M7 9l1.5 1.5L11 8" />
      <path d="M7 15l1.5 1.5L11 14" />
      <path d="M14 9.5h4M14 15.5h4" />
    </>
  ),
  // accessibility_new — acessibilidade
  acessibilidade: (
    <>
      <circle cx="12" cy="4.5" r="1.6" />
      <path d="M4 8.5c2.5 1 5.3 1.5 8 1.5s5.5-.5 8-1.5" />
      <path d="M12 9.5V15m0 0l-2.5 5.5M12 15l2.5 5.5" />
    </>
  ),
  // pending_actions — pendências
  pendencias: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  // search
  busca: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </>
  ),
  // arrow_forward
  seta: <path d="M4 12h15m0 0l-5.5-5.5M19 12l-5.5 5.5" />,
  // open_in_new
  externo: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4l-8.5 8.5" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </>
  ),
} as const;
