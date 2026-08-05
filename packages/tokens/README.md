# @government/tokens

Design tokens do Design System SGGD, gerados via Style Dictionary a partir das
collections de variáveis do Figma.

## Tiers

Os tokens seguem quatro camadas, espelhando as collections do Figma:

| Tier        | Collection no Figma     | Prefixo CSS        | Conteúdo                                   |
| ----------- | ----------------------- | ------------------ | ------------------------------------------ |
| `primitive` | Global: Core            | `--ds-primitive-*` | Escalas brutas: cor, spacing, tipografia…  |
| `brand`     | T1: Sampa Design System | `--ds-brand-*`     | Paletas de marca/identidade/utilitárias    |
| `semantic`  | T2: Semantics           | `--ds-semantic-*`  | Papéis de cor e estilos de texto           |
| `component` | T3: Components          | `--ds-component-*` | Decisões por componente (button, input, …) |

As referências entre tiers são preservadas no CSS gerado
(`--ds-component-… : var(--ds-semantic-…)`), permitindo theming futuro sem
tocar nos componentes.

## Uso

```css
@import '@government/tokens/tokens.css';
```

```ts
import tokens from '@government/tokens/tokens.json';
```

Subpaths adicionais: `@government/tokens/raw/*` (exports do Figma) e
`@government/tokens/normalized/*` (DTCG normalizado por collection).

## Atualizando a partir do Figma

Exporte a collection no Figma, substitua o arquivo correspondente em
`src/raw/` (ver `src/raw/README.md`) e rode `pnpm tokens:build` na raiz do
monorepo.
