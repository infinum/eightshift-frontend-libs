<?php

/**
 * Main header bar component
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass      = $attributes['blockClass'] ?? 'header';
$leftComponent   = ! empty($attributes['leftComponent']) ? Components::ensureString($attributes['leftComponent']) : '';
$centerComponent = ! empty($attributes['centerComponent']) ? Components::ensureString($attributes['centerComponent']) : '';
$rightComponent  = ! empty($attributes['rightComponent']) ? Components::ensureString($attributes['rightComponent']) : '';

?>
<header class="<?php echo esc_attr($blockClass); ?>">
	<div class="<?php echo esc_attr("{$blockClass}__wrapper"); ?>">
	<div class="<?php echo esc_attr("{$blockClass}__column {$blockClass}__column--left"); ?>">
		<?php echo wp_kses_post($leftComponent); ?>
	</div>
	<div class="<?php echo esc_attr("{$blockClass}__column {$blockClass}__column--center"); ?>">
		<?php echo wp_kses_post($centerComponent); ?>
	</div>
	<div class="<?php echo esc_attr("{$blockClass}__column {$blockClass}__column--right"); ?>">
		<?php echo wp_kses_post($rightComponent); ?>
	</div>
	</div>
</header>
