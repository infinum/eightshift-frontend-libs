<?php

/**
 * Mobile menu as drawer
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$drawerUse = Components::checkAttr('drawerUse', $attributes, $manifest);
if (!$drawerUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';

$drawerMenu = Components::checkAttr('drawerMenu', $attributes, $manifest);
$drawerTrigger = Components::checkAttr('drawerTrigger', $attributes, $manifest);
$drawerOverlay = Components::checkAttr('drawerOverlay', $attributes, $manifest);
$drawerPosition = Components::checkAttr('drawerPosition', $attributes, $manifest);

$drawerClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($componentJsClass, $componentJsClass),
	// @phpstan-ignore-next-line
	Components::selector($drawerPosition, $componentClass, 'position', $drawerPosition),
]);

?>
<div
	class="<?php echo \esc_attr($drawerClass); ?>"
	data-trigger="<?php echo \esc_attr($drawerTrigger); ?>"
	data-overlay="<?php echo \esc_attr($drawerOverlay); ?>"
>
	<?php echo \wp_kses_post($drawerMenu); ?>
</div>
