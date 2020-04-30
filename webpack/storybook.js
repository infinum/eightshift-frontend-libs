/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-dynamic-require*/

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { convertJsonToSass } = require('./helpers');

module.exports = ({ config }, projectRoot, blocksManifestSettingsPath) => {

  const nodeModulesPath = path.resolve(projectRoot, 'node_modules');

  // Load global variables.
  const globalSettings = require(path.resolve(projectRoot, blocksManifestSettingsPath));
  

  /**
   * Generate css file from sass.
   */
  config.module.rules.push({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          url: false,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          prependData: convertJsonToSass(globalSettings.globalVariables),
        },
      },
      {
        loader: 'import-glob-loader',
      },
    ],
  });

  // Add include/exclude paths to all loaders.
  config.module.rules.map((item) => {
    item.exclude = /node_modules\/(?!(@eightshift|@wordpress)\/).*/;
    return item;
  });

  /**
   * Extract css from sass.
   */
  config.plugins.push(new MiniCssExtractPlugin());

  /**
   * Load Project Aliases.
   */
  config.resolve.alias = {
    ...config.resolve.alias,
    '@eightshift/frontend-libs': projectRoot,
    '@wordpress': path.resolve(nodeModulesPath, '@wordpress'),
  };

  return config;
};
