# COBERTURA.md — o que a Wiki cobre das 3 abas obrigatórias

> **Atualizado em 2026-08-06, após a construção da Wiki.** A avaliação original desta tabela foi
> feita na Fase 0, quando nada tinha sido escrito: ela media quanto do conteúdo poderia ser
> preenchido automaticamente a partir do código. Aquele diagnóstico continua válido como retrato
> do ponto de partida e está preservado abaixo.
>
> **Resultado depois da construção:**
>
> | Métrica | Fase 0 (diagnóstico) | Agora (entregue) |
> |---|---|---|
> | Seções editoriais preenchidas | 0 de 380 | **380 de 380 (100%)** |
> | Componentes com as 3 abas completas | 0 de 38 | **38 de 38** |
> | Páginas da Wiki publicadas | 0 | **83** |
> | Violações de acessibilidade | não medido | **0** |
>
> O detalhe por componente, gerado automaticamente e verificável, está em
> **`COBERTURA-CONTEUDO.md`** (`npm run validate:conteudo`). As seções que dependiam de decisão do
> time e não foram inventadas aparecem como blocos `PENDENTE` nas páginas e como linhas em
> `LACUNAS.md`.

---

## Diagnóstico original da Fase 0

Uma linha por componente, uma coluna por seção obrigatória da especificação da Wiki.
Universo: **38 componentes** em `packages/react/src/components`, com API extraída em
`wiki/data/components/*.json`. **31 seções obrigatórias** por página (10 na aba Visão Geral,
7 na aba Saiba Mais, 9 na aba Código, 5 no rodapé) = **1.178 células avaliadas**.

Fontes desta avaliação, todas da Fase 0:

| Arquivo | O que sustenta |
|---|---|
| `wiki/data/components/*.json` (38) | props, callbacks, slots, classes, custom properties, tokens, stories, variantes, estados, responsivo, acessibilidade, testes, referências de Figma, pendências |
| `wiki/data/figma-components.json` | 58 componentes publicados na biblioteca Web Components, com `nodeId` e `figmaUrl` (a API de listagem **não retorna descrição** — a evidência sobre descrições está em `achados-fase0.md` §4) |
| `wiki/data/storybook-docs-inventory.json` | 6 páginas de documentação existentes no Storybook e os números/links que elas afirmam |
| `wiki/data/foundations-inventory.json` | 8 páginas de Foundations e suas lacunas ante a especificação |
| `wiki/data/achados-fase0.md` | verificações diretas contra npm, GitHub, Figma e o repositório |

## Legenda

| Marca | Significado |
|---|---|
| ✅ | **Preenchível automaticamente** a partir do dado já extraído. A seção pode ser gerada sem decisão humana — só falta transformar o JSON em página. |
| ⚠️ | **Existe parcialmente.** Há semente extraída (uma frase, uma lista de partes, um link genérico), mas ela não fecha a seção como a especificação pede. |
| ❌ | **Exige redação humana ou decisão do time.** A origem do que falta está anotada em "Como cada coluna foi classificada", abaixo de cada tabela. |

Regra que vale para o documento inteiro: **nenhuma seção foi marcada ✅ por otimismo.** ✅ significa
que existe um campo no JSON que responde a seção inteira. Onde o dado é só um ponto de partida, a
marca é ⚠️, mesmo quando o texto extraído é bom.

## Aba 1 — Visão Geral

