<?php
/**
 * Template for the Link Block view.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$this->render_block_view(
  '/components/link/link.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'link'       => $attributes['link'] ?? [],
  ]
);
