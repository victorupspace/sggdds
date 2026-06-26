import SwiftUI
import SGGDTokens

/// A single option for ``DSRadioGroup``.
public struct DSRadioOption: Identifiable {
    public let id: String
    public let label: String
    public let description: String?
    public let isDisabled: Bool

    public init(value: String, label: String, description: String? = nil, isDisabled: Bool = false) {
        self.id = value
        self.label = label
        self.description = description
        self.isDisabled = isDisabled
    }
}

/// Orientation of ``DSRadioGroup``. Mirrors the web `orientation` prop.
public enum DSRadioGroupOrientation {
    case vertical
    case horizontal
}

/// Government Design System radio group, SwiftUI parity with the React `RadioGroup` + `Radio`.
public struct DSRadioGroup: View {
    private let label: String?
    private let options: [DSRadioOption]
    private let orientation: DSRadioGroupOrientation
    @Binding private var selection: String

    // HIG: Dynamic Type — indicator and labels scale from the token base.
    @ScaledMetric(relativeTo: .body) private var indicatorSize = DSDimensions.primitiveSpacing24
    @ScaledMetric(relativeTo: .body) private var dotSize = DSDimensions.primitiveSpacing12
    @ScaledMetric(relativeTo: .body) private var labelSize = DSDimensions.primitiveTypographyFontSize14

    public init(
        selection: Binding<String>,
        options: [DSRadioOption],
        label: String? = nil,
        orientation: DSRadioGroupOrientation = .vertical
    ) {
        self._selection = selection
        self.options = options
        self.label = label
        self.orientation = orientation
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing8) {
            if let label {
                Text(label)
                    .font(.system(size: DSDimensions.primitiveTypographyFontSize14,
                                  weight: DSFontWeights.primitiveTypographyFontWeightSemiBold))
                    .foregroundColor(DSColors.semanticColorContentNeutralDefault)
            }
            if orientation == .vertical {
                VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing8) {
                    ForEach(options) { row($0) }
                }
            } else {
                HStack(alignment: .top, spacing: DSDimensions.primitiveSpacing24) {
                    ForEach(options) { row($0) }
                }
            }
        }
    }

    @ViewBuilder
    private func row(_ option: DSRadioOption) -> some View {
        let isSelected = selection == option.id
        Button {
            selection = option.id
        } label: {
            // Center the indicator with a single-line label; only top-align when a
            // description wraps the text into a taller block.
            HStack(alignment: option.description == nil ? .center : .top, spacing: DSDimensions.primitiveSpacing8) {
                ZStack {
                    Circle()
                        .fill(DSColors.semanticColorBackgroundNeutralDefault)
                        .frame(width: indicatorSize, height: indicatorSize)
                        .overlay(
                            Circle().strokeBorder(
                                isSelected
                                    ? DSColors.semanticColorContentNeutralDefault
                                    : DSColors.semanticColorBorderNeutralStrong,
                                lineWidth: DSDimensions.primitiveBorderWidthBorderMd)
                        )
                    if isSelected {
                        Circle()
                            .fill(DSColors.semanticColorContentNeutralDefault)
                            .frame(width: dotSize, height: dotSize)
                    }
                }
                VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing2) {
                    Text(option.label)
                        .font(.system(size: labelSize))
                        .foregroundColor(option.isDisabled
                            ? DSColors.semanticColorContentNeutralDisabled
                            : DSColors.semanticColorContentNeutralDefault)
                    if let description = option.description {
                        Text(description)
                            .font(.system(size: labelSize))
                            .foregroundColor(DSColors.semanticColorContentNeutralMuted)
                    }
                }
            }
            .higRowHitTarget()
        }
        .buttonStyle(.plain)
        .disabled(option.isDisabled)
        .accessibilityAddTraits(isSelected ? .isSelected : [])
    }
}
