<?php

/**
 * Template for the Wrapper block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 1));
$manifest = Components::getManifest(__DIR__);

// Used to add or remove wrapper.
$wrapperUse = Components::checkAttr('wrapperUse', $attributes, $manifest);
$wrapperDisable = Components::checkAttr('wrapperDisable', $attributes, $manifest);
$wrapperParentClass = Components::checkAttr('wrapperParentClass', $attributes, $manifest);
$wrapperUseSimple = Components::checkAttr('wrapperUseSimple', $attributes, $manifest);
$wrapperUseInner = Components::checkAttr('wrapperUseInner', $attributes, $manifest);

if (! $wrapperUse || $wrapperDisable) {
	if ($wrapperParentClass) {
		echo '<div class="' , esc_attr($wrapperParentClass . '__item') , '">
			<div class="' , esc_attr($wrapperParentClass . '__item-inner') , '">';
	}

	$this->renderWrapperView(
		$templatePath,
		$attributes,
		$innerBlockContent
	);

	if ($wrapperParentClass) {
			echo '</div>
		</div>';
	}

	return;
}

$wrapperId = Components::checkAttr('wrapperId', $attributes, $manifest);
$wrapperAnchorId = Components::checkAttr('wrapperAnchorId', $attributes, $manifest);
$wrapperMainClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$wrapperClass = Components::classnames([
	$wrapperMainClass,
	$wrapperUseSimple ? "{$wrapperMainClass}--simple" : '',
]);

$wrapperInnerClass =  "{$wrapperMainClass}__inner";

$unique = Components::getUnique();
$attributes["uniqueWrapperId"] = $unique;

?>

<div
	class="<?php echo esc_attr($wrapperClass); ?>"
	data-id="<?php echo esc_attr($unique); ?>"
	<?php echo esc_attr(($wrapperId) ? 'id=" ' . $wrapperId . '"' : ''); ?>
	>
	<?php
	 echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	?>
	<?php if ($wrapperAnchorId) { ?>
		<div class="<?php echo esc_attr("{$wrapperMainClass}__anchor"); ?>" id="<?php echo esc_attr($wrapperAnchorId); ?>"></div>
	<?php } ?>

	<?php if ($wrapperUseInner) { ?>
		<div class="<?php echo esc_attr($wrapperInnerClass); ?>">
			<?php
				$this->renderWrapperView(
					$templatePath,
					$attributes,
					$innerBlockContent
				);
			?>
		</div>
		<?php
	} else {
		$this->renderWrapperView(
			$templatePath,
			$attributes,
			$innerBlockContent
		);
	}
	?>
</div>
