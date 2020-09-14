<?php
/**
 * Mobile menu as drawer
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass     = $attributes['blockClass'] ?? 'drawer';
$drawerPosition = $attributes['drawerPosition'] ?? 'left';
$menu           = $attributes['menu'] ?? '';
$trigger        = $attributes['trigger'] ?? '';
$overlay        = $attributes['overlay'] ?? '';

$classes = Components::classnames([
  $blockClass,
  "js-{$blockClass}",
  "{$blockClass}--{$drawerPosition}",
]);

?>
<div
  class="<?php echo esc_attr( $classes ); ?>"
  data-trigger="<?php echo esc_attr( $trigger ); ?>"
  data-overlay="<?php echo esc_attr( $overlay ); ?>"
>
  <?php echo wp_kses_post( $menu ); ?>
</div>
