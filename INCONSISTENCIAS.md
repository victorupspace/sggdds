# Inconsistências do Design System — Fase 0

Relatório do cruzamento de **três inventários** do sistema:

| # | Inventário | Arquivo | Universo |
|---|---|---|---|
| 1 | Biblioteca Figma `Web Components` (`fileKey yDUVLEx2nP1c7SFQDZVj7n`) | `wiki/data/figma-components.json` | 58 componentes publicados (+ 2.193 ícones em `figma-icons.json`) |
| 2 | API real dos componentes React | `wiki/data/components/*.json` | 38 componentes |
| 3 | Catálogo publicado do Storybook | `storybook-static/index.json` | 306 entries |
| 4 | Divergências de tokens verificadas node a node | `wiki/data/divergencias-sessao.md` | incorporado na seção 6 |

O pareamento completo está em **`wiki/data/mapping.json`**.

### Como ler as evidências

Toda linha deste relatório cita a origem do dado: **node-id do Figma** (abre em
`https://www.figma.com/design/yDUVLEx2nP1c7SFQDZVj7n/Web-Components?node-id=<id>`) e/ou o
**arquivo do repositório**. Nada aqui é inferência de comportamento: os dados de props vêm dos
JSONs de `wiki/data/components/`, os dados de variantes vêm de `properties[].variantOptions` do
Figma, e os títulos vêm de `entries[].title` do Storybook.

### Critério de confiança do pareamento

| Confiança | Regra | Qtde |
|---|---|---|
| `exata` | O JSON do componente registra o node-id do Figma em `figmaReferences[]` — evidência dentro do repositório | 20 |
| `provavel` | Nome corresponde 1:1 e não há candidato concorrente, **mas nenhum node-id foi gravado no código** | 13 |
| `incerta` | Há mais de um component set do Figma disputando o mesmo componente de código | 2 |

---

## 1. Resumo executivo

| Métrica | Valor |
|---|---|
| Componentes publicados no Figma | **58** |
| — destes, componentes de catálogo | **36** |
| — destes, partes internas / átomos / assets | **22** |
| Componentes React documentados | **38** |
| Títulos `Web Components/*` no Storybook | **38** (bate 1:1 com o código, sem sobra dos dois lados) |
| Pares Figma ↔ código | **35** (33 slugs distintos) |
| Cobertura do Figma (35/58) | **60,3%** |
| Cobertura do Figma desconsiderando partes internas (35/36) | **97,2%** |
| Cobertura do código (33/38) | **86,8%** |
| Componentes do Figma sem código | **1** (`Star Rating`) + 1 átomo órfão (`star`) |
| Componentes de código sem Figma | **5** (`BackToTop`, `ListItem`, `Meganav`, `Skeleton`, `Tabs`) |
| Pares sem rastreabilidade (nenhum node-id no código) | **13 slugs** (18 no total, somando os 5 sem par no Figma) |
| Divergências de nomenclatura de componente | **13** |
| Divergências de variantes/props catalogadas | **34** |
| Variables do Figma ausentes nas collections exportadas | **16 famílias** |
| Variables com valor divergente (Figma × collection exportada) | **11** |
| Valores literais sem token nenhum | **13** |
| Erros de grafia na origem (Figma) | **7** |
| Componentes React com teste de acessibilidade (axe) | **13 de 38 (34%)** — `wiki/data/achados-fase0.md` §7 |
| Componentes Web com showcase Android **e** SwiftUI | **13 de 38** |

**Leitura de uma frase:** o código está quase inteiramente coberto pelo Figma e vice-versa, mas a
ligação entre os dois é frágil — **13 dos 33 componentes pareados não têm nenhum node-id gravado
no repositório**, os eixos de variante têm nomes diferentes em quase todos os componentes, e a
camada de tokens tem 11 valores que divergem entre o Figma de hoje e o que foi exportado.

---

## 2. Componentes no Figma sem implementação em código

### 2.1 Sem implementação nenhuma

| Componente Figma | node-id | Página | Evidência |
|---|---|---|---|
| **Star Rating** | `40000033:10501` | `↳  Rating ✅` | Eixo `Rating=[0, 1, 2, 3, 4, 5]`. Não existe `wiki/data/components/star-rating.json`, nem diretório `packages/react/src/components/StarRating`, nem título `Web Components/Star Rating` em `storybook-static/index.json`. |
| **star** (átomo) | `40000570:19839` | `↳  Rating ✅` | `Type=[Defaul, Active, Hover]` (grafia `Defaul` na origem). Átomo do Star Rating — também sem código. É a única parte interna cujo componente-pai não existe no repositório. |

### 2.2 Component sets duplicados — um lado publicado, o outro não implementado

Estes não são "faltantes" no sentido estrito: existe implementação para o *irmão*, mas o node abaixo
não corresponde a nada em código.

| Componente Figma | node-id | Situação | Evidência |
|---|---|---|---|
| **Input field** | `40000266:4769` | A página `↳ Input ✅` publica **dois** campos de texto: `Input field` e `Text Input` (`40000490:39413`). O código tem um único `TextInput`. | `wiki/data/components/text-input.json` tem `figmaReferences: []` — não é possível determinar pelo repositório qual dos dois é a fonte vigente. Marcado `incerta` em `mapping.json`. |
| **Radio** | `40000570:385` | A página `↳ Radio ✅` publica `Radio` (`40000570:385`), `Radio Button` (`12:2511`) e o átomo `.Radio Control` (`40000030:4181`). | `wiki/data/components/radio.json` cita **três vezes** `12:2511` e nunca `40000570:385`. O set não implementado tem `Title` + `Description` + `Show Description` + `State=[Default, Disabled]` — formato de cartão, sem equivalente na API do `Radio` (que expõe `label` + `hint`). Marcado `incerta`. |

### 2.3 Partes internas sem componente de catálogo próprio (esperado, registrado)

22 dos 58 itens publicados são átomos, wrappers ou assets — a maioria com nome iniciado por `.` ou
`_`. Todos estão em `mapping.json → somenteFigma` com `tipo: "parte-interna"` e o pai apontado.
Nenhum deles deve virar página de catálogo na Wiki:

`. Checkbox Control` (`4:4076`) · `. Table Header Row` (`40000180:20`) · `. Table Row`
(`40000180:2`) · `.Radio Control` (`40000030:4181`) · `_Breadcrumb Parts / Link`
(`40000019:8338`) · `_Carousel Parts / Dot Control` (`40000022:1034`) · `Accordion Group`
(`40000074:5416`) · `Accordion item` (`40000074:5774`) · `Carousel Controls` (`40000022:1145`) ·
`Date picker - Cell` (`108:29292`) · `File Container` (`40000014:12545`) · `Icon Action`
(`40000447:13489`) · `Logo/Portal de serviços` (`40000595:5035`) · `Mandatory` (`40000266:5676`) ·
`Nav Item` (`40000449:538`) · `Progress Line` (`40000030:6888`) · `Range` (`40000030:6873`) ·
`star` (`40000570:19839`) · `Tab Item` (`40000032:6626`) · `Title bar` (`40000032:5473`) ·
`Upload Item` (`40000014:12619`) · `User Menu` (`40000447:15034`).

Observação: `Progress Line` (`40000030:6888`) é a única parte interna citada por **dois**
componentes do código — `progress-bar.json` e `stepper.json`.

---

## 3. Componentes em código sem componente publicado no Figma

### 3.1 Sem nenhuma contrapartida no Figma

