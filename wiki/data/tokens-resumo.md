# Design Tokens do Sampa Design System — resumo

Documento companheiro de `wiki/data/tokens.json`. Todos os números aqui saíram
do mesmo parsing, feito sobre `packages/tokens/`.

## Números gerais

| Métrica                                        | Valor     |
| ---------------------------------------------- | --------- |
| Tokens no inventário                           | **1.472** |
| Variáveis `--ds-*` em `dist/css/tokens.css`    | **1.472** |
| Diferença                                      | **0**     |
| Tokens que são alias de outro token            | 1.284 (87%) |
| Aliases não resolvidos                         | 0         |
| Coleções de origem                             | 5         |
| Grupos de componente (`--ds-component-*`)      | 50        |

A conferência é 1:1: cada token do inventário tem exatamente uma declaração
`--ds-…:` no CSS construído, e cada declaração do CSS tem exatamente um token de
origem. Nenhum dos dois lados sobra (`meta.verificacao` registra isso).

### Tipos

| Tipo         | Tokens | Onde aparece                                              |
| ------------ | -----: | --------------------------------------------------------- |
| `color`      |    750 | todas as camadas                                          |
| `dimension`  |    644 | primitivo e componente (px)                               |
| `fontWeight` |     42 | primitivo, marca, componente                              |
| `number`     |     24 | só componente — durações de motion e opacidade de backdrop |
| `fontFamily` |      6 | primitivo, marca, componente                              |
| `string`     |      6 | as sombras de `web-extras`                                |

## As cinco camadas

Cada arquivo em `src/raw/` é o export de uma collection de variáveis do Figma.
O nome do arquivo determina a camada (o "tier"), que vira o primeiro segmento de
todo nome gerado.

| Arquivo                     | Collection no Figma       | Camada       | Prefixo CSS          | Tokens | Modo Figma |
| --------------------------- | ------------------------- | ------------ | -------------------- | -----: | ---------- |
| `global-core.tokens.json`   | `Global: Core`            | `primitivo`  | `--ds-primitive-*`   |    114 | Mode 1     |
| `t1-sampa.tokens.json`      | `T1: Sampa Design System` | `marca`      | `--ds-brand-*`       |     44 | Mode 1     |
| `t2-semantics.tokens.json`  | `T2: Semantics`           | `semantico`  | `--ds-semantic-*`    |    116 | Prodesp    |
| `t3-components.tokens.json` | `T3: Components`          | `componente` | `--ds-component-*`   |  1.192 | Mode 1     |
| `web-extras.tokens.json`    | — (mantido no código)     | `extra`      | `--ds-semantic-shadow-*` | 6 | —          |

Nenhuma collection tem mais de um modo hoje. Não existe tema claro/escuro nem
multimarca no arquivo: `T2: Semantics` tem um único modo chamado `Prodesp`, que
é o ponto natural para pendurar temas no futuro.

`web-extras.tokens.json` é a única fonte que não existe no Figma. Ela vive no
código, guarda apenas as 6 sombras e é emitida sob o tier `semantic`. Por isso o
inventário a marca como camada `extra` mesmo com prefixo `--ds-semantic-`.

### Como as camadas se referenciam

O encadeamento de alias é o que dá valor à arquitetura. Contagem real:

- `componente` → `primitivo`: 590
- `componente` → `semantico`: 574
- `componente` → `marca`: 4
- `semantico` → `marca`: 78
- `semantico` → `primitivo`: 38
- `primitivo`, `marca` e `extra`: 0 aliases (são todos valores literais)

Ou seja: **100% da camada semântica** (116/116) e **98% da camada de componente**
(1.168/1.192) são alias. Os 24 restantes estão descritos em "Pontos de atenção".

No CSS isso vira `var()` encadeado, então trocar um primitivo propaga sozinho:

```css
--ds-brand-color-brand-red-primary: #c50007;
--ds-semantic-color-background-brand-primary-default: var(--ds-brand-color-brand-red-primary);
--ds-component-button-color-background-primary-default: var(--ds-semantic-color-background-brand-primary-default);
```

