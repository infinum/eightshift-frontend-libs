<?php
/**
 * Template for the Carousel Image Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$size = $attributes['mediaSize'] ?? 'large';

$block_class = $attributes['blockClass'] ?? '';

$component_class = "
  {$block_class}
  swiper-slide
";
$image_class     = "{$block_class}__img";

$media = \wp_get_attachment_image(
  $attributes['mediaId'],
  $size,
  '',
  [ 'class' => $image_class ]
);

?>

<div class="<?php echo esc_attr( $component_class ); ?>">
  <?php echo wp_kses_post( $media ); ?>
</div>
