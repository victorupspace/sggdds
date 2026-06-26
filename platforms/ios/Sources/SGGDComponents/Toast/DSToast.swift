import SwiftUI
import SGGDTokens

/// Variant of ``DSToast``. Mirrors the web `variant` prop.
public enum DSToastVariant {
    case brand
    case neutral
    case positive
    case information
    case notice
    case negative

    var background: Color {
        switch self {
        case .brand: return DSColors.semanticColorBackgroundBrandSubtle
        case .neutral: return DSColors.semanticColorBackgroundNeutralDefault
        case .positive: return DSColors.semanticColorBackgroundPositiveSubtle
        case .information: return DSColors.semanticColorBackgroundInformationSubtle
        case .notice: return DSColors.semanticColorBackgroundNoticeSubtle
        case .negative: return DSColors.semanticColorBackgroundNegativeSubtle
        }
    }

    var border: Color {
        switch self {
        case .brand: return DSColors.semanticColorBorderBrandDefault
        case .neutral: return DSColors.semanticColorBorderNeutralDefault
        case .positive: return DSColors.semanticColorBorderPositiveDefault
        case .information: return DSColors.semanticColorBorderInformationDefault
        case .notice: return DSColors.semanticColorBorderNoticeDefault
        case .negative: return DSColors.semanticColorBorderNegativeDefault
        }
    }

    var accent: Color {
        switch self {
        case .brand: return DSColors.semanticColorContentBrandDefault
        case .neutral: return DSColors.semanticColorContentNeutralDefault
        case .positive: return DSColors.semanticColorContentPositiveDefault
        case .information: return DSColors.semanticColorContentInformationDefault
        case .notice: return DSColors.semanticColorContentNoticeDefault
        case .negative: return DSColors.semanticColorContentNegativeDefault
        }
    }

    var symbol: String {
        switch self {
        case .brand, .neutral, .information: return "info.circle.fill"
        case .positive: return "checkmark.circle.fill"
        case .notice: return "exclamationmark.triangle.fill"
        case .negative: return "xmark.circle.fill"
        }
    }
}

/// Government Design System toast, SwiftUI parity with the React `Toast`.
///
/// A floating, dismissible notification. Drive visibility with `isOpen`; auto-dismiss
/// timing is left to the host so the component stays presentation-only.
public struct DSToast: View {
    private let title: String
    private let message: String?
    private let variant: DSToastVariant
    private let showIcon: Bool
    private let actions: [DSInlineAction]
    private let onDismiss: (() -> Void)?

    /// Internal visibility, so the always-present close button can dismiss the
    /// toast on its own.
    @State private var isVisible = true

    public init(
        title: String,
        message: String? = nil,
        variant: DSToastVariant = .neutral,
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
            toast.transition(.opacity)
        }
    }

    private var toast: some View {
        HStack(alignment: .top, spacing: DSDimensions.primitiveSpacing8) {
            if showIcon {
                Image(systemName: variant.symbol)
                    .font(.system(size: DSDimensions.primitiveTypographyFontSize16))
                    .foregroundColor(variant.accent)
                    .accessibilityHidden(true)
            }

            VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing2) {
                // Title row: the close button is always present and aligned to the title.
                HStack(alignment: .center, spacing: DSDimensions.primitiveSpacing8) {
                    Text(title)
                        .font(.system(size: DSDimensions.primitiveTypographyFontSize14,
                                      weight: DSFontWeights.primitiveTypographyFontWeightSemiBold))
                        .foregroundColor(DSColors.semanticColorContentNeutralDefault)
                    Spacer(minLength: DSDimensions.primitiveSpacing8)
                    DSDismissButton(color: DSColors.semanticColorContentNeutralMuted) {
                        withAnimation(.easeOut(duration: 0.15)) { isVisible = false }
                        onDismiss?()
                    }
                }
                if let message {
                    Text(message)
                        .font(.system(size: DSDimensions.primitiveTypographyFontSize12))
                        .foregroundColor(DSColors.semanticColorContentNeutralMuted)
                        .fixedSize(horizontal: false, vertical: true)
                }
                if !actions.isEmpty {
                    HStack(spacing: DSDimensions.primitiveSpacing16) {
                        ForEach(actions) { action in
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
        .shadow(color: Color.black.opacity(0.10), radius: 12, y: 6)
        .accessibilityElement(children: .combine)
    }
}
