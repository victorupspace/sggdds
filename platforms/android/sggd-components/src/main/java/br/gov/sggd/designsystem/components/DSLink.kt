package br.gov.sggd.designsystem.components

import android.content.Context
import android.graphics.Paint
import android.util.AttributeSet
import android.util.TypedValue
import androidx.appcompat.widget.AppCompatTextView
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System link, Android parity with the React `Link`.
 *
 * An underlined, token-colored text view. XML: `app:dsVariant`
 * (default/neutral/inverse), `app:dsSize` (small/medium/large).
 */
class DSLink @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : AppCompatTextView(context, attrs, defStyleAttr) {

    enum class Variant { DEFAULT, NEUTRAL, INVERSE }
    enum class Size { SMALL, MEDIUM, LARGE }

    var variant: Variant = Variant.DEFAULT
        set(value) { field = value; applyStyle() }

    var size: Size = Size.MEDIUM
        set(value) { field = value; applyStyle() }

    init {
        paintFlags = paintFlags or Paint.UNDERLINE_TEXT_FLAG
        isClickable = true
        isFocusable = true

        context.theme.obtainStyledAttributes(attrs, R.styleable.DSLink, defStyleAttr, 0).use { ta ->
            variant = Variant.entries[ta.getInt(R.styleable.DSLink_dsLinkVariant, 0)]
            size = Size.entries[ta.getInt(R.styleable.DSLink_dsLinkSize, 1)]
        }
        applyStyle()
    }

    private fun applyStyle() {
        val fontRes = when (size) {
            Size.SMALL -> DsTokens.fontSize14
            Size.MEDIUM -> DsTokens.fontSize16
            Size.LARGE -> DsTokens.fontSize18
        }
        setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(fontRes))

        val colorRes = when {
            !isEnabled -> TokensR.color.ds_semantic_color_content_neutral_disabled
            variant == Variant.DEFAULT -> TokensR.color.ds_semantic_color_action_primary_default
            variant == Variant.NEUTRAL -> TokensR.color.ds_semantic_color_content_neutral_default
            else -> TokensR.color.ds_semantic_color_content_neutral_inverse
        }
        setTextColor(dsColor(colorRes))
    }
}
