<?php

/**
 * Template for the link Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$defaults = $manifest['attributes'];

$linkUse = $attributes['linkUse'] ?? $defaults['linkUse'];
if (!$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$linkUrl = $attributes['linkUrl'] ?? '';
$linkContent = $attributes['linkContent'] ?? '';
$linkColor = $attributes['linkColor'] ?? $defaults['linkColor'];
$linkSize = $attributes['linkSize'] ?? $defaults['linkSize'];
$linkWidth = $attributes['linkWidth'] ?? $defaults['linkWidth'];
$linkAlign = $attributes['linkAlign'] ?? $defaults['linkAlign'];
$linkIsAnchor = $attributes['linkIsAnchor'] ?? $defaults['linkIsAnchor'];
$linkId = $attributes['linkId'] ?? '';
$linkAriaLabel = $attributes['linkAriaLabel'] ?? '';
$linkAttrs = $attributes['linkAttrs'] ?? [];

$linkClass = Components::classnames([
	$componentClass,
	$linkColor ? "{$componentClass}__color--{$linkColor}" : '',
	$linkSize ? "{$componentClass}__size--{$linkSize}" : '',
	$linkWidth ? "{$componentClass}__size-width--{$linkWidth}" : '',
	$linkAlign ? "{$componentClass}__align--{$linkAlign}" : '',
	$linkIsAnchor ? 'js-scroll-to-anchor' : '',
	$blockClass ? "{$blockClass}__{$selectorClass}" : '',
]);

$linkWrapClass = Components::classnames([
	"{$componentClass}__wrap",
	$styleAlign ? "{$componentClass}__align--{$styleAlign}" : '',
	$blockClass ? "{$blockClass}__{$selectorClass}" : '',
]);

?>

<div class="<?php echo \esc_attr($linkWrapClass); ?>">
	<a
		href="<?php echo \esc_url($linkUrl); ?>"
		class="<?php echo \esc_attr($linkClass); ?>"
		id="<?php echo \esc_attr($linkId); ?>"
		title="<?php echo \esc_attr($linkContent); ?>"
		aria-label="<?php echo \esc_attr($linkAriaLabel); ?>"
		<?php echo \esc_attr(Components::ensureString($linkAttrs)); ?>
	>
		<?php echo \esc_html($linkContent); ?>
	</a>
</div>
