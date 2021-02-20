<?php

/**
 * Menu component responsible for rendering and styling just the menu.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Menu\Menu;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$use = $attributes['use'] ?? true;

if (!$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'menu';

$name = $attributes['menu'] ?? 'header_main_nav';
$modifier = $attributes['modifier'] ?? '';
$linkClasses = $attributes['linkClasses'] ?? '';
$jsModifier = $attributes['jsModifier'] ?? '';
$variation = isset($attributes['variation']) ? "{$componentClass}-{$attributes['variation']}" : $componentClass;

$menu = Menu::bemModifiedMenu(
	$name,
	$variation,
	$linkClasses,
	$jsModifier,
	$modifier ? "{$variation}--{$modifier}" : ''
);

if (!empty($menu) && !$menu) {
	echo $menu; // phpcs:ignore
}
