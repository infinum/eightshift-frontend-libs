<?php

/**
 * Template for the Columns Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$columnGutter = Components::checkAttrResponsive('columnGutter', $attributes, $manifest);
$columnVerticalSpacing = Components::checkAttrResponsive('columnVerticalSpacing', $attributes, $manifest);

$columnsClass = Components::classnames([
	$blockClass,
	Components::responsiveSelectors($columnGutter, 'gutter', $blockClass),
	Components::responsiveSelectors($columnVerticalSpacing, 'vertical-spacing', $blockClass),
]);
?>

<div class="<?php echo \esc_attr($columnsClass); ?>">
	<?php echo $innerBlockContent; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
