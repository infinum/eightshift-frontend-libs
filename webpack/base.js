/**
 * Project Base overrides used in production and development build.
 *
 */

const webpack = require('webpack');
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

	// Provide variables to code build.
	if (!options.overrides.includes('definePlugin')) {
		plugins.push(new webpack.DefinePlugin({
			'process.env.VERSION': JSON.stringify(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
			'process.browser': true,
		}));
	}

	// Output css from Js.
	if (!options.overrides.includes('miniCssExtractPlugin')) {
		plugins.push(new MiniCssExtractPlugin({
			filename: `${options.config.filesOutput}.css`,
		}));
	}

	// Create manifest.json file.
	if (!options.overrides.includes('webpackManifestPlugin')) {
		plugins.push(new WebpackManifestPlugin());
	}

	// Enable export for all WordPress related packages
	if (!options.overrides.includes('dependencyExtractionWebpackPlugin')) {
		plugins.push(new DependencyExtractionWebpackPlugin({
			outputFormat: 'json',
			requestToExternal: function (request) { // eslint-disable-line consistent-return
				if (request === '@wordpress/dom-ready') {
					return '';
				}
			}
		}));
	}

	// All module used in production and development build.
	const module = {
		rules: [],
	};

	// Module for JS and JSX.
	if (!options.overrides.includes('js')) {
		module.rules.push({
			test: /\.(js|jsx)$/,
			exclude: /node_modules[\\/](?!@eightshift)/,
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
			test: /\.(png|svg|jpg|jpeg|gif|ico|webp)$/i,
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
				{
					loader: 'postcss-loader',
				},
				{
					loader: 'sass-loader',
					options: {
						implementation: require("sass"),
						// eslint-disable-next-line max-len
						additionalData: convertJsonToSass(options.config.blocksManifestSettingsPath) + ' ' + convertJsonToSass(options.config.blocksManifestSettingsPath, 'config', 'global-config'),
					},
				},
				{
					loader: 'import-glob',
				},
			],
		});
	}

	const resolve = {
		symlinks: false,
		fallback: {
			crypto: require.resolve("crypto-browserify"),
			stream: require.resolve("stream-browserify"),
		}
	};

	return {
		plugins,
		module,
		resolve
	};
};
