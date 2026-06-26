# Android Platform — Views/XML

Biblioteca Android (sistema de Views tradicional + XML) do Design System SGGD,
em dois módulos Gradle.

## Estrutura

```text
platforms/android/
  settings.gradle.kts
  build.gradle.kts
  sggd-tokens/         Library: apenas recursos de tokens gerados
    src/main/res/values/ds_*.xml   GERADO por `pnpm tokens:build` (não commitado)
  sggd-components/     Library: componentes (Kotlin Views) + estilos
    src/main/java/br/gov/sggd/designsystem/components/DSButton.kt
    src/main/res/values/attrs_ds_button.xml
    src/main/res/layout/ds_button_gallery.xml
```

## Tokens

Gerados pelo pipeline compartilhado de Style Dictionary (mesma fonte DTCG da web):

```bash
# na raiz do monorepo
pnpm tokens:build
```

Saídas em `sggd-tokens/src/main/res/values/`:

- `ds_colors.xml` — `<color>` em `#AARRGGBB`
- `ds_dimens.xml` — `<dimen>` em `dp` (e `sp` para font-size)
- `ds_integers.xml` — `<integer>` para font-weights
- `ds_strings.xml` — `<string>` para font-families

## Compilar

> Requer Android SDK + JDK 17. Gere o wrapper com `gradle wrapper` (ou abra no Android Studio).

```bash
cd platforms/android
./gradlew :sggd-components:assembleRelease
```

## Usar o Button

```xml
<br.gov.sggd.designsystem.components.DSButton
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Enviar"
    app:dsVariant="secondary"
    app:dsSize="medium" />
```

```kotlin
val button = DSButton(context).apply {
    text = "Enviar"
    variant = DSButton.Variant.SECONDARY
    isLoading = true
}
```

Variantes: `primary`, `secondary`, `tertiary`. Tamanhos: `small`, `medium`, `large`.
Estados: `dsLoading`, `android:enabled="false"`, `dsFullWidth`.

`res/layout/ds_button_gallery.xml` documenta os estados (equivalente às Storybook stories da web).

## Componentes disponíveis

`DSButton`, `DSCheckbox`, `DSAlert`, `DSChip`, `DSDivider`, `DSLink`, `DSModal`,
`DSRadioButton`, `DSProgressBar`, `DSSpinner`, `DSToast`, `DSToggle`, `DSTooltip` —
todos consumindo os recursos de token de `sggd-tokens`, com paridade de API com a
camada React. Atributos XML usam nomes únicos por componente (ex.: `dsChipVariant`,
`dsLinkSize`) para evitar colisão de enums entre styleables.
