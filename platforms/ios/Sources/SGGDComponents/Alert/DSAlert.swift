import SwiftUI
import SGGDTokens

/// Variant of ``DSAlert``. Mirrors the web `variant` prop.
public enum DSAlertVariant {
    case information
    case success
    case warning
    case error
    case critical

    var background: Color {
        switch self {
        case .information: return DSColors.semanticColorBackgroundInformationSubtle
        case .success: return DSColors.semanticColorBackgroundPositiveSubtle
        case .warning: return DSColors.semanticColorBackgroundNoticeSubtle
        case .error, .critical: return DSColors.semanticColorBackgroundNegativeSubtle
        }
    }

    var border: Color {
        switch self {
        case .information: return DSColors.semanticColorBorderInformationSubtle
        case .success: return DSColors.semanticColorBorderPositiveSubtle
        case .warning: return DSColors.semanticColorBorderNoticeSubtle
        case .error: return DSColors.semanticColorBorderNegativeSubtle
        case .critical: return DSColors.semanticColorBorderNegativeDefault
        }
    }

    var accent: Color {
        switch self {
        case .information: return DSColors.semanticColorContentInformationDefault
        case .success: return DSColors.semanticColorContentPositiveDefault
        case .warning: return DSColors.semanticColorContentNoticeDefault
        case .error, .critical: return DSColors.semanticColorContentNegativeDefault
        }
    }

    var symbol: String {
        switch self {
        case .information: return "info.circle.fill"
        case .success: return "checkmark.circle.fill"
        case .warning: return "exclamationmark.triangle.fill"
        case .error: return "xmark.circle.fill"
        case .critical: return "exclamationmark.octagon.fill"
        }
    }
}

/// A button rendered in a ``DSAlert`` / ``DSToast`` action row.
public struct DSInlineAction: Identifiable {
    public let id = UUID()
    public let label: String
    public let action: () -> Void

    public init(label: String, action: @escaping () -> Void) {
        self.label = label
        self.action = action
    }
}

/// Government Design System alert, SwiftUI parity with the React `Alert`.
public struct DSAlert: View {
    private let title: String
    private let message: String?
    private let variant: DSAlertVariant
    private let showIcon: Bool
    private let actions: [DSInlineAction]
    private let onDismiss: (() -> Void)?

    /// Internal visibility, so the always-present close button can dismiss the
    /// banner on its own (parity with the web `defaultVisible`/`onDismiss`).
    @State private var isVisible = true

    public init(
        title: String,
        message: String? = nil,
        variant: DSAlertVariant = .information,
        showIcon: Bool = true,
        actions: [DSInlineAction] = [],
        onDismiss: (() -> Void)? = nil
    ) {
        self.title = title
        self.message = message
        self.variant = variant
        self.showIcon = showIcon
        self.actions = actions
        self.onDismiss = onDismiss
    }

    public var body: some View {
        if isVisible {
            banner.transition(.opacity)
        }
    }

    private var banner: some View {
        HStack(alignment: .top, spacing: DSDimensions.primitiveSpacing8) {
            if showIcon {
                Image(systemName: variant.symbol)
                    .font(.system(size: DSDimensions.primitiveTypographyFontSize14))
                    .foregroundColor(variant.accent)
                    .accessibilityHidden(true)
            }

            VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing2) {
                // Title row: the close button is always present and aligned to the title.
                HStack(alignment: .center, spacing: DSDimensions.primitiveSpacing8) {
                    Text(title)
                        .font(.system(size: DSDimensions.primitiveTypographyFontSize14,
                                      weight: DSFontWeights.primitiveTypographyFontWeightSemiBold))
                        .foregroundColor(DSColors.semanticColorContentNeutralStrongest)
                    Spacer(minLength: DSDimensions.primitiveSpacing8)
                    DSDismissButton(color: DSColors.semanticColorContentNeutralHigh) {
                        withAnimation(.easeOut(duration: 0.15)) { isVisible = false }
                        onDismiss?()
                    }
                }
                if let message {
                    Text(message)
                        .font(.system(size: DSDimensions.primitiveTypographyFontSize12))
                        .foregroundColor(DSColors.semanticColorContentNeutralHigh)
                        .fixedSize(horizontal: false, vertical: true)
                }
                if !actions.isEmpty {
                    HStack(spacing: DSDimensions.primitiveSpacing16) {
                        ForEach(actions) { action in
                            // Inline, compact text actions — secondary affordances, not
                            // 44pt CTAs, to keep the banner low and elegant.
                            Button(action.label, action: action.action)
                                .font(.system(size: DSDimensions.primitiveTypographyFontSize12,
                                              weight: DSFontWeights.primitiveTypographyFontWeightSemiBold))
                                .foregroundColor(variant.accent)
                                .buttonStyle(.plain)
                                .contentShape(Rectangle())
                        }
                    }
                    .padding(.top, DSDimensions.primitiveSpacing2)
                }
            }
        }
        .padding(.vertical, DSDimensions.primitiveSpacing10)
        .padding(.horizontal, DSDimensions.primitiveSpacing12)
        .background(variant.background)
        .overlay(
            RoundedRectangle(cornerRadius: DSDimensions.semanticRadiusMd)
                .strokeBorder(variant.border, lineWidth: DSDimensions.primitiveBorderWidthBorderSm)
        )
        .clipShape(RoundedRectangle(cornerRadius: DSDimensions.semanticRadiusMd))
        .accessibilityElement(children: .combine)
    }
}
