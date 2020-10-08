<?php

/**
 * Logo component, should be usable without any attributes.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Manifest\Manifest;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'logo';
$blockClass = $attributes['blockClass'] ?? '';

$src = $attributes['src'] ?? \apply_filters(Manifest::MANIFEST_ITEM, 'logo.svg');
$alt = $attributes['logoAlt'] ?? \get_bloginfo('name') . ' logo';
$href = $attributes['href'] ?? \get_bloginfo('url');

$logoClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>
<a
	class="<?php echo \esc_attr($logoClass); ?>"
	href="<?php echo \esc_url($href); ?>"
>
	<img
	src="<?php echo \esc_url($src); ?>"
	alt="<?php echo \esc_attr($alt); ?>"
	class="<?php echo \esc_attr("{$componentClass}__img"); ?>"
	/>
</a>
