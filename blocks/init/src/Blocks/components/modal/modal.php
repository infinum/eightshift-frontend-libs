<?php

/**
 * Template for the Modal Component.
 *
 * @package ModalComponent.
 */

use ModalComponentVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$modalUse = Components::checkAttr('modalUse', $attributes, $manifest);

if (!$modalUse) {
	return;
}

$unique = Components::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';

$modalExitButton = Components::checkAttr('modalExitButton', $attributes, $manifest);
$modalContent = Components::checkAttr('modalContent', $attributes, $manifest);
$modalId = Components::checkAttr('modalId', $attributes, $manifest);

$modalClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($componentJsClass, $componentJsClass),
]);

$modalOverlayClass = Components::selector($componentClass, $componentClass, 'overlay');
$modalDialogClass = Components::selector($componentClass, $componentClass, 'dialog');
$modalContentClass = Components::selector($componentClass, $componentClass, 'content');
$modalExitButtonClass = Components::selector($componentClass, $componentClass, 'close-button');

?>

<div
	class="<?php echo \esc_attr($modalClass); ?>"
	data-id="<?php echo \esc_attr($unique); ?>"
	id="<?php echo \esc_attr($modalId); ?>"
	aria-hidden="true"
>
	<?php
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest);
	?>

	<div
		class="<?php echo \esc_attr($modalOverlayClass); ?>"
		tabIndex="-1"
		data-micromodal-close
	>
		<div
			class="<?php echo \esc_attr($modalDialogClass); ?>"
			role="dialog"
			aria-modal="true"
		>
			<?php if ($modalExitButton) { ?>
				<button
					class="<?php echo \esc_attr($modalExitButtonClass); ?>"
					aria-label="Close modal"
					data-micromodal-close
				>X</button>
			<?php } ?>

			<div class="<?php echo \esc_attr($modalContentClass); ?>">
				<?php
					// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
					echo $modalContent; // @phpstan-ignore-line
				?>
			</div>
		</div>
	</div>
</div>
