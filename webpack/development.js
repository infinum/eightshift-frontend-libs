/**
 * Project Development config used only in development build.
 *
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
		}, {

			// prevent BrowserSync from reloading the page
			// and let Webpack Dev Server take care of this
			reload: false,
		}));
	}

	return {
		plugins,
		devtool: false,
	};
};
