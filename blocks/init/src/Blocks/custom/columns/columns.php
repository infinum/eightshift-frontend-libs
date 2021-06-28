<?php

/**
 * Template for the Columns Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$columnsGutter = Components::checkAttrResponsive('columnsGutter', $attributes, $manifest);
$columnsVerticalSpacing = Components::checkAttrResponsive('columnsVerticalSpacing', $attributes, $manifest);

$columnsClass = Components::classnames([
	$blockClass,
	Components::responsiveSelectors($columnsGutter, 'gutter', $blockClass),
	Components::responsiveSelectors($columnsVerticalSpacing, 'vertical-spacing', $blockClass),
]);
?>

<div class="<?php echo \esc_attr($columnsClass); ?>">
	<?php echo $innerBlockContent; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
