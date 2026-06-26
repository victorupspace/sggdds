import SwiftUI
import SGGDTokens

/// Variant of ``DSLink``. Mirrors the web `variant` prop.
public enum DSLinkVariant {
    case `default`
    case neutral
    case inverse

    var color: Color {
        switch self {
        case .default: return DSColors.semanticColorActionPrimaryDefault
        case .neutral: return DSColors.semanticColorContentNeutralDefault
        case .inverse: return DSColors.semanticColorContentNeutralInverse
        }
    }
}

/// Size of ``DSLink``. Mirrors the web `size` prop.
public enum DSLinkSize {
    case small
    case medium
    case large

    var fontSize: CGFloat {
        switch self {
        case .small: return DSDimensions.primitiveTypographyFontSize14
        case .medium: return DSDimensions.primitiveTypographyFontSize16
        case .large: return DSDimensions.primitiveTypographyFontSize18
        }
    }
}

/// Government Design System link, SwiftUI parity with the React `Link`.
///
/// Renders an underlined, tappable label that opens `url`. Supports variants,
/// sizes, an optional external icon and a disabled state.
public struct DSLink: View {
    private let title: String
    private let url: URL?
    private let variant: DSLinkVariant
    private let size: DSLinkSize
    private let showExternalIcon: Bool
    private let isDisabled: Bool

    @Environment(\.openURL) private var openURL

    public init(
        _ title: String,
        url: URL? = nil,
        variant: DSLinkVariant = .default,
        size: DSLinkSize = .medium,
        showExternalIcon: Bool = false,
        isDisabled: Bool = false
    ) {
        self.title = title
        self.url = url
        self.variant = variant
        self.size = size
        self.showExternalIcon = showExternalIcon
        self.isDisabled = isDisabled
    }

    private var color: Color {
        isDisabled ? DSColors.semanticColorContentNeutralDisabled : variant.color
    }

    public var body: some View {
        Button {
            if let url { openURL(url) }
        } label: {
            HStack(spacing: DSDimensions.primitiveSpacing4) {
                Text(title)
                    .font(.system(size: size.fontSize))
                    .underline()
                if showExternalIcon {
                    Image(systemName: "arrow.up.right")
                        .font(.system(size: size.fontSize * 0.8, weight: .semibold))
                        // HIG: pair an external-link glyph with the SF Symbol scale.
                        .imageScale(.small)
                }
            }
            .foregroundColor(color)
            // HIG: a standalone link exposes the 44pt minimum hit target while the
            // text keeps its leading baseline.
            .frame(minHeight: HIG.minimumHitTarget, alignment: .leading)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .disabled(isDisabled)
        .accessibilityAddTraits(.isLink)
    }
}
