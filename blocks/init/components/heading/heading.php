<?php
/**
 * Template for the Heading Component.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$content = $attributes['content'] ?? '';
$level   = isset( $attributes['level'] ) ? "h{$attributes['level']}" : 'h2';

$component_class = 'heading';
$block_class     = $attributes['blockClass'] ?? '';
$style_align     = isset( $attributes['styleAlign'] ) ? "{$component_class}__align--{$attributes['styleAlign']}" : '';
$style_color     = isset( $attributes['styleColor'] ) ? "{$component_class}__color--{$attributes['styleColor']}" : '';
$style_size      = isset( $attributes['styleSize'] ) ? "{$component_class}__size--{$attributes['styleSize']}" : '';

$heading_class = "
  {$component_class}
  {$style_align}
  {$style_color}
  {$style_size}
  {$block_class}__heading
";

?>

<<?php echo esc_attr( $level ); ?> class="<?php echo esc_attr( $heading_class ); ?>">
  <?php echo wp_kses_post( $content ); ?>
</<?php echo esc_attr( $level ); ?>>
