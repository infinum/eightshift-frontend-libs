<?php

/**
 * Template for the Lists Component.
 *
 * @package EightshiftBoilerplate
 */

$lists = $attributes['lists'] ?? [];

if (! $lists) {
	return;
}

$content = $lists['content'] ?? '';

if (! $content) {
	return;
}

$ordered = $lists['ordered'] ?? 'ul';

$componentClass = 'lists';
$blockClass     = $attributes['blockClass'] ?? '';

$listsClass = "
	{$componentClass}
	{$blockClass}__lists
";

?>

<<?php echo esc_attr($ordered); ?> class="<?php echo esc_attr($listsClass); ?>">
	<?php echo wp_kses_post($content); ?>
</<?php echo esc_attr($ordered); ?>>
