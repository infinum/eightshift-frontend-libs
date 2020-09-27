<?php

/**
 * Template for the Lists Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

echo wp_kses_post(
	Components::render(
		'lists',
		[
		'blockClass' => $attributes['blockClass'] ?? '',
		'lists'      => $attributes['lists'] ?? [],
		]
	)
);
