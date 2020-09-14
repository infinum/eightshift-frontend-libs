<?php
/**
 * Template for the Image Component.
 *
 * @package EightshiftBoilerplate
 */

$media = $attributes['media'] ?? [];

if ( ! $media ) {
  return;
}

$id = $media['id'] ?? '';

if ( ! $id ) {
  return;
}

$size = $media['size'] ?? 'large';

$blockClass = $attributes['blockClass'] ?? '';

$media = \wp_get_attachment_image(
  $id,
  $size,
  '',
  [ 'class' => "image {$blockClass}__img" ]
);

echo wp_kses_post( $media );