| Slug | Storybook | Evidência |
|---|---|---|
| `back-to-top` | `Web Components/BackToTop` | `back-to-top.json`: `figmaReferences: []`; pendência declarada: *"Nenhum node-id do Figma é citado em comentários do código do BackToTop (nem no TSX nem no CSS)"*. Nenhum item de `figma-components.json` tem nome ou função equivalente. |
| `list-item` | `Web Components/ListItem` | `list-item.json`: `figmaReferences: []`; pendência: *"Nenhum node-id do Figma é citado no código do ListItem"*. |
| `meganav` | `Web Components/Meganav` | `meganav.json`: `figmaReferences: []`; pendência: *"Nenhum node-id do Figma é citado em comentários do código do componente"*. O Figma publica `Nav Item` (`40000449:538`) e `User Menu` (`40000447:15034`) na página do Header, mas não a gaveta de navegação. |
| `skeleton` | `Web Components/Skeleton` | `skeleton.json`: `figmaReferences: []`; pendência: *"Nenhum node-id do Figma é citado em comentários do código do componente"*. |
| `tabs` | `Web Components/Tabs` | `tabs.json`: `figmaReferences: []`. O Figma publica **só o átomo** `Tab Item` (`40000032:6626`) na página `↳  Tabs` — o container `Tabs` não existe como component set. É o caso inverso do `Star Rating`: aqui existe o átomo no Figma e o organismo no código. |

### 3.2 Pareados, mas sem rastreabilidade — nenhum node-id gravado no código

13 dos 33 slugs pareados **não citam nenhum node-id do Figma** no repositório. O pareamento em
`mapping.json` foi feito por nome, não por evidência interna, e por isso está marcado `provavel`:

`avatar` · `button` · `button-gov` · `cookie-consent-banner` · `data-table` · `footer` ·
`link` · `pagination` · `spinner` · `text-area` · `text-input` · `toast` · `toggle`
(+ `back-to-top`, `list-item`, `meganav`, `skeleton`, `tabs` da seção 3.1, que não têm par nenhum).

Casos mais graves porque são componentes de alto uso:

- **`button`** — `button.json` tem `figmaReferences: []`, mas o Figma publica `Button` (`4:283`)
  com 4 eixos de variante. É o componente mais consumido do sistema e o menos rastreável.
- **`toast`** — `toast.json` tem `figmaReferences: []` e a pendência *"Nenhum node-id do Figma é
  citado no código do Toast; a doc apenas informa que os tokens vieram do Figma"*, mesmo o set
  `Toast` (`40000662:11`) tendo sido **construído no Figma durante a sessão de reimplementação**
  (`wiki/data/divergencias-sessao.md`, cabeçalho).
- **`data-table`** — `data-table.json` tem `figmaReferences: []` e pendência explícita: *"Os nomes
  dos temas ('material', 'rounded', 'catppuccin', 'crisp') não correspondem a nenhuma nomenclatura
  do Figma documentada no código"*.

### 3.3 Node-ids citados no código que não existem em nenhum inventário publicado

Cinco `figmaReferences[].node` do código **não estão** nem entre os 58 componentes nem entre os
2.193 ícones publicados. São node-ids de *instância* dentro do componente, não de componente
publicado — o que quebra a rastreabilidade:

| Slug | node citado | Nome do ícone no código | node-id publicado real (`figma-icons.json`) |
|---|---|---|---|
| `accordion` | `40000056:4343` | `expand_more [outlined]` | `40000031:16385` |
| `alert` | `40000325:4827` | `error [Material Symbols]` | `40000031:15967` (`error [outlined]`) |
| `alert` | `40000325:4880` | `check_circle [Material Symbols]` | `40000031:9697` |
| `alert` | `40000325:4895` | `emergency_home [Material Symbols]` | `40000031:15593` |
| `alert` | `40000325:4910` | `cancel [Material Symbols]` | `40000031:8905` |

### 3.4 Paridade multiplataforma no Storybook

`storybook-static/index.json` publica **13** títulos `Android/*` e **13** `SwiftUI/*`, contra 38
`Web Components/*`. Os 13 são os mesmos nos dois casos: Alert, Button, Checkbox, Chip, Divider,
Link, Modal, ProgressBar, Radio, Spinner, Toast, Toggle, Tooltip.

**25 componentes Web não têm showcase nativo:** Accordion, Action Card, Avatar, BackToTop, Badge,
Breadcrumb, ButtonGov, Card, Carousel, Cookie Consent Banner, Data Table, Datepicker, Dropdown,
File Upload, Footer, Header, Hero, ListItem, Meganav, Pagination, Skeleton, Stepper, Tabs,
TextArea, TextInput.

Em `Foundations/*` existem 8 páginas (Border, Breakpoints, Color, Elevation, Grids, Overview,
Spacing, Typography). **Não há página de Motion nem de Iconografia**, embora existam tokens de
motion (quebrados — ver §6.7) e 2.193 ícones publicados.

---

## 4. Divergências de nomenclatura

### 4.1 Nome do componente (Figma × código × Storybook)

| Nome no Figma | node-id | Nome no código | Título no Storybook | Natureza da divergência |
|---|---|---|---|---|
| `Badge / Standard` | `38:1035` | `Badge` | `Web Components/Badge` | Sufixo `/ Standard` sugere família com irmãos que não existem |
| `Breadcrumbs` | `87:553` | `Breadcrumb` | `Web Components/Breadcrumb` | Plural × singular |
| `ActionCard` | `111:39682` | `ActionCard` | `Web Components/Action Card` | Figma e código sem espaço, Storybook com espaço |
| `Cookie Banner` | `40000174:675` | `CookieConsentBanner` | `Web Components/Cookie Consent Banner` | Nome completamente diferente (falta "Consent") |
| `Gov Button` | `40000436:15252` | `ButtonGov` | `Web Components/ButtonGov` | Ordem das palavras invertida |
| `File upload` | `219:7828` | `FileUpload` | `Web Components/File Upload` | Caixa do "u" divergente no Figma |
| `Progress bar` | `95:23725` | `ProgressBar` | `Web Components/ProgressBar` | Caixa do "b" divergente no Figma |
| `Switch` | `40000032:7389` | `Toggle` | `Web Components/Toggle` | **Nomes sem nenhuma relação lexical** |
| `Table` | `40000180:42` | `DataTable` | `Web Components/Data Table` | Prefixo `Data` só existe no código |
| `Text Area` | `107:7690` | `TextArea` | `Web Components/TextArea` | Espaço no Figma |
| `Text Input` | `40000490:39413` | `TextInput` | `Web Components/TextInput` | Espaço no Figma |
| `Radio Button` | `12:2511` | `Radio` | `Web Components/Radio` | Sufixo `Button` só existe no Figma; e há um segundo set chamado só `Radio` (`40000570:385`) |
| `Input field` | `40000266:4769` | *(sem nome no código)* | — | Não há componente de código com esse nome |

### 4.2 Inconsistência interna dos títulos do Storybook

Títulos multipalavra não seguem uma regra única em `storybook-static/index.json`:

- **Com espaço:** `Action Card`, `Cookie Consent Banner`, `Data Table`, `File Upload`.
- **Sem espaço (PascalCase):** `BackToTop`, `ButtonGov`, `ListItem`, `ProgressBar`, `TextArea`,
  `TextInput`.

### 4.3 Nomes dos eixos de variante (Figma × prop do código)

Não existe convenção: o mesmo conceito muda de nome em quase todo componente.

| Conceito | Nome no Figma | Nome no código | Componentes |
|---|---|---|---|
| Variante semântica/cor | `Type` | `variant` | Alert (`40000002:215`), Badge (`38:1035`), Chip (`40000114:11143`), Hero (`99:26800`), Avatar (`40000199:12660`) |
| Variante semântica/cor | `Style` | `variant` | Progress bar (`95:23725`) |
| Aparência (sólido/sutil) | `Style` | `appearance` | Badge (`38:1035`) |
| Aparência (tom da linha) | `Style` | `tone` | Divider (`219:10474`) |
| Modo de seleção | `Selection` | `mode` | Datepicker (`40000266:9165`) |
| Modo de entrada | `Type` | `mode` | File upload (`219:7828`) |
| Aparência do botão | `Style` | `variant` | Button (`4:283`) |
| Plataforma/tamanho de tela | `Size` / `Type` / `Platform` / `Mobile` | *(sem prop — resolvido por `@media`)* | Accordion, Footer, Header, Modal, Pagination, Stepper |
| Estado ligado/desligado | `Toggled=[Off, On]` | `checked` | Switch → Toggle (`40000032:7389`) |
| Estado de leitura | `Selection=Ready Only` / `State=Read Only` | `readOnly` | Checkbox (`4:4209`), Radio Button (`12:2511`), Text Input (`40000490:39413`) |

