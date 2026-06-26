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
 * Government Design System toast, Android parity with the React `Toast`.
 *
 * A floating notification surface. Drive visibility from the host; this view is
 * presentation-only. XML: `app:dsTitle`, `app:dsMessage`, `app:dsVariant`
 * (brand/neutral/positive/information/notice/negative).
 */
class DSToast @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : LinearLayout(context, attrs, defStyleAttr) {

    enum class Variant { BRAND, NEUTRAL, POSITIVE, INFORMATION, NOTICE, NEGATIVE }

    private val titleView = AppCompatTextView(context)
    private val messageView = AppCompatTextView(context)
    private val closeView = closeAffordance(context, TokensR.color.ds_semantic_color_content_neutral_muted)

    /** Invoked when the user taps the close affordance (after the toast hides). */
    var onDismiss: (() -> Unit)? = null

    var variant: Variant = Variant.NEUTRAL
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
        // Compact, elegant floating surface: tight rhythm and a soft elevation.
        val padV = dsDimen(DsTokens.spacing10)
        val padH = dsDimen(DsTokens.spacing12)
        setPadding(padH, padV, padH, padV)
        elevation = dsDimen(DsTokens.spacing6).toFloat()

        titleView.typeface = Typeface.DEFAULT_BOLD
        titleView.setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(DsTokens.fontSize14))
        titleView.setTextColor(dsColor(TokensR.color.ds_semantic_color_content_neutral_default))

        // Header row: title + always-present close button aligned to the title.
        val header = LinearLayout(context).apply {
            orientation = HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
        }
        header.addView(titleView, LayoutParams(0, LayoutParams.WRAP_CONTENT, 1f))
        header.addView(closeView)
        addView(header)

        messageView.setTextSize(TypedValue.COMPLEX_UNIT_PX, dsDimenF(DsTokens.fontSize12))
        messageView.setTextColor(dsColor(TokensR.color.ds_semantic_color_content_neutral_muted))
        messageView.visibility = GONE
        addView(messageView)

        closeView.setOnClickListener {
            visibility = GONE
            onDismiss?.invoke()
        }

        context.theme.obtainStyledAttributes(attrs, R.styleable.DSToast, defStyleAttr, 0).use { ta ->
            variant = Variant.entries[ta.getInt(R.styleable.DSToast_dsToastVariant, 1)]
            title = ta.getString(R.styleable.DSToast_dsTitle).orEmpty()
            message = ta.getString(R.styleable.DSToast_dsMessage)
        }
        applyStyle()
    }

    private fun applyStyle() {
        val (bg, border) = when (variant) {
            Variant.BRAND -> TokensR.color.ds_semantic_color_background_brand_subtle to
                TokensR.color.ds_semantic_color_border_brand_default
            Variant.NEUTRAL -> TokensR.color.ds_semantic_color_background_neutral_default to
                TokensR.color.ds_semantic_color_border_neutral_default
            Variant.POSITIVE -> TokensR.color.ds_semantic_color_background_positive_subtle to
                TokensR.color.ds_semantic_color_border_positive_default
            Variant.INFORMATION -> TokensR.color.ds_semantic_color_background_information_subtle to
                TokensR.color.ds_semantic_color_border_information_default
            Variant.NOTICE -> TokensR.color.ds_semantic_color_background_notice_subtle to
                TokensR.color.ds_semantic_color_border_notice_default
            Variant.NEGATIVE -> TokensR.color.ds_semantic_color_background_negative_subtle to
                TokensR.color.ds_semantic_color_border_negative_default
        }
        background = GradientDrawable().apply {
            cornerRadius = dsDimenF(DsTokens.radiusMd)
            setColor(dsColor(bg))
            setStroke(dsDimen(DsTokens.borderSm), dsColor(border))
        }
    }
}
