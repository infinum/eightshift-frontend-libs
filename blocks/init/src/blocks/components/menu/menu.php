<?php
/**
 * Menu component responsible for rendering and styling just the menu.
 *
 * @package EightshiftBoilerplate\Components
 *
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Menu\Menu;

$block_class        = $attributes['blockClass'] ?? 'menu';
$menu_name          = $attributes['menu'] ?? 'header_main_nav';
$modifier           = $attributes['modifier'] ?? '';
$variation_as_class = isset( $attributes['variation'] ) ? "{$block_class}-{$attributes['variation']}" : $block_class;

echo esc_html( Menu::bem_menu( $menu_name, $variation_as_class, $modifier ? "{$variation_as_class}--{$modifier}" : '' ) );
