<?php

/**
 * Template for the Button Component.
 *
 * @package EightshiftBoilerplate
 */

$button = $attributes['button'] ?? [];

if (empty($button)) {
	return;
}

$url   = $button['url'] ?? '';
$title = $button['title'] ?? '';

if (! $url || ! $title) {
	return;
}

$url      = $button['url'] ?? '';
$title    = $button['title'] ?? '';
$id       = $button['id'] ?? '';
$isAnchor = $button['isAnchor'] ?? false;

$componentClass = 'btn';
$blockClass     = $attributes['blockClass'] ?? '';
$styleColor     = isset($button['styleColor']) ? "{$componentClass}__color--{$button['styleColor']}" : '';
$styleSize      = isset($button['styleSize']) ? "{$componentClass}__size--{$button['styleSize']}" : '';
$styleSizeWidth = isset($button['styleSizeWidth']) ? "{$componentClass}__size-width--{$button['styleSizeWidth']}" : '';
$isAnchor       = $isAnchor ? 'js-scroll-to-anchor' : '';

$buttonClass = "
	{$componentClass}
	{$styleColor}
	{$styleSize}
	{$styleSizeWidth}
	{$isAnchor}
	{$blockClass}__btn
";
?>

<a
	href="<?php echo esc_url($url); ?>"
	class="<?php echo esc_attr($buttonClass); ?>"
	id="<?php echo esc_attr($id); ?>"
	title="<?php echo esc_attr($title); ?>"
>
	<?php echo esc_html($title); ?>
</a>
