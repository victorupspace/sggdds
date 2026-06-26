import SwiftUI
import SGGDTokens

/// Government Design System toggle/switch, SwiftUI parity with the React `Toggle`.
///
/// HIG: built on the native SwiftUI `Toggle`, so it inherits the platform-standard
/// switch (≈51×31pt), the full-width row hit target, the spring animation,
/// VoiceOver behaviour and Dynamic Type. The brand identity comes only from the
/// token used as the "on" tint and the token-sized label.
public struct DSToggle: View {
    private let label: String
    private let hint: String?
    private let isDisabled: Bool
    @Binding private var isOn: Bool

    @ScaledMetric(relativeTo: .body) private var labelSize = DSDimensions.primitiveTypographyFontSize16
    @ScaledMetric(relativeTo: .body) private var hintSize = DSDimensions.primitiveTypographyFontSize14

    public init(
        _ label: String,
        isOn: Binding<Bool>,
        hint: String? = nil,
        isDisabled: Bool = false
    ) {
        self.label = label
        self._isOn = isOn
        self.hint = hint
        self.isDisabled = isDisabled
    }

    public var body: some View {
        // The native switch keeps the HIG size/behaviour, but we lay out the label
        // and the switch ourselves (with `labelsHidden`) so the control stays
        // compact instead of stretching across the full row width. Callers who want
        // the full-width "Settings row" look can wrap it in `.frame(maxWidth: .infinity)`.
        HStack(alignment: .center, spacing: DSDimensions.primitiveSpacing12) {
            VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing2) {
                Text(label)
                    .font(.system(size: labelSize, weight: DSFontWeights.primitiveTypographyFontWeightMedium))
                    .foregroundColor(isDisabled
                        ? DSColors.semanticColorContentNeutralDisabled
                        : DSColors.semanticColorContentNeutralDefault)
                if let hint {
                    Text(hint)
                        .font(.system(size: hintSize))
                        .foregroundColor(DSColors.semanticColorContentNeutralMuted)
                }
            }

            Toggle("", isOn: $isOn)
                .labelsHidden()
                .tint(DSColors.semanticColorContentNeutralDefault)
        }
        .fixedSize(horizontal: true, vertical: false)
        .disabled(isDisabled)
    }
}
