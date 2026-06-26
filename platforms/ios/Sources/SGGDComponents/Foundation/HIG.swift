import SwiftUI

/// Apple Human Interface Guidelines sizing constants and helpers.
///
/// The design tokens describe *visual* sizes (the painted control). HIG describes
/// *interaction* sizes — most importantly the minimum 44×44pt hit target every
/// tappable control must expose, regardless of how small it looks. These helpers
/// keep the token-driven visuals while guaranteeing HIG-compliant touch areas and
/// Dynamic Type behaviour.
public enum HIG {
    /// Minimum recommended hit target for any interactive control (points).
    public static let minimumHitTarget: CGFloat = 44
}

extension View {
    /// Guarantees a HIG-compliant full-width row hit target (≥44pt tall) without
    /// changing the visual height of the content.
    func higRowHitTarget() -> some View {
        frame(minHeight: HIG.minimumHitTarget)
            .contentShape(Rectangle())
    }

    /// Guarantees a HIG-compliant square hit target (≥44×44pt) for icon-only
    /// controls such as close/remove buttons, keeping the glyph at its token size.
    func higIconHitTarget() -> some View {
        frame(minWidth: HIG.minimumHitTarget, minHeight: HIG.minimumHitTarget)
            .contentShape(Rectangle())
    }
}
