<?php

/**
 * Template for the Hamburger component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$hamburgerUse = Helpers::checkAttr('hamburgerUse', $attributes, $manifest);
if (!$hamburgerUse) {
	return;
}

$hamburgerLabel = Helpers::checkAttr('hamburgerLabel', $attributes, $manifest);
if (!$hamburgerLabel) {
	$hamburgerLabel = __('Menu', '%g_textdomain%');
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';

$hamburgerClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
	Helpers::selector($componentJsClass, $componentJsClass),
]);

$iconClass = Helpers::selector($componentClass, $componentClass, 'icon');
$iconBorderClass = Helpers::selector($componentClass, $componentClass, 'icon', 'border');
$iconTopClass = Helpers::selector($componentClass, $componentClass, 'icon', 'top');
$iconMidClass = Helpers::selector($componentClass, $componentClass, 'icon', 'mid');
$iconBtmClass = Helpers::selector($componentClass, $componentClass, 'icon', 'btm');
?>

<button class="<?php echo esc_attr($hamburgerClass); ?>" aria-label="<?php echo esc_attr($hamburgerLabel); ?>">
	<svg class="<?php echo esc_attr($iconClass); ?>" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect class="<?php echo esc_attr($iconBorderClass); ?>" opacity="0.1" x="1.23071" y="1.23077" width="29.5385" height="29.5385" rx="5" stroke="black" />
		<path class="<?php echo esc_attr($iconTopClass); ?>" d="M7.38464 9.84616H24.6154" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
		<path class="<?php echo esc_attr($iconMidClass); ?>" d="M7.38464 16H24.6154" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
		<path class="<?php echo esc_attr($iconBtmClass); ?>" d="M7.38464 22.1538H24.6154" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</button>
