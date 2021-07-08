<?php

/**
 * Template for the Accordion Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$manifestBlockName = $manifest['blockName'];

echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'accordion',
	array_merge(
		Components::prop('accordion', $attributes),
		[
			'accordionContent' => $innerBlockContent
		]
	)
);
