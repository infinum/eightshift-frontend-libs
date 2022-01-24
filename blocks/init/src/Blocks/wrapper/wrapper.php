<?php

/**
 * Template for the Wrapping Advance block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 1));
$manifest = Components::getManifest(__DIR__);

$wrapperDisable = Components::checkAttr('wrapperDisable', $attributes, $manifest);

if (!$wrapperDisable) {
	$unique = Components::getUnique();
	$blockClass = $attributes['blockClass'] ?? '';
	$attributes['uniqueWrapperId'] = $unique;

	echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest, $blockClass); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

$this->renderWrapperView(
	$templatePath,
	$attributes,
	$innerBlockContent
);
