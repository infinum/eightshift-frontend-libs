<?php

/**
 * Template for the Modal Component.
 *
 * @package %g_namespace%.
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$modalUse = Helpers::checkAttr('modalUse', $attributes, $manifest);

if (!$modalUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';
$componentJsToggleClass = $manifest['componentJsToggleClass'] ?? '';

$modalExitButton = Helpers::checkAttr('modalExitButton', $attributes, $manifest);
$modalContent = Helpers::checkAttr('modalContent', $attributes, $manifest);
$modalId = Helpers::checkAttr('modalId', $attributes, $manifest);

$modalClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
	Helpers::selector($componentJsClass, $componentJsClass),
]);

?>

<div
	class="<?php echo esc_attr($modalClass); ?>"
	<?php if (!empty($modalId)) { ?>
		id="<?php echo esc_attr($modalId); ?>"
	<?php } ?>
	aria-hidden="true"
>
	<div
		<?php echo esc_attr("data-{$componentJsToggleClass}-close"); ?>
		class="<?php echo esc_attr("{$componentClass}__overlay"); ?>"
		tabIndex="-1"
	>
		<div
			class="<?php echo esc_attr("{$componentClass}__dialog"); ?>"
			role="dialog"
			aria-modal="true"
		>
			<?php if ($modalExitButton) { ?>
				<div class="<?php echo esc_attr("{$componentClass}__close"); ?>">
					<button
						<?php echo esc_attr("data-{$componentJsToggleClass}-close"); ?>
						class="<?php echo esc_attr("{$componentClass}__close-button"); ?>"
						aria-label="<?php echo esc_attr__('Close modal', '%g_textdomain%'); ?>"
					>
						<?php
						// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
						echo $manifest['resources']['icon'];
						?>
					</button>
				</div>
			<?php } ?>

			<div class="<?php echo esc_attr("{$componentClass}__content"); ?>">
				<?php
					echo $modalContent; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
				?>
			</div>
		</div>
	</div>
</div>
