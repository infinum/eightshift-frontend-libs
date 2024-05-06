<?php

/**
 * Template for the Wrapper block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

// Used to add or remove wrapper.
$wrapperUse = Components::checkAttr('wrapperUse', $attributes, $manifest);
$wrapperNoControls = Components::checkAttr('wrapperNoControls', $attributes, $manifest);
$wrapperParentClass = Components::checkAttr('wrapperParentClass', $attributes, $manifest);
$wrapperSimple = Components::checkAttr('wrapperSimple', $attributes, $manifest);
$wrapperUseInner = Components::checkAttr('wrapperUseInner', $attributes, $manifest);
$wrapperOnlyOutput = Components::checkAttr('wrapperOnlyOutput', $attributes, $manifest);

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

$wrapperTag = Components::checkAttr('wrapperTag', $attributes, $manifest);
$wrapperId = Components::checkAttr('wrapperId', $attributes, $manifest);
$wrapperAnchorId = Components::checkAttr('wrapperAnchorId', $attributes, $manifest);
$wrapperMainClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$wrapperClass = Components::classnames([
	$wrapperMainClass,
	$wrapperSimple ? "{$wrapperMainClass}--simple" : '',
]);

$wrapperInnerClass =  "{$wrapperMainClass}__inner";

$unique = Components::getUnique();
$attributes["uniqueWrapperId"] = $unique;

?>

<<?php echo esc_attr($wrapperTag); ?>
	class="<?php echo esc_attr($wrapperClass); ?>"
	data-id="<?php echo esc_attr($unique); ?>"
	<?php echo $wrapperId ? 'id="' . esc_attr($wrapperId) . '"' : ''; ?>
	>
	<?php
	 echo Components::outputCssVariables($attributes, $manifest, $unique);
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
