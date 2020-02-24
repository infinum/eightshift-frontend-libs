<?php

/**
 * Mobile menu as drawer
 *
 * @package Eightshift_Boilerplate\Components
 *
 * @since 1.0.0
 */

use Eightshift_Libs\Menu\Menu;
use Eightshift_Libs\Blocks\Helpers\Components;

$block_class     = $attributes['blockClass'] ?? 'menu-drawer';
$drawer_position = $attributes['drawerPosition'] ?? 'left';
$menu            = $attributes['menu'] ?? '';

$classes = Components::classnames([
  $block_class,
  "js-{$block_class}",
  "{$block_class}--{$drawer_position}",
]);

?>
<div class="<?php echo esc_attr( $classes ); ?>">
  <?php echo $menu; ?>
</div>

