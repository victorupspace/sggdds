# Verificação da extração — Fase 0

A extração foi feita por agentes lendo o código. Isso não basta: a regra de zero invenção exige
que o dado extraído seja conferido contra a fonte. Este documento registra a conferência.

Ferramenta: `wiki/scripts/validar-extracao.mjs` (sem dependências, sai com código 1 em caso de
falha). Deve rodar em toda fase seguinte e, idealmente, no CI da Wiki.

---

## Verificação mecânica

Executada sobre os 38 componentes extraídos. **228 verificações, zero falhas.**

| Regra | O que confere | Como |
|---|---|---|
| `sourceDir` | o diretório declarado existe | `statSync` |
| `tests.a11yFile` | presença declarada bate com o disco | `*.a11y.test.tsx` existe ou não |
| `tests.unitCount` | número de testes declarado bate com o arquivo | contagem de `it(` |
| `tokensUsed` | conjunto de tokens declarado é idêntico ao consumido no CSS | `var(--ds-*)` com texto normalizado |
| `stories.id` | todo id existe no `index.json` do Storybook | consulta ao índice publicado |
| `stories.url` | links seguem o formato `iframe.html?id=` e `?path=/docs/` | padrão de URL |
| `mapping.figmaNodeId` | todo node-id pareado existe no inventário do Figma | conjunto de nodes publicados |

### Um falso positivo, corrigido no validador

A primeira versão da regra `tokensUsed` acusou 2 tokens "sobrando" no ButtonGov. Investigado: o
Prettier quebra `var(` e o nome do token em linhas diferentes, e a regex não atravessava a quebra.
**O agente estava certo e a verificação estava errada.** O validador passou a normalizar espaços
antes do match. Registrado aqui porque é exatamente o tipo de erro que produziria uma correção
indevida no dado bom.

## Verificação semântica

Amostragem manual no maior componente do catálogo:

**DataTable (45 props).** A interface `DataTableProps` declara 43 propriedades diretas; a extração
listou 45. As duas adicionais são `className` e `style`, que entram por
`extends Omit<HTMLAttributes<HTMLDivElement>, ...>` e são de fato aplicadas em
`DataTable.tsx:459` (`<div {...rest} className={rootClassName} style={style}>`). Tipos conferidos
por amostra, incluindo assinatura de callback:
`onSort: (column: DataTableColumn<TData>, direction: DataTableSortDirection) => void`. **Correto.**

## Afirmações da auditoria da documentação, conferidas uma a uma

O inventário de `docs/*.mdx` acusou erros na documentação atual do Storybook. Todos foram
confirmados diretamente no repositório antes de entrar no relatório:

| Afirmação | Confirmação |
|---|---|
| Snippet de onboarding usa pacote inexistente `@sggd/design-system` | `docs/introduction.docs.tsx:382` e `:389` — confirmado |
| Link para integração com Figma está quebrado | doc aponta `documentation-integracao-com-figma--docs`; id real é `documentation-integração-com-figma--docs` (com acento) — confirmado |
| Link para File Upload está quebrado | doc aponta `web-components-fileupload--docs`; id real é `web-components-file-upload--docs` — confirmado |
| `consuming.mdx` afirma que o tier de componente não foi publicado | linha 230 diz "component-level ainda não publicado"; existem **1.192** variáveis `--ds-component-*` — confirmado |
| Tamanho de bundle documentado está errado | doc afirma ≈190 KB / ≈22 KB gzip; medido: **240,6 KB / 27,4 KB** — confirmado |

Medição de bundle (gzip -9 sobre `packages/react/dist/`):

| Arquivo | Bruto | Gzip |
|---|---|---|
| `index.css` | 240,6 KB | 27,4 KB |
| `index.js` | 140,2 KB | 32,5 KB |
| `tokens.css` | 128,2 KB | 9,6 KB |

## Estatísticas do catálogo extraído

| Métrica | Valor |
|---|---|
| Componentes | 38 |
| Props documentadas | 550 |
| Stories mapeadas | 215 (todos os 38 componentes têm ao menos uma) |
| Estados implementados | 170 |
| Regras `@media` | 80 |
| Pendências auto-registradas pelos agentes | 244 |
| Componentes sem variante declarada | 6 (breadcrumb, checkbox, footer, header, pagination, toggle) |
| Componentes sem nenhuma regra responsiva | 2 (badge, divider) |
| Componentes com teste de acessibilidade | 13 de 38 (34%) |

As 244 pendências não são falhas da extração: são o registro honesto do que o código não informa
(quando usar, anatomia, exemplos, status de maturidade). Elas alimentam `LACUNAS.md`.
