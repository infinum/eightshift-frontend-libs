<?php

/**
 * Template for the Carousel Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$carouselIsLoop = Components::checkAttr('carouselIsLoop', $attributes, $manifest);
$carouselShowItems = Components::checkAttr('carouselShowItems', $attributes, $manifest);

$carouselClass = Components::classnames([
	$blockClass,
	$blockJsClass,
	'swiper-container',
]);

?>

<div
	class="<?php echo esc_attr($carouselClass); ?>"
	data-swiper-loop="<?php echo esc_attr($carouselIsLoop); ?>"
	data-show-items="<?php echo esc_attr($carouselShowItems); ?>"
>

	<div class="<?php echo esc_attr('swiper-wrapper'); ?>">
		<?php echo wp_kses_post($innerBlockContent); ?>
	</div>
</div>
