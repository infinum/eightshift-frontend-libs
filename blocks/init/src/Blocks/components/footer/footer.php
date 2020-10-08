<?php

/**
 * Main footer component
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'footer';
$blockClass = $attributes['blockClass'] ?? '';

$left = ! empty($attributes['left']) ? Components::ensureString($attributes['left']) : '';
$center = ! empty($attributes['center']) ? Components::ensureString($attributes['center']) : '';
$right = ! empty($attributes['right']) ? Components::ensureString($attributes['right']) : '';

$footerClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>
<footer class="<?php echo \esc_attr($footerClass); ?>">
	<div class="<?php echo \esc_attr("{$componentClass}__wrapper"); ?>">
	<div class="<?php echo \esc_attr("{$componentClass}__column {$componentClass}__column--left"); ?>">
		<?php echo \wp_kses_post($left); ?>
	</div>
	<div class="<?php echo \esc_attr("{$componentClass}__column {$componentClass}__column--center"); ?>">
		<?php echo \wp_kses_post($center); ?>
	</div>
	<div class="<?php echo \esc_attr("{$componentClass}__column {$componentClass}__column--right"); ?>">
		<?php echo \wp_kses_post($right); ?>
	</div>
	</div>
</footer>