O eixo `Type` do Figma é especialmente ambíguo: em Alert/Badge/Chip é **semântica de cor**, em
Button é **forma** (`Button`/`Icon Button`), em Footer é **plataforma**, em Divider é **orientação
+ estilo**, e em Link é **estado de interação**.

### 4.4 Erros de grafia na origem (Figma)

Todos verificados em `wiki/data/figma-components.json`; todos aparecem em nomes de variante ou de
variable, ou seja, vazam para qualquer geração automática:

| Grafia no Figma | Correto | Onde | node-id |
|---|---|---|---|
| `Sucess` | `Success` | `Progress bar → Style` | `95:23725` |
| `Sucess` | `Success` | `Text Area → State` | `107:7690` |
| `Ready Only` | `Read Only` | `Checkbox → Selection` | `4:4209` |
| `DIsabled` | `Disabled` | `Date picker - Cell → State` | `108:29292` |
| `Defaul` | `Default` | `star → Type` | `40000570:19839` |
| `Type7` | *(nome real da 7ª opção)* | `Range → Type` | `40000030:6873` |
| `Arrow5`, `Arrow6`, `Arrow7`, `Arrow8` | *(nomes reais)* | `Tooltip → Arrow` | `108:35791` |

`divergencias-sessao.md` §5 já registrava `Sucess` também em **variables**, não só em variantes.

### 4.5 Nomes das páginas do Figma

Os 58 componentes estão distribuídos em **35 páginas**, todas começando com `↳ ` e a maioria
terminando com ` ✅`. Há variações que impedem parsing automático:

- **Espaço simples × duplo após a seta:** `↳ Alert ✅`, `↳ Header ✅`, `↳ Modal ✅` (simples) contra
  `↳  Breadcrumb ✅`, `↳  Card ✅`, `↳  Carousel ✅` (duplo).
- **Espaço duplo antes do check:** `↳  Text Area  ✅`.
- **Páginas sem o `✅`** (6 de 35): `↳  Spinner`, `↳  Stepper`, `↳  Switch`, `↳  Tabs`, `↳ Toast`,
  `↳  Tooltip` — sugerindo um significado de status que não está documentado em lugar nenhum.
- **Nome da página divergente do componente:** `↳  Buttons ✅` (plural) contém o set `Button`
  (singular); `↳  gov.br ✅` (minúsculas) contém `Gov Button`; `↳ Input ✅` contém `Input field`,
  `Text Input` e `Mandatory`.

---

## 5. Divergências de variantes e props

Comparação de `properties[].variantOptions` (Figma) com `variants[]` e `props[].values` dos JSONs
de `wiki/data/components/`. **34 divergências**, na ordem alfabética do código.

### 5.1 Accordion — `40000056:4236` × `accordion.json`
Figma tem `Size=[Desktop, Mobile]` e `Background=[White, Inverse]`; código tem
`background=[white, inverse]` e **nenhuma prop de tamanho** — o layout mobile é resolvido por
`@media (max-width: 640px)`. O código adiciona `allowMultiple=[true, false]` e
`AccordionItem.disabled=[true, false]`, que não existem como eixo no Figma.

### 5.2 Action Card — `111:39682` × `action-card.json`
Figma tem `State=[Default, Selected, Hover]` + `Focus:BOOLEAN`; código expressa isso como
`selected=[true, false]` mais CSS de `:hover`/`:focus-visible`. O código adiciona
`headingLevel=[2, 3, 4, 5, 6]` e `href`, sem eixo correspondente no Figma.

### 5.3 Alert — `40000002:215` × `alert.json`
Valores idênticos (`Type=[Information, Success, Warning, Error]` ↔
`variant=[information, success, warning, error]`), mas o código adiciona
`role=[alert, status, note]`, que não existe no Figma. Pendência já registrada em `alert.json`:
*"Não há prop para trocar o ícone da variante — os SVGs são fixos no Alert.tsx"*, enquanto o Figma
não expõe swap de ícone no Alert.

### 5.4 Avatar — `40000199:12660` × `avatar.json`
Figma tem **três eixos**: `Type=[Letter, Icon, Image]`, `Size=[X-Small, Small, Medium, Large,
X-Large]`, `Color=[Neutral, Brand, None]` + `Badge:BOOLEAN`.
Código tem **um**: `size=[xsmall, small, medium, large, xlarge]`.
Faltam no código: `Type` (derivado implicitamente de `src`/`initials`), `Color` e `Badge` —
pendência declarada em `avatar.json`: *"Não há prop para status/badge, nem agrupamento
(AvatarGroup) no código"*. Sobra no código: `disabled=[true, false]`, ausente do Figma.
Grafia dos tamanhos divergente: `X-Small`/`X-Large` × `xsmall`/`xlarge`.

### 5.5 Button — `4:283` × `button.json` (opções)
**Figma tem `Style=[Primary, Secondary, Tertiary, Ghost]`, código tem
`variant=[primary, secondary, tertiary]`** — a opção **`Ghost` não existe no código**.

### 5.6 Button — `4:283` × `button.json` (eixos)
Figma tem `Type=[Button, Icon Button]`; o código **não tem prop equivalente** — expõe `iconStart`
e `iconEnd`, mas nenhum modo "só ícone". Além disso, o código usa o nome `type` para outra coisa
(`type=[button, submit, reset]`, o atributo HTML) — **colisão direta de nome com o eixo `Type` do
Figma**. Sobram no código sem eixo no Figma: `fullWidth`, `ariaPressed`, `ariaExpanded`.
`Size` e `State` batem (`Large/Medium/Small` ↔ `large/medium/small`; `Loading` ↔ `isLoading`).

### 5.7 Breadcrumb — `87:553` × `breadcrumb.json`
`Breadcrumbs` é um `COMPONENT` simples (não é set) com apenas `Show First block:BOOLEAN` e
`Links:SLOT` — **não tem eixo de estado**. Todos os estados vivem no átomo
`_Breadcrumb Parts / Link` (`40000019:8338`), com `State=[Enabled, Hover, Focused Visible,
Pressed]` e `Current=[False, True]`. Pendência declarada em `breadcrumb.json`: *"O estado hover não
existe no node do Figma (só Enabled); o CSS documenta que
`--ds-component-breadcrumbs-color-text-hover` é uma aproximação"* e *"A variante mobile não existe
no Figma; o breakpoint 640px foi definido no CSS do componente, sem referência de design"*.

### 5.8 ButtonGov — `40000436:15252` × `button-gov.json`
O node do Figma é um `COMPONENT` **sem nenhuma propriedade**. O código expõe
`type=[button, submit, reset]`, `disabled`, `isLoading`, `icon`, `href`, `target`, `rel` — nenhuma
delas validável contra o design.

### 5.9 Card — `65:5556` × `card.json`
O component set do Figma **não declara nenhuma propriedade** (`properties: {}`). O código expõe
`orientation=[vertical, horizontal]`, `headingLevel=[2, 3, 4, 5, 6]`, `showDivider`, `media`,
`badge`, `action`. **Não há como validar a orientação horizontal contra o Figma.** Pendência em
`card.json`: *"O breakpoint de 640px foi definido no CSS do componente; o Figma não define variante
mobile"*.

### 5.10 Carousel — `95:19785` × `carousel.json`
Figma tem `Type=[Default, Arrows, Darker, Arrows Disabled, On Dark]` — um eixo único que **mistura
superfície do indicador (`Default`/`Darker`/`On Dark`) com presença e estado das setas
(`Arrows`/`Arrows Disabled`)**. O código separa em três: `indicatorAppearance=[default, darker,
on-dark]`, `showControls` (booleana) e `disabled` (booleana). São modelagens incompatíveis: a
combinação "Darker + setas" existe no código e não no Figma.

### 5.11 Checkbox — `4:4209` × `checkbox.json`
Figma tem `Selection=[Unchecked, Checked, Indeterminate, Ready Only]` (grafia errada) e
`State=[Hover, Focused, Enabled, Pressed, Disabled]`. O código cobre tudo
(`checked`/`indeterminate`/`readOnly`/`disabled`), mas **nenhum dos dois lados tem estado de erro**
— pendência em `checkbox.json`: *"Não há estado de erro/inválido implementado (nem classe, nem
prop), apesar de `required` existir"*.

