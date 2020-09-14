<?php
/**
 * Menu component responsible for rendering and styling just the menu.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Menu\Menu;

$blockClass       = $attributes['blockClass'] ?? 'menu';
$menuName         = $attributes['menu'] ?? 'header_main_nav';
$modifier         = $attributes['modifier'] ?? '';
$variationAsClass = isset( $attributes['variation'] ) ? "{$blockClass}-{$attributes['variation']}" : $blockClass;

echo esc_html( Menu::bemMenu( $menuName, $variationAsClass, $modifier ? "{$variationAsClass}--{$modifier}" : '' ) );
