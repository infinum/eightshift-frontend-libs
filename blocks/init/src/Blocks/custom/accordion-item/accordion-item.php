<?php

/**
 * Template for the Accordion Block view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$uniqueAccordionId = Helpers::getUnique();
$uniqueAccordionTriggerId = Helpers::getUnique();

$accordionItemIconClass = Helpers::selector($blockClass, $blockClass, 'icon');
$accordionItemContentClass = Helpers::selector($blockClass, $blockClass, 'content');

$accordionItemTriggerClass = Helpers::classnames([
	Helpers::selector($blockClass, $blockClass, 'trigger'),
	"{$blockJsClass}-trigger",
]);

$accordionItemPanelClass = Helpers::classnames([
	Helpers::selector($blockClass, $blockClass, 'panel'),
	"{$blockJsClass}-panel",
]);

$accordionItemStartOpen = Helpers::checkAttr('accordionItemStartOpen', $attributes, $manifest);
$accordionItemTriggerContent = Helpers::checkAttr('accordionItemTriggerContent', $attributes, $manifest);

$accordionItemClass = Helpers::classnames([
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
		<?php echo Helpers::render('paragraph', Helpers::props('trigger', $attributes)); ?>

		<span class="<?php echo esc_attr($accordionItemIconClass); ?>" aria-hidden="true" >
			<?php
			// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
			echo $manifest['resources']['icon'];
			?>
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
