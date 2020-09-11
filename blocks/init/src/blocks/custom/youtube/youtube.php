<?php
/**
 * Template for the Youtube Block view.
 *
 * @package EightshiftBoilerplate
 */
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

echo wp_kses_post( Components::render( 'video-iframe', [
    'blockClass'  => $attributes['blockClass'] ?? '',
    'url'         => 'https://www.youtube-nocookie.com/embed/',
    'id'          => $attributes['id'] ?? '',
    'aspectRatio' => $attributes['aspectRatio'] ?? '',
  ]
) );
