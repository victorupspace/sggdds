# Catálogo de divergências levantado na reconstrução dos componentes

Origem: sessão de reimplementação de 18 componentes do Storybook a partir dos nodes novos do
Figma (Alert, Badge, Breadcrumb, Card, Carousel, Checkbox, Chip, Datepicker, Divider, Dropdown,
File Upload, Header, Hero, Modal, Progress Bar, Radio, Stepper, Tooltip) + construção do Toast
no Figma.

Cada item foi observado diretamente no node do Figma e comparado com as collections exportadas
para `packages/tokens/src/raw/*.tokens.json`. **Nada aqui é inferência**: são valores lidos do
Figma via MCP e valores lidos do arquivo de tokens do repositório.

> Uso na Wiki: alimenta `INCONSISTENCIAS.md`. Nenhum destes itens deve ser "harmonizado"
> silenciosamente na documentação — as duas versões devem aparecer.

---

## 1. Variables presentes no Figma e ausentes nas collections exportadas

| Variable no Figma | Valor observado | Onde aparece | Situação no código |
|---|---|---|---|
| `Primárias/Vermelho SP.GOV - Complementar` | `#FF161F` | Foundations (capa), Breadcrumb (ícone home), Range `Type=Brand`, logo oficial | **Corrigido em 2026-08-05:** *está* exportado, como `color/brand/red` → `--ds-brand-color-brand-red`. O problema real é outro (ver §1.1) |
| `Primárias/Branco - Secundária` | `#FFFFFF` | Foundations (capa) | Ausente (existe `color/white`, nome diferente) |
| `sizing/badge/height-sm|md|lg` | 22 / 24 / 28 px | Badge | Ausente — implementado como literal |
| `sizing/chip/*` | — | Chip | Ausente — implementado como literal |
| `color/state/hover` | — | Chip, controles | Ausente |
| `color/state/pressed` | — | Chip, controles | Ausente |
| `color/state/selected` | — | Chip (borda 1.5px) | Ausente |
| `color/border/focus` | `#3366E5` | Card (focus ring) | **Corrigido em 2026-08-05:** não é ausência de token. Existe o grupo canônico `--ds-component-focus-ring-color-ring` (#2554ed), `-effect-width` (2px), `-effect-offset` (2px), `-border-radius` (8px). O defeito é o Card cravar `#3366e5` ignorando o token |
| `color/border/default` | `#E0E0E0` | Stepper, Toast, cards | Ausente. Stand-in usado: `semantic/color/border/neutral/subtle` `#D4D4D4` |
| `background/button/primary` | `#C60008` | Button | Divergente (ver §2) |
| `background/button/secondary` | `#262626` | Button | Divergente (ver §2) |
| `color/indicator/*` | — | Carousel | Ausente |
| `elevation/level-1..5` | — | Toast, Dropdown, cards | Ausente (efeitos existem como estilos, não como variables exportadas) |
| `color/typography/success` | `#1A612A` | textos de sucesso | Ausente com este valor (ver §2) |
| `color/typography/danger` | `#700000` | textos de erro | Ausente com este valor (ver §2) |
| `navbar` (altura de barra) | 80 px | Header (2 barras) | Ausente — tokens existentes são 56/48 |

## 2. Mesma variable, valor diferente (collection exportada × arquivo Figma atual)

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

## 3. Inversão semântica

- **Button**: na collection exportada `primary` resolve para o tom escuro e `secondary` para o
  vermelho de marca. No Figma atual é o inverso: `Primary = #C60008` (vermelho) e
  `Secondary = #262626` (escuro). As composições feitas nos outros componentes usam os nomes
  semânticos corretos, então se corrigem sozinhas quando o Button for redesenhado.

## 4. Valores sem variable nenhuma (literais documentados no CSS)

| Valor | Uso | Componente |
|---|---|---|
| `#2C84D0` | anel externo do focus ring duplo | Checkbox, Radio |
| `rgb(255 255 255 / 84%)` | anel interno do focus ring duplo | Checkbox, Radio |
| `#3366E5` | outline de foco | Card |
| `#E9FDF3` | fundo do estado concluído | Stepper |
| `#1E7D47` | verde do estado concluído | Stepper |
| `#181818` | botão "Recomeçar" | Stepper |
| `rgb(224 224 224 / 80%)` | borda do card concluído | Stepper |
| `12px` | radius do card | Stepper (entre `radius-md` 8 e `radius-lg` 16) |
| `11px`, `13px`, `15px` | tipografia do card | Stepper |
| `0 4px 4px rgb(0 0 0 / 12%)`, `0 2px 2px rgb(0 0 0 / 8%)` | sombra | Tooltip |
| `0 4px 4px rgb(0 0 0 / 8%)` | sombra do menu | Dropdown |
| `3px` | gap interno | Stepper, Progress Bar (next row) |
| `#034EA2` | radio selecionado | Radio (coincide com `icons/information/default`; falta token semântico de "selected") |

## 5. Tipografia

- Regra do projeto: **a única fonte do Design System é Plus Jakarta Sans**. Nenhuma ocorrência de
  Rawline é aceita.
- Ocorrências de **Inter** encontradas no Figma e normalizadas para Plus Jakarta Sans na
  implementação: label do **Divider**, itens de navegação e nome de usuário do **Header**.
- O Figma grafa `Sucess` (sem o segundo "c") em variables e variantes de Progress Bar e Text Area.
  O código usa `success`. Divergência de nomenclatura a resolver na origem.

## 6. Inconsistências internas do próprio Figma

- **Datepicker**: as letras do cabeçalho de semana seguem ordem iniciando na segunda-feira
  (S T Q Q S S D), mas as colunas destacadas em vermelho estão posicionadas como se a semana
  começasse no domingo. Implementado seguindo as letras e marcando sábado/domingo reais.
- **Modal**: a descrição do component set diz que o footer é alinhado à direita, mas o render do
  node mostra alinhamento à esquerda. Implementado conforme o render.
- **Modal**: botão de fechar desenhado a 32px enquanto o token de icon button `md` é 40px.
  Implementado com o token.

## 7. Recomendação única

Re-exportar as coleções de variables do Figma em uma única passada, cobrindo:
`Global: Core`, `T1: Sampa Design System`, `T2: Semantics`, `T3: Components` **e a coleção
"Primárias/"** (hoje fora do pipeline), corrigindo `Sucess` → `Success` e publicando as variables
novas listadas em §1. Enquanto isso não acontece, a Wiki documenta os dois valores.
