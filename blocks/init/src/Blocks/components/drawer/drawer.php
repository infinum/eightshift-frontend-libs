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

$drawerClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($componentJsClass, $componentJsClass),
]);

?>
<div
	class="<?php echo esc_attr($drawerClass); ?>"
	data-trigger="<?php echo esc_attr($drawerTrigger); ?>"
>
	<?php
		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		echo $drawerMenu;
	?>
</div>
