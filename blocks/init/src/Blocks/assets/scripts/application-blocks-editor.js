/* eslint-disable import/extensions, import/no-unresolved */

/**
 * This is the main entry point for Block Editor blocks scripts used for the `WordPress admin editor`.
 * This file registers blocks dynamically using `registerBlocks` helper method.
 * File names must follow the naming convention to be able to run dynamically.
 *
 * `src/blocks/Custom/block_name/manifest.json`.
 * `src/blocks/Custom/block_name/block_name.js`.
 *
 * Usage: `WordPress admin editor`.
 *
 
 */

import { registerBlocks, registerVariations } from '@eightshift/frontend-libs/scripts/editor';
import { Wrapper } from '../../Wrapper/wrapper';
import WrapperManifest from '../../Wrapper/manifest.json';
import globalSettings from '../../manifest.json';
import { hooks } from '../../Wrapper/wrapper-hooks';

registerBlocks(
  globalSettings,
  Wrapper,
  WrapperManifest,
  require.context('./../../Custom', true, /manifest.json$/),
  require.context('./../../Custom', true, /-block.js$/),
  require.context('./../../Custom', true, /-hooks.js$/),
  require.context('./../../Custom', true, /-transforms.js$/),
);

registerVariations(
  globalSettings,
  require.context('./../../Variations', true, /manifest.json$/),
  require.context('./../../Variations', true, /-transforms.js$/),
);

// Run Wrapper hooks.
hooks();
