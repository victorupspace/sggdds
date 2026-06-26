import SwiftUI
import SGGDTokens

/// Placement of ``DSTooltip``. Mirrors the web `placement` prop.
public enum DSTooltipPlacement {
    case top
    case bottom
    case leading
    case trailing
}

/// Tone of ``DSTooltip``. Mirrors the web `tone` prop.
public enum DSTooltipTone {
    case dark
    case light

    var background: Color {
        self == .dark
            ? DSColors.semanticColorBackgroundNeutralKnockoutDefault
            : DSColors.semanticColorBackgroundNeutralDefault
    }

    var foreground: Color {
        self == .dark
            ? DSColors.semanticColorContentNeutralInverse
            : DSColors.semanticColorContentNeutralDefault
    }
}

/// The tooltip bubble on its own — useful for documentation/previews.
public struct DSTooltipBubble: View {
    private let text: String
    private let tone: DSTooltipTone

    public init(_ text: String, tone: DSTooltipTone = .dark) {
        self.text = text
        self.tone = tone
    }

    public var body: some View {
        Text(text)
            .font(.system(size: DSDimensions.primitiveTypographyFontSize12))
            .foregroundColor(tone.foreground)
            .padding(.vertical, DSDimensions.primitiveSpacing4)
            .padding(.horizontal, DSDimensions.primitiveSpacing8)
            .background(tone.background)
            .overlay(
                RoundedRectangle(cornerRadius: DSDimensions.semanticRadiusSm)
                    .strokeBorder(DSColors.semanticColorBorderNeutralSubtle,
                                  lineWidth: tone == .light ? DSDimensions.primitiveBorderWidthBorderSm : 0)
            )
            .clipShape(RoundedRectangle(cornerRadius: DSDimensions.semanticRadiusSm))
            .shadow(color: Color.black.opacity(0.16), radius: 8, y: 4)
            .fixedSize()
    }
}

/// Government Design System tooltip, SwiftUI parity with the React `Tooltip`.
///
/// Wraps a trigger; tapping it toggles the bubble. Use `placement` to position it.
public struct DSTooltip<Trigger: View>: View {
    private let text: String
    private let tone: DSTooltipTone
    private let placement: DSTooltipPlacement
    private let trigger: () -> Trigger

    @State private var isPresented = false

    public init(
        _ text: String,
        tone: DSTooltipTone = .dark,
        placement: DSTooltipPlacement = .top,
        @ViewBuilder trigger: @escaping () -> Trigger
    ) {
        self.text = text
        self.tone = tone
        self.placement = placement
        self.trigger = trigger
    }

    private var alignment: Alignment {
        switch placement {
        case .top: return .top
        case .bottom: return .bottom
        case .leading: return .leading
        case .trailing: return .trailing
        }
    }

    private var offset: CGSize {
        switch placement {
        case .top: return CGSize(width: 0, height: -44)
        case .bottom: return CGSize(width: 0, height: 44)
        case .leading: return CGSize(width: -120, height: 0)
        case .trailing: return CGSize(width: 120, height: 0)
        }
    }

    public var body: some View {
        trigger()
            .onTapGesture { isPresented.toggle() }
            .overlay(alignment: alignment) {
                if isPresented {
                    DSTooltipBubble(text, tone: tone)
                        .offset(offset)
                        .transition(.opacity)
                        .zIndex(1)
                }
            }
            .animation(.easeOut(duration: 0.12), value: isPresented)
    }
}
