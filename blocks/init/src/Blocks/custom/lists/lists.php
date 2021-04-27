<?php

/**
 * Template for the Lists Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Blocks\Blocks;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$blockName = $attributes['blockName'] ?? $manifest['blockName'];

echo Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
	'lists',
	Blocks::props($attributes, $blockName, '', true)
);
