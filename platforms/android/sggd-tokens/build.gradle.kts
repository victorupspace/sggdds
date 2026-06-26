plugins {
    id("com.android.library")
}

android {
    namespace = "br.gov.sggd.designsystem.tokens"
    compileSdk = 34

    defaultConfig {
        minSdk = 24
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
