package br.gov.sggd.designsystem.components

import android.animation.ValueAnimator
import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.RectF
import android.util.AttributeSet
import android.view.View
import android.view.animation.LinearInterpolator
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System loading spinner, Android parity with the React `Spinner`.
 *
 * XML: `app:dsSize` (small/medium/large), `app:dsVariant` (brand/neutral/inverse).
 */
class DSSpinner @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : View(context, attrs, defStyleAttr) {

    enum class Size { SMALL, MEDIUM, LARGE }
    enum class Variant { BRAND, NEUTRAL, INVERSE }

    var size: Size = Size.MEDIUM
        set(value) { field = value; requestLayout(); invalidate() }

    var variant: Variant = Variant.BRAND
        set(value) { field = value; applyPaint(); invalidate() }

    private val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE }
    private val arc = RectF()
    private var sweepStart = 0f
    private val animator = ValueAnimator.ofFloat(0f, 360f).apply {
        duration = 800
        repeatCount = ValueAnimator.INFINITE
        interpolator = LinearInterpolator()
        addUpdateListener {
            sweepStart = it.animatedValue as Float
            invalidate()
        }
    }

    init {
        context.theme.obtainStyledAttributes(attrs, R.styleable.DSSpinner, defStyleAttr, 0).use { ta ->
            size = Size.entries[ta.getInt(R.styleable.DSSpinner_dsSpinnerSize, 1)]
            variant = Variant.entries[ta.getInt(R.styleable.DSSpinner_dsSpinnerVariant, 0)]
        }
        paint.strokeCap = Paint.Cap.ROUND
        applyPaint()
    }

    private fun diameterRes() = when (size) {
        Size.SMALL -> DsTokens.spacing20
        Size.MEDIUM -> DsTokens.spacing32
        Size.LARGE -> DsTokens.spacing48
    }

    private fun applyPaint() {
        paint.color = dsColor(
            when (variant) {
                Variant.BRAND -> TokensR.color.ds_semantic_color_action_primary_default
                Variant.NEUTRAL -> TokensR.color.ds_semantic_color_content_neutral_default
                Variant.INVERSE -> TokensR.color.ds_semantic_color_content_neutral_inverse
            }
        )
        paint.strokeWidth = dsDimen(if (size == Size.SMALL) DsTokens.borderMd else DsTokens.borderLg).toFloat()
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val d = dsDimen(diameterRes())
        setMeasuredDimension(d, d)
    }

    override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
        val inset = paint.strokeWidth / 2f
        arc.set(inset, inset, w - inset, h - inset)
    }

    override fun onDraw(canvas: Canvas) {
        canvas.drawArc(arc, sweepStart, 270f, false, paint)
    }

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        animator.start()
    }

    override fun onDetachedFromWindow() {
        animator.cancel()
        super.onDetachedFromWindow()
    }
}
