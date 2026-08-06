# Crítica de completude da Fase 0 — o que a extração deixou de fora

Revisão adversarial dos artefatos produzidos em `wiki/data/` contra o repositório real e contra as
rotas definidas em `wiki/PLANO-DE-ROTAS.md`. O objetivo não é validar o que foi feito: é encontrar
buraco. Cada afirmação abaixo foi verificada diretamente no código — arquivo e linha quando
aplicável.

**Artefatos auditados:** `figma-components.json`, `figma-icons.json`, `icones-resumo.json`,
`components/*.json` (38), `tokens.json`, `tokens-resumo.md`, `storybook-docs-inventory.json`,
`foundations-inventory.json`, `divergencias-sessao.md`, `achados-fase0.md`,
`verificacao-extracao.md`, `wiki/scripts/validar-extracao.mjs`, `MATRIZ-DE-ACEITE.md`.

**Veredito curto:** a extração de componentes é mecanicamente sólida (conferi props, valores de
union, defaults e tokens contra a fonte — praticamente zero divergência). O problema está em três
lugares: (a) campos inteiros que ninguém extraiu e sem os quais rotas planejadas não fecham;
(b) três afirmações de "não existe" que são falsas — o dado existe e foi declarado ausente;
(c) o arquivo mais importante do plano, `wiki/data/mapping.json`, é citado por dois documentos
como se existisse e **não existe**.

---

## 1. Dados faltantes para as rotas planejadas

Legenda de status: **❌ existe na fonte, ninguém extraiu** · **⚠️ extraído errado ou pela metade** ·
**🔒 não existe em lugar nenhum (repo nem Figma) — depende do time**

### /introducao/*

| Rota | Dado que falta | Onde deveria vir | Status |
|---|---|---|---|
| `/introducao/sobre` | Nome oficial do órgão, secretaria, ano de início, escopo de adoção | Time | 🔒 |
| `/introducao/premissas-e-objetivos` | Premissas, objetivos mensuráveis, público-alvo | Time | 🔒 |
| `/introducao/principios` | Os 5 princípios já redigidos em `docs/introduction.docs.tsx` | `storybook-docs-inventory.json` registrou só os *headings*; o texto dos princípios não foi transcrito para nenhum arquivo de dados | ❌ |
| `/introducao/como-usar` | Trilhas por perfil (designer / dev / PO / conteúdo) | Time | 🔒 |
| `/introducao/fluxo-de-criacao` | Qual biblioteca do Figma é a vigente, como pedir componente novo, critério de aceite de design | Time (as 3 bibliotecas paralelas estão em `achados-fase0.md` §5, sem decisão) | 🔒 |
| `/introducao/fluxo-de-desenvolvimento` | Pipeline real: jobs de `ci.yml` (lint, typecheck, test, build), gate de `release.yml` (publica só se `NPM_TOKEN` existir), `engines` (Node ≥22.12.0, pnpm ≥10.24.0), `.nvmrc`, `.npmrc`, eslint/prettier/vitest/playwright | `.github/workflows/*.yml`, `package.json`, arquivos de config na raiz | ❌ |
| `/introducao/governanca` | Quem aprova, cadência de release, política de deprecação, SLA | Não há `CONTRIBUTING.md`, `CODEOWNERS`, `SECURITY.md`, templates de issue/PR — `.github/` só tem `workflows/` | 🔒 |
| `/introducao/contribua` | Passo a passo de contribuição, convenção de commit, template de PR | `.changeset/config.json` (lido) + o resto não existe | ⚠️ / 🔒 |

### /fundamentos/*

