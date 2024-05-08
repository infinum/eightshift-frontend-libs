<?php

/**
 * Template for the Carousel Block.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $manifest['blockJsClass'] ?? $attributes['blockJsClass'] ?? '';

$carouselIsLoop = Helpers::checkAttr('carouselIsLoop', $attributes, $manifest);
$carouselShowItems = Helpers::checkAttr('carouselShowItems', $attributes, $manifest);
$carouselShowPrevNext = Helpers::checkAttr('carouselShowPrevNext', $attributes, $manifest);
$carouselShowPagination = Helpers::checkAttr('carouselShowPagination', $attributes, $manifest);

$carouselClass = Helpers::classnames([
	$blockClass,
	$blockJsClass,
	'swiper',
]);

$prevButtonClass = Helpers::classnames([
	Helpers::selector($blockClass, $blockClass, 'button'),
	Helpers::selector($blockClass, $blockClass, 'button', 'previous'),
	Helpers::selector($blockJsClass, "{$blockJsClass}-prev-arrow"),
]);

$nextButtonClass = Helpers::classnames([
	Helpers::selector($blockClass, $blockClass, 'button'),
	Helpers::selector($blockClass, $blockClass, 'button', 'next'),
	Helpers::selector($blockJsClass, "{$blockJsClass}-next-arrow"),
]);

$paginationClass = Helpers::classnames([
	Helpers::selector($blockClass, $blockClass, 'pagination'),
	Helpers::selector($blockJsClass, "{$blockJsClass}-pagination"),
]);
?>

<div
	class="<?php echo esc_attr($carouselClass); ?>"
	data-swiper-loop="<?php echo esc_attr($carouselIsLoop ? 'true' : 'false'); ?>"
	data-show-items="<?php echo esc_attr($carouselShowItems); ?>"
>
	<div class="swiper-wrapper">
		<?php echo $innerBlockContent; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
	</div>

	<?php if ($carouselShowPrevNext) { ?>
		<button class="<?php echo esc_attr($prevButtonClass); ?>" aria-label="<?php echo esc_attr__('Previous slide', '%g_textdomain%'); ?>">
			<?php echo $manifest['resources']['prevIcon']; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
		</button>
		<button class="<?php echo esc_attr($nextButtonClass); ?>" aria-label="<?php echo esc_attr__('Next slide', '%g_textdomain%'); ?>">
			<?php echo $manifest['resources']['nextIcon']; // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
		</button>
	<?php } ?>

	<?php if ($carouselShowPagination) { ?>
		<div class="<?php echo esc_attr($paginationClass); ?>"></div>
	<?php } ?>
</div>
