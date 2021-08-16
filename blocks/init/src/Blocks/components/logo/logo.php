<?php

/**
 * Logo component
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$logoUse = Components::checkAttr('logoUse', $attributes, $manifest);
if (!$logoUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$logoSrc = Components::checkAttr('logoSrc', $attributes, $manifest);
$logoAlt = Components::checkAttr('logoAlt', $attributes, $manifest);
$logoTitle = Components::checkAttr('logoTitle', $attributes, $manifest);
$logoHref = Components::checkAttr('logoHref', $attributes, $manifest);

$logoClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
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