| Componente | S1. Nome + descrição (1 frase) | S2. Preview interativo | S3. Quando usar | S4. Quando não usar | S5. Anatomia numerada | S6. Variantes | S7. Tamanhos | S8. Estados | S9. Comportamento responsivo | S10. Do & don't (3 pares) |
|---|---|---|---|---|---|---|---|---|---|---|
| `accordion` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `action-card` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `alert` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ |
| `avatar` | ✅ | ✅ | ⚠️ | ⚠️ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `back-to-top` | ✅ | ✅ | ⚠️ | ⚠️ | ❌ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `badge` | ✅ | ✅ | ⚠️ | ⚠️ | ❌ | ✅ | ✅ | ⚠️ | ⚠️ | ❌ |
| `breadcrumb` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `button-gov` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `button` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `card` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ |
| `carousel` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ |
| `checkbox` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `chip` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `cookie-consent-banner` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `data-table` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `datepicker` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ |
| `divider` | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ⚠️ | ⚠️ | ⚠️ | ❌ |
| `dropdown` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ |
| `file-upload` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `footer` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ❌ |
| `header` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ❌ |
| `hero` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ❌ |
| `link` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `list-item` | ✅ | ✅ | ⚠️ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `meganav` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `modal` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `pagination` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ❌ |
| `progress-bar` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `radio` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ |
| `skeleton` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `spinner` | ✅ | ✅ | ⚠️ | ⚠️ | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `stepper` | ✅ | ✅ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `tabs` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `text-area` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `text-input` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `toast` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ❌ |
| `toggle` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ❌ |
| `tooltip` | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ |
| **Subtotal** | ✅38 ⚠️0 ❌0 | ✅38 ⚠️0 ❌0 | ✅0 ⚠️23 ❌15 | ✅0 ⚠️22 ❌16 | ✅0 ⚠️33 ❌5 | ✅32 ⚠️6 ❌0 | ✅7 ⚠️31 ❌0 | ✅35 ⚠️3 ❌0 | ✅26 ⚠️12 ❌0 | ✅0 ⚠️0 ❌38 |

### Como cada coluna foi classificada

- **S1 Nome + descrição** — ✅ nos 38: o campo `oneLiner` existe e é uma frase completa em todos.
- **S2 Preview interativo** — ✅ nos 38: todo componente tem `stories[].iframeUrl` (mínimo 3 stories, máximo 14). O preview é um iframe do Storybook já publicado.
- **S3 Quando usar** — ⚠️ nos 23 componentes cuja `docsDescription` traz uma frase prescritiva ("Use para…", "Use quando…"); ❌ nos outros 15 (`action-card`, `alert`, `breadcrumb`, `card`, `checkbox`, `chip`, `datepicker`, `divider`, `dropdown`, `file-upload`, `header`, `hero`, `modal`, `progress-bar`, `stepper`). Nunca ✅: uma frase não é a seção. **Origem do ❌: time (editorial).** O Figma praticamente não ajuda: dos 6 componentes centrais consultados um a um (Button, Header, Datepicker, Modal, Table, Stepper), só o Stepper tem descrição, e é nota de especificação técnica.
- **S4 Quando não usar** — ⚠️ nos 22 com "Não use…"/"Evite…" na `docsDescription`; ❌ nos outros 16. **Origem do ❌: time (editorial).**
- **S5 Anatomia numerada** — nunca ✅, porque o frame anotado não existe em lugar nenhum. ⚠️ em 33: ou há bloco "Anatomia:"/"Aplicação:" na `docsDescription`, ou as partes são inferíveis de ≥3 slots / ≥4 classes BEM. ❌ em 5 (`avatar`, `back-to-top`, `badge`, `divider`, `spinner`), que não têm nem uma coisa nem outra. **Origem do ❌ e do que falta no ⚠️: Figma (frame anotado com numeração) + time.**
- **S6 Variantes** — ✅ nos 32 com eixo de variante extraído. ⚠️ nos 6 sem (`breadcrumb`, `checkbox`, `footer`, `header`, `pagination`, `toggle`): a página precisa afirmar "não possui variantes", e essa afirmação é uma confirmação do time, não um dado.
- **S7 Tamanhos** — ✅ só nos 7 com prop `size` enumerada (`avatar`, `badge`, `button`, `link`, `modal`, `spinner`, `text-input`). ⚠️ nos 31 restantes: as dimensões existem, mas como literais no CSS — várias pendências registram alturas sem token (Badge 22/24/28 px, Toggle 44 px, Header 80 px, Toast 496 px).
- **S8 Estados** — ✅ nos 35 com estados extraídos do CSS. ⚠️ em `badge`, `divider`, `hero`, cujas pendências confirmam a ausência de estado interativo (o texto que explica *por quê* ainda é editorial).
- **S9 Comportamento responsivo** — ✅ em 26. ⚠️ em 12: ou não há `@media` (`badge`, `divider`), ou há breakpoint definido só no CSS porque **o node do Figma não define variante mobile** — o que faz a seção existir sem respaldo de design. **Origem do complemento: Figma.**
- **S10 Do & don't (3 pares)** — ❌ nos 38. Não existe nenhum par Use/Evite em componente, nem no código, nem no Figma. (Existe apenas em duas páginas de Foundations: Elevation e Grids.) **Origem: time (editorial), com validação de design.**

