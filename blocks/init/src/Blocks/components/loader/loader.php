<?php

/**
 * Template for the Loader Component view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$loaderUse = Components::checkAttr('loaderUse', $attributes, $manifest, $componentName);
if (!$loaderUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$loaderUseOverlay = Components::checkAttr('loaderUseOverlay', $attributes, $manifest, $componentName);

$loaderClass = Components::classnames([
	$componentClass,
	Components::selector($loaderUseOverlay, $componentClass, '', 'use-overlay'),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);
?>

<div class="<?php echo esc_attr($loaderClass); ?>">
	<div class="<?php echo esc_attr("{$componentClass}__load"); ?>">
		<div class="<?php echo esc_attr("{$componentClass}__item {$componentClass}__item--1"); ?>"></div>
		<div class="<?php echo esc_attr("{$componentClass}__item {$componentClass}__item--2"); ?>"></div>
		<div class="<?php echo esc_attr("{$componentClass}__item {$componentClass}__item--3"); ?>"></div>
	</div>
</div>
