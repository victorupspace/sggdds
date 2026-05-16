# Token Scripts

Esta pasta contem os scripts de validacao e transformacao de tokens.

- `validate-tokens.ts` valida arquivos `*.tokens.json` em `src/foundations/tokens/raw`.
- `transform-tokens.ts` normaliza os tokens brutos e executa Style Dictionary.

Os scripts foram criados para falhar cedo quando encontrarem JSON invalido, grupos de topo inesperados ou tokens sem `$value` e `$type`.
