<?php
/**
 * Template for the Vimeo Block view.
 *
 * @package EightshiftBoilerplate
 */

$this->render_block_view(
  '/components/video-iframe/video-iframe.php',
  [
    'blockClass'  => $attributes['blockClass'] ?? '',
    'url'         => 'https://player.vimeo.com/video/',
    'id'          => $attributes['id'] ?? '',
    'aspectRatio' => $attributes['aspectRatio'] ?? '',
  ]
);
