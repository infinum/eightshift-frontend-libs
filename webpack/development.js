/* eslint-disable import/no-extraneous-dependencies*/

/**
 * Project Development config used only in development build.
 *
 * @since 2.0.0
 */

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Define developmentConfig setup.
module.exports = (options) => {

  // All Plugins used in development build.
  const plugins = [];

  // Use BrowserSync to see live preview of all changes.
  if (!options.overrides.includes('browserSyncPlugin')) {
    plugins.push(new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: options.config.proxyUrl,
    }));
  }

  return {
    plugins,

    devtool: false,
  };
};
