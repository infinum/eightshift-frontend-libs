<?php
/**
 * Template for the Intro block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$block_class = $attributes['blockClass'] ?? '';

$heading   = $attributes['heading'] ?? '';
$paragraph = $attributes['paragraph'] ?? '';

$image_class            = "{$block_class}__image";
$img_class              = "{$block_class}__img";
$wrap_class             = "{$block_class}__wrap";
$heading_class          = "{$block_class}__heading";
$content_class          = "{$block_class}__paragraph";


$media = \wp_get_attachment_image(
  $attributes['mediaId'],
  $attributes['mediaSize'] ?? 'large',
  '',
  [ 'class' => $img_class ]
);
?>

<div class="<?php echo esc_attr( $block_class ); ?>">

  <div class="<?php echo esc_attr( $wrap_class ); ?>">

    <?php if ( ! empty( $heading ) ) { ?>
      <div class="<?php echo esc_attr( $heading_class ); ?>">
        <?php echo wp_kses_post( $heading ); ?>
      </div>
    <?php } ?>

    <?php if ( ! empty( $paragraph ) ) { ?>
      <div class="<?php echo esc_attr( $content_class ); ?>">
        <?php echo wp_kses_post( $paragraph ); ?>
      </div>
    <?php } ?>

  </div>

  <div class="<?php echo esc_attr( $image_class ); ?>">
    <?php echo wp_kses_post( $media ); ?>
  </div>
</div>


