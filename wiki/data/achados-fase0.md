# Achados da Fase 0 — verificações diretas

Levantamentos feitos diretamente contra Figma, npm, GitHub e o repositório, complementando a
extração automatizada. Cada linha tem como foi verificado.

---

## 1. Distribuição do pacote

| Fato | Verificação | Consequência |
|---|---|---|
| `@government/design-system` **não está publicado** | `GET registry.npmjs.org/@government/design-system` → **404** | `/recursos/instalacao` não tem comando de instalação real |
| `@government/tokens` **não está publicado** | `GET registry.npmjs.org/@government/tokens` → **404** | idem; a Wiki lê os tokens por caminho de arquivo, não por dependência |
| Changesets configurado com `access: public`, `baseBranch: main` | `.changeset/config.json` | infraestrutura de release existe, mas nunca foi usada |
| **Zero tags git** e **nenhum CHANGELOG.md** no repositório | `git tag` (0 resultados), `find -name CHANGELOG.md` (vazio) | `/recursos/changelog` e o campo "versão de introdução" de cada componente ficam sem fonte |
| Versão declarada: `0.1.0` nos dois pacotes | `package.json` | — |

## 2. Repositório

| Fato | Verificação |
|---|---|
| `victorupspace/sggdds` é **público**, licença **MIT** | API do GitHub: `"visibility": "public"`, `"license": {"spdx_id": "MIT"}` |
| Homepage aponta para o Storybook | `"homepage": "https://sggdds.vercel.app"` |
| CI e Release em GitHub Actions | `.github/workflows/{ci,release}.yml` |
| Deploy atual do Storybook na Vercel | `vercel.json` com `buildCommand: corepack pnpm build-storybook` |

Como o repositório é público, os links "ver código-fonte" da aba Código funcionam sem restrição.

## 3. Identidade visual

| Fato | Verificação | Consequência |
|---|---|---|
| Logo oficial **é vetorial** no Figma | `download_assets` no node `40000172:79` retornou SVG de 7,4 kB, 217×29, com 18 paths | O repositório só tem versões rasterizadas; a Wiki deve usar o vetor |
| O repositório tem **3 PNGs de logo, 2 deles byte a byte idênticos** | `md5`: `images/logo-spgov-default.png` e `packages/react/src/components/Header/assets/logo-spgov-default.png` compartilham o hash `750cd985baf6c550e67187c5ad3ddd06`; o terceiro é `logo-portal-de-servicos.png` | Arquivo duplicado no repositório; `/recursos/downloads` precisa de uma origem única |
| O logo usa **`#FF161F`** | `fill` extraído do SVG | Ver §9: essa cor **está** exportada e reprova em contraste |
| A coleção **"Primárias/"** existe no Figma com nomes em português | `get_variable_defs` no node `40000172:77` retornou `Primárias/Vermelho SP.GOV - Complementar: #FF161F` | **Correção (2026-08-05):** ao contrário do que eu havia registrado, o valor **não** está ausente do pipeline — ele sai como `--ds-brand-color-brand-red` via `color/brand/red` em `t1-sampa`. O que diverge é a nomenclatura (o Figma usa nomes em português nessa coleção) |
| Fonte carregada por CDN do Google Fonts | `.storybook/preview-head.html` carrega Plus Jakarta Sans 300–800 | A Wiki pode fazer o mesmo ou auto-hospedar (decisão de performance/privacidade) |
| Nenhum arquivo de fonte no repositório | `find -name "*.woff*"` só encontra a Nunito Sans da UI do próprio Storybook | Auto-hospedagem exigiria baixar a família |

## 4. Documentação existente no Figma

Verificado via `search_design_system` com escopo na biblioteca `Web Components`:

| Componente | Tem descrição? |
|---|---|
| Stepper | **Sim** — nota de especificação (propriedades, fontes, "usa variáveis do DS local") |
| Button | Não |
| Modal | Não |
| Header | Não |
| Datepicker | Não |
| Table | Não |

Conclusão: a camada de orientação de uso **não existe** no Figma. Todo o conteúdo de
"quando usar", "quando não usar", anatomia, do & don't, exemplos e erros comuns será redigido
como `status: rascunho-para-validação`.

Ponto positivo: o Figma expõe `updatedAt` por componente (ex.: Datepicker `2026-07-15T14:54:01Z`),
que serve como "última atualização" no rodapé de cada página.

## 5. Bibliotecas paralelas

Além de `Foundations` e `Web Components` (as duas assinadas pelo arquivo), a organização tem:

- **`SP / Design System / Arquivo PÚBLICO`** — componentes `sp-*` versionados individualmente
  (`sp-stepper` 1.1.0, `sp-stepper-modal` 4.2.0), coleção de cor própria `SP UI Colors/primary/*`.
- **`UI Kit Poupatempo SP.GOV.BR`** — ex.: `Stepper Mobile`.

São sistemas legados/paralelos. A Wiki precisa deixar explícito qual é o sistema vigente e o que
acontece com os anteriores — hoje um consumidor não tem como saber qual usar.

