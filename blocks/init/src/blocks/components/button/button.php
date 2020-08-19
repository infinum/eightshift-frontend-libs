<?php
/**
 * Template for the Button Component.
 *
 * @package EightshiftBoilerplate
 */

$button = $attributes['button'] ?? [];

if ( empty( $button ) ) {
  return;
}

$url   = $button['url'] ?? '';
$title = $button['title'] ?? '';

if ( ! $url || ! $title  ) {
  return;
}

$url       = $button['url'] ?? '';
$title     = $button['title'] ?? '';
$id        = $button['id'] ?? '';
$is_anchor = $button['isAnchor'] ?? false;

$component_class  = 'btn';
$block_class      = $attributes['blockClass'] ?? '';
$style_color      = isset( $button['styleColor'] ) ? "{$component_class}__color--{$button['styleColor']}" : '';
$style_size       = isset( $button['styleSize'] ) ? "{$component_class}__size--{$button['styleSize']}" : '';
$style_size_width = isset( $button['styleSizeWidth'] ) ? "{$component_class}__size-width--{$button['styleSizeWidth']}" : '';
$is_anchor        = $is_anchor ? 'js-scroll-to-anchor' : '';

$button_class = "
  {$component_class}
  {$style_color}
  {$style_size}
  {$style_size_width}
  {$is_anchor}
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
