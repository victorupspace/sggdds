import SwiftUI
import SGGDTokens

/// Orientation of ``DSDivider``. Mirrors the web `orientation` prop.
public enum DSDividerOrientation {
    case horizontal
    case vertical
}

/// Thickness of ``DSDivider``. Mirrors the web `thickness` prop.
public enum DSDividerThickness {
    case sm
    case md
    case lg

    var value: CGFloat {
        switch self {
        case .sm: return DSDimensions.primitiveBorderWidthBorderSm
        case .md: return DSDimensions.primitiveBorderWidthBorderMd
        case .lg: return DSDimensions.primitiveBorderWidthBorderLg
        }
    }
}

/// Tone of ``DSDivider``. Mirrors the web `tone` prop.
public enum DSDividerTone {
    case subtle
    case `default`
    case strong

    var color: Color {
        switch self {
        case .subtle: return DSColors.semanticColorBorderNeutralSubtle
        case .default: return DSColors.semanticColorBorderNeutralDefault
        case .strong: return DSColors.semanticColorBorderNeutralStrong
        }
    }
}

/// Government Design System divider, SwiftUI parity with the React `Divider`.
public struct DSDivider: View {
    private let orientation: DSDividerOrientation
    private let thickness: DSDividerThickness
    private let tone: DSDividerTone

    public init(
        orientation: DSDividerOrientation = .horizontal,
        thickness: DSDividerThickness = .sm,
        tone: DSDividerTone = .default
    ) {
        self.orientation = orientation
        self.thickness = thickness
        self.tone = tone
    }

    public var body: some View {
        Rectangle()
            .fill(tone.color)
            .frame(
                width: orientation == .vertical ? thickness.value : nil,
                height: orientation == .horizontal ? thickness.value : nil
            )
            .frame(maxWidth: orientation == .horizontal ? .infinity : nil,
                   maxHeight: orientation == .vertical ? .infinity : nil)
            .accessibilityHidden(true)
    }
}
