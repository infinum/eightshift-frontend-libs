/* eslint-disable import/no-extraneous-dependencies*/
/**
 * Project Production config used only in production build.
 *
 * @since 2.0.0
 */

const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { isUsed } = require('./helpers');

module.exports = (options) => {

  // All Plugins used in production build.
  const plugins = [];

  // Clean public files before next build.
  if (isUsed(options.plugins, 'cleanWebpackPlugin')) {
    plugins.push(
      new CleanWebpackPlugin()
    );
  }

  // All Optimizations used in production build.
  const optimization = {
    minimizer: [],
  };
  
  // Plugin used to minify output.
  if (isUsed(options.optimization, 'terserPlugin')) {
    optimization.minimizer.push(
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      },
    ));
  }

  return {
    plugins,
    optimization,
  
    devtool: 'inline-cheap-module-source-map',
  };
};