## Como funciona o naming

O caminho do token no JSON do Figma vira o nome da variável CSS. A transformação
está em `packages/tokens/scripts/transform-tokens.ts` (normalização) e no
`name/kebab` do Style Dictionary (`style-dictionary.config.ts`, prefixo `ds`).

Regra geral:

```
--ds-<camada>-<grupo>-<subgrupo…>-<token>
```

Exemplo completo, do Figma até o CSS:

| Etapa                    | Valor                                                        |
| ------------------------ | ------------------------------------------------------------ |
| Caminho no export bruto  | `color/background/brand/primary/$root`                        |
| Collection               | `T2: Semantics` → tier `semantic`                             |
| Caminho normalizado      | `semantic.color.background.brand.primary.default`             |
| Variável CSS             | `--ds-semantic-color-background-brand-primary-default`        |
| Valor bruto              | `{brand.color.brand.red-primary}`                             |
| Valor resolvido          | `#c50007`                                                     |

O que o build faz com cada segmento:

1. **Tier na frente.** O arquivo de origem injeta `primitive` / `brand` /
   `semantic` / `component` como primeiro segmento.
2. **kebab-case.** `SemiBold` → `semi-bold`, `Component sizing` →
   `component-sizing`, `text style` → `text-style`. Sequências como `2xl` e
   `grey-50` ficam intactas.
3. **`$root` vira `default`.** O Figma exporta o valor base de um grupo com
   estados como `$root`; o DTCG não aceita nó que é grupo e token ao mesmo
   tempo, então ele é promovido a `default` ao lado de `hover`, `active`,
   `disabled`. **107 tokens** vêm desse caminho.
4. **Correção de typo.** `sucess` → `success` (ex.
   `color/utility/sucess/green-300` → `--ds-brand-color-utility-success-green-300`).
   O `figmaPath` do inventário preserva a grafia original para rastreio.
5. **`%` é descartado** dos nomes.

E com cada valor:

- **Cor.** O objeto do Figma (`components` + `alpha` + `hex`) vira `#rrggbb`
  quando opaco e `rgba(r, g, b, a)` quando tem transparência.
- **Número com escopo de layout** (`CORNER_RADIUS`, `GAP`, `FONT_SIZE`,
  `LINE_HEIGHT`, `WIDTH_HEIGHT`, `STROKE_FLOAT`, `LETTER_SPACING`) vira
  `dimension` em px. Zero sai sem unidade (`0`, não `0px`).
- **`fontFamily`.** Política de tipografia única: Plus Jakarta Sans é a única
  família do Design System, e qualquer valor divergente vindo do Figma é
  normalizado (com aviso no build e original guardado em
  `sggd.figmaOriginalValue`).
- **`fontWeight`.** `Regular` → `400`, `SemiBold` → `600`, etc.
- **`com.figma.aliasData`** vira referência DTCG `{tier.grupo.token}`, que o
  Style Dictionary transforma em `var(--ds-…)`.

### Campos do `tokens.json`

- `valorBruto` — o `$value` de `src/normalized`, já com cor convertida e alias em
  forma DTCG (`{a.b.c}`).
- `valorResolvido` — o literal final depois de seguir toda a cadeia de `var()`
  em `dist/css/tokens.css`. É o valor que o navegador computa de fato.
- `aliasDe` — a `cssVar` referenciada, conferida contra o `var()` emitido no CSS.
- `figmaPath` — o caminho original no JSON do Figma, sem o tier, com a grafia
  original (incluindo `$root` e `sucess`).

> `dist/json/tokens.json` usa outro formato para cor com alpha (hex de 8
> dígitos, ex. `#18181805`). A wiki segue o CSS, que é o que a UI web consome.

## Grupos por camada

### Primitivo — 114 tokens

Escala crua, sem semântica. Nenhum alias.

