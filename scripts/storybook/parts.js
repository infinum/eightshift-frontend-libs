/* eslint-disable global-require*/

/**
 * Manually populate categories for blocks. This is generated in the PHP part of the real project.
 */
export const storybookDefaultMocksCategories = () => {
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
 * Manually populate blocks color palette. This is generated in the PHP part of the real project.
 *
 * @param object blocksGlobalManifest Full path to global blocks manifest.
 */
export const storybookDefaultMocksColorPalette = (blocksGlobalManifest) => {
  wp.data.select('core/block-editor').getSettings().colors = blocksGlobalManifest.globalVariables.colors;
};

/**
 * Loading WP build files.
 */
export const storybookWindowObjects = () => {
  window.wp.element = require('@wordpress/element/build-module');
  window.wp.compose = require('@wordpress/compose/build-module');
  window.wp.hooks = require('@wordpress/hooks/build-module');
  window.wp.components = require('@wordpress/components/build-module');
  window.wp.data = require('@wordpress/data/build-module');
  window.wp.coreData = require('@wordpress/core-data/build-module');
};

/**
 * Loading styles for block editor.
 */
export const storybookWpStyles = () => {
  require('@wordpress/editor/build-style/style-rtl.css');
  require('@wordpress/editor/build-style/style.css');
  require('@wordpress/components/build-style/style.css');
  require('@wordpress/block-editor/build-style/style.css');
  require('@wordpress/format-library/build-style/style.css');
  require('@eightshift/frontend-libs/styles/storybook.scss');
};
