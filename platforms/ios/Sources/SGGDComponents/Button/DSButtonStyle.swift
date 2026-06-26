import SwiftUI
import SGGDTokens

/// Size-dependent metrics for ``DSButton``, mirroring the web size modifiers.
struct DSButtonMetrics {
    let paddingBlock: CGFloat
    let paddingInline: CGFloat
    let gap: CGFloat
    let iconSize: CGFloat
    let fontSize: CGFloat
    let lineHeight: CGFloat

    init(size: DSButtonSize) {
        switch size {
        case .small:
            paddingBlock = DSDimensions.primitiveSpacing8
            paddingInline = DSDimensions.primitiveSpacing10
            gap = DSDimensions.primitiveSpacing8
            iconSize = DSDimensions.primitiveSpacing20
        case .medium, .large:
            // Web parity: large currently shares the medium metrics.
            paddingBlock = DSDimensions.primitiveSpacing12
            paddingInline = DSDimensions.primitiveSpacing16
            gap = DSDimensions.primitiveSpacing8
            iconSize = DSDimensions.primitiveSpacing24
        }
        fontSize = DSDimensions.primitiveTypographyFontSize12
        lineHeight = DSDimensions.primitiveTypographyLineHeight16
    }

    var minHeight: CGFloat { iconSize + paddingBlock + paddingBlock }
}

/// Resolved color set for a variant + interaction/disabled state.
private struct DSButtonColors {
    let background: Color
    let foreground: Color
    let border: Color
}

/// `ButtonStyle` that paints the background, border, radius and typography from
/// tokens, and resolves hover/active/disabled states the way the web CSS does.
struct DSButtonStyle: ButtonStyle {
    let variant: DSButtonVariant
    let metrics: DSButtonMetrics
    let isEnabled: Bool
    let isLoading: Bool

    func makeBody(configuration: Configuration) -> some View {
        let colors = resolveColors(isPressed: configuration.isPressed)

        return configuration.label
            .font(.system(size: metrics.fontSize, weight: DSFontWeights.primitiveTypographyFontWeightBold))
            .foregroundColor(colors.foreground)
            .padding(.vertical, metrics.paddingBlock)
            .padding(.horizontal, metrics.paddingInline)
            // HIG: never below the 44pt minimum hit target, even for the small size
            // (whose token metrics paint a 36pt tall pill).
            .frame(minHeight: max(metrics.minHeight, HIG.minimumHitTarget))
            .background(colors.background)
            .overlay(
                Capsule().strokeBorder(colors.border, lineWidth: DSDimensions.primitiveBorderWidthBorderSm)
            )
            .clipShape(Capsule())
            .contentShape(Capsule())
            .animation(.easeOut(duration: 0.16), value: configuration.isPressed)
    }

    private func resolveColors(isPressed: Bool) -> DSButtonColors {
        if !isEnabled {
            return DSButtonColors(
                background: variant == .tertiary ? .clear : DSColors.semanticColorBackgroundNeutralDisabled,
                foreground: DSColors.semanticColorContentNeutralDisabled,
                border: variant == .tertiary ? .clear : DSColors.semanticColorBorderNeutralSubtle
            )
        }

        switch variant {
        case .primary:
            let bg = isPressed
                ? DSColors.semanticColorContentNeutralStrong
                : DSColors.semanticColorContentNeutralDefault
            return DSButtonColors(
                background: bg,
                foreground: DSColors.semanticColorBackgroundNeutralDefault,
                border: bg
            )
        case .secondary:
            let bg = isPressed
                ? DSColors.semanticColorActionBrandActive
                : DSColors.semanticColorActionBrandDefault
            return DSButtonColors(
                background: bg,
                foreground: DSColors.semanticColorBackgroundNeutralDefault,
                border: bg
            )
        case .tertiary:
            let bg = isPressed
                ? DSColors.semanticColorBackgroundNeutralActive
                : Color.clear
            return DSButtonColors(
                background: bg,
                foreground: DSColors.semanticColorContentNeutralDefault,
                border: .clear
            )
        }
    }
}

/// Indeterminate spinner shown in the loading state.
///
/// Web parity: the spinner is a 3/4 ring in `currentColor` — i.e. the button's own
/// foreground/text color. Using `.stroke(style:)` without an explicit color lets the
/// ring inherit the `DSButtonStyle` foreground, so it matches the label on every
/// variant (light on primary/secondary, dark on tertiary). Sized to the button's
/// per-size icon dimension.
struct DSButtonSpinner: View {
    let size: CGFloat
    @State private var spinning = false

    var body: some View {
        Circle()
            .trim(from: 0, to: 0.75)
            .stroke(style: StrokeStyle(lineWidth: DSDimensions.primitiveBorderWidthBorderMd, lineCap: .round))
            .frame(width: size, height: size)
            .rotationEffect(.degrees(spinning ? 360 : 0))
            .animation(.linear(duration: 0.8).repeatForever(autoreverses: false), value: spinning)
            .onAppear { spinning = true }
            .accessibilityHidden(true)
    }
}
