<?php
/**
 * Template for the Service Box Block.
 *
 * @since 1.0.0
 * @package Infinum\Blocks.
 */

namespace Infinum\Blocks;

$title   = $attributes['title'] ?? '';
$content = $attributes['content'] ?? '';


$block_class   = $attributes['blockClass'] ?? '';
$title_class   = "{$block_class}__title";
$content_class = "{$block_class}__content";
$image_class   = "{$block_class}__image";
$img_class     = "{$block_class}__img";

$media = \wp_get_attachment_image(
  $attributes['mediaId'] ?? '',
  $attributes['mediaSize'] ?? 'large',
  '',
  [ 'class' => $img_class ]
);

?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  <?php if ( ! empty( $media ) ) { ?>
    <div class="<?php echo esc_attr( $image_class ); ?>">
      <?php echo wp_kses_post( $media ); ?>
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
