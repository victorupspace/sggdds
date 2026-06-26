package br.gov.sggd.designsystem.components

import android.app.Dialog
import android.content.Context
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.ColorDrawable
import android.graphics.drawable.GradientDrawable
import android.util.TypedValue
import android.view.Gravity
import android.view.ViewGroup
import android.view.Window
import android.widget.LinearLayout
import androidx.appcompat.widget.AppCompatTextView
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System modal, Android parity with the React `Modal`.
 *
 * Wraps a [Dialog] with a token-styled card: title, optional subtitle, body and a
 * footer action row built from [DSButton]s.
 *
 * ```kotlin
 * DSModal(context)
 *     .setTitle("Confirmar")
 *     .setSubtitle("Esta ação não pode ser desfeita.")
 *     .addAction("Cancelar", DSButton.Variant.TERTIARY) { it.dismiss() }
 *     .addAction("Confirmar", DSButton.Variant.PRIMARY) { it.dismiss() }
 *     .show()
 * ```
 */
class DSModal(private val context: Context) {

    enum class Size { SM, MD, LG, FULL }

    private val dialog = Dialog(context)
    private val card = LinearLayout(context).apply { orientation = LinearLayout.VERTICAL }
    private val titleView = AppCompatTextView(context)
    private val subtitleView = AppCompatTextView(context)
    private val body = LinearLayout(context).apply { orientation = LinearLayout.VERTICAL }
    private val footer = LinearLayout(context).apply {
        orientation = LinearLayout.HORIZONTAL
        gravity = Gravity.END
    }
    private var size: Size = Size.MD

    init {
        dialog.requestWindowFeature(Window.FEATURE_NO_TITLE)
        dialog.window?.setBackgroundDrawable(ColorDrawable(0x99000000.toInt()))

        val pad = context.dsDimen(DsTokens.spacing24)
        titleView.typeface = Typeface.DEFAULT_BOLD
        titleView.setTextSize(TypedValue.COMPLEX_UNIT_PX, context.dsDimenF(DsTokens.fontSize24))
        titleView.setTextColor(context.dsColor(TokensR.color.ds_semantic_color_content_neutral_default))

        subtitleView.setTextSize(TypedValue.COMPLEX_UNIT_PX, context.dsDimenF(DsTokens.fontSize14))
        subtitleView.setTextColor(context.dsColor(TokensR.color.ds_semantic_color_content_neutral_muted))
        subtitleView.visibility = LinearLayout.GONE

        card.setPadding(pad, pad, pad, pad)
        card.background = GradientDrawable().apply {
            cornerRadius = context.dsDimenF(DsTokens.radiusLg)
            setColor(context.dsColor(TokensR.color.ds_semantic_color_background_neutral_default))
        }
        card.addView(titleView)
        card.addView(subtitleView)
        card.addView(body, marginTop(DsTokens.spacing16))
        card.addView(footer, marginTop(DsTokens.spacing24))

        dialog.setContentView(card, frameParams())
    }

    fun setTitle(text: CharSequence) = apply { titleView.text = text }

    fun setSubtitle(text: CharSequence?) = apply {
        subtitleView.text = text
        subtitleView.visibility = if (text.isNullOrEmpty()) LinearLayout.GONE else LinearLayout.VISIBLE
    }

    fun setSize(value: Size) = apply { size = value }

    fun addBody(view: android.view.View) = apply { body.addView(view) }

    fun addAction(label: CharSequence, variant: DSButton.Variant, onClick: (DSModal) -> Unit) = apply {
        val button = DSButton(context).apply {
            text = label
            this.variant = variant
            setOnClickListener { onClick(this@DSModal) }
        }
        val lp = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.WRAP_CONTENT,
            LinearLayout.LayoutParams.WRAP_CONTENT,
        ).apply { marginStart = context.dsDimen(DsTokens.spacing8) }
        footer.addView(button, lp)
    }

    fun show() = dialog.show()

    fun dismiss() = dialog.dismiss()

    private fun maxWidthPx(): Int = when (size) {
        Size.SM -> (360 * context.resources.displayMetrics.density).toInt()
        Size.MD -> (480 * context.resources.displayMetrics.density).toInt()
        Size.LG -> (640 * context.resources.displayMetrics.density).toInt()
        Size.FULL -> ViewGroup.LayoutParams.MATCH_PARENT
    }

    private fun frameParams() = ViewGroup.LayoutParams(maxWidthPx(), ViewGroup.LayoutParams.WRAP_CONTENT)

    private fun marginTop(dimen: Int) = LinearLayout.LayoutParams(
        LinearLayout.LayoutParams.MATCH_PARENT,
        LinearLayout.LayoutParams.WRAP_CONTENT,
    ).apply { topMargin = context.dsDimen(dimen) }

    private companion object {
        @Suppress("unused")
        val transparent = Color.TRANSPARENT
    }
}
