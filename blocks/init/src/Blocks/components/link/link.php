<?php

/**
 * Template for the link Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$linkUse = Components::checkAttr('linkUse', $attributes, $manifest, $componentName);
if (!$linkUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$linkUrl = Components::checkAttr('linkUrl', $attributes, $manifest, $componentName);
$linkContent = Components::checkAttr('linkContent', $attributes, $manifest, $componentName);
$linkIsAnchor = Components::checkAttr('linkIsAnchor', $attributes, $manifest, $componentName);
$linkId = Components::checkAttr('linkId', $attributes, $manifest, $componentName);
$linkIsNewTab = Components::checkAttr('linkIsNewTab', $attributes, $manifest, $componentName);
$linkAriaLabel = Components::checkAttr('linkAriaLabel', $attributes, $manifest, $componentName);
$linkAttrs = Components::checkAttr('linkAttrs', $attributes, $manifest, $componentName);
$linkAlign = Components::checkAttr('linkAlign', $attributes, $manifest, $componentName);
$linkColor = Components::checkAttr('linkColor', $attributes, $manifest, $componentName);
$linkSize = Components::checkAttr('linkSize', $attributes, $manifest, $componentName);

if ($linkIsNewTab) {
	$linkAttrs = array_merge(
		[
			'target' => '_blank',
			'rel' => '"noopener noreferrer"',
		],
		$linkAttrs
	);
}

$linkWrapClass = Components::classnames([
	Components::selector($componentClass, "{$componentClass}-wrap"),
	Components::selector($linkAlign, "{$componentClass}-wrap", 'align', $linkAlign),
	Components::selector($blockClass, $blockClass, "{$selectorClass}-wrap"),
]);


$linkClass = Components::classnames([
	$componentClass,
	Components::selector($linkColor, $componentClass, 'color', $linkColor),
	Components::selector($linkSize, $componentClass, 'size', $linkSize),
	Components::selector($linkIsAnchor, $linkIsAnchor, 'js-scroll-to-anchor'),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<div class="<?php echo \esc_attr($linkWrapClass); ?>">
	<?php if (! $linkUrl) { ?>
		<link
			class="<?php echo \esc_attr($linkClass); ?>"
			id="<?php echo \esc_attr($linkId); ?>"
			title="<?php echo \esc_attr($linkContent); ?>"
			aria-label="<?php echo \esc_attr($linkAriaLabel); ?>"
			<?php
			foreach ($linkAttrs as $key => $value) {
				echo \wp_kses_post("{$key}=" . $value . " ");
			}
			?>
		>
			<?php echo \esc_html($linkContent); ?>
		</link>

	<?php } else { ?>
		<a
			href="<?php echo \esc_url($linkUrl); ?>"
			class="<?php echo \esc_attr($linkClass); ?>"
			id="<?php echo \esc_attr($linkId); ?>"
			title="<?php echo \esc_attr($linkContent); ?>"
			aria-label="<?php echo \esc_attr($linkAriaLabel); ?>"
			<?php
			foreach ($linkAttrs as $key => $value) {
				echo \wp_kses_post("{$key}=" . $value . " ");
			}
			?>
		>
			<?php echo \esc_html($linkContent); ?>
		</a>
	<?php } ?>
</div>
