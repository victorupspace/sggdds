import XCTest
import SwiftUI
@testable import SGGDComponents
@testable import SGGDTokens

final class DSButtonTests: XCTestCase {
    func testTokensAreGenerated() {
        // Sanity check that the generated token enums are linked and populated.
        XCTAssertEqual(DSDimensions.semanticRadiusFull, 999)
        XCTAssertEqual(DSDimensions.primitiveSpacing16, 16)
        XCTAssertEqual(DSFontWeights.primitiveTypographyFontWeightBold, .bold)
    }

    func testMetricsMatchWebSizes() {
        let small = DSButtonMetrics(size: .small)
        XCTAssertEqual(small.paddingBlock, DSDimensions.primitiveSpacing8)
        XCTAssertEqual(small.paddingInline, DSDimensions.primitiveSpacing10)
        XCTAssertEqual(small.iconSize, DSDimensions.primitiveSpacing20)

        let medium = DSButtonMetrics(size: .medium)
        XCTAssertEqual(medium.paddingInline, DSDimensions.primitiveSpacing16)
        XCTAssertEqual(medium.iconSize, DSDimensions.primitiveSpacing24)

        // Web parity: large shares medium metrics.
        let large = DSButtonMetrics(size: .large)
        XCTAssertEqual(large.iconSize, medium.iconSize)
        XCTAssertEqual(large.paddingInline, medium.paddingInline)
    }

    func testButtonBuildsForAllVariants() {
        for variant in [DSButtonVariant.primary, .secondary, .tertiary] {
            let button = DSButton("Enviar", variant: variant) {}
            XCTAssertNotNil(button.body)
        }
    }
}
