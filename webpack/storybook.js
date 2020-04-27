/* eslint-disable import/no-extraneous-dependencies, global-require*/

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getPackagesPath } = require('./helpers');

module.exports = ({ config }, nodeModules, isProject) => {

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
    ];
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
  const aliases = require('./aliases')(packagesPath);

  config.resolve.alias = {
    ...config.resolve.alias,
    ...aliases.resolve.alias,
    EightshiftBlocksStorybookLibsPath: packagesPath.libsPath,
    EightshiftBlocksStorybookWp: path.resolve(packagesPath.nodeModulesPath, '@wordpress'),

    /**
     * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
     */
    EightshiftBlocksStorybookWindowObjects: path.resolve(packagesPath.libsPath, '.storybook', 'parts', 'window-objects'),

    /**
     * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
     */
    EightshiftBlocksStorybookDefaultCategories: path.resolve(packagesPath.libsPath, '.storybook', 'parts', 'default-categories'),

    /**
     * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
     */
    EightshiftBlocksStorybookEditorStyles: path.resolve(packagesPath.libsPath, '.storybook', 'parts', 'editor-styles.scss'),

    /**
     * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
     */
    EightshiftBlocksStorybookAddons: path.resolve(packagesPath.libsPath, '.storybook', 'addons'),

    /**
     * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
     */
    EightshiftBlocksStorybookWpStyles: path.resolve(packagesPath.libsPath, '.storybook', 'parts', 'wp-styles'),

    /**
     * @deprecated Since version 3.2. Replace it with '@eightshift/frontend-libs'. It will be removed in the next version.
     */
    EightshiftBlocksStorybookHelpers: path.resolve(packagesPath.libsPath, '.storybook', 'helpers'),

  };

  return config;
};
