<?php
/**
 * Template for the Carousel Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$block_class    = $attributes['blockClass'] ?? '';
$block_js_class = $attributes['blockJsClass'] ?? '';
$is_free_mode   = $attributes['isFreeMode'] ?? false;
$is_loop        = $attributes['isLoop'] ?? true;

$component_class  = "
  {$block_class}
  {$block_js_class}
  swiper-container
";
$slider_class     = 'swiper-wrapper';
$navigation_class = "{$block_class}__navigation";

?>

<div
  class="<?php echo esc_attr( $component_class ); ?>"
  data-swiper-freeMode="<?php echo esc_attr( $is_free_mode ); ?>"
  data-swiper-loop="<?php echo esc_attr( $is_loop ); ?>"
>
  <div class="<?php echo esc_attr( $slider_class ); ?>">
    <?php echo wp_kses_post( $inner_block_content ); ?>
  </div>
  <div class="<?php echo esc_attr( $navigation_class ); ?>">
    <?php
      $this->render_block_view(
        '/components/carousel-navigation/carousel-navigation.php',
        $attributes
      );
      ?>
  </div>
</div>
