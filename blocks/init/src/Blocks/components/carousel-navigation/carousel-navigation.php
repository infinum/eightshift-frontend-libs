<?php

/**
 * Template for the Carousel Navigation Component.
 *
 * @package EightshiftBoilerplate
 */

$componentClass       = 'carousel-navigation';
$arrowItemPrevClass = "
	{$componentClass}__arrow-item
	{$componentClass}__arrow-item--prev
	js-swiper-prev
";
$arrowItemNextClass = "
	{$componentClass}__arrow-item
	{$componentClass}__arrow-item--next
	js-swiper-next
";
$arrowIconClass      = "{$componentClass}__arrow-icon";
?>

<div class="<?php echo esc_attr($componentClass); ?>">
	<div class="<?php echo esc_attr($arrowItemPrevClass); ?>">
	<svg class="<?php echo esc_attr($arrowIconClass); ?>" xmlns="http://www.w3.org/2000/svg" width="30" height="12"><path fill="#353535" fill-rule="evenodd" d="M7.174 6v4.483L.686 5.657 7.174.83V5H30v1H7.174z"/></svg>
	</div>
	<div class="<?php echo esc_attr($arrowItemNextClass); ?>">
	<svg class="<?php echo esc_attr($arrowIconClass); ?>" xmlns="http://www.w3.org/2000/svg" width="30" height="12"><path fill="#353535" fill-rule="evenodd" d="M22.826 5V.83l6.488 4.827-6.488 4.826V6H0V5h22.826z"/></svg>
	</div>
</div>
