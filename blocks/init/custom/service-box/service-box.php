<?php
/**
 * Template for the Service Box Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$title    = $attributes['title'] ?? '';
$content  = $attributes['content'] ?? '';
$media_id = $attributes['mediaId'] ?? '';

$block_class   = $attributes['blockClass'] ?? '';
$title_class   = "{$block_class}__title";
$content_class = "{$block_class}__content";
$image_class   = "{$block_class}__image";

?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  <?php if ( ! empty( $media_id ) ) { ?>
    <div class="<?php echo esc_attr( $image_class ); ?>">
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
  <?php } ?>
  <?php if ( ! empty( $title ) ) { ?>
    <div class="<?php echo esc_attr( $title_class ); ?>">
      <?php echo wp_kses_post( $title ); ?>
    </div>
  <?php } ?>

  <?php if ( ! empty( $content ) ) { ?>
    <div class="<?php echo esc_attr( $content_class ); ?>">
      <?php echo wp_kses_post( $content ); ?>
    </div>
  <?php } ?>
</div>
