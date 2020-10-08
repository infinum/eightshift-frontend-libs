<?php

/**
 * Template for the Button Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$button = $attributes['button'] ?? [];

if (empty($button)) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'btn';
$blockClass = $attributes['blockClass'] ?? '';

$url = $button['url'] ?? '';
$content = $button['content'] ?? '';
$id = $button['id'] ?? '';
$isAnchor = $button['isAnchor'] ?? false;
$color = $button['color'] ?? '';
$size = $button['size'] ?? '';
$sizeWidth = $button['sizeWidth'] ?? '';

if (! $url || ! $content) {
	return;
}

$buttonClass = Components::classnames([
	$componentClass,
	$color ? "{$componentClass}__color--{$button['color']}" : '',
	$size ? "{$componentClass}__size--{$button['size']}" : '',
	$sizeWidth ? "{$componentClass}__size-width--{$button['sizeWidth']}" : '',
	$isAnchor ? 'js-scroll-to-anchor' : '',
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);
?>

<a
	href="<?php echo \esc_url($url); ?>"
	class="<?php echo \esc_attr($buttonClass); ?>"
	id="<?php echo \esc_attr($id); ?>"
	title="<?php echo \esc_attr($content); ?>"
>
	<?php echo \esc_html($content); ?>
</a>
