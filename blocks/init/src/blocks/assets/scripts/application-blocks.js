/* eslint-disable import/extensions, import/no-unresolved */

/**
 * This is the main entry point for Block Editor blocks scripts used for the `WordPress frontend screen`.
 * This file registers all blocks additional scripts dynamically using `dynamicImport` helper method.
 * File names must follow naming convention to be able run dynamically.
 *
 * `src/blocks/custom/block_name/assets/index.js`.
 *
 * Usage: `WordPress frontend screen`.
 *
 * @since 1.0.0
 */
import { dynamicImport } from 'EightshiftBlocksDynamicImport';

// Find all blocks and require assets index.js inside it.
dynamicImport(require.context('./../../custom', true, /assets\/index\.js$/));