| Rota | Dado que falta | Onde deveria vir | Status |
|---|---|---|---|
| `/fundamentos/tokens` | Lista nominal dos **24 tokens `number` sem unidade** (motion e opacidade), dos **6 tokens de sombra que vêm de `web-extras.tokens.json` e não do Figma**, e dos **19 grupos T3 sem componente** | `tokens.json` (o dado está lá, o recorte não foi feito) | ❌ |
| `/fundamentos/cor` | Matriz de contraste **completa** (só 7 pares foram testados); agrupamento semântico navegável; e o fato de **`#FF161F` alimentar 11 tokens, 6 deles de texto** (`text-style/content-color/typography/brand`, `alert/action-link/color/text`, `badge/color/text/brand`, `tag/color/text/brand`, `select/option/color/text/selected`, `toggle-button/color/text/selected`, `bottom-nav/item/color/text/selected`) — todos a 3,90:1, reprovando AA | `tokens.json` | ❌ |
| `/fundamentos/tipografia` | **Escala tipográfica renderizável não existe.** Há 22 font-sizes, 25 line-heights, 6 pesos e 4 letter-spacings soltos e **nenhum estilo composto** (display/heading/body/label/caption). Não há como renderizar "a escala" porque não existe pareamento size↔line-height↔weight | Figma (T2 tem `text style/content color/*`, mas só cor — nenhum estilo de texto composto foi exportado) | 🔒 na origem |
| `/fundamentos/tipografia` | Pesos realmente disponíveis: a CDN carrega 300;400;500;600;700;800 (`preview-head.html`), os tokens declaram 300–800, e `consuming.mdx` promete `wght@200..800`. Três respostas | `.storybook/preview-head.html` × tokens × docs | ⚠️ |
| `/fundamentos/grid-e-layout` | **Breakpoints realmente usados no CSS dos componentes**: 420px (14×), 480, 640 (15×), 720 (4×), 768 (3×), 900 (3×), 920, 1200. Os tokens publicam 0/640/900/1200; a página Grids usa 360 / 768–1024 / 1280–1440. **Três verdades, e a terceira — o CSS real — nunca foi inventariada** | `packages/react/src/components/*/*.styles.css` | ❌ |
| `/fundamentos/grid-e-layout` | Largura máxima de container e regra de centralização: **não existe token nenhum**. `--ds-component-grid-*` só tem 6 tokens de gap (16/24/32) | tokens + Figma | 🔒 |
| `/fundamentos/iconografia` | **Escala de tamanho de ícone.** Não existe escala canônica: há 30 tokens de tamanho de ícone espalhados por componente, com 8 valores distintos (10, 12, 16, 20, 24, 32, 40, 48px) | tokens | ❌ (recorte) / 🔒 (canonização) |
| `/fundamentos/iconografia` | SVGs para download dos 2.193 ícones e licença formal | Figma (export nunca feito) / Time | 🔒 |
| `/fundamentos/logo-e-marca` | **Existe um segundo logo que ninguém mencionou:** `packages/react/src/components/Header/assets/logo-portal-de-servicos.png` (464×111, renderizado a 160×38 em `Header.tsx:113`), correspondente ao componente `Logo/Portal de serviços` do Figma. Nenhum artefato da Fase 0 cita esse ativo | repo + Figma | ❌ |
| `/fundamentos/logo-e-marca` | Versões (monocromática, negativa, reduzida), área de proteção, tamanho mínimo, usos proibidos | Time | 🔒 |
| `/fundamentos/elevacao-e-sombra` | Mapa sombra → componente. Os 6 `--ds-semantic-shadow-*` **existem** e são consumidos por Meganav, Toast, Carousel, Toggle, CookieConsentBanner e DataTable — mas `foundations-inventory.json` declara que não existe token de sombra (ver §2.1) | `packages/tokens/dist/css/tokens.css:160-165` | ⚠️ erro |
| `/fundamentos/motion` | **Easings: zero tokens.** Nenhum token de easing, curva ou delay padrão em nenhuma das 5 coleções. As curvas reais estão hardcoded nas declarações `transition:` do CSS dos 38 componentes e nunca foram extraídas | `*.styles.css` | ❌ |
| `/fundamentos/motion` | Durações reais. Os 21 tokens de duração saem como número puro (4, 6, 8, 48) porque no Figma apontam para variáveis de spacing. `8` não é 8ms nem 8s — é inutilizável como está | tokens (defeito de origem) | 🔒 na origem |
| `/fundamentos/acessibilidade` | **Inventário de focus ring.** Há 13 origens distintas de cor de anel de foco entre os 38 componentes, incluindo 2 ocorrências hardcoded de `#3366e5`, enquanto existe um token canônico ignorado (`--ds-component-focus-ring-color-ring: #2554ed`) | `*.styles.css` + tokens | ❌ |
| `/fundamentos/acessibilidade` | Os 25 componentes (de 38) **sem** teste axe, nominalmente | disco (`*.a11y.test.tsx`) — o número 13/38 foi apurado, a lista não | ❌ (recorte) |
| `/fundamentos/acessibilidade` | Versão e nível WCAG canônicos (home diz AA; `accessibility.mdx` não diz; `consuming.mdx` diz ≥4.5:1) | Time | 🔒 |

### /componentes/*

