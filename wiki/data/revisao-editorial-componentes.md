# Revisão editorial — JSONs de componentes

Revisão de voz, repetição, especificidade, ortografia e terminologia nos 38 arquivos de
`wiki/content/componentes/*.json`.

- **Arquivos revisados:** 38
- **Arquivos ajustados:** 38
- **Alterações aplicadas:** 234
- **Conteúdo novo criado:** nenhum (só reescrita, padronização e remoção)

O texto de base é bom: os exemplos citam serviços reais (Poupatempo, protocolo, certidão, conta
gov.br) e quase todo `dosDonts` se apoia em uma prop concreta. Os problemas encontrados são de
**consistência entre arquivos**, não de qualidade do texto isolado — sinal de que o corpus foi
escrito em levas diferentes. Duas divisões quase perfeitas de 22 contra 16 arquivos confirmam isso
(voz do `naoFaca` e estilo de aspas), com fronteiras diferentes entre si.

---

## 1. Voz e pessoa

### 1.1 `naoFaca` começava com "Não" em 16 arquivos — negação dupla na tela

Este era o defeito mais grave, e não é questão de gosto: o renderer
(`wiki/src/components/Blocos.tsx:72`) já imprime o rótulo **"Não faça"** acima do campo. Nos 16
arquivos que começavam o texto com "Não…", a página exibia:

> **Não faça**
> Não use danger só para destacar um chip que você considera importante.

Os outros 22 arquivos já usavam infinitivo, que é a forma correta sob esse rótulo. Padronizei os 16
restantes para o infinitivo — **48 entradas reescritas**.

`chip`, `cookie-consent-banner`, `data-table`, `datepicker`, `divider`, `dropdown`, `file-upload`,
`footer`, `header`, `hero`, `link`, `text-area`, `text-input`, `toast`, `toggle`, `tooltip`

O campo `faca` já era uniformemente imperativo ("Escreva", "Use", "Mantenha") e não foi tocado.

### 1.2 "usuário" eliminado

- `button-gov` — "o ícone de usuário" e a peça de anatomia "Ícone de usuário" → **"ícone de pessoa"**
- `text-area` — "esticada verticalmente pela pessoa usuária" → **"pela pessoa"**

Não havia nenhuma ocorrência de "cliente", "usuário final", "app" ou "feature" no corpus.

### 1.3 "você" para o leitor: já estava correto

As ocorrências de "você" se dividem em dois usos, ambos legítimos e mantidos: o leitor que
implementa (`chip`, `hero`, `progress-bar`) e a redação de interface citada como exemplo
(`radio`: "Como você quer receber a certidão?"; `cookie-consent-banner`). A pessoa que usa o
serviço já era chamada de "a pessoa" em todo o corpus.

---

## 2. Repetição

Nenhuma frase-modelo foi encontrada em `quandoUsar`, `dosDonts`, `exemplos` ou `errosComuns` —
esses campos são genuinamente específicos por componente. **Toda a repetição estava nos campos de
metadado**, e o problema real era o inverso do esperado: o mesmo fato aparecia com muitas redações
diferentes, o que faz o corpus parecer descuidado quando as páginas são lidas em sequência.

Nesses casos a correção certa é **uma redação única**, não variação artificial: são fatos
verificáveis idênticos, e reescrevê-los para soarem diferentes seria piorar a documentação.

| Fato | Antes | Depois |
|---|---|---|
| Ausência de teste de acessibilidade | **20 redações** em 25 arquivos | 1 redação |
| Pendente de `tamanhos` | **11 redações** em 19 arquivos | 1 redação-base + complemento específico |
| Pendente de node do Figma | **8 redações** em 8 arquivos | 1 redação-base + complemento específico |
| Regra de capitalização | 7 redações, 4 delas genéricas | 1 redação-base |

Redações canônicas adotadas:

- `Não há teste automatizado de acessibilidade para este componente; a verificação precisa ser manual.`
- `O campo de tamanhos ficou vazio porque o componente não expõe prop de tamanho[: complemento].`
- `O código não cita nenhum node do Figma, então não foi possível apontar o frame de origem deste componente.`
- `Escreva <o quê> com a primeira letra maiúscula e o resto em minúsculas, sem ponto final.`

Ajustes estruturais no mesmo movimento:

- **Notas compostas separadas em dois fatos** (`breadcrumb`, `card`): a ausência de teste vinha
  grudada a uma observação sobre o Figma na mesma frase, o que impedia padronizar qualquer uma das
  duas.
- **Nota de acessibilidade movida de `pendentes` para `notasImplementacao`** em `list-item`,
  `pagination` e `progress-bar`, alinhando com os outros 22 arquivos. É um fato sobre a
  implementação, não uma questão editorial em aberto.

O `statusNota` idêntico nos 38 arquivos foi mantido: é o mesmo status de governança para todos, e
a repetição ali é correta.

---

## 3. Especificidade

Quase tudo passou no teste "cita uma situação concreta". Só uma entrada era tautológica — definia o
componente em vez de descrever uma situação:

