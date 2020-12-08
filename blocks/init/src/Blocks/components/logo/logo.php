<?php

/**
 * Logo component
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$logoUse = Components::checkAttr('logoUse', $attributes, $manifest, $componentName);
if (!$logoUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$logoSrc = Components::checkAttr('logoSrc', $attributes, $manifest, $componentName);
$logoAlt = Components::checkAttr('logoAlt', $attributes, $manifest, $componentName);
$logoTitle = Components::checkAttr('logoTitle', $attributes, $manifest, $componentName);
$logoHref = Components::checkAttr('logoHref', $attributes, $manifest, $componentName);

$logoClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

$imgClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'img'),
]);

?>
<a
	class="<?php echo \esc_attr($logoClass); ?>"
	href="<?php echo \esc_url($logoHref); ?>"
>
	<img
	src="<?php echo \esc_url($logoSrc); ?>"
	alt="<?php echo \esc_attr($logoAlt); ?>"
	title="<?php echo \esc_attr($logoTitle); ?>"
	class="<?php echo \esc_attr($imgClass); ?>"
	/>
</a>
