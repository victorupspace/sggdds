import SwiftUI
import SGGDTokens

/// Small, always-present "✕" affordance used by ``DSAlert`` and ``DSToast`` to let
/// the user dismiss the surface. The glyph stays compact (token-sized) while the
/// tappable area is enlarged for comfort.
struct DSDismissButton: View {
    let color: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            Image(systemName: "xmark")
                .font(.system(size: DSDimensions.primitiveTypographyFontSize12, weight: .semibold))
                .foregroundColor(color)
                .padding(DSDimensions.primitiveSpacing4)
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .accessibilityLabel("Fechar")
    }
}