| Rota | Dado que falta | Onde deveria vir | Status |
|---|---|---|---|
| `/componentes/visao-geral` | **`wiki/data/mapping.json` não existe.** `PLANO-DE-ROTAS.md` diz "o universo do catálogo sai de `wiki/data/mapping.json`" e `validar-extracao.mjs:82` tem uma regra que só roda se ele existir | deveria ter sido produzido na Fase 0 | ❌ |
| `/componentes/visao-geral` | Categorias do catálogo (Ações, Formulário, …). Existem em `docs/introduction.docs.tsx` (`COMPONENT_CATEGORIES`) e não foram extraídas como dado | repo | ❌ |
| `/componentes/visao-geral` | Status de maturidade por componente (estável / beta / em desenho / depreciado) | Time | 🔒 |
| `/componentes/[slug]` | **`figmaNodeId`: 18 de 38 componentes têm `figmaReferences` vazio** — e 10 deles têm par óbvio já presente em `figma-components.json` (ver §2.10). DoD #5 é inatingível hoje | cruzamento entre dois arquivos que já existem | ❌ |
| `/componentes/[slug]` | **`componentCanvas.width`: ausente nos 38.** Os 38 `.stories.tsx` declaram esse parâmetro (de 64 a 1280px) e o decorator de `.storybook/preview.ts` usa **320px como padrão**. Sem esse dado, todo `<iframe>` de preview da Wiki vai renderizar componente largo (DataTable = 1120px) dentro de 320px | `packages/react/src/components/*/*.stories.tsx` | ❌ |
| `/componentes/[slug]` | **Paridade multiplataforma.** 13 componentes têm implementação SwiftUI e Android e 32 entradas no Storybook (`SwiftUI/*`, `Android/*`). Nenhum `components/*.json` tem campo de plataforma | `platforms/`, `showcase/`, `storybook-static/index.json` | ❌ |
| `/componentes/[slug]` | Campos das sub-interfaces (ver §2.12): `DataTableColumn` (20 campos), `PaginationLabels` (12), `MeganavItem`/`MeganavFeatured` | `*.types.ts` | ⚠️ |
| `/componentes/[slug]` | Dependências entre componentes (Carousel estiliza `.ds-card`; DataTable estiliza `.ds-button` e `.ds-checkbox`; CookieConsentBanner estiliza `.ds-button`) | `*.styles.css` | ❌ |
| `/componentes/[slug]` | Versão de introdução / última alteração. O `git log` tem 21 commits datados com node-id do Figma (ver §2.6) | `git log` | ❌ |
| `/componentes/[slug]` | Quando usar, quando não usar, anatomia, do & don't, erros comuns | Time (já reconhecido) | 🔒 |

### /padroes/*, /templates/*, /conteudo/*

| Rota | Dado que falta | Onde deveria vir | Status |
|---|---|---|---|
| `/padroes/*` | O plano diz "100% editorial". **Não é bem assim:** há **19 grupos de token T3 (364 tokens) sem componente em código** — `banner`, `bottom-nav`, `button-group`, `drawer`, `empty-state`, `form-field`, `icon-button`, `inline-message`, `navbar`, `password-field`, `rating`, `search-field`, `select` (76 tokens!), `slider`, `splitter`, `stack`, `tag`, `toggle-button`, `toolbar`. Essa é literalmente a lista de padrões/componentes que o Figma já previu e ninguém catalogou | `tokens.json` | ❌ |
| `/padroes/*` | Na mão inversa: **10 componentes em código sem nenhum grupo de token T3** (`action-card`, `back-to-top`, `button-gov`, `header`, `hero`, `list-item`, `meganav`, `skeleton`, `spinner`, `tabs`) — construídos fora do sistema de tokens | `tokens.json` × disco | ❌ |
| `/templates/*` | Nada. Não há template no Figma nem no Storybook | Time | 🔒 |
| `/conteudo/writing` | **Existe microcopy real e ninguém extraiu.** 34 arquivos de componente têm `aria-label` e labels padrão em português. E há defeito concreto: os textos-padrão lidos por leitor de tela estão **sem acentuação** — `'Paginacao'` (`Pagination.tsx:10`), `'Pagina anterior'` (`:19`), `'Navegacao principal'` e `'Fechar navegacao'` (`Meganav.tsx:218,220`), `'Dispensar notificacao'` (`Toast.tsx:107`), `'Navegacao de rodape'` (`Footer.tsx:280`) — convivendo com strings corretamente acentuadas no mesmo arquivo | `packages/react/src/components/*/*.tsx` | ❌ |
| `/conteudo/vocabulario` | Inconsistência de nomenclatura entre código e Figma, que é matéria-prima do glossário: `Datepicker`/`Date picker`, `Toggle`/`Switch`, `DataTable`/`Table`, `ButtonGov`/`Gov Button`, `CookieConsentBanner`/`Cookie Banner`, `Breadcrumb`/`Breadcrumbs`, `TextArea`/`textarea`, e o `Sucess`/`success` já registrado | cruzamento código × Figma × tokens | ❌ |

