<?php

/**
 * Template for the Button Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$defaults = $manifest['attributes'];

$buttonUse = $attributes['buttonUse'] ?? $defaults['buttonUse'];
if (!$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$buttonUrl = $attributes['buttonUrl'] ?? '';
$buttonContent = $attributes['buttonContent'] ?? '';
$buttonColor = $attributes['buttonColor'] ?? $defaults['buttonColor'];
$buttonSize = $attributes['buttonSize'] ?? $defaults['buttonSize'];
$buttonWidth = $attributes['buttonWidth'] ?? $defaults['buttonWidth'];
$buttonAlign = $attributes['buttonAlign'] ?? $defaults['buttonAlign'];
$buttonIsAnchor = $attributes['buttonIsAnchor'] ?? $defaults['buttonIsAnchor'];
$buttonId = $attributes['buttonId'] ?? '';
$buttonAriaLabel = $attributes['buttonAriaLabel'] ?? '';
$buttonAttrs = $attributes['buttonAttrs'] ?? [];

$buttonClass = Components::classnames([
	$componentClass,
	$buttonColor ? "{$componentClass}__color--{$buttonColor}" : '',
	$buttonSize ? "{$componentClass}__size--{$buttonSize}" : '',
	$buttonWidth ? "{$componentClass}__size-width--{$buttonWidth}" : '',
	$buttonAlign ? "{$componentClass}__align--{$buttonAlign}" : '',
	$buttonIsAnchor ? 'js-scroll-to-anchor' : '',
	$blockClass ? "{$blockClass}__{$selectorClass}" : '',
]);


$buttonWrapClass = Components::classnames([
	"{$componentClass}__wrap",
	$styleAlign ? "{$componentClass}__align--{$styleAlign}" : '',
	$blockClass ? "{$blockClass}__{$selectorClass}" : '',
]);

?>

<div class="<?php echo \esc_attr($buttonWrapClass); ?>">
	<?php if (! $buttonUrl) { ?>
		<button
			class="<?php echo \esc_attr($buttonClass); ?>"
			id="<?php echo \esc_attr($buttonId); ?>"
			title="<?php echo \esc_attr($buttonContent); ?>"
			aria-label="<?php echo \esc_attr($buttonAriaLabel); ?>"
			<?php echo \esc_attr(Components::ensureString($buttonAttrs)); ?>
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
			<?php echo \esc_attr(Components::ensureString($buttonAttrs)); ?>
		>
			<?php echo \esc_html($buttonContent); ?>
		</a>
	<?php } ?>
</div>