| Grupo         | Tokens | Conteúdo                                                                |
| ------------- | -----: | ----------------------------------------------------------------------- |
| `typography`  |     58 | 22 font-size (10–64px), 25 line-height, 6 font-weight, 4 letter-spacing, 1 font-family |
| `color`       |     24 | 10 cinzas (`grey-50`…`grey-900`), 11 `neutral-alpha-*` (2%–96%), preto puro, preto suave, branco |
| `spacing`     |     19 | 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 128px |
| `border`      |      9 | 5 raios (`none`, `sm` 4, `md` 8, `lg` 16, `full` 999px) + 4 espessuras (`none`, `sm` 1, `md` 2, `lg` 4px) |
| `breakpoints` |      4 | `bp-xs` 0, `bp-sm` 640, `bp-md` 900, `bp-lg` 1200px                      |

### Marca — 44 tokens

A identidade visual da Prefeitura. Nenhum alias.

| Grupo        | Tokens | Conteúdo                                                                 |
| ------------ | -----: | ------------------------------------------------------------------------ |
| `color`      |     36 | `brand/*` (7, incluindo `red-primary` = `#c50007`), `identity/*` (11 azuis, verdes, amarelo), `utility/*` (18 rampas de danger, warning, success, info) |
| `typography` |      8 | 1 font-family + 7 font-weight                                             |

### Semântico — 116 tokens

Papéis de UI, agnósticos de componente. Todos são alias (78 para marca, 38 para
primitivo).

| Grupo        | Tokens | Conteúdo                                                     |
| ------------ | -----: | ------------------------------------------------------------ |
| `color`      |    101 | `background` (41), `border` (31), `icons` (26), `text` (3)    |
| `text-style` |     15 | cores de tipografia (`brand`, `danger`, `link`, `inverse`, `on-brand`, `disabled`…) |

### Extra — 6 tokens

`shadow`: `floating`, `modal`, `overlay`, `popover`, `raised`, `switch-thumb`.
São strings CSS completas (ex.
`0 20px 40px rgba(24, 24, 24, 0.24), 0 4px 12px rgba(24, 24, 24, 0.12)`), a
única camada que não vem do Figma.

### Componente — 1.192 tokens

81% de todo o inventário. Cada grupo é um componente (ou um utilitário
compartilhado) e dentro dele repetem-se os mesmos eixos: `color/background`,
`color/border`, `color/text`, `color/icon`, `size`, `spacing`, `border`,
`typography`, `motion` — cruzados com estados (`default`, `hover`, `active`,
`focus-visible`, `disabled`, `loading`) e variantes (`primary`, `secondary`,
`tertiary`, `danger`, tamanhos `sm`/`md`/`lg`).

## Prefixos de componente (`--ds-component-*`)

São 50 grupos. Nem todos têm componente implementado em código — a collection do
Figma vai à frente.

| Prefixo                         | Tokens | Prefixo                          | Tokens |
| ------------------------------- | -----: | -------------------------------- | -----: |
| `--ds-component-button-*`       |    109 | `--ds-component-banner-*`        |     21 |
| `--ds-component-select-*`       |     76 | `--ds-component-component-sizing-*` | 19  |
| `--ds-component-input-*`        |     68 | `--ds-component-stepper-*`       |     17 |
| `--ds-component-badge-*`        |     49 | `--ds-component-tooltip-*`       |     17 |
| `--ds-component-table-*`        |     48 | `--ds-component-font-size-*`     |     16 |
| `--ds-component-tag-*`          |     46 | `--ds-component-pagination-*`    |     16 |
| `--ds-component-textarea-*`     |     46 | `--ds-component-bottom-nav-*`    |     12 |
| `--ds-component-alert-*`        |     43 | `--ds-component-breadcrumbs-*`   |     11 |
| `--ds-component-avatar-*`       |     39 | `--ds-component-carousel-*`      |     11 |
| `--ds-component-checkbox-*`     |     35 | `--ds-component-inline-message-*`|     11 |
| `--ds-component-date-picker-*`  |     33 | `--ds-component-background-*`    |      8 |
| `--ds-component-radio-*`        |     33 | `--ds-component-cookie-banner-*` |      8 |
| `--ds-component-slider-*`       |     31 | `--ds-component-empty-state-*`   |      8 |
| `--ds-component-modal-*`        |     29 | `--ds-component-divider-*`       |      7 |
| `--ds-component-drawer-*`       |     28 | `--ds-component-rating-*`        |      7 |
| `--ds-component-icon-button-*`  |     28 | `--ds-component-grid-*`          |      6 |
| `--ds-component-file-upload-*`  |     26 | `--ds-component-link-*`          |      6 |
| `--ds-component-switch-*`       |     26 | `--ds-component-footer-*`        |      5 |
| `--ds-component-card-*`         |     25 | `--ds-component-navbar-*`        |      5 |
| `--ds-component-search-field-*` |     25 | `--ds-component-toolbar-*`       |      5 |
| `--ds-component-toast-*`        |     25 | `--ds-component-button-group-*`  |      4 |
| `--ds-component-toggle-button-*`|     25 | `--ds-component-focus-ring-*`    |      4 |
| `--ds-component-password-field-*`|    23 | `--ds-component-splitter-*`      |      4 |
| `--ds-component-progress-*`     |     22 | `--ds-component-stack-*`         |      3 |
| `--ds-component-accordion-*`    |     21 | `--ds-component-form-field-*`    |      2 |

