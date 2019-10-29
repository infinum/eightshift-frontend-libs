<?php
/**
 * Template for the Paragraph Block view.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$this->render_block_view(
  '/components/paragraph/paragraph.php',
  [
    'blockClass'  => $attributes['blockClass'] ?? '',
    'content'     => $attributes['content'] ?? '',
    'styleAlign'  => $attributes['styleAlign'] ?? '',
    'styleColor'  => $attributes['styleColor'] ?? '',
    'styleSize'   => $attributes['styleSize'] ?? '',
    'removeStyle' => $attributes['removeStyle'] ?? false,
  ]
);
