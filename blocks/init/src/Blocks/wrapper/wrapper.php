<?php

/**
 * Template for the Wrapper block.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

// Used to add or remove wrapper.
$wrapperUse = Helpers::checkAttr('wrapperUse', $attributes, $manifest);
$wrapperNoControls = Helpers::checkAttr('wrapperNoControls', $attributes, $manifest);
$wrapperParentClass = Helpers::checkAttr('wrapperParentClass', $attributes, $manifest);
$wrapperSimple = Helpers::checkAttr('wrapperSimple', $attributes, $manifest);
$wrapperUseInner = Helpers::checkAttr('wrapperUseInner', $attributes, $manifest);
$wrapperOnlyOutput = Helpers::checkAttr('wrapperOnlyOutput', $attributes, $manifest);

if (! $wrapperUse || $wrapperNoControls) {
	if ($wrapperParentClass) {
		echo '
			<div class="' , esc_attr($wrapperParentClass . '__item') , '">
				<div class="' , esc_attr($wrapperParentClass . '__item-inner') , '">
				' . $renderContent . '
				</div>
			</div>
		';
	} else {
		echo $renderContent; // phpcs:ignore Eightshift.Security.ComponentsEscapeOutput.OutputNotEscaped
	}

	return;
}

$wrapperTag = Helpers::checkAttr('wrapperTag', $attributes, $manifest);
$wrapperId = Helpers::checkAttr('wrapperId', $attributes, $manifest);
$wrapperAnchorId = Helpers::checkAttr('wrapperAnchorId', $attributes, $manifest);
$wrapperMainClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$wrapperClass = Helpers::classnames([
	$wrapperMainClass,
	$wrapperSimple ? "{$wrapperMainClass}--simple" : '',
]);

$wrapperInnerClass =  "{$wrapperMainClass}__inner";

$unique = Helpers::getUnique();
$attributes["uniqueWrapperId"] = $unique;

?>

<<?php echo esc_attr($wrapperTag); ?>
	class="<?php echo esc_attr($wrapperClass); ?>"
	data-id="<?php echo esc_attr($unique); ?>"
	<?php echo $wrapperId ? 'id="' . esc_attr($wrapperId) . '"' : ''; ?>
	>
	<?php
	 echo Helpers::outputCssVariables($attributes, $manifest, $unique);
	?>
	<?php if ($wrapperAnchorId) { ?>
		<div
			class="<?php echo esc_attr("{$wrapperMainClass}__anchor"); ?>"
			id="<?php echo esc_attr($wrapperAnchorId); ?>"
		>
		</div>
	<?php } ?>

	<?php if ($wrapperUseInner) { ?>
		<div class="<?php echo esc_attr($wrapperInnerClass); ?>">
			<?php echo $renderContent; // phpcs:ignore Eightshift.Security.ComponentsEscapeOutput.OutputNotEscaped ?>
		</div>
		<?php
	} else {
		echo $renderContent; // phpcs:ignore Eightshift.Security.ComponentsEscapeOutput.OutputNotEscaped
	}
	?>
</<?php echo esc_attr($wrapperTag); ?>>
