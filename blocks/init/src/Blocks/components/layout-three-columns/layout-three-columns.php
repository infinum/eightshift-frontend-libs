<?php

/**
 * Layout component - Three Columns grid.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$layoutThreeColumnsUse = Components::checkAttr('layoutThreeColumnsUse', $attributes, $manifest);
if (!$layoutThreeColumnsUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$layoutThreeColumnsLeft = Components::checkAttr('layoutThreeColumnsLeft', $attributes, $manifest);
$layoutThreeColumnsCenter = Components::checkAttr('layoutThreeColumnsCenter', $attributes, $manifest);
$layoutThreeColumnsRight = Components::checkAttr('layoutThreeColumnsRight', $attributes, $manifest);
$layoutThreeColumnsHtmlTag = Components::checkAttr('layoutThreeColumnsHtmlTag', $attributes, $manifest);

$layoutClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
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

<<?php echo esc_attr($layoutThreeColumnsHtmlTag); ?> class="<?php echo \esc_attr($layoutClass); ?>">

		<?php if ($layoutThreeColumnsLeft) { ?>
			<div class="<?php echo \esc_attr($columnLeftClass); ?>">
				<?php
					// @phpstan-ignore-next-line
					echo Components::ensureString($layoutThreeColumnsLeft); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</div>
		<?php } ?>

		<?php if ($layoutThreeColumnsCenter) { ?>
			<div class="<?php echo \esc_attr($columnCenterClass); ?>">
				<?php
					// @phpstan-ignore-next-line
					echo Components::ensureString($layoutThreeColumnsCenter); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</div>
		<?php } ?>

		<?php if ($layoutThreeColumnsRight) { ?>
			<div class="<?php echo \esc_attr($columnRightClass); ?>">
				<?php
					// @phpstan-ignore-next-line
					echo Components::ensureString($layoutThreeColumnsRight); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</div>
		<?php } ?>

</<?php echo esc_attr($layoutThreeColumnsHtmlTag); ?>>
