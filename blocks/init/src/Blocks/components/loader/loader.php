<?php

/**
 * Template for the Loader Component view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$loaderUse = Helpers::checkAttr('loaderUse', $attributes, $manifest);

if (!$loaderUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$loaderUseOverlay = Helpers::checkAttr('loaderUseOverlay', $attributes, $manifest);

$loaderClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
	Helpers::selector($loaderUseOverlay, $componentClass, '', 'use-overlay'),
]);

$loaderSpinnerClass = Helpers::selector($componentClass, $componentClass, 'spinner');
?>

<div class="<?php echo esc_attr($loaderClass); ?>">
	<span class="<?php echo esc_attr($loaderSpinnerClass); ?>"></span>
</div>
