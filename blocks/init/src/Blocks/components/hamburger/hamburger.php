<?php
/**
 * Template for the Hamburger component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass = $attributes['blockClass'] ?? 'hamburger';

$classes = Components::classnames([
  $blockClass,
  "js-{$blockClass}",
]);
?>

<button class="<?php echo esc_attr( $classes ); ?>">
  <span class="<?php echo esc_attr( $blockClass ); ?>__wrapper">
    <span class="<?php echo esc_attr( $blockClass ); ?>__line <?php echo esc_attr( $blockClass ); ?>__line--1"></span>
    <span class="<?php echo esc_attr( $blockClass ); ?>__line <?php echo esc_attr( $blockClass ); ?>__line--2"></span>
    <span class="<?php echo esc_attr( $blockClass ); ?>__line <?php echo esc_attr( $blockClass ); ?>__line--3"></span>
  </span>
</button>
