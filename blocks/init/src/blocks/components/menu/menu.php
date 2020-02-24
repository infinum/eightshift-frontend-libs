<?php
/**
 * Menu component responsible for rendering and styling just the menu.
 *
 * @package Eightshift_Boilerplate\Components
 *
 * @since 1.0.0
 */

use Eightshift_Libs\Menu\Menu;

$block_class = $attributes['blockClass'] ?? 'menu';
$menu_name   = $attributes['menu'] ?? 'header_main_nav';
$modifier    = $attributes['modifier'] ?? '';
$variation   = isset( $attributes['variation'] ) ? "{$block_class}-{$variation}" : $block_class;

echo esc_html( Menu::bem_menu( $menu_name, $variation, $modifier ? "{$block_class}--{$modifier}" : '' ) );
