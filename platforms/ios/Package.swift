// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "SGGDDesignSystem",
    platforms: [
        .iOS(.v15),
        // macOS target lets `swift build`/`swift test` run on the CI host;
        // SwiftUI symbols (Font, Color) need 10.15+.
        .macOS(.v12),
    ],
    products: [
        // Design tokens generated from the shared Style Dictionary pipeline.
        .library(name: "SGGDTokens", targets: ["SGGDTokens"]),
        // SwiftUI component library built on top of the tokens.
        .library(name: "SGGDComponents", targets: ["SGGDComponents"]),
    ],
    targets: [
        .target(
            name: "SGGDTokens",
            path: "Sources/SGGDTokens"
        ),
        .target(
            name: "SGGDComponents",
            dependencies: ["SGGDTokens"],
            path: "Sources/SGGDComponents"
        ),
        .testTarget(
            name: "SGGDComponentsTests",
            dependencies: ["SGGDComponents"],
            path: "Tests/SGGDComponentsTests"
        ),
    ]
)
