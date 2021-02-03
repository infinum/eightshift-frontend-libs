/**
 * Project Base overrides used in production and development build.
 *
 */

const webpack = require('webpack');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { convertJsonToSass } = require('./helpers');
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );


module.exports = (options) => {

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

	// Create manifest.json file.
	if (!options.overrides.includes('WebpackManifestPlugin')) {
		plugins.push(new WebpackManifestPlugin());
	}

	// Enable export for all WordPress related packages
	if (!options.overrides.includes('DependencyExtractionWebpackPlugin')) {
		plugins.push(new DependencyExtractionWebpackPlugin({
			outputFormat: 'json',
			requestToExternal: function ( request ) {
				if ( request === '@wordpress/dom-ready' ) {
					return '';
				}
			}
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
			exclude: /node_modules\/(?!@eightshift)/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			],
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
		const globalSettingsPath = options.config.blocksManifestSettingsPath;
		let globalSettings = {};

		if (fs.existsSync(globalSettingsPath)) {
			globalSettings = require(globalSettingsPath);
		}

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
				{
					loader: 'postcss-loader',
				},
				{
					loader: 'sass-loader',
					options: {
						additionalData: convertJsonToSass(globalSettings),
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
