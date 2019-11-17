import { configure } from '@storybook/react';

import './application-styles.scss';

configure([
  require.context("./../blocks/init/components", true, /stories.js$/),
  require.context("./../blocks/init/custom", true, /stories.js$/),
  require.context("./../blocks/init/wrapper", true, /stories.js$/),
  // require.context("./../stories", true, /stories.js$/),
], module);
