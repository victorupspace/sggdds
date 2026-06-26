package br.gov.sggd.designsystem.components

import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.RectF
import android.util.AttributeSet
import android.view.View
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System progress bar (determinate), Android parity with the React
 * `ProgressBar`.
 *
 * XML: `app:dsSize` (sm/md), `app:dsVariant` (brand/neutral/success/error).
 * Set [progress] in 0..100.
 */
class DSProgressBar @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : View(context, attrs, defStyleAttr) {

    enum class Size { SM, MD }
    enum class Variant { BRAND, NEUTRAL, SUCCESS, ERROR }

    var size: Size = Size.MD
        set(value) { field = value; requestLayout() }

    var variant: Variant = Variant.BRAND
        set(value) { field = value; applyColors(); invalidate() }

    /** Progress as a percentage in 0..100. */
    var progress: Float = 0f
        set(value) { field = value.coerceIn(0f, 100f); invalidate() }

    private val trackPaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val fillPaint = Paint(Paint.ANTI_ALIAS_FLAG)
    private val rect = RectF()

    init {
        context.theme.obtainStyledAttributes(attrs, R.styleable.DSProgressBar, defStyleAttr, 0).use { ta ->
            size = Size.entries[ta.getInt(R.styleable.DSProgressBar_dsProgressSize, 1)]
            variant = Variant.entries[ta.getInt(R.styleable.DSProgressBar_dsProgressVariant, 0)]
            progress = ta.getFloat(R.styleable.DSProgressBar_dsProgress, 0f)
        }
        trackPaint.color = dsColor(TokensR.color.ds_semantic_color_background_neutral_active)
        applyColors()
    }

    private fun applyColors() {
        fillPaint.color = dsColor(
            when (variant) {
                // Brand uses the neutral black (same as Button/Checkbox), never the blue.
                Variant.BRAND -> TokensR.color.ds_semantic_color_content_neutral_default
                Variant.NEUTRAL -> TokensR.color.ds_semantic_color_content_neutral_default
                Variant.SUCCESS -> TokensR.color.ds_semantic_color_background_positive_default
                Variant.ERROR -> TokensR.color.ds_semantic_color_content_negative_default
            }
        )
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val h = dsDimen(if (size == Size.SM) DsTokens.spacing4 else DsTokens.spacing8)
        setMeasuredDimension(getDefaultSize(suggestedMinimumWidth, widthMeasureSpec), h)
    }

    override fun onDraw(canvas: Canvas) {
        val radius = height / 2f
        rect.set(0f, 0f, width.toFloat(), height.toFloat())
        canvas.drawRoundRect(rect, radius, radius, trackPaint)
        rect.set(0f, 0f, width * (progress / 100f), height.toFloat())
        canvas.drawRoundRect(rect, radius, radius, fillPaint)
    }
}
