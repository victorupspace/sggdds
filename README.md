# Government Design System

Fundacao tecnica de Design System para React, Storybook e design tokens multiplataforma. Esta etapa nao implementa componentes visuais finais; ela prepara o repositorio para receber componentes web responsivos a partir de especificacoes aprovadas no Figma.

## Stack

- React 19
- TypeScript strict
- Vite em modo biblioteca
- Storybook React + Vite
- Style Dictionary
- ESLint flat config
- Prettier
- Vitest, Testing Library e jsdom
- Playwright preparado para testes visuais/e2e futuros
- pnpm

## Instalar

```bash
corepack prepare pnpm@10.24.0 --activate
pnpm install
```

## Rodar

```bash
pnpm storybook
pnpm build-storybook
pnpm build
pnpm test
pnpm lint
pnpm typecheck
```

## Tokens

Validar tokens:

```bash
pnpm tokens:validate
```

Compilar tokens:

```bash
pnpm tokens:build
```

O pipeline espera arquivos `*.tokens.json` em `src/foundations/tokens/raw`. A validacao exige JSON valido e tokens com `$value` e `$type`. Exports com categorias de Core tokens no topo, como `color`, `spacing`, `border`, `breakpoints` e `typography`, sao aceitos e normalizados como `primitive`.

## Importar tokens do Figma

1. Exporte Figma Variables em JSON.
2. Salve o arquivo em `src/foundations/tokens/raw` com sufixo `.tokens.json`.
3. Separe a estrutura em `primitive`, `semantic` e `component` quando aplicavel. Core tokens exportados por categoria tambem sao aceitos.
4. Execute `pnpm tokens:validate`.
5. Execute `pnpm tokens:build`.
6. Revise `src/foundations/tokens/normalized`, `src/foundations/tokens/build` e `src/foundations/tokens/css`.

Nao inclua tokens reais confidenciais, chaves, dados sensiveis ou exports privados desnecessarios.

## Estrutura

```text
design-system/
  .storybook/                  Configuracao do Storybook
  docs/                        Paginas de documentacao do Design System
  scripts/tokens/              Validacao e transformacao de tokens
  src/
    foundations/               Fundamentos e tokens
    components/                Componentes futuros
    utilities/                 Utilitarios futuros
    types/                     Tipos publicos e compartilhados
  platforms/
    web/                       Estrategia web
    ios/                       Estrategia futura iOS
    android/                   Estrategia futura Android
  tests/                       Setup de testes
```

## Adicionar um componente futuro

Cada componente deve entrar isolado, com API revisada e rastreabilidade com Figma:

```text
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.types.ts
  ComponentName.styles.css
  ComponentName.stories.tsx
  ComponentName.test.tsx
  ComponentName.docs.mdx
  index.ts
```

Exporte o componente em `src/components/ComponentName/index.ts` e, quando aceito como API publica, em `src/index.ts`.

## Criterios minimos de aceite

- Implementacao React tipada e sem dependencia de aplicacao.
- CSS consumindo tokens via custom properties.
- Stories com `Default`, estados principais e variacoes relevantes.
- Estados disabled, loading, erro, hover e focus quando aplicaveis.
- Documentacao de uso correto e incorreto.
- Semantica HTML e comportamento de teclado documentados.
- Testes com Vitest/Testing Library.
- Validacao visual/e2e preparada quando houver risco de regressao.
- `pnpm lint`, `pnpm typecheck`, `pnpm test` e `pnpm build-storybook` sem erros.

## Convencoes de nomenclatura

- Componentes em `PascalCase`.
- Arquivos de componente prefixados pelo nome do componente.
- Tokens sem acoplamento a componentes, exceto na camada `component`.
- Tokens primitivos descrevem valor; tokens semanticos descrevem uso.
- CSS custom properties geradas com prefixo `--ds`.

## Roadmap tecnico sugerido

1. Revisar semantica e aliases a partir dos Core tokens importados.
2. Definir contrato de theming e modes com governanca de acessibilidade.
3. Implementar o primeiro componente piloto.
4. Adicionar testes visuais com Playwright integrados ao Storybook.
5. Preparar CI com lint, typecheck, testes, build e auditoria.
6. Expandir Style Dictionary para Swift e Android quando as plataformas entrarem no escopo.
