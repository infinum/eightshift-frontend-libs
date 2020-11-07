<?php

/**
 * Template for the Accordion Block.
 *
 * @package Solplanet.
 */

use SolplanetVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'accordion';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';
$componentJsClass = $attributes['componentJsClass'] ?? 'js-accordion';

$title = $attributes['title'] ?? '';
$content = $attributes['content'] ?? '';
$isOpen = $attributes['isOpen'] ?? false;

$accordionClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$selectorClass}" : '',
]);

?>

<div
	class="<?php echo \esc_attr("{$accordionClass} {$componentJsClass}-parent"); ?>"
	data-accordion-open="<?php echo $isOpen ? 'true' : 'false'; ?>"
>
	<button
		class="<?php echo \esc_attr("{$componentClass}__trigger {$componentJsClass}-trigger"); ?>"
		aria-label="<?php echo esc_html($title); ?>"
		aria-controls
	>
		<?php echo \esc_html($title); ?>
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
		aria-hidden="<?php echo $isOpen ? 'false' : 'true'; ?>"
	>
		<div class="<?php echo \esc_attr("{$componentClass}__content"); ?>">
			<?php echo \wp_kses_post($content); ?>
		</div>
	</section>
</div>
