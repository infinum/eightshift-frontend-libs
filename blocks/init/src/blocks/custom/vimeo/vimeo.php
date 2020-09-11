<?php
/**
 * Template for the Vimeo Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

echo wp_kses_post( Components::render( 'video-iframe', [
    'blockClass'  => $attributes['blockClass'] ?? '',
    'url'         => 'https://player.vimeo.com/video/',
    'id'          => $attributes['id'] ?? '',
    'aspectRatio' => $attributes['aspectRatio'] ?? '',
  ]
) );
