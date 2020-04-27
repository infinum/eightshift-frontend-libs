/**
 * Manually populate categories for blocks. This is generated in the PHP part of the real project.
 */
export const storybookDefaultMocks = () => {
  wp.data.dispatch('core/blocks').setCategories([
    {
      slug: 'eightshift',
      title: 'Eightshift',
      icon: 'admin-settings',
    },
    {
      slug: 'common',
      title: 'Common',
    },
  ]);
};

/**
 * Loading WP build files.
 */
export const storybookWindowObjects = () => {
  window.wp.element = require('EightshiftBlocksStorybookWp/element/build-module');
  window.wp.compose = require('EightshiftBlocksStorybookWp/compose/build-module');
  window.wp.hooks = require('EightshiftBlocksStorybookWp/hooks/build-module');
  window.wp.components = require('EightshiftBlocksStorybookWp/components/build-module');
  window.wp.data = require('EightshiftBlocksStorybookWp/data/build-module');
  window.wp.coreData = require('EightshiftBlocksStorybookWp/core-data/build-module');
};

/**
 * Loading styles for block editor.
 */
export const storybookWpStyles = () => {
  require('EightshiftBlocksStorybookWp/editor/build-style/style-rtl.css');
  require('EightshiftBlocksStorybookWp/editor/build-style/style.css');
  require('EightshiftBlocksStorybookWp/components/build-style/style.css');
  require('EightshiftBlocksStorybookWp/block-editor/build-style/style.css');
  require('EightshiftBlocksStorybookWp/format-library/build-style/style.css');
  require('EightshiftBlocksStorybookLibsPath/styles/storybook.scss');
};
