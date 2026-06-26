import SwiftUI
import SGGDTokens

/// Size of ``DSSpinner``. Mirrors the web `size` prop.
public enum DSSpinnerSize {
    case sm
    case md
    case lg

    /// Target diameter from the spacing scale.
    var diameter: CGFloat {
        switch self {
        case .sm: return DSDimensions.primitiveSpacing20
        case .md: return DSDimensions.primitiveSpacing32
        case .lg: return DSDimensions.primitiveSpacing48
        }
    }
}

/// Variant of ``DSSpinner``. Mirrors the web `variant` prop.
public enum DSSpinnerVariant {
    case brand
    case neutral
    case inverse

    var color: Color {
        switch self {
        case .brand: return DSColors.semanticColorActionPrimaryDefault
        case .neutral: return DSColors.semanticColorContentNeutralDefault
        case .inverse: return DSColors.semanticColorContentNeutralInverse
        }
    }
}

/// Government Design System loading spinner, SwiftUI parity with the React `Spinner`.
///
/// HIG: built on the native `ProgressView` activity indicator, so it matches the
/// platform spinner exactly (timing, motion, reduce-motion handling). The token
/// `variant` drives the tint and the token `size` drives the diameter; the native
/// indicator's intrinsic size (~20pt) is scaled to the requested token diameter.
public struct DSSpinner: View {
    private let size: DSSpinnerSize
    private let variant: DSSpinnerVariant
    private let label: String?

    /// Intrinsic diameter of the native circular `ProgressView`.
    private let baselineDiameter = DSDimensions.primitiveSpacing20

    public init(size: DSSpinnerSize = .md, variant: DSSpinnerVariant = .brand, label: String? = nil) {
        self.size = size
        self.variant = variant
        self.label = label
    }

    public var body: some View {
        VStack(spacing: DSDimensions.primitiveSpacing8) {
            ProgressView()
                .progressViewStyle(.circular)
                .tint(variant.color)
                .scaleEffect(size.diameter / baselineDiameter)
                .frame(width: size.diameter, height: size.diameter)

            if let label {
                Text(label)
                    .font(.system(size: DSDimensions.primitiveTypographyFontSize14))
                    .foregroundColor(DSColors.semanticColorContentNeutralSubtle)
            }
        }
        .accessibilityElement()
        .accessibilityLabel(label ?? "Carregando")
    }
}
