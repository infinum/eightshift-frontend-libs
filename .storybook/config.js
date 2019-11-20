import { configure } from '@storybook/react';

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

configure([
  require.context("./../blocks/init/components", true, /story.js$/),
  require.context("./../blocks/init/custom", true, /story.js$/),
  require.context("./../blocks/init/wrapper", true, /story.js$/),
  require.context("./../blocks/playground", true, /story.js$/),
], module);
