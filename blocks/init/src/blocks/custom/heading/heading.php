<?php
/**
 * Template for the Heading Block view.
 *
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$this->render_block_view(
  '/components/heading/heading.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'heading'    => $attributes['heading'] ?? [],
  ]
);
