<?php
/**
 * Template for the Service List Block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$title    = $attributes['title'] ?? '';
$content  = $attributes['content'] ?? '';
$media    = $attributes['media'] ?? [];

$block_class = $attributes['blockClass'] ?? '';

?>

<div class="<?php echo esc_attr( $block_class ); ?>">

  <?php if ( ! empty( $media_id ) ) { ?>
    <div class="<?php echo esc_attr( "{$block_class}__image" ); ?>">
      <?php $this->render_block_view(
        '/components/image/image.php',
        [
          'blockClass' => $attributes['blockClass'] ?? '',
          'media'      => $media,
        ]
      );
      ?>
    </div>
  <?php } ?>

  <div class="<?php echo esc_attr( "{$block_class}__wrap" ); ?>">
    <?php if ( ! empty( $title ) ) { ?>
      <div class="<?php echo esc_attr( "{$block_class}__title" ); ?>">
        <?php echo wp_kses_post( $title ); ?>
      </div>
    <?php } ?>

    <?php if ( ! empty( $content ) ) { ?>
      <div class="<?php echo esc_attr( "{$block_class}__content" ); ?>">
        <?php echo wp_kses_post( $content ); ?>
      </div>
    <?php } ?>
  </div>

</div>
