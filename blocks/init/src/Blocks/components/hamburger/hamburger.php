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

$hamburgerLabel = Components::checkAttr('hamburgerLabel', $attributes, $manifest);
if (!$hamburgerLabel) {
	$hamburgerLabel = __('Menu', 'eightshift-frontend-libs');
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

$iconClass = Components::selector($componentClass, $componentClass, 'icon');
$iconBorderClass = Components::selector($componentClass, $componentClass, 'icon', 'border');
$iconTopClass = Components::selector($componentClass, $componentClass, 'icon', 'top');
$iconMidClass = Components::selector($componentClass, $componentClass, 'icon', 'mid');
$iconBtmClass = Components::selector($componentClass, $componentClass, 'icon', 'btm');
?>

<button class="<?php echo esc_attr($hamburgerClass); ?>" label="<?php echo esc_attr($hamburgerLabel); ?>" aria-label="<?php echo esc_attr($hamburgerLabel); ?>">
	<svg class="<?php echo \esc_attr($iconClass); ?>" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect class="<?php echo \esc_attr($iconBorderClass); ?>" opacity="0.1" x="1.23071" y="1.23077" width="29.5385" height="29.5385" rx="1.5" stroke="black" />
		<path class="<?php echo \esc_attr($iconTopClass); ?>" d="M7.38464 9.84616H24.6154" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		<path class="<?php echo \esc_attr($iconMidClass); ?>" d="M7.38464 16H24.6154" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		<path class="<?php echo \esc_attr($iconBtmClass); ?>" d="M7.38464 22.1538H24.6154" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</button>
