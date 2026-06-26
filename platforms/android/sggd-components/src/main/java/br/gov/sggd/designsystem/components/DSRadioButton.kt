package br.gov.sggd.designsystem.components

import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.util.AttributeSet
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.widget.LinearLayout
import androidx.appcompat.widget.AppCompatTextView
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System radio option, Android parity with the React `Radio`.
 *
 * A compound view: a token-drawn circular indicator plus a label and optional
 * description. Group several together and coordinate [isChecked] in the host.
 * XML: `app:dsLabel`, `app:dsDescription`, `app:dsChecked`.
 */
class DSRadioButton @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : LinearLayout(context, attrs, defStyleAttr) {

    private val indicator = Indicator(context)
    private val labelView = AppCompatTextView(context)
    private val descriptionView = AppCompatTextView(context)

    var value: String = ""

    var isChecked: Boolean = false
        set(value) { field = value; indicator.invalidate() }

    var label: CharSequence
        get() = labelView.text
        set(value) { labelView.text = value }

    var onSelected: ((String) -> Unit)? = null

    init {
        orientation = HORIZONTAL
        gravity = Gravity.TOP

        val size = dsDimen(DsTokens.spacing24)
        indicator.layoutParams = LayoutParams(size, size).apply { marginEnd = dsDimen(DsTokens.spacing8) }
        addView(indicator)

        val column = LinearLayout(context).apply { orientation = VERTICAL }
        labelView.setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(DsTokens.fontSize14))
        labelView.setTextColor(dsColor(TokensR.color.ds_semantic_color_content_neutral_default))
        descriptionView.setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(DsTokens.fontSize14))
        descriptionView.setTextColor(dsColor(TokensR.color.ds_semantic_color_content_neutral_muted))
        descriptionView.visibility = GONE
        column.addView(labelView)
        column.addView(descriptionView)
        addView(column)

        context.theme.obtainStyledAttributes(attrs, R.styleable.DSRadioButton, defStyleAttr, 0).use { ta ->
            value = ta.getString(R.styleable.DSRadioButton_dsValue).orEmpty()
            label = ta.getString(R.styleable.DSRadioButton_dsLabel).orEmpty()
            ta.getString(R.styleable.DSRadioButton_dsDescription)?.let {
                descriptionView.text = it
                descriptionView.visibility = VISIBLE
            }
            isChecked = ta.getBoolean(R.styleable.DSRadioButton_dsChecked, false)
        }

        setOnClickListener { if (isEnabled) onSelected?.invoke(value) }
    }

    private inner class Indicator(context: Context) : View(context) {
        private val fill = Paint(Paint.ANTI_ALIAS_FLAG)
        private val stroke = Paint(Paint.ANTI_ALIAS_FLAG).apply { style = Paint.Style.STROKE }
        private val dot = Paint(Paint.ANTI_ALIAS_FLAG)

        override fun onDraw(canvas: Canvas) {
            val border = dsDimen(DsTokens.borderMd).toFloat()
            stroke.strokeWidth = border
            fill.color = dsColor(TokensR.color.ds_semantic_color_background_neutral_default)
            stroke.color = dsColor(
                if (isChecked) TokensR.color.ds_semantic_color_content_neutral_default
                else TokensR.color.ds_semantic_color_border_neutral_strong
            )
            dot.color = dsColor(TokensR.color.ds_semantic_color_content_neutral_default)

            val cx = width / 2f
            val cy = height / 2f
            val radius = (width - border) / 2f
            canvas.drawCircle(cx, cy, radius, fill)
            canvas.drawCircle(cx, cy, radius, stroke)
            if (isChecked) {
                canvas.drawCircle(cx, cy, width * 0.25f, dot)
            }
        }
    }
}
