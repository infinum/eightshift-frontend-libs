<?php

/**
 * Template for the Heading Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$heading = $attributes['heading'] ?? [];

if (! $heading) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'heading';
$blockClass = $attributes['blockClass'] ?? '';

$align = $heading['align'] ?? '';
$color = $heading['color'] ?? '';
$size = $heading['size'] ?? '';
$content = $heading['content'] ?? '';
$level = $heading['level'] ?? 'h2';
$tag = $heading['tag'] ?? '';


if (! $content) {
	return;
}

$headingClass = Components::classnames([
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

<<?php echo esc_attr($level); ?> class="<?php echo esc_attr($headingClass); ?>">
	<?php echo wp_kses_post($content); ?>
</<?php echo esc_attr($level); ?>>
