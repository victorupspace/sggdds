# Tokens brutos (exports do Figma)

Coloque aqui os exports de variáveis do Figma, um arquivo por collection. Os
nomes de arquivo mapeiam cada collection para um tier do Design System:

| Arquivo                     | Collection no Figma     | Tier gerado | Prefixo CSS              |
| --------------------------- | ----------------------- | ----------- | ------------------------ |
| `global-core.tokens.json`   | Global: Core            | `primitive` | `--ds-primitive-*`       |
| `t1-sampa.tokens.json`      | T1: Sampa Design System | `brand`     | `--ds-brand-*`           |
| `t2-semantics.tokens.json`  | T2: Semantics           | `semantic`  | `--ds-semantic-*`        |
| `t3-components.tokens.json` | T3: Components          | `component` | `--ds-component-*`       |
| `web-extras.tokens.json`    | — (mantido no código)   | `semantic`  | `--ds-semantic-shadow-*` |

Para atualizar: exporte a collection no Figma (Variables → Export), salve por
cima do arquivo correspondente e rode `pnpm tokens:build` na raiz. O build:

1. valida os arquivos (`scripts/validate-tokens.ts`);
2. normaliza para `src/normalized` (kebab-case, `$root` → `default`,
   `sucess` → `success`, cores do Figma → hex/rgba, números com escopo de
   layout → `px`, `aliasData` → referências DTCG entre tiers);
3. gera `dist/css/tokens.css`, `dist/json/tokens.json` e as saídas nativas
   (Swift e Android XML) via Style Dictionary.

`web-extras.tokens.json` guarda tokens que ainda não existem nas collections do
Figma (hoje, apenas as sombras `semantic.shadow.*`). Quando a collection ganhar
esses tokens, remova o arquivo. Arquivos auxiliares do macOS (`._*`) não devem
ser versionados.

Política de tipografia: **Plus Jakarta Sans é a única família do Design
System.** Qualquer token `fontFamily` que chegar do Figma com outro valor é
normalizado para Plus Jakarta Sans pelo build (com aviso e valor original em
`sggd.figmaOriginalValue`) — corrija também a variável no Figma quando o aviso
aparecer.
