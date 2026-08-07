# Relatório de acessibilidade — Wiki do Sampa Design System

Auditoria automatizada com axe-core sobre o site construído, em navegador real (Chromium).
Regras aplicadas: WCAG 2.0 A/AA e WCAG 2.1 A/AA.

- Data: 2026-08-07
- Páginas auditadas: **86** de 86 geradas
- Páginas sem violação: **86**
- Violações totais: **0**

> O preview de componente é um `iframe` do Storybook, em outro domínio. Ele é bloqueado durante
> a auditoria: o que se mede aqui é a acessibilidade da Wiki, não a do Storybook.

> O navegador roda com `prefers-reduced-motion: reduce`, que desliga as revelações de entrada.
> Sem isso o axe mediria o contraste no meio da animação, com opacidade intermediária, e acusaria
> falhas inexistentes. O que se mede é o estado final — o mesmo que vê quem pede movimento reduzido.

## Resultado

Nenhuma violação encontrada nas páginas auditadas.

## Como reproduzir

```bash
cd wiki
npm run build
node scripts/auditar-acessibilidade.mjs --todas
```
