# LACUNAS.md — pendências abertas da Wiki do Design System

**389 pendências** levantadas na Fase 0, das quais **190 bloqueiam o aceite** (atingem uma exigência contratual ou um critério da Definition of Done).

| Bloco | O que reúne | Linhas | Bloqueiam aceite |
|---|---|---:|---:|
| A | Lacunas transversais às 38 páginas de componente | 25 | 12 |
| B | Lacunas por componente | 248 | 80 |
| C | Lacunas de fundamentos | 95 | 79 |
| D | Lacunas de infraestrutura, identidade e páginas de recurso | 21 | 19 |
| | **Total** | **389** | **190** |

Como ler a coluna **Bloqueia aceite?**: "Sim" cita a exigência contratual (1 a 5) ou o critério da
Definition of Done (§12) que a pendência derruba, na numeração de `MATRIZ-DE-ACEITE.md`. "Não"
significa que a página pode ser publicada com a pendência registrada — não que ela seja irrelevante.

Os textos do bloco B são **reproduzidos literalmente** do campo `pendencias` de cada
`wiki/data/components/*.json`; parte deles foi gravada sem acentuação pela extração e foi mantida
assim para preservar a rastreabilidade até a origem.

---

## Bloco A — Lacunas transversais às 38 páginas de componente

Cada linha vale para as 38 páginas de componente ao mesmo tempo. São as lacunas que a
`COBERTURA.md` marca como ❌ ou ⚠️ em coluna inteira.

| # | Página/rota | Seção | Dado faltante | Fonte esperada | Responsável sugerido | Bloqueia aceite? |
|---|---|---|---|---|---|---|
| 1 | `/componentes/* (38 páginas) · Aba 1` | Quando usar | Seção completa (contexto, critério de escolha, alternativa). 15 componentes não têm nem uma frase: `action-card`, `alert`, `breadcrumb`, `card`, `checkbox`, `chip`, `datepicker`, `divider`, `dropdown`, `file-upload`, `header`, `hero`, `modal`, `progress-bar`, `stepper`. Os outros 23 têm uma frase só. | Time (editorial) — Figma tem 0 descrições nos 58 componentes | Design + Produto | Sim — exigência 2 e DoD #2 |
| 2 | `/componentes/* (38 páginas) · Aba 1` | Quando não usar | Seção completa. 16 sem nenhuma frase: `action-card`, `alert`, `breadcrumb`, `card`, `checkbox`, `chip`, `datepicker`, `divider`, `dropdown`, `file-upload`, `header`, `hero`, `list-item`, `modal`, `progress-bar`, `stepper`. | Time (editorial) | Design + Produto | Sim — exigência 2 e DoD #2 |
| 3 | `/componentes/* (38 páginas) · Aba 1` | Anatomia numerada | Frame anotado com numeração das partes. Nenhum componente tem; 33 têm lista de partes inferível, 5 não têm nem isso (`avatar`, `back-to-top`, `badge`, `divider`, `spinner`). | Figma (frame de anatomia) + time | Design | Sim — exigência 2 e DoD #2 |
| 4 | `/componentes/* (38 páginas) · Aba 1` | Do & don't (3 pares) | Os 3 pares por componente = 114 pares. Zero existem hoje, em nenhuma fonte. | Time (editorial) + Design (imagem do par) | Design | Sim — exigência 2 e DoD #2 |
| 5 | `/componentes/* (38 páginas) · Aba 1` | Variantes | Confirmação explícita de "não possui variantes" nos 6 sem eixo extraído: `breadcrumb`, `checkbox`, `footer`, `header`, `pagination`, `toggle`. | Time + código | Eng front-end | Não |
| 6 | `/componentes/* (38 páginas) · Aba 1` | Tamanhos | 31 componentes não têm eixo de tamanho; as dimensões são literais no CSS sem token (Badge 22/24/28px, Toggle 44px, Header 80px, Toast 496px, Modal, Stepper…). Falta decidir se há escala de tamanho ou se a página declara tamanho único. | Figma (variables de sizing) + time | Design tokens | Não |
| 7 | `/componentes/* (38 páginas) · Aba 1` | Comportamento responsivo | 12 componentes têm breakpoint definido só no CSS, sem variante mobile no Figma, ou não têm @media nenhum: `alert`, `badge`, `breadcrumb`, `card`, `carousel`, `checkbox`, `datepicker`, `divider`, `dropdown`, `hero`, `radio`, `tooltip`. | Figma (variantes mobile) | Design | Não |
| 8 | `/componentes/* (38 páginas) · Aba 2` | Conteúdo e escrita | Guia de escrita por componente (tom, tamanho de rótulo, maiúsculas, voz). Não existe em nenhuma fonte. | Time (UX writing) | Conteúdo/UX writing | Sim — exigência 3 |
| 9 | `/componentes/* (38 páginas) · Aba 2` | Hierarquia e posicionamento | 31 componentes não expõem nenhuma prop de posição/alinhamento e não têm regra documentada de onde o componente vive na página. | Time (editorial) + Design | Design | Não |
| 10 | `/componentes/* (38 páginas) · Aba 2` | Combinação com outros componentes | 17 componentes não citam nenhum outro componente do DS na prosa extraída: `accordion`, `alert`, `avatar`, `back-to-top`, `badge`, `breadcrumb`, `button`, `checkbox`, `chip`, `divider`, `dropdown`, `list-item`, `progress-bar`, `stepper`, `tabs`, `text-input`, `tooltip`. Nos outros 21 a menção é uma frase, não a seção. | Time (editorial) | Design | Não |
| 11 | `/componentes/* (38 páginas) · Aba 2` | 2+ exemplos práticos | Narrativa do caso de uso (contexto, decisão, resultado) nos 38. As stories entregam código e render, não o exemplo aplicado. | Time (editorial) + Storybook | Design + Eng front-end | Sim — exigência 3 |
| 12 | `/componentes/* (38 páginas) · Aba 2` | Erros comuns | Lista de erros de consumo por componente. Nenhuma fonte registra erro de consumidor. | Time (suporte + editorial) | Design + Suporte | Sim — exigência 2 |
| 13 | `/componentes/* (38 páginas) · Aba 2` | Acessibilidade | Afirmação de conformidade WCAG 2.1 AA. Só 13 dos 38 têm teste axe; 25 não têm nenhum: `accordion`, `action-card`, `alert`, `avatar`, `back-to-top`, `badge`, `breadcrumb`, `button-gov`, `card`, `chip`, `data-table`, `divider`, `footer`, `header`, `hero`, `link`, `list-item`, `pagination`, `progress-bar`, `skeleton`, `spinner`, `stepper`, `text-area`, `toast`, `tooltip`. | Repo (testes) + auditoria da Fase 6 | Eng front-end | Sim — DoD #7 |
| 14 | `/componentes/* (38 páginas) · Aba 3` | Instalação / import | Comando de instalação real. `@government/design-system` e `@government/tokens` retornam 404 no npm; a home do Storybook cita `@sggd/design-system`, que não existe. | Time (decisão de distribuição: npm público, registro privado ou instalação por Git) | Gestão do DS + Eng | Sim — exigência 4 e DoD #2 |
| 15 | `/componentes/* (38 páginas) · Aba 3` | Links Storybook / Figma / repositório | Link de Figma rastreável. 14 componentes só têm par por nome (sem node-id no código) e 4 não têm par nenhum. | Figma + repo (Code Connect ou comentário com node-id) | Design + Eng front-end | Sim — DoD #5 |
| 16 | `/componentes/* (38 páginas) · Rodapé` | Status | Campo de status (estável / beta / descontinuado). Não existe em nenhuma fonte. | Time (política de ciclo de vida) | Gestão do DS | Sim — DoD #2 |
| 17 | `/componentes/* (38 páginas) · Rodapé` | Versão de introdução | Versão em que cada componente entrou. Zero tags git, nenhum CHANGELOG.md, versão `0.1.0` para tudo; changesets configurado e nunca usado. | Time (política de versionamento) + repo | Gestão do DS + Eng | Sim — DoD #2 |
| 18 | `/componentes/* (38 páginas) · Rodapé` | Última atualização | Data útil por componente. `git log` devolve 2026-08-05 para os 38; o `updatedAt` do Figma existe mas não foi gravado em `figma-components.json`. | Figma (re-extração) + git | Eng (pipeline da Wiki) | Não |
| 19 | `/componentes/* (38 páginas) · Rodapé` | Responsável | Pessoa ou squad dona de cada componente. Sem CODEOWNERS, sem `author`/`maintainers` em `packages/react/package.json`. | Time | Gestão do DS | Não |
| 20 | `/componentes/* (38 páginas) · Rodapé` | Sugerir melhoria | Canal e template. Repositório é público, então a URL de issue é derivável, mas não há `.github/ISSUE_TEMPLATE` nem canal de atendimento definido. | Time | Gestão do DS | Não |
| 21 | `/componentes/* (38 páginas) · Aba 3` | Eventos | 10 componentes não têm callback extraído: `accordion`, `avatar`, `badge`, `breadcrumb`, `card`, `divider`, `hero`, `progress-bar`, `skeleton`, `spinner`. Precisa confirmar "não emite eventos" — em `skeleton` a afirmação seria falsa (repassa handlers nativos por rest props). | Repo | Eng front-end | Não |
| 22 | `/componentes/* (38 páginas) · Aba 3` | Slots | 11 componentes sem slot extraído; confirmar "não expõe slots". | Repo | Eng front-end | Não |
| 23 | `/componentes/* (38 páginas) · Aba 3` | Classes e variáveis CSS expostas | Marcar como inertes as classes aplicadas pelo TSX que não têm regra no CSS (`.ds-button--loading`, `.ds-button-gov--loading`, `.ds-datepicker--open/--error/--success/--read-only`, `.ds-dropdown--open/--error`, `.ds-toast--without-description/--without-actions`, `.ds-header--user-menu-open`, `.ds-data-table--loading`, `.ds-divider--with-label`, `.ds-tooltip--disabled`). | Repo | Eng front-end | Não |
| 24 | `/componentes/* (38 páginas) · Aba 2` | Tabela de tokens por parte/estado | 14 componentes têm menos de 80% das custom properties com comentário de parte/estado: `accordion`, `action-card`, `avatar`, `back-to-top`, `button-gov`, `carousel`, `cookie-consent-banner`, `data-table`, `footer`, `list-item`, `meganav`, `pagination`, `skeleton`, `toggle`. | Repo (comentários no CSS) | Eng front-end | Não |
| 25 | `/componentes/* (38 páginas) · Aba 3` | API completa | 16 componentes têm props sem descrição, fora de `argTypes` ou herdadas de tipos nativos: `accordion`, `breadcrumb`, `button-gov`, `button`, `card`, `carousel`, `checkbox`, `chip`, `cookie-consent-banner`, `data-table`, `meganav`, `modal`, `radio`, `skeleton`, `text-area`, `text-input`. | Repo (JSDoc + argTypes) | Eng front-end | Não |

---

## Bloco B — Lacunas por componente

As 248 linhas vêm de duas origens: as **244 pendências técnicas** já registradas nos JSONs
de componente e **4 linhas adicionais** para os componentes sem par publicado no Figma
(`back-to-top`, `list-item`, `meganav`, `skeleton`), fato que os JSONs não registram.

