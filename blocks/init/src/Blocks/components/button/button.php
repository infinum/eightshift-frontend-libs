<?php

/**
 * Template for the Button Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$buttonUse = Components::checkAttr('buttonUse', $attributes, $manifest, $componentName);
if (!$buttonUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$buttonUrl = Components::checkAttr('buttonUrl', $attributes, $manifest, $componentName);
$buttonContent = Components::checkAttr('buttonContent', $attributes, $manifest, $componentName);
$buttonIsAnchor = Components::checkAttr('buttonIsAnchor', $attributes, $manifest, $componentName);
$buttonId = Components::checkAttr('buttonId', $attributes, $manifest, $componentName);
$buttonIsNewTab = Components::checkAttr('buttonIsNewTab', $attributes, $manifest, $componentName);
$buttonAriaLabel = Components::checkAttr('buttonAriaLabel', $attributes, $manifest, $componentName);
$buttonAttrs = Components::checkAttr('buttonAttrs', $attributes, $manifest, $componentName);
$buttonAlign = Components::checkAttr('buttonAlign', $attributes, $manifest, $componentName);
$buttonColor = Components::checkAttr('buttonColor', $attributes, $manifest, $componentName);
$buttonSize = Components::checkAttr('buttonSize', $attributes, $manifest, $componentName);
$buttonWidth = Components::checkAttr('buttonWidth', $attributes, $manifest, $componentName);

if ($buttonIsNewTab) {
	$buttonAttrs = array_merge(
		[
			'target' => '_blank',
			'rel' => '"noopener noreferrer"',
		],
		$buttonAttrs
	);
}

$buttonWrapClass = Components::classnames([
	Components::selector($componentClass, "{$componentClass}-wrap"),
	Components::selector($buttonAlign, "{$componentClass}-wrap", 'align', $buttonAlign),
	Components::selector($blockClass, $blockClass, "{$selectorClass}-wrap"),
]);

$buttonClass = Components::classnames([
	$componentClass,
	Components::selector($buttonColor, $componentClass, 'color', $buttonColor),
	Components::selector($buttonSize, $componentClass, 'size', $buttonSize),
	Components::selector($buttonWidth, $componentClass, 'size-width', $buttonWidth),
	Components::selector($buttonIsAnchor, $buttonIsAnchor, 'js-scroll-to-anchor'),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<div class="<?php echo \esc_attr($buttonWrapClass); ?>">
	<?php if (! $buttonUrl) { ?>
		<button
			class="<?php echo \esc_attr($buttonClass); ?>"
			id="<?php echo \esc_attr($buttonId); ?>"
			title="<?php echo \esc_attr($buttonContent); ?>"
			aria-label="<?php echo \esc_attr($buttonAriaLabel); ?>"
			<?php
			foreach ($buttonAttrs as $key => $value) {
				echo \wp_kses_post("{$key}=" . $value . " ");
			}
			?>
		>
			<?php echo \esc_html($buttonContent); ?>
		</button>

	<?php } else { ?>
		<a
			href="<?php echo \esc_url($buttonUrl); ?>"
			class="<?php echo \esc_attr($buttonClass); ?>"
			id="<?php echo \esc_attr($buttonId); ?>"
			title="<?php echo \esc_attr($buttonContent); ?>"
			aria-label="<?php echo \esc_attr($buttonAriaLabel); ?>"
			<?php
			foreach ($buttonAttrs as $key => $value) {
				echo \wp_kses_post("{$key}=" . $value . " ");
			}
			?>
		>
			<?php echo \esc_html($buttonContent); ?>
		</a>
	<?php } ?>
</div>