## Aba 2 — Saiba Mais

| Componente | S11. Conteúdo e escrita | S12. Hierarquia e posicionamento | S13. Combinação com outros componentes | S14. Tokens por parte/estado | S15. Acessibilidade | S16. 2+ exemplos práticos | S17. Erros comuns |
|---|---|---|---|---|---|---|---|
| `accordion` | ❌ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ❌ |
| `action-card` | ❌ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `alert` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `avatar` | ❌ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ❌ |
| `back-to-top` | ❌ | ⚠️ | ❌ | ⚠️ | ✅ | ⚠️ | ❌ |
| `badge` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `breadcrumb` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `button-gov` | ❌ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `button` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `card` | ❌ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `carousel` | ❌ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `checkbox` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `chip` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `cookie-consent-banner` | ❌ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `data-table` | ❌ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `datepicker` | ❌ | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `divider` | ❌ | ⚠️ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `dropdown` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `file-upload` | ❌ | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `footer` | ❌ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `header` | ❌ | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `hero` | ❌ | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `link` | ❌ | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `list-item` | ❌ | ❌ | ❌ | ⚠️ | ✅ | ⚠️ | ❌ |
| `meganav` | ❌ | ⚠️ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `modal` | ❌ | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `pagination` | ❌ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `progress-bar` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `radio` | ❌ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `skeleton` | ❌ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `spinner` | ❌ | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `stepper` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `tabs` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `text-area` | ❌ | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `text-input` | ❌ | ❌ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| `toast` | ❌ | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| `toggle` | ❌ | ❌ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
| `tooltip` | ❌ | ⚠️ | ❌ | ✅ | ✅ | ⚠️ | ❌ |
| **Subtotal** | ✅0 ⚠️0 ❌38 | ✅0 ⚠️7 ❌31 | ✅0 ⚠️21 ❌17 | ✅24 ⚠️14 ❌0 | ✅38 ⚠️0 ❌0 | ✅0 ⚠️38 ❌0 | ✅0 ⚠️0 ❌38 |

### Como cada coluna foi classificada

- **S11 Conteúdo e escrita** — ❌ nos 38. Não há guia de UX writing em nenhuma fonte. O que existe são defaults de rótulo isolados (`loadingLabel: "Carregando"`, `dropzoneHint: "PDF, CSV ou XLSX até 10mb"`), que servem de exemplo, não de regra. **Origem: time (UX writing).**
- **S12 Hierarquia e posicionamento** — ⚠️ nos 7 que expõem prop de posição/alinhamento/orientação (`back-to-top`, `card`, `cookie-consent-banner`, `divider`, `meganav`, `radio`, `tooltip`); ❌ nos 31 restantes. **Origem do ❌: time (editorial), com validação de design.**
- **S13 Combinação com outros componentes** — ⚠️ nos 21 em que a prosa extraída cita outro componente do DS em contexto de composição ou substituição (ex.: `radio` → Checkbox/Toggle, `skeleton` → Spinner/ProgressBar, `data-table` → Button/Checkbox/Pagination). ❌ nos 17 sem nenhuma menção. É semente, não seção. **Origem: time.**
- **S14 Tabela de tokens por parte/estado** — ✅ em 24, onde ≥80% das custom properties têm comentário identificando parte e estado. ⚠️ em 14, onde o mapa é incompleto (pior caso: `button-gov`, 1 de 10). Os valores resolvidos dos tokens não estão nos JSONs de componente, mas estão em `wiki/data/tokens.json` (1.472 variáveis) — por isso a ausência não derruba a coluna.
- **S15 Acessibilidade** — ✅ nos 38: papéis, atributos ARIA, teclado e notas foram extraídos em todos. Ressalva que **não** entra nesta coluna e vira lacuna: só **13 dos 38** têm teste axe (`*.a11y.test.tsx`), e a afirmação de conformidade AA depende da auditoria da Fase 6.
- **S16 2+ exemplos práticos** — ⚠️ nos 38. Todos têm ≥3 stories renderizáveis, o que resolve o código e o render do exemplo; o que falta em todos é a narrativa do caso de uso (contexto, decisão, resultado). **Origem do complemento: time.**
- **S17 Erros comuns** — ❌ nos 38. Nenhuma fonte registra erro de consumidor. As pendências técnicas registram defeitos do *componente*, que é outra coisa. **Origem: time (editorial), realimentado por suporte.**

