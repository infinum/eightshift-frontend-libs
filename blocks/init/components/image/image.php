<?php
/**
 * Template for the Image Component.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$size = $attributes['size'] ?? 'large';

$component_class = 'image';
$block_class     = $attributes['blockClass'] ?? '';

$image_class = "
  {$component_class}
  {$block_class}__img
";

$media = \wp_get_attachment_image(
  $attributes['id'],
  $size,
  '',
  [ 'class' => $image_class ]
);

echo wp_kses_post( $media );


