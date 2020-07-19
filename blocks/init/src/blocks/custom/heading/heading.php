<?php
/**
 * Template for the Heading Block view.
 *
 * @package EightshiftBoilerplate\Blocks.
 */

namespace EightshiftBoilerplate\Blocks;

$this->render_block_view(
  '/components/heading/heading.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'heading'    => $attributes['heading'] ?? [],
  ]
);
