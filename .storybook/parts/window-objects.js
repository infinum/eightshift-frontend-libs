/**
 * Loading WP build files.
 */

const storybookInternalWindowObjects = () => {
  window.wp.element = require('./../../node_modules/@wordpress/element/build-module');
  window.wp.compose = require('./../../node_modules/@wordpress/compose/build-module');
  window.wp.hooks = require('./../../node_modules/@wordpress/hooks/build-module');
  window.wp.components = require('./../../node_modules/@wordpress/components/build-module');
  window.wp.data = require('./../../node_modules/@wordpress/data/build-module');
  window.wp.coreData = require('./../../node_modules/@wordpress/core-data/build-module');
}

const storybookWindowObjects = () => {
  window.wp.element = require('EightshiftBlocksStorybookWp/element/build-module');
  window.wp.compose = require('EightshiftBlocksStorybookWp/compose/build-module');
  window.wp.hooks = require('EightshiftBlocksStorybookWp/hooks/build-module');
  window.wp.components = require('EightshiftBlocksStorybookWp/components/build-module');
  window.wp.data = require('EightshiftBlocksStorybookWp/data/build-module');
  window.wp.coreData = require('EightshiftBlocksStorybookWp/core-data/build-module');
}

export {
  storybookInternalWindowObjects,
  storybookWindowObjects
}
