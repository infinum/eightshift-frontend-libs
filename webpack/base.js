/* eslint-disable import/no-extraneous-dependencies*/

/**
 * Project Base overrides used in production and development build.
 *
 * @since 2.0.0
 */

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { isUsed } = require('./helpers');

module.exports = (options) => {

  // All Plugins used in production and development build.
  const plugins = [];

  // Clean public files before next build.
  if (isUsed(options.overrides, 'cleanWebpackPlugin')) {
    plugins.push(new CleanWebpackPlugin());
  }

  // Provide global variables to window object.
  if (isUsed(options.overrides, 'providePlugin')) {
    plugins.push(new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }));
  }

  // Output css from Js.
  if (isUsed(options.overrides, 'miniCssExtractPlugin')) {
    plugins.push(new MiniCssExtractPlugin({
      filename: `${options.config.filesOutput}.css`,
    }));
  }

  // Copy files to new destination.
  if (isUsed(options.overrides, 'copyWebpackPlugin')) {
    plugins.push(new CopyWebpackPlugin([

      // Find jQuery in node_modules and copy it to public folder
      {
        from: `${options.config.libNodeModules}/jquery/dist/jquery.min.js`,
        to: options.config.outputPath,
      },
    ]));
  }

  // Create manifest.json file.
  if (isUsed(options.overrides, 'manifestPlugin')) {
    plugins.push(new ManifestPlugin({
      seed: {},
    }));
  }

  // All Optimizations used in production and development build.
  const optimization = {};

  if (isUsed(options.overrides, 'runtimeChunk')) {
    optimization.runtimeChunk = false;
  }

  // All module used in production and development build.
  const module = {
    rules: [],
  };

  // Module for JS and JSX.
  if (isUsed(options.overrides, 'js')) {
    module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    });
  }

  // Module for Images.
  if (isUsed(options.overrides, 'images')) {
    module.rules.push({
      test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
      exclude: [/fonts/, /node_modules/],
      use: 'file-loader?name=[name].[ext]',
    });
  }

  // Module for Fonts.
  if (isUsed(options.overrides, 'fonts')) {
    module.rules.push({
      test: /\.(eot|otf|ttf|woff|woff2|svg)$/,
      exclude: [/images/, /node_modules/],
      use: 'file-loader?name=[name].[ext]',
    });
  }

  // Module for Scss.
  if (isUsed(options.overrides, 'scss')) {
    module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader',
      ],
    });
  }

  return {
    optimization,
    plugins,
    module,
  };
};
