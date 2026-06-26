package br.gov.sggd.designsystem.components

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Path
import android.graphics.RectF
import android.util.AttributeSet
import android.util.TypedValue
import android.view.Gravity
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.widget.AppCompatTextView
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System checkbox, Android parity with the React `Checkbox`.
 *
 * A compound view: a token-drawn box indicator plus a label (and optional hint).
 * XML: `app:dsLabel`, `app:dsHint`, `app:dsChecked`, `app:dsIndeterminate`.
 */
class DSCheckbox @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : LinearLayout(context, attrs, defStyleAttr) {

    private val box = BoxView(context)
    private val labelView = AppCompatTextView(context)
    private val hintView = AppCompatTextView(context)
    private val textColumn = LinearLayout(context).apply { orientation = VERTICAL }

    var isChecked: Boolean = false
        set(value) { field = value; box.invalidate(); onCheckedChange?.invoke(value) }

    var isIndeterminate: Boolean = false
        set(value) { field = value; box.invalidate() }

    var label: CharSequence
        get() = labelView.text
        set(value) { labelView.text = value }

    var hint: CharSequence?
        get() = hintView.text
        set(value) {
            hintView.text = value
            hintView.visibility = if (value.isNullOrEmpty()) GONE else VISIBLE
        }

    var onCheckedChange: ((Boolean) -> Unit)? = null

    init {
        orientation = HORIZONTAL
        gravity = Gravity.TOP

        val boxSize = dsDimen(DsTokens.spacing24)
        box.layoutParams = LayoutParams(boxSize, boxSize).apply {
            marginEnd = dsDimen(DsTokens.spacing8)
        }
        addView(box)

        labelView.applyBody(TokensR.color.ds_semantic_color_content_neutral_default)
        hintView.applyBody(TokensR.color.ds_semantic_color_content_neutral_muted)
        hintView.visibility = GONE
        textColumn.addView(labelView)
        textColumn.addView(hintView)
        addView(textColumn)

        context.theme.obtainStyledAttributes(attrs, R.styleable.DSCheckbox, defStyleAttr, 0).use { ta ->
            label = ta.getString(R.styleable.DSCheckbox_dsLabel).orEmpty()
            hint = ta.getString(R.styleable.DSCheckbox_dsHint)
            isChecked = ta.getBoolean(R.styleable.DSCheckbox_dsChecked, false)
            isIndeterminate = ta.getBoolean(R.styleable.DSCheckbox_dsIndeterminate, false)
        }

        setOnClickListener {
            if (isEnabled) {
                isIndeterminate = false
                isChecked = !isChecked
            }
        }
    }

    private fun TextView.applyBody(colorRes: Int) {
        setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(DsTokens.fontSize14))
        setTextColor(dsColor(colorRes))
    }

    /** The square indicator, drawn from tokens. */
    private inner class BoxView(context: Context) : android.view.View(context) {
        private val fill = Paint(Paint.ANTI_ALIAS_FLAG)
        private val stroke = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE }
        private val mark = Paint(Paint.ANTI_ALIAS_FLAG).apply {
            style = Paint.Style.STROKE
            strokeCap = Paint.Cap.ROUND
            color = dsColor(TokensR.color.ds_semantic_color_content_neutral_inverse)
        }
        private val rect = RectF()
        private val path = Path()

        override fun onDraw(canvas: Canvas) {
            val on = isChecked || isIndeterminate
            val radius = dsDimenF(DsTokens.radiusSm)
            val border = dsDimen(DsTokens.borderMd).toFloat()
            stroke.strokeWidth = border
            mark.strokeWidth = border

            fill.color = dsColor(
                if (on) TokensR.color.ds_semantic_color_content_neutral_default
                else TokensR.color.ds_semantic_color_background_neutral_default
            )
            stroke.color = dsColor(
                if (on) TokensR.color.ds_semantic_color_content_neutral_default
                else TokensR.color.ds_semantic_color_border_neutral_strong
            )

            val inset = border / 2f
            rect.set(inset, inset, width - inset, height - inset)
            canvas.drawRoundRect(rect, radius, radius, fill)
            canvas.drawRoundRect(rect, radius, radius, stroke)

            if (isIndeterminate) {
                canvas.drawLine(width * 0.28f, height / 2f, width * 0.72f, height / 2f, mark)
            } else if (isChecked) {
                path.reset()
                path.moveTo(width * 0.28f, height * 0.52f)
                path.lineTo(width * 0.44f, height * 0.68f)
                path.lineTo(width * 0.74f, height * 0.34f)
                canvas.drawPath(path, mark)
            }
        }
    }

    init {
        box.setBackgroundColor(Color.TRANSPARENT)
    }
}
