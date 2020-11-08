<?php

/**
 * Template for the Card Block.
 *
 * @package Solplanet
 */

use SolplanetVendor\EightshiftLibs\Helpers\Components;

echo wp_kses_post(
	Components::render(
		'card',
		[
			'blockClass' => $attributes['blockClass'] ?? '',
			'media'      => $attributes['media'] ?? [],
			'heading'    => $attributes['heading'] ?? '',
			'subHeading' => $attributes['subHeading'] ?? '',
			'paragraph'  => $attributes['paragraph'] ?? '',
			'subParagraph'  => $attributes['subParagraph'] ?? '',
			'button'     => $attributes['button'] ?? [],
		]
	)
);
