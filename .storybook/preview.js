import { dispatch } from '@wordpress/data';
import { STORE_NAME } from '@eightshift/frontend-libs/scripts/editor/store';
import { storybookWindowObjects, storybookDefaultMocksCategories, storybookDefaultMocksColorPalette, storybookWpStyles } from '../scripts/storybook';
import globalSettings from '../blocks/init/src/Blocks/manifest.json';

// Storybook import order is really important because it won't work in any configuration. Be careful when changing stuff here.

// Set default window objects.
storybookWindowObjects();

// Set default categories.
storybookDefaultMocksCategories();

// Set default color palette.
storybookDefaultMocksColorPalette(globalSettings);

// WP styles.
storybookWpStyles();

// Project styles.
require('./../blocks/init/assets/styles/application.scss');

// Project Blocks Frontend Part.
require('./../blocks/init/src/Blocks/assets/styles/application-blocks.scss');
require('./../blocks/init/src/Blocks/assets/styles/application-blocks-editor.scss');

// Project Blocks Editor Part.
require('../blocks/init/src/Blocks/assets/scripts/application-blocks-editor');

// Prevent one inline style tag.
dispatch(STORE_NAME).setConfigOutputCssGlobally(false);
