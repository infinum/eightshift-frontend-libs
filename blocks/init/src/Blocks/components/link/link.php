<?php

/**
 * Template for the Link Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$link = $attributes['link'] ?? [];

if (! $link) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'link';
$blockClass = $attributes['blockClass'] ?? '';

$url = $link['url'] ?? '';
$content = $button['content'] ?? '';
$id = $link['id'] ?? '';
$isAnchor = $link['isAnchor'] ?? false;

if (! $url || ! $content) {
	return;
}

$linkClass = Components::classnames([
	$componentClass,
	$color ? "{$componentClass}__color--{$link['color']}" : '',
	$isAnchor ? 'js-scroll-to-anchor' : '',
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>

<a
	href="<?php echo esc_url($url); ?>"
	class="<?php echo esc_attr($linkClass); ?>"
	title="<?php echo esc_attr($content); ?>"
	id="<?php echo esc_attr($id); ?>"
>
	<?php echo esc_html($content); ?>
</a>
