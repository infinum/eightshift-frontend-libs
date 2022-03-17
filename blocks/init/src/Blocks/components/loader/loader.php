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
	<?php echo $manifest['resources']['loader']; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
</div>
