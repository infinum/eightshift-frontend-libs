<?php
/**
 * Template for the Paragraph Block view.
 *
 * @package EightshiftBoilerplate
 */

$this->render_block_view(
  '/components/paragraph/paragraph.php',
  [
    'blockClass'  => $attributes['blockClass'] ?? '',
    'paragraph'   => $attributes['paragraph'] ?? [],
  ]
);
