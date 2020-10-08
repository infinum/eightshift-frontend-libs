<?php

/**
 * Menu component responsible for rendering and styling just the menu.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Menu\Menu;

$componentClass = $attributes['componentClass'] ?? 'menu';

$name = $attributes['menu'] ?? 'header_main_nav';
$modifier = $attributes['modifier'] ?? '';
$variation = isset($attributes['variation']) ? "{$componentClass}-{$attributes['variation']}" : $componentClass;

echo esc_html(Menu::bemMenu($name, $variation, $modifier ? "{$variation}--{$modifier}" : ''));
