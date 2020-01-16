/* eslint-disable import/extensions, import/no-unresolved */

/**
 * This is the main entry point for Gutenberg blocks scripts used for the `WordPress admin editor`.
 * This file registers blocks dynamically using `registerBlocks` helper method.
 * File names must follow the naming convention to be able to run dynamically.
 *
 * `src/blocks/custom/block_name/manifest.json`.
 * `src/blocks/custom/block_name/block_name.js`.
 *
 * Usage: `WordPress admin editor`.
 *
 * @since 1.0.0
 */

import { registerBlocks } from 'EighshiftBlocksRegisterBlocks';
import { Wrapper } from './../../wrapper/wrapper';
import blocksSettings from './../../manifest.json';

registerBlocks(
  require.context('./../../custom', true, /manifest\.json$/),
  require.context('./../../custom', true, /\-block.js$/),
  blocksSettings,
  Wrapper,
);
