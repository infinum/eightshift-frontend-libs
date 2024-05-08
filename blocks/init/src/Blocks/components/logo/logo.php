<?php

/**
 * Logo component
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$logoUse = Helpers::checkAttr('logoUse', $attributes, $manifest);
if (!$logoUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$logoSrc = Helpers::checkAttr('logoSrc', $attributes, $manifest);
$logoAlt = Helpers::checkAttr('logoAlt', $attributes, $manifest);
$logoTitle = Helpers::checkAttr('logoTitle', $attributes, $manifest);
$logoHref = Helpers::checkAttr('logoHref', $attributes, $manifest);

$logoClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

$imgClass = Helpers::selector($componentClass, $componentClass, 'img');
?>

<a
	class="<?php echo esc_attr($logoClass); ?>"
	href="<?php echo esc_url($logoHref); ?>"
>
	<img
		src="<?php echo esc_url($logoSrc); ?>"
		alt="<?php echo esc_attr($logoAlt); ?>"
		title="<?php echo esc_attr($logoTitle); ?>"
		class="<?php echo esc_attr($imgClass); ?>"
	/>
</a>
