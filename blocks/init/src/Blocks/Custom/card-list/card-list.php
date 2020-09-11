<?php
/**
 * Template for the Card List block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

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
      <?php echo wp_kses_post( Components::render( 'image', [
          'blockClass' => $attributes['blockClass'] ?? '',
          'media'      => $media,
        ]
      ) );
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
    echo wp_kses_post( Components::render( 'button', [
        'blockClass' => $attributes['blockClass'] ?? '',
        'button'     => $button,
      ]
    ) );
    ?>

  </div>
</div>


