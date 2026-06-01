# Tokens

Tokens sao organizados como fonte plataforma-agnostica para web, iOS e Android.

## Camadas

- `raw`: exports brutos vindos do Figma.
- `normalized`: JSON normalizado pelo pipeline local.
- `build`: JSON compilado para consumo interno.
- `css`: CSS custom properties para web.

## Modelo

Use `primitive` para valores base, `semantic` para uso de interface e `component` somente quando um componente aprovado exigir tokens especificos.

O export atual de Core tokens do SGGD e recebido com categorias no topo e normalizado pelo pipeline como `primitive`.
