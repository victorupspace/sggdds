# Correções de acessibilidade nos tokens

Aplicadas em **2026-08-06** no código, fora da exportação do Figma.

Uma auditoria dos **70 pares texto/fundo** definidos na camada de componente encontrou **23 pares
abaixo de 4,5:1**, o mínimo da WCAG 2.1 AA para texto normal. Este documento registra o que foi
corrigido, por quê, e o que precisa acontecer no Figma.

## Como a correção está aplicada

Tudo vive em um único arquivo: **`packages/tokens/src/raw/z-acessibilidade.tokens.json`**.

A coleta de arquivos do build ordena por nome (`collectTokenFiles` termina com `.sort()`), então
esse arquivo é lido **depois** de `t3-components` e `t2-semantics` e sobrescreve os valores
exportados do Figma. Consequências:

- **Nenhum arquivo de exportação foi editado.** `t3-components.tokens.json` continua sendo o
  espelho fiel do Figma. A divergência é explícita, não silenciosa.
- **Apagar o arquivo restaura exatamente o que o Figma publica.** A correção é reversível em um
  comando.
- Cada token corrigido carrega `$extensions["sggd.correcaoAcessibilidade"]` com o par antes/depois,
  então a origem da mudança viaja junto com o dado.

```bash
# aplicar
pnpm --filter @government/tokens build

# reverter
rm packages/tokens/src/raw/z-acessibilidade.tokens.json && pnpm --filter @government/tokens build
```

## O que foi corrigido

**18 tokens, em 5 grupos.** Quatro dos cinco usam cores que **já existiam** no sistema — só o
âmbar de aviso precisou de valor novo.

### 1. Botão secundário — texto invisível

| | |
|---|---|
| Tokens | `button/color/text/secondary/$root`, `.../hover` |
| Antes | `#FFFFFF` sobre `#E5E5E5` — **1,26:1** |
| Depois | `#000000` sobre `#E5E5E5` — **16,67:1** |

O caso mais grave da auditoria: texto branco sobre cinza claro é praticamente invisível. Está
ligado à inversão `primary`/`secondary` já registrada em `INCONSISTENCIAS.md` §6.3 — no Figma
atual, `Secondary` é escuro (`#262626`) com texto branco; na collection exportada, o fundo veio
claro e o texto continuou branco. A correção torna o texto legível **sem alterar o fundo**; se o
time confirmar que o fundo deve ser escuro, esta linha do override sai.

### 2. Placeholder de campo

| | |
|---|---|
| Tokens | `text-placeholder` de `date-picker`, `input`, `search-field`, `select`, `textarea` |
| Antes | `#A3A3A3` sobre branco — **2,52:1** |
| Depois | `#737373` sobre branco — **4,74:1** (`color/neutral/grey-500`, já existente) |

Placeholder **não** é isento pela WCAG: é texto real, lido por quem preenche o formulário. O menor
cinza que atinge AA sobre branco fica em torno de `#767676`; `grey-500` já cumpre.

### 3. Texto de aviso sobre fundo de aviso

| | |
|---|---|
| Tokens | `color/text/warning` de `alert`, `badge`, `tag`, `toast` |
| Antes | `#C38900` sobre `#FFF9DD` — **2,88:1** |
| Depois | `#966900` sobre `#FFF9DD` — **4,60:1** |

Único valor novo do conjunto. Mantém o matiz original (42°) e escurece a luminosidade até cruzar
o limiar. Sobre branco fica em 4,86:1, então também serve fora do fundo de aviso.

**As outras três famílias utilitárias já passavam**: success 6,58:1, danger 5,43:1,
information 11,01:1. Só o amarelo estava fora.

### 4. Texto de marca sobre fundo de marca sutil

| | |
|---|---|
| Tokens | `badge/color/text/brand`, `tag/color/text/brand`, `select/option/color/text/selected` |
| Antes | `#FF161F` sobre `#FFE3E4` — **3,22:1** |
| Depois | `#C50007` sobre `#FFE3E4` — **5,14:1** (`color/brand/red-primary`, já existente) |

### 5. Texto de marca sobre branco

| | |
|---|---|
| Tokens | `toggle-button/color/text/selected`, `alert/action-link/color/text/$root`, `bottom-nav/item/color/text/selected`, `text style/content color/typography/brand` |
| Antes | `#FF161F` sobre branco — **3,90:1** |
| Depois | `#C50007` sobre branco — **6,22:1** |

Estes quatro são o núcleo da questão da cor de marca. `#FF161F` é a cor do logotipo e continua
sendo a cor da marca — ela permanece intacta em `color/brand/red` e em todos os tokens de
**fundo** e de **elemento gráfico**. O que mudou é que tokens de **texto** deixaram de apontar
para ela: texto de marca agora usa `red-primary`, que já existia justamente para isso.

### 6. Botão secundário — fundo de marca com rótulo branco

| | |
|---|---|
| Arquivo | `packages/react/src/components/Button/Button.styles.css` |
| Antes | `brand/primary/prominent` (`#FF161F`) com rótulo branco — **3,90:1** |
| Depois | `brand/primary/default` (`#C50007`) com rótulo branco — **6,22:1** |

Única correção fora da camada de token: aqui o problema não era o valor, era **qual token o
componente consumia**. `brand/primary/prominent` resolve para a cor do logotipo e continua correto
onde é forma — o Footer o usa para a marca gráfica, sem texto em cima. O Button o usava como
superfície de rótulo, que é outro papel.

Os estados `hover` (6,48:1) e `active` (9,29:1) já passavam.

## O que não foi corrigido, e por quê

**8 pares continuam abaixo de 4,5:1 — todos de estado desabilitado:**

`button` (danger/primary/secondary) a 3,20:1, e `date-picker`, `input`, `password-field`,
`select`, `textarea` a 4,35:1.

A WCAG 2.1, critério 1.4.3, isenta explicitamente texto que faz parte de um componente de
interface **inativo**. Escurecer esses tokens até 4,5:1 faria o estado desabilitado parecer
habilitado, prejudicando quem depende do contraste entre os dois estados para entender que o
controle não está disponível. **Não corrigir aqui é a decisão certa**, não uma omissão.

## Resultado

| | Antes | Depois |
|---|---|---|
| Pares texto/fundo analisados | 70 | 70 |
| Abaixo de 4,5:1 | **23** | **8** |
| Abaixo de 4,5:1 sem isenção da WCAG | **15** | **0** |

Suíte do Design System: 348 testes passando. Validação de tokens: 1.490 tokens em 6 arquivos.

## Pendente no Figma

Estas 18 correções existem **apenas no código**. Enquanto não forem espelhadas no Figma, quem
projetar a partir da biblioteca continuará usando os valores que reprovam. As perguntas para o
time estão em `INCONSISTENCIAS.md` §7, itens 27b, 28 e 49.
