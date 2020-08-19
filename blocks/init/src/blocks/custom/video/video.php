<?php
/**
 * Template for the Video Block view.
 *
 * @package EightshiftBoilerplate
 */

$this->render_block_view(
  '/components/video/video.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'media'      => $attributes['media'] ?? [],
  ]
);
