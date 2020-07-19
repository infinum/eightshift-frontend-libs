<?php
/**
 * Template for the Youtube Block view.
 *
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$this->render_block_view(
  '/components/video-iframe/video-iframe.php',
  [
    'blockClass'  => $attributes['blockClass'] ?? '',
    'url'         => 'https://www.youtube-nocookie.com/embed/',
    'id'          => $attributes['id'] ?? '',
    'aspectRatio' => $attributes['aspectRatio'] ?? '',
  ]
);
