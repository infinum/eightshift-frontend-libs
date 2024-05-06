/**
 * Project Production config used only in production build.
 *
 */

const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (options) => {

	// Enable Webpack caching for production
	const cache = true;

	// All Plugins used in production build.
	const plugins = [];

	// All Optimizations used in production build.
	const optimization = {
		minimize: true,
		minimizer: [],
	};
	
	// Plugin used to minify output.
	if (!options.overrides.includes('terserPlugin')) {
		optimization.minimizer.push(new TerserPlugin({
			parallel: true,
			minify: TerserPlugin.swcMinify,
			terserOptions: {
				compress: {
					drop_console: true,
					passes: 2,
				},
				format: {
					comments: false,
				},
			},
		}));
	}

	if (!options.overrides.includes('cssMinimizerPlugin')) {
		optimization.minimizer.push(new CssMinimizerPlugin({
			parallel: true,
			minify: CssMinimizerPlugin.cssoMinify,
		}));
	}

	return {
		plugins,
		optimization,
		cache
	};
};
