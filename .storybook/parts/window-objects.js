/**
 * Loading WP build files.
 */

export const storybookWindowObjects = () => {
  window.wp.element = require('EightshiftBlocksStorybookWp/element/build-module/index.js');
  window.wp.compose = require('EightshiftBlocksStorybookWp/compose/build-module');
  window.wp.hooks = require('EightshiftBlocksStorybookWp/hooks/build-module');
  window.wp.components = require('EightshiftBlocksStorybookWp/components/build-module');
  window.wp.data = require('EightshiftBlocksStorybookWp/data/build-module');
  window.wp.coreData = require('EightshiftBlocksStorybookWp/core-data/build-module');
}
