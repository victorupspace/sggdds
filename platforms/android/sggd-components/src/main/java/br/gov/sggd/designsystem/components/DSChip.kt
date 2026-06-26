package br.gov.sggd.designsystem.components

import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.util.AttributeSet
import android.util.TypedValue
import android.view.Gravity
import android.widget.LinearLayout
import androidx.appcompat.widget.AppCompatTextView
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System chip, Android parity with the React `Chip`.
 *
 * XML: `app:dsLabel`, `app:dsSize` (small/medium), `app:dsVariant` (neutral/brand),
 * `app:dsSelected`.
 */
class DSChip @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : LinearLayout(context, attrs, defStyleAttr) {

    enum class Size { SMALL, MEDIUM }
    enum class Variant { NEUTRAL, BRAND }

    private val labelView = AppCompatTextView(context)

    var size: Size = Size.MEDIUM
        set(value) { field = value; applyStyle() }

    var variant: Variant = Variant.NEUTRAL
        set(value) { field = value; applyStyle() }

    var isSelected2: Boolean = false
        set(value) { field = value; applyStyle() }

    var label: CharSequence
        get() = labelView.text
        set(value) { labelView.text = value }

    init {
        orientation = HORIZONTAL
        gravity = Gravity.CENTER_VERTICAL
        labelView.typeface = Typeface.DEFAULT_BOLD
        addView(labelView)

        context.theme.obtainStyledAttributes(attrs, R.styleable.DSChip, defStyleAttr, 0).use { ta ->
            label = ta.getString(R.styleable.DSChip_dsLabel).orEmpty()
            size = Size.entries[ta.getInt(R.styleable.DSChip_dsChipSize, 1)]
            variant = Variant.entries[ta.getInt(R.styleable.DSChip_dsChipVariant, 0)]
            isSelected2 = ta.getBoolean(R.styleable.DSChip_dsSelected, false)
        }
        applyStyle()
    }

    private fun applyStyle() {
        val fontRes = if (size == Size.SMALL) DsTokens.fontSize12 else DsTokens.fontSize14
        labelView.setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(fontRes))

        val padV = dsDimen(if (size == Size.SMALL) DsTokens.spacing4 else DsTokens.spacing6)
        val padH = dsDimen(if (size == Size.SMALL) DsTokens.spacing8 else DsTokens.spacing12)
        setPadding(padH, padV, padH, padV)

        val bg = when {
            !isEnabled -> dsColor(TokensR.color.ds_semantic_color_background_neutral_disabled)
            isSelected2 && variant == Variant.BRAND -> dsColor(TokensR.color.ds_semantic_color_content_neutral_default)
            isSelected2 -> dsColor(TokensR.color.ds_semantic_color_background_neutral_active)
            else -> dsColor(TokensR.color.ds_semantic_color_background_neutral_default)
        }
        val fg = when {
            !isEnabled -> dsColor(TokensR.color.ds_semantic_color_content_neutral_disabled)
            isSelected2 && variant == Variant.BRAND -> dsColor(TokensR.color.ds_semantic_color_content_neutral_inverse)
            else -> dsColor(TokensR.color.ds_semantic_color_content_neutral_default)
        }
        labelView.setTextColor(fg)

        background = GradientDrawable().apply {
            cornerRadius = dsDimenF(DsTokens.radiusSm)
            setColor(bg)
            if (!isSelected2) {
                setStroke(dsDimen(DsTokens.borderSm), dsColor(TokensR.color.ds_semantic_color_border_neutral_default))
            } else {
                setStroke(0, Color.TRANSPARENT)
            }
        }
    }
}
