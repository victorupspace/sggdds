#if DEBUG
import SwiftUI
import SGGDTokens

/// Interactive gallery of every SGGD component — the fastest way to *see* the real
/// SwiftUI components in the Xcode canvas (no demo app required).
///
/// Open this file in Xcode, pick an iOS simulator as the run destination, then open
/// the Canvas (Editor ▸ Canvas, or ⌥⌘⏎) and press “Resume”/“Live”.
public struct SGGDGallery: View {
    @State private var terms = true
    @State private var news = false
    @State private var partial = false
    @State private var radio = "a"
    @State private var notifications = true
    @State private var darkMode = false
    @State private var modalOpen = false

    public init() {}

    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing24) {
                section("Button") {
                    HStack(spacing: DSDimensions.primitiveSpacing8) {
                        DSButton("Primary") {}
                        DSButton("Secondary", variant: .secondary) {}
                        DSButton("Tertiary", variant: .tertiary) {}
                    }
                    HStack(spacing: DSDimensions.primitiveSpacing8) {
                        DSButton("Small", size: .small) {}
                        DSButton("Loading", isLoading: true) {}
                        DSButton("Disabled") {}.disabled(true)
                    }
                }

                section("Checkbox") {
                    DSCheckbox("Aceito os termos", isChecked: $terms)
                    DSCheckbox("Receber novidades", isChecked: $news,
                               hint: "Você pode cancelar a qualquer momento")
                    DSCheckbox("Indeterminado", isChecked: $partial, isIndeterminate: true)
                    DSCheckbox("Desabilitado", isChecked: .constant(false), isDisabled: true)
                }

                section("Radio") {
                    DSRadioGroup(selection: $radio, options: [
                        .init(value: "a", label: "Opção A"),
                        .init(value: "b", label: "Opção B", description: "Com descrição"),
                        .init(value: "c", label: "Opção C", isDisabled: true),
                    ], label: "Escolha uma opção")
                }

                section("Toggle") {
                    DSToggle("Notificações", isOn: $notifications)
                    DSToggle("Modo escuro", isOn: $darkMode, hint: "Aplica o tema escuro")
                }

                section("Chip") {
                    HStack(spacing: DSDimensions.primitiveSpacing8) {
                        DSChip("Neutral")
                        DSChip("Selecionado", variant: .brand, isSelected: true)
                        DSChip("Removível", onRemove: {})
                    }
                }

                section("Link") {
                    DSLink("Link padrão", url: URL(string: "https://gov.br"))
                    DSLink("Link externo", showExternalIcon: true)
                }

                section("Alert") {
                    DSAlert(title: "Sucesso", message: "Operação concluída.", variant: .success)
                    DSAlert(title: "Erro", message: "Algo deu errado.", variant: .error,
                            actions: [DSInlineAction(label: "Tentar de novo") {}], onDismiss: {})
                }

                section("Toast") {
                    DSToast(title: "Salvo", message: "Suas alterações foram salvas.",
                            variant: .positive, onDismiss: {})
                    DSToast(title: "Atualização", message: "Nova versão disponível.",
                            variant: .information)
                }

                section("Spinner") {
                    HStack(spacing: DSDimensions.primitiveSpacing24) {
                        DSSpinner(size: .sm)
                        DSSpinner(size: .md)
                        DSSpinner(size: .lg, label: "Carregando")
                    }
                }

                section("ProgressBar") {
                    DSProgressBar(value: 60, label: "Enviando", showValue: true)
                    DSProgressBar(value: 100, variant: .success, showValue: true)
                    DSProgressBar(mode: .indeterminate, label: "Processando")
                }

                section("Tooltip") {
                    HStack(spacing: DSDimensions.primitiveSpacing24) {
                        DSTooltipBubble("Dica escura", tone: .dark)
                        DSTooltipBubble("Dica clara", tone: .light)
                    }
                }

                section("Modal") {
                    DSButton("Abrir modal") { modalOpen = true }
                }
            }
            .padding(DSDimensions.primitiveSpacing20)
        }
        .background(DSColors.semanticColorBackgroundNeutralPage)
        .dsModal(
            isOpen: $modalOpen,
            title: "Confirmar ação",
            subtitle: "Esta ação não pode ser desfeita.",
            actions: [
                DSModalAction(label: "Cancelar", variant: .tertiary) { modalOpen = false },
                DSModalAction(label: "Confirmar", variant: .primary) { modalOpen = false },
            ]
        ) {
            Text("Conteúdo do modal.")
                .font(.system(size: DSDimensions.primitiveTypographyFontSize14))
                .foregroundColor(DSColors.semanticColorContentNeutralDefault)
        }
    }

    @ViewBuilder
    private func section<Content: View>(_ title: String, @ViewBuilder _ content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: DSDimensions.primitiveSpacing12) {
            Text(title)
                .font(.system(size: DSDimensions.primitiveTypographyFontSize18,
                              weight: DSFontWeights.primitiveTypographyFontWeightBold))
                .foregroundColor(DSColors.semanticColorContentNeutralStrongest)
            content()
            DSDivider(tone: .subtle)
        }
    }
}

struct SGGDGallery_Previews: PreviewProvider {
    static var previews: some View {
        SGGDGallery()
    }
}
#endif
