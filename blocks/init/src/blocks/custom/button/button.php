<?php
/**
 * Template for the Button Block view.
 *
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$this->render_block_view(
  '/components/button/button.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'button'     => $attributes['button'] ?? [],
  ]
);
