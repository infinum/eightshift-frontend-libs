<?php
/**
 * Template for the Button Component.
 *
 * @since 1.0.0
 * @package Eightshift_Libs\Blocks.
 */

namespace Eightshift_Libs\Blocks;

$block_class   = $attributes['blockClass'] ?? 'hamburger';
$trigger       = $attributes['trigger'] ?? '';
$overlay_class = $attributes['overlayClass'] ?? '';
?>

<button
  data-trigger="<?php echo esc_attr( $trigger ); ?>"
  data-overlay="<?php echo esc_attr( $overlay_class ); ?>"
  class="<?php echo esc_attr( $block_class ); ?> js-<?php echo esc_attr( $block_class ); ?>"
>
  <div class="<?php echo esc_attr( $block_class ); ?>__wrapper">
    <div class="<?php echo esc_attr( $block_class ); ?>__line <?php echo esc_attr( $block_class ); ?>__line--1"></div>
    <div class="<?php echo esc_attr( $block_class ); ?>__line <?php echo esc_attr( $block_class ); ?>__line--2"></div>
    <div class="<?php echo esc_attr( $block_class ); ?>__line <?php echo esc_attr( $block_class ); ?>__line--3"></div>
  </div>
</button>
