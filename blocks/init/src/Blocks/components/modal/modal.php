<?php

/**
 * Template for the Modal Component.
 *
 * @package EightshiftBoilerplate.
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$modalUse = Components::checkAttr('modalUse', $attributes, $manifest);

if (!$modalUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';
$componentJsToggleClass = $manifest['componentJsToggleClass'] ?? '';

$modalExitButton = Components::checkAttr('modalExitButton', $attributes, $manifest);
$modalContent = Components::checkAttr('modalContent', $attributes, $manifest);
$modalId = Components::checkAttr('modalId', $attributes, $manifest);

$modalClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($componentJsClass, $componentJsClass),
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
						aria-label="<?php echo esc_attr__('Close modal', 'eightshift-frontend-libs'); ?>"
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
