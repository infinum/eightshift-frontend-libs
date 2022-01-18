<?php

/**
 * Template for the Button Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$unique = $attributes['uniqueWrapperId'] ?? Components::getUnique();

echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	'button',
	Components::props('button', $attributes)
);
