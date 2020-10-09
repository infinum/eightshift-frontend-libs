<?php

/**
 * Template for the Hamburger component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'hamburger';
$blockClass = $attributes['blockClass'] ?? '';

$hamburgerClass = Components::classnames([
	$componentClass,
	"js-{$componentClass}",
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);
?>

<button class="<?php echo esc_attr($hamburgerClass); ?>">
	<span class="<?php echo esc_attr("{$componentClass}__wrapper"); ?>">
		<span class="<?php echo esc_attr("{$componentClass}__line {$componentClass}__line--1"); ?>"></span>
		<span class="<?php echo esc_attr("{$componentClass}__line {$componentClass}__line--2"); ?>"></span>
		<span class="<?php echo esc_attr("{$componentClass}__line {$componentClass}__line--3"); ?>"></span>
	</span>
</button>
