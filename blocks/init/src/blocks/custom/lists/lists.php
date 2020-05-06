<?php
/**
 * Template for the Lists Block view.
 *
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$this->render_block_view(
  '/components/lists/lists.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'lists'      => $attributes['lists'] ?? [],
  ]
);
