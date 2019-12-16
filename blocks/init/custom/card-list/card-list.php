<?php
/**
 * Template for the Card List block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$block_class    = $attributes['blockClass'] ?? '';
$block_js_class = $attributes['blockJsClass'] ?? '';

$media          = $attributes['media'] ?? [];
$heading        = $attributes['heading'] ?? '';
$paragraph      = $attributes['paragraph'] ?? '';
$image_position = $attributes['imagePosition'] ?? '';
$button_title   = $attributes['buttonTitle'] ?? '';
$button_url     = $attributes['buttonUrl'] ?? '';

$component_class  = "
  {$block_class}
  {$block_class}__media-position--{$image_position}
  {$block_js_class}
";

?>

<div class="<?php echo esc_attr( $component_class ); ?>">

  <?php if ( ! empty( $media ) ) { ?>
    <div class="<?php echo esc_attr( "{$block_class}__media" ); ?>">
      <?php $this->render_block_view(
        '/components/image/image.php',
        [
          'blockClass' => $attributes['blockClass'] ?? '',
          'id'         => $media,
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
    if ( ! empty( $button_title ) || ! empty( $button_url ) ) {
      $this->render_block_view(
        '/components/button/button.php',
        [
          'blockClass' => $attributes['blockClass'] ?? '',
          'title' => $button_title,
          'url' => $button_url,
          'styleSize' => $attributes['buttonStyleSize'] ?? '',
          'styleSizeWidth' => $attributes['buttonStyleSizeWidth'] ?? '',
          'styleColor' => $attributes['buttonStyleColor'] ?? '',
          'id' => $attributes['buttonId'] ?? '',
          'icon' => $attributes['buttonIcon'] ?? '',
        ]
      );
    }
    ?>

  </div>
</div>


