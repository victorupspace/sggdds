import SwiftUI
import SGGDTokens

/// Size of ``DSChip``. Mirrors the web `size` prop.
public enum DSChipSize {
    case small
    case medium

    var fontSize: CGFloat {
        self == .small ? DSDimensions.primitiveTypographyFontSize12 : DSDimensions.primitiveTypographyFontSize14
    }

    var paddingV: CGFloat {
        self == .small ? DSDimensions.primitiveSpacing4 : DSDimensions.primitiveSpacing6
    }

    var paddingH: CGFloat {
        self == .small ? DSDimensions.primitiveSpacing8 : DSDimensions.primitiveSpacing12
    }
}

/// Variant of ``DSChip``. Mirrors the web `variant` prop.
public enum DSChipVariant {
    case neutral
    case brand
}

/// Government Design System chip, SwiftUI parity with the React `Chip`.
///
/// Supports neutral/brand variants, selected and disabled states and an optional
/// remove action.
public struct DSChip: View {
    private let title: String
    private let size: DSChipSize
    private let variant: DSChipVariant
    private let isSelected: Bool
    private let isDisabled: Bool
    private let onRemove: (() -> Void)?

    public init(
        _ title: String,
        size: DSChipSize = .medium,
        variant: DSChipVariant = .neutral,
        isSelected: Bool = false,
        isDisabled: Bool = false,
        onRemove: (() -> Void)? = nil
    ) {
        self.title = title
        self.size = size
        self.variant = variant
        self.isSelected = isSelected
        self.isDisabled = isDisabled
        self.onRemove = onRemove
    }

    private var background: Color {
        if isDisabled { return DSColors.semanticColorBackgroundNeutralDisabled }
        if isSelected {
            // Brand selection uses the neutral black (same as Button/Checkbox), never the blue.
            return variant == .brand
                ? DSColors.semanticColorContentNeutralDefault
                : DSColors.semanticColorBackgroundNeutralActive
        }
        return DSColors.semanticColorBackgroundNeutralDefault
    }

    private var foreground: Color {
        if isDisabled { return DSColors.semanticColorContentNeutralDisabled }
        if isSelected && variant == .brand { return DSColors.semanticColorContentNeutralInverse }
        return DSColors.semanticColorContentNeutralDefault
    }

    public var body: some View {
        HStack(spacing: DSDimensions.primitiveSpacing4) {
            Text(title)
                .font(.system(size: size.fontSize, weight: DSFontWeights.primitiveTypographyFontWeightBold))
                .foregroundColor(foreground)
            if let onRemove {
                Button(action: onRemove) {
                    Image(systemName: "xmark.circle.fill")
                        .font(.system(size: size.fontSize))
                        .foregroundColor(foreground)
                        // HIG: chips are dense UI, so the glyph stays compact but the
                        // tappable area is enlarged beyond the visual mark.
                        .frame(minWidth: DSDimensions.primitiveSpacing32, minHeight: DSDimensions.primitiveSpacing32)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .disabled(isDisabled)
            }
        }
        .padding(.vertical, size.paddingV)
        .padding(.horizontal, size.paddingH)
        .background(background)
        .overlay(
            RoundedRectangle(cornerRadius: DSDimensions.semanticRadiusSm)
                .strokeBorder(DSColors.semanticColorBorderNeutralDefault,
                              lineWidth: isSelected ? 0 : DSDimensions.primitiveBorderWidthBorderSm)
        )
        .clipShape(RoundedRectangle(cornerRadius: DSDimensions.semanticRadiusSm))
    }
}
