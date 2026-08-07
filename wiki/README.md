# Wiki do Sampa Design System

Documentação oficial do Sampa Design System — Governo do Estado de São Paulo, Prodesp.

Aplicação autônoma: tem `package.json`, build e deploy próprios. **Não** é um addon do Storybook e
não compartilha pipeline com ele. O Storybook entra por link externo e por `iframe` de preview.

---

## Rodar localmente

```bash
cd wiki
npm ci
npm run dev      # http://localhost:3000
```

O `dev` sincroniza os tokens antes de subir. A busca só funciona depois de um build (o índice do
Pagefind é gerado sobre o HTML exportado).

## Build

```bash
npm run build    # sincroniza tokens → next build → pagefind
npm start        # serve o resultado em out/
```

O build é estático (`output: 'export'`): a saída em `out/` é HTML, CSS e JS, sem servidor. Nada
consulta Figma ou Storybook em tempo de execução.

## Deploy na Vercel

A Wiki é um **projeto Vercel próprio**, separado do que publica o Storybook. Os dois vivem no mesmo
repositório e se distinguem pelo Root Directory: o Storybook usa a raiz (`vercel.json` da raiz roda
`pnpm build-storybook`), a Wiki usa `wiki/` (este `vercel.json`).

Tudo o que a Vercel precisa já está em `wiki/vercel.json`. Na interface, só o Root Directory precisa
ser informado, porque ele é o que decide qual `vercel.json` vale:

| Configuração | Valor |
|---|---|
| Root Directory | `wiki` |
| Framework Preset | Other |
| Install / Build / Output | vêm de `vercel.json` |

Nenhuma variável de ambiente é necessária.

O `@vercel/analytics` está no layout. Ele funciona no export estático porque só
injeta um script de mesma origem (`/_vercel/insights`), servido pela própria
infraestrutura da Vercel — não há chamada a terceiros nem cookie. Fora da Vercel
o script não existe e a falha é silenciosa. As métricas aparecem na aba
**Analytics** do projeto depois do primeiro deploy.

### Por que `"framework": null` e não o preset do Next

A Wiki é `output: 'export'` — cem por cento estática, sem runtime de servidor. O build tem três
etapas, e a terceira é a que decide a configuração:

```
node scripts/sync-tokens.mjs   →  copia os tokens do monorepo, se ele existir
next build                     →  gera out/
pagefind --site out            →  escreve out/pagefind/ (1,6 MB de índice de busca)
```

O índice do Pagefind nasce **depois** do `next build`, direto dentro de `out/`. Com o preset do
Next, a Vercel monta o deploy a partir do que o builder dela entende do projeto, e não há garantia
de que arquivos acrescentados ao `out/` fora do `next build` sobrevivam. O modo de falha seria
silencioso: build verde, site no ar e a busca vazia só em produção.

Com `"framework": null` a Vercel publica o `out/` exatamente como ficou no disco. Para um site
totalmente estático não se perde nada — não há ISR, nem otimização de imagem (`images.unoptimized`),
nem função de servidor — e o índice de busca vai junto por construção.

`"trailingSlash": true` acompanha o `next.config.mjs`: as páginas são geradas como
`componentes/button/index.html`, então `/componentes/button` precisa redirecionar para
`/componentes/button/`.

### O build não depende do monorepo

`npm ci` roda dentro de `wiki/`, que tem `package-lock.json` próprio e nenhuma dependência
`workspace:`. O `sync-tokens.mjs` tenta copiar `packages/tokens/dist/css/tokens.css`; quando o
monorepo não está disponível — que é o caso se a Vercel só baixar o Root Directory — ele mantém a
cópia commitada em `src/styles/tokens.css` e segue. Verificado: com o `dist/` ausente, o script sai
com código 0 e a mensagem `[tokens] Monorepo indisponível`.

---

## Como o conteúdo é organizado

A Wiki separa **dado extraído** de **conteúdo redigido**. Essa separação é o que sustenta a regra
de zero invenção.

| Origem | Onde vive | Quem escreve | Como muda |
|---|---|---|---|
| Dado extraído | `data/` | ferramenta | reextrair do código e do Figma |
| Conteúdo editorial de componente | `content/componentes/*.json` | pessoas | revisão de texto |
| Páginas editoriais | `src/app/**/page.tsx` | pessoas | edição direta |
| Tokens | `src/styles/tokens.css` | gerado | `npm run tokens:sync` |

### `data/` — o que foi extraído

| Arquivo | Conteúdo |
|---|---|
| `components/*.json` | API real de cada componente: props, variantes, estados, slots, classes, tokens, stories, acessibilidade, testes |
| `tokens.json` | 1.472 tokens com valor resolvido, camada, coleção e alias |
| `figma-components.json` | 58 componentes publicados na biblioteca do Figma, com node-id |
| `figma-icons.json` | 2.193 ícones |
| `mapping.json` | pareamento Figma ↔ código, com nível de confiança |
| `achados-fase0.md`, `divergencias-sessao.md` | verificações e divergências levantadas |

