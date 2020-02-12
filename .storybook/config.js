// Storybook import order is really important because it won't work in any configuration. Be careful when changing stuff here.

import { configure } from '@storybook/react';

// @WP Editor set default window objects.
require( 'EightshiftBlocksStorybookWindowObjects' );

// Run all storybook stories.
configure([
  require.context("./../blocks/init/src/blocks/components", true, /docs\/story.js$/),
  require.context("./../blocks/init/src/blocks/custom", true, /docs\/story.js$/),
  require.context("./../blocks/init/src/blocks/wrapper", true, /docs\/story.js$/),
  require.context("./../blocks/playground", true, /story.js$/),
], module);

// @WP Editor set default categories.
require( 'EightshiftBlocksStorybookDefaultCategories' );

// WP styles.
require( 'EightshiftBlocksStorybookWpStyles' );

// @WP Editor Styles.
require( 'EightshiftBlocksStorybookEditorStyles' );

// Project styles.
require( './../blocks/init/assets/styles/application.scss' );

// Project Blocks Frontend Part.
require( './../blocks/init/src/blocks/assets/styles/application-blocks.scss');
require( './../blocks/init/src/blocks/assets/styles/application-blocks-editor.scss');

// Project Blocks Editor Part.
require( './../blocks/init/src/blocks/assets/scripts/application-blocks-editor');
