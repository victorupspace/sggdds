# Plano de rotas e arquitetura — Wiki do Sampa Design System

Documento de aprovação da **Fase 0**. Define onde a aplicação vive, qual stack usa, quais rotas
existem e de que fonte cada página tira o conteúdo. Nada aqui foi construído ainda.

---

## 1. Onde a aplicação vive

**Proposta:** diretório `wiki/` na raiz deste repositório, **fora** do workspace pnpm
(`pnpm-workspace.yaml` só inclui `packages/*`, então `wiki/` não é afetado).

| Requisito do contrato | Como é atendido |
|---|---|
| `package.json` próprio | `wiki/package.json`, sem relação com o monorepo |
| Build próprio | `npm ci && npm run build` dentro de `wiki/` |
| Deploy próprio na Vercel | Projeto Vercel separado com *Root Directory* = `wiki` |
| Domínio próprio | `wiki-sampads.vercel.app` (a confirmar), sem subpath do Storybook |
| Não é addon do Storybook | Nenhum `.mdx` do Storybook é importado; Storybook entra por link e por `iframe` |

Alternativa possível: repositório separado. A vantagem do diretório é manter Wiki e código na
mesma origem de verdade (tokens e componentes), o que reduz o risco de a documentação divergir.
A desvantagem é que o deploy exige configurar o *Root Directory* uma vez. **Recomendo o diretório.**

## 2. Stack

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | Next.js (App Router) + TypeScript, SSG | Exigido/recomendado pelo contrato; export estático viável |
| Conteúdo | MDX por rota, com front-matter obrigatório (`origem`, `status`, `atualizadoEm`) | Rastreabilidade exigida na regra anti-alucinação |
| Estilo | CSS Modules + **CSS Variables geradas dos tokens reais** (`packages/tokens`) | A Wiki consome o próprio DS; zero valor hardcoded |
| Tipografia | Plus Jakarta Sans | Única fonte do DS. Rawline proibida |
| Busca | Pagefind (indexa o HTML no build) | Client-side, sem serviço externo, compatível com SSG |
| Preview de componente | `<iframe>` do Storybook (`iframe.html?id=...&viewMode=story`) | Funciona hoje; não acopla o build da Wiki ao pacote não publicado |
| Sincronização | `npm run tokens:sync` copia/normaliza os tokens do monorepo para `wiki/src/styles/tokens.css` | Build time, sem dependência de runtime do Figma |

Nada em runtime consulta Figma ou Storybook: todo dado extraído vira arquivo estático em `wiki/data/`.

## 3. Rotas

★ = item citado explicitamente no documento de aceite (gate).

### Home
| Rota | Conteúdo | Fonte |
|---|---|---|
| `/` | Hero, o que é, atalhos por perfil, novidades, CTA Figma/Storybook | Editorial |

### Introdução
| Rota | Fonte principal | Observação |
|---|---|---|
| `/introducao/sobre` | Editorial | Histórico e escopo dependem do time |
| ★ `/introducao/premissas-e-objetivos` | Editorial | Rascunho para validação |
| `/introducao/principios` | Editorial | 5+ princípios com "não esqueça" |
| `/introducao/como-usar` | Editorial | Visão por perfil |
| `/introducao/fluxo-de-criacao` | Editorial + Figma | Trilha do designer |
| `/introducao/fluxo-de-desenvolvimento` | `docs/consuming.mdx` (migração) | Trilha do dev |
| `/introducao/governanca` | 🔒 time | Sem tags git nem changelog hoje |
| `/introducao/contribua` | Repo (`.changeset`, workflows de CI) + editorial | — |