## Aba 3 — Código

| Componente | S18. Instalação / import | S19. Snippet mínimo | S20. API completa | S21. Eventos | S22. Slots | S23. Classes e variáveis CSS expostas | S24. Snippets por variante | S25. Notas e limitações | S26. Links Storybook / Figma / repositório |
|---|---|---|---|---|---|---|---|---|---|
| `accordion` | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `action-card` | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `alert` | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `avatar` | ⚠️ | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ |
| `back-to-top` | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ❌ |
| `badge` | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `breadcrumb` | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ |
| `button-gov` | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| `button` | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| `card` | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `carousel` | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `checkbox` | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ |
| `chip` | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `cookie-consent-banner` | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| `data-table` | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| `datepicker` | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| `divider` | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `dropdown` | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| `file-upload` | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| `footer` | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ |
| `header` | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |
| `hero` | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `link` | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| `list-item` | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `meganav` | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `modal` | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `pagination` | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ |
| `progress-bar` | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `radio` | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `skeleton` | ⚠️ | ✅ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ❌ |
| `spinner` | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| `stepper` | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ |
| `tabs` | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| `text-area` | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ |
| `text-input` | ⚠️ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| `toast` | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| `toggle` | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ |
| `tooltip` | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Subtotal** | ✅0 ⚠️38 ❌0 | ✅38 ⚠️0 ❌0 | ✅22 ⚠️16 ❌0 | ✅28 ⚠️10 ❌0 | ✅27 ⚠️11 ❌0 | ✅38 ⚠️0 ❌0 | ✅32 ⚠️6 ❌0 | ✅38 ⚠️0 ❌0 | ✅20 ⚠️14 ❌4 |

### Como cada coluna foi classificada

- **S18 Instalação / import** — ⚠️ nos 38, e este ⚠️ é o mais grave do documento. O caminho de import é derivável (`exports` + nome do pacote), mas **`@government/design-system` e `@government/tokens` retornam 404 no npm** e a home do Storybook ainda cita `@sggd/design-system`, que não existe. Não há comando de instalação verdadeiro para colocar na página. **Origem: decisão do time (publicar no npm, registro privado ou instalação por Git).**
- **S19 Snippet mínimo** — ✅ nos 38: `exports` + props obrigatórias + defaults + tipos bastam para gerar o snippet mecanicamente.
- **S20 API completa** — ✅ em 22. ⚠️ em 16, onde a própria pendência avisa que parte das props não tem descrição, não aparece em `argTypes` ou é herdada de tipos nativos (`TextArea`, `TextInput`, `Skeleton`, `DataTable`, `Meganav`, `Radio` etc.).
- **S21 Eventos** — ✅ nos 28 com callbacks extraídos. ⚠️ nos 10 sem nenhum: a página precisa afirmar "não emite eventos", e em pelo menos um caso (`skeleton`) a pendência mostra que a afirmação seria falsa, porque o componente repassa handlers nativos via rest props.
- **S22 Slots** — ✅ nos 27 com slots; ⚠️ nos 11 sem (confirmar "não expõe slots").
- **S23 Classes e variáveis CSS expostas** — ✅ nos 38: classes e custom properties estão extraídas em todos. Ressalva registrada nas lacunas, não aqui: várias classes são aplicadas pelo TSX e **não têm regra no CSS** (`.ds-button--loading`, `.ds-datepicker--open`, `.ds-toast--without-actions`…) — documentar é possível, mas o texto precisa dizer que a classe é inerte.
- **S24 Snippets por variante** — ✅ nos 32 com eixo de variante (cruzando `variants` com `stories`); ⚠️ nos 6 sem eixo.
- **S25 Notas e limitações** — ✅ nos 38. É a seção mais bem servida da Wiki inteira: **244 pendências técnicas** já registradas (de 3 em `meganav`/`progress-bar` a 11 em `carousel`/`tooltip`), somadas às notas de acessibilidade.
- **S26 Links Storybook / Figma / repositório** — Storybook (`docsUrl`) e repositório (`sourceDir`, repo público MIT) resolvem nos 38. O que decide a coluna é o Figma: ✅ nos 20 com `node-id` citado no código; ⚠️ nos 14 sem `node-id` mas com componente homônimo publicado (o link seria por nome, não rastreável); ❌ em `back-to-top`, `list-item`, `meganav`, `skeleton`, que **não têm par publicado no Figma**. **Origem do ❌: Figma (design).** Isso ataca direto o critério 5 da DoD.

