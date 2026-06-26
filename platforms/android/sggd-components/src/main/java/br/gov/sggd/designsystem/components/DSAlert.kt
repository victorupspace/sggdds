package br.gov.sggd.designsystem.components

import android.content.Context
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.util.AttributeSet
import android.util.TypedValue
import android.view.Gravity
import android.widget.LinearLayout
import androidx.appcompat.widget.AppCompatTextView
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System alert, Android parity with the React `Alert`.
 *
 * XML: `app:dsTitle`, `app:dsMessage`, `app:dsVariant`
 * (information/success/warning/error/critical).
 */
class DSAlert @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : LinearLayout(context, attrs, defStyleAttr) {

    enum class Variant { INFORMATION, SUCCESS, WARNING, ERROR, CRITICAL }

    private val titleView = AppCompatTextView(context)
    private val messageView = AppCompatTextView(context)
    private val closeView = closeAffordance(context, TokensR.color.ds_semantic_color_content_neutral_high)

    /** Invoked when the user taps the close affordance (after the banner hides). */
    var onDismiss: (() -> Unit)? = null

    var variant: Variant = Variant.INFORMATION
        set(value) { field = value; applyStyle() }

    var title: CharSequence
        get() = titleView.text
        set(value) { titleView.text = value }

    var message: CharSequence?
        get() = messageView.text
        set(value) {
            messageView.text = value
            messageView.visibility = if (value.isNullOrEmpty()) GONE else VISIBLE
        }

    init {
        orientation = VERTICAL
        // Compact, elegant inline banner: tight vertical rhythm, not a chunky card.
        val padV = dsDimen(DsTokens.spacing10)
        val padH = dsDimen(DsTokens.spacing12)
        setPadding(padH, padV, padH, padV)

        titleView.typeface = Typeface.DEFAULT_BOLD
        titleView.setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(DsTokens.fontSize14))
        titleView.setTextColor(dsColor(TokensR.color.ds_semantic_color_content_neutral_strongest))

        // Header row: title + always-present close button aligned to the title.
        val header = LinearLayout(context).apply {
            orientation = HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
        }
        header.addView(titleView, LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f))
        header.addView(closeView)
        addView(header)

        messageView.setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(DsTokens.fontSize12))
        messageView.setTextColor(dsColor(TokensR.color.ds_semantic_color_content_neutral_high))
        messageView.visibility = GONE
        addView(messageView)

        closeView.setOnClickListener {
            visibility = GONE
            onDismiss?.invoke()
        }

        context.theme.obtainStyledAttributes(attrs, R.styleable.DSAlert, defStyleAttr, 0).use { ta ->
            variant = Variant.entries[ta.getInt(R.styleable.DSAlert_dsAlertVariant, 0)]
            title = ta.getString(R.styleable.DSAlert_dsTitle).orEmpty()
            message = ta.getString(R.styleable.DSAlert_dsMessage)
        }
        applyStyle()
    }

    private fun applyStyle() {
        val (bg, border) = when (variant) {
            Variant.INFORMATION -> TokensR.color.ds_semantic_color_background_information_subtle to
                TokensR.color.ds_semantic_color_border_information_subtle
            Variant.SUCCESS -> TokensR.color.ds_semantic_color_background_positive_subtle to
                TokensR.color.ds_semantic_color_border_positive_subtle
            Variant.WARNING -> TokensR.color.ds_semantic_color_background_notice_subtle to
                TokensR.color.ds_semantic_color_border_notice_subtle
            Variant.ERROR -> TokensR.color.ds_semantic_color_background_negative_subtle to
                TokensR.color.ds_semantic_color_border_negative_subtle
            Variant.CRITICAL -> TokensR.color.ds_semantic_color_background_negative_subtle to
                TokensR.color.ds_semantic_color_border_negative_default
        }
        background = GradientDrawable().apply {
            cornerRadius = dsDimenF(DsTokens.radiusMd)
            setColor(dsColor(bg))
            setStroke(dsDimen(DsTokens.borderSm), dsColor(border))
        }
    }
}
