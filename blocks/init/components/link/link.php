<?php
/**
 * Template for the Link Component.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$link = $attributes['link'] ?? [];

if ( ! $link ) {
  return;
}

$title     = $link['title'] ?? '';
$url       = $link['url'] ?? '';
$is_anchor = $link['isAnchor'] ?? false;

$component_class = 'link';
$block_class     = $attributes['blockClass'] ?? '';
$style_color     = isset( $link['styleColor'] ) ? "{$component_class}__color--{$link['styleColor']}" : '';
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
