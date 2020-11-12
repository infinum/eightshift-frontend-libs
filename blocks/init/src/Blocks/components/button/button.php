<?php

/**
 * Template for the Button Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$buttonUse = Components::checkAttr('buttonUse', $attributes, $manifest);
if (!$buttonUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$buttonUrl = Components::checkAttr('buttonUrl', $attributes, $manifest);
$buttonContent = Components::checkAttr('buttonContent', $attributes, $manifest);
$buttonIsAnchor = Components::checkAttr('buttonIsAnchor', $attributes, $manifest);
$buttonId = Components::checkAttr('buttonId', $attributes, $manifest);
$buttonIsNewTab = Components::checkAttr('buttonIsNewTab', $attributes, $manifest);
$buttonAriaLabel = Components::checkAttr('buttonAriaLabel', $attributes, $manifest);
$buttonAttrs = Components::checkAttr('buttonAttrs', $attributes, $manifest);

if ($buttonIsNewTab) {
	$buttonAttrs = array_merge(
		[
			'target' => '_blank',
			'rel' => '"noopener noreferrer"',
		],
		$buttonAttrs
	);
};

$buttonWrapClass = Components::classnames([
	$componentClass,
	Components::selector($componentClass, 'align', 'buttonAlign', $attributes, $manifest),
	Components::selectorB($blockClass, $selectorClass),
]);

$buttonClass = Components::classnames([
	Components::selectorB($componentClass, 'item'),
	Components::selector($componentClass, 'color', 'buttonColor', $attributes, $manifest),
	Components::selector($componentClass, 'size', 'buttonSize', $attributes, $manifest),
	Components::selector($componentClass, 'size-width', 'buttonWidth', $attributes, $manifest),
	Components::selectorB($buttonIsAnchor, 'js-scroll-to-anchor'),
	Components::selectorB($blockClass, $selectorClass),
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
