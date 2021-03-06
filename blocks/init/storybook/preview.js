import { storybookWindowObjects, storybookDefaultMocksCategories, storybookDefaultMocksColorPalette, storybookWpStyles } from '@eightshift/frontend-libs/scripts/storybook';
import globalSettings from '../src/Blocks/manifest.json';

// Storybook order is really important because it won't work in any configuration. Be careful when changing stuff here.

// Set default window objects.
storybookWindowObjects();

// Set default categories.
storybookDefaultMocksCategories();

// Set default color palette.
storybookDefaultMocksColorPalette(globalSettings);

// WP styles.
storybookWpStyles();

// Project styles.
require('./../assets/styles/application.scss');

// Project Blocks Frontend Part.
require('./../src/Blocks/assets/styles/application-blocks.scss');
require('./../src/Blocks/assets/styles/application-blocks-editor.scss');

// Project Blocks Editor Part.
require('../src/Blocks/assets/scripts/application-blocks-editor');
