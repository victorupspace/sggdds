# Revisão de invenção — conteúdo editorial dos componentes

Auditoria de `wiki/content/componentes/*.json` (38 arquivos) contra o JSON extraído em
`wiki/data/components/<slug>.json`. Quando o JSON extraído era ambíguo, a verificação subiu para o
código-fonte em `packages/react/src/components/`.

Objetivo: encontrar afirmação técnica falsa (invenção). Correções feitas direto nos arquivos,
sempre substituindo a afirmação falsa por uma verdadeira extraída dos dados — nunca por outra
suposição.

## Erros encontrados e corrigidos

| arquivo | campo | afirmação encontrada | por que é falsa | o que foi feito |
| --- | --- | --- | --- | --- |
| `content/componentes/modal.json` | `tamanhos` | "Abaixo de 768px todos ficam limitados a 440px **e centralizados na tela**." | `data/components/modal.json` → `responsive[]` na query `(max-width: 768px)`: "o overlay alinha ao final (`align-items: flex-end`) e perde o padding, **transformando small e medium em bottom sheet**; large e extended voltam a ficar centralizados". Só dois dos quatro tamanhos continuam centralizados. O próprio campo `responsivo` do mesmo arquivo já descrevia o comportamento correto — os dois campos se contradiziam. | Reescrito para "Abaixo de 768px todos ficam limitados a 440px: small e medium se ancoram na base da tela como folha inferior, e apenas large e extended continuam centralizados." |
| `content/componentes/tooltip.json` | `responsivo` | `null` | Violação da regra 6: `data/components/tooltip.json` → `responsive[]` tem 1 entrada (`@media (prefers-reduced-motion: reduce)` → "Remove a transicao de opacity/visibility do `.ds-tooltip__bubble`"). O campo nulo afirma, por omissão, que não há nenhuma regra condicional — e há. | Preenchido com texto derivado do `responsive[]` e das `cssCustomProperties` (`--tooltip-min-inline-size: 40px`, `--tooltip-max-inline-size: 200px`): ausência de regra por largura de tela + desligamento da transição em movimento reduzido + limites de largura do balão. |
| `content/componentes/tooltip.json` | `pendentes[1]` | "**Responsivo:** não existe nenhuma regra de tela pequena no componente — a única regra condicional é sobre redução de movimento. (…)" | O rótulo "Responsivo:" declarava o campo `responsivo` como vazio, o que deixou de ser verdade após a correção acima. O conteúdo da pendência (falta de decisão para celular, ausência de abertura por toque) continua verdadeiro e confirmado em `accessibility.notes` ("Nao ha abertura por toque/tap"). | Rótulo trocado para "Comportamento em celular:" e removida a duplicação com o campo `responsivo`; a pendência real foi mantida. |
| `content/componentes/badge.json` | `responsivo` | "A Badge é um elemento em linha que não passa de 100% da largura do contêiner. Não há mudança por tamanho de tela (…)" | Violação da regra 6: `data/components/badge.json` → `responsive[]` está vazio, e a pendência extraída diz "Nao ha nenhum @media no Badge.styles.css (…) entao 'responsive' fica vazio". O precedente do corpus é `divider.json`, que com `responsive[] == []` mantém `responsivo: null`. | Já estava corrigido no momento da escrita deste relatório (arquivo alterado por processo concorrente às 06:02): `responsivo` = `null` e pendência adicionada sobre a ausência de `@media`. Conferido e validado — a informação de truncamento não se perdeu, continua em `anatomia[2]` e `notasImplementacao[2]`. |

## Verificações executadas — resultado por regra

