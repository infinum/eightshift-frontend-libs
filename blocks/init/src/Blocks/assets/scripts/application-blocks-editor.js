/**
 * This is the main entry point for Block Editor blocks scripts used for the `WordPress admin editor`.
 * This file registers blocks dynamically using `registerBlocks` helper method.
 * File names must follow the naming convention to be able to run dynamically.
 *
 * `src/blocks/custom/block_name/manifest.json`.
 * `src/blocks/custom/block_name/block_name.js`.
 *
 * Usage: `WordPress admin editor`.
 */

import domReady from '@wordpress/dom-ready';
import { setDefaultBlockName } from '@wordpress/blocks';
import { registerBlocks, registerVariations, outputCssVariablesGlobal } from '@eightshift/frontend-libs/scripts/editor';
import { Wrapper } from '../../wrapper/wrapper';
import WrapperManifest from '../../wrapper/manifest.json';
import globalSettings from '../../manifest.json';
import { hooks } from '../../wrapper/wrapper-hooks';

registerBlocks(
	globalSettings,
	Wrapper,
	WrapperManifest,
	require.context('./../../components', true, /manifest.json$/),
	require.context('./../../custom', true, /manifest.json$/),
	require.context('./../../custom', true, /-block.js$/),
	require.context('./../../custom', true, /-hooks.js$/),
	require.context('./../../custom', true, /-transforms.js$/),
	require.context('./../../custom', true, /-deprecations.js$/),
);

registerVariations(
	globalSettings,
	require.context('./../../variations', true, /manifest.json$/),
	require.context('./../../custom', true, /manifest.json$/),
);

// Run Wrapper hooks.
hooks();

// Output global css variables.
outputCssVariablesGlobal(globalSettings);

// Change the default block to the custom paragraph.
// If changing this block update the blocks filter method in Blocks.php.
domReady(() => {
	setDefaultBlockName(`${globalSettings.namespace}/paragraph`);
});
