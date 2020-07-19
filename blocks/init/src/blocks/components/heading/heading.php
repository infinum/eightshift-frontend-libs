<?php
/**
 * Template for the Heading Component.
 *
 * @package EightshiftBoilerplate\Blocks.
 */

namespace EightshiftBoilerplate\Blocks;

$heading = $attributes['heading'] ?? [];

if ( ! $heading ) {
  return;
}

$content = $heading['content'] ?? '';

if ( ! $content ) {
  return;
}

$level   = isset( $heading['level'] ) ? "h{$heading['level']}" : 'h2';

$component_class = 'heading';
$block_class     = $attributes['blockClass'] ?? '';
$style_align     = isset( $heading['styleAlign'] ) ? "{$component_class}__align--{$heading['styleAlign']}" : '';
$style_color     = isset( $heading['styleColor'] ) ? "{$component_class}__color--{$heading['styleColor']}" : '';
$style_size      = isset( $heading['styleSize'] ) ? "{$component_class}__size--{$heading['styleSize']}" : '';

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
