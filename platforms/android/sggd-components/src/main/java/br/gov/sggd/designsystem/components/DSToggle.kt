package br.gov.sggd.designsystem.components

import android.animation.ValueAnimator
import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.RectF
import android.util.AttributeSet
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.widget.LinearLayout
import androidx.appcompat.widget.AppCompatTextView
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System toggle/switch, Android parity with the React `Toggle`.
 *
 * A compound view: a token-drawn switch track + thumb plus a label and optional hint.
 * XML: `app:dsLabel`, `app:dsHint`, `app:dsChecked`.
 */
class DSToggle @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : LinearLayout(context, attrs, defStyleAttr) {

    private val switch = SwitchView(context)
    private val labelView = AppCompatTextView(context)
    private val hintView = AppCompatTextView(context)

    var isChecked: Boolean = false
        set(value) { field = value; switch.animateThumb(); onCheckedChange?.invoke(value) }

    var label: CharSequence
        get() = labelView.text
        set(value) { labelView.text = value }

    var onCheckedChange: ((Boolean) -> Unit)? = null

    init {
        orientation = HORIZONTAL
        gravity = Gravity.TOP

        val trackW = dsDimen(DsTokens.spacing40) + dsDimen(DsTokens.spacing4)
        val trackH = dsDimen(DsTokens.spacing24)
        switch.layoutParams = LayoutParams(trackW, trackH).apply { marginEnd = dsDimen(DsTokens.spacing12) }
        addView(switch)

        val column = LinearLayout(context).apply { orientation = VERTICAL }
        labelView.setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(DsTokens.fontSize16))
        labelView.setTextColor(dsColor(TokensR.color.ds_semantic_color_content_neutral_default))
        hintView.setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(DsTokens.fontSize14))
        hintView.setTextColor(dsColor(TokensR.color.ds_semantic_color_content_neutral_muted))
        hintView.visibility = GONE
        column.addView(labelView)
        column.addView(hintView)
        addView(column)

        context.theme.obtainStyledAttributes(attrs, R.styleable.DSToggle, defStyleAttr, 0).use { ta ->
            label = ta.getString(R.styleable.DSToggle_dsLabel).orEmpty()
            ta.getString(R.styleable.DSToggle_dsHint)?.let {
                hintView.text = it
                hintView.visibility = VISIBLE
            }
            isChecked = ta.getBoolean(R.styleable.DSToggle_dsChecked, false)
        }

        setOnClickListener { if (isEnabled) isChecked = !isChecked }
    }

    private inner class SwitchView(context: Context) : View(context) {
        private val track = Paint(Paint.ANTI_ALIAS_FLAG)
        private val stroke = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE }
        private val thumb = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            color = dsColor(TokensR.color.ds_semantic_color_background_neutral_knockout_default)
            setShadowLayer(4f, 0f, 1f, 0x33000000)
        }
        private val rect = RectF()
        private var progress = 0f

        init { setLayerType(LAYER_TYPE_SOFTWARE, null) }

        fun animateThumb() {
            ValueAnimator.ofFloat(progress, if (isChecked) 1f else 0f).apply {
                duration = 160
                addUpdateListener { progress = it.animatedValue as Float; invalidate() }
            }.start()
        }

        override fun onDraw(canvas: Canvas) {
            val radius = height / 2f
            val border = dsDimen(DsTokens.borderMd).toFloat()
            track.color = dsColor(
                if (isChecked) TokensR.color.ds_semantic_color_content_neutral_default
                else TokensR.color.ds_semantic_color_background_neutral_knockout_default
            )
            rect.set(0f, 0f, width.toFloat(), height.toFloat())
            canvas.drawRoundRect(rect, radius, radius, track)
            if (!isChecked) {
                stroke.strokeWidth = border
                stroke.color = dsColor(TokensR.color.ds_semantic_color_border_neutral_strong)
                val inset = border / 2f
                rect.set(inset, inset, width - inset, height - inset)
                canvas.drawRoundRect(rect, radius, radius, stroke)
            }
            val thumbRadius = height * 0.5f - dsDimen(DsTokens.spacing2)
            val travel = width - height
            val cx = radius + travel * progress
            canvas.drawCircle(cx, height / 2f, thumbRadius, thumb)
        }
    }
}
