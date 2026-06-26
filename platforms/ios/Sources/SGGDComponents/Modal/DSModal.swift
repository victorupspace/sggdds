import SwiftUI
import SGGDTokens

/// Size of ``DSModal``. Mirrors the web `size` prop.
public enum DSModalSize {
    case sm
    case md
    case lg
    case full

    var maxWidth: CGFloat {
        switch self {
        case .sm: return 360
        case .md: return 480
        case .lg: return 640
        case .full: return .infinity
        }
    }
}

/// A button rendered in the ``DSModal`` footer.
public struct DSModalAction: Identifiable {
    public let id = UUID()
    public let label: String
    public let variant: DSButtonVariant
    public let action: () -> Void

    public init(label: String, variant: DSButtonVariant = .primary, action: @escaping () -> Void) {
        self.label = label
        self.variant = variant
        self.action = action
    }
}

/// Government Design System modal, SwiftUI parity with the React `Modal`.
///
/// Use the ``SwiftUICore/View/dsModal(isOpen:title:subtitle:size:actions:content:)``
/// modifier to present it as a dimmed overlay over any view.
public struct DSModal<ModalContent: View>: View {
    @Binding private var isOpen: Bool
    private let title: String
    private let subtitle: String?
    private let size: DSModalSize
    private let actions: [DSModalAction]
    private let content: () -> ModalContent

    public init(
        isOpen: Binding<Bool>,
        title: String,
        subtitle: String?,
        size: DSModalSize,
        actions: [DSModalAction],
        @ViewBuilder content: @escaping () -> ModalContent
    ) {
        self._isOpen = isOpen
        self.title = title
        self.subtitle = subtitle
        self.size = size
        self.actions = actions
        self.content = content
    }

    public var body: some View {
        ZStack {
            DSColors.semanticColorBackgroundNeutralOverlay
                .ignoresSafeArea()
                .onTapGesture { isOpen = false }

            VStack(alignment: .leading, spacing: 0) {
                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing4) {
                        Text(title)
                            .font(.system(size: DSDimensions.primitiveTypographyFontSize24,
                                          weight: DSFontWeights.primitiveTypographyFontWeightBold))
                            .foregroundColor(DSColors.semanticColorContentNeutralDefault)
                        if let subtitle {
                            Text(subtitle)
                                .font(.system(size: DSDimensions.primitiveTypographyFontSize14))
                                .foregroundColor(DSColors.semanticColorContentNeutralMuted)
                        }
                    }
                    Spacer()
                    Button {
                        isOpen = false
                    } label: {
                        Image(systemName: "xmark")
                            .font(.system(size: DSDimensions.primitiveTypographyFontSize16, weight: .bold))
                            .foregroundColor(DSColors.semanticColorContentNeutralMuted)
                            .higIconHitTarget()
                    }
                    .buttonStyle(.plain)
                }
                .padding(DSDimensions.primitiveSpacing24)

                DSDivider()

                content()
                    .padding(DSDimensions.primitiveSpacing24)

                if !actions.isEmpty {
                    DSDivider()
                    HStack(spacing: DSDimensions.primitiveSpacing8) {
                        Spacer()
                        ForEach(actions) { action in
                            DSButton(action.label, variant: action.variant, size: .medium, action: action.action)
                        }
                    }
                    .padding(DSDimensions.primitiveSpacing24)
                }
            }
            .frame(maxWidth: size.maxWidth)
            .background(DSColors.semanticColorBackgroundNeutralDefault)
            .clipShape(RoundedRectangle(cornerRadius: DSDimensions.semanticRadiusLg))
            .shadow(color: Color.black.opacity(0.24), radius: 40, y: 20)
            .padding(DSDimensions.primitiveSpacing24)
        }
    }
}

public extension View {
    /// Presents a ``DSModal`` over the receiver when `isOpen` is true.
    func dsModal<ModalContent: View>(
        isOpen: Binding<Bool>,
        title: String,
        subtitle: String? = nil,
        size: DSModalSize = .md,
        actions: [DSModalAction] = [],
        @ViewBuilder content: @escaping () -> ModalContent
    ) -> some View {
        ZStack {
            self
            if isOpen.wrappedValue {
                DSModal(isOpen: isOpen, title: title, subtitle: subtitle, size: size, actions: actions, content: content)
                    .transition(.opacity)
            }
        }
    }
}
