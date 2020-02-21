<?php
/**
 * Template for the Hamburger component.
 *
 * @package Eightshift_Boilerplate\Components.
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
  <span class="<?php echo esc_attr( $block_class ); ?>__wrapper">
    <span class="<?php echo esc_attr( $block_class ); ?>__line <?php echo esc_attr( $block_class ); ?>__line--1"></span>
    <span class="<?php echo esc_attr( $block_class ); ?>__line <?php echo esc_attr( $block_class ); ?>__line--2"></span>
    <span class="<?php echo esc_attr( $block_class ); ?>__line <?php echo esc_attr( $block_class ); ?>__line--3"></span>
  </span>
</button>
