<?php

/**
 * Template for the Link Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$link = $attributes['link'] ?? [];
$use = $link['use'] ?? true;

if (!$link || !$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'link';
$blockClass = $attributes['blockClass'] ?? '';

$url = $link['url'] ?? '';
$color = $button['color'] ?? '';
$content = $button['content'] ?? '';
$id = $link['id'] ?? '';
$isAnchor = $link['isAnchor'] ?? false;

$linkClass = Components::classnames([
	$componentClass,
	$color ? "{$componentClass}__color--{$color}" : '',
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