- **`action-card`, `quandoUsar`** — removido: *"Quando o bloco inteiro deve ser clicável, e não
  apenas um link dentro dele."* O `resumo` do próprio arquivo já diz que o Action Card "é um card
  inteiro clicável", então a entrada respondia "use quando quiser usar". Restam 4 entradas, todas
  concretas — mesma quantidade de `button-gov`, `carousel` e `stepper`.

Também reescritas por ambiguidade, não por generalidade:

- **`datepicker`, `dropdown`, `file-upload`, `text-input`, `text-area`** — a anatomia do rótulo
  usava "obrigatório" com dois sentidos na mesma frase ("Texto acima do campo, **obrigatório**.
  Recebe um asterisco decorativo quando o campo é **obrigatório**"): a prop exigida pelo componente
  e a resposta exigida da pessoa. Redação única nos cinco: *"Nome do campo, sempre visível e
  exigido pelo componente. Recebe um asterisco decorativo quando a resposta é obrigatória."*
- **`text-input`** — *"Sempre acompanhe o estado de erro de uma mensagem de erro com a correção"*
  usava "erro" três vezes. → *"Acompanhe todo estado de erro de uma mensagem que diga o que corrigir."*
- **`avatar`** — "os valores concretos dos tokens ficam no pacote de tokens" → "os valores
  concretos ficam no pacote de tokens".
- **`meganav`** — retirado "não por uma escala escolhida por quem usa": "quem usa" era ambíguo
  entre a pessoa e quem implementa.

---

## 4. Ortografia e acentuação

**Nenhum erro encontrado.** Varri o corpus contra as trocas mais comuns (`nao`, `pagina`, `acao`,
`conteudo`, `possivel`, `titulo`, `rotulo`, `padrao`, `nivel`, `icone`, `so`, `ate`, `ja`, `ha`,
`por que`/`por quê`), além de espaço duplo, espaço antes de pontuação e pontuação duplicada. O
único ajuste de pontuação foi em `chip`, onde uma citação terminava em `"EM ANÁLISE.".`

### Aspas: 100 correções

Divisão de 22 contra 16 arquivos usando aspas duplas e simples para a mesma função — citar texto de
interface. Padronizei para **aspas duplas** (maioria: 223 contra 173 ocorrências, e é a forma
padrão em português).

`breadcrumb`, `button`, `button-gov`, `card`, `carousel`, `checkbox`, `file-upload`, `footer`,
`header`, `hero`, `link`, `list-item`, `meganav`, `modal`, `pagination`, `progress-bar`

---

## 5. Termos

| Termo | Ocorrências | Decisão |
|---|---|---|
| `Design System` → `design system` | 6 | Minúsculo. O nome próprio "Sampa Design System" não aparece nestes arquivos |
| `contêiner` → `container` | 6 | Grafia única; "container" já era maioria (39 contra 8) e é o rótulo usado nas peças de anatomia |
| `tecnologias assistivas` → `leitores de tela` | 3 | Termo padrão da lista (todas em `divider`) |
| `variante mobile` → `variante para telas pequenas` | 2 | Sem anglicismo (`alert`, `radio`) |
| `breakpoint` → `ponto de quebra` | 2 | `checkbox` já usava "pontos de quebra" (`breadcrumb`, `data-table`) |
| `do's and don'ts` → `seção Do & don't` | 1 | Passa a citar o título que aparece na página (`list-item`) |

Já estavam consistentes e não foram mexidos: `token`, `componente`, `acessibilidade`,
`leitor de tela`, `teclado`, `e-mail`, `celular`, `gov.br`, `Poupatempo`.

---

## Ponto para o time: lacuna factual em 10 arquivos

Conferi as afirmações sobre teste de acessibilidade contra o repositório
(`packages/react/src/components/*/*.a11y.test.tsx`). **Toda afirmação existente está correta** — os
25 arquivos que dizem não ter teste realmente não têm, e os 3 que dizem ter (`carousel`,
`text-input`, `toggle`) têm.

O problema é o silêncio: **10 componentes têm teste de acessibilidade e não dizem nada a respeito** —
`button`, `checkbox`, `cookie-consent-banner`, `datepicker`, `dropdown`, `file-upload`, `meganav`,
`modal`, `radio`, `tabs`.

Não preenchi essa lacuna: seria acrescentar conteúdo novo, e afirmar cobertura exige avaliar o que
cada teste cobre de fato — como `carousel` já faz ao registrar que o teste cobre só a composição
básica. Fica registrado para o time completar.

---

## Método

Alterações aplicadas por script, com verificação final automática de: JSON válido, conjunto e ordem
de chaves idênticos nos 38 arquivos, campos obrigatórios não vazios, ausência dos termos proibidos,
ausência de `naoFaca` iniciando em negativa, e nenhuma frase idêntica em 3 ou mais arquivos fora do
boilerplate padronizado de propósito. Todas as verificações passaram sem apontamentos.
