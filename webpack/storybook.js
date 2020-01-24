/* eslint-disable import/no-extraneous-dependencies, global-require*/

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getPackagesPath } = require('./helpers');

module.exports = ({ config }, nodeModules, isProject = true) => {

  // Packages helper for correct node modules path.
  const packagesPath = getPackagesPath(nodeModules, isProject);

  /**
   * Generate css file from sass.
   */
  config.module.rules.push({
    test: /\.(scss|sass)$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          url: false,
        },
      },
      'sass-loader', 'import-glob-loader',
    ],
  });

  // Add include/exclude paths to all loaders.
  config.module.rules.map((item) => {
    item.include = [
      packagesPath.libsPath,
      nodeModules,
      path.resolve(packagesPath.nodeModulesPath, '@wordpress'),
    ];
    item.exclude = /node_modules\/(?!(@eightshift|@wordpress)\/).*/;
    return item;
  });

  /**
   * Extract css from sass.
   */
  config.plugins.push(new MiniCssExtractPlugin());

  config.plugins.push(new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }));

  /**
   * Load Project Aliases.
   */
  const aliases = require('./aliases')(packagesPath);

  config.resolve.alias = {
    ...config.resolve.alias,
    ...aliases.resolve.alias,
    EighshiftBlocksStorybookWindowObjects: path.resolve(packagesPath.libsPath, '.storybook', 'parts', 'window-objects'),
    EighshiftBlocksStorybookDefaultCategories: path.resolve(packagesPath.libsPath, '.storybook', 'parts', 'default-categories'),
    EighshiftBlocksStorybookEditorStyles: path.resolve(packagesPath.libsPath, '.storybook', 'parts', 'editor-styles.scss'),
    EighshiftBlocksStorybookAddons: path.resolve(packagesPath.libsPath, '.storybook', 'addons'),
    EighshiftBlocksStorybookWpStyles: path.resolve(packagesPath.libsPath, '.storybook', 'parts', 'wp-styles'),
    EighshiftBlocksStorybookHelpers: path.resolve(packagesPath.libsPath, '.storybook', 'helpers'),
    EighshiftBlocksStorybookWp: path.resolve(packagesPath.nodeModulesPath, '@wordpress'),
  };

  return config;
};
