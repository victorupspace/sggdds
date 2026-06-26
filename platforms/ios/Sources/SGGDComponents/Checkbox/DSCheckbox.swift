import SwiftUI
import SGGDTokens

/// Government Design System checkbox, SwiftUI parity with the React `Checkbox`.
///
/// Supports checked, indeterminate and disabled states, plus an optional hint.
public struct DSCheckbox: View {
    private let label: String
    private let hint: String?
    private let isIndeterminate: Bool
    private let isDisabled: Bool
    @Binding private var isChecked: Bool

    // HIG: Dynamic Type — the box and text scale relative to the body text style,
    // starting from the token base value.
    @ScaledMetric(relativeTo: .body) private var boxSize = DSDimensions.primitiveSpacing24
    @ScaledMetric(relativeTo: .body) private var labelSize = DSDimensions.primitiveTypographyFontSize14

    public init(
        _ label: String,
        isChecked: Binding<Bool>,
        hint: String? = nil,
        isIndeterminate: Bool = false,
        isDisabled: Bool = false
    ) {
        self.label = label
        self._isChecked = isChecked
        self.hint = hint
        self.isIndeterminate = isIndeterminate
        self.isDisabled = isDisabled
    }

    private var borderColor: Color {
        if isDisabled { return DSColors.semanticColorBorderNeutralSubtle }
        return (isChecked || isIndeterminate)
            ? DSColors.semanticColorContentNeutralDefault
            : DSColors.semanticColorBorderNeutralStrong
    }

    private var fillColor: Color {
        if isDisabled { return DSColors.semanticColorBackgroundNeutralDisabled }
        return (isChecked || isIndeterminate)
            ? DSColors.semanticColorContentNeutralDefault
            : DSColors.semanticColorBackgroundNeutralDefault
    }

    public var body: some View {
        Button {
            isChecked.toggle()
        } label: {
            // Center the box with a single-line label; only top-align when a hint
            // wraps the text into a taller block.
            HStack(alignment: hint == nil ? .center : .top, spacing: DSDimensions.primitiveSpacing8) {
                ZStack {
                    RoundedRectangle(cornerRadius: DSDimensions.semanticRadiusSm)
                        .fill(fillColor)
                        .frame(width: boxSize, height: boxSize)
                        .overlay(
                            RoundedRectangle(cornerRadius: DSDimensions.semanticRadiusSm)
                                .strokeBorder(borderColor, lineWidth: DSDimensions.primitiveBorderWidthBorderMd)
                        )
                    if isIndeterminate {
                        Rectangle()
                            .fill(DSColors.semanticColorContentNeutralInverse)
                            .frame(width: boxSize * 0.5, height: DSDimensions.primitiveBorderWidthBorderMd)
                    } else if isChecked {
                        Image(systemName: "checkmark")
                            .font(.system(size: boxSize * 0.55, weight: .bold))
                            .foregroundColor(DSColors.semanticColorContentNeutralInverse)
                    }
                }

                VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing2) {
                    Text(label)
                        .font(.system(size: labelSize))
                        .foregroundColor(isDisabled
                            ? DSColors.semanticColorContentNeutralDisabled
                            : DSColors.semanticColorContentNeutralDefault)
                    if let hint {
                        Text(hint)
                            .font(.system(size: labelSize))
                            .foregroundColor(DSColors.semanticColorContentNeutralMuted)
                    }
                }
            }
            .higRowHitTarget()
        }
        .buttonStyle(.plain)
        .disabled(isDisabled)
        .accessibilityAddTraits(isChecked ? .isSelected : [])
    }
}
