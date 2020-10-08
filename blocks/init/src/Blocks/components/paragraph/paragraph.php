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

if (! $content) {
	return;
}

$paragraphClass = Components::classnames([
	$componentClass,
	$align ? "{$componentClass}__align--{$heading['align']}" : '',
	$color ? "{$componentClass}__color--{$heading['color']}" : '',
	$size ? "{$componentClass}__size--{$heading['size']}" : '',
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

$level = isset($heading['level']) ? "h{$heading['level']}" : 'h2';

$tag = $heading['tag'] ?? '';

if ($tag === 'div') {
	$level = 'div';
}

?>

<<?php echo \esc_attr($level); ?> class="<?php echo \esc_attr($headingClass); ?>">
	<?php echo \wp_kses_post($content); ?>
</<?php echo \esc_attr($level); ?>>