## Rodapé (todas as páginas)

| Componente | S27. Status | S28. Versão de introdução | S29. Última atualização | S30. Responsável | S31. Sugerir melhoria |
|---|---|---|---|---|---|
| `accordion` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `action-card` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `alert` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `avatar` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `back-to-top` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `badge` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `breadcrumb` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `button-gov` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `button` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `card` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `carousel` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `checkbox` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `chip` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `cookie-consent-banner` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `data-table` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `datepicker` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `divider` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `dropdown` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `file-upload` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `footer` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `header` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `hero` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `link` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `list-item` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `meganav` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `modal` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `pagination` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `progress-bar` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `radio` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `skeleton` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `spinner` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `stepper` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `tabs` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `text-area` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `text-input` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `toast` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `toggle` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| `tooltip` | ❌ | ❌ | ⚠️ | ❌ | ⚠️ |
| **Subtotal** | ✅0 ⚠️0 ❌38 | ✅0 ⚠️0 ❌38 | ✅0 ⚠️38 ❌0 | ✅0 ⚠️0 ❌38 | ✅0 ⚠️38 ❌0 |

### Como cada coluna foi classificada

- **S27 Status** — ❌ nos 38. Não existe campo de status (estável/beta/descontinuado) em nenhuma fonte. **Origem: time (política de ciclo de vida).**
- **S28 Versão de introdução** — ❌ nos 38. **Zero tags git, nenhum CHANGELOG.md**, versão declarada `0.1.0` para tudo. Não há como dizer em que versão cada componente entrou. **Origem: time (política de versionamento; o changesets já está configurado e nunca foi usado).**
- **S29 Última atualização** — ⚠️ nos 38. `git log` do diretório do componente responde, mas hoje os 38 devolvem a mesma data (2026-08-05), o que não informa nada. O `updatedAt` por componente existe no Figma mas **não foi gravado** em `figma-components.json`. **Origem do complemento: re-extração do Figma.**
- **S30 Responsável** — ❌ nos 38. Sem `CODEOWNERS`, sem `author`/`maintainers` em `packages/react/package.json`. **Origem: time.**
- **S31 Sugerir melhoria** — ⚠️ nos 38. O repositório é público (`github.com/victorupspace/sggdds`), então a URL de issue é derivável, mas não há `ISSUE_TEMPLATE` nem canal de atendimento definido. **Origem: time.**

## Soma

### Por marca

| Marca | Células | % de 1.178 |
|---|---:|---:|
| ✅ preenchível pelo dado extraído | 481 | 40,8% |
| ⚠️ parcial (semente extraída, falta complemento) | 381 | 32,3% |
| ❌ depende de redação humana ou decisão do time | 316 | 26,8% |
| **Total** | **1.178** | **100%** |

### As duas leituras que importam

| Leitura | Contas | Resultado |
|---|---|---:|
| **Seções que a Fase 0 fecha sozinha** (só ✅) | 481 de 1.178 | **40,8%** |
| **Seções tocadas por algum dado extraído** (✅ + ⚠️) | 481 + 381 de 1.178 | **73,2%** |
| **Seções que dependem de conteúdo editorial ou decisão do time** (❌) | 316 de 1.178 | **26,8%** |
| **Trabalho humano real** (❌ + o complemento de cada ⚠️) | 316 + 381 de 1.178 | **59,2%** |

A leitura honesta é a última linha. Chamar de "cobertos" os ⚠️ infla o número: em `quando usar`,
o dado extraído é **uma frase**, e a seção pede contexto, critério e contraexemplo. A Fase 0 entrega
**40,8% de páginas prontas para gerar** e deixa **59,2% de trabalho de redação, decisão ou re-extração**.

