<?php

/**
 * Template for the Carousel Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass   = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';
$isFreeMode   = $attributes['isFreeMode'] ?? false;
$isLoop       = $attributes['isLoop'] ?? true;

?>

<div
  class="<?php echo esc_attr("{$blockClass} {$blockJsClass} swiper-container"); ?>"
  data-swiper-freeMode="<?php echo esc_attr($isFreeMode); ?>"
  data-swiper-loop="<?php echo esc_attr($isLoop); ?>"
>
  <div class="<?php echo esc_attr('swiper-wrapper'); ?>">
	<?php echo wp_kses_post($innerBlockContent); ?>
  </div>
  <div class="<?php echo esc_attr("{$blockClass}__navigation"); ?>">
	<?php
	  echo wp_kses_post(Components::render('carousel-navigation', $attributes));
	?>
  </div>
</div>
