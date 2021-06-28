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

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$componentJsClass = $attributes['componentJsClass'] ?? $manifest['componentJsClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$accordionTitle = Components::checkAttr('accordionTitle', $attributes, $manifest);
$accordionContent = Components::checkAttr('accordionContent', $attributes, $manifest);
$accordionIsOpen = Components::checkAttr('accordionIsOpen', $attributes, $manifest);

$accordionClass = Components::classnames([
	$componentClass,
	$componentJsClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
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
