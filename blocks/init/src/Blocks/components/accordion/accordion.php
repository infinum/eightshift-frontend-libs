<?php

/**
 * Template for the Accordion Block.
 *
 * @package EightshiftBoilerplate.
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$accordionUse = Components::checkAttr('accordionUse', $attributes, $manifest, $componentName);
if (!$accordionUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$accordionTitle = Components::checkAttr('accordionTitle', $attributes, $manifest, $componentName);
$accordionContent = Components::checkAttr('accordionContent', $attributes, $manifest, $componentName);
$accordionIsOpen = Components::checkAttr('accordionIsOpen', $attributes, $manifest, $componentName);

$componentJsClass = Components::selector($componentClass, "js-{$componentClass}");

$accordionClass = Components::classnames([
	$componentClass,
	$componentJsClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<div
	class="<?php echo \esc_attr("{$accordionClass}"); ?>"
	data-accordion-open="<?php echo $accordionIsOpen ? 'true' : 'false'; ?>"
>
	<button
		class="<?php echo \esc_attr("{$componentClass}__trigger {$componentJsClass}-trigger"); ?>"
		aria-label="<?php echo esc_html($accordionTitle); ?>"
		aria-controls
	>
		<?php echo \esc_html($accordionTitle); ?>
		<div class="<?php echo \esc_attr("{$componentClass}__icon"); ?>" aria-hidden="true" >
			<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
				<g transform="translate(1 1)" fill="none" fill-rule="evenodd">
					<circle stroke="#979797" cx="14" cy="14" r="14"/>
					<g stroke="#717171" stroke-linecap="square">
						<path d="M6.341 14h14.318M13.969 7v14" class="<?php echo \esc_attr("{$componentClass}__icon--plus"); ?>"/>
						<path d="M6.341 14h14.318" class="<?php echo \esc_attr("{$componentClass}__icon--minus"); ?>"/>
					</g>
				</g>
			</svg>
		</div>
	</button>
	<section
		class="<?php echo \esc_attr("{$componentClass}__panel {$componentJsClass}-panel"); ?>"
		aria-hidden="<?php echo $accordionIsOpen ? 'false' : 'true'; ?>"
	>
		<div class="<?php echo \esc_attr("{$componentClass}__content"); ?>">
			<?php echo \wp_kses_post($accordionContent); ?>
		</div>
	</section>
</div>