### Por aba

| Aba | Células | ✅ | ⚠️ | ❌ | % ✅ | % ❌ |
|---|---:|---:|---:|---:|---:|---:|
| Aba 1 — Visão Geral | 380 | 176 | 130 | 74 | 46,3% | 19,5% |
| Aba 2 — Saiba Mais | 266 | 62 | 80 | 124 | 23,3% | 46,6% |
| Aba 3 — Código | 342 | 243 | 95 | 4 | 71,1% | 1,2% |
| Rodapé | 190 | 0 | 76 | 114 | 0,0% | 60,0% |

O desenho que sai daí: **a aba Código é a única que a extração quase resolve** (71,1% ✅);
**a aba Saiba Mais é a mais cara** (46,6% ❌); e **o rodapé não tem uma única
célula ✅**, porque depende inteiramente de decisões de governança que ainda não foram tomadas —
status, versionamento e propriedade.

### Por seção

| # | Seção | Aba | ✅ | ⚠️ | ❌ |
|---|---|---|---:|---:|---:|
| 1 | Nome + descrição (1 frase) | Visão Geral | 38 | 0 | 0 |
| 2 | Preview interativo | Visão Geral | 38 | 0 | 0 |
| 3 | Quando usar | Visão Geral | 0 | 23 | 15 |
| 4 | Quando não usar | Visão Geral | 0 | 22 | 16 |
| 5 | Anatomia numerada | Visão Geral | 0 | 33 | 5 |
| 6 | Variantes | Visão Geral | 32 | 6 | 0 |
| 7 | Tamanhos | Visão Geral | 7 | 31 | 0 |
| 8 | Estados | Visão Geral | 35 | 3 | 0 |
| 9 | Comportamento responsivo | Visão Geral | 26 | 12 | 0 |
| 10 | Do & don't (3 pares) | Visão Geral | 0 | 0 | 38 |
| 11 | Conteúdo e escrita | Saiba Mais | 0 | 0 | 38 |
| 12 | Hierarquia e posicionamento | Saiba Mais | 0 | 7 | 31 |
| 13 | Combinação com outros componentes | Saiba Mais | 0 | 21 | 17 |
| 14 | Tokens por parte/estado | Saiba Mais | 24 | 14 | 0 |
| 15 | Acessibilidade | Saiba Mais | 38 | 0 | 0 |
| 16 | 2+ exemplos práticos | Saiba Mais | 0 | 38 | 0 |
| 17 | Erros comuns | Saiba Mais | 0 | 0 | 38 |
| 18 | Instalação / import | Código | 0 | 38 | 0 |
| 19 | Snippet mínimo | Código | 38 | 0 | 0 |
| 20 | API completa | Código | 22 | 16 | 0 |
| 21 | Eventos | Código | 28 | 10 | 0 |
| 22 | Slots | Código | 27 | 11 | 0 |
| 23 | Classes e variáveis CSS expostas | Código | 38 | 0 | 0 |
| 24 | Snippets por variante | Código | 32 | 6 | 0 |
| 25 | Notas e limitações | Código | 38 | 0 | 0 |
| 26 | Links Storybook / Figma / repositório | Código | 20 | 14 | 4 |
| 27 | Status | Rodapé | 0 | 0 | 38 |
| 28 | Versão de introdução | Rodapé | 0 | 0 | 38 |
| 29 | Última atualização | Rodapé | 0 | 38 | 0 |
| 30 | Responsável | Rodapé | 0 | 0 | 38 |
| 31 | Sugerir melhoria | Rodapé | 0 | 38 | 0 |

### As 15 seções em que nenhum dos 38 componentes chega a ✅

São as seções que a especificação exige e que o código nunca produziu:

