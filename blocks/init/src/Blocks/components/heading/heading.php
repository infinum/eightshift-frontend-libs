<?php

/**
 * Template for the Heading Component.
 *
 * @package EightshiftBoilerplate
 */

$heading = $attributes['heading'] ?? [];

if (! $heading) {
	return;
}

$content = $heading['content'] ?? '';

if (! $content) {
	return;
}

$level = isset($heading['level']) ? "h{$heading['level']}" : 'h2';

$componentClass = 'heading';
$blockClass     = $attributes['blockClass'] ?? '';
$styleAlign     = isset($heading['styleAlign']) ? "{$componentClass}__align--{$heading['styleAlign']}" : '';
$styleColor     = isset($heading['styleColor']) ? "{$componentClass}__color--{$heading['styleColor']}" : '';
$styleSize      = isset($heading['styleSize']) ? "{$componentClass}__size--{$heading['styleSize']}" : '';

$headingClass = "
  {$componentClass}
  {$styleAlign}
  {$styleColor}
  {$styleSize}
  {$blockClass}__heading
";

?>

<<?php echo esc_attr($level); ?> class="<?php echo esc_attr($headingClass); ?>">
  <?php echo wp_kses_post($content); ?>
</<?php echo esc_attr($level); ?>>
