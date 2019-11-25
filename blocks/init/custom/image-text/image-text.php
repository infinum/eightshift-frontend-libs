<?php
/**
 * Template for the Image Text block.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$block_class    = $attributes['blockClass'] ?? '';
$block_js_class = $attributes['blockJsClass'] ?? '';

$media_url         = $attributes['mediaUrl'] ?? '';
$heading           = $attributes['heading'] ?? '';
$paragraph         = $attributes['paragraph'] ?? '';
$image_position    = $attributes['imagePosition'] ?? '';
$button_title      = $attributes['buttonTitle'] ?? '';
$button_url        = $attributes['buttonUrl'] ?? '';
$style_full_height = $attributes['styleFullHeight'] ?? false;

$component_class  = "
  {$block_class}
  {$block_class}__media-position--{$image_position}
  {$block_class}__full-height--{$style_full_height}
  {$block_js_class}
";
$media_wrap_class = "{$block_class}__media-wrap";
$img_class        = "{$block_class}__img";
$wrap_class       = "{$block_class}__content-wrap";
$heading_class    = "{$block_class}__heading";
$content_class    = "{$block_class}__paragraph";

?>

<div class="<?php echo esc_attr( $component_class ); ?>">

  <div class="<?php echo esc_attr( $media_wrap_class ); ?>">
    <?php
    if ( ! empty( $media_url ) ) {
        $media = \wp_get_attachment_image(
          $attributes['mediaId'] ?? null,
          $attributes['mediaSize'] ?? 'large',
          '',
          [ 'class' => $img_class ]
        );

        echo wp_kses_post( $media );
      ?>
    <?php } ?>
  </div>

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


