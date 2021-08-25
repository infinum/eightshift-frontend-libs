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

$modalExitButton = Components::checkAttr('modalExitButton', $attributes, $manifest);
$modalCloseAttr = Components::checkAttr('modalCloseAttr', $attributes, $manifest);
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
	id="<?php echo \esc_attr($modalId); ?>"
	aria-hidden="true"
>
	<div
		<?php echo \esc_attr($modalCloseAttr); ?>
		class="<?php echo \esc_attr($modalOverlayClass); ?>"
		tabIndex="-1"
	>
		<div
			class="<?php echo \esc_attr($modalDialogClass); ?>"
			role="dialog"
			aria-modal="true"
		>
			<?php if ($modalExitButton) { ?>
				<button
					<?php echo \esc_attr($modalCloseAttr); ?>
					class="<?php echo \esc_attr($modalExitButtonClass); ?>"
					aria-label="Close modal"
				>
					<?php echo $manifest['resources']['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</button>
			<?php } ?>

			<div class="<?php echo \esc_attr($modalContentClass); ?>">
				<?php
					echo $modalContent; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</div>
		</div>
	</div>
</div>
