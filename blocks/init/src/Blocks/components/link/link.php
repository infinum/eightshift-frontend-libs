<?php

/**
 * Template for the Link Component.
 *
 * @package EightshiftBoilerplate
 */

$link = $attributes['link'] ?? [];

if (! $link) {
	return;
}

$url   = $link['url'] ?? '';
$title = $button['title'] ?? '';

if (! $url || ! $title) {
	return;
}

$id        = $link['id'] ?? '';
$isAnchor = $link['isAnchor'] ?? false;

$componentClass = 'link';
$blockClass     = $attributes['blockClass'] ?? '';
$styleColor     = isset($link['styleColor']) ? "{$componentClass}__color--{$link['styleColor']}" : '';
$isAnchor       = $isAnchor ? 'js-scroll-to-anchor' : '';

$linkClass = "
  {$componentClass}
  {$styleColor}
  {$isAnchor}
  {$blockClass}__link
";
?>

<a
  href="<?php echo esc_url($url); ?>"
  class="<?php echo esc_attr($linkClass); ?>"
  title="<?php echo esc_attr($title); ?>"
  id="<?php echo esc_attr($id); ?>"
>
  <?php echo esc_html($title); ?>
</a>