### `content/componentes/<slug>.json` — o que foi redigido

Quando usar, quando não usar, anatomia, do & don't, exemplos, erros comuns. Se um campo está
vazio, a página renderiza um bloco **PENDENTE** visível — comportamento intencional: pendência
declarada é melhor que texto inventado.

---

## Sincronizar tokens

```bash
npm run tokens:sync
```

Copia `packages/tokens/dist/css/tokens.css` do monorepo para `src/styles/tokens.css`. A cópia é
**commitada** para que o build da Vercel não dependa do monorepo. Se a origem não existir, o
script mantém a cópia e avisa.

Fluxo completo quando os tokens mudam no Figma:

```bash
# no monorepo
pnpm tokens:validate && pnpm tokens:build

# na wiki
cd wiki && npm run tokens:sync && npm run build
```

---

## Verificações

Os comandos abaixo rodam **de dentro de `wiki/`**:

```bash
npm run verify            # tudo: lint + tipos + build + dados + conteúdo + links + acessibilidade
npm run verify:rapido     # só dados e conteúdo, sem build (segundos)
npm run lint              # ESLint, com a configuração da raiz do monorepo
npm run typecheck         # tsc --noEmit
npm run validate:data     # dados extraídos batem com o código-fonte
npm run validate:conteudo # completude das seções e checagem de invenção
node scripts/verificar-links.mjs        # links internos e âncoras (exige build)
node scripts/auditar-acessibilidade.mjs --todas   # axe em todas as páginas
node scripts/auditar-reflow.mjs         # WCAG 1.4.10 nos componentes, via Storybook publicado
```

Da **raiz do monorepo** existem atalhos equivalentes, para não precisar trocar de diretório:

```bash
pnpm wiki:dev       # sobe a Wiki em desenvolvimento
pnpm wiki:build     # build de produção
pnpm wiki:verify    # gate de aceite completo
pnpm wiki:tokens    # reconstrói os tokens no monorepo e sincroniza com a Wiki
```

`validate:data` confere, para cada componente: se o diretório existe, se a contagem de testes
bate, se os tokens declarados são exatamente os consumidos no CSS, se os ids de story existem no
Storybook publicado e se os node-ids do Figma são válidos. **Rode antes de cada publicação.**

---

## Reextrair dados

Quando o código do Design System muda, os dados em `data/` ficam desatualizados. A reextração é
feita a partir do monorepo e do Figma; o passo mecânico é:

```bash
# no monorepo, garantir que o Storybook está construído
pnpm build-storybook

# a wiki lê storybook-static/index.json para os ids de story
cd wiki && npm run validate:data
```

Se `validate:data` acusar divergência, o dado extraído precisa ser atualizado antes de publicar —
uma falha aí significa que a documentação está afirmando algo que o código não faz mais.

---

## Estrutura

```
wiki/
├── content/componentes/     conteúdo editorial por componente
├── data/                    dados extraídos (Fase 0)
├── public/                  logo em SVG, claro e escuro
├── scripts/
│   ├── sync-tokens.mjs      copia os tokens do monorepo
│   ├── validar-extracao.mjs valida dado extraído contra o código
│   └── verificar-links.mjs  links quebrados e âncoras
└── src/
    ├── app/                 rotas (App Router)
    ├── components/          componentes da própria Wiki
    ├── lib/                 carregadores de dados, contraste WCAG, navegação
    └── styles/tokens.css    gerado — não edite
```

---

## Regras de manutenção

1. **Nenhum valor visual escrito à mão.** Cor, espaçamento, raio e tipografia saem de
   `var(--ds-*)`. Se o token não existe, isso é uma lacuna do sistema, não uma licença para
   escrever o valor.
2. **Nenhuma afirmação técnica sem origem.** Número, prop, variante e nome de componente vêm de
   `data/`. Se não vier, é PENDENTE.
3. **Todo `<h2>` e `<h3>` precisa de `id`.** O índice lateral lê os ids do DOM.
4. **Divergência entre Figma e código não se resolve escolhendo um lado** — documenta-se os dois
   e registra-se em `INCONSISTENCIAS.md`.
5. **Light mode.** A interface é clara por decisão do time (2026-08-06).
6. **Plus Jakarta Sans é a única família.** Nenhuma outra fonte entra.

## Cor de marca

`#FF161F` é a cor da marca e é usada em logo, superfícies e elementos gráficos grandes. Ela mede
3,90:1 sobre branco e **não atinge WCAG AA para texto normal**. Por isso texto e controles pequenos
usam `#C50007` (`--ds-brand-color-brand-red-primary`, 6,22:1). A página `/fundamentos/cor` calcula
essa matriz no build e mostra os pares que não atingem AA.
