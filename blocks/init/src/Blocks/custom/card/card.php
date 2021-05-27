<?php

/**
 * Template for the Card Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Blocks\Blocks;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$blockNameManifest = $manifest['blockName'];

echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'card',
	Blocks::props($attributes, $blockNameManifest, '', true)
);
