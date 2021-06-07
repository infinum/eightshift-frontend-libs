<?php

/**
 * Template for the Video Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Blocks\Blocks;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$manifestBlockName = $manifest['blockName'];

echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'video',
	Blocks::props($attributes, $manifestBlockName, '', true)
);
