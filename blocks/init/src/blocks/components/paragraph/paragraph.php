<?php
/**
 * Template for the Paragraph Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$paragraph = $attributes['paragraph'] ?? [];

if ( ! $paragraph ) {
  return;
}

$content = $paragraph['content'] ?? '';

if ( ! $content ) {
  return;
}

$component_class = 'paragraph';
$block_class     = $attributes['blockClass'] ?? '';
$style_align     = isset( $paragraph['styleAlign'] ) ? "{$component_class}__align--{$paragraph['styleAlign']}" : '';
$style_color     = isset( $paragraph['styleColor'] ) ? "{$component_class}__color--{$paragraph['styleColor']}" : '';
$style_size      = isset( $paragraph['styleSize'] ) ? "{$component_class}__size--{$paragraph['styleSize']}" : '';

$paragraph_class = Components::classnames([
  $component_class,
  $style_color,
  $style_align,
  $style_size,
  "{$block_class}__paragraph"
]);

?>

<p class="<?php echo esc_attr( $paragraph_class ); ?>">
  <?php echo wp_kses_post( $content ); ?>
</p>