### 5.12 Cookie Consent Banner — `40000174:675` × `cookie-consent-banner.json`
**Figma tem `Background=[White, Inverse]`, código não tem prop de fundo.**
**Código tem `position=[bottom, bottom-left, bottom-right]`, Figma não tem eixo de posição.**
Nenhum dos dois eixos existe no outro lado.

### 5.13 Datepicker — `40000266:9165` × `datepicker.json`
Figma tem `Selection=[Single, Period]`; código tem `mode=[single, range]` — mesma ideia, **valor
com nome diferente** (`Period` × `range`), já documentado em `datepicker.json`
(*"`selection` no Figma: Single (um campo) ou Period (dois campos com 'até')"*).
Código tem `state=[default, error, success]`; o component set **não tem eixo de estado** — as cores
de erro só existem no átomo `Date picker - Cell` (`108:29292`, `State=[..., Danger]`), e não há
`success` em lugar nenhum do Figma. `Background=[White, Inverse]` bate com
`background=[white, inverse]`.

### 5.14 Divider — `219:10474` × `divider.json`
Opções idênticas, eixo com nome diferente: **Figma tem `Style=[Default, Darker, Subtle]`, código
tem `tone=[default, darker, subtle]`**. `Orientation` bate. Ver também §6.5: o Figma usa **Inter**
no label do Divider, normalizado para Plus Jakarta Sans na implementação.

### 5.15 Dropdown — `108:26342` × `dropdown.json`
**Figma tem `State=[Default, Disabled, Focused, Open, Selected]`, código tem
`state=[default, error]`.** Interseção: só `default`. A opção **`error` do código não existe no
Figma**; `Disabled`, `Focused`, `Open` e `Selected` do Figma viraram comportamento no código
(`disabled`, `:focus-visible`, `defaultOpen`, `value`) e não opções da prop `state`.

### 5.16 File Upload — `219:7828` × `file-upload.json`
**Figma tem `Type=['Clique para selecionar arquivos', 'Arrastar arquivos']` — as opções de variante
são frases inteiras em português.** Código tem `mode=[button, dropzone]`. `State=[Default, Error]` ↔
`state=[default, error]` bate. Nomes de variante como frase impedem geração automática de
tipos/props.

### 5.17 Footer — `108:13943` × `footer.json`
Figma tem `Type=[Desktop, Mobile]`; o código **não tem prop de plataforma** — a mudança acontece em
`@media` abaixo de 720px. O Figma expõe 9 slots nomeados de ícone social (`Ícone Social 1..9`); o
código expõe um array `socialItems` de tamanho livre.

### 5.18 Header — `94:14266` × `header.json`
Figma tem três eixos de variante: `Type=[Web, Mobile]`, `Account=[Default, Logout, Logged in]`,
`Dropdown=[Closed, Nav Item Open, User Menu Open]`. **Nenhum deles é uma prop enumerada no código**
— viram `user` (objeto), `accountAction`, `menuOpen`, `navigationItems`. Além disso o Figma tem 5
booleanas `Hover <item>` (`Hover Blog`, `Hover Serviços Digitais`, …), que são estado, não
propriedade de API. Pendência em `header.json`: *"`--header-bar-height` usa o literal 80px porque os
tokens `navbar/size` trazem 56/48; a divergência com o Figma continua em aberto"*.

### 5.19 Hero — `99:26800` × `hero.json`
`Type=[Default, Center]` ↔ `variant=[default, center]`: opções batem, eixo com nome diferente. O
código adiciona `headingLevel=[1, 2, 3]`, sem eixo no Figma.

### 5.20 Input field — `40000266:4769` × `text-input.json`
Figma tem `State=[Default, Focused, Filled, Disabled, Focused Visible]`, `has Success=[false, true]`,
`has Error=[true, false]`, mais as booleanas `is Mandatory` e `show Disclaimer` (+ `✏️ Disclaimer`).
O código tem `state=[default, error]` — **não há `success` nem `disclaimer`**; `is Mandatory`
corresponde a `required`. Note que o eixo `has Error` tem `defaultValue` invertido em relação a
`has Success` (`true` como primeira opção).

### 5.21 Link — `219:12380` × `link.json`
**Figma tem `Type=[Default, Hover, Focused, Pressed, Visited, Disabled]` — um eixo de estado.
Código tem `variant=[default, neutral, inverse]` e `size=[small, medium, large]` — eixos de cor e
tipografia.** Fora de `default`, **nenhuma opção coincide**. O Figma não conhece `neutral`/
`inverse`; o código não tem tratamento de `:visited` (a lista de `states` em `link.json` cobre
hover, active, focus-visible e disabled, sem `visited`) e não tem eixo de tamanho no design.

### 5.22 Modal — `40000490:59311` × `modal.json`
`Size=[Small, Medium, Large, Extended]` ↔ `size=[small, medium, large, extended]`: bate. Figma tem
`Mobile=[False, True]`; o código **não tem prop mobile**. Ver §6.6: o Figma se contradiz sobre o
alinhamento do footer e sobre o tamanho do botão de fechar.

### 5.23 Pagination — `40000033:16002` × `pagination.json`
Figma tem **um único eixo**, `Platform=[Desktop, Mobile]`, sem prop equivalente no código. O código
tem 16 props de comportamento (`siblingCount`, `boundaryCount`, `showFirstLast`, `showPageSize`,
`showPageSelect`, `showRange`, `pageSizeOptions`…) — **nenhuma delas tem correspondência visual no
Figma**, então não é possível validar nenhuma configuração de paginação contra o design.

### 5.24 Progress Bar — `95:23725` × `progress-bar.json`
**Figma tem `Style=[Default, Sucess, Error, Information, Warning]` (grafia errada), código tem
`variant=[default, success, error, information, warning]`.** As opções batem 1:1 depois de corrigir
`Sucess`. O eixo `mode=[determinate, indeterminate]` do código **não existe no component set** — o
`Indeterminate` mora no átomo `Progress Line` (`40000030:6888`,
`Progress=[0%, 25%, 50%, 75%, 100%, Indeterminate]`), e a paleta de cores mora em `Range`
(`40000030:6873`, `Type=[Brand, Error, Success, Neutral, Information, Warning, Type7]`) — que tem
**7 opções**, uma a mais que o código, e a sétima se chama `Type7`.

### 5.25 Radio — `12:2511` / `40000570:385` × `radio.json`
No set implementado (`12:2511`): `Selected=[False, True]` ↔ `_checked`;
`State=[Disabled, Read Only, Hover, Focused, Pressed, Enabled]` ↔ `disabled` + `readOnly` + CSS.
Bate. No set **não** implementado (`40000570:385`): `Title` + `Description` + `Show Description` +
`Checked=[False, True]` + `State=[Default, Disabled]` — sem `readOnly`, com nomes de texto
diferentes (`Title`/`Description` × `label`/`hint`). Dois sets do mesmo componente com APIs
diferentes.

