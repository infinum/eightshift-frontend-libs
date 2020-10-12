<?php

/**
 * Template for the Lists Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$lists = $attributes['lists'] ?? [];
$use = $lists['use'] ?? true;

if (!$lists || !$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'lists';
$blockClass = $attributes['blockClass'] ?? '';

$content = $lists['content'] ?? '';
$ordered = $lists['ordered'] ?? 'ul';

$listsClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>

<<?php echo esc_attr($ordered); ?> class="<?php echo esc_attr($listsClass); ?>">
	<?php echo wp_kses_post($content); ?>
</<?php echo esc_attr($ordered); ?>>
