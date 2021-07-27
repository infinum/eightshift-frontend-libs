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

if (! $wrapperUse || $wrapperDisable) {
	if ($wrapperParentClass) {
		?>
			<div class="<?php echo \esc_attr("{$wrapperParentClass}__item"); ?>">
				<div class="<?php echo \esc_attr("{$wrapperParentClass}__item-inner"); ?>">
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

$wrapperMainClass = 'wrapper';

$wrapperClass = Components::classnames([ // @phpstan-ignore-line
	$wrapperMainClass,
	Components::selector($wrapperMainClass, $wrapperMainClass, 'bg-color', $wrapperBackgroundColor), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperSpacingTop, 'spacing-top', $wrapperMainClass), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperSpacingBottom, 'spacing-bottom', $wrapperMainClass), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperSpacingTopIn, 'spacing-top-in', $wrapperMainClass), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperSpacingBottomIn, 'spacing-bottom-in', $wrapperMainClass), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperDividerTop, 'divider-top', $wrapperMainClass, false), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperDividerBottom, 'divider-bottom', $wrapperMainClass, false), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperHide, 'hide', $wrapperMainClass, false), // @phpstan-ignore-line
	$className,
]);

$wrapperContainerClass = Components::classnames([
	"{$wrapperMainClass}__container",
	Components::responsiveSelectors($wrapperContainerWidth, 'container-width', $wrapperMainClass), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperGutter, 'gutter', $wrapperMainClass), // @phpstan-ignore-line
]);

$wrapperInnerClass = Components::classnames([
	"{$wrapperMainClass}__inner",
	Components::responsiveSelectors($wrapperWidth, 'width', $wrapperMainClass), // @phpstan-ignore-line
	Components::responsiveSelectors($wrapperOffset, 'offset', $wrapperMainClass), // @phpstan-ignore-line
]);

$idOutput = '';

if ($wrapperId) {
	$escapedId = \esc_attr($wrapperId);
	$idOutput = "id='{$escapedId}'";
}

?>
<div class="<?php echo \esc_attr($wrapperClass); ?>" <?php echo $idOutput; ?>>

	<?php if ($wrapperAnchorId) { ?>
		<div class="<?php echo \esc_attr("{$wrapperMainClass}__anchor"); ?>" id="<?php echo \esc_attr($wrapperAnchorId); ?>"></div>
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