### /recursos/*

| Rota | Dado que falta | Onde deveria vir | Status |
|---|---|---|---|
| `/recursos/ferramentas` | Não há Code Connect (`*.figma.ts` = 0), plugin de Figma, linter de token nem gerador de componente. `packages/react/src/utilities/` está vazio (só README) | repo | ❌ (constatação não feita) |
| `/recursos/downloads` | `packages/tokens/dist/json/tokens.json` existe e está pronto para download; os 3 PNGs de logo + o SVG extraído; link do UI kit no Figma. Só o SVG foi para `wiki/data/assets/` | repo + Figma | ⚠️ |
| `/recursos/downloads` | **`fileKey` da biblioteca Foundations.** Só o `fileKey` de Web Components (`yDUVLEx2nP1c7SFQDZVj7n`) foi registrado. Sem o da Foundations, nenhuma página de `/fundamentos/*` consegue gerar deep link para o Figma | Figma | ❌ |
| `/recursos/instalacao` | Comando real de instalação | Time (pacotes não publicados) | 🔒 |
| `/recursos/faq` | 25+ perguntas | Time | 🔒 |
| `/recursos/suporte` | Canais e SLA | Time | 🔒 |
| `/recursos/changelog` | **A fonte existe e foi declarada inexistente.** O `git log` tem 35 commits (2026-05-15 → 2026-08-05), 21 deles no formato `"<Componente>: novo layout do Figma (Web Components <node-id>)"` — data, componente e node-id em cada linha | `git log` | ❌ |
| `/recursos/glossario` | Termos e definições | Time | 🔒 |
| Toda rota | **Titularidade da licença.** `LICENSE` diz `Copyright (c) 2026 SGGD Design System contributors` — sem órgão nomeado, num DS de governo | repo | 🔒 |

---

## 2. Erros encontrados na extração

Concretos, com arquivo e campo. Numerados para referência.

