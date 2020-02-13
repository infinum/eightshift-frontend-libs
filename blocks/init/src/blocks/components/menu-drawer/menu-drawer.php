<?php

/**
 * Mobile menu as drawer
 *
 * @package Eightshift_Libs\Layout\Header
 *
 * @since 1.0.0
 */

use Eightshift_Libs\Menu\Menu;
use Eightshift_Libs\Blocks\Helpers\Components;

$block_class     = $attributes['blockClass'] ?? 'menu-drawer';
$menu            = $attributes['menu'] ?? 'header_main_nav';
$drawer_position = $attributes['drawerPosition'] ?? 'left';

$classes = Components::classnames([
  $block_class,
  "js-{$block_class}",
  "{$block_class}--{$drawer_position}",
]);

?>
<div class="<?php echo esc_attr( $classes ); ?>">
  <?php echo esc_html( Menu::bem_menu( $menu, 'menu-drawer-nav', '' ) ); ?>
</div>

