const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const gutenberg = require('./../webpack/gutenberg')({
  config: {
    libNodeModules: path.resolve(__dirname, '..', 'node_modules'),
  },
});

module.exports = ({ config }) => {

  /**
   * Load Project Aliases.
   */
  config.resolve.alias = {
    ...config.resolve.alias,
    ...gutenberg.resolve.alias,
    EighshiftBlocksStorybookWindowObjects: path.resolve(__dirname, '..', '.storybook', 'parts', 'window-objects'),
    EighshiftBlocksStorybookDefaultCategories: path.resolve(__dirname, '..', '.storybook', 'parts', 'default-categories'),
    EighshiftBlocksStorybookStyles: path.resolve(__dirname, '..', '.storybook', 'parts', 'styles.scss'),
    EighshiftBlocksStorybookAddons: path.resolve(__dirname, '..', '.storybook', 'addons'),
  };

  /**
   * Generate css file from sass.
   */
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          url: false,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'import-glob-loader',
      },
    ],
  });

  /**
   * Extract css from sass.
   */
  config.plugins.push(new MiniCssExtractPlugin());

  // REMOVE ONCE jQuery is removed from the libs.
  config.plugins.push(new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
  }));

  return config;
};
