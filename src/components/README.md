# Components

Componentes React sao adicionados aqui, um por vez, a partir de especificacoes aprovadas no Figma.

## Componentes disponiveis

- `Badge`: comunica status, categoria, classificacao ou destaque curto em formato compacto.
- `Avatar`: representa visualmente usuarios ou entidades com imagem ou iniciais acessiveis.
- `BackToTop`: retorna a pessoa ao topo em paginas longas com acao flutuante responsiva.
- `Breadcrumb`: mostra a localizacao atual na hierarquia e permite voltar a niveis superiores.
- `Button`: permite executar acoes, tomar decisoes e avancar fluxos com CTAs consistentes.
- `ButtonGov`: CTA institucional especifico para entrada/autenticacao com gov.br.
- `Card`: destaca uma informacao ou acao principal como signpost de conteudo responsivo.
- `Checkbox`: permite selecionar, desmarcar ou representar estado intermediario em formularios e listas.
- `Chip`: representa filtros, tags ou entidades adicionadas com acao de remocao.
- `Datepicker`: permite selecionar data unica, intervalo ou horario em calendario responsivo.
- `Divider`: cria separacao visual horizontal ou vertical entre secoes, grupos e elementos.
- `Dropdown`: permite selecionar uma opcao unica em lista compacta com select nativo acessivel.
- `Footer`: organiza navegacao secundaria, informacoes legais, marca e redes sociais no fim da pagina.
- `Header`: organiza identidade, navegacao primaria, utilitarios globais e acesso do usuario.
- `Hero`: destaca a mensagem principal no topo da pagina com conteudo, CTA e media responsiva.
- `InfoCard`: apresenta informacao contextual em card com icone, titulo, descricao e slot.
- `Link`: navega para recursos internos ou externos em texto inline ou chamada independente.
- `Pagination`: organiza listas longas em paginas numeradas com navegacao e metadados.
- `Stepper`: comunica progresso atual em fluxos lineares de 2 a 10 etapas.
- `Tabs`: alterna secoes de conteudo relacionadas no mesmo contexto de pagina.
- `TextArea`: captura conteudo multilinha com label, helper, contador e validacao acessiveis.
- `TextInput`: captura dados alfanumericos de linha unica com label, helper, foco e erro acessiveis.

Estrutura obrigatoria:

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
