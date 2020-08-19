<?php
/**
 * Template for the Heading Block view.
 *
 * @package EightshiftBoilerplate
 */

$this->render_block_view(
  '/components/heading/heading.php',
  [
    'blockClass' => $attributes['blockClass'] ?? '',
    'heading'    => $attributes['heading'] ?? [],
  ]
);
