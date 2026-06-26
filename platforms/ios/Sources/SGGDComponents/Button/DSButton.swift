import SwiftUI
import SGGDTokens

/// Visual variant of ``DSButton``. Mirrors the web `variant` prop.
public enum DSButtonVariant {
    case primary
    case secondary
    case tertiary
}

/// Size of ``DSButton``. Mirrors the web `size` prop.
public enum DSButtonSize {
    case small
    case medium
    case large
}

/// Government Design System button, SwiftUI parity with the React `Button`.
///
/// Supports three variants, three sizes, leading/trailing icons, a loading
/// state and the system `.disabled(_:)` modifier. All colors, spacing, radius,
/// typography and border width come from generated `SGGDTokens`.
public struct DSButton<Label: View>: View {
    private let variant: DSButtonVariant
    private let size: DSButtonSize
    private let isLoading: Bool
    private let fullWidth: Bool
    private let loadingLabel: String
    private let action: () -> Void
    private let label: () -> Label
    private let iconStart: AnyView?
    private let iconEnd: AnyView?

    @Environment(\.isEnabled) private var isEnabled

    public init(
        variant: DSButtonVariant = .primary,
        size: DSButtonSize = .medium,
        isLoading: Bool = false,
        fullWidth: Bool = false,
        loadingLabel: String = "Carregando",
        iconStart: AnyView? = nil,
        iconEnd: AnyView? = nil,
        action: @escaping () -> Void,
        @ViewBuilder label: @escaping () -> Label
    ) {
        self.variant = variant
        self.size = size
        self.isLoading = isLoading
        self.fullWidth = fullWidth
        self.loadingLabel = loadingLabel
        self.iconStart = iconStart
        self.iconEnd = iconEnd
        self.action = action
        self.label = label
    }

    public var body: some View {
        Button(action: action) {
            HStack(spacing: metrics.gap) {
                if isLoading {
                    DSButtonSpinner(size: metrics.iconSize)
                } else if let iconStart {
                    icon(iconStart)
                }

                if isLoading {
                    Text(loadingLabel).lineLimit(nil)
                } else {
                    label()
                }

                if !isLoading, let iconEnd {
                    icon(iconEnd)
                }
            }
            .frame(maxWidth: fullWidth ? .infinity : nil)
        }
        .buttonStyle(
            DSButtonStyle(
                variant: variant,
                metrics: metrics,
                isEnabled: isEnabled,
                isLoading: isLoading
            )
        )
        // Loading is non-interactive, matching aria-busy + aria-disabled on web.
        .disabled(isLoading)
        .accessibilityLabel(isLoading ? Text(loadingLabel) : Text(""))
    }

    private func icon(_ view: AnyView) -> some View {
        view
            .frame(width: metrics.iconSize, height: metrics.iconSize)
    }

    private var metrics: DSButtonMetrics { DSButtonMetrics(size: size) }
}

// MARK: - Convenience initializer for plain text labels

extension DSButton where Label == Text {
    public init(
        _ title: String,
        variant: DSButtonVariant = .primary,
        size: DSButtonSize = .medium,
        isLoading: Bool = false,
        fullWidth: Bool = false,
        loadingLabel: String = "Carregando",
        iconStart: AnyView? = nil,
        iconEnd: AnyView? = nil,
        action: @escaping () -> Void
    ) {
        self.init(
            variant: variant,
            size: size,
            isLoading: isLoading,
            fullWidth: fullWidth,
            loadingLabel: loadingLabel,
            iconStart: iconStart,
            iconEnd: iconEnd,
            action: action,
            label: { Text(title) }
        )
    }
}
