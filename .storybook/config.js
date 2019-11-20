import { configure } from '@storybook/react';

import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/block-library/build-style/theme.css';
import '@wordpress/format-library/build-style/style.css';

import './application-styles.scss';

import { registerBlocks } from 'EighshiftBlocksRegisterBlocks';
import { Wrapper } from './../blocks/init/wrapper/wrapper';
import blocksSettings from './../blocks/init/manifest.json';

registerBlocks(
  require.context('./../blocks/init/custom', true, /manifest\.json$/),
  require.context('./../blocks/init/custom', true, /\.js$/),
  blocksSettings,
  Wrapper,
);

registerBlocks(
  require.context('./../blocks/library/custom', true, /manifest\.json$/),
  require.context('./../blocks/library/custom', true, /\.js$/),
  blocksSettings,
  Wrapper,
);

configure([
  require.context("./../blocks/init/components", true, /story.js$/),
  require.context("./../blocks/init/custom", true, /story.js$/),
  require.context("./../blocks/init/wrapper", true, /story.js$/),
  require.context("./../blocks/library/components", true, /story.js$/),
  require.context("./../blocks/library/custom", true, /story.js$/),
  require.context("./../blocks/library/playground", true, /story.js$/),
], module);
