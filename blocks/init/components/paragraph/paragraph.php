<?php
/**
 * Template for the Paragraph Component.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$content      = $attributes['content'] ?? '';
$remove_style = $attributes['removeStyle'] ?? false;

if ( ! $remove_style ) {
  $component_class = 'paragraph';
  $block_class     = $attributes['blockClass'] ?? '';
  $style_align     = isset( $attributes['styleAlign'] ) ? "{$component_class}__align--{$attributes['styleAlign']}" : '';
  $style_color     = isset( $attributes['styleColor'] ) ? "{$component_class}__color--{$attributes['styleColor']}" : '';
  $style_size      = isset( $attributes['styleSize'] ) ? "{$component_class}__size--{$attributes['styleSize']}" : '';

  $paragraph_class = "
    {$component_class}
    {$style_color}
    {$style_align}
    {$style_size}
    {$block_class}__paragraph
  ";

  ?>

  <p class="<?php echo esc_attr( $paragraph_class ); ?>">
    <?php echo wp_kses_post( $content ); ?>
  </p>

  <?php
} else {
  echo wp_kses_post( $content );
}
