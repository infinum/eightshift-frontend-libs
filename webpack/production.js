/* eslint-disable import/no-extraneous-dependencies*/
/**
 * Project Production config used only in production build.
 *
 * @since 2.0.0
 */

const TerserPlugin = require('terser-webpack-plugin');
const { isUsed } = require('./helpers');

module.exports = (options) => {

  // All Plugins used in production build.
  const plugins = [];

  // All Optimizations used in production build.
  const optimization = {
    minimizer: [],
  };
  
  // Plugin used to minify output.
  if (isUsed(options.overrides, 'terserPlugin')) {
    optimization.minimizer.push(new TerserPlugin({
      cache: true,
      parallel: true,
      terserOptions: {
        output: {
          comments: false,
        },
      },
    }));
  }

  return {
    plugins,
    optimization,
  };
};
