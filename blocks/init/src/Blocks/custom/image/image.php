<?php

/**
 * Template for the Image Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Blocks\Blocks;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$blockName = $attributes['blockName'] ?? $manifest['blockName'];

echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'image',
	Blocks::props($attributes, $blockName, '', true)
);