**2.1 — `foundations-inventory.json`: afirma que não existe token de sombra. Existe.**
Campos afetados: `_meta.dadosDeTokens` ("Nao existem tokens de elevation/shadow, motion, icone ou
camada semantica"), `observacoesSobreCobertura.elevacao-e-sombra` ("sem nenhum token real por trás")
e `pages[Foundations/Elevation].lacunasVsEspecificacao[0]` ("Nao existe token de elevation/shadow no
pipeline").
Realidade: 6 tokens em `packages/tokens/dist/css/tokens.css:160-165`
(`--ds-semantic-shadow-floating|modal|overlay|popover|raised|switch-thumb`), consumidos por
Meganav, Toast, Carousel, Toggle, CookieConsentBanner e DataTable. O próprio
`storybook-docs-inventory.json` documenta corretamente que eles vêm de `web-extras.tokens.json`.
**Dois artefatos da mesma fase se contradizem.**

**2.2 — `foundations-inventory.json`: `observacoesSobreCobertura.motion`.**
Diz "Nenhum token de duracao, easing ou delay no pipeline". São 21 tokens de duração e 1 de delay
(`--ds-component-tooltip-motion-delay`). A afirmação só é verdadeira para *easing*. Como está,
mandaria a Fase 2 escrever `/fundamentos/motion` do zero ignorando 22 tokens existentes (ainda que
defeituosos).

**2.3 — `divergencias-sessao.md` §1, linha do `Primárias/Vermelho SP.GOV - Complementar`.**
Campo "Situação no código": *"Ausente. Collection 'Primárias/' inteira não foi exportada"*.
Falso. `#FF161F` está exportado como `--ds-brand-color-brand-red`
(`figmaPath: color/brand/red`, coleção `t1-sampa.tokens.json`) e propagado para 11 tokens.
O problema real é outro e mais grave: existem **duas** marcas vermelhas exportadas com nomes quase
idênticos — `color/brand/red` (#FF161F) e `color/brand/red-primary` (#C50007, 56 tokens) — sem
nada que diga qual é interface e qual é marca gráfica.

**2.4 — `divergencias-sessao.md` §1, linha `color/border/focus #3366E5` → "Ausente".**
Impreciso. Existe um grupo canônico de focus ring: `--ds-component-focus-ring-color-ring` (#2554ed),
`--ds-component-focus-ring-effect-width` (2px), `--ds-component-focus-ring-effect-offset` (2px),
`--ds-component-focus-ring-border-radius` (8px). O defeito não é ausência de token — é o Card
hardcodar `#3366e5` ignorando o token que existe. A distinção importa: "criar token" e "usar o
token que já existe" são recomendações diferentes.

**2.5 — `achados-fase0.md` §3: "O repositório só tem PNG 140×20".**
Falso. São 3 PNGs de logo: `images/logo-spgov-default.png` (140×20),
`packages/react/src/components/Header/assets/logo-spgov-default.png` (140×20, **md5 idêntico
`750cd985baf6c550e67187c5ad3ddd06` — arquivo duplicado no repo**) e
`packages/react/src/components/Header/assets/logo-portal-de-servicos.png` (464×111), que é uma
**segunda marca** ("Portal de Serviços") não mencionada em nenhum artefato da Fase 0.

**2.6 — `achados-fase0.md` §1: "/recursos/changelog … ficam sem fonte".**
A conclusão ignora o `git log`, que tem 21 commits estruturados com componente, node-id do Figma e
data (ex.: `Tooltip: novo layout do Figma (Web Components 108:35791)`). É simultaneamente a melhor
fonte disponível para `/recursos/changelog`, para o campo "última atualização" de cada componente
e para reconstruir o `mapping.json` ausente.

**2.7 — `verificacao-extracao.md`: a regra `mapping.figmaNodeId` é no-op.**
O documento lista 7 regras na tabela "Verificação mecânica" e conclui **"228 verificações, zero
falhas"**. `wiki/data/mapping.json` não existe e `validar-extracao.mjs:82` envolve a regra num
`if (existsSync(mappingPath))`. 228 = 6 regras × 38 componentes: a sétima **nunca rodou**.
Reportar uma regra que não executou como parte de um resultado "zero falhas" é o tipo de coisa que
a própria seção "Um falso positivo, corrigido no validador" existe para evitar.

**2.8 — `MATRIZ-DE-ACEITE.md`, DoD #9.**
Afirma: *"`MATRIZ-DE-ACEITE.md`, `INCONSISTENCIAS.md`, `COBERTURA.md`, `LACUNAS.md` iniciados na
Fase 0"*. Só o primeiro existe. Os outros três não estão nem na raiz nem em `wiki/`.

**2.9 — `PLANO-DE-ROTAS.md`, seção Componentes.**
*"O universo do catálogo sai de `wiki/data/mapping.json`"*. Arquivo inexistente. Toda a regra de
classificação descrita ali (partes internas viram anatomia; só-Figma vira "Em desenho"; só-código
vira "Sem par no Figma") não tem onde ser aplicada.

**2.10 — `components/*.json`: 18 de 38 sem nenhuma referência ao Figma, com 10 pares óbvios já
disponíveis.**
`figmaReferences: []` em avatar, back-to-top, button-gov, button, cookie-consent-banner, data-table,
footer, link, list-item, meganav, pagination, skeleton, spinner, tabs, text-area, text-input, toast,
toggle. Destes, os seguintes têm par direto em `figma-components.json` — o cruzamento simplesmente
não foi feito:

| slug | componente no Figma | nodeId |
|---|---|---|
| `avatar` | Avatar | `40000199:12660` |
| `button` | Button | `4:283` |
| `cookie-consent-banner` | Cookie Banner | `40000174:675` |
| `footer` | Footer | `108:13943` |
| `link` | Link | `219:12380` |
| `pagination` | Pagination | `40000033:16002` |
| `spinner` | Spinner | `40000120:5900` |
| `text-area` | Text Area | `107:7690` |
| `text-input` | Text Input | `40000490:39413` |
| `toast` | Toast | `40000662:11` |

Os 8 restantes (back-to-top, button-gov, data-table, list-item, meganav, skeleton, tabs, toggle)
precisam de decisão humana de nomenclatura — `Table`, `Gov Button`, `Switch` e `Tab Item` existem
no Figma com nome diferente.

**2.11 — `components/*.json`: campo de largura de canvas ausente nos 38.**
Todos os 38 `.stories.tsx` declaram `parameters.componentCanvas.width` (ex.: `Button.stories.tsx:39`
= 360; `DataTable.stories.tsx:300` = 1120; valores observados de 64 a 1280). O decorator em
`.storybook/preview.ts` aplica **320px por padrão** quando o parâmetro não é lido. Como
`PLANO-DE-ROTAS.md` §2 define que o preview da Wiki é `<iframe>` do Storybook, esse dado é
requisito funcional, não enfeite.

**2.12 — `components/*.json`: duas convenções conflitantes para sub-interfaces.**
`accordion.json`, `header.json` e `toast.json` documentam campos aninhados
(`AccordionItem.title`, `user.avatar`, `actions[].label`). Já:
- `pagination.json` lista `labels: PaginationLabels` e **nenhum** dos 12 campos de
  `PaginationLabels` (`ariaLabel`, `firstPage`, `previousPage`, `nextPage`, `lastPage`, `page`,
  `currentPage`, `resultsPerPage`, `pageSelect`, `mobilePageSelect`, `pageStatus`, `range`) — que
  é exatamente a superfície de i18n e microcopy do componente;
- `data-table.json` lista `columns` e **nenhum** dos 20 campos de `DataTableColumn`
  (`sortable`, `sortAccessor`, `sortFunction`, `omit`, `hideBelow`, `grow`, `width`, `minWidth`,
  `maxWidth`, `wrap`, `center`, `right`, `cell`, `selector`, `headerClassName`, …) — a API central
  do componente;
- `meganav.json` idem para `MeganavItem` e `MeganavFeatured`.

**2.13 — `components/*.json`: nenhum campo de plataforma.**
13 componentes (Alert, Button, Checkbox, Chip, Divider, Link, Modal, ProgressBar, Radio, Spinner,
Toast, Toggle, Tooltip) têm implementação em `platforms/ios/Sources/SGGDComponents/` e
`platforms/android/.../components/`, com 32 entradas no `storybook-static/index.json` sob
`SwiftUI/*` e `Android/*`. Nada disso aparece nos 38 arquivos.

**2.14 — `components/*.json`: composição entre componentes não registrada.**
`Carousel.styles.css` estiliza `.ds-card`, `.ds-card__title` e `.ds-card__description`;
`DataTable.styles.css` estiliza `.ds-button`, `.ds-button__icon`, `.ds-button__label`,
`.ds-checkbox`, `.ds-checkbox__content`, `.ds-checkbox__control`;
`CookieConsentBanner.styles.css` estiliza `.ds-button`. São acoplamentos reais entre componentes,
sem campo que os expresse.

**2.15 — `carousel.json`, campo `cssClasses`: entrada que não é um nome de classe.**
O array contém a string
`"ds-carousel--visible-<n> (template \`ds-carousel--visible-${resolvedVisibleItems}\`; somente .ds-carousel--visible-1 tem regra no CSS)"`.
É prosa dentro de uma lista tipada. Qualquer consumo programático da lista de classes quebra ou
imprime isso na tela.

**2.16 — Fonte de descrição concorrente e defasada, não inventariada.**
`packages/react/src/components/README.md` traz uma frase de resumo para **22** dos 38 componentes.
É uma terceira fonte de "one-liner" (junto de `oneLiner` e `docsDescription`), está defasada em 16
componentes, e nenhum artefato da Fase 0 a menciona — inclusive `Loading`/`RadioGroup` e o
renomeado `InfoCard → ActionCard` deixam rastro ali.

---

## 3. Fontes não exploradas

Existe no repositório e nenhum artefato de `wiki/data/` leu:

1. **`platforms/ios/`** — `Package.swift`, `Sources/SGGDTokens/DSTokens.swift` (gerado pelo
   `tokens:build`), 14 arquivos SwiftUI em `Sources/SGGDComponents/` (Button, Alert, Toast, Chip,
   Checkbox, Radio, Toggle, Spinner, ProgressBar, Divider, Link, Modal, Tooltip, DSDismissButton,
   `Foundation/HIG.swift`), `Tests/SGGDComponentsTests/DSButtonTests.swift`. `HIG.swift` sugere
   regras de adaptação a Human Interface Guidelines que a Wiki precisaria documentar.
2. **`platforms/android/`** — 2 módulos Gradle, 13 componentes Kotlin, `attrs_ds_button.xml`,
   `attrs_ds_components.xml`, `layout/ds_button_gallery.xml` e as 4 saídas de token geradas
   (`ds_colors.xml` em `#AARRGGBB`, `ds_dimens.xml` em dp/sp, `ds_integers.xml`, `ds_strings.xml`).
3. **`showcase/`** — `native-showcase.tsx` + 26 stories (13 SwiftUI + 13 Android) que alimentam as
   32 entradas `SwiftUI/*` e `Android/*` do Storybook. `foundations-inventory.json` só olhou
   `Foundations/*` (16 entradas) e `storybook-docs-inventory.json` só `Documentation/*` (5). As 32
   entradas nativas ficaram fora dos dois.
4. **`git log`** — 35 commits, 2026-05-15 a 2026-08-05; 21 com nome de componente + node-id do
   Figma. Fonte de changelog, de "última atualização" e do `mapping.json` ausente.
5. **`.github/workflows/ci.yml` e `release.yml`** — jobs, gates e a condição
   `if: env.NPM_TOKEN != ''` que explica por que nada foi publicado.
6. **`.storybook/preview.ts`** — o decorator que enquadra `Web Components/*`, `SwiftUI/*` e
   `Android/*` num contêiner de largura fixa (padrão 320px), o background de canvas
   `--ds-primitive-color-neutral-grey-100` e a configuração de `argTypesRegex`. Requisito direto
   do preview em iframe da Wiki.
7. **`.storybook/manager-head.html`** — redirecionamento forçado para
   `documentation-introdução--docs` e manipulação de `localStorage`. Afeta qualquer deep link que
   a Wiki gerar para o Storybook.
8. **Microcopy dos componentes** — 34 arquivos com `aria-label` e textos padrão em pt-BR. Única
   fonte existente para `/conteudo/writing` e `/conteudo/vocabulario`, e onde está o defeito de
   acentuação descrito em §1.
9. **READMEs de pasta nunca lidos** — `packages/react/src/components/README.md` (catálogo de 22),
   `packages/react/src/foundations/README.md`, `packages/react/src/utilities/README.md` (utilities
   está vazio), `packages/tokens/scripts/README.md`, `platforms/web/README.md`.
   `packages/tokens/src/raw/README.md` só aparece citado de segunda mão.
10. **`packages/react/src/components/Header/assets/`** — os 2 PNGs de logo (§2.5).
11. **`packages/tokens/dist/json/tokens.json`** — artefato pronto para `/recursos/downloads`.
12. **`LICENSE`** — MIT com titular genérico ("SGGD Design System contributors").
13. **Configuração de projeto** — `vercel.json`, `.npmrc`, `.nvmrc`, `.editorconfig`,
    `eslint.config.js`, `prettier.config.js`, `tsconfig.base.json`, `pnpm-workspace.yaml`.
    Base factual de `/introducao/fluxo-de-desenvolvimento` e `/introducao/contribua`.
14. **`docs/introduction.docs.tsx` como dado estruturado** — `COMPONENT_CATEGORIES` (categorias do
    catálogo) e o texto dos 5 princípios foram inventariados como *headings*, não extraídos.
15. **Ausência de Code Connect** — zero `*.figma.ts` no repo. Relevante para `/recursos/ferramentas`
    e para a estratégia de manter Figma e código sincronizados.

---

## 4. Perguntas que só o time responde

Nenhuma destas tem resposta no repositório nem no Figma. Estão ordenadas por impacto no
cronograma — as 6 primeiras bloqueiam a Fase 1.

1. Qual é o nome oficial do órgão e da secretaria responsável pelo Design System? (As evidências
   apontam para o Governo do Estado de SP, mas é inferência.)
2. `#FF161F` e `#C50007` coexistem como tokens exportados (`color/brand/red` e
   `color/brand/red-primary`). Qual é a cor de **interface** e qual é a cor da **marca gráfica**?
   E o que fazer com os 6 tokens de **texto** que hoje resolvem para `#FF161F` e reprovam no WCAG AA
   (3,90:1 sobre branco)?
3. Qual biblioteca do Figma é a vigente: `Foundations` + `Web Components`,
   `SP / Design System / Arquivo PÚBLICO` ou `UI Kit Poupatempo SP.GOV.BR`? O que acontece com as
   outras — congeladas, depreciadas, migrando?
4. Os pacotes `@government/design-system` e `@government/tokens` serão publicados no npm público,
   num registro privado, ou o consumo será via Git? (Define `/recursos/instalacao` e o DoD #2.)
5. O escopo `@government` permanece, ou o pacote será renomeado para algo que identifique o órgão?
   (Hoje há três nomes em circulação: `@government/design-system`, `@sggd/design-system` — no
   snippet de onboarding — e o repositório `sggdds`.)
6. Qual é a URL e o domínio definitivos da Wiki? (`PLANO-DE-ROTAS.md` propõe
   `wiki-sampads.vercel.app` "a confirmar".)
7. Qual versão e qual nível da WCAG são o compromisso oficial — 2.1 AA, 2.2 AA, outro? (Três
   fontes internas discordam.)
8. Qual é a política de versionamento e release? Sem tags git e sem CHANGELOG, não há como
   preencher "versão de introdução" de nenhum componente.
9. O `git log` pode ser usado como fonte do changelog público, ou o changelog só começa a partir da
   primeira release formal?
10. Existe uma escala tipográfica composta (display / heading / body / label / caption) definida em
    algum lugar? Se não existe, quem a define — e quando? Sem ela `/fundamentos/tipografia` não tem
    o que renderizar além de 22 números soltos.
11. Qual é o conjunto oficial de breakpoints? Hoje há três respostas: tokens (0/640/900/1200),
    página Grids (360 / 768–1024 / 1280–1440) e o CSS real dos componentes (420/480/640/720/768/
    900/920/1200).
12. Existe largura máxima de container e regra de centralização de página? Não há token nenhum.
13. Qual é a escala oficial de tamanho de ícone? Hoje há 8 valores distintos em 30 tokens por
    componente, sem escala canônica.
14. Confirmação formal da licença dos 2.193 ícones (Material Symbols é Apache 2.0, mas não há nota
    em lugar nenhum) e autorização para redistribuí-los em `/recursos/downloads`.
15. Os 8 ícones fora da convenção (`arrow down/left/right/up`, `home`, `radio button checked`,
    `radio circle`, `upload`) entram no catálogo oficial ou são substituídos por equivalentes
    Material Symbols?
16. O logo "Portal de Serviços" (464×111) faz parte do sistema de marca ou é ativo de um produto
    específico? Existem versões vetoriais, monocromática, negativa e regra de área de proteção?
17. A fonte Plus Jakarta Sans será servida por CDN do Google ou auto-hospedada? (Decisão de
    privacidade e performance para um site de governo. Nenhum arquivo de fonte existe no repo.)
18. Haverá tema escuro? Hoje há um único modo de token, chamado `Prodesp`, em todas as coleções, e
    `consuming.mdx` declara dark mode como pendente.
19. Os 19 grupos de token sem implementação (`select` com 76 tokens, `slider`, `drawer`, `tag`,
    `search-field`, `password-field`, `banner`, `empty-state`, `inline-message`, `toolbar`,
    `bottom-nav`, `icon-button`, `toggle-button`, `navbar`, `rating`, `splitter`, `stack`,
    `form-field`, `button-group`) são roadmap, legado ou ruído? Isso define se viram páginas "Em
    desenho", entram em `/padroes/*` ou são omitidos.
20. Os 10 componentes construídos sem tokens T3 (`action-card`, `back-to-top`, `button-gov`,
    `header`, `hero`, `list-item`, `meganav`, `skeleton`, `spinner`, `tabs`) serão tokenizados? A
    Wiki documenta os literais como estão ou marca como pendência?
21. Qual é o nome canônico de cada componente para o público? É preciso escolher um lado em
    `Toggle`/`Switch`, `DataTable`/`Table`, `Datepicker`/`Date picker`, `ButtonGov`/`Gov Button`,
    `Breadcrumb`/`Breadcrumbs`, `CookieConsentBanner`/`Cookie Banner`.
22. Qual é o escopo de `/padroes/*` e `/templates/*`? Nada existe hoje; o plano lista 9 padrões e 4
    templates como hipótese.
23. Quem aprova conteúdo editorial (o "quando usar", do & don't, anatomia) e em que prazo? São
    244 pendências registradas — o gargalo do projeto inteiro é a validação humana desse texto.
24. Quais são os canais de suporte e o SLA para `/recursos/suporte`?
25. Qual é o modelo de governança: quem pode propor componente, quem revisa design, quem revisa
    código, quem publica release?
26. Existe guia de escrita/tom de voz institucional (do órgão ou do Poder Executivo estadual) que
    `/conteudo/writing` deva seguir ou herdar?
27. Os textos padrão sem acentuação lidos por leitor de tela (`'Paginacao'`, `'Pagina anterior'`,
    `'Navegacao principal'`, `'Fechar navegacao'`, `'Dispensar notificacao'`,
    `'Navegacao de rodape'`) devem ser corrigidos no código antes da Wiki documentá-los, ou a Wiki
    documenta o estado atual e abre pendência?
28. O titular do copyright em `LICENSE` ("SGGD Design System contributors") está correto para um
    ativo público, ou deve nomear o órgão?
29. As implementações iOS e Android (13 componentes cada) são produto oficial e entram na Wiki com
    aba própria, ou são prova de conceito e ficam de fora?
30. Existe compromisso de acessibilidade automatizada? Hoje 25 dos 38 componentes não têm teste
    axe, e a Wiki vai publicar essa cobertura.

---

*Gerado em 2026-08-05. Método: leitura direta do repositório e conferência cruzada contra os
artefatos de `wiki/data/`. Nenhuma afirmação desta crítica é inferência — cada uma tem arquivo,
campo ou comando de verificação indicado no próprio texto.*
