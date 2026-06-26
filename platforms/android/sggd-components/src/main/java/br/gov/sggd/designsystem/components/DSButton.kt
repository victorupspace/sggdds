package br.gov.sggd.designsystem.components

import android.content.Context
import android.content.res.ColorStateList
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.graphics.drawable.RippleDrawable
import android.util.AttributeSet
import android.util.TypedValue
import android.view.Gravity
import android.view.ViewGroup
import androidx.appcompat.widget.AppCompatButton
import androidx.core.content.ContextCompat
import androidx.core.content.res.use
import br.gov.sggd.designsystem.tokens.R as TokensR

/**
 * Government Design System button, Android Views/XML parity with the React `Button`.
 *
 * Supports three variants and three sizes, a loading state, full-width layout and
 * the standard `isEnabled` flag. All colors, spacing, radius, typography and border
 * width come from the generated `sggd-tokens` resources.
 *
 * XML usage:
 * ```xml
 * <br.gov.sggd.designsystem.components.DSButton
 *     android:layout_width="wrap_content"
 *     android:layout_height="wrap_content"
 *     android:text="Enviar"
 *     app:dsVariant="secondary"
 *     app:dsSize="medium" />
 * ```
 */
class DSButton @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0,
) : AppCompatButton(context, attrs, defStyleAttr) {

    enum class Variant { PRIMARY, SECONDARY, TERTIARY }
    enum class Size { SMALL, MEDIUM, LARGE }

    var variant: Variant = Variant.PRIMARY
        set(value) {
            field = value
            applyStyle()
        }

    var size: Size = Size.MEDIUM
        set(value) {
            field = value
            applyStyle()
        }

    var isLoading: Boolean = false
        set(value) {
            field = value
            applyLoadingState()
        }

    var loadingLabel: CharSequence = "Carregando"

    var fullWidth: Boolean = false
        set(value) {
            field = value
            applyFullWidth()
        }

    private var idleText: CharSequence = text

    init {
        context.theme.obtainStyledAttributes(attrs, R.styleable.DSButton, defStyleAttr, 0).use { ta ->
            variant = Variant.entries[ta.getInt(R.styleable.DSButton_dsVariant, Variant.PRIMARY.ordinal)]
            size = Size.entries[ta.getInt(R.styleable.DSButton_dsSize, Size.MEDIUM.ordinal)]
            fullWidth = ta.getBoolean(R.styleable.DSButton_dsFullWidth, false)
            ta.getString(R.styleable.DSButton_dsLoadingLabel)?.let { loadingLabel = it }
            isLoading = ta.getBoolean(R.styleable.DSButton_dsLoading, false)
        }

        isAllCaps = false
        gravity = Gravity.CENTER
        typeface = Typeface.create(typeface, Typeface.BOLD)
        applyStyle()
    }

    private fun dimen(resId: Int): Int = resources.getDimensionPixelSize(resId)

    private fun color(resId: Int): Int = ContextCompat.getColor(context, resId)

    private fun applyStyle() {
        // Typography
        setTextSize(TypedValue.COMPLEX_UNIT_PX, dimen(TokensR.dimen.ds_primitive_typography_font_size_12).toFloat())

        // Size-dependent padding (parity with web size modifiers; large == medium).
        val paddingBlock: Int
        val paddingInline: Int
        when (size) {
            Size.SMALL -> {
                paddingBlock = dimen(TokensR.dimen.ds_primitive_spacing_8)
                paddingInline = dimen(TokensR.dimen.ds_primitive_spacing_10)
            }
            Size.MEDIUM, Size.LARGE -> {
                paddingBlock = dimen(TokensR.dimen.ds_primitive_spacing_12)
                paddingInline = dimen(TokensR.dimen.ds_primitive_spacing_16)
            }
        }
        setPadding(paddingInline, paddingBlock, paddingInline, paddingBlock)

        // Colors resolved per variant + state.
        background = buildBackground()
        setTextColor(buildTextColors())
    }

    /** Background: capsule shape, with disabled/pressed/default colors per variant. */
    private fun buildBackground(): RippleDrawable {
        val radius = dimen(TokensR.dimen.ds_semantic_radius_full).toFloat()
        val borderWidth = dimen(TokensR.dimen.ds_primitive_border_width_border_sm)

        val defaultColor: Int
        val pressedColor: Int
        val borderColor: Int
        when (variant) {
            Variant.PRIMARY -> {
                defaultColor = color(TokensR.color.ds_semantic_color_content_neutral_default)
                pressedColor = color(TokensR.color.ds_semantic_color_content_neutral_strong)
                borderColor = defaultColor
            }
            Variant.SECONDARY -> {
                defaultColor = color(TokensR.color.ds_semantic_color_action_brand_default)
                pressedColor = color(TokensR.color.ds_semantic_color_action_brand_active)
                borderColor = defaultColor
            }
            Variant.TERTIARY -> {
                defaultColor = Color.TRANSPARENT
                pressedColor = color(TokensR.color.ds_semantic_color_background_neutral_active)
                borderColor = Color.TRANSPARENT
            }
        }

        fun capsule(fill: Int, stroke: Int) = GradientDrawable().apply {
            shape = GradientDrawable.RECTANGLE
            cornerRadius = radius
            setColor(fill)
            if (variant != Variant.TERTIARY) setStroke(borderWidth, stroke)
        }

        val disabledFill =
            if (variant == Variant.TERTIARY) Color.TRANSPARENT
            else color(TokensR.color.ds_semantic_color_background_neutral_disabled)
        val disabledStroke =
            if (variant == Variant.TERTIARY) Color.TRANSPARENT
            else color(TokensR.color.ds_semantic_color_border_neutral_subtle)

        val content = android.graphics.drawable.StateListDrawable().apply {
            addState(intArrayOf(-android.R.attr.state_enabled), capsule(disabledFill, disabledStroke))
            addState(intArrayOf(android.R.attr.state_pressed), capsule(pressedColor, pressedColor))
            addState(intArrayOf(), capsule(defaultColor, borderColor))
        }

        return RippleDrawable(ColorStateList.valueOf(pressedColor), content, null)
    }

    private fun buildTextColors(): ColorStateList {
        val enabled = when (variant) {
            Variant.PRIMARY, Variant.SECONDARY -> color(TokensR.color.ds_semantic_color_background_neutral_default)
            Variant.TERTIARY -> color(TokensR.color.ds_semantic_color_content_neutral_default)
        }
        val disabled = color(TokensR.color.ds_semantic_color_content_neutral_disabled)
        return ColorStateList(
            arrayOf(intArrayOf(-android.R.attr.state_enabled), intArrayOf()),
            intArrayOf(disabled, enabled),
        )
    }

    private fun applyLoadingState() {
        if (isLoading) {
            idleText = text
            text = loadingLabel
            isEnabled = false
            isClickable = false
        } else {
            text = idleText
            isEnabled = true
            isClickable = true
        }
    }

    private fun applyFullWidth() {
        val params = layoutParams
        if (params != null) {
            params.width = if (fullWidth) ViewGroup.LayoutParams.MATCH_PARENT
            else ViewGroup.LayoutParams.WRAP_CONTENT
            layoutParams = params
        }
    }

    override fun setText(text: CharSequence?, type: BufferType?) {
        super.setText(text, type)
        if (!isLoading && text != null) {
            idleText = text
        }
    }
}