| # | Página/rota | Seção | Dado faltante | Fonte esperada | Responsável sugerido | Bloqueia aceite? |
|---|---|---|---|---|---|---|
| 26 | `/componentes/accordion` | Aba 3 · API completa | AccordionItem nao possui entrada propria no meta/argTypes do Storybook; suas props foram extraidas apenas de Accordion.types.ts (prefixadas com "AccordionItem." neste JSON). | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 27 | `/componentes/accordion` | Aba 3 · Notas e limitações | Nao ha componente controlado: o Accordion so aceita defaultExpanded (estado interno). Nao existe prop expanded/onChange no codigo. | Repo | Eng front-end | Não |
| 28 | `/componentes/accordion` | Aba 2 · Acessibilidade | Nao existe arquivo Accordion.a11y.test.tsx. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 29 | `/componentes/accordion` | Aba 2 · Tabela de tokens | Os valores concretos dos tokens --ds-* (cores, tamanhos em px) nao estao neste diretorio; ficam em packages/tokens. | `wiki/data/tokens.json` (1.472 variáveis) | Eng (pipeline da Wiki) | Não |
| 30 | `/componentes/accordion` | Aba 3 · Notas e limitações | O parametro parameters.componentCanvas.width = 720 nao tem campo correspondente no schema. | Repo (Storybook) | Eng front-end | Não |
| 31 | `/componentes/action-card` | Aba 2 · Acessibilidade | Nao existe arquivo ActionCard.a11y.test.tsx. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 32 | `/componentes/action-card` | Aba 1 · Variantes e estados | Nao ha estado disabled implementado (nem prop, nem CSS). | Repo + Figma | Eng front-end + Design | Não |
| 33 | `/componentes/action-card` | Aba 1 · Variantes e estados | O modo de renderizacao (article / button / link) nao e uma prop enumerada — deriva de href e onClick, entao nao aparece como variante em "variants". | Repo + Figma | Eng front-end + Design | Não |
| 34 | `/componentes/action-card` | Aba 2 · Tabela de tokens | A borda default do Figma (color/border/default, #e0e0e0) nao existe nas collections exportadas; o CSS usa --ds-semantic-color-border-neutral-subtle como equivalente (registrado em comentario). | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 35 | `/componentes/action-card` | Aba 2 · Tabela de tokens | Os valores concretos dos tokens --ds-* nao estao neste diretorio; ficam em packages/tokens. | `wiki/data/tokens.json` (1.472 variáveis) | Eng (pipeline da Wiki) | Não |
| 36 | `/componentes/action-card` | Aba 3 · Notas e limitações | Os parametros parameters.componentCanvas.width (300 no meta, 960 na story Grid) nao tem campo correspondente no schema. | Repo (Storybook) | Eng front-end | Não |
| 37 | `/componentes/alert` | Aba 2 · Acessibilidade | Nao existe arquivo Alert.a11y.test.tsx. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 38 | `/componentes/alert` | Aba 3 · Links (Figma) | O icone do botao de fechar ("Icons / General / Close — vetor com inset de 20.83% na caixa de 16px") esta citado no codigo sem node-id do Figma. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 39 | `/componentes/alert` | Aba 3 · Notas e limitações | O node do Figma nao define estados hover/active para o botao de fechar; o CSS usa alpha neutro e alert/close button/color/icon/hover como aproximacao documentada em comentario. | Repo | Eng front-end | Não |
| 40 | `/componentes/alert` | Aba 1 · Comportamento responsivo | O node do Figma nao define variante mobile do Alert; o componente nao possui @media de largura no .styles.css (o @media (max-width: 420px) existente esta em Alert.stories.css, que so afeta o cenario das stories). | Figma (variante mobile) | Design | Não |
| 41 | `/componentes/alert` | Aba 3 · Notas e limitações | A variante Information do Figma usa gap de 8px sem altura minima; o CSS adotou o padrao das demais variantes para as quatro, por consistencia (registrado em comentario). | Repo | Eng front-end | Não |
| 42 | `/componentes/alert` | Aba 3 · Notas e limitações | Nao ha prop para trocar o icone da variante — os SVGs sao fixos no Alert.tsx. | Repo | Eng front-end | Não |
| 43 | `/componentes/alert` | Aba 2 · Tabela de tokens | Os valores concretos dos tokens --ds-* nao estao neste diretorio; ficam em packages/tokens. | `wiki/data/tokens.json` (1.472 variáveis) | Eng (pipeline da Wiki) | Não |
| 44 | `/componentes/alert` | Aba 3 · Notas e limitações | O parametro parameters.componentCanvas.width = 480 nao tem campo correspondente no schema. | Repo (Storybook) | Eng front-end | Não |
| 45 | `/componentes/avatar` | Aba 2 · Acessibilidade | Nao existe arquivo Avatar.a11y.test.tsx. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 46 | `/componentes/avatar` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado em comentarios do codigo do Avatar (nem no TSX nem no CSS). | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 47 | `/componentes/avatar` | Aba 2 · Tabela de tokens | A docsDescription menciona que o fallback textual usa 'soft black' como superficie, mas o CSS usa --ds-semantic-text-style-content-color-typography-secondary como --avatar-background; a equivalencia nao pode ser confirmada apenas por este diretorio. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 48 | `/componentes/avatar` | Aba 3 · Notas e limitações | Nao ha prop para status/badge, nem agrupamento (AvatarGroup) no codigo. | Repo | Eng front-end | Não |
| 49 | `/componentes/avatar` | Aba 2 · Tabela de tokens | Os valores concretos dos tokens --ds-* nao estao neste diretorio; ficam em packages/tokens. | `wiki/data/tokens.json` (1.472 variáveis) | Eng (pipeline da Wiki) | Não |
| 50 | `/componentes/avatar` | Aba 3 · Notas e limitações | Os parametros parameters.componentCanvas.width (640 no meta, 320 na story MobileResponsive) nao tem campo correspondente no schema. | Repo (Storybook) | Eng front-end | Não |
| 51 | `/componentes/back-to-top` | Aba 1 · Anatomia + Aba 3 · Links | `BackToTop` não tem componente publicado na biblioteca Web Components do Figma (58 publicados, nenhum corresponde). Sem par, não há frame de anatomia nem link de design. | Figma (criar/publicar o componente) | Design | Sim — DoD #5 |
| 52 | `/componentes/back-to-top` | Aba 2 · Acessibilidade | Nao existe arquivo BackToTop.a11y.test.tsx. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 53 | `/componentes/back-to-top` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado em comentarios do codigo do BackToTop (nem no TSX nem no CSS). | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 54 | `/componentes/back-to-top` | Aba 3 · Notas e limitações | O CSS faz @import de uma fonte externa (https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded...), entao o icone depende de rede/CDN — nao ha fallback SVG no codigo. | Repo | Eng front-end | Não |
| 55 | `/componentes/back-to-top` | Aba 2 · Tabela de tokens | --back-to-top-z-index e um valor literal (50), sem token correspondente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 56 | `/componentes/back-to-top` | Aba 2 · Tabela de tokens | A cor de foco e descrita como 'identity blue' na doc, mas o CSS usa --ds-semantic-color-background-brand-primary-secondary-default; a equivalencia nao pode ser confirmada apenas por este diretorio. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 57 | `/componentes/back-to-top` | Aba 3 · Notas e limitações | O componente e sempre position: fixed no CSS do proprio componente; nas stories ele e reposicionado para absolute via .back-to-top-story-panel .ds-back-to-top. | Repo | Eng front-end | Não |
| 58 | `/componentes/back-to-top` | Aba 2 · Tabela de tokens | Os valores concretos dos tokens --ds-* nao estao neste diretorio; ficam em packages/tokens. | `wiki/data/tokens.json` (1.472 variáveis) | Eng (pipeline da Wiki) | Não |
| 59 | `/componentes/back-to-top` | Aba 3 · Notas e limitações | Os parametros parameters.componentCanvas.width (640 no meta, 320 na story MobileResponsive) nao tem campo correspondente no schema. | Repo (Storybook) | Eng front-end | Não |
| 60 | `/componentes/badge` | Aba 2 · Acessibilidade | Nao existe arquivo Badge.a11y.test.tsx. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 61 | `/componentes/badge` | Aba 3 · Notas e limitações | Nao ha nenhum @media no Badge.styles.css — a responsividade e feita por max-inline-size: 100% e truncamento do label, entao "responsive" fica vazio. | Repo | Eng front-end | Não |
| 62 | `/componentes/badge` | Aba 1 · Variantes e estados | Nao ha estados interativos no CSS (sem :hover, :focus-visible, :active ou :disabled) — "states" fica vazio, coerente com a orientacao de nao usar o Badge como botao ou link. | Repo + Figma | Eng front-end + Design | Não |
| 63 | `/componentes/badge` | Aba 2 · Tabela de tokens | As alturas (22px, 24px, 28px) e o tamanho do icone (14px) sao valores literais: o grupo sizing/badge/height-sm/md/lg do Figma ainda nao existe nas collections exportadas (registrado em comentario no CSS). | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 64 | `/componentes/badge` | Aba 2 · Tabela de tokens | A cor do texto de notice + subtle e o literal #936700, sem variable correspondente na collection. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 65 | `/componentes/badge` | Aba 2 · Tabela de tokens | Divergencia anotada no codigo: color/background/brand/primary/default resolve #c60008 no Figma, mas a collection exportada traz #c50007. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 66 | `/componentes/badge` | Aba 2 · Tabela de tokens | Os valores concretos dos tokens --ds-* nao estao neste diretorio; ficam em packages/tokens. | `wiki/data/tokens.json` (1.472 variáveis) | Eng (pipeline da Wiki) | Não |
| 67 | `/componentes/badge` | Aba 3 · Notas e limitações | Os parametros parameters.componentCanvas.width (560 no meta, 180 na story LongLabel) nao tem campo correspondente no schema. | Repo (Storybook) | Eng front-end | Não |
| 68 | `/componentes/breadcrumb` | Aba 2 · Acessibilidade | Nao existe arquivo Breadcrumb.a11y.test.tsx; nao ha teste automatizado de acessibilidade (axe) para este componente. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 69 | `/componentes/breadcrumb` | Aba 3 · Notas e limitações | O estado hover nao existe no node do Figma (so Enabled); o CSS documenta que --ds-component-breadcrumbs-color-text-hover e uma aproximacao. | Repo | Eng front-end | Não |
| 70 | `/componentes/breadcrumb` | Aba 1 · Comportamento responsivo | A variante mobile nao existe no Figma; o breakpoint 640px foi definido no CSS do componente, sem referencia de design. | Figma (variante mobile) | Design | Não |
| 71 | `/componentes/breadcrumb` | Aba 3 · API completa | Os argTypes das stories nao declaram table.type/table.defaultValue; os tipos e defaults vieram de Breadcrumb.types.ts e da desestruturacao em Breadcrumb.tsx. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 72 | `/componentes/breadcrumb` | Aba 3 · Notas e limitações | O parametro parameters.componentCanvas.width = 1040 nao esta documentado no codigo do componente (decorator externo do Storybook). | Repo (Storybook) | Eng front-end | Não |
| 73 | `/componentes/breadcrumb` | Aba 3 · Notas e limitações | Nao ha CHANGELOG/versionamento por componente no diretorio para indicar a versao em que o layout novo entrou. | Repo | Eng front-end | Não |
| 74 | `/componentes/button-gov` | Aba 2 · Acessibilidade | Nao existe arquivo ButtonGov.a11y.test.tsx; nao ha teste automatizado de acessibilidade (axe) para este componente. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 75 | `/componentes/button-gov` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo; a rastreabilidade com o design so aparece de forma generica ("tokens do Figma", "especificacao do componente"). | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 76 | `/componentes/button-gov` | Aba 2 · Tabela de tokens | Os pesos tipograficos 600 e 700 (.ds-button-gov__label-base / __label-brand e o font-weight do bloco raiz) sao valores literais no CSS, sem token --ds-primitive-typography-font-weight-* correspondente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 77 | `/componentes/button-gov` | Aba 2 · Tabela de tokens | A largura de 250px e literal (--button-gov-inline-size) por falta de token equivalente, conforme documentado nas stories. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 78 | `/componentes/button-gov` | Aba 3 · Classes e variáveis CSS | A classe .ds-button-gov--loading e aplicada pelo TSX mas nao possui regra no ButtonGov.styles.css. | Repo (CSS) | Eng front-end | Não |
| 79 | `/componentes/button-gov` | Aba 3 · API completa | Os argTypes nao declaram table.type/table.defaultValue; os defaults vieram da desestruturacao em ButtonGov.tsx. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 80 | `/componentes/button-gov` | Aba 3 · Notas e limitações | Os parametros parameters.componentCanvas.width (520 no meta, 320 na story MobileResponsive) nao estao documentados no codigo do componente. | Repo (Storybook) | Eng front-end | Não |
| 81 | `/componentes/button` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo do Button (nem no TSX, nem no CSS, nem nas stories) — a rastreabilidade com o design so aparece de forma generica ("tokens do Figma"). | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 82 | `/componentes/button` | Aba 3 · Classes e variáveis CSS | A classe .ds-button--loading e aplicada pelo TSX mas nao possui nenhuma regra no Button.styles.css; nao da para determinar pelo codigo se e um gancho para consumidores ou uma sobra. | Repo (CSS) | Eng front-end | Não |
| 83 | `/componentes/button` | Aba 3 · Classes e variáveis CSS | A classe .ds-button--variant-primary tambem nao tem regra propria (primary e o estado base de .ds-button). | Repo (CSS) | Eng front-end | Não |
| 84 | `/componentes/button` | Aba 3 · API completa | As props target, rel, ariaControls, ariaExpanded e ariaPressed nao aparecem em argTypes nem em nenhuma story; nao ha descricao autoral para elas alem do tipo. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 85 | `/componentes/button` | Aba 3 · API completa | Os argTypes nao declaram table.type/table.defaultValue; os defaults vieram da desestruturacao em Button.tsx. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 86 | `/componentes/button` | Aba 3 · Notas e limitações | O parametro parameters.componentCanvas.width = 360 nao esta documentado no codigo do componente. | Repo (Storybook) | Eng front-end | Não |
| 87 | `/componentes/button` | Aba 3 · Links (Storybook) | Existem stories homonimas em SwiftUI/Button e Android/Button (showcase/), fora do diretorio React; elas nao foram incluidas aqui porque o title difere de "Web Components/Button". | Repo (showcase/) | Eng front-end | Não |
| 88 | `/componentes/card` | Aba 2 · Acessibilidade | Nao existe arquivo Card.a11y.test.tsx; nao ha teste automatizado de acessibilidade (axe) para este componente. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 89 | `/componentes/card` | Aba 2 · Tabela de tokens | As variables color/state/hover, color/state/pressed, color/border/focus e color/border/default nao existem nas collections exportadas; o CSS usa valores literais (rgba/#3366e5) ou aproximacoes documentadas. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 90 | `/componentes/card` | Aba 2 · Tabela de tokens | As elevacoes (--card-shadow, --card-shadow-hover, --card-shadow-pressed) sao Effect Styles do Figma, nao variables — nao ha token --ds-* correspondente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 91 | `/componentes/card` | Aba 2 · Tabela de tokens | Valores literais sem token: gap de 11px em .ds-card__title-row, barra do titulo 4x25px, midia 180px/140px, min-inline-size 400px do layout horizontal, outline 2px/offset 3px do focus ring e block-size 1px do divider. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 92 | `/componentes/card` | Aba 3 · Classes e variáveis CSS | A classe .ds-card--orientation-vertical e gerada pelo TSX mas nao tem regra no CSS (vertical e o estado base de .ds-card). | Repo (CSS) | Eng front-end | Não |
| 93 | `/componentes/card` | Aba 1 · Comportamento responsivo | O breakpoint de 640px foi definido no CSS do componente; o Figma nao define variante mobile. | Figma (variante mobile) | Design | Não |
| 94 | `/componentes/card` | Aba 3 · API completa | Os argTypes nao declaram table.type/table.defaultValue; os defaults vieram da desestruturacao em Card.tsx. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 95 | `/componentes/card` | Aba 3 · Notas e limitações | Os parametros parameters.componentCanvas.width (400 no meta, 480 na story Horizontal) nao estao documentados no codigo do componente. | Repo (Storybook) | Eng front-end | Não |
| 96 | `/componentes/carousel` | Aba 3 · Notas e limitações | O CSS sobrescreve --card-content-gap em .ds-carousel__card.ds-card (@media max-width: 420px), mas essa custom property nao existe em Card.styles.css — nao da para determinar pelo codigo se e legado ou erro. | Repo | Eng front-end | Não |
| 97 | `/componentes/carousel` | Aba 3 · Notas e limitações | A custom property --carousel-current-index e consumida pelo CSS (transform do track) mas so e definida inline pelo TSX (trackStyle); ela nao aparece declarada no .styles.css. | Repo | Eng front-end | Não |
| 98 | `/componentes/carousel` | Aba 3 · Notas e limitações | As custom properties --carousel-surface, --carousel-hover, --carousel-muted e --carousel-border-strong sao declaradas mas nao consumidas em nenhuma regra do proprio Carousel.styles.css. | Repo | Eng front-end | Não |
| 99 | `/componentes/carousel` | Aba 3 · Classes e variáveis CSS | Somente .ds-carousel--visible-1 tem regra no CSS; as demais classes ds-carousel--visible-<n> geradas pelo TSX nao possuem estilos correspondentes. | Repo (CSS) | Eng front-end | Não |
| 100 | `/componentes/carousel` | Aba 3 · Notas e limitações | O TSX le --ds-primitive-spacing-128 e --ds-primitive-spacing-64 via getComputedStyle para calcular a largura minima do card (token128 * 2 + token64); --ds-primitive-spacing-64 nao aparece em var() no CSS do componente e por isso nao esta em tokensUsed. | Repo | Eng front-end | Não |
| 101 | `/componentes/carousel` | Aba 2 · Tabela de tokens | As cores dos indicadores (#4d4d4d, #c60008, #333333, rgb(255 255 255 / 70%), #ed4c4c), o fundo rgb(0 0 0 / 20%) do container on-dark, a pill de 20px e o padding-inline de 6px sao valores literais: as variables color/indicator/* e elevation/color/intense estao ausentes nas collections exportadas. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 102 | `/componentes/carousel` | Aba 2 · Tabela de tokens | A opacidade 0.38 dos estados desabilitados e literal, sem token correspondente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 103 | `/componentes/carousel` | Aba 2 · Acessibilidade | O arquivo Carousel.a11y.test.tsx tem apenas 1 caso (composicao basica); nao cobre indicadores on-dark, estado disabled nem navegacao por teclado. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 104 | `/componentes/carousel` | Aba 1 · Comportamento responsivo | Os breakpoints 900px/640px/420px foram definidos no CSS do componente; nao ha referencia de breakpoints no Figma citada no codigo. | Figma (variante mobile) | Design | Não |
| 105 | `/componentes/carousel` | Aba 3 · API completa | Os argTypes nao cobrem className, indicatorsLabel, labels e onIndexChange, e nao declaram table.type/table.defaultValue; os defaults vieram da desestruturacao e de defaultLabels em Carousel.tsx. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 106 | `/componentes/carousel` | Aba 3 · Notas e limitações | Os parametros parameters.componentCanvas.width (1280 no meta, 390 na story Mobile) nao estao documentados no codigo do componente. | Repo (Storybook) | Eng front-end | Não |
| 107 | `/componentes/checkbox` | Aba 2 · Tabela de tokens | A cor do focus ring (#2c84d0) e o branco a 84% sao valores literais: nao ha variable exposta na collection exportada (documentado no CSS). | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 108 | `/componentes/checkbox` | Aba 2 · Tabela de tokens | O tamanho do ripple (32px) e literal, sem token correspondente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 109 | `/componentes/checkbox` | Aba 3 · Notas e limitações | O tipo exportado CheckboxState ('unchecked' / 'checked' / 'indeterminate') nao e usado por CheckboxProps nem pelo Checkbox.tsx — nao da para determinar pelo codigo qual e o consumidor previsto. | Repo | Eng front-end | Não |
| 110 | `/componentes/checkbox` | Aba 3 · Notas e limitações | Nao existe arquivo Checkbox.stories.css; as stories usam estilos inline (objeto style no CheckboxGroup). | Repo | Eng front-end | Não |
| 111 | `/componentes/checkbox` | Aba 1 · Comportamento responsivo | O componente nao possui @media de breakpoint: o CSS documenta em comentario que o node do Figma nao define variante mobile e que a responsividade vem do controle fixo + quebra natural de texto. As stories GroupedStatesMobile e LongLabel apenas reduzem componentCanvas.width. | Figma (variante mobile) | Design | Não |
| 112 | `/componentes/checkbox` | Aba 1 · Variantes e estados | Nao ha estado de erro/invalido implementado (nem classe, nem prop), apesar de required existir. | Repo + Figma | Eng front-end + Design | Não |
| 113 | `/componentes/checkbox` | Aba 3 · API completa | Os argTypes nao declaram table.type/table.defaultValue; os defaults vieram da desestruturacao em Checkbox.tsx. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 114 | `/componentes/checkbox` | Aba 3 · Notas e limitações | Os parametros parameters.componentCanvas.width (520 no meta, 320 em LongLabel e GroupedStatesMobile) nao estao documentados no codigo do componente. | Repo (Storybook) | Eng front-end | Não |
| 115 | `/componentes/checkbox` | Aba 3 · Links (Storybook) | Existem stories homonimas em SwiftUI/Checkbox e Android/Checkbox (showcase/), fora do diretorio React; nao foram incluidas porque o title difere de "Web Components/Checkbox". | Repo (showcase/) | Eng front-end | Não |
| 116 | `/componentes/chip` | Aba 2 · Acessibilidade | Não existe arquivo .a11y.test.tsx para o Chip; a cobertura de acessibilidade automatizada não pôde ser determinada. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 117 | `/componentes/chip` | Aba 3 · Classes e variáveis CSS | As variantes 'support' e 'action' não possuem regra CSS própria (usam apenas o bloco base .ds-chip), então não é possível diferenciar visualmente as duas pelo código. | Repo (CSS) | Eng front-end | Não |
| 118 | `/componentes/chip` | Aba 2 · Tabela de tokens | Valores literais usados por ausência de variables exportadas (rgb(0 0 0 / 16%) para color/state/selected, #bdbdbd para color/border/strong, #1a612a para color/typography/success e #700000 para color/typography/danger) não têm token --ds-* correspondente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 119 | `/componentes/chip` | Aba 3 · API completa | Os argTypes das stories não declaram defaults; os valores default listados vêm da desestruturação em Chip.tsx. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 120 | `/componentes/chip` | Aba 3 · Notas e limitações | O Chip não encaminha ref nem props nativas adicionais (apenas className e onClick), e isso não está documentado explicitamente na doc do Storybook. | Repo | Eng front-end | Não |
| 121 | `/componentes/cookie-consent-banner` | Aba 3 · Links (Figma) | Nenhum node-id do Figma é citado no código do componente; a doc do Storybook menciona os tokens do Figma, mas sem referência de nó. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 122 | `/componentes/cookie-consent-banner` | Aba 3 · Notas e limitações | Os estados hover/active dos CTAs são implementados pelo componente Button; o CSS do banner apenas fornece aliases (--button-background-hover/active) para o CTA "Gerenciar cookies". | Repo | Eng front-end | Não |
| 123 | `/componentes/cookie-consent-banner` | Aba 3 · Classes e variáveis CSS | A custom property --cookie-consent-page-overlay é declarada mas não é consumida em nenhuma regra do arquivo — a intenção não pôde ser determinada. | Repo (CSS) | Eng front-end | Não |
| 124 | `/componentes/cookie-consent-banner` | Aba 3 · Notas e limitações | O CSS importa a fonte Material Symbols Rounded via @import de fonts.googleapis.com; não há fallback documentado caso a fonte não carregue. | Repo | Eng front-end | Não |
| 125 | `/componentes/cookie-consent-banner` | Aba 2 · Acessibilidade | Não há prop para fechar o banner manualmente (botão de fechar/X) nem interação de teclado (Escape) implementada. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 126 | `/componentes/cookie-consent-banner` | Aba 3 · API completa | A prop className não tem descrição em argTypes nem JSDoc em CookieConsentBanner.types.ts. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 127 | `/componentes/data-table` | Aba 3 · Links (Figma) | Nenhum node-id do Figma é citado no código do DataTable. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 128 | `/componentes/data-table` | Aba 2 · Acessibilidade | Não existe arquivo .a11y.test.tsx para o DataTable. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 129 | `/componentes/data-table` | Aba 3 · Notas e limitações | A classe ds-data-table--loading é aplicada quando progressPending é true, mas não há nenhuma regra para ela em DataTable.styles.css. | Repo | Eng front-end | Não |
| 130 | `/componentes/data-table` | Aba 3 · Classes e variáveis CSS | As custom properties --data-table-accent e --data-table-accent-hover são declaradas mas não são consumidas em nenhuma regra do arquivo. | Repo (CSS) | Eng front-end | Não |
| 131 | `/componentes/data-table` | Aba 2 · Acessibilidade | O clique em qualquer célula dispara onRowClicked (o <tr> inteiro é clicável) sem que a linha seja focável por teclado — não há equivalente de teclado para onRowClicked. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 132 | `/componentes/data-table` | Aba 3 · Notas e limitações | A prop title recebe ReactNode em types.ts, mas o argType a declara como control 'text'; o comportamento com nós complexos não está documentado. | Repo | Eng front-end | Não |
| 133 | `/componentes/data-table` | Aba 3 · API completa | As formas de DataTableColumn, DataTableLabels e DataTableSelectionChange não cabem neste schema de props; a referência completa está em packages/react/src/components/DataTable/DataTable.types.ts. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 134 | `/componentes/data-table` | Aba 3 · Notas e limitações | O tema 'catppuccin' usa --ds-brand-color-utility-danger-red-200 como cor de borda; não há comentário no código explicando essa escolha. | Repo | Eng front-end | Não |
| 135 | `/componentes/data-table` | Aba 3 · Notas e limitações | Os nomes dos temas ('material', 'rounded', 'catppuccin', 'crisp') não correspondem a nenhuma nomenclatura do Figma documentada no código. | Repo | Eng front-end | Não |
| 136 | `/componentes/datepicker` | Aba 3 · Classes e variáveis CSS | As classes ds-datepicker--open, ds-datepicker--error, ds-datepicker--success, ds-datepicker--read-only e ds-datepicker__required são aplicadas no TSX mas não têm nenhuma regra em Datepicker.styles.css. | Repo (CSS) | Eng front-end | Não |
| 137 | `/componentes/datepicker` | Aba 1 · Comportamento responsivo | O comentário do CSS registra que o node do Figma não define variante mobile nem estado de hover para os dias — o hover atual é uma aproximação documentada. | Figma (variante mobile) | Design | Não |
| 138 | `/componentes/datepicker` | Aba 2 · Tabela de tokens | A elevação level-2 e a cor color/border/default do Figma não existem nas collections exportadas: o CSS usa o literal 0 4px 8px 0 rgb(0 0 0 / 8%) e --ds-semantic-color-border-neutral-subtle como aproximação. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 139 | `/componentes/datepicker` | Aba 3 · Notas e limitações | No modo range, apenas o primeiro input recebe {...inputProps}, id, ref e required; o segundo campo não propaga essas props nem tem id próprio. | Repo | Eng front-end | Não |
| 140 | `/componentes/datepicker` | Aba 3 · Notas e limitações | O botão Confirmar apenas fecha o calendário (não há confirmação/commit separado do valor, que já foi emitido no clique do dia). | Repo | Eng front-end | Não |
| 141 | `/componentes/datepicker` | Aba 2 · Acessibilidade | Não há navegação por setas dentro da grade de dias (role="grid") nem foco inicial no dia selecionado ao abrir o popover. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 142 | `/componentes/datepicker` | Aba 3 · Notas e limitações | O popover é renderizado em fluxo dentro do wrapper (sem portal ou posicionamento flutuante); o comportamento em containers com overflow não está documentado. | Repo | Eng front-end | Não |
| 143 | `/componentes/datepicker` | Aba 3 · Classes e variáveis CSS | A prop state="success" só produz efeito visual quando successText é informado (a classe ds-datepicker--success não tem estilo). | Repo (CSS) | Eng front-end | Não |
| 144 | `/componentes/divider` | Aba 2 · Acessibilidade | Não existe arquivo .a11y.test.tsx para o Divider. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 145 | `/componentes/divider` | Aba 3 · Notas e limitações | O CSS não define nenhum @media nem nenhum estado interativo (hover, focus, disabled) — o componente é puramente estático. | Repo | Eng front-end | Não |
| 146 | `/componentes/divider` | Aba 3 · Classes e variáveis CSS | A classe ds-divider--tone-default é aplicada no TSX, mas não tem regra própria no CSS (os valores default ficam no bloco base .ds-divider). | Repo (CSS) | Eng front-end | Não |
| 147 | `/componentes/divider` | Aba 3 · Classes e variáveis CSS | A classe ds-divider--with-label é aplicada quando há label, mas não tem nenhuma regra em Divider.styles.css. | Repo (CSS) | Eng front-end | Não |
| 148 | `/componentes/divider` | Aba 2 · Tabela de tokens | O segmento de 100px antes do label (linha horizontal) é um literal do Figma, sem token --ds-* correspondente; na orientação vertical não existe regra equivalente e os dois segmentos dividem o espaço. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 149 | `/componentes/divider` | Aba 1 · Comportamento responsivo | O CSS registra que o node do Figma não define variante mobile, então não há comportamento responsivo específico documentado. | Figma (variante mobile) | Design | Não |
| 150 | `/componentes/divider` | Aba 2 · Acessibilidade | Quando decorative=false e ariaLabel não é informado, o separator fica sem nome acessível — o código não define fallback. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 151 | `/componentes/dropdown` | Aba 3 · Classes e variáveis CSS | As classes ds-dropdown--open e ds-dropdown--error são aplicadas no TSX mas não têm nenhuma regra em Dropdown.styles.css; ds-dropdown__required também não tem estilo próprio. | Repo (CSS) | Eng front-end | Não |
| 152 | `/componentes/dropdown` | Aba 2 · Tabela de tokens | O estado Focused do Figma especifica borda de 2px (border/width/focus); o CSS aplica border-color mais um box-shadow inset de 1px, sem token para a largura. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 153 | `/componentes/dropdown` | Aba 2 · Tabela de tokens | Os literais #3366e5 (color/border/focus), rgb(0 0 0 / 4%) (color/state/hover) e 0 4px 4px rgb(0 0 0 / 8%) (elevation/level-2) não têm token --ds-* correspondente nas collections exportadas. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 154 | `/componentes/dropdown` | Aba 2 · Tabela de tokens | O max-block-size de 320px do menu e o min-inline-size de 160px / block-size de 40px do campo são literais, sem token associado. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 155 | `/componentes/dropdown` | Aba 3 · Notas e limitações | O menu é posicionado com position: absolute abaixo do campo (sem portal nem detecção de colisão); não há flip para cima quando não há espaço na viewport. | Repo | Eng front-end | Não |
| 156 | `/componentes/dropdown` | Aba 3 · Notas e limitações | Não há digitação para busca (typeahead) nem suporte a seleção múltipla. | Repo | Eng front-end | Não |
| 157 | `/componentes/dropdown` | Aba 3 · Notas e limitações | O componente não expõe prop open/onOpenChange: a abertura é sempre interna (apenas defaultOpen), diferente do Datepicker. | Repo | Eng front-end | Não |
| 158 | `/componentes/dropdown` | Aba 1 · Comportamento responsivo | O CSS registra que o node do Figma não define variante mobile — não existe @media de layout responsivo, apenas o de prefers-reduced-motion. | Figma (variante mobile) | Design | Não |
| 159 | `/componentes/file-upload` | Aba 3 · Notas e limitações | Nao ha validacao de tipo/tamanho de arquivo no componente: dropzoneHint ('PDF, CSV ou XLSX ate 10mb') e apenas texto e o limite real depende de quem consome. | Repo | Eng front-end | Não |
| 160 | `/componentes/file-upload` | Aba 2 · Tabela de tokens | O contraste/valor final do token de borda de erro nao pode ser confirmado pelo codigo: o comentario do CSS registra divergencia entre o arquivo Figma (#e52207) e a collection exportada (#c50007). | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 161 | `/componentes/file-upload` | Aba 1 · Variantes e estados | Nao ha estado de progresso/loading de upload; itemStatusLabel e um texto estatico ('Carregado' por padrao), sem indicacao de upload em andamento ou percentual. | Repo + Figma | Eng front-end + Design | Não |
| 162 | `/componentes/file-upload` | Aba 3 · Notas e limitações | O modo dropzone nao possui estado visual de :hover no CSS (apenas transition, dragging, error e focus-within). | Repo | Eng front-end | Não |
| 163 | `/componentes/file-upload` | Aba 3 · Links (Figma) | O arquivo/URL do Figma nao consta no codigo, apenas o node-id 219:7828. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 164 | `/componentes/footer` | Aba 2 · Acessibilidade | Nao ha arquivo Footer.a11y.test.tsx; a cobertura de acessibilidade automatizada (axe) esta ausente. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 165 | `/componentes/footer` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo do Footer (a doc so menciona 'tokens do Figma' de forma generica). | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 166 | `/componentes/footer` | Aba 3 · Notas e limitações | O estado aberto/fechado das secoes e interno (useState com defaultOpen); nao ha prop controlada nem callback de abertura/fechamento. | Repo | Eng front-end | Não |
| 167 | `/componentes/footer` | Aba 3 · Notas e limitações | O componente nao expoe FooterProps.children nem slots adicionais alem de brand/copyright/icon, entao blocos institucionais extras nao tem ponto de extensao documentado. | Repo | Eng front-end | Não |
| 168 | `/componentes/footer` | Aba 3 · Notas e limitações | O CSS usa --ds-component-footer-spacing-padding-y no padding inferior do container, mas esse token nao tem fallback nem esta refletido nos aliases internos; o valor final depende da collection de tokens. | Repo | Eng front-end | Não |
| 169 | `/componentes/header` | Aba 3 · Classes e variáveis CSS | A classe ds-header--user-menu-open e aplicada no TSX mas nao possui nenhuma regra em Header.styles.css; o efeito visual pretendido nao pode ser determinado pelo codigo. | Repo (CSS) | Eng front-end | Não |
| 170 | `/componentes/header` | Aba 2 · Acessibilidade | aria-current="page" e definido nos nav items, mas nao existe estilo [aria-current] no CSS — o item atual nao tem distincao visual. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 171 | `/componentes/header` | Aba 2 · Acessibilidade | Nao ha arquivo Header.a11y.test.tsx (sem cobertura axe). | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 172 | `/componentes/header` | Aba 2 · Acessibilidade | O painel do User Menu nao tem fechamento por Escape/clique externo nem gerenciamento de foco; o padrao ARIA de menu esta incompleto. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 173 | `/componentes/header` | Aba 3 · Notas e limitações | menuOpen e tratado como controlado na leitura (menuOpen ?? interno), mas updateMenuOpen sempre grava no estado interno — o comportamento em modo totalmente controlado nao esta explicitado no codigo nem em testes. | Repo | Eng front-end | Não |
| 174 | `/componentes/header` | Aba 2 · Tabela de tokens | --header-bar-height usa o literal 80px porque os tokens navbar/size trazem 56/48; a divergencia com o Figma continua em aberto. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 175 | `/componentes/header` | Aba 2 · Tabela de tokens | O item do painel do usuario usa a cor literal #333333 e o hover rgb(0 0 0 / 4%), sem token correspondente na collection. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 176 | `/componentes/header` | Aba 3 · Notas e limitações | Os textos originais em Inter foram normalizados para Plus Jakarta Sans; a equivalencia tipografica com o Figma nao pode ser verificada pelo codigo. | Repo | Eng front-end | Não |
| 177 | `/componentes/hero` | Aba 2 · Acessibilidade | Nao ha arquivo Hero.a11y.test.tsx (sem cobertura axe). | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 178 | `/componentes/hero` | Aba 3 · Notas e limitações | O CSS nao define nenhum estado interativo (sem :hover, :focus-visible, disabled) — o array de estados fica vazio por decisao do proprio componente. | Repo | Eng front-end | Não |
| 179 | `/componentes/hero` | Aba 3 · Notas e limitações | As diretrizes 'maximo de 2 CTAs' e 'titulo de ate 8 palavras' sao documentais: o codigo nao valida nem limita o conteudo dos slots. | Repo | Eng front-end | Não |
| 180 | `/componentes/hero` | Aba 2 · Tabela de tokens | --hero-content-max-inline-size (600px) e min-block-size (280px) e min-inline-size do slot (300px) sao literais sem token correspondente na collection. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 181 | `/componentes/hero` | Aba 1 · Comportamento responsivo | Nao existe variante mobile no node do Figma; o breakpoint de 768px foi definido na implementacao. | Figma (variante mobile) | Design | Não |
| 182 | `/componentes/link` | Aba 2 · Acessibilidade | Nao ha arquivo Link.a11y.test.tsx (sem cobertura axe). | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 183 | `/componentes/link` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo do Link. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 184 | `/componentes/link` | Aba 3 · Notas e limitações | No estado disabled o href permanece no DOM (diferente do ListItem, que o remove): a navegacao e bloqueada apenas por preventDefault, entao abrir em nova aba pelo menu de contexto ainda funciona. | Repo | Eng front-end | Não |
| 185 | `/componentes/link` | Aba 2 · Tabela de tokens | A variante inverse depende de uma superficie escura fornecida por quem consome; nao ha token/contexto de fundo no proprio componente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 186 | `/componentes/link` | Aba 3 · Notas e limitações | O componente nao aceita ref nem props nativas adicionais do <a> (LinkProps nao estende AnchorHTMLAttributes). | Repo | Eng front-end | Não |
| 187 | `/componentes/list-item` | Aba 1 · Anatomia + Aba 3 · Links | `ListItem` não tem componente publicado na biblioteca Web Components do Figma (58 publicados, nenhum corresponde). Sem par, não há frame de anatomia nem link de design. | Figma (criar/publicar o componente) | Design | Sim — DoD #5 |
| 188 | `/componentes/list-item` | Aba 2 · Acessibilidade | Nao ha arquivo ListItem.a11y.test.tsx (sem cobertura axe). | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 189 | `/componentes/list-item` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo do ListItem. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 190 | `/componentes/list-item` | Aba 2 · Acessibilidade | aria-selected e aplicado no <li> com role implicito listitem, onde o atributo nao e valido segundo a especificacao ARIA (seria necessario role="option"/"row" no consumidor); o codigo nao trata esse caso. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 191 | `/componentes/list-item` | Aba 3 · Notas e limitações | O componente nao renderiza o <ul>/<ol> — a semantica de lista depende de quem consome (as stories usam .list-item-story-list). | Repo | Eng front-end | Não |
| 192 | `/componentes/list-item` | Aba 3 · Notas e limitações | A doc afirma que a lista deve viver sobre o background grey-100, mas isso nao esta implementado no CSS do componente (apenas nas stories). | Repo | Eng front-end | Não |
| 193 | `/componentes/list-item` | Aba 2 · Acessibilidade | Nao ha estado de foco/selecao gerenciado por teclado entre itens (roving tabindex) para uso como menu ou listbox. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 194 | `/componentes/meganav` | Aba 1 · Anatomia + Aba 3 · Links | `Meganav` não tem componente publicado na biblioteca Web Components do Figma (58 publicados, nenhum corresponde). Sem par, não há frame de anatomia nem link de design. | Figma (criar/publicar o componente) | Design | Sim — DoD #5 |
| 195 | `/componentes/meganav` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado em comentarios do codigo do componente. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 196 | `/componentes/meganav` | Aba 3 · API completa | As props className, closeLabel, drawerClassName, mobileTitle, onOpenChange, triggerAriaLabel e triggerIcon nao possuem descricao em argTypes nem JSDoc. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 197 | `/componentes/meganav` | Aba 2 · Acessibilidade | A doc menciona "cabecalho fixo" no mobile, mas nao ha documentacao sobre a ausencia de focus trap na gaveta. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 198 | `/componentes/modal` | Aba 3 · API completa | A prop children nao possui entrada em argTypes; a descricao vem apenas do JSDoc em Modal.types.ts. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 199 | `/componentes/modal` | Aba 2 · Tabela de tokens | --modal-overlay-background usa o literal rgb(0 0 0 / 48%), sem token --ds-* correspondente para o backdrop. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 200 | `/componentes/modal` | Aba 2 · Tabela de tokens | O botao de fechar posiciona-se com os literais 10px / 18px (inset-block-start / inset-inline-end), sem token equivalente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 201 | `/componentes/modal` | Aba 3 · Notas e limitações | Nao ha documentacao sobre o comportamento com multiplos modais empilhados nem sobre uso de portal. | Repo | Eng front-end | Não |
| 202 | `/componentes/pagination` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado em comentarios do codigo do componente. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 203 | `/componentes/pagination` | Aba 2 · Acessibilidade | Nao existe arquivo Pagination.a11y.test.tsx no diretorio. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 204 | `/componentes/pagination` | Aba 3 · Classes e variáveis CSS | Nao foi possivel determinar a finalidade de --pagination-border-strong: e declarado no bloco raiz, mas nao aparece em nenhuma declaracao do CSS. | Repo (CSS) | Eng front-end | Não |
| 205 | `/componentes/pagination` | Aba 2 · Acessibilidade | O resumo mobile (.ds-pagination__mobile-summary) esta sempre no DOM e fica exposto a leitores de tela mesmo no desktop; nao ha documentacao sobre esse comportamento. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 206 | `/componentes/progress-bar` | Aba 2 · Acessibilidade | Nao existe arquivo ProgressBar.a11y.test.tsx no diretorio. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 207 | `/componentes/progress-bar` | Aba 2 · Tabela de tokens | Divergencia ainda aberta e registrada no CSS entre o Figma e a collection exportada: typography/sucess (#00883D) x green-400 (#07622F) e typography/danger (#E52207) x red-400 (#B22929); o codigo usa green-300/red-300 como aproximacao. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 208 | `/componentes/progress-bar` | Aba 2 · Tabela de tokens | A descricao cita variantes com "textos em typography/primary" para information e warning, mas nao ha token especifico documentado para diferenciar essas variantes alem da cor do Range. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 209 | `/componentes/radio` | Aba 3 · API completa | O meta das stories nao define argTypes: nenhuma prop de Radio ou RadioGroup possui descricao documentada (apenas o comentario de _checked/_name/_onChange em Radio.types.ts). | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 210 | `/componentes/radio` | Aba 3 · Notas e limitações | O diretorio exporta dois componentes (Radio e RadioGroup); como o schema nao separa componentes, as props do RadioGroup foram listadas com o prefixo "RadioGroup.". | Repo | Eng front-end | Não |
| 211 | `/componentes/radio` | Aba 2 · Tabela de tokens | O focus ring usa os literais rgb(255 255 255 / 84%) e #2c84d0 porque, segundo o comentario do CSS, a cor nao esta exposta como variable na collection exportada. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 212 | `/componentes/radio` | Aba 2 · Tabela de tokens | O ripple usa os literais 32px x 32px, sem token --ds-* correspondente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 213 | `/componentes/radio` | Aba 3 · Notas e limitações | Nao existe arquivo RadioGroup.test.tsx separado nem stories dedicadas ao RadioGroup no index do Storybook. | Repo | Eng front-end | Não |
| 214 | `/componentes/radio` | Aba 1 · Comportamento responsivo | Nao ha variante mobile definida no node do Figma (registrado em comentario no fim do Radio.styles.css); nao existem media queries de largura no CSS. | Figma (variante mobile) | Design | Não |
| 215 | `/componentes/skeleton` | Aba 1 · Anatomia + Aba 3 · Links | `Skeleton` não tem componente publicado na biblioteca Web Components do Figma (58 publicados, nenhum corresponde). Sem par, não há frame de anatomia nem link de design. | Figma (criar/publicar o componente) | Design | Sim — DoD #5 |
| 216 | `/componentes/skeleton` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado em comentarios do codigo do componente. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 217 | `/componentes/skeleton` | Aba 2 · Acessibilidade | Nao existe arquivo Skeleton.a11y.test.tsx no diretorio. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 218 | `/componentes/skeleton` | Aba 3 · API completa | SkeletonProps estende Omit<HTMLAttributes<HTMLSpanElement>, "children"> e repassa rest props ao elemento raiz; os handlers e atributos herdados nao estao documentados em argTypes. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 219 | `/componentes/skeleton` | Aba 3 · API completa | A prop style nao possui entrada em argTypes nem descricao no codigo. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 220 | `/componentes/skeleton` | Aba 2 · Tabela de tokens | A ultima linha do modo multiline usa o literal 72% de largura, sem token correspondente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 221 | `/componentes/spinner` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo do Spinner; a doc apenas menciona que os tokens vieram do Figma. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 222 | `/componentes/spinner` | Aba 2 · Acessibilidade | Nao existe arquivo Spinner.a11y.test.tsx (sem cobertura automatizada de axe). | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 223 | `/componentes/spinner` | Aba 3 · Notas e limitações | parameters.componentCanvas.width = 360 e definido no meta, mas o codigo nao documenta o efeito desse parametro. | Repo (Storybook) | Eng front-end | Não |
| 224 | `/componentes/spinner` | Aba 2 · Acessibilidade | Nao ha interacao de teclado nem estados de hover/focus/disabled no componente; a lista de estados reflete apenas o aria-busy fixo. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 225 | `/componentes/stepper` | Aba 2 · Tabela de tokens | Varios valores continuam como literais sem token: radius do card 12px, circulo da etapa 32px/28px, circulo do check 38px/34px, cores #e9fdf3, #1e7d47, #181818 e rgb(224 224 224 / 80%), font-size 11px/13px/15px, letter-spacing 0.66px/0.6px, gap 3px e padding 10px 18px / 14px do botao. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 226 | `/componentes/stepper` | Aba 2 · Acessibilidade | Nao existe arquivo Stepper.a11y.test.tsx (sem cobertura automatizada de axe). | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 227 | `/componentes/stepper` | Aba 1 · Variantes e estados | Nao ha estado visual de etapa concluida individual nem navegacao entre etapas: o componente so mostra a etapa atual e a proxima. | Repo + Figma | Eng front-end + Design | Não |
| 228 | `/componentes/stepper` | Aba 3 · Notas e limitações | parameters.componentCanvas.width = 640 e definido no meta, mas o codigo nao documenta o efeito desse parametro. | Repo (Storybook) | Eng front-end | Não |
| 229 | `/componentes/stepper` | Aba 3 · Notas e limitações | O estado Completed nao expoe um estado :hover/:focus separado para o card, apenas para o botao Recomeçar. | Repo | Eng front-end | Não |
| 230 | `/componentes/tabs` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo do Tabs; a doc apenas informa que os tokens vieram do Figma. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 231 | `/componentes/tabs` | Aba 2 · Tabela de tokens | A doc registra que nao existe token roxo na base atual e que o estado selecionado usa o token de identidade disponivel (--ds-semantic-color-background-brand-primary-secondary-default), sem token dedicado de selecao. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 232 | `/componentes/tabs` | Aba 2 · Acessibilidade | Cada tab define aria-controls com o id do proprio painel, mas apenas o painel selecionado e renderizado no DOM — os aria-controls das tabs nao selecionadas apontam para ids inexistentes. | Repo (implementação) | Eng front-end | Sim — DoD #7 |
| 233 | `/componentes/tabs` | Aba 3 · Notas e limitações | parameters.componentCanvas.width = 900 e definido no meta, mas o codigo nao documenta o efeito desse parametro. | Repo (Storybook) | Eng front-end | Não |
| 234 | `/componentes/tabs` | Aba 3 · Classes e variáveis CSS | Nao ha classe/estilo dedicado para .ds-tabs--variant-standard no CSS: a variante standard corresponde aos estilos base de .ds-tabs__tab. | Repo (CSS) | Eng front-end | Não |
| 235 | `/componentes/tabs` | Aba 3 · Notas e limitações | O CSS nao define estilo de scroll indicator para a rolagem horizontal do tablist (scrollbar e ocultada em Firefox e WebKit). | Repo | Eng front-end | Não |
| 236 | `/componentes/text-area` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo do TextArea; a doc apenas informa que os tokens vieram do Figma. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 237 | `/componentes/text-area` | Aba 2 · Acessibilidade | Nao existe arquivo TextArea.a11y.test.tsx (sem cobertura automatizada de axe). | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 238 | `/componentes/text-area` | Aba 3 · Notas e limitações | A doc registra que a camada semantica de tokens nao cobre todos os casos e que o componente cria aliases internos (--text-area-*) apontando para tokens disponiveis. | Repo | Eng front-end | Não |
| 239 | `/componentes/text-area` | Aba 3 · API completa | Props nativas (placeholder, name, readOnly, autoFocus etc.) sao herdadas de TextareaHTMLAttributes e nao estao todas listadas em argTypes; a documentacao delas depende do tipo nativo. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 240 | `/componentes/text-area` | Aba 1 · Variantes e estados | Nao ha estado readonly com tratamento visual proprio no CSS, apenas disabled e error. | Repo + Figma | Eng front-end + Design | Não |
| 241 | `/componentes/text-area` | Aba 3 · Notas e limitações | parameters.componentCanvas.width = 560 e definido no meta, mas o codigo nao documenta o efeito desse parametro. | Repo (Storybook) | Eng front-end | Não |
| 242 | `/componentes/text-input` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo do TextInput; a doc apenas informa que os tokens vieram do Figma. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 243 | `/componentes/text-input` | Aba 3 · Notas e limitações | A doc registra que a camada semantica de tokens nao cobre todos os casos e que o componente cria aliases internos (--text-input-*) apontando para tokens disponiveis. | Repo | Eng front-end | Não |
| 244 | `/componentes/text-input` | Aba 2 · Tabela de tokens | O icone das mensagens e o caractere literal 'i' estilizado com borda circular, e nao um asset/icone do Design System. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 245 | `/componentes/text-input` | Aba 3 · API completa | Props nativas (placeholder, name, value, readOnly etc.) sao herdadas de InputHTMLAttributes e nao estao todas listadas em argTypes. | Repo (JSDoc + argTypes) | Eng front-end | Não |
| 246 | `/componentes/text-input` | Aba 1 · Variantes e estados | Nao ha estado readonly com tratamento visual proprio no CSS, apenas hover, focus-within, error e disabled. | Repo + Figma | Eng front-end + Design | Não |
| 247 | `/componentes/text-input` | Aba 3 · Notas e limitações | parameters.componentCanvas.width = 420 e definido no meta, mas o codigo nao documenta o efeito desse parametro. | Repo (Storybook) | Eng front-end | Não |
| 248 | `/componentes/text-input` | Aba 3 · Notas e limitações | As stories Search Field e Form Label sao variacoes de uso (args), nao variantes de API. | Repo | Eng front-end | Não |
| 249 | `/componentes/toast` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo do Toast; a doc apenas informa que os tokens vieram do Figma. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 250 | `/componentes/toast` | Aba 2 · Acessibilidade | Nao existe arquivo Toast.a11y.test.tsx (sem cobertura automatizada de axe). | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 251 | `/componentes/toast` | Aba 3 · Classes e variáveis CSS | As classes ds-toast--without-description, ds-toast--without-actions e ds-toast__action--primary sao aplicadas no TSX mas nao possuem regras no Toast.styles.css. | Repo (CSS) | Eng front-end | Não |
| 252 | `/componentes/toast` | Aba 2 · Tabela de tokens | --toast-width usa o literal 496px, sem token correspondente na escala. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 253 | `/componentes/toast` | Aba 2 · Tabela de tokens | A doc registra que ainda nao ha tokens de elevation/shadow publicados; o CSS usa --ds-semantic-shadow-raised, entao a nota da doc pode estar desatualizada em relacao ao codigo atual. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 254 | `/componentes/toast` | Aba 3 · Notas e limitações | O componente nao implementa uma regiao/limitador de fila de toasts (viewport, empilhamento ou portal); o posicionamento fica a cargo de quem consome. | Repo | Eng front-end | Não |
| 255 | `/componentes/toast` | Aba 3 · Notas e limitações | Nao ha animacao de entrada/saida nem tratamento de prefers-reduced-motion no CSS. | Repo | Eng front-end | Não |
| 256 | `/componentes/toast` | Aba 3 · Notas e limitações | parameters.componentCanvas.width = 520 e definido no meta, mas o codigo nao documenta o efeito desse parametro. | Repo (Storybook) | Eng front-end | Não |
| 257 | `/componentes/toggle` | Aba 3 · Links (Figma) | Nenhum node-id do Figma e citado no codigo do Toggle (TSX, CSS ou stories), portanto figmaReferences esta vazio. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 258 | `/componentes/toggle` | Aba 1 · Variantes e estados | Nao ha variantes de tamanho ou de cor expostas por prop: o componente nao possui props enumeradas (variants vazio). | Repo + Figma | Eng front-end + Design | Não |
| 259 | `/componentes/toggle` | Aba 3 · Notas e limitações | O valor final dos tokens --ds-* nao foi resolvido aqui; apenas os nomes consumidos via var() no Toggle.styles.css foram extraidos. | Repo | Eng front-end | Não |
| 260 | `/componentes/toggle` | Aba 3 · Notas e limitações | Os fallbacks literais presentes no CSS (ex: 12px, 999px, 700) nao foram checados contra a collection de tokens. | Repo | Eng front-end | Não |
| 261 | `/componentes/toggle` | Aba 2 · Tabela de tokens | A dimensao 44px do trilho e a area de toque de 44/48px sao literais no CSS, sem token correspondente. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 262 | `/componentes/toggle` | Aba 3 · Notas e limitações | Nao ha teste automatizado cobrindo hover, focus-visible ou o comportamento controlado via prop checked sem onCheckedChange. | Repo | Eng front-end | Não |
| 263 | `/componentes/tooltip` | Aba 2 · Acessibilidade | Nao existe arquivo Tooltip.a11y.test.tsx; a11yFile e a11yCount ficam nulos. | Repo (`*.a11y.test.tsx`) | Eng front-end | Não — coberto pela auditoria da Fase 6 |
| 264 | `/componentes/tooltip` | Aba 3 · Classes e variáveis CSS | A classe ds-tooltip--disabled e aplicada pelo TSX mas nao possui nenhuma regra no Tooltip.styles.css. | Repo (CSS) | Eng front-end | Não |
| 265 | `/componentes/tooltip` | Aba 3 · Classes e variáveis CSS | A classe ds-tooltip--tone-dark e aplicada pelo TSX mas nao possui regra propria: o tom dark vem dos valores padrao definidos em .ds-tooltip. | Repo (CSS) | Eng front-end | Não |
| 266 | `/componentes/tooltip` | Aba 2 · Tabela de tokens | Divergencia documentada em comentario: a collection exporta tooltip/color/background como soft-black #292929, enquanto o node usa neutral/black. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 267 | `/componentes/tooltip` | Aba 2 · Tabela de tokens | Divergencia documentada em comentario: o token tooltip/size/max-width exporta 128px, mas o CSS usa 200px (max) e 40px (min) como literais. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 268 | `/componentes/tooltip` | Aba 2 · Tabela de tokens | A sombra do balao (0 4px 4px rgb(0 0 0 / 12%) + 0 2px 2px rgb(0 0 0 / 8%)) e literal: nao ha variable correspondente na collection exportada. | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 269 | `/componentes/tooltip` | Aba 3 · Links (Figma) | O atomo Arrow do Figma e citado por nome, mas sem node-id proprio no codigo. | Figma + repo (node-id / Code Connect) | Design + Eng front-end | Sim — DoD #5 |
| 270 | `/componentes/tooltip` | Aba 3 · Notas e limitações | Nao ha deteccao de colisao/flip automatico de placement: a posicao e puramente CSS a partir da prop placement. | Repo | Eng front-end | Não |
| 271 | `/componentes/tooltip` | Aba 3 · Notas e limitações | Nao ha suporte explicito a touch (nenhum handler de toque/tap); a propria doc recomenda texto persistente em mobile. | Repo | Eng front-end | Não |
| 272 | `/componentes/tooltip` | Aba 1 · Comportamento responsivo | O node do Figma nao define variante mobile; a unica regra @media do componente e prefers-reduced-motion. | Figma (variante mobile) | Design | Não |
| 273 | `/componentes/tooltip` | Aba 3 · Notas e limitações | O valor final dos tokens --ds-* nao foi resolvido aqui; apenas os nomes consumidos via var() no Tooltip.styles.css foram extraidos (Tooltip.stories.css e exclusivo das stories e nao foi contabilizado). | Repo | Eng front-end | Não |

---

## Bloco C — Lacunas de fundamentos

Vêm de `wiki/data/foundations-inventory.json` (8 páginas de Foundations publicadas hoje no
Storybook, com suas lacunas ante a especificação) mais os fundamentos que **não têm página
nenhuma**: iconografia, logo e marca, motion e acessibilidade.

| # | Página/rota | Seção | Dado faltante | Fonte esperada | Responsável sugerido | Bloqueia aceite? |
|---|---|---|---|---|---|---|
| 274 | `/fundamentos/tokens` | Fundamento · Conceito e por que importa | Conceito ausente: nao define o que e um design token nem a diferenca entre primitive / semantic / component - esse texto existe apenas em packages/react/src/foundations/tokens/README.md, fora do Storybook | Time (editorial) | Design | Sim — exigência 3 |
| 275 | `/fundamentos/tokens` | Fundamento · Conceito e por que importa | Nao responde 'por que importa': governanca, consistencia entre times, portabilidade multi-plataforma | Time (editorial) | Design | Sim — exigência 3 |
| 276 | `/fundamentos/tokens` | Fundamento · Regras de uso | Sem regras de uso: quando criar um token novo, quando um literal e aceitavel, quem aprova, como nomear | Time (editorial) | Design | Sim — exigência 3 |
| 277 | `/fundamentos/tokens` | Fundamento · Tabela de tokens | Sem tabela completa de tokens - a pagina mostra so contagens agregadas, nenhum nome, valor ou variavel CSS | `wiki/data/tokens.json` | Eng (pipeline da Wiki) | Sim — DoD #3 |
| 278 | `/fundamentos/tokens` | Fundamento · Exemplos aplicados | Sem exemplos aplicados (mesma UI antes/depois de tokenizar) | Time (editorial) + repo | Design + Eng front-end | Sim — exigência 3 |
| 279 | `/fundamentos/tokens` | Fundamento · Do & don't | Sem do & don't | Time (editorial) | Design | Sim — exigência 3 |
| 280 | `/fundamentos/tokens` | Fundamento · Acessibilidade | Sem secao de acessibilidade | Time (editorial) + auditoria da Fase 6 | Design + Eng front-end | Sim — DoD #7 |
| 281 | `/fundamentos/tokens` | Fundamento · Como usar no Figma | Sem 'como usar no Figma': nomes das collections, como publicar/atualizar variables, como o export chega no repo | Figma | Design | Não |
| 282 | `/fundamentos/tokens` | Fundamento · Como usar em código | Sem 'como usar em codigo': import de @government/tokens, link de tokens.css, sintaxe var(--ds-*), consumo em iOS/Android | Repo (`packages/tokens`, CSS) | Eng front-end | Sim — exigência 4 |
| 283 | `/fundamentos/tokens` | Fundamento · Downloads | Sem downloads (tokens.json, tokens.css, arquivo/link do Figma) | Time (decisão sobre artefatos) | Gestão do DS | Não |
| 284 | `/fundamentos/tokens` | Fundamento · Conteúdo da página | So cobre a camada primitive; as camadas semantic e component citadas no README nao aparecem em lugar nenhum da pagina | Time (editorial) | Design | Sim — exigência 3 |
| 285 | `/fundamentos/tokens` | Fundamento · Conteúdo da página | A faixa 'Governanca' promete categorias 'documentadas em paginas dedicadas' mas nao linka para nenhuma delas | Time (editorial) | Design | Sim — exigência 3 |
| 286 | `/fundamentos/cor` | Fundamento · Conteúdo da página | Paleta incompleta: nenhuma cor de marca/identidade. O vermelho institucional SP.GOV (#C60008 / #C50007 / #FF161F) e as cores de feedback (success/warning/danger/info) nao estao no global-core.tokens.json e portanto nao renderizam | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 287 | `/fundamentos/cor` | Fundamento · Conteúdo da página | Sem camada semantica (background/*, text/*, border/*), que e o que os componentes realmente consomem - a pagina documenta primitivos que ninguem deveria usar direto | Time (editorial) | Design | Sim — exigência 3 |
| 288 | `/fundamentos/cor` | Fundamento · Conceito e por que importa | Zero texto conceitual: nao ha introducao, 'por que importa' nem explicacao dos grupos; so o subtitulo do hero | Time (editorial) | Design | Sim — exigência 3 |
| 289 | `/fundamentos/cor` | Fundamento · Regras de uso | Sem regras de uso: qual cinza e fundo de pagina, qual e borda, qual e texto secundario, quando usar alpha em vez de solido | Time (editorial) | Design | Sim — exigência 3 |
| 290 | `/fundamentos/cor` | Fundamento · Tabela de tokens | Sem tabela - os metadados vem como <dl> dentro de cada card, sem visao comparativa nem possibilidade de escanear/ordenar | `wiki/data/tokens.json` | Eng (pipeline da Wiki) | Sim — DoD #3 |
| 291 | `/fundamentos/cor` | Fundamento · Acessibilidade | Sem acessibilidade: nenhuma razao de contraste, nenhum par texto/fundo aprovado, nenhuma referencia a WCAG AA/AAA, nada sobre daltonismo ou 'cor nunca como unico portador de informacao' | Time (editorial) + auditoria da Fase 6 | Design + Eng front-end | Sim — DoD #7 |
| 292 | `/fundamentos/cor` | Fundamento · Do & don't | Sem do & don't | Time (editorial) | Design | Sim — exigência 3 |
| 293 | `/fundamentos/cor` | Fundamento · Exemplos aplicados | Sem exemplos aplicados (a cor dentro de botao, alerta, card, link) | Time (editorial) + repo | Design + Eng front-end | Sim — exigência 3 |
| 294 | `/fundamentos/cor` | Fundamento · Como usar no Figma | Sem 'como usar no Figma' alem do figmaPath cru impresso no card | Figma | Design | Não |
| 295 | `/fundamentos/cor` | Fundamento · Como usar em código | Sem 'como usar em codigo' (var(--ds-primitive-color-*), tema, dark mode) | Repo (`packages/tokens`, CSS) | Eng front-end | Sim — exigência 4 |
| 296 | `/fundamentos/cor` | Fundamento · Downloads | Sem downloads (paleta .ase/.clr, JSON, PNG da paleta) | Time (decisão sobre artefatos) | Gestão do DS | Não |
| 297 | `/fundamentos/cor` | Fundamento · Reconciliação de valores | Nao sinaliza as divergencias Figma x codigo ja catalogadas em wiki/data/divergencias-sessao.md (warning/subtle, success/subtle, border/danger, inversao primary/secondary do Button) | Figma + repo (decisão do time) | Design + Eng tokens | Sim — DoD #3 |
| 298 | `/fundamentos/tipografia` | Fundamento · Conteúdo da página | So existe escala primitiva solta: nao ha estilos tipograficos compostos (display / heading / body / label / caption) combinando size + line-height + weight + letter-spacing, que e o que o designer e o dev realmente usam | Time (editorial) | Design | Sim — exigência 3 |
| 299 | `/fundamentos/tipografia` | Fundamento · Conteúdo da página | 22 tamanhos e 25 line-heights listados sem nenhum pareamento - a pagina nao diz qual line-height acompanha qual font-size | Time (editorial) | Design | Sim — exigência 3 |
| 300 | `/fundamentos/tipografia` | Fundamento · Regras de uso | Sem regras de uso: qual token para H1/H2/H3, corpo de texto, legenda; como a hierarquia muda por breakpoint | Time (editorial) | Design | Sim — exigência 3 |
| 301 | `/fundamentos/tipografia` | Fundamento · Tabela de tokens | Sem tabela completa (escalas de apoio sao <ul> nome/valor; a escala de tamanho e um empilhamento de cards) | `wiki/data/tokens.json` | Eng (pipeline da Wiki) | Sim — DoD #3 |
| 302 | `/fundamentos/tipografia` | Fundamento · Exemplos aplicados | Sem exemplos aplicados em texto real (artigo, formulario, card com titulo + corpo + label) | Time (editorial) + repo | Design + Eng front-end | Sim — exigência 3 |
| 303 | `/fundamentos/tipografia` | Fundamento · Do & don't | Sem do & don't | Time (editorial) | Design | Sim — exigência 3 |
| 304 | `/fundamentos/tipografia` | Fundamento · Acessibilidade | Acessibilidade ausente: tamanho minimo legivel, comprimento de linha, contraste de texto, zoom 200%, redimensionamento de texto WCAG 1.4.4/1.4.12 | Time (editorial) + auditoria da Fase 6 | Design + Eng front-end | Sim — DoD #7 |
| 305 | `/fundamentos/tipografia` | Fundamento · Como usar no Figma | Sem 'como usar no Figma': nomes dos text styles, como aplicar, o que fazer quando o style nao existe | Figma | Design | Não |
| 306 | `/fundamentos/tipografia` | Fundamento · Como usar em código | Sem 'como usar em codigo': classes utilitarias, var(--ds-primitive-typography-*), @font-face, fallback stack, carregamento da fonte variavel | Repo (`packages/tokens`, CSS) | Eng front-end | Sim — exigência 4 |
| 307 | `/fundamentos/tipografia` | Fundamento · Downloads | Download existe apenas como link externo ao Google Fonts - nao ha arquivo de fonte hospedado, nem instrucoes de self-hosting, nem licenca | Time (decisão sobre artefatos) | Gestão do DS | Não |
| 308 | `/fundamentos/tipografia` | Fundamento · Conteúdo da página | Metadados do bloco de familia sao hardcoded no JSX ('200 -> 800 (Variable)', 'Sans-serif geometrica'), nao vem do token | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 309 | `/fundamentos/espacamento` | Fundamento · Conceito e por que importa | Sem conceito: nao explica a base da escala (4/8), por que ha saltos irregulares (2/6/10) nem como ela se relaciona com o grid | Time (editorial) | Design | Sim — exigência 3 |
| 310 | `/fundamentos/espacamento` | Fundamento · Conceito e por que importa | Sem 'por que importa': ritmo vertical, densidade, previsibilidade entre componentes | Time (editorial) | Design | Sim — exigência 3 |
| 311 | `/fundamentos/espacamento` | Fundamento · Regras de uso | Sem regras de uso: espacamento interno (padding) x externo (margin/gap), o que usar entre secoes, entre cards, dentro de formularios | Time (editorial) | Design | Sim — exigência 3 |
| 312 | `/fundamentos/espacamento` | Fundamento · Tabela de tokens | Sem tabela completa - cards em vez de tabela, e sem as colunas figmaPath/alias/valor original que as outras paginas de token exibem | `wiki/data/tokens.json` | Eng (pipeline da Wiki) | Sim — DoD #3 |
| 313 | `/fundamentos/espacamento` | Fundamento · Exemplos aplicados | Sem exemplos aplicados (mesmo bloco com espacamento ad hoc x tokenizado) | Time (editorial) + repo | Design + Eng front-end | Sim — exigência 3 |
| 314 | `/fundamentos/espacamento` | Fundamento · Do & don't | Sem do & don't | Time (editorial) | Design | Sim — exigência 3 |
| 315 | `/fundamentos/espacamento` | Fundamento · Acessibilidade | Sem acessibilidade: alvo de toque minimo, espacamento entre alvos clicaveis, WCAG 2.5.8 Target Size | Time (editorial) + auditoria da Fase 6 | Design + Eng front-end | Sim — DoD #7 |
| 316 | `/fundamentos/espacamento` | Fundamento · Como usar no Figma | Sem 'como usar no Figma': auto-layout, variables de gap/padding, o que fazer quando o valor nao existe | Figma | Design | Não |
| 317 | `/fundamentos/espacamento` | Fundamento · Como usar em código | Sem 'como usar em codigo': var(--ds-primitive-spacing-*), utilitarios, uso em gap/grid | Repo (`packages/tokens`, CSS) | Eng front-end | Sim — exigência 4 |
| 318 | `/fundamentos/espacamento` | Fundamento · Downloads | Sem downloads | Time (decisão sobre artefatos) | Gestão do DS | Não |
| 319 | `/fundamentos/espacamento` | Fundamento · Conteúdo da página | A escala nao e apresentada como decisao (por que parar em 128, por que existe spacing-0) | Time (editorial) | Design | Sim — exigência 3 |
| 320 | `/fundamentos/borda-e-raio` | Fundamento · Conceito e por que importa | Conceito raso: uma frase no hero ('a escala mantem leitura objetiva'), sem definir raio/espessura como linguagem visual | Time (editorial) | Design | Sim — exigência 3 |
| 321 | `/fundamentos/borda-e-raio` | Fundamento · Conceito e por que importa | Sem 'por que importa' (percepcao de suavidade, consistencia entre superficies, leitura de affordance) | Time (editorial) | Design | Sim — exigência 3 |
| 322 | `/fundamentos/borda-e-raio` | Fundamento · Regras de uso | Sem regras de uso: qual raio para botao, input, card, modal, avatar, chip; qual espessura para borda default, hover, selecao e foco | Time (editorial) | Design | Sim — exigência 3 |
| 323 | `/fundamentos/borda-e-raio` | Fundamento · Tabela de tokens | Sem tabela completa (metadados em <dl> por card) | `wiki/data/tokens.json` | Eng (pipeline da Wiki) | Sim — DoD #3 |
| 324 | `/fundamentos/borda-e-raio` | Fundamento · Exemplos aplicados | Sem exemplos aplicados (o token dentro de um componente real) | Time (editorial) + repo | Design + Eng front-end | Sim — exigência 3 |
| 325 | `/fundamentos/borda-e-raio` | Fundamento · Do & don't | Sem do & don't | Time (editorial) | Design | Sim — exigência 3 |
| 326 | `/fundamentos/borda-e-raio` | Fundamento · Acessibilidade | Sem acessibilidade - especialmente o indicador de foco: espessura minima, contraste do focus ring, WCAG 2.4.11/2.4.13. Nao existe nem token de cor de foco (color/border/focus ja consta como ausente em divergencias-sessao.md) | Time (editorial) + auditoria da Fase 6 | Design + Eng front-end | Sim — DoD #7 |
| 327 | `/fundamentos/borda-e-raio` | Fundamento · Como usar no Figma | Sem 'como usar no Figma' (variables de corner radius / stroke) | Figma | Design | Não |
| 328 | `/fundamentos/borda-e-raio` | Fundamento · Como usar em código | Sem 'como usar em codigo' (var(--ds-primitive-border-*), border-radius composto, borda logica) | Repo (`packages/tokens`, CSS) | Eng front-end | Sim — exigência 4 |
| 329 | `/fundamentos/borda-e-raio` | Fundamento · Downloads | Sem downloads | Time (decisão sobre artefatos) | Gestão do DS | Não |
| 330 | `/fundamentos/borda-e-raio` | Fundamento · Conteúdo da página | radius-full (999px) nao e explicado - nao ha nota sobre uso em pill/avatar nem sobre o efeito em elementos nao quadrados | Time (editorial) | Design | Sim — exigência 3 |
| 331 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Reconciliação de valores | Conflito nao sinalizado com Foundations/Grids: esta pagina publica 0/640/900/1200 e a de Grids usa 360 / 768-1024 / 1280-1440. As duas paginas nem se referenciam | Figma + repo (decisão do time) | Design + Eng tokens | Sim — DoD #3 |
| 332 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Conteúdo da página | Descricoes de dispositivo e a referencia de 1440px sao literais no componente, nao vem de token | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 333 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Conceito e por que importa | Sem 'por que importa' e sem regras de uso: mobile-first x desktop-first, quais breakpoints sao obrigatorios, o que pode mudar entre eles (densidade) e o que nao pode (conteudo) | Time (editorial) | Design | Sim — exigência 3 |
| 334 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Tabela de tokens | Sem tabela e sem media queries prontas para copiar | `wiki/data/tokens.json` | Eng (pipeline da Wiki) | Sim — DoD #3 |
| 335 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Exemplos aplicados | Sem exemplos aplicados: nenhuma demonstracao de um layout mudando de bp-sm para bp-lg | Time (editorial) + repo | Design + Eng front-end | Sim — exigência 3 |
| 336 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Do & don't | Sem do & don't | Time (editorial) | Design | Sim — exigência 3 |
| 337 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Acessibilidade | Sem acessibilidade: reflow WCAG 1.4.10, zoom 200%, orientacao 1.3.4 | Time (editorial) + auditoria da Fase 6 | Design + Eng front-end | Sim — DoD #7 |
| 338 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Como usar no Figma | Sem 'como usar no Figma' (larguras de frame correspondentes a cada breakpoint) | Figma | Design | Não |
| 339 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Como usar em código | Sem 'como usar em codigo' (@media, container queries, hook/util de breakpoint) | Repo (`packages/tokens`, CSS) | Eng front-end | Sim — exigência 4 |
| 340 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Downloads | Sem downloads | Time (decisão sobre artefatos) | Gestão do DS | Não |
| 341 | `/fundamentos/grid-e-layout#breakpoints` | Fundamento · Conteúdo da página | Nao e um fundamento autonomo na lista da wiki - deve ser absorvido por grid-e-layout, o que exige reconciliar os dois conjuntos de valores antes | Time (editorial) | Design | Sim — exigência 3 |
| 342 | `/fundamentos/elevacao-e-sombra` | Fundamento · Reconciliação de valores | Nao existe token de elevation/shadow no pipeline: os niveis sao 'receitas' textuais ('alpha-12 + spacing-2/6') que nao correspondem a nenhum valor compilado e nao podem ser copiadas. As sombras reais estao hardcoded no elevation.docs.css. divergencias-sessao.md ja registra elevation/level-1..5 como ausente no export | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 343 | `/fundamentos/elevacao-e-sombra` | Fundamento · Tabela de tokens | Sem tabela de tokens - nenhuma coluna com o box-shadow final, offset, blur, spread e cor por nivel | `wiki/data/tokens.json` | Eng (pipeline da Wiki) | Sim — DoD #3 |
| 344 | `/fundamentos/elevacao-e-sombra` | Fundamento · Reconciliação de valores | Nomenclatura inconsistente: 4 niveis aqui (Base/Raised/Floating/Overlay) x 5 niveis (level-1..5) mencionados no Figma | Figma + repo (decisão do time) | Design + Eng tokens | Sim — DoD #3 |
| 345 | `/fundamentos/elevacao-e-sombra` | Fundamento · Exemplos aplicados | Sem exemplos aplicados por componente (card, dropdown, modal, toast, popover) mapeando componente -> nivel | Time (editorial) + repo | Design + Eng front-end | Sim — exigência 3 |
| 346 | `/fundamentos/elevacao-e-sombra` | Fundamento · Conteúdo da página | Nao cobre dark mode nem elevacao sobre superficie escura | Time (editorial) | Design | Sim — exigência 3 |
| 347 | `/fundamentos/elevacao-e-sombra` | Fundamento · Como usar no Figma | Sem 'como usar no Figma': os efeitos existem como estilos de efeito, nao como variables - a pagina nao diz como encontra-los nem como aplica-los | Figma | Design | Não |
| 348 | `/fundamentos/elevacao-e-sombra` | Fundamento · Como usar em código | Sem 'como usar em codigo': nenhuma classe, mixin, var ou snippet copiavel | Repo (`packages/tokens`, CSS) | Eng front-end | Sim — exigência 4 |
| 349 | `/fundamentos/elevacao-e-sombra` | Fundamento · Downloads | Sem downloads | Time (decisão sobre artefatos) | Gestão do DS | Não |
| 350 | `/fundamentos/elevacao-e-sombra` | Fundamento · Do & don't | TEM do & don't (secao 'Use / Evite') e TEM secao de acessibilidade, mas ambos sao listas textuais genericas, sem exemplo visual do erro e sem criterio verificavel | Time (editorial) | Design | Sim — exigência 3 |
| 351 | `/fundamentos/elevacao-e-sombra` | Fundamento · Conteúdo da página | A regra 'todas as paginas devem usar grey-100 como fundo' e uma decisao de layout global publicada dentro da pagina de elevacao - deveria estar em um fundamento de superficie/layout e ser referenciada aqui | Time (editorial) | Design | Sim — exigência 3 |
| 352 | `/fundamentos/grid-e-layout` | Fundamento · Conteúdo da página | Nenhum valor vem de token: colunas, gutters, margens e breakpoints sao literais no array gridSpecs/breakpointSpecs do .tsx. A pagina afirma que os valores 'se conectam aos tokens de breakpoint ja publicados', mas nao se conectam | Figma (variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 353 | `/fundamentos/grid-e-layout` | Fundamento · Reconciliação de valores | Os breakpoints citados (360 / 768-1024 / 1280-1440) contradizem os tokens publicados em Foundations/Breakpoints (0 / 640 / 900 / 1200) - divergencia nao sinalizada em nenhuma das duas paginas | Figma + repo (decisão do time) | Design + Eng tokens | Sim — DoD #3 |
| 354 | `/fundamentos/grid-e-layout` | Fundamento · Tabela de tokens | Sem tabela de especificacao (breakpoint x colunas x gutter x margem x largura maxima de container) | `wiki/data/tokens.json` | Eng (pipeline da Wiki) | Sim — DoD #3 |
| 355 | `/fundamentos/grid-e-layout` | Fundamento · Conteúdo da página | Nao define largura maxima de container nem regra de centralizacao - so 'Stretch' | Time (editorial) | Design | Sim — exigência 3 |
| 356 | `/fundamentos/grid-e-layout` | Fundamento · Conteúdo da página | Gutter de 10px em mobile nao existe na escala de spacing (que tem 8 e 12) - valor orfao nao explicado | Time (editorial) | Design | Sim — exigência 3 |
| 357 | `/fundamentos/grid-e-layout` | Fundamento · Exemplos aplicados | Sem exemplos aplicados: nenhuma pagina real montada sobre o grid, nenhum caso de span de colunas | Time (editorial) + repo | Design + Eng front-end | Sim — exigência 3 |
| 358 | `/fundamentos/grid-e-layout` | Fundamento · Como usar no Figma | Sem 'como usar no Figma': layout grids nomeados, como aplicar no frame, como validar | Figma | Design | Não |
| 359 | `/fundamentos/grid-e-layout` | Fundamento · Como usar em código | Sem 'como usar em codigo': CSS grid, container queries, classes utilitarias, componente de container/row/col | Repo (`packages/tokens`, CSS) | Eng front-end | Sim — exigência 4 |
| 360 | `/fundamentos/grid-e-layout` | Fundamento · Downloads | Sem downloads (template de grid, arquivo Figma, snippet CSS) | Time (decisão sobre artefatos) | Gestão do DS | Não |
| 361 | `/fundamentos/grid-e-layout` | Fundamento · Do & don't | TEM do & don't (secao 'Use / Evite') e TEM secao de acessibilidade, mas ambos textuais, sem demonstracao visual e sem criterio de verificacao | Time (editorial) | Design | Sim — exigência 3 |
| 362 | `/fundamentos/grid-e-layout` | Fundamento · Conteúdo da página | Nao cobre layout alem do grid: regioes de pagina, densidade, alinhamento vertical, breakpoints de conteudo | Time (editorial) | Design | Sim — exigência 3 |
| 363 | `/fundamentos/iconografia` | Fundamento · página inexistente | Fundamento inteiro. 2.193 ícones publicados na página Iconography do Figma (2.185 Material Symbols [outlined] peso 300 + 8 avulsos fora da convenção; 135 com peso gravado como `300.svg`), mas **nenhum pacote de ícones no monorepo** e **nenhum SVG exportado** — os ícones usados estão inline no JSX. Licença não declarada em lugar nenhum (Material Symbols é Apache 2.0, a confirmar). | Figma + repo (criar pacote de ícones) + time (licença) | Design + Eng | Sim — exigência 3 |
| 364 | `/fundamentos/logo-e-marca` | Fundamento · página inexistente | Fundamento inteiro. O logo oficial é vetorial no Figma (node `40000172:79`, SVG 217×29, 18 paths) e usa `#FF161F`; o repositório só tem PNG 140×20 e o token de marca em código diz `#C50007`. `#FF161F` dá 3,90:1 sobre branco e **reprova no AA**. | Figma + decisão do time sobre cor de marca × cor de interface | Design + Gestão do DS | Sim — DoD #4 e #7 |
| 365 | `/fundamentos/motion` | Fundamento · página inexistente | Fundamento inteiro. Nenhum token de duração, easing ou delay no pipeline. Pior: **24 tokens de componente saem sem alias e sem unidade** porque apontam, no Figma, para variáveis de spacing (`--ds-component-tooltip-motion-duration-enter: 6`, `--ds-component-modal-backdrop-effect-opacity: 48`). | Figma (corrigir aliases + criar collection de motion) | Design tokens | Sim — exigência 3 e DoD #3 |
| 366 | `/fundamentos/acessibilidade` | Fundamento · página inexistente | Não há página de fundamento de acessibilidade. O que existe é `docs/accessibility.mdx`, 21 linhas de MDX fora da seção Foundations; o tema aparece só como subseção textual dentro de Elevation e Grids. Precisa ser escrita do zero. | Time (editorial) + auditoria da Fase 6 | Design + Eng front-end | Sim — exigência 3 e DoD #7 |
| 367 | `/fundamentos/grid-e-layout` | Fundamento · reconciliação de valores | Duas páginas publicadas se contradizem: Foundations/Breakpoints usa 0 / 640 / 900 / 1200 px (tokens) e Foundations/Grids usa 360 / 768-1024 / 1280-1440 px (literais no TSX). Nenhuma das duas referencia a outra. A fusão exige decidir o conjunto vigente. | Time (decisão) + `packages/tokens` | Design + Eng front-end | Sim — DoD #3 |
| 368 | `/fundamentos/tokens` | Fundamento · conceito | A definição de design token e a diferença entre as camadas primitive / semantic / component só existe em `packages/react/src/foundations/tokens/README.md`, fora do Storybook. As páginas de Foundations só cobrem a camada primitive (114 de 1.472 variáveis). | Repo (README) + time (editorial) | Design + Eng tokens | Sim — exigência 3 |

---

## Bloco D — Lacunas de infraestrutura, identidade e páginas de recurso

Pendências que não pertencem a uma página de componente: distribuição do pacote, identidade
visual, integridade do pipeline de tokens, páginas institucionais e critérios de DoD do próprio
projeto da Wiki.

| # | Página/rota | Seção | Dado faltante | Fonte esperada | Responsável sugerido | Bloqueia aceite? |
|---|---|---|---|---|---|---|
| 369 | `/recursos/instalacao` | Comando de instalação | `@government/design-system` e `@government/tokens` retornam **404** no registro do npm. Não existe pacote publicado para instalar. | Time (decisão: npm público, registro privado ou instalação por Git) | Gestão do DS + Eng | Sim — exigência 4 e DoD #2 |
| 370 | `/recursos/changelog` | Histórico de versões | **Zero tags git** e **nenhum CHANGELOG.md** no repositório. Changesets está configurado (`access: public`, `baseBranch: main`) e nunca foi usado. | Repo + time (política de versionamento) | Gestão do DS + Eng | Sim — DoD #2 |
| 371 | `/fundamentos/cor · /fundamentos/logo-e-marca` | Cor de marca | Conflito não resolvido: o logo oficial usa `#FF161F` (SVG do Figma), o token de marca em código diz `#C50007` e o Figma do Button resolve `#C60008`. `#FF161F` dá 3,90:1 sobre branco e reprova no AA; os outros dois passam (6,22:1 e 6,17:1). A Wiki precisa aplicar a identidade oficial e atingir AA ao mesmo tempo. | Time (decisão: cor da marca gráfica × cor de interface) | Design + Gestão do DS | Sim — DoD #4 e #7 |
| 372 | `/fundamentos/cor` | Paleta institucional | A collection **"Primárias/"** do Figma (que contém `Vermelho SP.GOV - Complementar: #FF161F`) está **inteira fora** das 4 collections exportadas. A paleta institucional simplesmente não renderiza na página de Color, que hoje mostra 24 cinzas e nada mais. | Figma (incluir a collection no pipeline) | Design tokens | Sim — DoD #3 |
| 373 | `/fundamentos/tokens` | Integridade do export | `src/normalized/t2-semantics.tokens.json` recebe uma cópia de `semantic.shadow.*` por compartilhamento de referência no `deepMerge` antes da escrita em disco. A fonte real desses 6 tokens é `web-extras.tokens.json`. A Wiki não pode documentar a origem errada. | Repo (`packages/tokens/scripts/transform-tokens.ts`) | Eng tokens | Sim — DoD #3 |
| 374 | `/fundamentos/elevacao-e-sombra` | Tokens de elevação | Não existe token de elevation/shadow no pipeline. Os 4 níveis publicados (Base/Raised/Floating/Overlay) são receitas textuais ("alpha-12 + spacing-2/6") que não correspondem a nenhum valor compilado; as sombras reais estão hardcoded em `elevation.docs.css`. O Figma menciona 5 níveis (`level-1..5`), a página publica 4. | Figma (effect styles → variables) + `packages/tokens` | Design tokens | Sim — DoD #3 |
| 375 | `/fundamentos/tema` | Modo de tema | A collection `T2: Semantics` tem um único modo, chamado `Prodesp`. Não há modo alternativo nem dark mode em nenhuma collection. A Wiki precisa dizer se o DS é mono-tema por decisão ou por omissão. | Figma + time | Design tokens + Gestão do DS | Não |
| 376 | `/introducao/sobre` | Nome oficial do órgão | As evidências apontam para o Governo do Estado de São Paulo (modo de token `Prodesp`, biblioteca `UI Kit Poupatempo SP.GOV.BR`, links `Fala SP` e `SP.GOV.BR` no Footer, repositório `sggdds`), mas nada confirma. Nenhum texto da Wiki pode usar essa inferência sem confirmação. | Time | Gestão do DS | Sim — restrição de identidade |
| 377 | `/introducao/sobre · /recursos/faq` | Sistemas paralelos | Existem pelo menos duas bibliotecas paralelas na organização: `SP / Design System / Arquivo PÚBLICO` (componentes `sp-*` versionados individualmente, ex. `sp-stepper` 1.1.0, `sp-stepper-modal` 4.2.0, com collection de cor própria `SP UI Colors/primary/*`) e `UI Kit Poupatempo SP.GOV.BR` (ex. `Stepper Mobile`). A Wiki precisa declarar qual sistema é o vigente e o que acontece com os anteriores. | Time | Gestão do DS | Sim — exigência 1 |
| 378 | `/ (home)` | Números da capa | A landing atual do Storybook afirma "68 componentes" (número escrito à mão, sem backlog que o sustente), "33 de 68 prontos" (o índice exporta 41 símbolos de valor) e "200+ tokens" (são 1.472 variáveis publicadas). Migrar o texto sem corrigir os números leva o erro para a Wiki. | Repo (`docs/introduction.docs.tsx`) + time | Gestão do DS + Eng | Sim — DoD #10 |
| 379 | `/ (home)` | Links quebrados herdados | A landing tem 2 deep links quebrados: `?path=/docs/documentation-integracao-com-figma--docs` (o id real preserva acentos) e o link de `web-components-file…`. Além disso o snippet de instalação usa `@sggd/design-system`, pacote que não existe (o real é `@government/design-system`). | Repo (`docs/introduction.docs.tsx`) | Eng front-end | Sim — DoD #10 |
| 380 | `/ (home)` | Card de Figma desabilitado | A landing tem um card de Figma marcado como "Em breve" e desabilitado. Na Wiki, o link para o arquivo de design precisa funcionar. | Figma (URL do arquivo) + time | Design | Sim — DoD #5 |
| 381 | `/fundamentos/tipografia` | Hospedagem da fonte | Plus Jakarta Sans é carregada por CDN do Google Fonts em `.storybook/preview-head.html` (pesos 300–800) e **não há nenhum arquivo de fonte no repositório**. Auto-hospedar exigiria baixar a família; manter o CDN é uma decisão de performance e privacidade que ninguém tomou. | Time (decisão) + repo | Eng + Gestão do DS | Não |
| 382 | `/fundamentos/tipografia` | Estilos compostos | Só existe escala primitiva solta: 22 tamanhos e 25 line-heights sem pareamento, sem estilos compostos (display / heading / body / label / caption). É o que designer e dev de fato usam, e não existe. | Figma (text styles) + `packages/tokens` | Design tokens | Sim — exigência 3 |
| 383 | `/recursos/ferramentas · /recursos/suporte · /recursos/faq · /recursos/downloads` | Páginas inteiras | A exigência 5 (ferramentas de suporte e FAQ) não tem nenhuma fonte no repositório nem no Figma. Quatro páginas a escrever do zero, incluindo definição de canal de suporte e de artefatos para download. | Time | Gestão do DS + Suporte | Sim — exigência 5 |
| 384 | `/introducao/premissas-e-objetivos · /introducao/principios` | Páginas inteiras | A exigência 1 (premissas e objetivos do DS) tem como única semente os 5 princípios e os 3 pilares escritos na landing do Storybook (`docs/introduction.docs.tsx`, 693 palavras). Não há documento de premissas, escopo ou objetivo acordado. | Repo (landing atual) + time | Gestão do DS | Sim — exigência 1 |
| 385 | `Wiki (projeto)` | Publicação | O projeto da Wiki ainda não existe. Local previsto: `wiki/`, fora do workspace pnpm, com build `npm ci && npm run build` e URL própria na Vercel. | Repo | Eng front-end | Sim — DoD #1 |
| 386 | `Wiki (projeto)` | Busca global | Busca global funcional é DoD #6 e não tem nenhuma base construída. | Repo | Eng front-end | Sim — DoD #6 |
| 387 | `Wiki (projeto)` | Responsividade auditada | DoD #8 exige comportamento verificado em 360 / 768 / 1024 / 1440 px. Nada verificado ainda. | Repo + QA | Eng front-end | Sim — DoD #8 |
| 388 | `Wiki (projeto)` | README de manutenção | DoD #11 exige README com processo de manutenção e sincronização de tokens. Não existe. | Repo | Eng + Gestão do DS | Sim — DoD #11 |
| 389 | `/componentes/visao-geral` | Classificação do catálogo | 58 itens publicados no Figma × 38 componentes em código. 20 itens do Figma são partes internas (`. Table Row`, `_Carousel Parts / Dot Control`), átomos (`Mandatory`, `star`, `Icon Action`, `Range`, `Star Rating`, `Logo/Portal de serviços`, `Nav Item`, `Title bar`, `User Menu`) ou não têm par em código. Sem classificação explícita, qualquer métrica de cobertura fica inflada. | Figma + repo (`mapping.json`) | Design + Eng | Sim — DoD #2 |

---

## Concentração das pendências

### Bloco B, por seção afetada

| Seção | Pendências | Bloqueiam |
|---|---:|---:|
| Aba 3 · Notas e limitações | 77 | 0 |
| Aba 2 · Tabela de tokens | 49 | 43 |
| Aba 2 · Acessibilidade | 38 | 12 |
| Aba 3 · Links (Figma) | 21 | 21 |
| Aba 3 · Classes e variáveis CSS | 19 | 0 |
| Aba 3 · API completa | 18 | 0 |
| Aba 1 · Comportamento responsivo | 11 | 0 |
| Aba 1 · Variantes e estados | 9 | 0 |
| Aba 1 · Anatomia + Aba 3 · Links | 4 | 4 |
| Aba 3 · Links (Storybook) | 2 | 0 |

### Por responsável sugerido

| Responsável | Pendências | Bloqueiam |
|---|---:|---:|
| Eng front-end | 173 | 25 |
| Design | 63 | 41 |
| Design tokens | 53 | 52 |
| Design + Eng front-end | 39 | 39 |
| Eng (pipeline da Wiki) | 15 | 8 |
| Gestão do DS | 14 | 4 |
| Eng front-end + Design | 9 | 0 |
| Gestão do DS + Eng | 5 | 5 |
| Design + Eng tokens | 5 | 5 |
| Design + Produto | 2 | 2 |
| Design + Eng | 2 | 2 |
| Design + Gestão do DS | 2 | 2 |
| Eng + Gestão do DS | 2 | 1 |
| Conteúdo/UX writing | 1 | 1 |
| Design + Suporte | 1 | 1 |
| Eng tokens | 1 | 1 |
| Design tokens + Gestão do DS | 1 | 0 |
| Gestão do DS + Suporte | 1 | 1 |

### Por critério de aceite atingido

| Critério | Pendências |
|---|---:|
| Sim — DoD #3 | 64 |
| Sim — exigência 3 | 47 |
| Sim — DoD #5 | 27 |
| Sim — DoD #7 | 19 |
| Sim — exigência 4 | 8 |
| Sim — exigência 2 e DoD #2 | 4 |
| Sim — DoD #2 | 4 |
| Sim — exigência 4 e DoD #2 | 2 |
| Sim — DoD #4 e #7 | 2 |
| Sim — exigência 1 | 2 |
| Sim — DoD #10 | 2 |
| Sim — exigência 2 | 1 |
| Sim — exigência 3 e DoD #3 | 1 |
| Sim — exigência 3 e DoD #7 | 1 |
| Sim — restrição de identidade | 1 |
| Sim — exigência 5 | 1 |
| Sim — DoD #1 | 1 |
| Sim — DoD #6 | 1 |
| Sim — DoD #8 | 1 |
| Sim — DoD #11 | 1 |

### Componentes com mais pendências técnicas

| Componente | Pendências | Bloqueiam |
|---|---:|---:|
| `carousel` | 11 | 2 |
| `tooltip` | 11 | 4 |
| `back-to-top` | 9 | 4 |
| `checkbox` | 9 | 2 |
| `data-table` | 9 | 2 |
| `alert` | 8 | 1 |
| `badge` | 8 | 3 |
| `card` | 8 | 3 |
| `datepicker` | 8 | 2 |
| `dropdown` | 8 | 3 |
| `header` | 8 | 4 |
| `toast` | 8 | 3 |

---

## As cinco pendências que travam mais coisa

1. **Os pacotes não existem no npm (404).** Sem decisão de distribuição, as 38 páginas ficam sem
   bloco de instalação real — exigência 4 e DoD #2 param aqui.
2. **O Figma não documenta uso.** Descrição vazia nos 58 componentes publicados. Isso transforma
   *quando usar*, *quando não usar*, *anatomia*, *do & don't*, *exemplos práticos* e *erros comuns*
   — 6 das 31 seções, 228 células — em trabalho editorial puro, sem fonte de design para consultar.
3. **O conflito de vermelho.** `#FF161F` (logo oficial) reprova no AA sobre branco (3,90:1) e
   `#C50007` (token) passa (6,22:1). A Wiki precisa aplicar a identidade oficial **e** atingir AA:
   sem a decisão do time, DoD #4 e DoD #7 se contradizem.
4. **Sem tags git, sem CHANGELOG.** O rodapé de toda página de componente pede "versão de
   introdução" e não existe uma única versão publicada para citar.
5. **Quatro componentes sem par no Figma** (`back-to-top`, `list-item`, `meganav`, `skeleton`) e
   14 com par só por nome. DoD #5 exige link funcional para Figma em **toda** página de componente.

