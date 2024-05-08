<?php

/**
 * Template for the Icon Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$iconUse = Helpers::checkAttr('iconUse', $attributes, $manifest);

if (!$iconUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$iconName = Helpers::checkAttr('iconName', $attributes, $manifest);

$iconClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

$unique = Helpers::getUnique();
?>
<i class="<?php echo esc_attr($iconClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
	echo Helpers::outputCssVariables($attributes, $manifest, $unique), $manifest['icons'][$iconName]; // @phpstan-ignore-line
	?>
</i>