Seis deles não são componentes, mas utilitários compartilhados:
`component-sizing` (19 tokens, a escala de tamanho reexportada),
`font-size` (16), `background` (8), `grid` (6), `focus-ring` (4) e `stack` (3).

## Pontos de atenção

Coisas que o parsing encontrou e que valem correção na origem (Figma), não no
código:

1. **24 tokens de componente não viraram alias** por incompatibilidade de tipo
   (`sggd.aliasNotLinked`). São todas as durações de motion e as opacidades de
   backdrop, que no Figma apontam para variáveis de **spacing**. O resultado é
   um número solto sem unidade e com valor sem sentido para o domínio:
   `--ds-component-tooltip-motion-duration-enter: 6`,
   `--ds-component-modal-backdrop-effect-opacity: 48`. O correto seria uma
   escala própria de duração (ms) e de opacidade (0–1).
2. **Os font-weight de marca têm nome que não bate com o valor.**
   `--ds-brand-typography-font-weight-100` vale `300`,
   `--ds-brand-typography-font-weight-800` vale `700`,
   `--ds-brand-typography-font-weight-50` vale `100`. Quem lê o nome erra.
   Os primitivos (`--ds-primitive-typography-font-weight-*`) estão corretos.
3. **Typo `sucess` ainda vive no Figma** em `color/utility/sucess/*`. O build
   corrige para `success` no CSS, mas a variável na origem continua errada.
4. **`src/normalized/t2-semantics.tokens.json` contém uma cópia de
   `semantic.shadow.*`** que vazou do `deepMerge` do build (as árvores
   compartilham referência antes de serem escritas em disco). O CSS final não
   duplica nada, mas o arquivo normalizado dá a impressão de que as sombras vêm
   do Figma. O inventário atribui esses 6 tokens ao `web-extras.tokens.json`,
   que é a fonte real segundo `src/raw`.
5. **Não há tokens semânticos de spacing, radius ou tipografia.** A camada
   semântica é 100% cor. Componentes pulam direto do primitivo para o próprio
   token (590 aliases `componente → primitivo`), o que dificulta mudar densidade
   ou arredondamento no sistema inteiro sem tocar em cada componente.

## Como regerar

O inventário é derivado — não edite `tokens.json` à mão. Ele sai de:

- `packages/tokens/src/raw/*.tokens.json` (dono do token e caminho original)
- `packages/tokens/src/normalized/*.tokens.json` (tipo, valor, alias DTCG)
- `packages/tokens/dist/css/tokens.css` (valor final resolvido)
- `packages/tokens/dist/json/tokens.json` (conferência cruzada)

Quando as collections do Figma forem reexportadas, rode `pnpm tokens:build` na
raiz e depois regere este inventário.
