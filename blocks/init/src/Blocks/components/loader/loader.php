<?php

/**
 * Template for the Loader Component view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'loader';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$useOverlay = $attributes['useOverlay'] ?? false;

$loaderClass = Components::classnames([
	$componentClass,
	$useOverlay ? "{$componentClass}--use-overlay" : '',
	$blockClass ? "{$blockClass}__{$selectorClass}" : '',
]);
?>

<div class="<?php echo esc_attr($loaderClass); ?>">
	<div class="<?php echo esc_attr("{$componentClass}__load"); ?>">
		<div class="<?php echo esc_attr("{$componentClass}__item {$componentClass}__item--1"); ?>"></div>
		<div class="<?php echo esc_attr("{$componentClass}__item {$componentClass}__item--2"); ?>"></div>
		<div class="<?php echo esc_attr("{$componentClass}__item {$componentClass}__item--3"); ?>"></div>
	</div>
</div>
