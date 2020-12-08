<?php

/**
 * Mobile menu as drawer
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$drawerUse = Components::checkAttr('drawerUse', $attributes, $manifest, $componentName);
if (!$drawerUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$drawerMenu = Components::checkAttr('drawerMenu', $attributes, $manifest, $componentName);
$drawerTrigger = Components::checkAttr('drawerTrigger', $attributes, $manifest, $componentName);
$drawerOverlay = Components::checkAttr('drawerOverlay', $attributes, $manifest, $componentName);
$drawerPosition = Components::checkAttr('drawerPosition', $attributes, $manifest, $componentName);

$drawerClass = Components::classnames([
	$componentClass,
	Components::selector($componentClass, "js-{$componentClass}"),
	Components::selector($drawerPosition, $componentClass, 'position', $drawerPosition),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>
<div
	class="<?php echo \esc_attr($drawerClass); ?>"
	data-trigger="<?php echo \esc_attr($drawerTrigger); ?>"
	data-overlay="<?php echo \esc_attr($drawerOverlay); ?>"
>
	<?php echo \wp_kses_post($drawerMenu); ?>
</div>
