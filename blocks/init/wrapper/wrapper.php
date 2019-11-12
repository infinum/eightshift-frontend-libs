<?php
/**
 * Template for the Wrapping Advance block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

// Used to add or remove wrapper.
$has_wrapper = $attributes['hasWrapper'] ?? true;

if ( $has_wrapper ) {

  $id = $attributes['id'] ?? '';

  $wrapper_main_class = 'wrapper';

  $style_background_color = isset( $attributes['styleBackgroundColor'] ) && ! empty( $attributes['styleBackgroundColor'] ) ? "{$wrapper_main_class}__bg-color--{$attributes['styleBackgroundColor']}" : '';

  // Large.
  $style_spacing_top_large       = isset( $attributes['styleSpacingTopLarge'] ) ? "{$wrapper_main_class}__spacing-top-large--{$attributes['styleSpacingTopLarge']}" : '';
  $style_spacing_bottom_large    = isset( $attributes['styleSpacingBottomLarge'] ) ? "{$wrapper_main_class}__spacing-bottom-large--{$attributes['styleSpacingBottomLarge']}" : '';
  $style_hide_block_large        = isset( $attributes['styleHideBlockLarge'] ) && $attributes['styleHideBlockLarge'] ? "{$wrapper_main_class}__hide-block-large" : '';
  $style_container_width_large   = isset( $attributes['styleContainerWidthLarge'] ) && ! empty( $attributes['styleContainerWidthLarge'] ) ? "{$wrapper_main_class}__container-width-large--{$attributes['styleContainerWidthLarge']}" : '';
  $style_container_spacing_large = isset( $attributes['styleContainerSpacingLarge'] ) && ! empty( $attributes['styleContainerSpacingLarge'] ) ? "{$wrapper_main_class}__container-spacing-large--{$attributes['styleContainerSpacingLarge']}" : '';
  $style_content_width_large     = isset( $attributes['styleContentWidthLarge'] ) && ! empty( $attributes['styleContentWidthLarge'] ) ? "{$wrapper_main_class}__inner-content-width-large--{$attributes['styleContentWidthLarge']}" : '';
  $style_content_offset_large    = isset( $attributes['styleContentOffsetLarge'] ) && ! empty( $attributes['styleContentOffsetLarge'] ) ? "{$wrapper_main_class}__inner-offset-large--{$attributes['styleContentOffsetLarge']}" : '';

  // Desktop.
  $style_spacing_top_desktop       = isset( $attributes['styleSpacingTopDesktop'] ) ? "{$wrapper_main_class}__spacing-top-desktop--{$attributes['styleSpacingTopDesktop']}" : '';
  $style_spacing_bottom_desktop    = isset( $attributes['styleSpacingBottomDesktop'] ) ? "{$wrapper_main_class}__spacing-bottom-desktop--{$attributes['styleSpacingBottomDesktop']}" : '';
  $style_hide_block_desktop        = isset( $attributes['styleHideBlockDesktop'] ) && $attributes['styleHideBlockDesktop'] ? "{$wrapper_main_class}__hide-block-desktop" : '';
  $style_container_width_desktop   = isset( $attributes['styleContainerWidthDesktop'] ) && ! empty( $attributes['styleContainerWidthDesktop'] ) ? "{$wrapper_main_class}__container-width-desktop--{$attributes['styleContainerWidthDesktop']}" : '';
  $style_container_spacing_desktop = isset( $attributes['styleContainerSpacingDesktop'] ) && ! empty( $attributes['styleContainerSpacingDesktop'] ) ? "{$wrapper_main_class}__container-spacing-desktop--{$attributes['styleContainerSpacingDesktop']}" : '';
  $style_content_width_desktop     = isset( $attributes['styleContentWidthDesktop'] ) && ! empty( $attributes['styleContentWidthDesktop'] ) ? "{$wrapper_main_class}__inner-content-width-desktop--{$attributes['styleContentWidthDesktop']}" : '';
  $style_content_offset_desktop    = isset( $attributes['styleContentOffsetDesktop'] ) && ! empty( $attributes['styleContentOffsetDesktop'] ) ? "{$wrapper_main_class}__inner-offset-desktop--{$attributes['styleContentOffsetDesktop']}" : '';

  // Tablet.
  $style_spacing_top_tablet       = isset( $attributes['styleSpacingTopTablet'] ) ? "{$wrapper_main_class}__spacing-top-tablet--{$attributes['styleSpacingTopTablet']}" : '';
  $style_spacing_bottom_tablet    = isset( $attributes['styleSpacingBottomTablet'] ) ? "{$wrapper_main_class}__spacing-bottom-tablet--{$attributes['styleSpacingBottomTablet']}" : '';
  $style_hide_block_tablet        = isset( $attributes['styleHideBlockTablet'] ) && $attributes['styleHideBlockTablet'] ? "{$wrapper_main_class}__hide-block-tablet" : '';
  $style_container_width_tablet   = isset( $attributes['styleContainerWidthTablet'] ) && ! empty( $attributes['styleContainerWidthTablet'] ) ? "{$wrapper_main_class}__container-width-tablet--{$attributes['styleContainerWidthTablet']}" : '';
  $style_container_spacing_tablet = isset( $attributes['styleContainerSpacingTablet'] ) && ! empty( $attributes['styleContainerSpacingTablet'] ) ? "{$wrapper_main_class}__container-spacing-tablet--{$attributes['styleContainerSpacingTablet']}" : '';
  $style_content_width_tablet     = isset( $attributes['styleContentWidthTablet'] ) && ! empty( $attributes['styleContentWidthTablet'] ) ? "{$wrapper_main_class}__inner-content-width-tablet--{$attributes['styleContentWidthTablet']}" : '';
  $style_content_offset_tablet    = isset( $attributes['styleContentOffsetTablet'] ) && ! empty( $attributes['styleContentOffsetTablet'] ) ? "{$wrapper_main_class}__inner-offset-tablet--{$attributes['styleContentOffsetTablet']}" : '';

  // Mobile.
  $style_spacing_top_mobile       = isset( $attributes['styleSpacingTopMobile'] ) ? "{$wrapper_main_class}__spacing-top-mobile--{$attributes['styleSpacingTopMobile']}" : '';
  $style_spacing_bottom_mobile    = isset( $attributes['styleSpacingBottomMobile'] ) ? "{$wrapper_main_class}__spacing-bottom-mobile--{$attributes['styleSpacingBottomMobile']}" : '';
  $style_hide_block_mobile        = isset( $attributes['styleHideBlockMobile'] ) && $attributes['styleHideBlockMobile'] ? "{$wrapper_main_class}__hide-block-mobile" : '';
  $style_container_width_mobile   = isset( $attributes['styleContainerWidthMobile'] ) && ! empty( $attributes['styleContainerWidthMobile'] ) ? "{$wrapper_main_class}__container-width-mobile--{$attributes['styleContainerWidthMobile']}" : '';
  $style_container_spacing_mobile = isset( $attributes['styleContainerSpacingMobile'] ) && ! empty( $attributes['styleContainerSpacingMobile'] ) ? "{$wrapper_main_class}__container-spacing-mobile--{$attributes['styleContainerSpacingMobile']}" : '';
  $style_content_width_mobile     = isset( $attributes['styleContentWidthMobile'] ) && ! empty( $attributes['styleContentWidthMobile'] ) ? "{$wrapper_main_class}__inner-content-width-mobile--{$attributes['styleContentWidthMobile']}" : '';
  $style_content_offset_mobile    = isset( $attributes['styleContentOffsetMobile'] ) && ! empty( $attributes['styleContentOffsetMobile'] ) ? "{$wrapper_main_class}__inner-offset-mobile--{$attributes['styleContentOffsetMobile']}" : '';


  $wrapper_class = implode(
    ' ',
    [
      $wrapper_main_class,

      $style_background_color,

      // Large.
      $style_spacing_top_large,
      $style_spacing_bottom_large,
      $style_hide_block_large,

      // Desktop.
      $style_spacing_top_desktop,
      $style_spacing_bottom_desktop,
      $style_hide_block_desktop,

      // Tablet.
      $style_spacing_top_tablet,
      $style_spacing_bottom_tablet,
      $style_hide_block_tablet,

      // Mobile.
      $style_spacing_top_mobile,
      $style_spacing_bottom_mobile,
      $style_hide_block_mobile,
    ]
  );

  $wrapper_container_class = implode(
    ' ',
    [
      "{$wrapper_main_class}__container",

      // Large.
      $style_container_width_large,
      $style_container_spacing_large,

      // Desktop.
      $style_container_width_desktop,
      $style_container_spacing_desktop,

      // Tablet.
      $style_container_width_tablet,
      $style_container_spacing_tablet,

      // Mobile.
      $style_container_width_mobile,
      $style_container_spacing_mobile,
    ]
  );

  $wrapper_inner_class = implode(
    ' ',
    [
      "{$wrapper_main_class}__inner",

      // Large.
      $style_content_width_large,
      $style_content_offset_large,

      // Desktop.
      $style_content_width_desktop,
      $style_content_offset_desktop,

      // Tablet.
      $style_content_width_tablet,
      $style_content_offset_tablet,

      // Mobile.
      $style_content_width_mobile,
      $style_content_offset_mobile,
    ]
  );

  ?>
  <div class="<?php echo esc_attr( $wrapper_class ); ?>" id="<?php echo esc_attr( $id ); ?>">
    <div class="<?php echo esc_attr( $wrapper_container_class ); ?>">
      <div class="<?php echo esc_attr( $wrapper_inner_class ); ?>">
        <?php
          $this->render_wrapper_view(
            $template_path,
            $attributes,
            $inner_block_content
          );
        ?>
      </div>
    </div>
  </div>
  <?php
} else {
  $this->render_wrapper_view(
    $template_path,
    $attributes,
    $inner_block_content
  );
}
