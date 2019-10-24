/* eslint-disable import/no-extraneous-dependencies*/

/**
 * Project Base config used in production and development build.
 *
 * @since 2.0.0
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { isUsed } = require('./helpers');

module.exports = (options) => {

  // All Plugins used in production and development build.
  const plugins = [];

  // Provide global variables to window object.
  if (isUsed(options.plugins, 'providePlugin')) {
    plugins.push(new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }));
  }

  // Create manifest.json file.
  if (isUsed(options.plugins, 'manifestPlugin')) {
    plugins.push(new ManifestPlugin({
      seed: {},
    }));
  }

  // Output css from Js.
  if (isUsed(options.plugins, 'miniCssExtractPlugin')) {
    plugins.push(new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }));
  }

  // Copy files to new destination.
  if (isUsed(options.plugins, 'copyWebpackPlugin')) {
    plugins.push(
      new CopyWebpackPlugin([
        // Find jQuery in node_modules and copy it to public folder
        {
          from: `${options.config.libNodeModules}/jquery/dist/jquery.min.js`,
          to: options.config.outputPath,
        },
      ])
    );
  }

  // All Optimizations used in production and development build.
  const optimization = {
    runtimeChunk: false,
  };

  // All module used in production and development build.
  const module = {
    rules: [],
  };

  // Module for JS and JSX.
  if (isUsed(options.module, 'js')) {
    module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    });
  }

  // Module for Images.
  if (isUsed(options.module, 'images')) {
    module.rules.push({
      test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
      exclude: [/fonts/, /node_modules/],
      use: 'file-loader?name=[name].[ext]',
    });
  }

  // Module for Fonts.
  if (isUsed(options.module, 'fonts')) {
    module.rules.push({
      test: /\.(eot|otf|ttf|woff|woff2|svg)$/,
      exclude: [/images/, /node_modules/],
      use: 'file-loader?name=[name].[ext]',
    });
  }

  // Module for Scss.
  if (isUsed(options.module, 'scss')) {
    module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
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
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
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
  }

  return {
    optimization,
    plugins,
    module,
  };
};
