/**
 * Load Blocks Styles.
 */
import './application-styles.scss';

/**
 * Load Storybook addons
 */
import { configure } from '@storybook/react';

/**
 * Load Blocks.
 */
import { registerBlocks } from 'EighshiftBlocksRegisterBlocks';
import { dynamicImport } from 'EighshiftBlocksDynamicImport';
import { Wrapper } from './../blocks/init/wrapper/wrapper';
import blocksSettings from './../blocks/init/manifest.json';

/**
 * Loading WP build files.
 */
window.wp.element = require('./../node_modules/@wordpress/element/build-module');
window.wp.compose = require('./../node_modules/@wordpress/compose/build-module');
window.wp.hooks = require('./../node_modules/@wordpress/hooks/build-module');
window.wp.components = require('./../node_modules/@wordpress/components/build-module');
window.wp.data = require('./../node_modules/@wordpress/data/build-module');
window.wp.coreData = require('./../node_modules/@wordpress/core-data/build-module');

// STUFF THAT I WILL POTENTIALLY NEED SOMEDAY.
// window.wp.blockEditor = require('./../node_modules/@wordpress/block-editor/build-module');
// window.wp.editor = require('./../node_modules/@wordpress/editor/build-module');
// window.wp.blockLibrary = require('./../node_modules/@wordpress/block-library/build-module');
// window.wp.blocks = require('./../node_modules/@wordpress/blocks/build-module');
// window.wp.reduxRoutine = require('./../node_modules/@wordpress/redux-routine/build-module');
// window.wp.priorityQueue = require('./../node_modules/@wordpress/priority-queue/build-module');
// window.wp.plugins = require('./../node_modules/@wordpress/plugins/build-module');

/**
 * Manualy populate categories for blocks. This is generated in the PHP part of the real project.
 */
wp.data.dispatch( 'core/blocks').setCategories([
  {
    slug: 'eightshift',
    title: 'Eightshift',
    'icon': 'admin-settings',
  },
  {
    slug: 'common',
    title: 'Common',
  },
]
);

/**
 * Register Blocks.
 */
registerBlocks(
  require.context('./../blocks/init/custom', true, /manifest\.json$/),
  require.context('./../blocks/init/custom', true, /\.js$/),
  blocksSettings,
  Wrapper,
);

// Find all blocks hooks require hooks index.js inside it.
dynamicImport(require.context('./../blocks/init/custom', true, /hooks\/index.js$/));

// Run all storybook stories.
configure([
  require.context("./../blocks/init/components", true, /story.js$/),
  require.context("./../blocks/init/custom", true, /story.js$/),
  require.context("./../blocks/init/wrapper", true, /story.js$/),
  require.context("./../blocks/playground", true, /story.js$/),
  require.context("./../components/", true, /story.js$/),
], module);
