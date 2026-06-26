package br.gov.sggd.designsystem.components

import android.content.Context
import android.util.TypedValue
import android.view.View
import androidx.annotation.ColorRes
import androidx.annotation.DimenRes
import androidx.appcompat.widget.AppCompatTextView
import androidx.core.content.ContextCompat
import br.gov.sggd.designsystem.tokens.R as TokensR

/** Shared helpers to read generated design tokens from the `sggd-tokens` module. */

internal fun Context.dsColor(@ColorRes id: Int): Int = ContextCompat.getColor(this, id)

internal fun Context.dsDimen(@DimenRes id: Int): Int = resources.getDimensionPixelSize(id)

internal fun Context.dsDimenF(@DimenRes id: Int): Float = resources.getDimension(id)

/**
 * A compact, always-present "✕" affordance used by [DSAlert] and [DSToast] so the
 * user can dismiss the surface. The glyph stays token-sized; padding enlarges the
 * tappable area for comfort.
 */
internal fun closeAffordance(context: Context, @ColorRes colorRes: Int): AppCompatTextView =
    AppCompatTextView(context).apply {
        text = "✕"
        setTextSize(TypedValue.COMPLEX_UNIT_PX, context.dsDimenF(DsTokens.fontSize16))
        setTextColor(context.dsColor(colorRes))
        val pad = context.dsDimen(DsTokens.spacing4)
        setPadding(pad, pad, pad, pad)
        isClickable = true
        isFocusable = true
        contentDescription = "Fechar"
    }

internal fun View.dsColor(@ColorRes id: Int): Int = context.dsColor(id)

internal fun View.dsDimen(@DimenRes id: Int): Int = context.dsDimen(id)

internal fun View.dsDimenF(@DimenRes id: Int): Float = context.dsDimenF(id)

/** Token references used across the native components, named to match the web layer. */
internal object DsTokens {
    // Radius
    val radiusFull = TokensR.dimen.ds_semantic_radius_full
    val radiusLg = TokensR.dimen.ds_semantic_radius_lg
    val radiusMd = TokensR.dimen.ds_semantic_radius_md
    val radiusSm = TokensR.dimen.ds_semantic_radius_sm

    // Border widths
    val borderSm = TokensR.dimen.ds_primitive_border_width_border_sm
    val borderMd = TokensR.dimen.ds_primitive_border_width_border_md
    val borderLg = TokensR.dimen.ds_primitive_border_width_border_lg

    // Spacing
    val spacing2 = TokensR.dimen.ds_primitive_spacing_2
    val spacing4 = TokensR.dimen.ds_primitive_spacing_4
    val spacing6 = TokensR.dimen.ds_primitive_spacing_6
    val spacing8 = TokensR.dimen.ds_primitive_spacing_8
    val spacing10 = TokensR.dimen.ds_primitive_spacing_10
    val spacing12 = TokensR.dimen.ds_primitive_spacing_12
    val spacing16 = TokensR.dimen.ds_primitive_spacing_16
    val spacing20 = TokensR.dimen.ds_primitive_spacing_20
    val spacing24 = TokensR.dimen.ds_primitive_spacing_24
    val spacing32 = TokensR.dimen.ds_primitive_spacing_32
    val spacing40 = TokensR.dimen.ds_primitive_spacing_40
    val spacing48 = TokensR.dimen.ds_primitive_spacing_48

    // Typography sizes
    val fontSize12 = TokensR.dimen.ds_primitive_typography_font_size_12
    val fontSize14 = TokensR.dimen.ds_primitive_typography_font_size_14
    val fontSize16 = TokensR.dimen.ds_primitive_typography_font_size_16
    val fontSize18 = TokensR.dimen.ds_primitive_typography_font_size_18
    val fontSize24 = TokensR.dimen.ds_primitive_typography_font_size_24
}
