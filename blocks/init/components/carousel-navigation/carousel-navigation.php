<?php
/**
 * Template for the Carousel Navigation Component.
 *
 * @since 1.0.0
 * @package Infinum\Blocks.
 */

namespace Infinum\Blocks;

$component_class       = 'carousel-navigation';
$arrow_item_prev_class = "
  {$component_class}__arrow-item
  {$component_class}__arrow-item--prev
  js-swiper-prev
";
$arrow_item_next_class = "
  {$component_class}__arrow-item
  {$component_class}__arrow-item--next
  js-swiper-next
";
$arrow_icon_class      = "{$component_class}__arrow-icon";
?>

<div class="<?php echo esc_attr( $component_class ); ?>">
  <div class="<?php echo esc_attr( $arrow_item_prev_class ); ?>">
    <svg class="<?php echo esc_attr( $arrow_icon_class ); ?>" xmlns="http://www.w3.org/2000/svg" width="30" height="12"><path fill="#353535" fill-rule="evenodd" d="M7.174 6v4.483L.686 5.657 7.174.83V5H30v1H7.174z"/></svg>
  </div>
  <div class="<?php echo esc_attr( $arrow_item_next_class ); ?>">
    <svg class="<?php echo esc_attr( $arrow_icon_class ); ?>" xmlns="http://www.w3.org/2000/svg" width="30" height="12"><path fill="#353535" fill-rule="evenodd" d="M22.826 5V.83l6.488 4.827-6.488 4.826V6H0V5h22.826z"/></svg>
  </div>
</div>
