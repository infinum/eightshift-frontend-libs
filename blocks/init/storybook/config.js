import { configure } from '@storybook/react';
import { storybookDefaultMocks, storybookWindowObjects, storybookWpStyles } from '@eightshift/frontend-libs';

// Storybook order is really important because it won't work in any configuration. Be careful when changing stuff here.

// @WP Editor set default window objects.
storybookWindowObjects();

// Run all storybook stories.
configure([
  require.context('./../src/blocks/components', true, /docs\/story.js$/),
  require.context('./../src/blocks/custom', true, /docs\/story.js$/),
  require.context('./../src/blocks/wrapper', true, /docs\/story.js$/),
], module);

// @WP Editor set default categories.
storybookDefaultMocks();

// WP styles.
storybookWpStyles();

// Project styles.
require('./../assets/styles/application.scss');

// Project Blocks Frontend Part.
require('./../src/blocks/assets/styles/application-blocks.scss');
require('./../src/blocks/assets/styles/application-blocks-editor.scss');

// Project Blocks Editor Part.
require('./../src/blocks/assets/scripts/application-blocks-editor');
