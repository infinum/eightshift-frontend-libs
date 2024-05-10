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
import { select } from '@wordpress/data';
import {
	registerBlocks,
	registerVariations,
	outputCssVariablesGlobal,
	inserter,
	STORE_NAME,
} from '@eightshift/frontend-libs/scripts/editor';
import { Wrapper } from '../../wrapper/wrapper';
import WrapperManifest from '../../wrapper/manifest.json';
import globalSettings from '../../manifest.json';

const safelyRequireContext = (basePath, searchSubdirectories, regularExpression) => {
	try {
		return require.context(basePath, searchSubdirectories, regularExpression);
	} catch (error) {
		console.warn(`No files found at ${basePath} with pattern ${regularExpression}`);
		return { keys: () => [] }; // Mimic the structure of require.context with an empty result.
	}
};

// Usage for safely importing contexts.
const componentsManifestPath = safelyRequireContext('./../../components', true, /manifest.json$/);
const blocksManifestPath = safelyRequireContext('./../../custom', true, /manifest.json$/);
const blocksEditComponentPath = safelyRequireContext('./../../custom', true, /-block.js$/);
const hooksComponentPath = safelyRequireContext('./../../custom', true, /-hooks.js$/);
const transformsComponentPath = safelyRequireContext('./../../custom', true, /-transforms.js$/);
const deprecationsComponentPath = safelyRequireContext('./../../custom', true, /-deprecations.js$/);
const overridesComponentPath = safelyRequireContext('./../../custom', true, /-overrides.js$/);
const variationsManifestPath = safelyRequireContext('./../../variations', true, /manifest.json$/);
const variationsOverridesPath = safelyRequireContext('./../../variations', true, /overrides.json$/);

registerBlocks(
	globalSettings,
	Wrapper,
	WrapperManifest,
	componentsManifestPath,
	blocksManifestPath,
	blocksEditComponentPath,
	hooksComponentPath,
	transformsComponentPath,
	deprecationsComponentPath,
	overridesComponentPath,
);

registerVariations(
	globalSettings,
	variationsManifestPath,
	blocksManifestPath,
	variationsOverridesPath,
);

// Output global css variables.
outputCssVariablesGlobal();

// Change the default block to the custom paragraph.
// If changing this block update the blocks filter method in Blocks.php.
domReady(() => {
	const namespace = select(STORE_NAME).getSettingsNamespace();

	setDefaultBlockName(`${namespace}/paragraph`);
});

// Inserter for inserting blocks from console.
inserter();
