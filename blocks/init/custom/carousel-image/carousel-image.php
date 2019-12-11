<?php
/**
 * Template for the Carousel Image Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$media_id = $attributes['mediaId'] ?? '';

if ( empty( $media_id ) ) {
  return;
}

$block_class = $attributes['blockClass'] ?? '';

$component_class = "
  {$block_class}
  swiper-slide
";

?>

<div class="<?php echo esc_attr( $component_class ); ?>">
  <?php $this->render_block_view(
    '/components/image/image.php',
    [
      'blockClass' => $attributes['blockClass'] ?? '',
      'id' => $media_id,
      'size' => $attributes['mediaSize'] ?? 'large',
    ]
  );
  ?>
</div>
