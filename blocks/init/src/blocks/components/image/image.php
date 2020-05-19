<?php
/**
 * Template for the Image Component.
 *
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$media = $attributes['media'] ?? [];

if ( ! $media ) {
  return;
}

$id = $media['id'] ?? '';

if ( ! $id ) {
  return;
}

$size = $media['size'] ?? 'large';

$block_class = $attributes['blockClass'] ?? '';

$media = \wp_get_attachment_image(
  $id,
  $size,
  '',
  [ 'class' => "image {$block_class}__img" ]
);

echo wp_kses_post( $media );


