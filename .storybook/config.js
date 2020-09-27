import { configure } from '@storybook/react';
import { storybookWindowObjects, storybookDefaultMocksCategories, storybookDefaultMocksColorPalette, storybookWpStyles } from './../scripts/storybook';
import globalSettings from './../blocks/init/src/Blocks/manifest.json';

// Storybook import order is really important because it won't work in any configuration. Be careful when changing stuff here.

// Set default window objects.
storybookWindowObjects();

// Run all storybook stories.
configure([
	require.context('./../blocks/init/src/Blocks/Components', true, /docs\/story.js$/),
	require.context('./../blocks/init/src/Blocks/Custom', true, /docs\/story.js$/),
	require.context('./../blocks/init/src/Blocks/Wrapper', true, /docs\/story.js$/),
	require.context('./../blocks/init/src/Blocks/Variations', true, /docs\/story.js$/),
	require.context('./../blocks/playground', true, /story.js$/),
	require.context('./../scripts/components', true, /docs\/story.js$/),
], module);

// Set default categories.
storybookDefaultMocksCategories();

// Set default color palette.
storybookDefaultMocksColorPalette(globalSettings);

// WP styles.
storybookWpStyles();

// Project styles.
require('./../blocks/init/Assets/styles/application.scss');

// Project Blocks Frontend Part.
require('./../blocks/init/src/Blocks/Assets/styles/application-blocks.scss');
require('./../blocks/init/src/Blocks/Assets/styles/application-blocks-editor.scss');

// Project Blocks Editor Part.
require('./../blocks/init/src/Blocks/Assets/scripts/application-blocks-editor');
