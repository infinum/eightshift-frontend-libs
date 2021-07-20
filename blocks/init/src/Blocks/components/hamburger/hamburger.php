<?php

/**
 * Template for the Hamburger component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$hamburgerUse = Components::checkAttr('hamburgerUse', $attributes, $manifest);
if (!$hamburgerUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';

$hamburgerClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($componentJsClass, $componentJsClass),
]);
?>

<button class="<?php echo esc_attr($hamburgerClass); ?>">
	<span class="<?php echo esc_attr("{$componentClass}__wrap"); ?>">
		<span class="<?php echo esc_attr("{$componentClass}__line {$componentClass}__line--1"); ?>"></span>
		<span class="<?php echo esc_attr("{$componentClass}__line {$componentClass}__line--2"); ?>"></span>
		<span class="<?php echo esc_attr("{$componentClass}__line {$componentClass}__line--3"); ?>"></span>
	</span>
</button>
