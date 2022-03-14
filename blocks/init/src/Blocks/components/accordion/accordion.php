<?php

/**
 * Template for the Accordion Block.
 *
 * @package EightshiftBoilerplate.
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$accordionUse = Components::checkAttr('accordionUse', $attributes, $manifest);

if (!$accordionUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$componentJsClass = $manifest['componentJsClass'] ?? '';

$accordionTitle = Components::checkAttr('accordionTitle', $attributes, $manifest);
$accordionContent = Components::checkAttr('accordionAccordionContent', $attributes, $manifest);
$accordionIsOpen = Components::checkAttr('accordionIsOpen', $attributes, $manifest);
$accordionCloseOthers = Components::checkAttr('accordionCloseOthers', $attributes, $manifest);

$accordionClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($componentJsClass, $componentJsClass),
]);

$accordionTriggerClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'trigger'),
	Components::selector($componentJsClass, "{$componentJsClass}-trigger"),
]);

$accordionIconClass = Components::selector($componentClass, $componentClass, 'icon');

$accordionPanelClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'panel'),
	Components::selector($componentJsClass, "{$componentJsClass}-panel"),
]);

$accordionContentClass = Components::selector($componentClass, $componentClass, 'content');

$uniqueAccordionId = Components::getUnique();
$uniqueAccordionTriggerId = Components::getUnique();
?>

<div
	class="<?php echo esc_attr($accordionClass); ?>"
	data-accordion-open="<?php echo esc_attr($accordionIsOpen ? 'true' : 'false'); ?>"
	data-close-others="<?php echo esc_attr($accordionCloseOthers ? 'true' : 'false'); ?>"
>
	<button
		class="<?php echo esc_attr($accordionTriggerClass); ?>"
		aria-label="<?php echo esc_html($accordionTitle); ?>"
		aria-controls="<?php echo esc_attr($uniqueAccordionId); ?>"
		aria-expanded="<?php echo esc_attr($accordionIsOpen ? 'true' : 'false'); ?>"
		id="<?php echo esc_attr($uniqueAccordionTriggerId); ?>"
	>
		<?php echo esc_html($accordionTitle); ?>
		<div class="<?php echo esc_attr($accordionIconClass); ?>" aria-hidden="true" >
			<?php echo $manifest['resources']['icon']; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
		</div>
	</button>

	<div
		role="region"
		class="<?php echo esc_attr($accordionPanelClass); ?>"
		aria-hidden="<?php echo esc_attr($accordionIsOpen ? 'false' : 'true'); ?>"
		aria-labelledby="<?php echo esc_attr($uniqueAccordionTriggerId); ?>"
		id="<?php echo esc_attr($uniqueAccordionId); ?>"
	>
		<div class="<?php echo esc_attr($accordionContentClass); ?>">
			<?php
				// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
				echo $accordionContent;
			?>
		</div>
	</div>
</div>
