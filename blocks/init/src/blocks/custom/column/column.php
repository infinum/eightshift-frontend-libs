<?php
/**
 * Template for the Column Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$block_class = $attributes['blockClass'] ?? '';

// Large.
$width_large  = isset( $attributes['widthLarge'] ) ? "{$block_class}__width-large--{$attributes['widthLarge']}" : '';
$offset_large = isset( $attributes['offsetLarge'] ) ? "{$block_class}__offset-large--{$attributes['offsetLarge']}" : '';
$hide_large   = isset( $attributes['hideLarge'] ) && $attributes['hideLarge'] ? "{$block_class}__hide-large" : '';

// Desktop.
$width_desktop  = isset( $attributes['widthDesktop'] ) ? "{$block_class}__width-desktop--{$attributes['widthDesktop']}" : '';
$offset_desktop = isset( $attributes['offsetDesktop'] ) ? "{$block_class}__offset-desktop--{$attributes['offsetDesktop']}" : '';
$hide_desktop   = isset( $attributes['hideDesktop'] ) && $attributes['hideDesktop'] ? "{$block_class}__hide-desktop" : '';

// Tablet.
$width_tablet  = isset( $attributes['widthTablet'] ) ? "{$block_class}__width-tablet--{$attributes['widthTablet']}" : '';
$offset_tablet = isset( $attributes['offsetTablet'] ) ? "{$block_class}__offset-tablet--{$attributes['offsetTablet']}" : '';
$hide_tablet   = isset( $attributes['hideTablet'] ) && $attributes['hideTablet'] ? "{$block_class}__hide-tablet" : '';

// Mobile.
$width_mobile  = isset( $attributes['widthMobile'] ) ? "{$block_class}__width-mobile--{$attributes['widthMobile']}" : '';
$offset_mobile = isset( $attributes['offsetMobile'] ) ? "{$block_class}__offset-mobile--{$attributes['offsetMobile']}" : '';
$hide_mobile   = isset( $attributes['hideMobile'] ) && $attributes['hideMobile'] ? "{$block_class}__hide-mobile" : '';

$component_class = implode(
  ' ',
  [
    $block_class,

    // Large.
    $width_large,
    $hide_large,
    $offset_large,

    // Desktop.
    $width_desktop,
    $hide_desktop,
    $offset_desktop,

    // Tablet.
    $width_tablet,
    $hide_tablet,
    $offset_tablet,

    // Mobile.
    $width_mobile,
    $hide_mobile,
    $offset_mobile,
  ]
);

?>

<div class="<?php echo \esc_attr( $component_class ); ?>">
  <?php echo \wp_kses_post( $inner_block_content ); ?>
</div>
