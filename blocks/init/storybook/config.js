import { configure } from '@storybook/react';
import { storybookWindowObjects, storybookDefaultMocksCategories, storybookDefaultMocksColorPalette, storybookWpStyles } from '@eightshift/frontend-libs/scripts/storybook';
import globalSettings from './../src/Blocks/manifest.json';

// Storybook order is really important because it won't work in any configuration. Be careful when changing stuff here.

// Set default window objects.
storybookWindowObjects();

// Run all storybook stories.
configure([
	require.context('./../src/Blocks/Components', true, /docs\/story.js$/),
	require.context('./../src/Blocks/Custom', true, /docs\/story.js$/),
	require.context('./../src/Blocks/Wrapper', true, /docs\/story.js$/),
	require.context('./../src/Blocks/Variations', true, /docs\/story.js$/),
], module);

// Set default categories.
storybookDefaultMocksCategories();

// Set default color palette.
storybookDefaultMocksColorPalette(globalSettings);

// WP styles.
storybookWpStyles();

// Project styles.
require('./../assets/styles/application.scss');

// Project Blocks Frontend Part.
require('./../src/Blocks/Assets/styles/application-blocks.scss');
require('./../src/Blocks/Assets/styles/application-blocks-editor.scss');

// Project Blocks Editor Part.
require('./../src/Blocks/Assets/scripts/application-blocks-editor');
