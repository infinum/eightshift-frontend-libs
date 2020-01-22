<?php
/**
 * Template for the Video Block view.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$this->render_block_view(
  '/components/video/video.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'media'      => $attributes['media'] ?? [],
  ]
);
