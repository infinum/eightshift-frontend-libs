<?php
/**
 * Template for the Hamburger component.
 *
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

use Eightshift_Libs\Helpers\Components;

$block_class = $attributes['blockClass'] ?? 'hamburger';

$classes = Components::classnames([
  $block_class,
  "js-{$block_class}",
]);
?>

<button class="<?php echo esc_attr( $classes ); ?>">
  <span class="<?php echo esc_attr( $block_class ); ?>__wrapper">
    <span class="<?php echo esc_attr( $block_class ); ?>__line <?php echo esc_attr( $block_class ); ?>__line--1"></span>
    <span class="<?php echo esc_attr( $block_class ); ?>__line <?php echo esc_attr( $block_class ); ?>__line--2"></span>
    <span class="<?php echo esc_attr( $block_class ); ?>__line <?php echo esc_attr( $block_class ); ?>__line--3"></span>
  </span>
</button>
