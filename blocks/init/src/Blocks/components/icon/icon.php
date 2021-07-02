<?php

/**
 * Template for the Icon Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$iconUse = Components::checkAttr('iconUse', $attributes, $manifest);

if (!$iconUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$iconSelectedIcon = Components::checkAttr('iconSelectedIcon', $attributes, $manifest);
$icon = $manifest['icons'][$iconSelectedIcon];

$iconClasses = Components::classnames(
	[
		$componentClass,
		$selectorClass,
		Components::selector($iconSelectedIcon, $componentClass, $iconSelectedIcon),
		Components::selector($blockClass, $blockClass, $componentClass),
	]
);

?>
<i class="<?php echo esc_attr($iconClasses); ?>">
	<?php echo \wp_kses_post($icon); ?>
</i>
