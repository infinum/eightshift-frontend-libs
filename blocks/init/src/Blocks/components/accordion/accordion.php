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
$accordionContent = Components::checkAttr('accordionContent', $attributes, $manifest);
$accordionIsOpen = Components::checkAttr('accordionIsOpen', $attributes, $manifest);

$accordionClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($componentJsClass, $componentJsClass),
]);

?>

<div
	class="<?php echo \esc_attr("{$accordionClass}"); ?>"
	data-accordion-open="<?php echo \esc_attr($accordionIsOpen ? 'true' : 'false'); ?>"
>
	<button
		class="<?php echo \esc_attr("{$componentClass}__trigger {$componentJsClass}-trigger"); ?>"
		aria-label="<?php echo esc_html($accordionTitle); ?>"
		aria-controls
	>
		<?php echo \esc_html($accordionTitle); ?>
		<div class="<?php echo \esc_attr("{$componentClass}__icon"); ?>" aria-hidden="true" >
			<?php echo $manifest['options']['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
	</button>
	<section
		class="<?php echo \esc_attr("{$componentClass}__panel {$componentJsClass}-panel"); ?>"
		aria-hidden="<?php echo \esc_attr($accordionIsOpen ? 'false' : 'true'); ?>"
	>
		<div class="<?php echo \esc_attr("{$componentClass}__content"); ?>">
			<?php echo \wp_kses_post($accordionContent); ?>
		</div>
	</section>
</div>
