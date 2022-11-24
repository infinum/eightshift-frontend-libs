<?php

/**
 * Template for the Accordion Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$uniqueAccordionId = Components::getUnique();
$uniqueAccordionTriggerId = Components::getUnique();

$accordionItemIconClass = Components::selector($blockClass, $blockClass, 'icon');
$accordionItemContentClass = Components::selector($blockClass, $blockClass, 'content');

$accordionItemTriggerClass = Components::classnames([
	Components::selector($blockClass, $blockClass, 'trigger'),
	"{$blockJsClass}-trigger",
]);

$accordionItemPanelClass = Components::classnames([
	Components::selector($blockClass, $blockClass, 'panel'),
	"{$blockJsClass}-panel",
]);

$accordionItemStartOpen = Components::checkAttr('accordionItemStartOpen', $attributes, $manifest);
$accordionItemTriggerContent = Components::checkAttr('accordionItemTriggerContent', $attributes, $manifest);

$accordionItemClass = Components::classnames([
	$blockClass,
	$blockJsClass,
]);
?>

<div
	class="<?php echo esc_attr($accordionItemClass); ?>"
	data-open="<?php echo esc_attr($accordionItemStartOpen ? 'true' : 'false'); ?>"
>
	<button
		class="<?php echo esc_attr($accordionItemTriggerClass); ?>"
		aria-label="<?php echo esc_html($accordionItemTriggerContent); ?>"
		aria-controls="<?php echo esc_attr($uniqueAccordionId); ?>"
		aria-expanded="<?php echo esc_attr($accordionItemStartOpen ? 'true' : 'false'); ?>"
		id="<?php echo esc_attr($uniqueAccordionTriggerId); ?>"
	>
		<?php
		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		echo Components::render('paragraph', Components::props('trigger', $attributes));
		?>
		<span class="<?php echo esc_attr($accordionItemIconClass); ?>" aria-hidden="true" >
			<?php echo $manifest['resources']['icon']; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
		</span>
	</button>

	<div
		role="region"
		class="<?php echo esc_attr($accordionItemPanelClass); ?>"
		aria-hidden="<?php echo esc_attr($accordionItemStartOpen ? 'false' : 'true'); ?>"
		aria-labelledby="<?php echo esc_attr($uniqueAccordionTriggerId); ?>"
		id="<?php echo esc_attr($uniqueAccordionId); ?>"
	>
		<div class="<?php echo esc_attr($accordionItemContentClass); ?>">
			<?php
				// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
				echo $innerBlockContent;
			?>
		</div>
	</div>
</div>
