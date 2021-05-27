<?php

/**
 * Template for the Accordion Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Blocks\Blocks;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$blockNameManifest = $manifest['blockName'];

echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'accordion',
	array_merge(
		Blocks::props($attributes, $blockNameManifest, '', true),
		[
			'accordionContent' => $innerBlockContent
		]
	)
);
