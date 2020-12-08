<?php

/**
 * Template for the Hamburger component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$hamburgerUse = Components::checkAttr('hamburgerUse', $attributes, $manifest, $componentName);
if (!$hamburgerUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$hamburgerClass = Components::classnames([
	$componentClass,
	Components::selector($componentClass, "js-{$componentClass}"),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);
?>

<button class="<?php echo esc_attr($hamburgerClass); ?>">
	<span class="<?php echo esc_attr("{$componentClass}__wrap"); ?>">
		<span class="<?php echo esc_attr("{$componentClass}__line {$componentClass}__line--1"); ?>"></span>
		<span class="<?php echo esc_attr("{$componentClass}__line {$componentClass}__line--2"); ?>"></span>
		<span class="<?php echo esc_attr("{$componentClass}__line {$componentClass}__line--3"); ?>"></span>
	</span>
</button>
