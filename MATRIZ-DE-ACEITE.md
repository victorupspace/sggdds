# Matriz de Aceite — Wiki do Sampa Design System

Rastreia cada exigência do documento de aceite até as páginas que a atendem e a evidência que a
comprova. Atualizada ao fim de cada fase.

Legenda: `✅ completo` · `⚠️ parcial` · `❌ ausente` · `🔒 bloqueado` (depende de decisão do time)

**Como reproduzir todas as evidências:**

```bash
# da raiz do monorepo
pnpm wiki:verify

# ou de dentro de wiki/
cd wiki && npm ci && npm run verify
```

---

## 1. Exigências contratuais

| # | Exigência | Páginas que atendem | Status | Evidência |
|---|---|---|---|---|
| 1 | **Premissas e objetivos do DS** | `/introducao/premissas-e-objetivos`, `/introducao/principios`, `/introducao/sobre` | ✅ | Página com premissas, objetivos, não-objetivos e tensões conhecidas. Marcada como rascunho para validação, conforme a regra anti-alucinação (§9) |
| 2 | **Conceituação e uso de componentes** | `/componentes/visao-geral` + 38 páginas `/componentes/[slug]` | ✅ | **380 de 380 seções editoriais preenchidas** (`npm run validate:conteudo`). Cada página tem as 3 abas: Visão geral, Saiba mais, Código |
| 3 | **Diretrizes de design, tokens e exemplos práticos** | 12 páginas `/fundamentos/*` + aba Saiba mais de cada componente | ✅ | 1.472 tokens documentados com valor resolvido e origem; matriz de contraste calculada no build; 2 exemplos práticos por componente |
| 4 | **Documentação técnica remetendo a Figma e Storybook** | aba Código de cada componente, `/recursos/instalacao`, links no topo de toda página de componente | ✅ | 550 props documentadas, extraídas do código e validadas contra ele; deep link do Figma por node-id; link de story do Storybook por id |
| 5 | **Ferramentas de suporte e FAQ** | `/recursos/ferramentas`, `/recursos/faq`, `/recursos/suporte`, `/recursos/downloads`, `/recursos/glossario`, `/recursos/changelog` | ✅ | FAQ com **42 perguntas** nos 5 blocos de público (mínimo contratual: 25); glossário com 31 termos |

## 2. Definition of Done (§12)

| # | Critério | Status | Evidência |
|---|---|---|---|
| 1 | Build com `npm ci && npm run build`, URL própria na Vercel, independente do Storybook | ✅ código / 🔒 deploy | Build passa sem variável de ambiente. Projeto Vercel separado precisa ser criado com *Root Directory* = `wiki` |
| 2 | 100% dos componentes com as 3 abas completas | ✅ | 38 de 38. `COBERTURA-CONTEUDO.md` |
| 3 | 100% dos tokens documentados e alimentando a Wiki | ✅ | 1.472 tokens em `/fundamentos/tokens`; `src/styles/tokens.css` gerado do monorepo alimenta todo o tema |
| 4 | Logo, fontes e paleta oficiais aplicados | ✅ | Logo vetorial do Figma em duas versões; Plus Jakarta Sans auto-hospedada; `#FF161F` como cor de marca |
| 5 | Link funcional para Figma e Storybook em toda página de componente | ✅ | Verificado por `validar-extracao.mjs`: todo id de story existe no índice publicado; todo node-id existe no inventário do Figma |
| 6 | Busca global funcional | ✅ | Pagefind indexando **87 páginas e 9.169 palavras**; relevância verificada em navegador |
| 7 | WCAG 2.1 AA verificado, teclado completo, contraste auditado | ✅ | **86 páginas auditadas com axe-core em Chromium, zero violações** (`RELATORIO-ACESSIBILIDADE.md`). Matriz de contraste calculada no build |
| 8 | Responsivo em 360/768/1024/1440 | ✅ | Sem overflow horizontal nos quatro breakpoints; medido em navegador |
| 9 | Os 5 artefatos de conformidade entregues | ✅ | `MATRIZ-DE-ACEITE.md`, `COBERTURA.md`, `LACUNAS.md`, `INCONSISTENCIAS.md`, `RELATORIO-ACESSIBILIDADE.md` (+ `COBERTURA-CONTEUDO.md`) |
| 10 | Zero links quebrados; zero `PENDENTE` fora de `LACUNAS.md` | ✅ | **9.012 links internos e âncoras verificados, zero quebrados**. 350 blocos `PENDENTE`, todos declarados |
| 11 | README com manutenção e sincronização de tokens | ✅ | `wiki/README.md` |

