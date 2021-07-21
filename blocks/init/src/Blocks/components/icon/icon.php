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

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$iconName = Components::checkAttr('iconName', $attributes, $manifest);
$icon = $manifest['icons'][$iconName];

$iconClasses = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($iconName, $componentClass, $iconName),
]);

?>
<i class="<?php echo esc_attr($iconClasses); ?>">
	<?php echo \wp_kses_post($icon); ?>
</i>
