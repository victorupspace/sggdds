# iOS Platform — SwiftUI

Biblioteca SwiftUI do Design System SGGD, distribuída como pacote Swift (SPM).

## Estrutura

```text
platforms/ios/
  Package.swift
  Sources/
    SGGDTokens/        Tokens gerados (DSColors, DSDimensions, DSFontWeights, DSFontFamilies)
      SGGDTokens.swift   Marcador commitado do módulo
      DSTokens.swift     GERADO por `pnpm tokens:build` (não commitado)
    SGGDComponents/    Componentes SwiftUI (dependem de SGGDTokens)
      Button/
  Tests/
    SGGDComponentsTests/
```

## Tokens

Os tokens são gerados pelo pipeline compartilhado de Style Dictionary, a partir da
mesma fonte DTCG usada pela web. **Antes de compilar, gere os tokens:**

```bash
# na raiz do monorepo
pnpm tokens:build
```

Isso escreve `Sources/SGGDTokens/DSTokens.swift`. Cores viram `Color(red:green:blue:opacity:)`,
dimensões viram `CGFloat`, font-weights viram `Font.Weight`.

## Compilar e testar

```bash
cd platforms/ios
swift build
swift test
```

> O `Package.swift` declara também `.macOS(.v12)` para permitir `swift build`/`swift test`
> no host de CI; o alvo de produção é `.iOS(.v15)`.

## Usar o Button

```swift
import SGGDComponents

DSButton("Enviar", variant: .secondary, size: .medium) {
    // ação
}

DSButton("Carregando", isLoading: true) {}
DSButton("Bloqueado") {}.disabled(true)
```

Variantes: `.primary`, `.secondary`, `.tertiary`. Tamanhos: `.small`, `.medium`, `.large`.
Estados: `isLoading`, `.disabled(_:)`, `fullWidth`, ícones via `iconStart`/`iconEnd`.

As previews em `Button/DSButton+Previews.swift` documentam os estados (equivalente às Storybook stories da web).

## Componentes disponíveis

`DSButton`, `DSCheckbox`, `DSAlert`, `DSChip`, `DSDivider`, `DSLink`, `DSModal`,
`DSRadioGroup`, `DSProgressBar`, `DSSpinner`, `DSToast`, `DSToggle`, `DSTooltip` —
todos consumindo `SGGDTokens` e com paridade de API com a camada React.