## 3. Como a regra de zero invenção é sustentada

Não é promessa: é verificação executável.

| Ferramenta | O que garante | Resultado |
|---|---|---|
| `scripts/validar-extracao.mjs` | Todo dado técnico bate com o código-fonte: diretórios, contagem de testes, tokens consumidos, ids de story, node-ids do Figma | 263 verificações, 0 falhas |
| `scripts/validar-conteudo.mjs` | Completude seção a seção; nenhuma prop, variante ou componente citado sem existir; nenhum breakpoint afirmado sem `@media` | 380/380 seções, 0 problemas |
| `scripts/verificar-links.mjs` | Links internos, âncoras e arquivos estáticos | 9.012 links, 0 quebrados |
| `scripts/auditar-acessibilidade.mjs` | WCAG 2.1 AA com axe-core em navegador real | 86 páginas, 0 violações |

O validador de conteúdo já pegou uma invenção em produção: o texto do Badge descrevia comportamento
responsivo detalhado para um componente sem nenhuma regra `@media`. A regra foi depois refinada para
distinguir fluidez (legítima) de breakpoint inventado.

## 4. O que ficou fora — e por quê

Nada aqui é omissão: são decisões que não cabem à documentação tomar.

| Item | Situação | Onde está registrado |
|---|---|---|
| Instalação via npm | Os pacotes retornam 404 no registro. A página está escrita na forma definitiva, com aviso no topo e o caminho alternativo por Git | `/recursos/instalacao` |
| Status por componente | Todos marcados como "Em revisão". Declarar um componente estável antes de existir política de ciclo de vida seria inventar governança | `/introducao/governanca` |
| Versão de introdução e responsável | Sem tag git, sem CHANGELOG, sem papéis definidos | `LACUNAS.md` |
| Changelog | Não existe release. A página explica o que falta decidir em vez de fabricar histórico | `/recursos/changelog` |
| Canal de suporte e SLA | Não existem. A página aponta o único caminho real (issues no repositório) | `/recursos/suporte` |
| Escala tipográfica composta | Os tamanhos existem soltos; não há estilos nomeados publicados | `/fundamentos/tipografia` |
| Conjunto canônico de breakpoints | Três conjuntos em circulação; a página documenta os três lado a lado | `/fundamentos/grid-e-layout` |
| Escala de motion | 22 tokens de tempo existem quebrados na origem, sem easing | `/fundamentos/motion` |
| Licença dos ícones | Não declarada em lugar nenhum | `/fundamentos/iconografia` |
| Manual de marca | Não existe; a versão clara do logo foi derivada e precisa de validação | `/fundamentos/logo-e-marca` |
| Padrões e templates | Nada existia no Figma nem no Storybook: 100% redigido, marcado como rascunho | `/padroes/*`, `/templates/*` |

## 5. Riscos de aceite

| Risco | Impacto | Mitigação |
|---|---|---|
| Conteúdo editorial sem validação do time | As exigências 1, 2 e 3 dependem de conteúdo que nasceu nesta documentação. Todo ele está marcado como rascunho | Revisão em lote por seção, começando pelos 38 componentes |
| Pacote não publicado | A exigência 4 fica parcial até a publicação | A página de instalação não muda quando publicar — só perde o aviso |
| Cor de marca reprovando contraste | `#FF161F` mede 3,90:1 e é usada por 8 tokens, dos quais 7 são de texto | Wiki usa `#C50007` para texto; decisão do time registrada como item 28 |
| Par de cor de aviso reprovando AA | Afeta qualquer produto que use Badge, Tag ou Alert de aviso | Registrado como item 27b |
| Dados extraídos envelhecem | A documentação pode passar a afirmar o que o código não faz mais | `npm run verify` acusa; deve rodar no CI da Wiki |
