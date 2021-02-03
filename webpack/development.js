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
		const syncConfig = {
			host: 'localhost',
			port: 3000,
			proxy: `http://${options.config.proxyUrl}`,
		};

		if (options.config.useSsl) {
			syncConfig.proxy = `https://${options.config.proxyUrl}`;
			syncConfig.https = true;
		}

		plugins.push(new BrowserSyncPlugin(
			syncConfig,
			{
				// prevent BrowserSync from reloading the page
				// and let Webpack Dev Server take care of this
				reload: false,
			}
		));
	}

	return {
		plugins,
		devtool: false,
	};
};