| Seção | Distribuição nos 38 | Origem do que falta |
|---|---|---|
| 3. Quando usar | ⚠️ 23 / ❌ 15 | time (editorial) — na amostra consultada, só o Stepper tem descrição no Figma |
| 4. Quando não usar | ⚠️ 22 / ❌ 16 | time (editorial) |
| 5. Anatomia numerada | ⚠️ 33 / ❌ 5 | Figma (frame anotado com numeração) + time |
| 10. Do & don't (3 pares) | ❌ 38 | time (editorial) + design (imagem de cada par) |
| 11. Conteúdo e escrita | ❌ 38 | time (UX writing) |
| 12. Hierarquia e posicionamento | ⚠️ 7 / ❌ 31 | time (editorial) + design |
| 13. Combinação com outros componentes | ⚠️ 21 / ❌ 17 | time (editorial) |
| 16. 2+ exemplos práticos | ⚠️ 38 | time (narrativa do caso de uso) |
| 17. Erros comuns | ❌ 38 | time (editorial + suporte) |
| 18. Instalação / import | ⚠️ 38 | decisão do time sobre distribuição — pacote dá 404 no npm |
| 27. Status | ❌ 38 | time (política de ciclo de vida) |
| 28. Versão de introdução | ❌ 38 | zero tags git, nenhum CHANGELOG — decisão de versionamento |
| 29. Última atualização | ⚠️ 38 | Figma (`updatedAt` não foi gravado no export) |
| 30. Responsável | ❌ 38 | sem CODEOWNERS nem `maintainers` — decisão do time |
| 31. Sugerir melhoria | ⚠️ 38 | time (canal e template de contribuição) |

São **15 de 31 seções (48% da estrutura da página)** em que a extração não fecha
um único componente. Não é um problema de qualidade da extração: é que essas seções nunca
existiram — nem no código, nem no Figma, nem no Storybook.

### Componentes por prontidão

| Componente | ✅ | ⚠️ | ❌ | Pendências técnicas | Par no Figma | Teste axe |
|---|---:|---:|---:|---:|---|---|
| `link` | 15 | 9 | 7 | 5 | ⚠️ 1 nó só por nome | ❌ |
| `modal` | 15 | 7 | 9 | 4 | ✅ 2 node-id no código | ✅ 4 casos |
| `action-card` | 14 | 8 | 9 | 6 | ✅ 1 node-id no código | ❌ |
| `alert` | 14 | 7 | 10 | 8 | ✅ 5 node-id no código | ❌ |
| `button` | 14 | 9 | 8 | 7 | ⚠️ 1 nó só por nome | ✅ 5 casos |
| `chip` | 14 | 7 | 10 | 5 | ✅ 1 node-id no código | ❌ |
| `file-upload` | 14 | 8 | 9 | 5 | ✅ 2 node-id no código | ✅ 6 casos |
| `progress-bar` | 14 | 7 | 10 | 3 | ✅ 3 node-id no código | ❌ |
| `spinner` | 14 | 9 | 8 | 4 | ⚠️ 1 nó só por nome | ❌ |
| `stepper` | 14 | 7 | 10 | 5 | ✅ 2 node-id no código | ❌ |
| `tabs` | 14 | 9 | 8 | 6 | ⚠️ 1 nó só por nome | ✅ 4 casos |
| `text-input` | 14 | 9 | 8 | 7 | ⚠️ 2 nós só por nome | ✅ 5 casos |
| `toast` | 14 | 10 | 7 | 8 | ⚠️ 1 nó só por nome | ❌ |
| `tooltip` | 14 | 10 | 7 | 11 | ✅ 1 node-id no código | ❌ |
| `badge` | 13 | 9 | 9 | 8 | ✅ 2 node-id no código | ❌ |
| `datepicker` | 13 | 9 | 9 | 8 | ✅ 1 node-id no código | ✅ 6 casos |
| `dropdown` | 13 | 8 | 10 | 8 | ✅ 1 node-id no código | ✅ 5 casos |
| `header` | 13 | 9 | 9 | 8 | ✅ 2 node-id no código | ❌ |
| `list-item` | 13 | 8 | 10 | 6 | ❌ sem par publicado | ❌ |
| `radio` | 13 | 12 | 6 | 6 | ✅ 3 node-id no código | ✅ 5 casos |
| `accordion` | 12 | 11 | 8 | 5 | ✅ 2 node-id no código | ❌ |
| `avatar` | 12 | 10 | 9 | 6 | ⚠️ 1 nó só por nome | ❌ |
| `back-to-top` | 12 | 10 | 9 | 8 | ❌ sem par publicado | ❌ |
| `button-gov` | 12 | 12 | 7 | 7 | ⚠️ 1 nó só por nome | ❌ |
| `card` | 12 | 11 | 8 | 8 | ✅ 1 node-id no código | ❌ |
| `carousel` | 12 | 12 | 7 | 11 | ✅ 2 node-id no código | ✅ 1 caso |
| `cookie-consent-banner` | 12 | 13 | 6 | 6 | ⚠️ 1 nó só por nome | ✅ 1 caso |
| `data-table` | 12 | 12 | 7 | 9 | ⚠️ 3 nós só por nome | ❌ |
| `divider` | 12 | 9 | 10 | 7 | ✅ 1 node-id no código | ❌ |
| `hero` | 12 | 10 | 9 | 5 | ✅ 1 node-id no código | ❌ |
| `meganav` | 12 | 12 | 7 | 3 | ❌ sem par publicado | ✅ 1 caso |
| `text-area` | 12 | 12 | 7 | 6 | ⚠️ 1 nó só por nome | ❌ |
| `footer` | 11 | 13 | 7 | 5 | ⚠️ 1 nó só por nome | ❌ |
| `breadcrumb` | 10 | 11 | 10 | 6 | ✅ 2 node-id no código | ❌ |
| `checkbox` | 10 | 11 | 10 | 9 | ✅ 2 node-id no código | ✅ 7 casos |
| `pagination` | 10 | 14 | 7 | 4 | ⚠️ 1 nó só por nome | ❌ |
| `skeleton` | 10 | 13 | 8 | 5 | ❌ sem par publicado | ❌ |
| `toggle` | 10 | 14 | 7 | 6 | ⚠️ 1 nó só por nome | ✅ 4 casos |

