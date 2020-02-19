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

module.exports = (options, packagesPath) => {

  // All Plugins used in production and development build.
  const plugins = [];

  // Clean public files before next build.
  if (!options.overrides.includes('cleanWebpackPlugin')) {
    plugins.push(new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }));
  }

  // Provide global variables to window object.
  if (!options.overrides.includes('providePlugin')) {
    plugins.push(new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }));
  }

  // Output css from Js.
  if (!options.overrides.includes('miniCssExtractPlugin')) {
    plugins.push(new MiniCssExtractPlugin({
      filename: `${options.config.filesOutput}.css`,
    }));
  }

  // Copy files to new destination.
  if (!options.overrides.includes('copyWebpackPlugin')) {
    plugins.push(new CopyWebpackPlugin([

      // Find jQuery in node_modules and copy it to public folder
      {
        from: `${packagesPath.nodeModulesPath}/jquery/dist/jquery.min.js`,
        to: options.config.outputPath,
      },
    ]));
  }

  // Create manifest.json file.
  if (!options.overrides.includes('manifestPlugin')) {
    plugins.push(new ManifestPlugin({
      seed: {},
    }));
  }

  // All Optimizations used in production and development build.
  const optimization = {};

  if (!options.overrides.includes('runtimeChunk')) {
    optimization.runtimeChunk = false;
  }

  // All module used in production and development build.
  const module = {
    rules: [],
  };

  // Module for JS and JSX.
  if (!options.overrides.includes('js')) {
    module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    });
  }

  // Module for Images.
  if (!options.overrides.includes('images')) {
    module.rules.push({
      test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
      exclude: [/fonts/, /node_modules/],
      use: 'file-loader?name=[name].[ext]',
    });
  }

  // Module for Fonts.
  if (!options.overrides.includes('fonts')) {
    module.rules.push({
      test: /\.(eot|otf|ttf|woff|woff2|svg)$/,
      exclude: [/images/, /node_modules/],
      use: 'file-loader?name=[name].[ext]',
    });
  }

  // Module for Scss.
  if (!options.overrides.includes('scss')) {
    module.rules.push({
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
        'postcss-loader', 'sass-loader', 'import-glob-loader',
      ],
    });
  }

  return {
    optimization,
    plugins,
    module,
  };
};
