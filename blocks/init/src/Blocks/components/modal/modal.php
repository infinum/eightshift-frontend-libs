<?php

/**
 * Template for the Modal Component.
 *
 * @package ModalComponent.
 */

use ModalComponentVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$modalUse = Components::checkAttr('modalUse', $attributes, $manifest);

if (!$modalUse) {
	return;
}

$unique = Components::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';

$modalClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($componentJsClass, $componentJsClass),
]);

?>

<div
	class="<?php echo \esc_attr($modalClass); ?>"
	data-id="<?php echo \esc_attr($unique); ?>"
>
	<?php
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest);
	?>
</div>
