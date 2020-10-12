<?php

/**
 * Template for the Button Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$button = $attributes['button'] ?? [];
$use = $button['use'] ?? true;

if (!$button || !$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'button';
$blockClass = $attributes['blockClass'] ?? '';

$url = $button['url'] ?? '';
$content = $button['content'] ?? '';
$id = $button['id'] ?? '';
$isAnchor = $button['isAnchor'] ?? false;
$color = $button['color'] ?? '';
$size = $button['size'] ?? '';
$width = $button['width'] ?? '';
$ariaLabel = $button['ariaLabel'] ?? '';
$attrs = $button['attrs'] ?? [];

$buttonClass = Components::classnames([
	$componentClass,
	$color ? "{$componentClass}__color--{$color}" : '',
	$size ? "{$componentClass}__size--{$size}" : '',
	$width ? "{$componentClass}__size-width--{$width}" : '',
	$isAnchor ? 'js-scroll-to-anchor' : '',
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>

<?php if (! $url) { ?>
	<button
		class="<?php echo \esc_attr($buttonClass); ?>"
		id="<?php echo \esc_attr($id); ?>"
		title="<?php echo \esc_attr($title); ?>"
		aria-label="<?php echo \esc_attr($ariaLabel); ?>"
		<?php echo \esc_attr(Components::ensureString($attrs)); ?>
	>
		<?php echo \esc_html($title); ?>
	</button>

<?php } else { ?>
	<a
		href="<?php echo \esc_url($url); ?>"
		class="<?php echo \esc_attr($buttonClass); ?>"
		id="<?php echo \esc_attr($id); ?>"
		title="<?php echo \esc_attr($title); ?>"
		aria-label="<?php echo \esc_attr($ariaLabel); ?>"
		<?php echo \esc_attr(Components::ensureString($attrs)); ?>
	>
		<?php echo \esc_html($title); ?>
	</a>
<?php }