| # | Regra | Resultado |
| --- | --- | --- |
| 1 | Toda prop citada existe em `props[].name` | **Passa.** Varredura de todos os identificadores camelCase em todos os campos de texto dos 38 arquivos. Sinalizados e depois confirmados como legítimos: `sortAccessor` e `hideBelow` (data-table, existem em `DataTable.types.ts` e nas queries de `responsive[]`), `preventDefault` (back-to-top, em `accessibility.notes`), `onChange` (radio, é `RadioGroup.onChange`), `htmlFor`/`readOnly` (text-input/text-area, citados como atributo DOM e como estado ausente — ambos corretos), `ref` (chip/datepicker, citados em afirmações negativas corretas), `rel` (meganav, comportamento confirmado em `accessibility.notes`). |
| 2 | Toda variante/valor citado existe em `variants[].values` ou `props[].values` | **Passa.** Varredura com vocabulário global de valores; todos os alertas eram palavras portuguesas homógrafas (`manual`, `horizontal`, `vertical`, `neutral`, `default`, `subtle`) ou referências cruzadas legítimas (modal citando `secondary`/`tertiary` do Button — confirmado em `docsDescription`: "ação primária = secondary, dispensar = tertiary, como na documentação do Figma"). |
| 3 | Todo slug em `combinacoes` existe | **Passa.** 134 referências, todas resolvem para `data/components/<slug>.json`. As relações de composição também foram conferidas no código: DataTable importa e usa `<Button>` para ordenar/expandir; Datepicker usa `<Button>` no rodapé; FileUpload usa `variant="secondary"`; Header usa `<Avatar>`. |
| 4 | Componente em `quandoNaoUsar[].alternativa` existe no catálogo | **Passa.** 147 referências, todas existem. Ver observação abaixo sobre formato. |
| 5 | `tamanhos` não-nulo apenas com prop `size` | **Passa.** Espelhamento exato nos 38 arquivos: 7 com `size` e `tamanhos` preenchido (avatar, badge, button, link, modal, spinner, text-input), 31 sem `size` e com `tamanhos: null`. |
| 6 | `responsivo` não-nulo apenas com `responsive[]` não vazio | **2 violações**, ambas na tabela acima (badge, tooltip). Os outros 36 espelham corretamente. |
| 7 | `anatomia` corresponde a `cssClasses`/`slots` reais | **Passa.** As 219 partes anatômicas dos 38 componentes têm classe BEM ou slot correspondente. Único caso sem classe própria: "Seta" do tooltip — confirmado no CSS como pseudo-elemento `.ds-tooltip__bubble::before` com tokens `--tooltip-arrow-width/height`, portanto é parte real. |
| 8 | `status` = `em-revisao` | **Passa.** 38/38. |
| 9 | `categoria` entre as 5 permitidas | **Passa.** Conteúdo 11, Feedback 8, Formulários 8, Navegação 7, Ações 4. |
| 10 | Números (px, ms, quantidade) presentes no JSON extraído | **Passa.** Todos os valores dimensionais rastreados até `cssCustomProperties`, `responsive[]` ou `docsDescription`. Amostra conferida: modal 440/600/960/1200; badge 22/24/28 e ícone 14; button-gov 250×48; checkbox e radio 24; action-card 56; chip 16; breadcrumb 330→160; list-item 22→18 e 14; toggle 44→48, trilho 44×24→40×22, thumb 18→16; footer toggle 48; header barras 80; stepper 480 e raio 12; spinner 800→1600ms; toast 5000ms; progress-bar 1200→2400ms; skeleton 1400/1600→2800ms; back-to-top z-index 50; tooltip 40/200 e divergência do token de 128px. |

### Afirmações verificadas contra a fonte, sem erro

- **Testes de acessibilidade:** as 30 afirmações sobre existência de `*.a11y.test.tsx` batem 1:1 com `tests.a11yFile`. Toggle "quatro cenários" = `a11yCount: 4`; carousel "cobre apenas a composição básica com três cards" = `a11yCount: 1`.
- **Defaults:** todas as afirmações com "padrão"/"por padrão" batem com `props[].default` (badge `size: 'small'`, spinner `size: 'md'` e `centered: true`, text-input `size: 'medium'`, toast `duration: 5000` lido como "5 segundos", back-to-top `threshold: 320`, pagination, footer, header etc.).
- **Comportamentos negativos** ("não existe X", "não há Y"): nenhum contradiz `props[]`. O único caso que citava prop existente — accordion `notasImplementacao[1]` "Não existe modo controlado: o componente aceita apenas `defaultExpanded`" — está correto, não há par `expanded`/`onChange`.
- **Badge `notasImplementacao[1]`** ("Informar a prop `icon` exibe o ícone mesmo com `showIcon` em false") confirmado no fonte: `const iconContent = icon ?? (showIcon ? <PercentIcon /> : null)`.
- **Toast `anatomia[4]`** ("A partir do terceiro, os itens são simplesmente ignorados") confirmado: `actions.slice(0, 2)`.
- **Progress-bar `errosComuns[3]`** ("Nessas duas variantes só a cor do preenchimento muda") confirmado: `information` e `warning` só sobrescrevem `--progress-bar-range-color`, enquanto `success` e `error` também trocam label e helper.
- **Carousel `dosDonts[1]`** ("Os pontos padrão são cinza-escuro") confirmado: `--carousel-indicator-color: #4d4d4d`.
- **Carousel `responsivo`/`notasImplementacao[3]`** (redução automática de `visibleItems`) confirmado na `docsDescription`.
- **Hero `pendentes[1]`** (proporção 16:9 ou 4:3 registrada no Figma) confirmado na `docsDescription`.
- **Contagens de caracteres** em `conteudoEEscrita` (60, 90, 50, 20, 30 caracteres) não aparecem no JSON extraído, mas são orientação editorial explícita, não descrição do componente — mantidas.

### Observação fora do escopo de invenção

O campo `quandoNaoUsar[].alternativa` é renderizado como texto literal em
`src/app/componentes/[slug]/page.tsx:90` ("Em vez disso, use {item.alternativa}."). O corpus mistura
três formatos: nome de exibição (13 ocorrências, ex.: "Data Table"), PascalCase do export
(72 ocorrências, ex.: "TextInput", "FileUpload", "ProgressBar") e slug (62 ocorrências em 16
arquivos, ex.: "data-table", "list-item", "progress-bar"). Todos os componentes citados existem, então
a regra 4 passa — mas as formas em slug e PascalCase saem na tela como "Em vez disso, use
data-table." Não corrigido aqui por não ser afirmação técnica falsa; fica registrado para o time
decidir o formato canônico.

### Nota de concorrência

Durante esta revisão, `badge.json` (06:02) e `button-gov.json` (06:01) foram alterados por outro
processo. As correções acima foram aplicadas com substituição pontual (não sobrescrita de arquivo) e
todas as regras foram reexecutadas contra o estado final: nenhuma violação restante nas 10
verificações.
