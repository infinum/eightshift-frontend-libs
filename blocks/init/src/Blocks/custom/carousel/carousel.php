<?php

/**
 * Template for the Carousel Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $manifest['blockJsClass'] ?? $attributes['blockJsClass'] ?? '';

$carouselIsLoop = Components::checkAttr('carouselIsLoop', $attributes, $manifest);
$carouselShowItems = Components::checkAttr('carouselShowItems', $attributes, $manifest);
$carouselShowPrevNext = Components::checkAttr('carouselShowPrevNext', $attributes, $manifest);
$carouselShowPagination = Components::checkAttr('carouselShowPagination', $attributes, $manifest);

$carouselClass = Components::classnames([
	$blockClass,
	$blockJsClass,
	'swiper',
]);

$prevButtonClass = Components::classnames([
	Components::selector($blockClass, $blockClass, 'button'),
	Components::selector($blockClass, $blockClass, 'button', 'previous'),
	Components::selector($blockJsClass, "{$blockJsClass}-prev-arrow"),
]);

$nextButtonClass = Components::classnames([
	Components::selector($blockClass, $blockClass, 'button'),
	Components::selector($blockClass, $blockClass, 'button', 'next'),
	Components::selector($blockJsClass, "{$blockJsClass}-next-arrow"),
]);

$paginationClass = Components::classnames([
	Components::selector($blockClass, $blockClass, 'pagination'),
	Components::selector($blockJsClass, "{$blockJsClass}-pagination"),
]);
?>

<div
	class="<?php echo esc_attr($carouselClass); ?>"
	data-swiper-loop="<?php echo esc_attr($carouselIsLoop ? 'true' : 'false'); ?>"
	data-show-items="<?php echo esc_attr($carouselShowItems); ?>"
>
	<div class="<?php echo esc_attr('swiper-wrapper'); ?>">
		<?php echo $innerBlockContent; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
	</div>

	<?php if ($carouselShowPrevNext) { ?>
		<button class="<?php echo esc_attr($prevButtonClass); ?>" aria-label="<?php echo esc_attr__('Previous slide', 'eightshift-frontend-libs'); ?>">
			<?php echo $manifest['resources']['prevIcon']; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
		</button>
		<button class="<?php echo esc_attr($nextButtonClass); ?>" aria-label="<?php echo esc_attr__('Next slide', 'eightshift-frontend-libs'); ?>">
			<?php echo $manifest['resources']['nextIcon']; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
		</button>
	<?php } ?>

	<?php if ($carouselShowPagination) { ?>
		<div class="<?php echo esc_attr($paginationClass); ?>"></div>
	<?php } ?>
</div>
