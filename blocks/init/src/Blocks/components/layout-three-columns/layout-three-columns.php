<?php

/**
 * Layout component - Three Columns grid.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$layoutUse = Components::checkAttr('layoutUse', $attributes, $manifest, $componentName);
if (!$layoutUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$layoutLeft = Components::checkAttr('layoutLeft', $attributes, $manifest, $componentName);
$layoutCenter = Components::checkAttr('layoutCenter', $attributes, $manifest, $componentName);
$layoutRight = Components::checkAttr('layoutRight', $attributes, $manifest, $componentName);
$tag = Components::checkAttr('tag', $attributes, $manifest, $componentName);

$layoutClass = Components::classnames([
	$componentClass,
	Components::selector($selectorClass, $selectorClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

$wrapClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'wrap'),
	Components::selector($selectorClass, $selectorClass, 'wrap'),
]);

$columnLeftClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'column'),
	Components::selector($selectorClass, $selectorClass, 'column'),
	Components::selector($selectorClass, $selectorClass, 'column', 'left'),
]);

$columnCenterClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'column'),
	Components::selector($selectorClass, $selectorClass, 'column'),
	Components::selector($selectorClass, $selectorClass, 'column', 'center'),
]);

$columnRightClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'column'),
	Components::selector($selectorClass, $selectorClass, 'column'),
	Components::selector($selectorClass, $selectorClass, 'column', 'right'),
]);

?>

<<?php echo esc_attr($tag); ?> class="<?php echo \esc_attr($layoutClass); ?>">
	<div class="<?php echo \esc_attr($wrapClass); ?>">

		<?php if ($layoutLeft) { ?>
			<div class="<?php echo \esc_attr($columnLeftClass); ?>">
				<?php echo wp_kses_post(Components::ensureString($layoutLeft)); ?>
			</div>
		<?php } ?>

		<?php if ($layoutCenter) { ?>
			<div class="<?php echo \esc_attr($columnCenterClass); ?>">
				<?php echo wp_kses_post(Components::ensureString($layoutCenter)); ?>
			</div>
		<?php } ?>

		<?php if ($layoutRight) { ?>
			<div class="<?php echo \esc_attr($columnRightClass); ?>">
				<?php echo wp_kses_post(Components::ensureString($layoutRight)); ?>
			</div>
		<?php } ?>

	</div>
</<?php echo esc_attr($tag); ?>>
