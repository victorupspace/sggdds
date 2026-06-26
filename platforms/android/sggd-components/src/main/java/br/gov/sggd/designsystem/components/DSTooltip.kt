package br.gov.sggd.designsystem.components

import android.graphics.drawable.GradientDrawable
import android.util.TypedValue
import android.view.Gravity
import android.view.View
import android.widget.PopupWindow
import androidx.appcompat.widget.AppCompatTextView
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System tooltip, Android parity with the React `Tooltip`.
 *
 * Attaches a token-styled bubble to an anchor view via a [PopupWindow].
 *
 * ```kotlin
 * DSTooltip(anchor, "Mais informações", DSTooltip.Tone.DARK).show()
 * ```
 */
class DSTooltip(
    private val anchor: View,
    private val text: CharSequence,
    private val tone: Tone = Tone.DARK,
    private val placement: Placement = Placement.TOP,
) {
    enum class Tone { DARK, LIGHT }
    enum class Placement { TOP, BOTTOM }

    private var popup: PopupWindow? = null

    fun show() {
        val context = anchor.context
        val bubble = AppCompatTextView(context).apply {
            this.text = this@DSTooltip.text
            setTextSize(TypedValue.COMPLEX_UNIT_PX, context.dsDimenF(DsTokens.fontSize12))
            val padV = context.dsDimen(DsTokens.spacing4)
            val padH = context.dsDimen(DsTokens.spacing8)
            setPadding(padH, padV, padH, padV)
            gravity = Gravity.CENTER

            val isDark = tone == Tone.DARK
            setTextColor(
                context.dsColor(
                    if (isDark) TokensR.color.ds_semantic_color_content_neutral_inverse
                    else TokensR.color.ds_semantic_color_content_neutral_default
                )
            )
            background = GradientDrawable().apply {
                cornerRadius = context.dsDimenF(DsTokens.radiusSm)
                setColor(
                    context.dsColor(
                        if (isDark) TokensR.color.ds_semantic_color_background_neutral_knockout_default
                        else TokensR.color.ds_semantic_color_background_neutral_default
                    )
                )
                if (!isDark) {
                    setStroke(
                        context.dsDimen(DsTokens.borderSm),
                        context.dsColor(TokensR.color.ds_semantic_color_border_neutral_subtle)
                    )
                }
            }
        }

        popup = PopupWindow(bubble, ViewGroupLayoutWrap, ViewGroupLayoutWrap, true).apply {
            elevation = context.dsDimen(DsTokens.spacing8).toFloat()
            bubble.measure(
                View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED),
                View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED),
            )
            val yOffset = if (placement == Placement.TOP) -(anchor.height + bubble.measuredHeight) else 0
            showAsDropDown(anchor, 0, yOffset, Gravity.CENTER_HORIZONTAL)
        }
    }

    fun dismiss() {
        popup?.dismiss()
        popup = null
    }

    private companion object {
        const val ViewGroupLayoutWrap = android.view.ViewGroup.LayoutParams.WRAP_CONTENT
    }
}
