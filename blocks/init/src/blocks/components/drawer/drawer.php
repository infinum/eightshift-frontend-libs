<?php

/**
 * Mobile menu as drawer
 *
 * @package EightshiftBoilerplate\Blocks
 *
 */

namespace EightshiftBoilerplate\Blocks;

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$block_class     = $attributes['blockClass'] ?? 'drawer';
$drawer_position = $attributes['drawerPosition'] ?? 'left';
$menu            = $attributes['menu'] ?? '';
$trigger         = $attributes['trigger'] ?? '';
$overlay         = $attributes['overlay'] ?? '';

$classes = Components::classnames([
  $block_class,
  "js-{$block_class}",
  "{$block_class}--{$drawer_position}",
]);

?>
<div
  class="<?php echo esc_attr( $classes ); ?>"
  data-trigger="<?php echo esc_attr( $trigger ); ?>"
  data-overlay="<?php echo esc_attr( $overlay ); ?>"
>
  <?php echo wp_kses_post( $menu ); ?>
</div>