Nenhum componente passa de 15 seções ✅ de 31. O melhor caso (`link`, `modal`) e o pior (`breadcrumb`, `checkbox`, `pagination`, `skeleton`, `toggle`)
diferem em 5 seções — distância pequena, porque **o que falta é estrutural, não é por
componente**: as mesmas 15 seções faltam nos 38.

---

## Observações que mudam a leitura destes números

1. **O Figma não documenta uso.** O inventário `wiki/data/figma-components.json` não carrega o
   campo de descrição — a API de listagem não o retorna. A evidência vem de consulta direta:
   `search_design_system` foi executado sobre 6 componentes centrais (Button, Header, Datepicker,
   Modal, Table e Stepper) e **apenas o Stepper tem descrição**, ainda assim uma nota de
   especificação técnica, não orientação de uso. A amostra é pequena mas cobre os componentes mais
   maduros; a leitura conservadora é que **praticamente não existe fonte de design** para "quando
   usar", "do & don't", anatomia ou erros comuns. O levantamento das 58 descrições, uma consulta
   por componente, fica para a Fase 3.
2. **38 em código × 58 no Figma.** Os 20 itens a mais são partes internas (`. Table Row`,
   `_Carousel Parts / Dot Control`), átomos (`Mandatory`, `star`, `Icon Action`) ou componentes sem
   par em código (`Range`, `Star Rating`, `Logo/Portal de serviços`). Quatro componentes de código
   (`back-to-top`, `list-item`, `meganav`, `skeleton`) **não têm par publicado no Figma**.
3. **A cobertura de acessibilidade automatizada é de 34%** (13 de 38 com `*.a11y.test.tsx`). Isso não
   aparece como ❌ na coluna S15 porque o *conteúdo* da seção está extraído; aparece em `LACUNAS.md`
   porque a *afirmação de conformidade* não está sustentada.
4. **A aba Código depende de um pacote que não existe.** Os dois pacotes dão 404 no npm. Enquanto a
   decisão de distribuição não for tomada, as 38 páginas ficam com um bloco de instalação falso ou
   vazio — e a exigência contratual 4 fica parcial.
5. **O rodapé é uma pauta de governança, não de conteúdo.** Status, versão de introdução e responsável
   somam 114 células ❌ (60% do rodapé). Nenhuma delas se resolve escrevendo texto: dependem de
   decisão sobre ciclo de vida, versionamento e propriedade.