## 6. Iconografia

| Fato | Número |
|---|---|
| Total publicado na página Iconography | 2.193 |
| Material Symbols (`[outlined]`, peso 300) | 2.185 |
| Ícones avulsos fora da convenção | 8 (`arrow down/left/right/up`, `home`, `radio button checked`, `radio circle`, `upload`) |
| Com valor de peso gravado como `300.svg` em vez de `300` | 135 |
| Nomes duplicados | 0 |
| Exportação SVG no repositório | **nenhuma** — os ícones usados estão inline no JSX |

Licença não declarada em lugar nenhum (Material Symbols é Apache 2.0, mas precisa de confirmação).

## 7. Qualidade da base de código

| Fato | Número | Verificação |
|---|---|---|
| Componentes com teste de acessibilidade (axe) | **13 de 38** (34%) | presença de `*.a11y.test.tsx` |
| Suíte total | 348 testes passando | `pnpm test` |
| Variáveis CSS de token | 1.472 | `dist/css/tokens.css` |
| Tokens no inventário × variáveis no CSS | 1.472 × 1.472, sem sobra dos dois lados | validação cruzada |

## 8. Defeitos encontrados na origem dos tokens

1. **24 tokens de componente sem alias.** Durações de motion e opacidades de backdrop apontam,
   no Figma, para variáveis de **spacing**, então saem como número solto e sem unidade —
   `--ds-component-tooltip-motion-duration-enter: 6`,
   `--ds-component-modal-backdrop-effect-opacity: 48`. Afeta diretamente `/fundamentos/motion`,
   que não tem como documentar durações reais.
2. **Vazamento no build.** `src/normalized/t2-semantics.tokens.json` recebe uma cópia de
   `semantic.shadow.*` por compartilhamento de referência no `deepMerge` antes da escrita em
   disco. A fonte real desses 6 tokens é `web-extras.tokens.json`.
3. **Modo único chamado `Prodesp`.** A collection `T2: Semantics` tem um só modo, com esse nome.
   Não há modo de tema alternativo (nem dark mode) em nenhuma collection.

## 9. Contraste — o conflito de vermelho tem consequência de acessibilidade

Cálculo de razão de contraste (WCAG 2.1) feito sobre os valores resolvidos:

| Cor | Token raiz | Tokens que resolvem para ela | Sobre branco | WCAG AA (texto normal, 4.5:1) |
|---|---|---|---|---|
| `#C50007` | `--ds-brand-color-brand-red-primary` | **56** | **6,22:1** | passa |
| `#C60008` | — (só no Figma, `Button primary`) | 0 | **6,17:1** | passa |
| `#FF161F` | `--ds-brand-color-brand-red` | **11** | **3,90:1** | **reprova** |

**As duas marcas vermelhas estão exportadas**, com nomes quase idênticos — `color/brand/red` e
`color/brand/red-primary` — e nada no sistema diz qual é interface e qual é marca gráfica.

O problema não é hipotético: **8 dos 11 tokens que resolvem para `#FF161F` são de texto ou ícone**,
todos a 3,90:1.

| Token | Uso |
|---|---|
| `--ds-semantic-text-style-content-color-typography-brand` | cor semântica de texto de marca |
| `--ds-component-alert-action-link-color-text-default` | link de ação do Alert |
| `--ds-component-badge-color-text-brand` | texto do Badge brand |
| `--ds-component-tag-color-text-brand` | texto da Tag brand |
| `--ds-component-select-option-color-text-selected` | opção selecionada do Select |
| `--ds-component-bottom-nav-item-color-text-selected` | item selecionado da navegação inferior |
| `--ds-component-toggle-button-color-text-selected` | texto do Toggle Button selecionado |
| `--ds-component-icon-button-color-background-primary-active` | fundo do Icon Button ativo |

Isso deixa de ser uma pergunta de identidade visual e vira uma **violação de acessibilidade
documentável no sistema de tokens**. O desfecho provável é `#FF161F` como cor da **marca gráfica**
(logotipo, onde a regra de contraste não se aplica) e `#C50007` como cor de **interface** — com os
7 tokens de texto acima repontados para a versão que passa. Precisa de decisão do time; a própria
Wiki tem de atingir AA (DoD #7).

Amostra dos pares semânticos de texto sobre fundo (7 pares testados): **todos passam AA**, do
`typography/primary` (21:1) ao `typography/disabled` (4,74:1) — o problema está isolado na marca.
A matriz completa de contraste entra na Fase 2.

## 10. Contexto do órgão (inferência a confirmar)

As evidências apontam para o **Governo do Estado de São Paulo**, não a prefeitura: modo de token
`Prodesp` (empresa de TI do estado), biblioteca `UI Kit Poupatempo SP.GOV.BR`, links `Fala SP` e
`SP.GOV.BR` no Footer, e o nome do repositório `sggdds` (SGGD + DS). **Não usei essa inferência em
nenhum texto da Wiki** — precisa de confirmação do nome oficial do órgão e da secretaria.
