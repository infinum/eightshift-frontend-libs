<?php
/**
 * Template for the Link Component.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$title     = $attributes['title'] ?? '';
$url       = $attributes['url'] ?? '';
$is_anchor = $attributes['isAnchor'] ?? false;

$component_class = 'link';
$block_class     = $attributes['blockClass'] ?? '';
$style_color     = isset( $attributes['styleColor'] ) ? "{$component_class}__color--{$attributes['styleColor']}" : '';
$is_anchor       = ( $is_anchor === true ) ? 'js-scroll-to-anchor' : '';

$link_class = "
  {$component_class}
  {$style_color}
  {$is_anchor}
  {$block_class}__link
";
?>

<a
  href="<?php echo esc_url( $url ); ?>"
  class="<?php echo esc_attr( $link_class ); ?>"
  title="<?php echo esc_attr( $title ); ?>"
>
  <?php echo esc_html( $title ); ?>
</a>
