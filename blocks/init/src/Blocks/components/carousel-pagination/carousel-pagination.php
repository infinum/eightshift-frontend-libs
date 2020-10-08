<?php

/**
 * Template for the Carousel Pagination Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'carousel-pagination';
$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$paginationClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
	$blockJsClass,
]);
?>

<div class="<?php echo \esc_attr($paginationClass); ?>"></div>