### 5.26 Spinner — `40000120:5900` × `spinner.json`
**Figma tem `%=[25, 50, 75, 99]` — o spinner é determinado. O código não tem nenhuma prop de
progresso** (`spinner.json` → `states: ["loading"]`, `oneLiner`: *"Indicador de progresso
**indeterminado**"*).
**Figma tem `Size=[Small, Medium, Big]`, código tem `size=[sm, md, lg]`** — além da abreviação,
`Big` não é `Large`.
**Código tem `variant=[brand, neutral, inverse]`; o Figma não tem eixo de cor.**

### 5.27 Stepper — `40000045:5961` × `stepper.json`
Figma tem `Steps=[3, 6, 8, 10, 12, Any]` como eixo de variante; o código recebe um array `steps` de
tamanho livre — a opção `Any` do Figma é o comportamento real do código, as outras cinco são
redundantes. Figma tem `Size=[Desktop, Mobile]` sem prop equivalente. `State=[In Progress,
Completed]` ↔ `completed=[false, true]` bate.

### 5.28 Tabs — `40000032:6626` (átomo) × `tabs.json`
Figma tem apenas o átomo `Tab Item`, com `State=[Default, Hover, Active, Disabled]`,
`Has Icon=[false, true]`, `Has Badge=[false, true]`, **`Has Close=[false, true]`**. O código tem
`variant=[standard, compact]`, `activationMode=[automatic, manual]` e `items[].icon`/`items[].badge`
— **mas nenhum suporte a fechar aba** (`Has Close` não tem nada no código), e `variant`/
`activationMode` não têm nada no Figma.

### 5.29 TextArea — `107:7690` × `text-area.json`
**Figma tem `State=[Default, Hover, Active, Disabled, Error, Sucess]`, código tem
`state=[default, error]` — falta `success`** (e o Figma grafa `Sucess`). O código adiciona
`resize=[none, vertical]`, `showCounter` e `maxLength`, sem eixo no Figma.

### 5.30 TextInput — `40000490:39413` × `text-input.json`
**Figma tem `Size=[Medium]` — uma única opção. Código tem `size=[medium, large]`**: o tamanho
`large` não existe no design.
**Figma tem `State=[Enabled, Hover, Focused, Focused Visible, Pressed, Disabled, Read Only,
Success]`, código tem `state=[default, error]`**: `Read Only` e `Success` não existem como opção da
prop; `Error` é eixo separado no Figma (`Error=[False, True]`) e valor da prop no código.
Figma tem `Prefix`, `Suffix`, `↳ Prefix Value`, `↳ Suffix Value` e `Clear Button` — **o código só
tem `iconStart`/`iconEnd`**, sem prefixo/sufixo textual nem botão de limpar. Código adiciona
`type=[email, password, search, tel, text, url]`, ausente do Figma.

### 5.31 Toast — `40000662:11` × `toast.json`
**Figma tem `Configuration=[Single line, Two lines, Longer action]` — um eixo de layout. Código tem
`variant=[brand, neutral, positive, information, notice, negative]` — um eixo de cor.** Os dois
eixos não se cruzam em nenhum ponto: **não existe cor de Toast no Figma e não existe configuração
de linhas no código**. O código adiciona `role=[alert, status]`, `autoDismiss`, `duration`,
`pauseOnHover`, `pauseOnFocus`.

### 5.32 Toggle / Switch — `40000032:7389` × `toggle.json`
**Figma tem `Size=[Medium, Small]`; o código não tem prop de tamanho.** Pendência declarada em
`toggle.json`: *"Não há variantes de tamanho ou de cor expostas por prop: o componente não possui
props enumeradas (variants vazio)"*. Figma tem `Has Label=[false, true]` e `Description:TEXT`; o
código resolve com `label` e `hint` opcionais — equivalente, mas com nome diferente
(`Description` × `hint`).

### 5.33 Tooltip — `108:35791` × `tooltip.json`
**Figma tem `Arrow=[Down, Left, Top, Right, Arrow5, Arrow6, Arrow7, Arrow8]` — 8 opções, 4 delas
sem nome real. Código tem `placement=[top, right, bottom, left]` — 4 opções** (e `Down` × `bottom`
é mais uma diferença de vocabulário).
**Figma tem `Knockout=[False, True]`; código tem `tone=[dark, light]`** — não é possível confirmar
pelo repositório que `Knockout=True` equivale a `tone=light`. Pendência em `tooltip.json`: *"O átomo
Arrow do Figma é citado por nome, mas sem node-id próprio no código"*.

### 5.34 DataTable — `40000180:42` × `data-table.json`
O node do Figma é um `COMPONENT` com `Title:TEXT` e `Row 1..Row 5:BOOLEAN` — **cinco linhas fixas,
sem eixo de tema, densidade ou zebra**.
**O código tem `theme=[default, material, rounded, catppuccin, crisp]`, `dense=[true, false]`,
`striped=[true, false]`** — nada disso existe no Figma. Pendência declarada em `data-table.json`:
*"Os nomes dos temas ('material', 'rounded', 'catppuccin', 'crisp') não correspondem a nenhuma
nomenclatura do Figma documentada no código"*; e *"O tema 'catppuccin' usa
`--ds-brand-color-utility-danger-red-200` como cor de borda; não há comentário no código explicando
essa escolha"*.

> **Únicos dois componentes sem nenhuma divergência de opção:** **Badge** (`38:1035`) — `Size`,
> `Type` e `Style` batem valor a valor com `size`, `variant` e `appearance` — e **Chip**
> (`40000114:11143`) — o `Type` de 6 opções bate com `variant` (só a ordem difere) e o
> `State=[Default, Hover, Disabled, Selected]` é coberto por `selected`/`disabled` + CSS. Nos dois
> casos o nome do **eixo** ainda diverge (§4.3), por isso não aparecem na lista acima.

---

## 6. Divergências de tokens

> Conteúdo integral de `wiki/data/divergencias-sessao.md`, reorganizado. Origem: sessão de
> reimplementação de 18 componentes do Storybook a partir dos nodes novos do Figma (Alert, Badge,
> Breadcrumb, Card, Carousel, Checkbox, Chip, Datepicker, Divider, Dropdown, File Upload, Header,
> Hero, Modal, Progress Bar, Radio, Stepper, Tooltip) + construção do Toast no Figma.
> Cada item foi observado **diretamente no node do Figma** e comparado com as collections
> exportadas para `packages/tokens/src/raw/*.tokens.json`. **Nada aqui é inferência.**
> Regra de uso na Wiki: nenhum destes itens deve ser "harmonizado" silenciosamente — **as duas
> versões devem aparecer**.

### 6.1 Variables que existem no Figma e **não** existem nas collections exportadas

| Variable no Figma | Valor observado | Onde aparece | Situação no código |
|---|---|---|---|
| `Primárias/Vermelho SP.GOV - Complementar` | `#FF161F` | Foundations (capa), Breadcrumb (ícone home), Range `Type=Brand` | Ausente. **A collection `Primárias/` inteira não foi exportada** |
| `Primárias/Branco - Secundária` | `#FFFFFF` | Foundations (capa) | Ausente (existe `color/white`, com nome diferente) |
| `sizing/badge/height-sm\|md\|lg` | 22 / 24 / 28 px | Badge | Ausente — implementado como literal |
| `sizing/chip/*` | — | Chip | Ausente — implementado como literal |
| `color/state/hover` | — | Chip, controles | Ausente |
| `color/state/pressed` | — | Chip, controles | Ausente |
| `color/state/selected` | — | Chip (borda 1.5px) | Ausente |
| `color/border/focus` | `#3366E5` | Card (focus ring) | Ausente |
| `color/border/default` | `#E0E0E0` | Stepper, Toast, cards | Ausente. Stand-in usado: `semantic/color/border/neutral/subtle` `#D4D4D4` |
| `background/button/primary` | `#C60008` | Button | Divergente (ver §6.2 e §6.3) |
| `background/button/secondary` | `#262626` | Button | Divergente (ver §6.2 e §6.3) |
| `color/indicator/*` | — | Carousel | Ausente |
| `elevation/level-1..5` | — | Toast, Dropdown, cards | Ausente (existem como **Effect Styles**, não como variables exportadas) |
| `color/typography/success` | `#1A612A` | textos de sucesso | Ausente com este valor (ver §6.2) |
| `color/typography/danger` | `#700000` | textos de erro | Ausente com este valor (ver §6.2) |
| `navbar` (altura de barra) | 80 px | Header (2 barras) | Ausente — os tokens existentes são 56/48 |

### 6.2 Mesma variable, valor diferente (collection exportada × arquivo Figma de hoje)

| Variable | Valor na collection exportada | Valor no Figma hoje | Componente onde apareceu |
|---|---|---|---|
| `color/background/warning/subtle` | `#FFF9DD` | `#FFF5C2` | Alert, Badge |
| `color/background/warning/subtle-hover` | `#FFDAA6` | `#FFDBA6` | Badge |
| `color/background/brand/primary/default` | `#C50007` | `#C60008` | Button, Card |
| `color/background/success/subtle` | `#E3F5E1` | `#E0F4E3` | Alert, Badge |
| `color/background/success/subtle-hover` | `#B2D0BB` | `#B7E2BE` | Badge |
| `color/border/danger/default` | `#C50007` | `#E52207` | Alert, inputs |
| `text-style/content-color/typography/success` | `#07622F` (green-400) | `#00883D` (green-300) | Progress Bar |
| `text-style/content-color/typography/danger` | `#B22929` (red-400) | `#E52207` (red-300) | Progress Bar |
| `tooltip/color/background` | `#292929` (soft-black) | `neutral/black` (`#000`) | Tooltip |
| `tooltip/size/max-width` | `128px` | `200px` (max) / `40px` (min) | Tooltip |

A divergência do Tooltip também está registrada como pendência dentro de
`wiki/data/components/tooltip.json`.

### 6.3 Inversão semântica

**Button** — na collection exportada, `primary` resolve para o **tom escuro** e `secondary` para o
**vermelho de marca**. No Figma atual é o **inverso**: `Primary = #C60008` (vermelho) e
`Secondary = #262626` (escuro). As composições feitas nos outros componentes usam os nomes
semânticos corretos, então se corrigem sozinhas quando o Button for redesenhado.

Relacionado (`wiki/data/achados-fase0.md` §3): o **logo oficial usa `#FF161F`**, um terceiro
vermelho, que não é nem `#C50007` (código) nem `#C60008` (Figma).

### 6.4 Valores sem variable nenhuma (literais documentados no CSS)

| Valor | Uso | Componente |
|---|---|---|
| `#2C84D0` | anel externo do focus ring duplo | Checkbox, Radio |
| `rgb(255 255 255 / 84%)` | anel interno do focus ring duplo | Checkbox, Radio |
| `#3366E5` | outline de foco | Card |
| `#E9FDF3` | fundo do estado concluído | Stepper |
| `#1E7D47` | verde do estado concluído | Stepper |
| `#181818` | botão "Recomeçar" | Stepper |
| `rgb(224 224 224 / 80%)` | borda do card concluído | Stepper |
| `12px` | radius do card | Stepper (fica **entre** `radius-md` 8 e `radius-lg` 16) |
| `11px`, `13px`, `15px` | tipografia do card | Stepper |
| `0 4px 4px rgb(0 0 0 / 12%)`, `0 2px 2px rgb(0 0 0 / 8%)` | sombra | Tooltip |
| `0 4px 4px rgb(0 0 0 / 8%)` | sombra do menu | Dropdown |
| `3px` | gap interno | Stepper, Progress Bar (next row) |
| `#034EA2` | radio selecionado | Radio (coincide com `icons/information/default`; falta token semântico de "selected") |

Literais adicionais encontrados nos JSONs dos componentes, na mesma categoria:
`80px` (altura da barra do Header — `header.json`), `496px` (largura do Toast — `toast.json`),
`44px`/`48px` (trilho e área de toque do Toggle — `toggle.json`), `32px` (ripple do Checkbox),
`50` (z-index do BackToTop), `72%` (última linha do Skeleton multiline), `#333333` (item do painel
do usuário no Header), e no Card: gap de `11px`, barra do título `4x25px`, mídia `180px`/`140px`,
`min-inline-size: 400px` e `outline 2px / offset 3px`.

### 6.5 Tipografia

- **Regra do projeto: a única fonte do Design System é Plus Jakarta Sans.** Nenhuma ocorrência de
  Rawline é aceita.
- Ocorrências de **Inter** encontradas no Figma e normalizadas para Plus Jakarta Sans na
  implementação: **label do Divider**, **itens de navegação e nome de usuário do Header**.
  (`header.json` registra: *"Os textos originais em Inter foram normalizados para Plus Jakarta Sans;
  a equivalência tipográfica com o Figma não pode ser verificada pelo código"*.)
- O Figma grafa **`Sucess`** (sem o segundo "c") em variables **e** em variantes de Progress Bar e
  Text Area. O código usa `success`. Divergência de nomenclatura **a resolver na origem** — ver
  §4.4.
- A fonte é carregada por CDN do Google Fonts em `.storybook/preview-head.html` (Plus Jakarta Sans
  300–800) e **não há nenhum arquivo de fonte no repositório** (`achados-fase0.md` §3).

### 6.6 Inconsistências internas do próprio Figma

- **Datepicker** (`40000266:9165`) — as letras do cabeçalho de semana seguem ordem iniciando na
  **segunda-feira** (S T Q Q S S D), mas as colunas destacadas em vermelho estão posicionadas como
  se a semana começasse no **domingo**. Implementado seguindo as letras e marcando sábado/domingo
  reais.
- **Modal** (`40000490:59311`) — a descrição do component set diz que o footer é alinhado à
  **direita**, mas o render do node mostra alinhamento à **esquerda**. Implementado conforme o
  render.
- **Modal** (`40000490:59311`) — botão de fechar desenhado a **32px** enquanto o token de icon
  button `md` é **40px**. Implementado com o token.
- **Header** (`94:14266`) — barras de **80px** no design contra tokens `navbar/size` de **56/48**
  (§6.1); `header.json` registra a divergência como *"em aberto"*.

### 6.7 Defeitos na origem/pipeline dos tokens (`wiki/data/achados-fase0.md` §8)

1. **24 tokens de componente sem alias.** Durações de motion e opacidades de backdrop apontam, no
   Figma, para variáveis de **spacing**, então saem como número solto e sem unidade —
   `--ds-component-tooltip-motion-duration-enter: 6`,
   `--ds-component-modal-backdrop-effect-opacity: 48`. Isso inviabiliza documentar durações reais
   de motion.
2. **Vazamento no build.** `src/normalized/t2-semantics.tokens.json` recebe uma cópia de
   `semantic.shadow.*` por compartilhamento de referência no `deepMerge` antes da escrita em disco.
   A fonte real desses 6 tokens é `web-extras.tokens.json`.
3. **Modo único chamado `Prodesp`.** A collection `T2: Semantics` tem um só modo, com esse nome.
   **Não há modo de tema alternativo (nem dark mode) em nenhuma collection.**
4. Validação cruzada positiva: **1.472 tokens no inventário × 1.472 variáveis CSS em
   `dist/css/tokens.css`, sem sobra dos dois lados.**

### 6.8 Recomendação única (do catálogo de tokens)

Re-exportar as coleções de variables do Figma em **uma única passada**, cobrindo `Global: Core`,
`T1: Sampa Design System`, `T2: Semantics`, `T3: Components` **e a coleção `Primárias/`** (hoje fora
do pipeline), corrigindo `Sucess` → `Success` e publicando as variables novas listadas em §6.1.
Enquanto isso não acontece, **a Wiki documenta os dois valores**.

---

## 7. Itens que precisam de decisão do time

Cada item tem uma pergunta objetiva. Nenhum deles pode ser resolvido lendo o repositório.

### Fonte da verdade e rastreabilidade

| # | Evidência | Pergunta |
|---|---|---|
| 1 | 13 dos 33 slugs pareados têm `figmaReferences: []` (§3.2), entre eles `button`, `toast` e `data-table` | Vamos tornar **obrigatório** gravar o node-id do Figma em cada componente (comentário no `.tsx`/`.css` ou Code Connect)? Se sim, quem preenche os 13 pendentes e até quando? |
| 2 | 5 node-ids citados no código não existem em nenhum inventário publicado; são instâncias, não componentes (§3.3) | A referência canônica de ícone passa a ser o node-id do **componente publicado** (`figma-icons.json`) em vez do node da instância? |
| 3 | `wiki/data/achados-fase0.md` §5: existem as bibliotecas paralelas `SP / Design System / Arquivo PÚBLICO` (`sp-stepper` 1.1.0, `sp-stepper-modal` 4.2.0) e `UI Kit Poupatempo SP.GOV.BR` | Qual biblioteca é **a vigente**? O que a Wiki deve dizer sobre as anteriores: descontinuadas, congeladas ou em coexistência? |

### Componentes em disputa

| # | Evidência | Pergunta |
|---|---|---|
| 4 | `Input field` (`40000266:4769`) e `Text Input` (`40000490:39413`) na mesma página `↳ Input ✅`; um único `TextInput` no código (§2.2, §5.20, §5.30) | Qual dos dois é o campo de texto oficial? O outro é despublicado ou vira um caso de uso separado? |
| 5 | `Radio` (`40000570:385`) e `Radio Button` (`12:2511`); o código só implementa `12:2511` (§2.2, §5.25) | O set `Radio` com Title/Description é um **redesenho a implementar** ou um set legado a despublicar? |
| 6 | `Star Rating` (`40000033:10501`) + átomo `star` (`40000570:19839`) sem nenhuma linha de código (§2.1) | Entra no roadmap de implementação, ou sai da biblioteca? |
| 7 | `BackToTop`, `ListItem`, `Meganav`, `Skeleton`, `Tabs` existem só em código (§3.1) | Estes cinco viram componentes do Figma (com design formal), ou são declarados **utilitários de código sem design**, com esse status visível na Wiki? |
| 8 | O Figma publica o átomo `Tab Item` (`40000032:6626`) mas não o container `Tabs` (§3.1, §5.28) | Desenhar o container `Tabs` no Figma, ou remover `Tab Item` da biblioteca por ser átomo de um componente que não existe lá? |

### Nomenclatura

| # | Evidência | Pergunta |
|---|---|---|
| 9 | 13 componentes com nome diferente entre Figma e código (§4.1), incluindo `Switch` × `Toggle` e `Table` × `DataTable` | **Qual ponta cede?** Renomeamos no Figma para bater com o código, ou renomeamos os componentes React (quebrando a API pública)? |
| 10 | Eixos `Type`/`Style`/`Selection`/`Platform` mapeando para `variant`/`appearance`/`tone`/`mode` (§4.3) | Adotamos um vocabulário único de eixos (por exemplo, sempre `variant` para semântica de cor, `size` para tamanho, `appearance` para preenchimento)? Quem aplica no Figma? |
| 11 | 7 erros de grafia na origem, incluindo `Sucess` em variables **e** variantes (§4.4, §6.5) | Corrigimos no Figma agora, aceitando que toda instância publicada muda de nome de variante? |
| 12 | Títulos do Storybook sem padrão: `Action Card` × `ProgressBar` (§4.2) | Padronizamos os títulos com espaço (`Progress Bar`, `Text Input`, `List Item`, `Back To Top`, `Button Gov`) ou sem? A mudança altera as URLs do Storybook publicado. |
| 13 | Páginas do Figma com `↳ `, espaço duplo e `✅` inconsistente (§4.5) | O `✅` significa "componente aprovado"? Se sim, qual é o status real de Spinner, Stepper, Switch, Tabs, Toast e Tooltip (páginas sem o check)? |

### Variantes e cobertura funcional

| # | Evidência | Pergunta |
|---|---|---|
| 14 | `Button`: Figma tem `Style=[Primary, Secondary, Tertiary, Ghost]`, código tem `variant=[primary, secondary, tertiary]` (§5.5) | Implementamos `ghost` ou removemos do Figma? |
| 15 | `Button`: Figma tem `Type=[Button, Icon Button]`, sem prop no código (§5.6) | O botão só-ícone é uma variante do `Button` (prop `iconOnly`) ou um componente separado (`IconButton`)? |
| 16 | `TextInput`: Figma tem `Size=[Medium]`, código tem `size=[medium, large]` (§5.30) | O tamanho `large` é oficial? Se sim, precisa ser desenhado. Se não, precisa ser removido da API. |
| 17 | `TextArea` e `Dropdown`: código não tem estado `success`; `Datepicker` tem `success` sem design (§5.13, §5.15, §5.29) | Qual é o conjunto **canônico** de estados de campo de formulário (`default`, `hover`, `focused`, `filled`, `disabled`, `read-only`, `error`, `success`)? Vale para todos os inputs? |
| 18 | `Toast`: Figma tem `Configuration=[Single line, Two lines, Longer action]`, código tem `variant` com 6 cores (§5.31) | O Toast tem variantes semânticas de cor? Se sim, precisam ser desenhadas; se não, o código perde 5 das 6 opções. |
| 19 | `Toggle`: Figma tem `Size=[Medium, Small]`, código não tem `size` (§5.32) | Implementamos o tamanho `small` do Switch ou removemos do Figma? |
| 20 | `Spinner`: Figma tem `%=[25, 50, 75, 99]` (determinado), código é sempre indeterminado (§5.26) | O Spinner deve suportar progresso determinado, ou o `%` do Figma é resíduo de outro componente (Progress Bar)? |
| 21 | `Tooltip`: Figma tem `Arrow=[…, Arrow5, Arrow6, Arrow7, Arrow8]` e `Knockout=[False, True]` (§5.33) | O que são `Arrow5..8`? `Knockout=True` equivale ao `tone: light` do código? |
| 22 | `DataTable`: temas `material`, `rounded`, `catppuccin`, `crisp` sem nenhuma origem no design (§5.34) | Estes temas fazem parte do Design System, ou são resíduo da biblioteca `react-data-table-component` e devem sair da API pública? |
| 23 | `Carousel`: Figma tem um eixo `Type` que mistura superfície e setas (§5.10) | O Figma se divide em dois eixos (`Indicator` + `Controls`), ou o código se colapsa em um `type` único? |
| 24 | `Card` (`65:5556`) e `Gov Button` (`40000436:15252`) não declaram **nenhuma** propriedade no Figma (§5.8, §5.9) | A orientação horizontal do Card e os estados do ButtonGov existem no design? Se sim, precisam virar variantes publicadas. |
| 25 | 6 componentes têm variante mobile no Figma (`Size`/`Type`/`Platform`/`Mobile`) resolvida por `@media` no código, e 4 componentes têm breakpoint definido **só no CSS**, sem referência de design (`breadcrumb.json`, `card.json`, `checkbox.json`, `alert.json`) (§5.1, §5.7, §5.9, §5.17, §5.22, §5.23) | Responsividade é **prop** ou é **breakpoint**? E qual é a lista oficial de breakpoints por componente? |
| 26 | `File upload`: opções de variante são frases em português (`'Clique para selecionar arquivos'`) (§5.16) | Renomeamos para chaves curtas (`button`/`dropzone`) no Figma para permitir geração automática de tipos? |

### Tokens

| # | Evidência | Pergunta |
|---|---|---|
| 27b | **O par semântico de aviso reprova WCAG AA.** `color/background/warning/subtle` (#FFF9DD) com `utility/warning/yellow-400` (#C38900) mede **2,88:1** — abaixo dos 4,5:1 exigidos para texto normal. Medido na auditoria da Wiki (`RELATORIO-ACESSIBILIDADE.md`). Os outros três pares passam: success 6,58:1, danger 5,43:1, information 11,01:1 | Criamos um token de texto de aviso escuro o bastante (algo como `typography/warning` em torno de #7A5600), ou escurecemos `warning-yellow-400`? Hoje qualquer produto que use Badge, Tag ou Alert de aviso na variante subtle está reprovando AA |


| # | Evidência | Pergunta |
|---|---|---|
| 27 | 11 variables com valor diferente entre Figma e collection exportada (§6.2) | Qual lado é a verdade **hoje**? Re-exportamos as collections antes da Wiki ir ao ar, ou a Wiki publica os dois valores lado a lado? |
| 28 | A collection `Primárias/` nunca foi exportada e contém o vermelho do logo (`#FF161F`) (§6.1, §6.3) | A `Primárias/` entra no pipeline de tokens? E qual é o vermelho de marca oficial: `#FF161F` (logo), `#C60008` (Figma) ou `#C50007` (código)? |
| 29 | Inversão semântica de `primary`/`secondary` no Button (§6.3) | Confirmamos `Primary = vermelho` e `Secondary = escuro` como a semântica oficial e re-exportamos? |
| 30 | 13 valores literais sem token nenhum (§6.4), incluindo dois focus rings (`#2C84D0`, `#3366E5`) | Criamos os tokens `color/border/focus`, `color/state/hover|pressed|selected` e `elevation/level-1..5`? Quem desenha? |
| 31 | 24 tokens de motion/opacidade saem sem unidade porque apontam para `spacing` no Figma (§6.7.1) | Quem corrige os aliases no Figma? Sem isso não existe página de Motion na Wiki. |
| 32 | `T2: Semantics` tem um modo único chamado `Prodesp`; não há dark mode (§6.7.3) | Dark mode está no roadmap? O nome do modo (`Prodesp`) é intencional e público? |

### Achados da construção da Wiki (2026-08-06)

Levantados ao documentar fundamentos, todos verificados diretamente em `wiki/data/tokens.json`
e nos 38 JSONs de componente.

| # | Evidência | Pergunta |
|---|---|---|
| 40 | **Não existe camada semântica de raio.** São 5 tokens primitivos e **47 tokens de componente apontando direto para o primitivo** — zero na camada semântica. Isso quebra a cadeia primitivo → semântico → componente que o próprio sistema documenta e usa nas cores | Criamos a camada semântica de raio (algo como `radius/control`, `radius/surface`, `radius/pill`), ou assumimos que raio é exceção à cadeia e documentamos isso como regra? |
| 41 | **Três larguras de borda apontam para tokens de espaçamento.** `progress/spinner/border/width/lg → spacing/4`, `/md` e `/sm → spacing/2`. Mesmo defeito de alias das durações de motion (item 31): o valor sai certo por coincidência, mas o vínculo é semanticamente errado e quebra se a escala de spacing mudar | Corrigimos os aliases no Figma para apontar para `border/width/*`? |
| 42 | **Os dois únicos tokens de dimensão máxima resolvem para o mesmo valor pelo mesmo alias.** `tooltip/size/max-width` e `select/dropdown/size/max-height` apontam ambos para `spacing/128` → 128px. O node do Tooltip no Figma especifica 200px (item 27) | O `spacing/128` está sendo usado como valor genérico de "grande"? Precisamos de tokens de dimensão (`sizing/*`) separados da escala de espaçamento? |
| 43 | **`--ds-semantic-shadow-overlay` não é consumido por nenhum dos 38 componentes.** E o `--ds-semantic-shadow-modal` só é usado pelo CookieConsentBanner — o Modal não aplica sombra nenhuma | O token de overlay deve ser removido, ou existe um componente que deveria usá-lo? O Modal deveria ter sombra? |
| 44 | **Os nomes das sombras não descrevem a ordem de profundidade.** `raised` (`0 8px 20px` a 24% + segunda camada) é visualmente mais pesada que `floating` (`0 8px 16px` a 12%), embora "floating" sugira estar mais acima | Renomeamos para uma escala explícita (`elevation/1..5`, como os Effect Styles do Figma já fazem) em vez de nomes qualitativos? |
| 45 | **A prop `hideBelow` da DataTable usa breakpoints próprios.** `sm/md/lg` valem 640/720/920 no componente, enquanto os tokens de mesmo nome valem 640/900/1200 — diferenças de 180px e 280px sob nomes idênticos | Alinhar o componente aos tokens, ou renomear a prop para não colidir com o vocabulário do sistema? |

### Correções de acessibilidade aplicadas no código (2026-08-06)

| # | Evidência | Pergunta |
|---|---|---|
| 49 | **18 tokens foram corrigidos no código para atingir WCAG AA**, em `packages/tokens/src/raw/z-acessibilidade.tokens.json`. A auditoria dos 70 pares texto/fundo da camada de componente encontrou 23 abaixo de 4,5:1; sobraram 8, todos de estado desabilitado (isentos pela WCAG 1.4.3). O detalhe de cada correção está em `CORRECOES-ACESSIBILIDADE.md`. O caso mais grave era o botão secundário com texto branco sobre cinza claro, a **1,26:1** | Quando estas 18 correções serão espelhadas no Figma? Enquanto não forem, quem projeta a partir da biblioteca segue usando valores que reprovam, e o código diverge do design de propósito |

### Achados de acessibilidade no código (2026-08-06)

Levantados ao documentar os padrões compostos, lendo o código-fonte dos componentes.
Afetam qualquer produto que use a biblioteca.

| # | Evidência | Pergunta |
|---|---|---|
| 46 | **Oito nomes acessíveis padrão estão sem acentuação.** `'Linhas por pagina'`, `'Selecionar linhas visiveis'` (DataTable), `'Paginacao'`, `'Pagina anterior'`, `'Proxima pagina'`, `'Primeira pagina'`, `'Ultima pagina'`, `'Resultados por pagina'` (Pagination), `'Card anterior'` (Carousel). São os textos que o leitor de tela pronuncia — sem acento, a síntese de voz lê errado em português. Os testes unitários também usam as versões sem acento, então o defeito está travado por asserção | Corrigimos os defaults e os testes na mesma mudança? É quebra de API para quem depende do texto exato |
| 47 | **A DataTable perde ordenação e seleção em massa no celular.** Abaixo de 640px, `.ds-data-table__head` recebe `clip: rect(0 0 0 0)`. O botão de ordenar coluna e o checkbox "selecionar linhas visíveis" moram dentro do `<thead>` (`DataTable.tsx:496`), então somem da tela — continuam alcançáveis por leitor de tela, mas ninguém que enxerga consegue usá-los no celular | O layout empilhado precisa de controles próprios de ordenação e seleção, ou essas funções são declaradas indisponíveis em telas pequenas? |
| 48 | **O popover do Datepicker não tem armadilha de foco.** Nenhum tratamento de `Tab` no componente. Com o calendário aberto, o foco escapa para o conteúdo atrás dele, o que quebra o padrão de diálogo — o Modal do sistema implementa a armadilha corretamente e serve de referência | Implementamos a armadilha de foco no Datepicker seguindo o Modal? |

### Distribuição, licença e identidade

| # | Evidência | Pergunta |
|---|---|---|
| 33 | `@government/design-system` e `@government/tokens` retornam **404** no registry npm; zero tags git; nenhum `CHANGELOG.md` (`achados-fase0.md` §1) | Qual é o comando de instalação real que a Wiki deve publicar? Vamos publicar no npm ou documentar consumo via Git? |
| 34 | 13 de 38 componentes têm teste axe (34%) (`achados-fase0.md` §7) | Qual é a meta de cobertura de acessibilidade e ela vira gate de CI? |
| 35 | 25 de 38 componentes Web não têm showcase Android nem SwiftUI (§3.4) | O sistema é multiplataforma de verdade, ou Android/SwiftUI são amostras? A Wiki deve mostrar a paridade explicitamente? |
| 36 | Licença dos ícones não declarada em lugar nenhum; 2.185 dos 2.193 são Material Symbols (`achados-fase0.md` §6) | Confirmamos Apache 2.0 e publicamos o aviso de licença? E os 8 ícones fora da convenção viram Material Symbols? |
| 37 | Não há página de Motion nem de Iconografia em `Foundations/*` (§3.4) | Estas duas páginas entram na Wiki? (Motion depende do item 31.) |
| 38 | `achados-fase0.md` §9: evidências (`Prodesp`, `UI Kit Poupatempo SP.GOV.BR`, `Fala SP`, `SP.GOV.BR`) apontam para o **Governo do Estado de São Paulo**, não a prefeitura — inferência **não usada** em nenhum texto | Qual é o nome oficial do órgão e da secretaria responsável pelo Design System? |
| 39 | O Figma não tem descrição de uso em nenhum componente exceto Stepper (`achados-fase0.md` §4) | Todo o conteúdo de "quando usar / quando não usar / anatomia / do & don't" nasce como `status: rascunho-para-validação`. Quem valida e em que prazo? |

---

## Anexo — arquivos gerados

| Arquivo | Conteúdo |
|---|---|
| `wiki/data/mapping.json` | 35 pares Figma ↔ código com node-id, URL, página, título do Storybook, confiança e justificativa; 23 itens só-Figma (22 partes internas + 1 componente); 5 itens só-código; bloco `cobertura` |
| `INCONSISTENCIAS.md` | Este relatório |

**Fontes lidas:** `wiki/data/figma-components.json` (58 componentes) ·
`wiki/data/figma-icons.json` (2.193 ícones) · `wiki/data/components/*.json` (38 arquivos) ·
`storybook-static/index.json` (306 entries) · `wiki/data/divergencias-sessao.md` ·
`wiki/data/achados-fase0.md`.
