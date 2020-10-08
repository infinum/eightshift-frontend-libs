<?php

/**
 * Template for the Paragraph Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$paragraph = $attributes['paragraph'] ?? [];

if (! $paragraph) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'paragraph';
$blockClass = $attributes['blockClass'] ?? '';

$content = $paragraph['content'] ?? '';
$align = $paragraph['align'] ?? '';
$color = $paragraph['color'] ?? '';
$size = $paragraph['size'] ?? '';
$level = $paragraph['level'] ?? 'p';
$tag = $paragraph['tag'] ?? '';

if (! $content) {
	return;
}

$paragraphClass = Components::classnames([
	$componentClass,
	$align ? "{$componentClass}__align--{$align}" : '',
	$color ? "{$componentClass}__color--{$color}" : '',
	$size ? "{$componentClass}__size--{$size}" : '',
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

if ($tag === 'div') {
	$level = 'div';
}

?>

<<?php echo \esc_attr($level); ?> class="<?php echo \esc_attr($headingClass); ?>">
	<?php echo \wp_kses_post($content); ?>
</<?php echo \esc_attr($level); ?>>
