<?php

/**
 * Template for the Carousel Pagination Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$use = $attributes['use'] ?? true;

if (!$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'carousel-pagination';
$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$paginationClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
	$blockJsClass ? "js-{$blockJsClass}" : '',
]);
?>

<div class="<?php echo \esc_attr($paginationClass); ?>"></div>
