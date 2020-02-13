<?php
/**
 * Main header-plain bar
 *
 * @package Eightshift_Libs\Layout\Header
 *
 * @since 1.0.0
 */

use Eightshift_Libs\Menu\Menu;

$block_class = $attributes['blockClass'] ?? 'menu';
$menu_name   = $attributes['menu'] ?? 'header_main_nav';

echo esc_html( Menu::bem_menu( $menu_name, $block_class, '' ) );
