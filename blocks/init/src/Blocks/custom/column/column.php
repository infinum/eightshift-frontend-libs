<?php

/**
 * Template for the Column Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$columnWidth = Components::checkAttrResponsive('columnWidth', $attributes, $manifest);
$columnOffset = Components::checkAttrResponsive('columnOffset', $attributes, $manifest);
$columnHide = Components::checkAttrResponsive('columnHide', $attributes, $manifest);
$columnOrder = Components::checkAttrResponsive('columnOrder', $attributes, $manifest);
$columnAlign = Components::checkAttrResponsive('columnAlign', $attributes, $manifest);

$columnClass = Components::classnames([
	$blockClass,
	Components::responsiveSelectors($columnWidth, 'width', $blockClass),
	Components::responsiveSelectors($columnOffset, 'offset', $blockClass),
	Components::responsiveSelectors($columnOrder, 'order', $blockClass),
	Components::responsiveSelectors($columnAlign, 'align', $blockClass),
	Components::responsiveSelectors($columnHide, 'hide', $blockClass, false),
]);
?>

<div class="<?php echo \esc_attr($columnClass); ?>">
	<?php echo $innerBlockContent; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
