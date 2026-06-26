#if DEBUG
import SwiftUI
import SGGDTokens

/// Xcode previews documenting the button states — the SwiftUI parallel to the
/// web Storybook stories (Default, variants, sizes, loading, disabled, icons).
struct DSButton_Previews: PreviewProvider {
    static var previews: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing24) {
                group("Variants") {
                    DSButton("Primary", variant: .primary) {}
                    DSButton("Secondary", variant: .secondary) {}
                    DSButton("Tertiary", variant: .tertiary) {}
                }
                group("Sizes") {
                    DSButton("Small", size: .small) {}
                    DSButton("Medium", size: .medium) {}
                    DSButton("Large", size: .large) {}
                }
                group("States") {
                    DSButton("Loading", isLoading: true) {}
                    DSButton("Disabled") {}.disabled(true)
                    DSButton(
                        "With icon",
                        iconStart: AnyView(Image(systemName: "paperplane.fill").resizable())
                    ) {}
                }
                group("Full width") {
                    DSButton("Full width", fullWidth: true) {}
                }
            }
            .padding(DSDimensions.primitiveSpacing16)
        }
    }

    @ViewBuilder
    private static func group<Content: View>(_ title: String, @ViewBuilder _ content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing8) {
            Text(title).font(.headline)
            content()
        }
    }
}
#endif