### Fundamentos
| Rota | Fonte principal | Situação hoje |
|---|---|---|
| `/fundamentos/visao-geral` | Editorial | — |
| ★ `/fundamentos/tokens` | `wiki/data/tokens.json` + `docs/design-tokens.mdx` | 1.472 variáveis CSS inventariadas |
| `/fundamentos/cor` | tokens + matriz de contraste calculada | Existe `Foundations/Color` no Storybook |
| `/fundamentos/tipografia` | tokens | Existe `Foundations/Typography` |
| `/fundamentos/espacamento` | tokens | Existe `Foundations/Spacing` |
| `/fundamentos/grid-e-layout` | tokens (breakpoints) | Existe `Foundations/Grids` e `/Breakpoints` |
| `/fundamentos/iconografia` | `wiki/data/figma-icons.json` | 2.193 ícones Material Symbols, outlined, peso 300 |
| `/fundamentos/logo-e-marca` | Figma (vetor) + `images/` | 🔒 conflito de cor de marca a decidir |
| `/fundamentos/elevacao-e-sombra` | tokens | Existe `Foundations/Elevation` |
| `/fundamentos/borda-e-raio` | tokens | Existe `Foundations/Border` |
| `/fundamentos/motion` | tokens de motion | Poucos tokens; provável lacuna |
| `/fundamentos/acessibilidade` | `docs/accessibility.mdx` (migração) + auditoria | — |

### Componentes
| Rota | Fonte |
|---|---|
| `/componentes/visao-geral` | catálogo com busca, filtro por categoria e status |
| `/componentes/[slug]` | uma página por componente, 3 abas (§5 do contrato) |

O universo do catálogo sai de `wiki/data/mapping.json`: componentes com implementação em código
**e/ou** publicados no Figma. Itens que são partes internas (`.Radio Control`, `Range`,
`Progress Line`, `Tab Item`, `Nav Item`, `Upload Item`, `Date picker - Cell`, entre outros) **não**
viram página: entram como "Anatomia" do componente pai. Componentes só-Figma entram marcados como
`Em desenho`; componentes só-código entram marcados como `Sem par no Figma`.

### Padrões, templates e conteúdo
| Rota | Fonte |
|---|---|
| `/padroes/visao-geral` e `/padroes/[slug]` | Editorial — formulários, busca, filtros, tabela de dados, login, feedback/erros, estados vazios, paginação, upload |
| `/templates/visao-geral` e `/templates/[slug]` | Editorial — landing, serviço, dashboard, formulário |
| `/conteudo/writing` e `/conteudo/vocabulario` | Editorial |

Nenhum padrão ou template existe hoje no Figma nem no Storybook: **100% editorial**, sujeito a
validação. Escopo a confirmar com o time antes da Fase 4.

### Recursos
| Rota | Fonte | Situação |
|---|---|---|
| ★ `/recursos/ferramentas` | Editorial + repo | — |
| `/recursos/downloads` | Figma + repo | Logo, ícones, tokens JSON, UI kit |
| `/recursos/instalacao` | `docs/consuming.mdx` | 🔒 pacotes não publicados no npm |
| ★ `/recursos/faq` | Editorial | mínimo 25 perguntas |
| `/recursos/suporte` | 🔒 time | canais e SLA |
| `/recursos/changelog` | 🔒 repo/time | sem tags nem CHANGELOG hoje |
| `/recursos/glossario` | Editorial | — |

## 4. Navegação

Sidebar hierárquica persistente · breadcrumb · TOC "nesta página" · busca global ·
no topo de toda página de componente, botões **Ver no Figma** (deep link com `node-id`) e
**Ver no Storybook** (`?path=/docs/<id>`), ambos `target="_blank"`.

## 5. Rastreabilidade

Todo MDX carrega front-matter com a origem do dado:

```yaml
origem: [figma, storybook, repo, time]
figmaNodeId: "40000045:5961"
storybookId: "web-components-stepper--default"
status: publicado | rascunho-para-validação
atualizadoEm: "2026-08-05"
```

Dado ausente vira bloco `⚠️ PENDENTE` na página **e** linha em `LACUNAS.md`. Divergência entre
Figma e código aparece nas duas versões e vai para `INCONSISTENCIAS.md` — nunca é harmonizada em
silêncio.
