<?php

/**
 * Template for the Example Block view.
 *
 * @package EightshiftBoilerplate
 */

$blockClass = $attributes['blockClass'] ?? '';
$content    = $attributes['content'] ?? '';

?>

<div class="<?php echo esc_attr($blockClass); ?>">
	<?php echo wp_kses_post($content); ?>
</div>
