package br.gov.sggd.designsystem.components

import android.content.Context
import android.util.AttributeSet
import android.view.View
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System divider, Android parity with the React `Divider`.
 *
 * XML: `app:dsOrientation`, `app:dsThickness`, `app:dsTone`.
 */
class DSDivider @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : View(context, attrs, defStyleAttr) {

    enum class Orientation { HORIZONTAL, VERTICAL }
    enum class Thickness { SM, MD, LG }
    enum class Tone { SUBTLE, DEFAULT, STRONG }

    var orientation: Orientation = Orientation.HORIZONTAL
        set(value) { field = value; applyStyle() }

    var thickness: Thickness = Thickness.SM
        set(value) { field = value; applyStyle() }

    var tone: Tone = Tone.DEFAULT
        set(value) { field = value; applyStyle() }

    init {
        context.theme.obtainStyledAttributes(attrs, R.styleable.DSDivider, defStyleAttr, 0).use { ta ->
            orientation = Orientation.entries[ta.getInt(R.styleable.DSDivider_dsOrientation, 0)]
            thickness = Thickness.entries[ta.getInt(R.styleable.DSDivider_dsThickness, 0)]
            tone = Tone.entries[ta.getInt(R.styleable.DSDivider_dsTone, 1)]
        }
        applyStyle()
    }

    private fun applyStyle() {
        val colorRes = when (tone) {
            Tone.SUBTLE -> TokensR.color.ds_semantic_color_border_neutral_subtle
            Tone.DEFAULT -> TokensR.color.ds_semantic_color_border_neutral_default
            Tone.STRONG -> TokensR.color.ds_semantic_color_border_neutral_strong
        }
        setBackgroundColor(dsColor(colorRes))
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val sizeRes = when (thickness) {
            Thickness.SM -> DsTokens.borderSm
            Thickness.MD -> DsTokens.borderMd
            Thickness.LG -> DsTokens.borderLg
        }
        val size = dsDimen(sizeRes)
        if (orientation == Orientation.HORIZONTAL) {
            setMeasuredDimension(getDefaultSize(suggestedMinimumWidth, widthMeasureSpec), size)
        } else {
            setMeasuredDimension(size, getDefaultSize(suggestedMinimumHeight, heightMeasureSpec))
        }
    }
}
