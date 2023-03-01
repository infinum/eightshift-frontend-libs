import { dispatch } from '@wordpress/data';
import { storybookWindowObjects, storybookDefaultMocksCategories, storybookDefaultMocksColorPalette } from '../scripts/storybook';
import globalSettings from '../blocks/init/src/Blocks/manifest.json';
import { STORE_NAME } from './../scripts/editor/store';

// Storybook import order is really important because it won't work in any configuration. Be careful when changing stuff here.

// Set default window objects.
storybookWindowObjects();

// Set default categories.
storybookDefaultMocksCategories();

// Set default color palette.
storybookDefaultMocksColorPalette(globalSettings);

// WP styles.
require('./../styles/storybook.scss');

// Project styles.
require('./../blocks/init/assets/styles/application.scss');

// Project Blocks Frontend Part.
require('./../blocks/init/src/Blocks/assets/styles/application-blocks.scss');
require('./../blocks/init/src/Blocks/assets/styles/application-blocks-editor.scss');

// Project Blocks Editor Part.
require('../blocks/init/src/Blocks/assets/scripts/application-blocks-editor');

// Prevent one inline style tag.
dispatch(STORE_NAME).setConfigOutputCssGlobally(false);
