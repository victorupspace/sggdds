import SwiftUI
import SGGDTokens

/// Mode of ``DSProgressBar``. Mirrors the web `mode` prop.
public enum DSProgressBarMode {
    case determinate
    case indeterminate
}

/// Size of ``DSProgressBar``. Mirrors the web `size` prop.
public enum DSProgressBarSize {
    case sm
    case md

    var height: CGFloat {
        self == .sm ? DSDimensions.primitiveSpacing4 : DSDimensions.primitiveSpacing8
    }
}

/// Variant of ``DSProgressBar``. Mirrors the web `variant` prop.
public enum DSProgressBarVariant {
    case brand
    case neutral
    case success
    case error

    var color: Color {
        switch self {
        // Brand uses the neutral black (same as Button/Checkbox), never the blue.
        case .brand: return DSColors.semanticColorContentNeutralDefault
        case .neutral: return DSColors.semanticColorContentNeutralDefault
        case .success: return DSColors.semanticColorBackgroundPositiveDefault
        case .error: return DSColors.semanticColorContentNegativeDefault
        }
    }
}

/// Government Design System progress bar, SwiftUI parity with the React `ProgressBar`.
public struct DSProgressBar: View {
    private let value: Double
    private let minValue: Double
    private let maxValue: Double
    private let mode: DSProgressBarMode
    private let size: DSProgressBarSize
    private let variant: DSProgressBarVariant
    private let label: String?
    private let showValue: Bool

    @State private var slide = false

    public init(
        value: Double = 0,
        min: Double = 0,
        max: Double = 100,
        mode: DSProgressBarMode = .determinate,
        size: DSProgressBarSize = .md,
        variant: DSProgressBarVariant = .brand,
        label: String? = nil,
        showValue: Bool = false
    ) {
        self.value = value
        self.minValue = min
        self.maxValue = max
        self.mode = mode
        self.size = size
        self.variant = variant
        self.label = label
        self.showValue = showValue
    }

    private var fraction: Double {
        guard maxValue > minValue else { return 0 }
        return Swift.min(1, Swift.max(0, (value - minValue) / (maxValue - minValue)))
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing8) {
            if label != nil || showValue {
                HStack {
                    if let label {
                        Text(label)
                            .font(.system(size: DSDimensions.primitiveTypographyFontSize14,
                                          weight: DSFontWeights.primitiveTypographyFontWeightMedium))
                            .foregroundColor(DSColors.semanticColorContentNeutralDefault)
                    }
                    Spacer()
                    if showValue && mode == .determinate {
                        Text("\(Int(fraction * 100))%")
                            .font(.system(size: DSDimensions.primitiveTypographyFontSize14))
                            .foregroundColor(DSColors.semanticColorContentNeutralSubtle)
                    }
                }
            }

            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    Capsule().fill(DSColors.semanticColorBackgroundNeutralActive)
                    if mode == .determinate {
                        Capsule()
                            .fill(variant.color)
                            .frame(width: geometry.size.width * fraction)
                    } else {
                        Capsule()
                            .fill(variant.color)
                            .frame(width: geometry.size.width * 0.35)
                            .offset(x: slide ? geometry.size.width * 0.65 : -geometry.size.width * 0.35)
                            .animation(.easeInOut(duration: 1.1).repeatForever(autoreverses: false), value: slide)
                            .onAppear { slide = true }
                    }
                }
            }
            .frame(height: size.height)
        }
        .accessibilityElement()
        .accessibilityLabel(label ?? "Progresso")
        .accessibilityValue(mode == .determinate ? "\(Int(fraction * 100)) por cento" : "Carregando")
    }
}
