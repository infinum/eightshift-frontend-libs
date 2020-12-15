<?php

/**
 * Template for the Carousel Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass     = $attributes['blockClass'] ?? '';
$blockJsClass   = $attributes['blockJsClass'] ?? '';
$isLoop         = Components::checkAttr('isLoop', $attributes, $manifest, $componentName);
$showItems      = Components::checkAttr('showItems', $attributes, $manifest, $componentName);

$carouselClass = Components::classnames([
	$blockClass,
	$blockJsClass,
	'swiper-container',
]);

?>

<div
	class="<?php echo esc_attr($carouselClass); ?>"
	data-swiper-loop="<?php echo esc_attr($isLoop); ?>"
	data-show-items="<?php echo esc_attr($showItems); ?>"
>

	<div class="<?php echo esc_attr('swiper-wrapper'); ?>">
		<?php echo wp_kses_post($innerBlockContent); ?>
	</div>
</div>
