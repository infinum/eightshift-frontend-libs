<?php

/**
 * Template for the Icon Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];
$iconUse = Components::checkAttr('iconUse', $attributes, $manifest, $componentName);

if (!$iconUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$iconName = Components::checkAttr('iconName', $attributes, $manifest, $componentName);
$icon = $manifest['icons'][$iconName];

$iconClasses = Components::classnames(
	[
		$componentClass,
		$selectorClass,
		Components::selector($iconName, $componentClass, $iconName),
		Components::selector($blockClass, $blockClass, $componentClass),
	]
);

?>
<i class="<?php echo esc_attr($iconClasses); ?>">
	<?php echo \wp_kses_post($icon); ?>
</i>
