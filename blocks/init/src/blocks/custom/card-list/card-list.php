<?php
/**
 * Template for the Card List block.
 *
 * @package EightshiftBoilerplate\Blocks.
 */

namespace EightshiftBoilerplate\Blocks;

$block_class    = $attributes['blockClass'] ?? '';

$media          = $attributes['media'] ?? [];
$heading        = $attributes['heading'] ?? '';
$paragraph      = $attributes['paragraph'] ?? '';
$media_position = $attributes['mediaPosition'] ?? '';
$button         = $attributes['button'] ?? [];

?>

<div class="<?php echo esc_attr( "{$block_class} {$block_class}__media-position--{$media_position}" ); ?>">

  <?php if ( ! empty( $media ) ) { ?>
    <div class="<?php echo esc_attr( "{$block_class}__media" ); ?>">
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

  <div class="<?php echo esc_attr( "{$block_class}__content" ); ?>">

    <?php if ( ! empty( $heading ) ) { ?>
      <div class="<?php echo esc_attr( "{$block_class}__heading" ); ?>">
        <?php echo wp_kses_post( $heading ); ?>
      </div>
    <?php } ?>

    <?php if ( ! empty( $paragraph ) ) { ?>
      <div class="<?php echo esc_attr( "{$block_class}__paragraph" ); ?>">
        <?php echo wp_kses_post( $paragraph ); ?>
      </div>
    <?php } ?>
    
    <?php
    $this->render_block_view(
      '/components/button/button.php',
      [
        'blockClass' => $attributes['blockClass'] ?? '',
        'button'     => $button,
      ]
    );
    ?>

  </div>
</div>


