<?php

/**
 * Template for the Loader Component view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$loaderUse = Components::checkAttr('loaderUse', $attributes, $manifest);
if (!$loaderUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$loaderUseOverlay = Components::checkAttr('loaderUseOverlay', $attributes, $manifest);

$loaderClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($loaderUseOverlay, $componentClass, '', 'use-overlay'),
]);
?>

<div class="<?php echo esc_attr($loaderClass); ?>">
	<div class="<?php echo esc_attr("{$componentClass}__load"); ?>">
		<div class="<?php echo esc_attr("{$componentClass}__item {$componentClass}__item--1"); ?>"></div>
		<div class="<?php echo esc_attr("{$componentClass}__item {$componentClass}__item--2"); ?>"></div>
		<div class="<?php echo esc_attr("{$componentClass}__item {$componentClass}__item--3"); ?>"></div>
	</div>
</div>
