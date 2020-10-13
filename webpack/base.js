/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-dynamic-require*/

/**
 * Project Base overrides used in production and development build.
 *
 */

const webpack = require('webpack');
const fileExists = require('file-exists');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { convertJsonToSass } = require('./helpers');

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

		if (fileExists.sync(globalSettingsPath)) {
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
						prependData: convertJsonToSass(globalSettings),
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
