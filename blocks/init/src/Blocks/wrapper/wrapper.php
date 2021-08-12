<?php

/**
 * Template for the Wrapping Advance block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

// Used to add or remove wrapper.
$wrapperUse = Components::checkAttr('wrapperUse', $attributes, $manifest);
$wrapperUseSimple = Components::checkAttr('wrapperUseSimple', $attributes, $manifest);
$wrapperDisable = Components::checkAttr('wrapperDisable', $attributes, $manifest);
$wrapperParentClass = Components::checkAttr('wrapperParentClass', $attributes, $manifest);
$className = Components::checkAttr('className', $attributes, $manifest);

$wrapperParentClassItemClass = Components::selector($wrapperParentClass, $wrapperParentClass, 'item'); // @phpstan-ignore-line
$wrapperParentClassItemInnerClass = Components::selector($wrapperParentClass, $wrapperParentClass, 'item-inner'); // @phpstan-ignore-line

if (!$wrapperUse || $wrapperDisable) {
	if ($wrapperParentClass) {
		?>
			<div class="<?php echo \esc_attr($wrapperParentClassItemClass); ?>">
				<div class="<?php echo \esc_attr($wrapperParentClassItemInnerClass); ?>">
		<?php
	}

	$this->renderWrapperView(
		$templatePath,
		$attributes,
		$innerBlockContent
	);

	if ($wrapperParentClass) {
		?>
			</div>
		</div>
		<?php
	}

	return;
}

$wrapperId = Components::checkAttr('wrapperId', $attributes, $manifest);
$wrapperAnchorId = Components::checkAttr('wrapperAnchorId', $attributes, $manifest);
$wrapperBackgroundColor = Components::checkAttr('wrapperBackgroundColor', $attributes, $manifest);

$wrapperHide = Components::checkAttrResponsive('wrapperHide', $attributes, $manifest);
$wrapperSpacingTop = Components::checkAttrResponsive('wrapperSpacingTop', $attributes, $manifest);
$wrapperSpacingBottom = Components::checkAttrResponsive('wrapperSpacingBottom', $attributes, $manifest);
$wrapperSpacingTopIn = Components::checkAttrResponsive('wrapperSpacingTopIn', $attributes, $manifest);
$wrapperSpacingBottomIn = Components::checkAttrResponsive('wrapperSpacingBottomIn', $attributes, $manifest);
$wrapperDividerTop = Components::checkAttrResponsive('wrapperDividerTop', $attributes, $manifest);
$wrapperDividerBottom = Components::checkAttrResponsive('wrapperDividerBottom', $attributes, $manifest);
$wrapperContainerWidth = Components::checkAttrResponsive('wrapperContainerWidth', $attributes, $manifest);
$wrapperGutter = Components::checkAttrResponsive('wrapperGutter', $attributes, $manifest);
$wrapperWidth = Components::checkAttrResponsive('wrapperWidth', $attributes, $manifest);
$wrapperOffset = Components::checkAttrResponsive('wrapperOffset', $attributes, $manifest);

$componentClass = 'wrapper';

// @phpstan-ignore-next-line
$wrapperClass = Components::classnames([
	$componentClass,
	Components::selector($componentClass, $componentClass, 'bg-color', $wrapperBackgroundColor), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperSpacingTop, 'spacing-top', $componentClass), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperSpacingBottom, 'spacing-bottom', $componentClass), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperSpacingTopIn, 'spacing-top-in', $componentClass), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperSpacingBottomIn, 'spacing-bottom-in', $componentClass), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperDividerTop, 'divider-top', $componentClass, false), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperDividerBottom, 'divider-bottom', $componentClass, false), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperHide, 'hide', $componentClass, false), // @phpstan-ignore-line
	$className,
]);

$wrapperContainerClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'container'), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperContainerWidth, 'container-width', $componentClass), // @phpstan-ignore-line
	// @phpstan-ignore-next-line
	Components::responsiveSelectors($wrapperGutter, 'gutter', $componentClass),
]);

$wrapperInnerClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'inner'), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperWidth, 'width', $componentClass), // @phpstan-ignore-line
	// @phpstan-ignore-next-line
	Components::responsiveSelectors($wrapperOffset, 'offset', $componentClass),
]);

$wrapperMainAnchorClass = Components::selector($componentClass, $componentClass, 'anchor'); // @phpstan-ignore-line

$idOutput = '';

if ($wrapperId) {
	$escapedId = \esc_attr($wrapperId);
	$idOutput = "id='{$escapedId}'";
}

?>
<div
	class="<?php echo \esc_attr($wrapperClass); ?>"
	<?php echo $idOutput; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
>
	<?php if ($wrapperAnchorId) { ?>
		<div class="<?php echo \esc_attr($wrapperMainAnchorClass); ?>" id="<?php echo \esc_attr($wrapperAnchorId); ?>"></div>
	<?php } ?>

	<?php if ($wrapperUseSimple) { ?>
		<?php
		$this->renderWrapperView(
			$templatePath,
			$attributes,
			$innerBlockContent
		);
		?>
	<?php } else { ?>
		<div class="<?php echo \esc_attr($wrapperContainerClass); ?>">
			<div class="<?php echo \esc_attr($wrapperInnerClass); ?>">
				<?php
				$this->renderWrapperView(
					$templatePath,
					$attributes,
					$innerBlockContent
				);
				?>
			</div>
		</div>
	<?php } ?>
</div>
