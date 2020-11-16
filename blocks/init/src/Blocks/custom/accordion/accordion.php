<?php

/**
 * Template for the Accordion Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

echo \wp_kses_post(
	Components::render(
		'accordion',
		array_merge(
			$attributes,
			[
				'accordionContent' => $innerBlockContent
			]
		)
	)
);
