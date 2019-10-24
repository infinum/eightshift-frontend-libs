<?php
/**
 * Template for the Button Component.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$url   = $attributes['url'] ?? '';
$title = $attributes['title'] ?? '';
$id    = $attributes['id'] ?? '';

$component_class  = 'btn';
$block_class      = $attributes['blockClass'] ?? '';
$style_color      = isset( $attributes['styleColor'] ) ? "{$component_class}__color--{$attributes['styleColor']}" : '';
$style_size       = isset( $attributes['styleSize'] ) ? "{$component_class}__size--{$attributes['styleSize']}" : '';
$style_size_width = isset( $attributes['styleSizeWidth'] ) ? "{$component_class}__size-width--{$attributes['styleSizeWidth']}" : '';

$button_class = "
  {$component_class}
  {$style_color}
  {$style_size}
  {$style_size_width}
  {$block_class}__btn
";
?>

<a
  href="<?php echo esc_url( $url ); ?>"
  class="<?php echo esc_attr( $button_class ); ?>"
  id="<?php echo esc_attr( $id ); ?>"
  title="<?php echo esc_attr( $title ); ?>"
>
  <?php echo esc_html( $title ); ?>
</a>
